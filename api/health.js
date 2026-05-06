const DEFAULTS = require('../lib/defaults');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();

  const upstashConfigured = !!(process.env.UPSTASH_REDIS_REST_URL);

  res.status(200).json({
    status: 'ok',
    service: 'OER Dashboard API',
    version: '1.0.0',
    dataQuarter: `${DEFAULTS.dataCurrency.quarter} ${DEFAULTS.dataCurrency.year}`,
    storageBackend: upstashConfigured ? 'upstash-redis' : 'defaults-only',
    timestamp: new Date().toISOString()
  });
};
