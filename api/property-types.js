const DEFAULTS = require('../lib/defaults');
const { getConfig } = require('../lib/storage');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const config = await getConfig(DEFAULTS);
    const result = {};
    for (const [pt, subtypes] of Object.entries(config.baseRanges)) {
      result[pt] = {
        subtypes: Object.keys(subtypes),
        defaultAllocation: config.allocations[pt] || null
      };
    }
    res.status(200).json({
      propertyTypes: result,
      metroTiers: Object.keys(config.metroTiers).map(k => ({ key: k, ...config.metroTiers[k] })),
      states: Object.entries(config.stateAdj).map(([code, s]) => ({ code, name: s.name, tier: s.tier })),
      submarkets: Object.entries(config.submarkets).map(([k, s]) => ({ key: k, name: s.name })),
      catZones: Object.entries(config.catZones).filter(([,z]) => z.active).map(([k, z]) => ({ key: k, name: z.name })),
      vintages: Object.entries(config.vintageAdj).map(([k, v]) => ({ key: k, name: v.name }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
