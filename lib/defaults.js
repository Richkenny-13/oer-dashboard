// Q2 2026 Default OER Configuration
// This is the hardcoded baseline. All edits via admin panel override these in Redis.

const DEFAULTS = {
  dataCurrency: {
    quarter: 'Q2', year: 2026,
    lastUpdated: '2026-05-01',
    source: 'IREM Income/Expense IQ 2025 · BOMA EER 2025 · CoStar Q1 2026'
  },
  baseRanges: {
    multifamily: {
      'Institutional Class A (300+ units)': { low: 22, high: 28 },
      'Class A Garden (built 2000+)':       { low: 25, high: 31 },
      'Class B (built 1980-2000)':           { low: 28, high: 34 },
      'Class C (built pre-1980)':            { low: 30, high: 36 },
      'Student Housing':                     { low: 30, high: 36 },
      'Affordable / LIHTC':                  { low: 33, high: 38 },
      'Senior Independent Living':           { low: 35, high: 41 },
      'Senior Assisted Living':              { low: 42, high: 48 },
      'Senior Memory Care':                  { low: 45, high: 52 }
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
    multifamily: { taxes:35, insurance:12, management:12, utilities:18, maintenance:15, reserves:8 },
    office:      { taxes:35, insurance:12, management:12, utilities:18, maintenance:15, reserves:8 },
    retail:      { taxes:60, insurance:12, management: 8, utilities: 5, maintenance: 8, reserves:7 },
    industrial:  { taxes:45, insurance:15, management:10, utilities:10, maintenance:12, reserves:8 },
    hospitality: { taxes:25, insurance:12, management:15, utilities:22, maintenance:18, reserves:8 }
  },
  marketNotes: {
    insurance:   'Non-CAT properties stabilizing or declining slightly. CAT-exposed properties (hurricane/wildfire) still firm. California wildfire zones still seeing 20-30% renewals. Florida declining ~6% due to legislative reforms.',
    utilities:   'Electric rates up 6-9% YoY due to grid modernization. Natural gas stabilized after 2024 volatility. Water/sewer up 10-15% in drought-affected Western states.',
    propertyTax: '2026 reassessments hitting high-appreciation markets hard. Texas property tax caps providing relief. NJ remains highest at 2.11% effective rate. Hawaii lowest at 0.27%.',
    maintenance: 'Wage growth moderating to +5-7% from 2024 peak. Materials stabilizing post-tariff volatility. AI/predictive maintenance reducing emergency repair costs in larger properties.'
  }
};

module.exports = DEFAULTS;
