const {
  PDF_MIME,
  createDriveMediaClient,
  findAllowedDrivePdf,
  getDriveNotesErrorPayload,
  safeFilename
} = require('../lib/google-drive-notes');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function getFileId(req) {
  const raw = req.query?.id || req.query?.fileId || '';
  return Array.isArray(raw) ? raw[0] : raw;
}

function isValidDriveFileId(fileId) {
  return /^[A-Za-z0-9_-]{10,200}$/.test(fileId || '');
}

async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed. Use GET.' });

  const fileId = getFileId(req);
  if (!isValidDriveFileId(fileId)) {
    return res.status(400).json({ error: 'A valid Drive file id is required.' });
  }

  try {
    let fileMeta = await findAllowedDrivePdf(fileId);
    if (!fileMeta) fileMeta = await findAllowedDrivePdf(fileId, { forceRefresh: true });
    if (!fileMeta) return res.status(404).json({ error: 'Drive PDF was not found in the configured notes folder.' });

    const drive = createDriveMediaClient();
    const response = await drive.files.get(
      { fileId, alt: 'media', supportsAllDrives: true },
      { responseType: 'stream' }
    );

    const filename = `${safeFilename(fileMeta.title)}.pdf`;
    res.setHeader('Content-Type', PDF_MIME);
    res.setHeader('Content-Disposition', `inline; filename="${filename.replace(/"/g, '')}"`);
    res.setHeader('Cache-Control', 'private, max-age=300');

    response.data.on('error', error => {
      console.error('Drive PDF stream failed:', error.message || error);
      if (!res.headersSent) res.status(502).json({ error: 'Unable to open this Drive PDF right now.' });
      else res.end();
    });

    return response.data.pipe(res);
  } catch (error) {
    console.error('Drive PDF request failed:', error.message || error);
    const payload = getDriveNotesErrorPayload(error);
    return res.status(payload.status).json({ error: payload.body.error });
  }
}

module.exports = handler;
