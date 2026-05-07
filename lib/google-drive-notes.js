const { google } = require('googleapis');

const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
const FOLDER_MIME = 'application/vnd.google-apps.folder';
const PDF_MIME = 'application/pdf';
const CACHE_TTL_MS = 5 * 60 * 1000;

let notesCache = null;

class DriveNotesError extends Error {
  constructor(message, statusCode = 503, details = '') {
    super(message);
    this.name = 'DriveNotesError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

function normalizeName(value) {
  return (value || '')
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/&/g, ' AND ')
    .replace(/[^A-Z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactName(value) {
  return normalizeName(value).replace(/\s+/g, '');
}

function resolveSemesterId(folderName) {
  const normalized = normalizeName(folderName);
  const match = normalized.match(/\bSEM(?:ESTER|ISTER)?\s*([1-6])\b/) || normalized.match(/\b([1-6])\b/);
  return match ? `sem_${match[1]}` : null;
}

function includesAny(normalized, tokens) {
  return tokens.some(token => normalized.includes(normalizeName(token)));
}

function resolveSubjectCode(folderName, parentSubjectCode = null) {
  const normalized = normalizeName(folderName);
  const compact = compactName(folderName);

  if (!normalized) return parentSubjectCode;
  if (includesAny(normalized, ['MCQ', 'MCQS', 'EXPERIMENT', 'EXPIRIMENT', 'MANUAL', 'NOTES'])) {
    if (parentSubjectCode) return parentSubjectCode;
  }

  if (includesAny(normalized, ['WEB DESIGNING', 'WEB DESIGN']) || compact === 'WD') return 'WD';
  if (includesAny(normalized, ['PROGRAMMING IN C', 'PROGRAMMING FUNDAMENTALS C', 'PIC']) || compact === 'CS102') return 'CS102';
  if (includesAny(normalized, ['LINUX BASICS']) || compact === 'LIN101') return 'LIN101';
  if (includesAny(normalized, ['PROFESSIONAL COMMUNICATION']) || compact === 'PCO101' || compact.startsWith('PCO')) return 'PCO101';
  if (includesAny(normalized, ['APPLIED MATHS', 'ENGINEERING MATHEMATICS II']) || compact === 'MA102') return 'MA102';
  if (includesAny(normalized, ['ENGINEERING MECHANICS']) || compact === 'ME101') return 'ME101';

  if (
    compact === 'BEEEENOTES' ||
    compact === 'BEEENOTES' ||
    normalized.includes('BEE EE') ||
    normalized.includes('BEEE EE') ||
    normalized.includes('ELECTRICAL')
  ) return 'EE101';

  if (
    compact === 'BEEEXNOTES' ||
    compact === 'BEXNOTES' ||
    normalized.includes('BEE EX') ||
    normalized.includes('BEEE EX') ||
    normalized.includes('ELECTRONICS')
  ) return 'EC101';

  return parentSubjectCode;
}

function cleanTitle(fileName) {
  const withoutExtension = (fileName || '').replace(/\.pdf$/i, '');
  const withoutCopies = withoutExtension.replace(/\(\s*\d+\s*\)$/g, '');
  const spaced = withoutCopies
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return spaced.replace(/\w\S*/g, word => {
    const upper = word.toUpperCase();
    if (['WD', 'BEEE', 'BEE', 'EE', 'EC', 'PIC', 'MCQ', 'MCQS', 'PDF'].includes(upper)) return upper;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

function extractUnit(value) {
  const match = (value || '').match(/\bunit\s*([0-9]+(?:\.[0-9]+)?)/i);
  if (!match) return null;
  const parsed = Number.parseFloat(match[1]);
  return Number.isNaN(parsed) ? null : parsed;
}

function isMcqPath(parts, fileName) {
  return [...parts, fileName].some(part => /\bmcq'?s?\b/i.test(part || ''));
}

function safeFilename(name) {
  return cleanTitle(name).replace(/[^\w .()-]+/g, '').trim() || 'Drive Note';
}

function getPrivateKey() {
  const raw = process.env.GOOGLE_PRIVATE_KEY || '';
  return raw.replace(/\\n/g, '\n');
}

function getServiceAccountConfig() {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (rawJson) {
    try {
      const parsed = JSON.parse(rawJson);
      return {
        email: parsed.client_email,
        privateKey: (parsed.private_key || '').replace(/\\n/g, '\n'),
        projectId: parsed.project_id
      };
    } catch {
      throw new DriveNotesError('Google Drive service account JSON is invalid.');
    }
  }

  return {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: getPrivateKey(),
    projectId: process.env.GOOGLE_PROJECT_ID
  };
}

function assertConfigured() {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const config = getServiceAccountConfig();

  if (!folderId) throw new DriveNotesError('Google Drive folder is not configured.');
  if (!config.email || !config.privateKey) {
    throw new DriveNotesError('Google Drive service account credentials are not configured.');
  }

  return { folderId, ...config };
}

function createDriveClient() {
  const { email, privateKey, projectId } = assertConfigured();
  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: [DRIVE_SCOPE],
    projectId
  });
  return google.drive({ version: 'v3', auth });
}

function quoteDriveQueryValue(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

async function listChildren(drive, folderId) {
  const files = [];
  let pageToken;

  do {
    const result = await drive.files.list({
      q: `'${quoteDriveQueryValue(folderId)}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime, createdTime, webViewLink, webContentLink)',
      orderBy: 'folder,name_natural',
      pageSize: 1000,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    });

    files.push(...(result.data.files || []));
    pageToken = result.data.nextPageToken;
  } while (pageToken);

  return files;
}

function createDrivePdfNote(file, semId, subjectCode, pathParts, kind) {
  const title = cleanTitle(file.name);
  const unit = extractUnit(file.name);
  const proxyUrl = `/api/drive-file?id=${encodeURIComponent(file.id)}`;

  return {
    id: `drive_${file.id}`,
    noteId: `drive_${file.id}`,
    driveFileId: file.id,
    title,
    subjectId: subjectCode,
    subject: subjectCode,
    semester: semId,
    fileUrl: proxyUrl,
    file: proxyUrl,
    viewUrl: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
    downloadUrl: proxyUrl,
    fileType: 'pdf',
    mimeType: PDF_MIME,
    type: kind === 'mcq' ? 'mcq' : 'platform',
    source: 'google-drive',
    sourcePath: pathParts.join(' / '),
    unitId: unit,
    unit,
    unitTitle: unit ? `Unit ${unit}` : 'Google Drive',
    size: file.size ? Number(file.size) : null,
    modifiedTime: file.modifiedTime || null,
    isPlatform: true,
    isPdf: true
  };
}

async function scanFolder(drive, folder, context, output, warnings, depth = 0) {
  if (depth > 8) {
    warnings.push(`Skipped deeply nested folder: ${context.pathParts.join(' / ')}`);
    return;
  }

  const children = await listChildren(drive, folder.id);

  for (const child of children) {
    const nextPath = [...context.pathParts, child.name];

    if (child.mimeType === FOLDER_MIME) {
      const semId = context.semId || resolveSemesterId(child.name);
      const subjectCode = resolveSubjectCode(child.name, context.subjectCode);

      await scanFolder(drive, child, {
        semId,
        subjectCode,
        pathParts: nextPath
      }, output, warnings, depth + 1);
      continue;
    }

    if (child.mimeType !== PDF_MIME) continue;

    if (!context.semId || !context.subjectCode) {
      warnings.push(`Skipped unmapped PDF: ${nextPath.join(' / ')}`);
      continue;
    }

    const kind = isMcqPath(context.pathParts, child.name) ? 'mcq' : 'note';
    const note = createDrivePdfNote(child, context.semId, context.subjectCode, nextPath, kind);
    if (kind === 'mcq') output.mcqPdfs.push(note);
    else output.notes.push(note);
  }
}

function dedupeByFileId(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = item.driveFileId || item.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function groupBySemesterAndSubject(notes, mcqPdfs) {
  const semesters = new Map();

  for (const item of [...notes, ...mcqPdfs]) {
    if (!semesters.has(item.semester)) {
      semesters.set(item.semester, { id: item.semester, subjects: new Map() });
    }

    const semester = semesters.get(item.semester);
    if (!semester.subjects.has(item.subjectId)) {
      semester.subjects.set(item.subjectId, {
        id: item.subjectId,
        code: item.subjectId,
        notes: [],
        mcqPdfs: []
      });
    }

    const subject = semester.subjects.get(item.subjectId);
    if (item.type === 'mcq') subject.mcqPdfs.push(item);
    else subject.notes.push(item);
  }

  return Array.from(semesters.values()).map(semester => ({
    id: semester.id,
    subjects: Array.from(semester.subjects.values())
  }));
}

function sortItems(items) {
  return items.sort((a, b) => {
    const unitA = a.unitId ?? 999;
    const unitB = b.unitId ?? 999;
    if (unitA !== unitB) return unitA - unitB;
    return a.title.localeCompare(b.title, 'en', { numeric: true });
  });
}

async function getDriveNotes({ forceRefresh = false } = {}) {
  const now = Date.now();
  if (!forceRefresh && notesCache && now - notesCache.cachedAt < CACHE_TTL_MS) {
    return { ...notesCache.payload, cache: { hit: true, ttlMs: CACHE_TTL_MS } };
  }

  const { folderId } = assertConfigured();
  const drive = createDriveClient();
  const output = { notes: [], mcqPdfs: [] };
  const warnings = [];

  await scanFolder(drive, { id: folderId, name: 'Google Drive Root' }, {
    semId: null,
    subjectCode: null,
    pathParts: []
  }, output, warnings);

  const notes = sortItems(dedupeByFileId(output.notes));
  const mcqPdfs = sortItems(dedupeByFileId(output.mcqPdfs));
  const payload = {
    ok: true,
    configured: true,
    source: 'google-drive',
    syncedAt: new Date().toISOString(),
    cacheTtlSeconds: CACHE_TTL_MS / 1000,
    notes,
    mcqPdfs,
    semesters: groupBySemesterAndSubject(notes, mcqPdfs),
    warnings
  };

  notesCache = { cachedAt: now, payload };
  return { ...payload, cache: { hit: false, ttlMs: CACHE_TTL_MS } };
}

async function findAllowedDrivePdf(fileId, options = {}) {
  const data = await getDriveNotes(options);
  const allFiles = [...data.notes, ...data.mcqPdfs];
  return allFiles.find(file => file.driveFileId === fileId) || null;
}

function createDriveMediaClient() {
  return createDriveClient();
}

function getDriveNotesErrorPayload(error) {
  const status = error instanceof DriveNotesError ? error.statusCode : 503;
  return {
    status,
    body: {
      ok: false,
      configured: false,
      error: error instanceof DriveNotesError
        ? error.message
        : 'Unable to sync Google Drive notes right now.',
      notes: [],
      mcqPdfs: [],
      semesters: [],
      warnings: []
    }
  };
}

module.exports = {
  PDF_MIME,
  createDriveMediaClient,
  findAllowedDrivePdf,
  getDriveNotes,
  getDriveNotesErrorPayload,
  safeFilename
};
