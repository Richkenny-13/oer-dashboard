const DEFAULTS = require('../lib/defaults');
const { calculateOER } = require('../lib/calculator');
const { getConfig } = require('../lib/storage');

// Optional API key auth for external callers
function isAuthorized(req) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return true;  // No key configured = open access
  const provided = req.headers['x-api-key'];
  return provided === apiKey;
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST required' });
  if (!isAuthorized(req)) return res.status(401).json({ error: 'Invalid or missing x-api-key header' });

  // Parse body
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON body' }); }
  }

  const required = ['propertyType', 'subtype', 'state', 'metroTier', 'submarket', 'catZone', 'vintage'];
  const missing = required.filter(k => !body[k]);
  if (missing.length) return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });

  try {
    const config = await getConfig(DEFAULTS);
    const result = calculateOER(body, config);
    if (result.error) return res.status(400).json({ error: result.error });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
