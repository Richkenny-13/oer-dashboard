const DEFAULTS = require('../lib/defaults');
const { redisStatus } = require('../lib/storage');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();

  const store = await redisStatus();
  const dc = DEFAULTS.dataCurrency || {};

  res.status(200).json({
    status: 'ok',
    service: 'OER Dashboard API',
    version: '1.1.0',
    dataQuarter: `${dc.quarter} ${dc.year}`,
    dataLastUpdated: dc.lastUpdated,
    storageBackend: store.configured ? 'upstash-redis' : 'defaults-only',
    storageReachable: store.reachable,
    // When the store is unreachable the API still serves the deployed defaults.
    servingFrom: store.reachable ? 'redis-or-defaults' : 'deployed-defaults',
    timestamp: new Date().toISOString()
  });
};
