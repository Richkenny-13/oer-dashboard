const DEFAULTS = require('../lib/defaults');
const { getConfig, updateConfigSection, setConfig } = require('../lib/storage');

function isAdmin(req) {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) return true;  // No password set = open (dev mode)
  return req.headers['x-admin-password'] === pwd ||
         req.headers['x-api-key'] === process.env.API_KEY;
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET — public, no auth needed
  if (req.method === 'GET') {
    try {
      const config = await getConfig(DEFAULTS);
      // Strip internal fields
      const { _source, ...clean } = config;
      res.status(200).json({ ...clean, _meta: { source: _source, fetchedAt: new Date().toISOString() } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  // PUT — requires admin auth
  if (req.method === 'PUT') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Admin authentication required (x-admin-password header)' });

    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
    }

    try {
      // Support two modes:
      // 1. { key: 'baseRanges', value: {...} }  — update one section
      // 2. { fullConfig: {...} }                — replace entire config
      if (body.fullConfig) {
        await setConfig(body.fullConfig);
        res.status(200).json({ success: true, mode: 'full-replace', updatedAt: new Date().toISOString() });
      } else if (body.key && body.value !== undefined) {
        const updated = await updateConfigSection(body.key, body.value, DEFAULTS);
        res.status(200).json({ success: true, mode: 'section-update', key: body.key, updatedAt: new Date().toISOString() });
      } else {
        res.status(400).json({ error: 'Body must contain { key, value } or { fullConfig }' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
