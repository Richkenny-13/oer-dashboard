// Q4 2026 Default OER Configuration (refreshed 2026-11-10 from Q3 2026 filings and releases;
// scheduled quarterly run, following the 2026-11-06 refresh that first built this quarter's data)
// This is the deployed baseline. Admin-panel edits override it in Redis, except that a deployed
// dataCurrency.lastUpdated newer than the cached one makes the deployed data win (see lib/storage.js).

const DEFAULTS = {
  dataCurrency: {
    quarter: 'Q4', year: 2026,
    lastUpdated: '2026-11-10',
    source: 'REIT same-store filings Q3 2026 (MAA, Vivmark [AVB+EQR], Camden, UDR, Essex, IRT) and their Q3 calls · Marsh Global Insurance Market Index Q3 2026 · Aon Q3 2026 Global Insurance Market Overview · WTW Insurance Marketplace Realities 2027 · Ivans Index Oct 2026 · Aon and Gallagher Re 9M 2026 cat tallies · BLS CPI Sep 2026 (Oct 2026 CPI released 2026-11-10 without 12-month changes), PPI Sep 2026, ECI Q3 2026, Employment Situation Oct 2026 · EIA STEO Oct 2026 · Nov 3 2026 ballot results (FL Amendment 3, NC levy limit, OK SQ 847) · Georgia SB 33 · Fulton County Schools FY2027 millage · Harris County FY2027 adopted rates · Lincoln Institute 50-State Property Tax Comparison (2025 taxes) · Q3 2026 10-Qs and releases of 10 industrial, self-storage and data-centre REITs, 6 hotel REITs, 3 office and 4 retail REITs · Welltower, Ventas and Brookdale 3Q26 · NIC MAP 3Q26 · Retail and hotel REIT FY2025 10-Ks · Income/Expense IQ 2024 office data',
    // Per-asset-class vintage. Q4 2026 passes: 2026-11-06 built the quarter (multifamily refreshed;
    // retail, hospitality and office ranges recalibrated from FY2025 10-Ks; office allocation re-derived);
    // 2026-11-10 scheduled run re-verified every figure against the source documents, re-derived the
    // multifamily split from the four reporters that publish full same-store line items, and gathered
    // the first Q3 2026 industrial evidence. Status values: current | review | stale.
    vintage: {
      multifamily: { asOf: 'Q4 2026', status: 'current',
        basis: 'MAA, Vivmark (AvalonBay + Equity Residential, merged 2026-08-17), Camden and UDR Q3 2026 same-store line items in dollars (supplementals of 2026-10-29, 11-04, 11-05 and 11-02). Essex publishes same-property real estate taxes and ex-tax opex only, so it is used for the ratio cross-check, not the split (the Essex line-item growth rates recorded on 2026-11-06 were not sourced and have been withdrawn). Base ranges held: four-REIT weighted ex-payroll opex 28.7% of revenue, 33.1% incl. 3.0% mgmt fee + 1.4% reserves (UDR 31.9% to MAA 34.9%; IRT 33.0%; Essex 29.0% only with payroll imputed from its consolidated share; five-REIT weighted 32.5% on that assumption; all derived). Six-category split re-derived 2026-11-10 from the four-REIT line items. Senior housing (IL/AL/MC) recalibrated 2026-11-06 on the owner\'s definitions (housekeeping = labor, food = own line) from Brookdale 3Q26 segment data, ASHA Q1 2026, Welltower and Healthpeak segment lines, with a 5% fee and 0.5% reserve; seven-category senior split incl. food. Welltower 3Q26 SHO same-store non-labor opex 28.1% of revenue (derived) sits inside the senior evidence used.' },
      office:      { asOf: 'Q4 2026', status: 'current',
        basis: 'Base ranges adopted 2026-11-06 from FY2025 10-K expense ratios of 16 office, medical, life-science and government-leased REITs (Cousins 32.1%, Highwoods 32.4%, Kilroy 31.6%, Douglas Emmett 37.4%, Brandywine 38.2%, Piedmont 40.4%, BXP 39.5%, Paramount 45.4%, Empire State 50.7%, SL Green 56.0%, Vornado 59.0%, Healthpeak MOB 34.2%, Welltower 29.8%, Alexandria 31.3%, Easterly 33.1-34.6%; all derived). Q3 2026 cross-check (consolidated, gross, incl. payroll; derived 2026-11-10): Kilroy 34.9% (real estate taxes +16.9%), Cousins 31.1% (opex +0.1%), Highwoods 32.8%; SL Green wholly owned real estate taxes +5%. NYC trophy split out as its own subtype. Class B and C are provisional (no direct series) and flagged. Six-category allocation re-derived 2026-11-06 from the final Income/Expense IQ national summary (2024 office data) with BOMA EER and BOMA Kansas City cross-checks.' },
      retail:      { asOf: 'Q4 2026', status: 'current',
        basis: 'Ranges restated 2026-11-06 on the gross basis (taxes + CAM over revenue incl. recoveries, plus fee and reserves) from FY2025 10-Ks and Q3 2026 supplementals of Simon, Macerich, Tanger, Regency, Brixmor, Kimco, Phillips Edison, InvenTrust, Kite, Federal Realty, Curbline, Acadia, Realty Income, Agree, NNN REIT, Four Corners and EPR, with ICSC/NCREIF and the Wingerd 2023 expense guide. Q3 2026 cross-check (taxes + operating costs over total revenue, before fee and reserves; derived 2026-11-10): Simon 20.6%, Brixmor 24.3% (recovery ratio 95.3%, published), Kimco 29.2%; Regency recovery ratio 87.5% (published). Lifestyle, street retail and restaurant/entertainment rest on thin evidence and are flagged. Six-category retail split not re-derived.' },
      industrial:  { asOf: 'Q2 2026', status: 'review',
        basis: 'Base ranges not recalibrated; first direct evidence gathered 2026-11-10 from Q3 2026 10-Qs (consolidated rental expenses incl. taxes and recoverable CAM over rental revenue incl. reimbursements, so gross basis incl. some on-site payroll; derived): Prologis 23.2%, STAG 20.0%, Rexford 24.2% (same-property 22.6%), Terreno 24.7%, First Industrial 25.7%, EastGroup 26.0%; self-storage Public Storage 26.6%, Extra Space 27.9% (same-store 28.1%; taxes 11.5% of revenue, insurance 1.1%, -16.5%), CubeSmart 33.8% (opex +5.4%); Americold non-labor warehouse opex 25.7% of total revenue, power +13.0% same-store; Digital Realty recovers 88.8% of utilities (net utility cost 2.8% of revenue) with non-utility property opex 19.4%. No industrial REIT discloses recovery income or a real estate tax line. The current ranges (6-22 for warehouse subtypes) read as net of recoveries, unlike the retail ranges, which are gross: see the open item.' },
      hospitality: { asOf: 'Q4 2026', status: 'current',
        basis: 'Ranges recalibrated 2026-11-06 from FY2025 10-Ks and Q3 2026 releases of Host, Park, Xenia, Pebblebrook, DiamondRock, Sunstone, Apple, Summit, RLJ, Chatham, Braemar and Ryman, with Host\'s published payroll shares and CBRE/AHLA labor data; 3% base fee and 4% FF&E reserve. Q3 2026 comparable-hotel margins (releases of 2026-10-29 to 11-06): Host 25.2% (+90 bp), Park 25.7% (+50 bp; hotel opex +5%, FY26 opex growth 4.5-5.0%), Sunstone 26.7% ex-Andaz (+50 bp), RLJ 26.5% (+190 bp), Pebblebrook 28.8% (+205 bp; same-property expenses +4.0%, FY26 3.8-4.0%), Summit 32.6% (+191 bp). Pebblebrook property taxes $16.2M vs $17.2M; Sunstone taxes, ground lease and insurance +3.1% (derived). Limited service and luxury are flagged (no public limited-service REIT; luxury labor share is 2018 data). Six-category hospitality split not re-derived.' }
    },
    // IREM Income/Expense IQ was PERMANENTLY RETIRED 2025-12-31. Its final dataset was
    // CY2024 operating data published Aug 2025. BOMA's EER was folded into it earlier and is also gone.
    retiredSources: ['IREM / BOMA / NAA Income/Expense IQ (retired 2025-12-31; final data CY2024)', 'BOMA Experience Exchange Report (replaced by Income/Expense IQ; no 2026 edition)']
  },
  baseRanges: {
    multifamily: {
      // Q3 2026 refresh — recalibrated against MAA / AvalonBay Q2 2026 and EQR Q1 2026
      // same-store filings, converted to ex-payroll % of EGI incl. 3.0% mgmt fee + reserves.
      // Q4 2026 passes — HELD. Q3 2026 same-store margins moved less than 1pp (MAA NOI margin 60.9% vs
      // 61.8%; Camden 63.4% flat; UDR 67.9% vs 68.0%; Essex 69.6% vs 69.5%; Vivmark 66.3%; IRT 63.2%;
      // derived or disclosed). Ex-payroll opex incl. 3.0% fee + 1.4% reserves (derived 2026-11-10):
      // UDR 31.9%, Vivmark 32.5%, IRT 33.0%, Camden 34.2%, MAA 34.9%; four-REIT weighted 33.1%
      // (Essex 29.0% only with payroll imputed from its consolidated share). The Class A ranges below
      // (23-33) sit under the REIT portfolio reads because the REIT pools mix 1990s-2010s Class A/B stock.
      'Institutional Class A (300+ units)': { low: 23, high: 29 },
      'Class A Garden (built 2000+)':       { low: 27, high: 33 },
      'Class B (built 1980-2000)':           { low: 30, high: 36 },
      'Class C (built pre-1980)':            { low: 33, high: 39 },
      'Student Housing':                     { low: 35, high: 42 },
      'Affordable / LIHTC':                  { low: 38, high: 45 },
      // SENIOR HOUSING — RECALIBRATED 2026-11-06 on Richard's definitions: housekeeping is labor
      // (excluded); dietary / raw food is its own included line. Build = published non-labor opex
      // + 5.0% management fee (Fannie Mae Seniors Housing underwriting floor, Brookdale/Ventas 5% of
      // revenue) + 0.5% replacement reserve ($300-450/unit/yr, Fannie Mae and Freddie Mac, over
      // Brookdale same-community RevPAR; derived).
      // IL: Brookdale 3Q26 same-community IL other opex 28.4% of revenue -> 33.9%; ASHA Q1 2026
      //     majority-IL (70% opex, 38% labor) -> 32% -> 37.5%.
      // AL: Brookdale AL/MC other opex 24.5-24.8% -> 30.0-30.3%; ASHA majority-AL (72%/43%) -> 29%
      //     -> 34.5%; Welltower SHO 9M 2025 ex-compensation 29.7% (fees inside) + reserve -> 30.2%;
      //     Healthpeak CCRC 26.7% -> 32.2%; Sonida "non-labor about one-third" of 74.8% -> ~30.5%.
      // MC: no stand-alone published split; Brookdale reports AL and MC together. Flagged.
      // Published data put IL ABOVE AL ex-labor, because non-labor costs do not scale with the care rate.
      // NIC MAP: labor typically 50%+ of opex in AL and MC; Brookdale labor 64% of facility opex.
      // 2026-11-10 cross-check: Welltower 3Q26 SHO same-store non-labor opex 28.1% of revenue -> 33.6%
      // with fee and reserve (derived); Brookdale 3Q26 same-community other facility opex 25.5% of revenue
      // (+8.1%), labor 45.3%. Consistent with the ranges; held.
      'Senior Independent Living':           { low: 33, high: 38, allocation: 'senior' },
      'Senior Assisted Living':              { low: 30, high: 35, allocation: 'senior' },
      'Senior Memory Care':                  { low: 30, high: 36, allocation: 'senior', review: true }   // blended with AL; ~1pt for liability cover and supplies is judgement, not evidence
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
      // Q3 2026 cross-check (2026-11-10, derived): Kilroy 34.9%, Cousins 31.1%, Highwoods 32.8%. Held.
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
      // Q3 2026 cross-check (2026-11-10, derived): Simon 20.6%, Brixmor 24.3%, Kimco 29.2%. Held.
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
      // Q2 2026 baseline, HELD pending the owner's ruling on basis (see open items). First direct
      // evidence, Q3 2026 10-Qs (consolidated gross ratios incl. taxes, recoverable CAM and some on-site
      // payroll; derived 2026-11-10): warehouse REITs 20.0-26.0% (STAG, Prologis, Rexford, Terreno,
      // First Industrial, EastGroup); self-storage 26.6-33.8% incl. on-site payroll (Public Storage,
      // Extra Space, CubeSmart); Americold non-labor opex 25.7% of total revenue; Digital Realty
      // non-utility opex 19.4% + net utilities 2.8% of revenue (88.8% utility recovery).
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
      // Q3 2026 (2026-11-10): margins up 50-205 bp YoY at Host, Park, Sunstone, RLJ, Pebblebrook and
      // Summit on rate growth; expense growth 4.0-6.1% (Pebblebrook published, Host and Summit derived). Held.
      'Limited Service':  { low: 41, high: 46, review: true },   // no public economy/midscale REIT; select-service range used provisionally
      'Select Service':   { low: 41, high: 46 },
      'Full Service':     { low: 38, high: 43 },
      'Luxury / Resort':  { low: 40, high: 44, review: true },   // Braemar + Ryman only; luxury labor share is 2018 CBRE data
      'Extended Stay':    { low: 43, high: 48 }
    }
  },
  // Q4 2026 (2026-11-06, adopted by Richard): the seven 'Highest' states were halved (AK 10/14 -> 5/7,
  // CA 8/12 -> 4/6, CT 7/10 -> 3.5/5, DC 8/11 -> 4/5.5, HI 12/15 -> 6/7.5, MA 8/11 -> 4/5.5, NY 10/13 -> 5/6.5)
  // because high-cost states are also high-rent states and the EGI denominator absorbs much of the cost.
  // Evidence: Q3 2026 ex-payroll opex incl. fee and reserves runs 31.9% (UDR) to 34.9% (Sun Belt MAA),
  // coastal Essex ~29.0% (payroll imputed) and the merged coastal Vivmark 32.5% (derived), i.e. the
  // coastal premium does not show up in the ratio.
  stateAdj: {
    AL:{name:'Alabama',tier:'Low',low:-6,high:-9},AK:{name:'Alaska',tier:'Highest',low:5,high:7},
    AZ:{name:'Arizona',tier:'Moderate',low:0,high:0},AR:{name:'Arkansas',tier:'Lowest',low:-8,high:-10},
    CA:{name:'California',tier:'Highest',low:4,high:6},CO:{name:'Colorado',tier:'Moderate',low:0,high:0},
    CT:{name:'Connecticut',tier:'Highest',low:3.5,high:5},DC:{name:'District of Columbia',tier:'Highest',low:4,high:5.5},
    DE:{name:'Delaware',tier:'Moderate',low:0,high:0},FL:{name:'Florida',tier:'Moderate',low:0,high:1},
    GA:{name:'Georgia',tier:'Moderate',low:0,high:0},HI:{name:'Hawaii',tier:'Highest',low:6,high:7.5},
    ID:{name:'Idaho',tier:'Moderate',low:0,high:0},IL:{name:'Illinois',tier:'High',low:4,high:7},
    IN:{name:'Indiana',tier:'Low',low:-5,high:-8},IA:{name:'Iowa',tier:'Lowest',low:-6,high:-9},
    KS:{name:'Kansas',tier:'Lowest',low:-6,high:-9},KY:{name:'Kentucky',tier:'Low',low:-6,high:-9},
    LA:{name:'Louisiana',tier:'Low',low:-5,high:-8},ME:{name:'Maine',tier:'Moderate',low:0,high:0},
    MD:{name:'Maryland',tier:'High',low:3,high:5},MA:{name:'Massachusetts',tier:'Highest',low:4,high:5.5},
    MI:{name:'Michigan',tier:'Low',low:-4,high:-7},MN:{name:'Minnesota',tier:'Moderate',low:0,high:0},
    MS:{name:'Mississippi',tier:'Lowest',low:-8,high:-11},MO:{name:'Missouri',tier:'Low',low:-4,high:-7},
    MT:{name:'Montana',tier:'Low',low:-3,high:-6},NE:{name:'Nebraska',tier:'Low',low:-4,high:-7},
    NV:{name:'Nevada',tier:'Moderate',low:0,high:0},NH:{name:'New Hampshire',tier:'Moderate',low:0,high:0},
    NJ:{name:'New Jersey',tier:'High',low:5,high:8},NM:{name:'New Mexico',tier:'Moderate',low:0,high:0},
    NY:{name:'New York',tier:'Highest',low:5,high:6.5},NC:{name:'North Carolina',tier:'Moderate',low:0,high:0},
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
    // Q4 2026 (2026-11-06, adopted by Richard): Tier 1 cut from +8/+12 to +2/+4 for the same reason as the
    // state halving; the old stack put an AvalonBay-like gateway asset at ~44.8% against ~29.6% actual.
    t1: { name:'Tier 1 — Gateway',   examples:'SF Bay Area, NYC, Boston, DC Metro, Los Angeles, Chicago Loop', low: 2, high: 4 },
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
    // Q4 2026 scheduled run (2026-11-10) — re-derived ex-payroll from the Q3 2026 same-store line items
    // of the four REITs that publish them in full: MAA (S-3), Vivmark (merged pool, supplemental p.15),
    // Camden (supplement p.14), UDR (Attachment 6). $000: taxes 328,563; insurance 37,314; utilities
    // 175,661; R&M 150,364; on-site office/G&A/marketing/other 78,828; payroll 167,065 (dropped);
    // revenue 2,685,147. Add 3.0% of revenue as management fee (80,554; UDR's actual fee is 3.25%, held
    // outside NOI) and 1.4% as reserves (37,592; $250-350/unit/yr, NOT recurring capex). Ex-payroll total
    // 888,876: taxes 36.96%, insurance 4.20%, mgmt & admin 17.93%, utilities 19.76%, maintenance 16.92%,
    // reserves 4.23%. Rounded by largest remainder. Essex is excluded because it publishes no same-property
    // line items other than taxes (the 2026-11-06 derivation that included Essex gave 37/5/18/20/16/4;
    // its Essex inputs could not be reproduced). Essex consolidated ex-payroll shares, no fee or reserve:
    // taxes 44.2, utilities 28.9, R&M 14.8, admin 6.9, insurance 5.2 (derived) point the same way.
    multifamily: { taxes:37, insurance: 4, management:18, utilities:20, maintenance:17, reserves:4 },
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
    hospitality: { taxes:25, insurance:12, management:15, utilities:22, maintenance:18, reserves:8 },
    // SENIOR HOUSING — seven categories incl. food (2026-11-06). Shares of revenue behind the split:
    // food 4.0% (Welltower SHO 9M 2025 food line 3.9%, Healthpeak 2025 4.5%; derived), utilities 4.0%
    // (4.4% / 3.9%), repairs & maintenance 3.0% (2.9% / 3.3%), property taxes 3.0% (3.3% / 2.6%),
    // management fee 5.0% (published convention) plus on-site admin, marketing, supplies and other
    // ~10% (residual of Welltower "other" 15.3% less ~5% fees, Healthpeak "other" 12.3%; no source
    // splits it), insurance 1.5% (multifamily Q3 2026 REIT proxy; the four-REIT same-store figure is
    // 37,314 / 2,685,147 = 1.4%, derived 2026-11-10; senior GL/PL cover runs higher but no published
    // share exists), reserves 0.5%. Total 31.0% of revenue.
    // Welltower 3Q26 SHO same-store (2026-11-10, derived): food 3.8%, utilities 4.4%, R&M 2.6%, taxes
    // 3.2%, other 14.1% of revenue — within a point of the inputs above, so the split is held.
    // Shares, largest-remainder rounded: taxes 9.7, insurance 4.8, management & admin 48.4, utilities
    // 12.9, maintenance 9.7, reserves 1.6, food 12.9. Management & admin is large because it carries
    // the fee AND the unsplit residual (admin, marketing, supplies, bad debt).
    senior:      { taxes:10, insurance: 5, management:48, utilities:13, maintenance:10, reserves: 1, food:13 }
  },
  marketNotes: {
    insurance:   'STILL SOFTENING, BUT SLOWER. Marsh Q3 2026 (released 2026-10-21): US property rates -10% (Q2 -13%), CAT-driven programs -13%, non-CAT -9%; global property -10%, ninth consecutive quarterly decline for the global composite (-5%); US casualty +6%. Aon Q3 2026 overview (10-30): property "the steepest pricing reductions of any line", US property soft with double-digit cuts for well-performing risks. Gallagher global property renewals -6% (Q2 -10%). WTW Marketplace Realities 2027: large property -5% to -15% single-carrier, -15% to -25% shared and layered. Ivans small-account commercial property index +5.37% in October (Sep +5.11%, Jul +6.16%), the only line to tick up. Apartment REIT same-store insurance Q3 2026: Camden -18.3%, IRT -16.9%, NexPoint -11.8%, UDR -11.5%, MAA -10.0%, Vivmark -1.7% (Essex: no same-property line published); insurance is 3.5-4.0% of same-store opex at MAA, Vivmark, UDR and 5.3% at Camden. Hotels: Apple and RLJ cite favorable renewals; Apple is not assuming further declines in 2027. Benign losses: 9M 2026 global insured cat losses $91B (Aon) to $92B (Gallagher Re), lowest since 2019; 2026 Atlantic season 10 named storms, one hurricane (Isaias, Moody\'s RMS $2.5-4.5B, KCC $3B insured). 1/1/2027 reinsurance: KBW at least -10%, Moody\'s survey most likely -7.5% to -15%, Howden Re expects a repeat of 2026\'s 15%+ risk-adjusted cuts (APCIA, 2026-11-10). Regional exceptions: California FAIR Plan +29.1% from 2026-10-15; Florida Citizens commercial-residential +7-14% (2026 filing, not re-verified; 2027 rates go to the board in December); TWIA 0% for 2027 (board vote 2026-08-04). Read: budget flat-to-down renewals in 2027 outside the residual markets, and do not carry the 2023-24 increases forward.',
    utilities:   'STILL THE FASTEST-GROWING EXPENSE LINE. Q3 2026 same-store utilities: Camden +7.3%, Vivmark +7.1% (bulk telecom, electricity, water/sewer, trash), UDR +6.2%, MAA +5.3%, IRT +3.2%; Essex ex-tax opex +3.4% with utilities one of two drivers (+$1.4M). Senior housing: Welltower SHO utilities +4.5%. Hotels: Park cites wage and utility pressure; Pebblebrook energy $13.1M vs $12.3M; Sunstone utilities -2.3% (derived). CPI Sep 2026 (the latest official 12-month readings): electricity +4.4% (Jun +4.0%), piped gas +5.0%, water/sewer/trash +4.8%; Northeast electricity +7.1%, South +1.9%. The October 2026 CPI (released 2026-11-10) carries no 12-month changes because BLS did not collect October 2025 data in the shutdown; October month-on-month: electricity +0.9%, piped gas -0.8%. Next official 12-month read: November CPI on 2026-12-10. EIA Oct STEO: PJM wholesale +41% in 2026, then -7% in 2027 (NYISO -14%); retail electricity 2026 residential +5.3%, commercial +4.4%, slowing in 2027 to +2.6% and +1.5% (derived from Table 7a). Henry Hub averaged $2.87 in Q3 2026 and $2.99 in October; EIA sees 2026 at $3.48 and 2027 at $3.16 (-9%). Read: 2026 actuals are running 5-7%, with part of the increase rebilled or offset by bulk-internet income; 2027 should ease toward 4-5% outside PJM and New England.',
    propertyTax: 'FLAT NOW; STRUCTURAL SHIFT ARRIVES IN 2027. Q3 2026 same-store taxes: MAA -0.5%, Camden -0.6%, Essex +1.6% (higher assessed values; Prop 8 appeals), UDR +2.0%, IRT +3.0%, Vivmark +2.9% (AVB California merger reassessment: ~$16M in 2026, ~$50M/yr from 2027); self-storage Extra Space +4.9%, CubeSmart +4.0%, Public Storage -0.8%; Kilroy +16.9% (consolidated); SL Green wholly owned +5%; Welltower SHO +5.0%; Pebblebrook $16.2M vs $17.2M. MAA (midpoint 1.4%), Camden (1.75%) and UDR (2.9%) cut 2026 expense guidance mainly on taxes; IRT guides taxes plus insurance -1.0% to -0.4%. 2027: Essex expects taxes back to its 3-4% norm after 0.6% in 2026; MAA expects nothing "outsized" with valuations still depressed; Camden says the commercial-side effect of Florida Amendment 3 is undetermined and keeps appealing. Nov 3 2026 ballots: Florida Amendment 3 passed 62.15% — non-homestead assessment cap drops from 10% to 5% for non-school levies from Jan 1 2027 (school levies stay at just value), homestead exemption rises to $150k (2027) and $250k (2028); the Revenue Estimating Conference puts the local non-school cut at ~$4.9B in FY2027-28 rising to ~$11.8B a year, so the non-school burden shifts toward rentals and commercial. North Carolina levy-limit amendment passed 60.4% (the legislature must now cap county and city levy growth; no amount or deadline set); Oklahoma SQ 847 failed 54.3% (caps stay 5% commercial / 3% homestead); Wyoming Prop 1 failed; no Texas amendments were on the ballot. Georgia SB 33 (signed May 11 2026) ends HB 581 opt-outs for tax year 2027, so Fulton, Gwinnett, Cobb and DeKalb homestead bases become inflation-capped and non-homestead property carries the digest growth; 2026 metro millage mostly flat (Fulton 8.87, Gwinnett 6.95, Cobb 8.46; DeKalb +0.5 mill); Fulton County Schools adopted 17.95 mills on 2026-10-22 (+0.87). Texas: the 20% non-homestead circuit-breaker cap (Tax Code 23.231) covers only 2024-2026 and HB 202 to make it permanent died in committee, so it lapses after 2026 absent 2027 action; Harris County FY2027 combined rate $0.67147 vs $0.62413 (+7.6%, county rate +9.6%); HCAD 2026 commercial values +1.7%. Lincoln Institute 2026 study: $1M commercial effective rate 1.757% across the 53 largest cities, unchanged (Detroit 4.04%, Chicago 3.36%; Charlotte 0.70%, Seattle 0.86%).',
    maintenance: 'INPUT COSTS SPIKING, OPERATOR SPEND MODERATE — still do not apply construction PPI to an R&M budget. PPI net inputs to maintenance and repair construction +12.0% YoY in Sep 2026 (Aug +9.8%, Jul +7.4%; the October PPI is due 2026-11-13 and will also lack 12-month changes); AGC construction inputs +11.9% (diesel +115%, steel +28%, copper +30%, aluminum +25%, asphalt +18%), "the most in four years" and triple the 3.7% CPI; but contractor bid prices only +5.4% and nonresidential M&R pricing +4.8%, so contractors are absorbing most of it for now. Apartment REIT same-store R&M Q3 2026: MAA +4.8%, Vivmark +2.5%, IRT +2.5% (contract services +14.5% on a Wi-Fi roll-out), UDR +2.1%, Camden +2.0%; Essex ex-tax opex +3.4% with M&R the larger driver (+$1.6M). Camden cut 2026 guidance partly on R&M savings. Senior housing: Welltower SHO R&M +1.0%, Brookdale other facility opex +8.1%. Record-low turnover (MAA 39.6% trailing 12 months; UDR 48.0% annualized vs 51.7%; Camden net 42% vs 44%; Vivmark 12.7% in the quarter vs 13.2%; IRT retention 60.5%) keeps make-ready volume down. Expect a 2027 catch-up in contractor pricing for roofing, paving and HVAC work.',
    payroll:     'CONTEXT ONLY — excluded from these ratios. ECI Q3 2026 (released 2026-10-30): private wages +3.1% (real -0.6%), private compensation +3.4%, benefits +3.9%; real estate and rental wages +3.8% (compensation +4.0%), 70bp above all-private. October 2026 average hourly earnings +3.1% YoY ($38.00; released 2026-11-06). REIT on-site payroll Q3 2026: Camden -3.2%, IRT -1.7%, MAA -0.2%, UDR +3.3% (merit plus severance), Vivmark +4.2%; Essex publishes no same-property payroll line. MAA "Reimagine" (~$25M run-rate margin gain by end-2027) and Vivmark synergies ($135M net, >$45M from on-site costs) hold institutional payroll flat-to-down; union craft settlements 4.9% (Jan-Sep 2026). Payroll is 14.5% (UDR) to 22.0% (MAA) of same-store opex at the four full reporters, 22.3% at IRT, 45.3% of revenue at Brookdale same-community (labor +2.6%) and 40.3% of Welltower SHO same-store revenue (compensation +4.4%; derived). Hotels: Host says rate gains offset wage growth; Park calls out wage pressure.',
    direction:   'NET 2026 DIRECTION IS STILL DOWN AT THE SUN BELT REITs, UP AT THE COASTAL MERGER; 2027 GUIDANCE COMES IN JANUARY-FEBRUARY. FY2026 same-store expense guidance after Q3: MAA 1.15-1.65% (midpoint cut 35 bp to 1.40%), Camden 1.50-2.00% (midpoint 1.75%, from 2.50%), UDR 2.70-3.10% (midpoint 2.90%, -35 bp), Essex 2.6-2.9% (unchanged; Q4 ~5% on controllable timing), IRT 1.6-2.4% (controllables 3.4-3.8%); Vivmark (AVB + EQR, merged 2026-08-17) 4.1-4.7%, or 3.6% excluding the California reassessment. Hotels: Park hotel opex 4.5-5.0%, Pebblebrook same-property 3.8-4.0%. Taxes and insurance are the drag reducers; utilities, marketing and (in inputs) R&M are the pressure. No reporter has given a 2027 expense number; MAA will say more at Nareit REITworld (Atlanta, 2026-11-16 to 19), Camden and UDR in January-February. 2027 watch list: tax re-acceleration (Essex 3-4%; Florida Amendment 3 and Georgia SB 33 burden shift; Texas cap expiry; Vivmark +$50M reassessment), contractor catch-up on R&M, and insurance resetting from a lower base.'
  },
  // Known open items carried into the next refresh cycle. Code-managed; not admin-editable.
  openItems: [
    'Industrial base ranges (Q2 2026 vintage) need a basis ruling. Q3 2026 10-Qs give consolidated gross ratios (rental expenses incl. taxes and recoverable CAM over rental revenue incl. reimbursements; derived): warehouse REITs 20.0% (STAG), 23.2% (Prologis), 24.2% (Rexford; same-property 22.6%), 24.7% (Terreno), 25.7% (First Industrial), 26.0% (EastGroup); self-storage 26.6% (Public Storage), 27.9% (Extra Space), 33.8% (CubeSmart), all incl. on-site payroll; Americold non-labor opex 25.7% of total revenue; Digital Realty non-utility opex 19.4% plus 2.8% net utilities (88.8% recovery). The current warehouse ranges (Bulk 6-12, Light 10-16, Last-Mile 12-18, Flex 16-22, Manufacturing 14-22) read as net of recoveries, unlike retail, which was restated gross on 2026-11-06. Proposal for Richard: either (a) restate warehouse subtypes on the gross basis at roughly 20-28 before fee and reserves (Bulk ~20-25, Light/Last-Mile ~23-28, Flex ~26-32), or (b) keep the net basis and say so in the subtype labels. Self-Storage 22-28 and Data Centers 32-44 are roughly consistent with the evidence once payroll comes out; Cold Storage 22-30 has one data point (Americold). No industrial REIT discloses recovery income or a tax line, so a true ex-payroll split is still unavailable.',
    'Office base ranges adopted 2026-11-06 (CBD Trophy 32-42, NYC Trophy 45-55, Suburban A 28-36, Life Science 29-36, Government 31-36; Medical Office held at 30-36). Q3 2026 consolidated cross-check: Kilroy 34.9%, Cousins 31.1%, Highwoods 32.8% (derived), consistent. Class B Urban 35-45, Class B Suburban 33-43 and Class C 40-50 are provisional: no REIT or broker series exists for them, and the only national benchmark is the all-class Income/Expense IQ ratio of 40-57% (2015-2024, incl. payroll and leasing). A local Class A/B/C read (Houston BOMA 2025 OpEx Report, $250 member) or Keystone\'s own office engagements would firm them up. API consumers: the office subtype list gained "NYC Trophy / Class A+".',
    'Senior housing recalibrated 2026-11-06 (IL 33-38, AL 30-35, MC 30-36) on the owner\'s definitions. Q3 2026 cross-check: Welltower SHO same-store non-labor opex 28.1% of revenue (33.6% with fee and reserve), Brookdale same-community other facility opex 25.5% (derived), both inside the ranges. Remaining gaps: no published memory-care-only non-labor split (MC is blended with AL and flagged); no source splits insurance from admin, marketing and supplies (the senior split uses a multifamily insurance proxy and carries the rest in management & admin); whether ASHA\'s opex already includes a management fee is unknown. The ASHA State of Seniors Housing 2025 annual edition ($375, posted Sep 2026) or the NIC MAP operator benchmark (subscription) would close all three.',
    'Retail: ranges are on the gross basis (taxes + recoverable CAM over revenue incl. recoveries). Q3 2026 cross-check: Simon 20.6%, Brixmor 24.3% (recovery 95.3%), Kimco 29.2% (derived), consistent. Lifestyle/Town Center, Urban Street Retail and Restaurant/Entertainment rest on thin or proxy evidence and are flagged "under review" in the dropdown; Restaurant/Entertainment is set for single-tenant NNN pads (3-8) because no evidence exists for multi-tenant or gross-lease F&B centres. The six-category retail split (taxes 60) was not re-derived; REIT taxes are 41-53% of taxes-plus-CAM (Regency, Brixmor, Kite, Phillips Edison, Kimco, derived).',
    'Hospitality: Limited Service uses the Select Service range provisionally (no public economy/midscale REIT; CBRE Trends limited-service tables are paywalled) and Luxury/Resort rests on two REITs with a 2018 labor share; both flagged. Q3 2026 margins rose 50-205 bp at six REITs on rate, with expense growth 4.0-6.1%; the ranges were held. The single unpublished input is payroll as a share of revenue by chain scale. The six-category hospitality split was not re-derived.',
    'Office six-category allocation rests on the discontinued Income/Expense IQ (2024 data) with a payroll strip of two-thirds of Administrative taken from the BOMA Kansas City 2025-data report. No office source publishes a true ex-payroll split; the Houston BOMA 2025 OpEx Report ($250 member) would give a Class A/B/C and submarket check.',
    'Gateway over-stack reduced 2026-11-06 (Tier 1 now +2/+4; the seven "Highest" states halved). Residual to watch: a Boston CBD trophy stacks to about 41-56 against the BXP actual of 39.5% (incl. payroll), and the "High" tier (IL, MD, NJ, OR, RI, WA) and Tier 2 metros were not changed. Q3 2026 read behind the cut: ex-payroll opex incl. fee and reserves 31.9% (UDR) to 34.9% (MAA), four-REIT weighted 33.1%; coastal Essex ~29.0% only with imputed payroll (derived).',
    'Correction to the 2026-11-06 record: Essex publishes same-property real estate taxes (+1.6%) and ex-tax operating expenses (+3.4%) only; the Essex utilities (+4.7%), insurance (-5.7%), R&M (+10.7%) and payroll (+1.6%) rates recorded on 2026-11-06 appear in no Essex document and have been withdrawn. The multifamily split was re-derived on 2026-11-10 from the four full reporters (37/4/18/20/17/4 vs 37/5/18/20/16/4). The Essex 29.0% ex-payroll ratio is kept as a labelled assumption (payroll imputed from its consolidated 18.9% share).',
    'Series break: the AvalonBay and Equity Residential standalone series end at Q2 2026. Vivmark reports a restated Merged Same Store pool (157,377 homes) from Q3 2026; future refreshes compare to that base. UDR drops the 7,059-home Apollo JV from its same-store pool in Q4 2026.',
    'Not yet published at refresh time (2026-11-10): EIA November STEO (due today, the October edition was still served at run time); October 2026 PPI (2026-11-13; no 12-month changes expected because of the October 2025 collection gap); official 12-month CPI utility changes (November CPI, 2026-12-10); CIAB Q3 2026 market survey (prior Q3 editions ~Nov 19-20); Aon US property rate percentage (Q3 overview gives ratings only); Swiss Re and Munich Re 9M 2026 cat tallies; Guy Carpenter and Howden formal 1/1/2027 outlook reports; Florida Citizens 2027 rate recommendation (board, December); STR/CoStar Q3 2026 hotel P&L; NIC MAP 3Q26 rent growth; any 2027 same-store expense guidance (Nareit REITworld 2026-11-16 to 19, then January-February calls).'
  ]
};

module.exports = DEFAULTS;
