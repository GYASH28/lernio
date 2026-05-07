import admin from 'firebase-admin';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function initAdmin() {
  if (admin.apps.length) return admin.app();

  const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (rawServiceAccount) {
    const serviceAccount = JSON.parse(rawServiceAccount);
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  if (projectId && clientEmail && privateKey) {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
  }

  throw new Error('Firebase Admin credentials are not configured.');
}

async function authenticate(req) {
  const header = req.headers.authorization || req.headers.Authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) {
    const err = new Error('Missing auth token.');
    err.statusCode = 401;
    throw err;
  }

  initAdmin();
  return admin.auth().verifyIdToken(token);
}

function defaultProgress() {
  return {
    attempts: [],
    streak: { current: 0, days: [] },
    subjects: {},
    updatedAt: null
  };
}

function sanitizeProgress(body) {
  const data = body && typeof body === 'object' ? body : {};
  return {
    attempts: Array.isArray(data.attempts) ? data.attempts.slice(0, 100) : [],
    streak: data.streak && typeof data.streak === 'object' ? data.streak : { current: 0, days: [] },
    subjects: data.subjects && typeof data.subjects === 'object' ? data.subjects : {},
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!['GET', 'POST'].includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const user = await authenticate(req);
    const db = admin.firestore();
    const ref = db.collection('userProgress').doc(user.uid);

    if (req.method === 'GET') {
      const snap = await ref.get();
      return res.status(200).json(snap.exists ? snap.data() : defaultProgress());
    }

    const progress = sanitizeProgress(req.body);
    await ref.set(progress, { merge: true });
    return res.status(200).json({ ok: true });
  } catch (error) {
    const status = error.statusCode || (error.code === 'auth/argument-error' ? 401 : 503);
    const message = status === 401
      ? 'Please sign in again to sync progress.'
      : 'Progress sync is temporarily unavailable. Local progress is still saved.';
    return res.status(status).json({ error: message });
  }
}
