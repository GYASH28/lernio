const { getDriveNotes, getDriveNotesErrorPayload } = require('../lib/google-drive-notes');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed. Use GET.' });
  }

  try {
    const forceRefresh = req.query?.refresh === '1' || req.query?.refresh === 'true';
    const data = await getDriveNotes({ forceRefresh });
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Google Drive notes sync failed:', error.message || error);
    const payload = getDriveNotesErrorPayload(error);
    return res.status(payload.status).json(payload.body);
  }
}

module.exports = handler;
