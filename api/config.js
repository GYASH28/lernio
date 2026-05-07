// Public runtime configuration for the frontend.
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed. Use GET.' });

    res.status(200).json({
        N8N_CHAT_WEBHOOK_URL: process.env.VITE_N8N_CHAT_WEBHOOK_URL || process.env.N8N_CHAT_WEBHOOK_URL || ''
    });
}
