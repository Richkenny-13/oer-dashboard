// Upstash Redis storage via HTTP REST API
// No SDK needed — pure fetch. Works in Vercel serverless functions.

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const CONFIG_KEY = 'oer:config';

async function redisGet(key) {
  if (!REDIS_URL) return null;
  const res = await fetch(`${REDIS_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
  });
  const data = await res.json();
  if (!data.result) return null;
  try { return JSON.parse(data.result); } catch { return data.result; }
}

async function redisSet(key, value) {
  if (!REDIS_URL) throw new Error('UPSTASH_REDIS_REST_URL not set');
  const res = await fetch(`${REDIS_URL}/set/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(JSON.stringify(value))  // Upstash expects a JSON-encoded string
  });
  return res.ok;
}

// Get full OER config, merging with defaults for any missing keys
async function getConfig(DEFAULTS) {
  const stored = await redisGet(CONFIG_KEY);
  if (!stored) return { ...DEFAULTS, _source: 'defaults' };
  // Merge: stored overrides defaults, but missing keys fall back to defaults
  return {
    dataCurrency: stored.dataCurrency || DEFAULTS.dataCurrency,
    baseRanges:   stored.baseRanges   || DEFAULTS.baseRanges,
    stateAdj:     stored.stateAdj     || DEFAULTS.stateAdj,
    metroTiers:   stored.metroTiers   || DEFAULTS.metroTiers,
    submarkets:   stored.submarkets   || DEFAULTS.submarkets,
    catZones:     stored.catZones     || DEFAULTS.catZones,
    vintageAdj:   stored.vintageAdj   || DEFAULTS.vintageAdj,
    allocations:  stored.allocations  || DEFAULTS.allocations,
    marketNotes:  stored.marketNotes  || DEFAULTS.marketNotes,
    _source: 'redis'
  };
}

// Update a single section of the config
async function updateConfigSection(key, value, DEFAULTS) {
  const current = await getConfig(DEFAULTS);
  const allowed = ['dataCurrency','baseRanges','stateAdj','metroTiers','submarkets',
                   'catZones','vintageAdj','allocations','marketNotes'];
  if (!allowed.includes(key)) throw new Error(`Invalid config key: ${key}`);
  current[key] = value;
  delete current._source;
  await redisSet(CONFIG_KEY, current);
  return current;
}

// Replace entire config
async function setConfig(config) {
  await redisSet(CONFIG_KEY, config);
}

module.exports = { getConfig, updateConfigSection, setConfig, redisGet, redisSet };
