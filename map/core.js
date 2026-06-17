// map/core.js — Dutch MAP & APA Explorer: data + pure helpers (no DOM).
// Dual-mode: browser loads this via <script src="core.js"> and the var/function
// declarations become globals. Node tests require() it and receive module.exports.

var MAP_DATA = {
  years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],

  // caseload[stream] = { received: [7], closed: [7] }  (indexed to years 2019..2025)
  caseload: {
    INT:   { received: [116,127,163,201,240,309,350], closed: [122,103,104,119,220,240,384] },
    TP:    { received: [80,93,42,86,60,93,75],         closed: [77,71,51,51,79,109,81] },
    MLMAP: { received: [0,0,0,2,6,0,4],                closed: [0,0,0,0,4,6,0] },
    TB:    { received: [18,21,29,33,14,36,39],          closed: [7,16,22,36,20,22,25] },
    BAPA:  { received: [23,23,19,31,28,24,34],          closed: [21,13,15,14,29,34,33] },
    MAPA:  { received: [2,2,0,4,8,3,4],                 closed: [0,1,0,6,0,3,8] }
  },

  // inventory[year][stream] = {begin, received, closed, end}
  inventory: {
    2025: {
      INT:   { begin: 693, received: 350, closed: 384, end: 659 },
      TP:    { begin: 210, received: 75,  closed: 81,  end: 204 },
      MLMAP: { begin: 10,  received: 4,   closed: 0,   end: 14  },
      TB:    { begin: 46,  received: 39,  closed: 25,  end: 60  },
      BAPA:  { begin: 85,  received: 34,  closed: 33,  end: 86  },
      MAPA:  { begin: 22,  received: 4,   closed: 8,   end: 18  }
    },
    2024: {
      INT:   { begin: 518, received: 309, closed: 240, end: 587 },
      TP:    { begin: 198, received: 93,  closed: 109, end: 182 },
      MLMAP: { begin: 10,  received: 0,   closed: 6,   end: 4   },
      TB:    { begin: 21,  received: 36,  closed: 22,  end: 35  },
      BAPA:  { begin: 92,  received: 24,  closed: 34,  end: 82  },
      MAPA:  { begin: 22,  received: 3,   closed: 3,   end: 22  }
    },
    2023: {
      INT:   { begin: 409, received: 240, closed: 220, end: 429 },
      TP:    { begin: 209, received: 60,  closed: 79,  end: 190 },
      MLMAP: { begin: 10,  received: 6,   closed: 4,   end: 12  },
      TB:    { begin: 22,  received: 14,  closed: 20,  end: 16  },
      BAPA:  { begin: 91,  received: 28,  closed: 29,  end: 90  },
      MAPA:  { begin: 18,  received: 8,   closed: 0,   end: 26  }
    }
  },

  // outcomes[year] = [{cat, label, phase, count, pct?}]
  outcomes: {
    2025: [
      { cat: 1,  label: 'Denied MAP access',             phase: 'uni', count: 26,  pct: 5.3  },
      { cat: 2,  label: 'Objection not justified',        phase: 'uni', count: 29,  pct: 5.9  },
      { cat: 3,  label: 'Unilateral relief granted',      phase: 'uni', count: 27,  pct: 5.5  },
      { cat: 4,  label: 'Full elimination',               phase: 'bi',  count: 345, pct: 70.4 },
      { cat: 5,  label: 'Partial elimination',            phase: 'bi',  count: 3,   pct: 0.6  },
      { cat: 6,  label: 'No taxation contrary to treaty', phase: 'bi',  count: 10,  pct: 2.0  },
      { cat: 7,  label: 'No agreement',                   phase: 'bi',  count: 2,   pct: 0.4  },
      { cat: 8,  label: 'Resolved via domestic remedy',   phase: 'oth', count: 21,  pct: 4.3  },
      { cat: 9,  label: 'Withdrawn by taxpayer',          phase: 'oth', count: 26,  pct: 5.3  },
      { cat: 10, label: 'Any other outcome',              phase: 'oth', count: 1,   pct: 0.2  }
    ],
    2024: [
      { cat: 1,  label: 'Denied MAP access',             phase: 'uni', count: 20  },
      { cat: 2,  label: 'Objection not justified',        phase: 'uni', count: 19  },
      { cat: 3,  label: 'Unilateral relief granted',      phase: 'uni', count: 23  },
      { cat: 4,  label: 'Full elimination',               phase: 'bi',  count: 266 },
      { cat: 6,  label: 'No taxation contrary to treaty', phase: 'bi',  count: 9   },
      { cat: 7,  label: 'No agreement',                   phase: 'bi',  count: 10  },
      { cat: 8,  label: 'Resolved via domestic remedy',   phase: 'oth', count: 6   },
      { cat: 9,  label: 'Withdrawn by taxpayer',          phase: 'oth', count: 23  },
      { cat: 10, label: 'Any other outcome',              phase: 'oth', count: 1   }
    ]
  },

  // cycle times in months; approximate (read off Grafiek 6, ±~0.5). Flag in UI.
  cycleTimes: {
    years: [2021, 2022, 2023, 2024, 2025],
    TP:    [15.5, 19, 21, 26, 24.5],
    INT:   [12, 15, 15.5, 13.5, 10.5],
    Total: [13.5, 16.5, 16.8, 16.8, 12.5],
    approximate: true,
    norm: 24
  },

  // partners[year] = [{name, count}] desc; includes 'Other'
  partners: {
    2025: [
      { name: 'Belgium',         count: 264 },
      { name: 'Other',           count: 258 },
      { name: 'Germany',         count: 167 },
      { name: 'United States',   count: 105 },
      { name: 'Spain',           count: 83  },
      { name: 'United Kingdom',  count: 60  }
    ],
    partnerCounts: { total: 60, INT: 54, TP: 32, TB: 11 }
  },

  // KPI headline values + YoY for the hero
  kpis: {
    2025: { received: 506, closed: 531, resolutionRate: 97, endInventory: 1041, fullElimPct: 70.4 },
    2024: { received: 465, closed: 414 }
  },

  // short qualitative facts (NOT chart-mechanic commentary — see spec rule)
  facts: {
    awards: 'OECD MAP awards 2022, 2023, 2024',
    apaShareOfTP: 'About half of the TP MAP inventory is now APA (BAPA/MAPA) requests',
    arbitration: 'Two arbitration procedures ongoing, expected to conclude in 2026; none yet under the Dutch Tax Arbitration Act (Wet fiscale arbitrage)',
    methodNote: 'TP method (TNMM, CUP, profit split, …) is not published in MAP statistics — the OECD MAP Statistics Framework does not capture it.'
  },

  sources: [
    { year: 2023, title: 'MAP Annual Report 2023 (Dutch Tax Administration MAP team)' },
    { year: 2024, title: 'MAP Annual Report 2024 (publ. 26 May 2025)' },
    { year: 2025, title: 'MAP Annual Report 2025 (publ. June 2026)' }
  ],

  methodologyNote: "Figures are the MAP team's own stock-administration counts and can differ from later OECD-published MAP statistics (different start-date counting and treatment of cases awaiting taxpayer acceptance)."
};

// ---------------------------------------------------------------------------

var RULINGS_DATA = {
  years: [2023, 2024, 2025],
  types: ['ATR', 'APA', 'BAPA', 'Innovatiebox', 'Overige'],
  typeLabels: {
    ATR:          'ATR',
    APA:          'APA (unilateral)',
    BAPA:         'BAPA (bi-/multilateral)',
    Innovatiebox: 'Innovation box',
    Overige:      'Other rulings'
  },

  // flow[year][type] = {begin, received, closed, end,
  //   outcomes:{granted, rejected, withdrawn, outOfTreatment, noIntl}}
  flow: {
    2025: {
      ATR:          { begin: 216, received: 231, closed: 276, end: 171, outcomes: { granted: 215, rejected: 4,  withdrawn: 47, outOfTreatment: 7,  noIntl: 3  } },
      APA:          { begin: 58,  received: 63,  closed: 70,  end: 51,  outcomes: { granted: 61,  rejected: 1,  withdrawn: 6,  outOfTreatment: 2,  noIntl: 0  } },
      BAPA:         { begin: 100, received: 31,  closed: 34,  end: 97,  outcomes: { granted: 31,  rejected: 1,  withdrawn: 1,  outOfTreatment: 1,  noIntl: 0  } },
      Innovatiebox: { begin: 303, received: 169, closed: 179, end: 293, outcomes: { granted: 148, rejected: 1,  withdrawn: 5,  outOfTreatment: 3,  noIntl: 22 } },
      Overige:      { begin: 30,  received: 34,  closed: 32,  end: 32,  outcomes: { granted: 19,  rejected: 4,  withdrawn: 6,  outOfTreatment: 2,  noIntl: 1  } }
    },
    2024: {
      ATR:          { begin: 207, received: 288, closed: 279, end: 216, outcomes: { granted: 233, rejected: 3,  withdrawn: 36, outOfTreatment: 5,  noIntl: 2  } },
      APA:          { begin: 59,  received: 61,  closed: 62,  end: 58,  outcomes: { granted: 53,  rejected: 0,  withdrawn: 7,  outOfTreatment: 2,  noIntl: 0  } },
      BAPA:         { begin: 108, received: 26,  closed: 34,  end: 100, outcomes: { granted: 25,  rejected: 1,  withdrawn: 3,  outOfTreatment: 4,  noIntl: 1  } },
      Innovatiebox: { begin: 328, received: 177, closed: 202, end: 303, outcomes: { granted: 154, rejected: 0,  withdrawn: 13, outOfTreatment: 7,  noIntl: 28 } },
      Overige:      { begin: 30,  received: 31,  closed: 31,  end: 30,  outcomes: { granted: 21,  rejected: 2,  withdrawn: 5,  outOfTreatment: 2,  noIntl: 1  } }
    },
    2023: {
      ATR:          { begin: 180, received: 276, closed: 249, end: 207, outcomes: { granted: 212, rejected: 2,  withdrawn: 29, outOfTreatment: 5,  noIntl: 1  } },
      APA:          { begin: 70,  received: 61,  closed: 72,  end: 59,  outcomes: { granted: 49,  rejected: 4,  withdrawn: 10, outOfTreatment: 7,  noIntl: 2  } },
      BAPA:         { begin: 101, received: 35,  closed: 28,  end: 108, outcomes: { granted: 21,  rejected: 1,  withdrawn: 0,  outOfTreatment: 4,  noIntl: 2  } },
      Innovatiebox: { begin: 355, received: 182, closed: 210, end: 327, outcomes: { granted: 147, rejected: 0,  withdrawn: 13, outOfTreatment: 14, noIntl: 36 } },
      Overige:      { begin: 35,  received: 32,  closed: 37,  end: 30,  outcomes: { granted: 15,  rejected: 1,  withdrawn: 9,  outOfTreatment: 4,  noIntl: 8  } }
    }
  },

  // gross processing time (months) by type & outcome; null = "—" (no cases)
  processingTime: {
    2025: {
      ATR:          { granted: 6,  rejected: 10,   withdrawn: 12, outOfTreatment: 18 },
      APA:          { granted: 11, rejected: 7,    withdrawn: 12, outOfTreatment: 21 },
      BAPA:         { granted: 39, rejected: 11,   withdrawn: 2,  outOfTreatment: 33 },
      Innovatiebox: { granted: 20, rejected: 90,   withdrawn: 30, outOfTreatment: 33 },
      Overige:      { granted: 8,  rejected: 33,   withdrawn: 10, outOfTreatment: 12 }
    },
    2024: {
      ATR:          { granted: 8,  rejected: 8,    withdrawn: 10, outOfTreatment: 13 },
      APA:          { granted: 12, rejected: null, withdrawn: 24, outOfTreatment: 17 },
      BAPA:         { granted: 32, rejected: 46,   withdrawn: 39, outOfTreatment: 37 },
      Innovatiebox: { granted: 17, rejected: null, withdrawn: 27, outOfTreatment: 35 },
      Overige:      { granted: 8,  rejected: 8,    withdrawn: 13, outOfTreatment: 8  }
    }
  },

  kpis: {
    2025: { received: 528, closed: 591, granted: 474, endInventory: 644 },
    2024: { received: 583, closed: 608, granted: 486, endInventory: 707 }
  },

  // curated "beeldbepalende standpunten" — inRange commentary (Aleks's voice). Editable copy.
  positions: [
    {
      icon: '🤝', group: 'TP', title: 'Shared Control = Profit Split?',
      body: "In one APA, the Dutch entity and a foreign affiliate jointly performed key treasury functions and controlled the financing risks — leading to a contribution-based (profit-split) allocation of treasury profits such as cash-pooling and intercompany financing.",
      source: 'Rulings 2024'
    },
    {
      icon: '💳', group: 'TP', title: 'Implicit Support in Financial TP',
      body: "An entity had enough financial capacity to borrow independently (so no guarantee fee was due), yet its group affiliation lifted its credit profile. Implicit support was recognised as a pricing factor for the intercompany loans.",
      source: 'Rulings 2024'
    },
    {
      icon: '⚠️', group: 'TP', title: 'Comparability Adjustments: Handle with Care',
      body: "A toll manufacturer applied TNMM against comparables that owned inventory and bore real operational risk, then tried to adjust their margins by stripping out material costs. The authorities found the comparables functionally unsuitable and the adjustments unreliable — the APA was not accepted and the request was withdrawn.",
      source: 'Rulings 2024'
    },
    {
      icon: '🚫', group: 'Access', title: 'No APAs with Low-Tax Jurisdictions',
      body: "Certainty up front is not granted in anticipation of a future restructuring — the low-tax disconnection must be fully completed beforehand. Only narrow exceptions apply for genuinely dismantling tax-avoidance structures, and a >30%-of-revenue-from-LTJ test bars access.",
      source: 'Rulings 2024'
    },
    {
      icon: '🧭', group: 'Access', title: 'Economic Nexus, Made Concrete',
      body: "For participation- and withholding-exemption certainty, the authorities weigh both the quality and the quantity of Dutch personnel that actually steer the foreign holdings — judged on the full facts, not on whether costs are recharged.",
      source: 'Rulings 2024-25'
    },
    {
      icon: '💧', group: 'TP', title: 'Cash-Pool Synergies: Who Keeps Them?',
      body: "2023 brought a wave of financing-TP questions on splitting cash-pool synergy benefits versus rewarding the cash-pool leader. The line drawn: the leader is usually a coordinator earning a routine return, so the synergy benefit accrues to the participating group companies — not to the leader. Don't let a 'leader' label pull excess profit into the cash-pool entity.",
      source: 'Rulings 2023'
    },
    {
      icon: '🎛️', group: 'TP', title: 'How Much Financial Control Buys Nexus?',
      body: "Once the authorities gained access to financial databases, financing cases turned on one question: how much financial control is needed for relevant economic nexus, and when is financial capacity sufficient? The takeaway: to price and own a financing risk in the Netherlands, the people and decision-making for that risk must actually sit here — capital alone is not enough.",
      source: 'Rulings 2023'
    },
    {
      icon: '🏛️', group: 'Access', title: 'Certainty for Dual-Resident Listed Groups',
      body: "In 2025 the College IFZ gave some listed dual-resident companies advance certainty on Dutch dividend withholding even where the group no longer had operational nexus here — weighing the taxpayer's interest, the specific facts, and the authority's own oversight interest. A narrow, fact-driven opening; the restrictive line for relocated non-listed dual residents still holds.",
      source: 'Rulings 2025'
    },
    {
      icon: '🔗', group: 'Access', title: 'The New "Qualifying Entity" Test',
      body: "From 2025, withholding-tax rulings test for a 'qualifying entity' — parties acting together with a main purpose of avoiding withholding tax, for example by splitting one qualifying interest into several non-qualifying ones. The main-purpose element is decisive, and everyone involved in the splitting is pulled into the qualifying entity. Fragmenting interests to dodge withholding will be looked through.",
      source: 'Rulings 2025'
    }
  ],

  publishedSummaries2025: { ATR: 273, 'APA/BAPA': 104, Innovatiebox: 157, Overige: 31 },

  sources: [
    { year: 2023, title: 'International Rulings Annual Report 2023' },
    { year: 2024, title: 'Summary of Dutch International Tax Ruling Practice 2024' },
    { year: 2025, title: 'International Rulings Annual Report 2025' }
  ],

  processingNote: 'Gross processing time (from filing to agreement/withdrawal/rejection), including time spent awaiting requested information. Net handling time is materially shorter.'
};

// ---------------------------------------------------------------------------
// Pure helpers — plain function declarations so they are globals in the browser
// (loaded via <script src="core.js">) and exported below for Node tests.
// ---------------------------------------------------------------------------

function yoy(curr, prev) {
  if (!prev) return '—';
  var d = (curr - prev) / prev * 100;
  return (d >= 0 ? '+' : '') + d.toFixed(1) + '%';
}

// Expects a positive integer-scale value (axis ceiling for count data).
function niceMax(v) {
  if (v <= 0) return 10;
  var mag = Math.pow(10, Math.floor(Math.log10(v)));
  var n = Math.ceil(v / (mag / 2)) * (mag / 2);
  return n <= v ? n + mag / 2 : n;
}

function outcomeGroups(year) {
  var list = MAP_DATA.outcomes[year];
  var g = {
    uni: { items: [], subtotal: 0 },
    bi:  { items: [], subtotal: 0 },
    oth: { items: [], subtotal: 0 }
  };
  list.forEach(function (o) {
    if (!g[o.phase]) throw new Error('outcomeGroups: unknown phase "' + o.phase + '"');
    g[o.phase].items.push(o);
    g[o.phase].subtotal += o.count;
  });
  return g;
}

function resolutionRate(year) {
  // Published definition: resolved share of cases actually handled in MAP.
  // Hardcoded to the published headline per year to avoid divergence from source.
  var table = { 2025: 97 };
  return (year in table) ? table[year] : null;
}

function rulingMix(year, metric) { // metric: 'received' | 'closed' | 'end'
  if (['received','closed','end'].indexOf(metric) === -1) throw new Error('rulingMix: bad metric "' + metric + '"');
  var f = RULINGS_DATA.flow[year];
  var rows = RULINGS_DATA.types.map(function (t) {
    return { type: t, label: RULINGS_DATA.typeLabels[t], value: f[t][metric] };
  });
  var total = rows.reduce(function (a, r) { return a + r.value; }, 0);
  rows.forEach(function (r) { r.pct = +(r.value / total * 100).toFixed(1); });
  return rows;
}

// ---------------------------------------------------------------------------

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MAP_DATA: MAP_DATA,
    RULINGS_DATA: RULINGS_DATA,
    yoy: yoy,
    niceMax: niceMax,
    outcomeGroups: outcomeGroups,
    resolutionRate: resolutionRate,
    rulingMix: rulingMix
  };
}
