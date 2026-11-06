// Q4 2026 Default OER Configuration (refreshed 2026-11-06 from Q3 2026 filings and releases)
// This is the deployed baseline. Admin-panel edits override it in Redis, except that a deployed
// dataCurrency.lastUpdated newer than the cached one makes the deployed data win (see lib/storage.js).

const DEFAULTS = {
  dataCurrency: {
    quarter: 'Q4', year: 2026,
    lastUpdated: '2026-11-06',
    source: 'REIT same-store filings Q3 2026 (MAA, Vivmark [AVB+EQR], Camden, UDR, Essex, IRT) · Marsh Global Insurance Market Index Q3 2026 · BLS CPI Sep 2026, PPI Sep 2026, ECI Q3 2026 · EIA STEO Oct 2026 · Nov 3 2026 ballot results (FL Amendment 3, NC levy limit) · Georgia SB 33 · Retail and hotel REIT FY2025 10-Ks · Income/Expense IQ 2024 office data · NIC MAP Q3 2026',
    // Per-asset-class vintage. Q4 2026 pass: multifamily refreshed; retail, hospitality and office
    // ranges recalibrated 2026-11-06 from FY2025 10-Ks; office allocation re-derived; industrial
    // cross-checked and re-dated only. Status values: current | review | stale.
    vintage: {
      multifamily: { asOf: 'Q4 2026', status: 'current',
        basis: 'MAA, Vivmark (AvalonBay + Equity Residential, merged 2026-08-17), Camden, UDR and Essex Q3 2026 same-store line items. Base ranges held from the Q3 2026 pass after cross-check: five-REIT weighted ex-payroll opex 32.5% of revenue incl. 3.0% mgmt fee + 1.4% reserves (Essex 29.0% to MAA 34.9%; derived). Six-category split re-derived from the Q3 2026 line items.' },
      office:      { asOf: 'Q4 2026', status: 'current',
        basis: 'Base ranges adopted 2026-11-06 from FY2025 10-K expense ratios of 16 office, medical, life-science and government-leased REITs (Cousins 32.1%, Highwoods 32.4%, Kilroy 31.6%, Douglas Emmett 37.4%, Brandywine 38.2%, Piedmont 40.4%, BXP 39.5%, Paramount 45.4%, Empire State 50.7%, SL Green 56.0%, Vornado 59.0%, Healthpeak MOB 34.2%, Welltower 29.8%, Alexandria 31.3%, Easterly 33.1-34.6%; all derived). NYC trophy split out as its own subtype. Class B and C are provisional (no direct series) and flagged. Six-category allocation re-derived the same day from the final Income/Expense IQ national summary (2024 office data) with BOMA EER and BOMA Kansas City cross-checks.' },
      retail:      { asOf: 'Q4 2026', status: 'current',
        basis: 'Ranges restated 2026-11-06 on the gross basis (taxes + CAM over revenue incl. recoveries, plus fee and reserves) from FY2025 10-Ks and Q3 2026 supplementals of Simon, Macerich, Tanger, Regency, Brixmor, Kimco, Phillips Edison, InvenTrust, Kite, Federal Realty, Curbline, Acadia, Realty Income, Agree, NNN REIT, Four Corners and EPR, with ICSC/NCREIF and the Wingerd 2023 expense guide. Lifestyle, street retail and restaurant/entertainment rest on thin evidence and are flagged. Six-category retail split not re-derived.' },
      industrial:  { asOf: 'Q2 2026', status: 'stale',
        basis: 'Prior baseline, not recalibrated. Warehouse REITs (Prologis, Rexford, EastGroup, First Industrial, STAG) disclose NOI growth only. Self-storage Q3 2026 line items: taxes +4.0% (CubeSmart) to +4.9% (Extra Space), -0.8% (Public Storage); insurance -10.9% (CubeSmart) / -16.5% (Extra Space); R&M -20% to +17.4%. Digital Realty recovers ~89% of utilities (derived).' },
      hospitality: { asOf: 'Q4 2026', status: 'current',
        basis: 'Ranges recalibrated 2026-11-06 from FY2025 10-Ks and Q3 2026 releases of Host, Park, Xenia, Pebblebrook, DiamondRock, Sunstone, Apple, Summit, RLJ, Chatham, Braemar and Ryman, with Host\'s published payroll shares and CBRE/AHLA labor data; 3% base fee and 4% FF&E reserve. Limited service and luxury are flagged (no public limited-service REIT; luxury labor share is 2018 data). Q3 2026 comparable-hotel EBITDA margins 25.2% (Host) to 37.1% (Apple), +50 to +210 bp YoY. Six-category hospitality split not re-derived.' }
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
      // NIC MAP (public pages, read 2026-11-06): labor typically 50%+ of opex in AL and memory care; a 5%
      // labor-cost rise moves NOI 250bp+; occupancy 90.4% in Q3 2026, first time above 90% since 2014.
      // Operator expense benchmarks sit behind the NIC MAP subscription.
      // Read: these ex-payroll ranges look overstated by roughly 5-15pp. See openItems.
      'Senior Independent Living':           { low: 35, high: 41, review: true },
      'Senior Assisted Living':              { low: 42, high: 48, review: true },
      'Senior Memory Care':                  { low: 45, high: 52, review: true }
    },
    office: {
      // Q4 2026 (2026-11-06) — ADOPTED by Richard from FY2025 10-K expense ratios (property operating
      // expenses incl. real estate taxes over rental revenue incl. recoveries; derived; REIT figures
      // carry 2-4 pts of on-site payroll, so ex-payroll sits slightly lower): Cousins 32.1%, Highwoods
      // 32.4%, Kilroy 31.6%, Douglas Emmett 37.4%, Brandywine 38.2%, Piedmont 40.4%, Hudson Pacific
      // 40.8%, BXP 39.5%, Paramount 45.4% (9M); New York: Empire State 50.7%, SL Green 56.0%, Vornado
      // 59.0%; Healthpeak medical office 34.2%, Welltower 29.8-30.6% (66% full pass-through); Alexandria
      // 31.3% (92% NNN, 70% operating margin), Healthpeak lab 29.0%; Easterly 33.1-34.6% (full-service
      // GSA leases with base-year operating and tax stops). BOMA EER 2014 data national 43.7%.
      // Class B and C: no direct series; the all-class Income/Expense IQ ratio (total opex over gross
      // rents, incl. payroll and leasing) ran 40-57% over 2015-2024. Provisional, flagged.
      'CBD Trophy / Class A+':    { low: 32, high: 42 },                 // non-NYC gateway (BXP, Kilroy, Paramount)
      'NYC Trophy / Class A+':    { low: 45, high: 55, review: true, embedsLocation: true },   // Manhattan (SL Green, Empire State, Vornado); REIT ratios 51-59% incl. payroll. embedsLocation: the base already carries NY state and Tier 1 costs, so those two adjustments are skipped
      'Suburban Class A':         { low: 28, high: 36 },
      'Class B Urban':            { low: 35, high: 45, review: true },   // provisional
      'Class B Suburban':         { low: 33, high: 43, review: true },   // provisional
      'Class C':                  { low: 40, high: 50, review: true },   // provisional; BOMA KC 2025 data Class C $/sf above Class A (2 buildings)
      'Medical Office (MOB)':     { low: 30, high: 36 },                 // supported (Healthpeak, Welltower)
      'Life Science / Lab':       { low: 29, high: 36 },                 // Alexandria, Healthpeak lab; REIT-grade campus product
      'Government Leased':        { low: 31, high: 36 }                  // Easterly; full-service lease, landlord carries opex against a flat base rent
    },
    retail: {
      // Q4 2026 (2026-11-06) — RESTATED ON THE GROSS BASIS: total operating expenses incl. real estate
      // taxes and recoverable CAM, divided by total revenue incl. tenant recoveries (EGI), payroll
      // excluded, plus 3-4% management fee and 1-2% reserves. The prior ranges matched neither a gross
      // nor a net-of-recoveries basis. Evidence (FY2025 10-Ks, Q3 2026 supplementals; REIT ratios are
      // derived taxes + CAM over total revenue, before the fee and reserves): malls Simon 20.5-22.8%,
      // Macerich 32.9%, Tanger 30.3%; grocery/community Brixmor 24.8%, Kite 26.1%, Phillips Edison 28.9%,
      // InvenTrust 28.2%, Regency 29.4%, Kimco 30.2%; convenience strip Curbline 25.1% with 96.7%
      // recovery (published); street Acadia 28.0-30.1%; net lease: Realty Income non-reimbursed 1.6% of
      // revenue (published), Agree 1.0-1.5% guidance (published), NNN REIT 1.9%, Four Corners 1.0%;
      // ICSC/NCREIF all-centers 31.7% (2017). Wingerd, Retail Center Operating Expense Guide 2023:
      // unanchored centers 25-35% of EGI all-in (published). Recovery ratios: grocery/community 85-95%,
      // strip ~97%, power 90-95%, malls ~82%, outlets <=64%.
      'Regional Mall (>800k SF)':       { low: 25, high: 35 },
      'Lifestyle / Town Center':        { low: 30, high: 38, review: true },   // proxies only (Federal Realty, Kite)
      'Power Center':                   { low: 26, high: 32 },
      'Grocery-Anchored Center':        { low: 28, high: 36 },
      'Strip Center (<30k SF)':         { low: 27, high: 35 },
      'Single Tenant NNN':              { low:  2, high:  6 },                 // true NNN: fee + reserves only; NN or grossed recoveries run 4-10
      'Urban Street Retail':            { low: 30, high: 36, review: true },   // Acadia only, blended with suburban
      'Restaurant / Entertainment':     { low:  3, high:  8, review: true }    // single-tenant NNN pads (FCPT, EPR); multi-tenant or gross-lease F&B: no evidence
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
      // Q4 2026 (2026-11-06) — RECALIBRATED from FY2025 10-Ks and Q3 2026 releases of 13 hotel REITs.
      // Convention: all property-level expenses minus payroll and benefits minus the actual management
      // fee, plus a 3% base fee and a 4% FF&E reserve, over total revenue. Payroll bracketed two ways:
      // 58% of the labor-bearing departmental and undistributed lines (Host 10-K, published) and 50% of
      // total hotel opex (Host CFO, Q2 2026 call, published); CBRE/AHLA 2026: labor 32.4% of revenue.
      // All-in property-level opex is 64-76% of revenue at every REIT, and ex-payroll it converges to
      // 38-48% because low-labor formats carry franchise/marketing (4-8%), taxes/insurance (6-8%) and
      // utilities (~4%). Derived: Host 37.7-38.7% (FY2025), Park 38.1-40.0%, Xenia 40.1-41.1%,
      // Pebblebrook 41.1-41.9%, DiamondRock 40.8-43.6%, Sunstone ~41.4%; Apple 41.8-45.7%, Summit
      // 38.4-43.0%, RLJ 43.5-48.2%; Chatham (64% extended-stay) 44.8-48.1%; Braemar 39.9-41.3%,
      // CBRE 2018 luxury sample ~42.2%, Ryman 33.8-37.1% (convention outlier).
      'Limited Service':  { low: 41, high: 46, review: true },   // no public economy/midscale REIT; select-service range used provisionally
      'Select Service':   { low: 41, high: 46 },
      'Full Service':     { low: 38, high: 43 },
      'Luxury / Resort':  { low: 40, high: 44, review: true },   // Braemar + Ryman only; luxury labor share is 2018 CBRE data
      'Extended Stay':    { low: 43, high: 48 }
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
    // Q4 2026 (2026-11-06) — OFFICE RE-DERIVED from the final IREM/BOMA/NAA Income/Expense IQ national
    // summary (2024 operating data, published 2025; the product was discontinued 2025-12-31), $/sf/yr:
    // taxes 2.34 (taxes & insurance 2.66 less the 0.32 insurance trend line), insurance 0.32, management
    // fee 0.68 + non-payroll admin 0.56 (two-thirds of the 1.67 Administrative line stripped as on-site
    // payroll, the BOMA Kansas City 2025-data wages-to-admin ratio), utilities 1.90, repairs &
    // maintenance 3.12 (the IREM bucket carries cleaning, security and grounds contract services),
    // reserves 0.20 (CMBS underwriting floor). Shares 25.7 / 3.5 / 13.6 / 20.8 / 34.2 / 2.2, rounded.
    // Cross-checks: 2023 data 25.7/3.2/12.8/20.2/36.0/2.1; BOMA EER 2015 data maintenance 35%,
    // utilities 17%, fixed 35%; BOMA KC 2025 data maintenance 41%, utilities 23%, taxes & insurance 30%.
    // Gateway-CBD variant (BXP/SLG/ESRT taxes are 41-43% of opex): about 36/3/12/18/29/2.
    office:      { taxes:26, insurance: 3, management:14, utilities:21, maintenance:34, reserves: 2 },
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
    'Office base ranges adopted 2026-11-06 (CBD Trophy 32-42, NYC Trophy 45-55, Suburban A 28-36, Life Science 29-36, Government 31-36; Medical Office held at 30-36). Class B Urban 35-45, Class B Suburban 33-43 and Class C 40-50 are provisional: no REIT or broker series exists for them, and the only national benchmark is the all-class Income/Expense IQ ratio of 40-57% (2015-2024, incl. payroll and leasing). A local Class A/B/C read (Houston BOMA 2025 OpEx Report, $250 member) or Keystone\'s own office engagements would firm them up. API consumers: the office subtype list gained "NYC Trophy / Class A+".',
    'Industrial base ranges are still Q2 2026 vintage. Warehouse REITs disclose NOI growth only; self-storage and data-centre Q3 2026 line items are in the vintage note. No benchmark found; re-derive from NNN structure evidence when the owner wants it.',
    'Senior housing (IL/AL/MC): evidence supports the overstatement caveat. Brookdale 3Q26 labor = 64.0% of facility opex and other facility opex = 25.5% of revenue; ASHA Q1 2026 majority-IL opex 70% of revenue with labor 38% (ex-labor ~32%), majority-AL 72% / 43% (ex-labor ~29%); NIC MAP: labor typically 50%+ of opex in AL and memory care, occupancy 90.4% in Q3 2026; all ratios derived from published figures. Current IL 35-41 / AL 42-48 / MC 45-52 look roughly 5-15pp high. Owner to confirm whether management & admin absorbs dietary, housekeeping and food cost before any range changes; ASHA YE2025 annual edition ($375) and the NIC MAP operator benchmark (subscription) would settle it.',
    'Retail: ranges are now on the gross basis (taxes + recoverable CAM over revenue incl. recoveries). Lifestyle/Town Center, Urban Street Retail and Restaurant/Entertainment rest on thin or proxy evidence and are flagged "under review" in the dropdown; Restaurant/Entertainment is set for single-tenant NNN pads (3-8) because no evidence exists for multi-tenant or gross-lease F&B centres. The six-category retail split (taxes 60) was not re-derived; REIT taxes are 41-52% of taxes-plus-CAM (Regency, Brixmor, Kite, Phillips Edison, derived).',
    'Hospitality: Limited Service uses the Select Service range provisionally (no public economy/midscale REIT; CBRE Trends limited-service tables are paywalled) and Luxury/Resort rests on two REITs with a 2018 labor share; both flagged. The single unpublished input is payroll as a share of revenue by chain scale. The six-category hospitality split was not re-derived.',
    'Office six-category allocation now rests on the discontinued Income/Expense IQ (2024 data) with a payroll strip of two-thirds of Administrative taken from the BOMA Kansas City 2025-data report. No office source publishes a true ex-payroll split; the Houston BOMA 2025 OpEx Report ($250 member) would give a Class A/B/C and submarket check.',
    'Metro-tier and state adjustments still over-stack on gateway assets. Q3 2026 read: five-REIT weighted ex-payroll opex 32.5% of revenue incl. 3.0% fee + 1.4% reserves (Essex 29.0%, UDR 31.8%, Vivmark 32.5%, Camden 34.2%, MAA 34.9%; derived). High-cost markets are also high-rent markets. Consider cutting Tier 1 to +2/+4 and halving the "Highest" state tier.',
    'Series break: the AvalonBay and Equity Residential standalone series end at Q2 2026. Vivmark reports a restated Merged Same Store pool (157,377 homes) from Q3 2026; future refreshes compare to that base.',
    'Not yet published at refresh time: CIAB Q3 2026 market survey, Aon Q3 2026 observed property rate, STR/CoStar Q3 2026 hotel P&L, Camden Q3 2026 call transcript (call held 2026-11-06), October 2026 PPI (due 2026-11-13).'
  ]
};

module.exports = DEFAULTS;
