// OER Calculation Engine — shared by API and client
// All adjustments are in percentage points of EGI

function calculateOER(inputs, config) {
  const { propertyType, subtype, state, metroTier, submarket, catZone, vintage, propertyClass } = inputs;

  // --- Validate inputs ---
  const pt = (propertyType || '').toLowerCase();
  const ranges = config.baseRanges[pt];
  if (!ranges) return { error: `Unknown property type: ${pt}` };

  const base = ranges[subtype];
  if (!base) return { error: `Unknown subtype: ${subtype}` };

  // --- Pull adjustments ---
  // Subtypes whose base range already embeds a specific market (e.g. NYC Trophy) skip the
  // state and metro-tier adjustments, which would otherwise double-count that market's costs.
  const embeds = !!base.embedsLocation;
  const stAdj  = embeds ? { low:0, high:0, tier:'embedded in subtype' } : (config.stateAdj[state] || { low:0, high:0 });
  const mtAdj  = embeds ? { low:0, high:0 } : (config.metroTiers[metroTier] || { low:0, high:0 });
  const smAdj  = config.submarkets[submarket]     || { low:0, high:0 };
  const catAdj = config.catZones[catZone]         || { low:2, high:3 };
  const vaAdj  = config.vintageAdj[vintage]       || { low:0, high:0 };

  // Class modifier
  const classMods = { small:1, medium:0, large:-1, institutional:-2 };
  const clsMod = classMods[(propertyClass||'medium').toLowerCase()] ?? 0;

  // --- Stack adjustments ---
  let lo = base.low  + stAdj.low  + mtAdj.low  + smAdj.low  + catAdj.low  + vaAdj.low  + clsMod;
  let hi = base.high + stAdj.high + mtAdj.high + smAdj.high + catAdj.high + vaAdj.high + clsMod;

  // Floor at 0
  lo = Math.max(0, lo);
  hi = Math.max(lo, hi);

  const mid = (lo + hi) / 2;
  const rw  = hi - lo;

  // --- Confidence ---
  let conf = 95;
  if (rw > 12) conf -= 12;
  else if (rw > 8) conf -= 6;
  else if (rw > 5) conf -= 2;

  const mos = monthsSince(config.dataCurrency?.lastUpdated);
  let stalePenalty = 0;
  if (mos > 12) stalePenalty = 15;
  else if (mos > 9) stalePenalty = 10;
  else if (mos > 6) stalePenalty = 5;
  conf = Math.max(45, conf - stalePenalty);

  // --- Warnings ---
  const warnings = [];
  if (subtype.includes('Class C') && vintage === 'new')
    warnings.push('Unusual combination: New construction + Class C. Verify inputs.');
  if (conf < 70)
    warnings.push(`Low confidence (${conf}%). Manual verification recommended before IC presentation.`);
  if (hi > 60)
    warnings.push(`High OER detected (${hi.toFixed(1)}%). Review adjustment stack.`);

  // --- Category breakdown ---
  const alloc = config.allocations[pt] || config.allocations.multifamily;
  const breakdown = {
    propertyTaxes:    +((alloc.taxes      / 100) * mid).toFixed(2),
    insurance:        +((alloc.insurance  / 100) * mid).toFixed(2),
    managementAdmin:  +((alloc.management / 100) * mid).toFixed(2),
    utilities:        +((alloc.utilities  / 100) * mid).toFixed(2),
    maintenanceRepairs: +((alloc.maintenance/ 100) * mid).toFixed(2),
    reservesReplacement:+((alloc.reserves  / 100) * mid).toFixed(2)
  };

  return {
    // Core result
    low:        +lo.toFixed(2),
    high:       +hi.toFixed(2),
    midpoint:   +mid.toFixed(2),
    rangeWidth: +rw.toFixed(2),
    confidence: conf,
    unit:       'percent_of_EGI',

    // Scenarios
    scenarios: {
      bestCase:      +(lo - 1.5).toFixed(2),
      mostProbable:  +mid.toFixed(2),
      stressCase:    +(hi + 2.0).toFixed(2)
    },

    // Adjustment stack (traceable)
    adjustments: {
      base:       { low: base.low,   high: base.high,   note: `${pt} / ${subtype}` },
      state:      { low: stAdj.low,  high: stAdj.high,  note: `${state} (${stAdj.tier || ''})` },
      metro:      { low: mtAdj.low,  high: mtAdj.high,  note: embeds ? 'embedded in subtype' : (config.metroTiers[metroTier]?.name || metroTier) },
      submarket:  { low: smAdj.low,  high: smAdj.high,  note: config.submarkets[submarket]?.name || submarket },
      catZone:    { low: catAdj.low, high: catAdj.high, note: config.catZones[catZone]?.name || catZone },
      vintage:    { low: vaAdj.low,  high: vaAdj.high,  note: config.vintageAdj[vintage]?.name || vintage },
      classSize:  { low: clsMod,     high: clsMod,      note: propertyClass }
    },

    // Category breakdown (pp of midpoint OER)
    breakdown,
    allocationPct: alloc,

    // Metadata
    locationEmbeddedInSubtype: embeds,
    warnings,
    dataQuarter: `${config.dataCurrency?.quarter} ${config.dataCurrency?.year}`,
    dataStaleMonths: mos,
    calculatedAt: new Date().toISOString()
  };
}

function monthsSince(dateStr) {
  try {
    const d = new Date(dateStr), n = new Date();
    return (n.getFullYear() - d.getFullYear()) * 12 + (n.getMonth() - d.getMonth());
  } catch { return 0; }
}

module.exports = { calculateOER, monthsSince };
