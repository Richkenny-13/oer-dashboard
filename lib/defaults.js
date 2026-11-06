// Q4 2026 Default OER Configuration (refreshed 2026-11-06 from Q3 2026 filings and releases)
// This is the deployed baseline. Admin-panel edits override it in Redis, except that a deployed
// dataCurrency.lastUpdated newer than the cached one makes the deployed data win (see lib/storage.js).

const DEFAULTS = {
  dataCurrency: {
    quarter: 'Q4', year: 2026,
    lastUpdated: '2026-11-06',
    source: 'REIT same-store filings Q3 2026 (MAA, Vivmark [AVB+EQR], Camden, UDR, Essex, IRT) · Marsh Global Insurance Market Index Q3 2026 · BLS CPI Sep 2026, PPI Sep 2026, ECI Q3 2026 · EIA STEO Oct 2026 · Nov 3 2026 ballot results (FL Amendment 3, NC levy limit) · Georgia SB 33',
    // Per-asset-class vintage. Multifamily was refreshed in the Q4 2026 pass; the other four were
    // cross-checked against Q3 2026 filings and re-dated with notes, but their ranges were not recalibrated.
    vintage: {
      multifamily: { asOf: 'Q4 2026', status: 'current',
        basis: 'MAA, Vivmark (AvalonBay + Equity Residential, merged 2026-08-17), Camden, UDR and Essex Q3 2026 same-store line items. Base ranges held from the Q3 2026 pass after cross-check: five-REIT weighted ex-payroll opex 32.5% of revenue incl. 3.0% mgmt fee + 1.4% reserves (Essex 29.0% to MAA 34.9%; derived). Six-category split re-derived from the Q3 2026 line items.' },
      office:      { asOf: 'Q2 2026', status: 'stale',
        basis: 'Prior baseline, not recalibrated. BOMA EER no longer exists as a product (replaced by Income/Expense IQ, itself shut 2025-12-31). Q3 2026 office REITs publish NOI growth only: Cousins same-property expenses +2%; BXP cites lower opex (tax appeals, R&M) for half its Q3 beat.' },
      retail:      { asOf: 'Q2 2026', status: 'stale',
        basis: 'Prior baseline, not recalibrated. Q3 2026 cross-check: Regency expense recovery ratio 87.5% (85.7% prior year), NOI margin 69.8%; Brixmor recovery 95.3% (92.7%), same-property opex +4.7%; Kimco SPNOI +4.9%; Simon domestic NOI +6.6%. No recovery ratio from Simon, Kimco or Federal.' },
      industrial:  { asOf: 'Q2 2026', status: 'stale',
        basis: 'Prior baseline, not recalibrated. Warehouse REITs (Prologis, Rexford, EastGroup, First Industrial, STAG) disclose NOI growth only. Self-storage Q3 2026 line items: taxes +4.0% (CubeSmart) to +4.9% (Extra Space), -0.8% (Public Storage); insurance -10.9% (CubeSmart) / -16.5% (Extra Space); R&M -20% to +17.4%. Digital Realty recovers ~89% of utilities (derived).' },
      hospitality: { asOf: 'Q2 2026', status: 'stale',
        basis: 'Prior baseline, not recalibrated. Q3 2026 comparable-hotel EBITDA margins: Host 25.2%, Park 25.7%, Pebblebrook 28.8%, Summit 32.6%, Apple 37.1% (all +50 to +210 bp YoY); total hotel expenses +4.0% to ~6%, +2.7% to +3% per occupied room; Host wages ~5% growth and ~50% of hotel opex. No STR/CoStar Q3 2026 P&L.' }
    },
    // IREM Income/Expense IQ was PERMANENTLY RETIRED 2025-12-31. Its final dataset was
    // CY2024 operating data published Aug 2025. BOMA's EER was folded into it earlier and is also gone.
    retiredSources: ['IREM / BOMA / NAA Income/Expense IQ (retired 2025-12-31; final data CY2024)', 'BOMA Experience Exchange Report (replaced by Income/Expense IQ; no 2026 edition)']
  },
  baseRanges: {
    multifamily: {
      // Q3 2026 refresh — recalibrated against MAA / AvalonBay Q2 2026 and EQR Q1 2026
      // same-store filings, converted to ex-payroll % of EGI incl. 3.0% mgmt fee + reserves.
      // Q4 2026 pass — HELD. Q3 2026 same-store margins moved less than 1pp (MAA NOI margin 60.9% vs
      // 61.8%; Camden 63.4% flat; UDR 67.9% vs 68.0%; Essex 69.6% vs 69.5%; derived or disclosed),
      // so the ranges were cross-checked and kept rather than re-cut.
      'Institutional Class A (300+ units)': { low: 23, high: 29 },
      'Class A Garden (built 2000+)':       { low: 27, high: 33 },
      'Class B (built 1980-2000)':           { low: 30, high: 36 },
      'Class C (built pre-1980)':            { low: 33, high: 39 },
      'Student Housing':                     { low: 35, high: 42 },
      'Affordable / LIHTC':                  { low: 38, high: 45 },
      // SENIOR HOUSING — STILL UNDER REVIEW; evidence now in, ranges not yet changed (owner decision).
      // Brookdale 3Q26 supplemental (2026-11-06): same-community labor $313.8M of $490.5M facility opex
      // = 64.0% (derived); other facility opex 25.5% of revenue; operating margin 29.2%.
      // ASHA Q1 2026 Performance Trends: majority-IL opex 70% of revenue with labor 38% of revenue
      // (ex-labor ~32%, derived); majority-AL 72% / 43% (ex-labor ~29%). Operating margins IL 30%, AL 28%.
      // ASHA State of Seniors Housing YE2025 annual edition is published (paywalled, not purchased).
      // Read: these ex-payroll ranges look overstated by roughly 5-15pp. See openItems.
      'Senior Independent Living':           { low: 35, high: 41, review: true },
      'Senior Assisted Living':              { low: 42, high: 48, review: true },
      'Senior Memory Care':                  { low: 45, high: 52, review: true }
    },
    office: {
      'CBD Trophy / Class A+':    { low: 22, high: 28 },
      'Suburban Class A':         { low: 24, high: 30 },
      'Class B Urban':            { low: 27, high: 32 },
      'Class B Suburban':         { low: 25, high: 31 },
      'Class C':                  { low: 30, high: 36 },
      'Medical Office (MOB)':     { low: 30, high: 36 },
      'Life Science / Lab':       { low: 34, high: 42 },
      'Government Leased':        { low: 20, high: 26 }
    },
    retail: {
      'Regional Mall (>800k SF)':       { low: 18, high: 26 },
      'Lifestyle / Town Center':        { low: 16, high: 24 },
      'Power Center':                   { low:  8, high: 15 },
      'Grocery-Anchored Center':        { low: 10, high: 18 },
      'Strip Center (<30k SF)':         { low: 12, high: 20 },
      'Single Tenant NNN':              { low:  0, high:  5 },
      'Urban Street Retail':            { low: 22, high: 30 },
      'Restaurant / Entertainment':     { low: 28, high: 36 }
    },
    industrial: {
      'Bulk Distribution (>250k SF)':   { low:  6, high: 12 },
      'Light Industrial (<100k SF)':    { low: 10, high: 16 },
      'Last-Mile / Urban Logistics':    { low: 12, high: 18 },
      'Flex / R&D':                     { low: 16, high: 22 },
      'Cold Storage':                   { low: 22, high: 30 },
      'Manufacturing':                  { low: 14, high: 22 },
      'Self-Storage':                   { low: 22, high: 28 },
      'Data Centers':                   { low: 32, high: 44 }
    },
    hospitality: {
      'Limited Service':  { low: 35, high: 42 },
      'Select Service':   { low: 38, high: 45 },
      'Full Service':     { low: 42, high: 50 },
      'Luxury / Resort':  { low: 45, high: 52 },
      'Extended Stay':    { low: 32, high: 40 }
    }
  },
  stateAdj: {
    AL:{name:'Alabama',tier:'Low',low:-6,high:-9},AK:{name:'Alaska',tier:'Highest',low:10,high:14},
    AZ:{name:'Arizona',tier:'Moderate',low:0,high:0},AR:{name:'Arkansas',tier:'Lowest',low:-8,high:-10},
    CA:{name:'California',tier:'Highest',low:8,high:12},CO:{name:'Colorado',tier:'Moderate',low:0,high:0},
    CT:{name:'Connecticut',tier:'Highest',low:7,high:10},DC:{name:'District of Columbia',tier:'Highest',low:8,high:11},
    DE:{name:'Delaware',tier:'Moderate',low:0,high:0},FL:{name:'Florida',tier:'Moderate',low:0,high:1},
    GA:{name:'Georgia',tier:'Moderate',low:0,high:0},HI:{name:'Hawaii',tier:'Highest',low:12,high:15},
    ID:{name:'Idaho',tier:'Moderate',low:0,high:0},IL:{name:'Illinois',tier:'High',low:4,high:7},
    IN:{name:'Indiana',tier:'Low',low:-5,high:-8},IA:{name:'Iowa',tier:'Lowest',low:-6,high:-9},
    KS:{name:'Kansas',tier:'Lowest',low:-6,high:-9},KY:{name:'Kentucky',tier:'Low',low:-6,high:-9},
    LA:{name:'Louisiana',tier:'Low',low:-5,high:-8},ME:{name:'Maine',tier:'Moderate',low:0,high:0},
    MD:{name:'Maryland',tier:'High',low:3,high:5},MA:{name:'Massachusetts',tier:'Highest',low:8,high:11},
    MI:{name:'Michigan',tier:'Low',low:-4,high:-7},MN:{name:'Minnesota',tier:'Moderate',low:0,high:0},
    MS:{name:'Mississippi',tier:'Lowest',low:-8,high:-11},MO:{name:'Missouri',tier:'Low',low:-4,high:-7},
    MT:{name:'Montana',tier:'Low',low:-3,high:-6},NE:{name:'Nebraska',tier:'Low',low:-4,high:-7},
    NV:{name:'Nevada',tier:'Moderate',low:0,high:0},NH:{name:'New Hampshire',tier:'Moderate',low:0,high:0},
    NJ:{name:'New Jersey',tier:'High',low:5,high:8},NM:{name:'New Mexico',tier:'Moderate',low:0,high:0},
    NY:{name:'New York',tier:'Highest',low:10,high:13},NC:{name:'North Carolina',tier:'Moderate',low:0,high:0},
    ND:{name:'North Dakota',tier:'Low',low:-4,high:-7},OH:{name:'Ohio',tier:'Low',low:-3,high:-6},
    OK:{name:'Oklahoma',tier:'Lowest',low:-7,high:-10},OR:{name:'Oregon',tier:'High',low:3,high:5},
    PA:{name:'Pennsylvania',tier:'Moderate',low:0,high:0},RI:{name:'Rhode Island',tier:'High',low:4,high:6},
    SC:{name:'South Carolina',tier:'Low',low:-5,high:-8},SD:{name:'South Dakota',tier:'Low',low:-4,high:-7},
    TN:{name:'Tennessee',tier:'Low',low:-4,high:-7},TX:{name:'Texas',tier:'Moderate',low:0,high:0},
    UT:{name:'Utah',tier:'Moderate',low:0,high:0},VT:{name:'Vermont',tier:'Moderate',low:0,high:0},
    VA:{name:'Virginia',tier:'Moderate',low:0,high:0},WA:{name:'Washington',tier:'High',low:3,high:6},
    WV:{name:'West Virginia',tier:'Lowest',low:-8,high:-11},WI:{name:'Wisconsin',tier:'Moderate',low:0,high:0},
    WY:{name:'Wyoming',tier:'Low',low:-3,high:-6}
  },
  metroTiers: {
    t1: { name:'Tier 1 — Gateway',   examples:'SF Bay Area, NYC, Boston, DC Metro, Los Angeles, Chicago Loop', low: 8, high:12 },
    t2: { name:'Tier 2 — Primary',   examples:'Seattle, Miami, San Diego, Denver, Austin, Portland',           low: 4, high: 8 },
    t3: { name:'Tier 3 — Secondary', examples:'Phoenix, Atlanta, Dallas, Houston, Philadelphia, Tampa',         low: 0, high: 4 },
    t4: { name:'Tier 4 — Tertiary',  examples:'San Antonio, Orlando, Sacramento, Las Vegas, Kansas City',       low:-5, high:-2 }
  },
  submarkets: {
    cbd:                { name:'CBD / Downtown',       low: 1.0, high: 1.5 },
    urban_core:         { name:'Urban Core',           low: 0.5, high: 1.0 },
    suburban_prime:     { name:'Suburban Prime',       low: 0,   high: 0   },
    suburban_secondary: { name:'Suburban Secondary',   low:-0.5, high:-0.5 },
    rural:              { name:'Rural / Exurban',      low:-1.0, high:-1.0 }
  },
  catZones: {
    none:         { name:'None / Standard Market',              low:2, high: 3, active:true },
    hurricane_z1: { name:'Hurricane Zone 1 (Coastal FL/LA/TX)', low:6, high:12, active:true },
    hurricane_z2: { name:'Hurricane Zone 2 (Inland FL/Carolinas)',low:4,high:7, active:true },
    wildfire:     { name:'California Wildfire WUI',             low:5, high: 9, active:true },
    earthquake:   { name:'Earthquake (CA/WA/AK)',               low:3, high: 6, active:true },
    tornado:      { name:'Tornado Alley (OK/KS/NE/TX Panhandle)',low:2,high: 4, active:true }
  },
  vintageAdj: {
    new:     { name:'New (0-3yr)',     low:-15, high:-10 },
    recent:  { name:'Recent (4-10yr)',  low: -5, high: -3 },
    mature:  { name:'Mature (11-20yr)', low:  0, high:  0 },
    aging:   { name:'Aging (21-30yr)',  low:  5, high: 10 },
    vintage: { name:'Vintage (30+yr)',  low: 10, high: 20 }
  },
  allocations: {
    // Q4 2026 refresh — re-derived ex-payroll from Q3 2026 same-store line items of MAA, Vivmark,
    // Camden, UDR and Essex (combined $3.14B quarterly revenue): taxes 36.9%, insurance 4.5%,
    // mgmt & admin 17.6% (on-site office/marketing/G&A + 3.0% mgmt fee), utilities 20.3%,
    // maintenance 16.4%, reserves 4.3% (1.4% of EGI = $250-350/unit/yr; NOT recurring capex).
    // Rounded by largest remainder. Excluding Vivmark the split is 37/5/17/21/16/4, so the merger
    // does not drive it. Vs Q3 2026 pass: taxes +3, utilities +3, insurance -2, maintenance -3, mgmt -1.
    multifamily: { taxes:37, insurance: 5, management:18, utilities:20, maintenance:16, reserves:4 },
    // NOTE: office split below is an unverified copy of the pre-refresh multifamily split
    // (identical across all six categories — a copy-paste artifact, not a derivation).
    // Flagged for re-derivation. BOMA EER is gone; candidates are office REIT 10-Q line items or the
    // Houston BOMA OpEx Report (regional). Do not rely on it.
    office:      { taxes:35, insurance:12, management:12, utilities:18, maintenance:15, reserves:8 },
    retail:      { taxes:60, insurance:12, management: 8, utilities: 5, maintenance: 8, reserves:7 },
    industrial:  { taxes:45, insurance:15, management:10, utilities:10, maintenance:12, reserves:8 },
    hospitality: { taxes:25, insurance:12, management:15, utilities:22, maintenance:18, reserves:8 }
  },
  marketNotes: {
    insurance:   'STILL SOFTENING, BUT SLOWER. Marsh Q3 2026: US property rates -10% (Q2 -13%), ninth consecutive quarterly property decline; CAT-driven programs -13%, non-CAT -9%. Gallagher global property renewals -6% (Q2 -10%); Ivans small-account index still +5.65% but decelerating. Apartment REIT same-store insurance Q3 2026: Camden -18.3%, IRT ~-17%, UDR -11.5%, MAA -10.0%, Essex -5.7%, Vivmark -1.7%; insurance is now only 3.5-5.9% of same-store opex. Benign losses: 9M 2026 global insured cat losses ~$91-92B (lowest since 2019); 2026 Atlantic season 10 named storms, one hurricane (Isaias, ~$1-4.5B insured). 1/1/2027 reinsurance expected down again (~10% consensus; JPMorgan 10-20%) on record capital, so the July view that softening ends in 2027 is withdrawn. Regional exceptions: Florida Citizens commercial-residential +7-14% (2026 filing) while FL surplus-lines pricing is down ~18-40%; California FAIR Plan +29.1% from 2026-10-15; TWIA flat for 2027.',
    utilities:   'STILL THE FASTEST-GROWING EXPENSE LINE. Q3 2026 same-store utilities: Camden +7.3%, Vivmark +7.1% (bulk telecom, electricity, water/sewer, trash), UDR +6.2% (commodity prices), MAA +5.3%, Essex +4.7%. CPI Sep 2026: electricity +4.4% (Jun: +4.0%), piped gas +5.0%, water/sewer/trash +4.8%; Northeast electricity +7.1%, South +1.9%. EIA Oct STEO: PJM wholesale +41% in 2026, then -7% in 2027; retail electricity growth expected to slow in 2027 (residential ~+2.6%, commercial ~+1.5%, derived from STEO Table 7a). Henry Hub averaged $2.87 in Q3 2026; EIA sees 2027 at $3.16 (-9%). Read: 2026 actuals are running 5-7%, with part of the increase rebilled or offset by bulk-internet income; 2027 should ease toward 4-5% outside PJM and New England.',
    propertyTax: 'FLAT NOW; STRUCTURAL SHIFT ARRIVES IN 2027. Q3 2026 same-store taxes: MAA -0.5%, Camden -0.6%, Essex +1.6% (Prop 8 appeals), UDR +2.0%, IRT +3%, Vivmark +2.9% (AVB California merger reassessment: ~$16M in 2026, ~$50M/yr from 2027). MAA, Camden and UDR cut 2026 expense guidance on lower taxes; Essex expects 2027 back to its 3-4% norm; MAA expects nothing "outsized". Nov 3 2026 ballots: Florida Amendment 3 passed (~62%) — non-homestead assessment cap drops from 10% to 5% for non-school levies from Jan 1 2027, while the homestead exemption rises to $150k (2027) and $250k (2028), shifting the non-school burden toward rentals and commercial; North Carolina levy-limit amendment passed (~60%); Oklahoma SQ 847 (tighter caps) failed. Georgia SB 33 (signed May 11 2026) ends HB 581 opt-outs for tax year 2027, so Fulton, Gwinnett, Cobb and DeKalb homestead bases become inflation-capped and non-homestead property carries the digest growth; 2026 metro millage mostly flat (Fulton 8.87, Gwinnett 6.95, Cobb 8.46; DeKalb +0.5 mill; Fulton Schools proposed +1.00). Texas: the 20% non-homestead circuit-breaker cap expires after 2026; Harris County combined rate +7.6%; HCAD 2026 commercial values +1.7%.',
    maintenance: 'INPUT COSTS SPIKING, OPERATOR SPEND MODERATE — still do not apply construction PPI to an R&M budget. PPI net inputs to maintenance and repair construction +12.0% YoY in Sep 2026 (July refresh: +4.9%); AGC construction inputs +11.9% (diesel +115%, steel +28%, copper +30%, aluminum +25%); but contractor bid prices only +5.4% and nonresidential M&R pricing +4.8%, so contractors are absorbing most of it for now. Apartment REIT same-store R&M Q3 2026: Essex +10.7% (project timing), MAA +4.8%, Vivmark +2.5%, UDR +2.1%, Camden +2.0%. Record-low turnover (MAA 39.6% trailing 12 months; UDR 48.0% annualized vs 51.7%; Camden net 42% vs 44%) keeps make-ready volume down. Expect a 2027 catch-up in contractor pricing for roofing, paving and HVAC work.',
    payroll:     'CONTEXT ONLY — excluded from these ratios. ECI Q3 2026: private wages +3.1% (real -0.6%); real estate and rental wages +3.8%, 70bp above all-private. REIT on-site payroll Q3 2026: Camden -3.2%, MAA -0.2%, Essex +1.6%, UDR +3.3% (merit plus severance), Vivmark +4.2%. MAA "Reimagine" (~$25M run-rate margin gain by end-2027) and Vivmark synergies ($135M net, >$45M from on-site costs) hold institutional payroll flat-to-down; smaller operators run 3.5-4%; union craft settlements 4.9%. Payroll is 14.5-22.0% of same-store opex at the five reporters, and 64% of facility opex at Brookdale senior housing (derived).',
    direction:   'NET 2026 DIRECTION IS STILL DOWN AT THE SUN BELT REITs, UP AT THE COASTAL MERGER. FY2026 same-store expense guidance after Q3: MAA cut to 1.15-1.65% (from 1.25-2.25%), Camden cut to 1.50-2.00% (from 2.00-3.00%), UDR cut to 2.70-3.10% (from 2.75-3.75%), Essex held at 2.6-2.9%, IRT held at 1.6-2.4%; Vivmark (AVB + EQR, merged 2026-08-17) issued 4.1-4.7%, or 3.6% excluding the California reassessment. Taxes and insurance are the drag reducers; utilities, marketing and (in inputs) R&M are the pressure. 2027 watch list: tax re-acceleration (Essex 3-4%; Florida and Georgia burden shift; Texas cap expiry), contractor catch-up on R&M, and insurance resetting from a lower base.'
  },
  // Known open items carried into the next refresh cycle. Code-managed; not admin-editable.
  openItems: [
    'Office, retail, industrial and hospitality base ranges are still Q2 2026 vintage. Q3 2026 filings were read and recorded in the vintage notes; the ranges were not recalibrated.',
    'Office six-category allocation is an unverified copy of the pre-refresh multifamily split. BOMA EER is gone and Income/Expense IQ shut 2025-12-31; re-derive from office REIT 10-Q line items or the Houston BOMA OpEx Report.',
    'Senior housing (IL/AL/MC): evidence now supports the overstatement caveat. Brookdale 3Q26 labor = 64.0% of facility opex and other facility opex = 25.5% of revenue; ASHA Q1 2026 majority-IL opex 70% of revenue with labor 38% (ex-labor ~32%), majority-AL 72% / 43% (ex-labor ~29%); all derived from published figures. Current IL 35-41 / AL 42-48 / MC 45-52 look roughly 5-15pp high. Owner to confirm whether management & admin absorbs dietary, housekeeping and food cost before any range changes; ASHA YE2025 annual edition is available ($375, paywalled).',
    'Hospitality cross-check: Q3 2026 comparable-hotel EBITDA margins 25.2% (Host) to 37.1% (Apple) imply total hotel expenses of 63-75% of revenue; with wages ~50% of hotel opex (Host), the ex-wage share is ~31-37% of revenue (derived) against dashboard ranges of 32-52%. Definitions differ (hotel opex includes F&B cost, franchise and management fees). Owner decision before recalibrating.',
    'Retail cross-check: open-air REIT recovery ratios 87.5% (Regency) and 95.3% (Brixmor) with a 69.8% NOI margin (Regency) imply unrecovered opex of a few percent of revenue at institutional centers; dashboard grocery-anchored and strip ranges (10-18 / 12-20, net of recoveries plus fee) were not re-derived. Smaller centers recover less.',
    'Metro-tier and state adjustments still over-stack on gateway assets. Q3 2026 read: five-REIT weighted ex-payroll opex 32.5% of revenue incl. 3.0% fee + 1.4% reserves (Essex 29.0%, UDR 31.8%, Vivmark 32.5%, Camden 34.2%, MAA 34.9%; derived). High-cost markets are also high-rent markets. Consider cutting Tier 1 to +2/+4 and halving the "Highest" state tier.',
    'Series break: the AvalonBay and Equity Residential standalone series end at Q2 2026. Vivmark reports a restated Merged Same Store pool (157,377 homes) from Q3 2026; future refreshes compare to that base.',
    'Not yet published at refresh time: CIAB Q3 2026 market survey, Aon Q3 2026 observed property rate, STR/CoStar Q3 2026 hotel P&L, Camden Q3 2026 call transcript (call held 2026-11-06), October 2026 PPI (due 2026-11-13).'
  ]
};

module.exports = DEFAULTS;
