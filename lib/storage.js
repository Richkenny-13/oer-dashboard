// Upstash Redis storage via HTTP REST API
// No SDK needed — pure fetch. Works in Vercel serverless functions.
//
// Resilience rules (added Q4 2026 refresh, 2026-11-06):
//   1. Redis is a cache for admin edits, never the source of truth. If it is
//      unreachable, deleted, or times out, every reader falls back to the
//      deployed DEFAULTS instead of failing. (The Q2 2026 build returned
//      "fetch failed" and blanked the dashboard when the Upstash DB went away.)
//   2. If the deployed DEFAULTS carry a newer dataCurrency.lastUpdated than the
//      cached config, the deployed data wins. A quarterly code refresh therefore
//      takes effect on deploy without anyone needing the admin password to
//      clear the cache.

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const CONFIG_KEY = 'oer:config';
const TIMEOUT_MS = 4000;

async function redisFetch(path, opts = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(`${REDIS_URL}${path}`, {
      ...opts,
      signal: ctrl.signal,
      headers: { Authorization: `Bearer ${REDIS_TOKEN}`, ...(opts.headers || {}) }
    });
  } finally {
    clearTimeout(timer);
  }
}

async function redisGet(key) {
  if (!REDIS_URL) return null;
  try {
    const res = await redisFetch(`/get/${key}`);
    if (!res.ok) { console.warn(`redisGet ${key}: HTTP ${res.status}`); return null; }
    const data = await res.json();
    if (!data.result) return null;
    try { return JSON.parse(data.result); } catch { return data.result; }
  } catch (err) {
    console.warn(`redisGet ${key} failed, using defaults: ${err.message}`);
    return null;
  }
}

async function redisSet(key, value) {
  if (!REDIS_URL) throw new Error('UPSTASH_REDIS_REST_URL not set');
  const res = await redisFetch(`/set/${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(JSON.stringify(value))  // Upstash expects a JSON-encoded string
  });
  if (!res.ok) throw new Error(`Redis write failed: HTTP ${res.status}`);
  return true;
}

// Health probe: is the config store reachable right now?
async function redisStatus() {
  if (!REDIS_URL) return { configured: false, reachable: false };
  try {
    const res = await redisFetch(`/ping`);
    return { configured: true, reachable: res.ok };
  } catch (err) {
    return { configured: true, reachable: false, error: err.message };
  }
}

function newerThan(a, b) {
  // true when ISO date string a is strictly after b (missing values count as oldest)
  const ta = Date.parse(a || '') || 0, tb = Date.parse(b || '') || 0;
  return ta > tb;
}

// Get full OER config, merging with defaults for any missing keys
async function getConfig(DEFAULTS) {
  const stored = await redisGet(CONFIG_KEY);
  if (!stored) return { ...DEFAULTS, _source: 'defaults' };

  const deployedIsNewer = newerThan(DEFAULTS.dataCurrency?.lastUpdated, stored.dataCurrency?.lastUpdated);
  if (deployedIsNewer) {
    // The code shipped a fresher quarter than the cache holds. Use the deployed
    // data wholesale so a stale cache can never mask a refresh.
    return { ...DEFAULTS, _source: 'defaults (deployed data newer than cached config)' };
  }

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
    // openItems is code-managed, not admin-editable — always take the deployed value
    // so known caveats can't be stranded by an older cached config.
    openItems:    DEFAULTS.openItems,
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

// Drop the cached config so the deployed defaults take effect again.
async function resetConfig() {
  if (!REDIS_URL) throw new Error('UPSTASH_REDIS_REST_URL not set');
  const res = await redisFetch(`/del/${CONFIG_KEY}`, { method: 'POST' });
  return res.ok;
}

module.exports = { getConfig, updateConfigSection, setConfig, resetConfig, redisGet, redisSet, redisStatus };
