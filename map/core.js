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

  // partners[year] = [{name, count}] desc. 2025 includes an 'Other' slice; the
  // 2024 report charts only the named top-5. partnerCounts keyed by year.
  partners: {
    2025: [
      { name: 'Belgium',         count: 264 },
      { name: 'Other',           count: 258 },
      { name: 'Germany',         count: 167 },
      { name: 'United States',   count: 105 },
      { name: 'Spain',           count: 83  },
      { name: 'United Kingdom',  count: 60  }
    ],
    2024: [
      { name: 'Belgium',         count: 248 },
      { name: 'Germany',         count: 168 },
      { name: 'Spain',           count: 74  },
      { name: 'United Kingdom',  count: 69  },
      { name: 'Italy',           count: 37  }
    ],
    partnerCounts: {
      2025: { total: 60, INT: 54, TP: 32, TB: 11 },
      2024: { total: 58, INT: 58, TP: 32, TB: 10 }
    }
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
    { year: 2023, title: 'MAP Annual Report 2023', file: 'sources/map-annual-report-2023.pdf', bytes: 320670 },
    { year: 2024, title: 'MAP Annual Report 2024', file: 'sources/map-annual-report-2024.pdf', bytes: 505206 },
    { year: 2025, title: 'MAP Annual Report 2025', file: 'sources/map-annual-report-2025.pdf', bytes: 543928 }
  ],

  methodologyNote: "Figures are the MAP team's own stock-administration counts and can differ from later OECD-published MAP statistics (different start-date counting and treatment of cases awaiting taxpayer acceptance)."
};

// ---------------------------------------------------------------------------

var RULINGS_DATA = {
  years: [2021, 2022, 2023, 2024, 2025],
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
    },
    2022: {
      ATR:          { begin: 142, received: 258, closed: 220, end: 180, outcomes: { granted: 162, rejected: 3,  withdrawn: 35, outOfTreatment: 10, noIntl: 10 } },
      APA:          { begin: 87,  received: 67,  closed: 84,  end: 70,  outcomes: { granted: 57,  rejected: 4,  withdrawn: 12, outOfTreatment: 8,  noIntl: 3  } },
      BAPA:         { begin: 85,  received: 35,  closed: 19,  end: 101, outcomes: { granted: 12,  rejected: 1,  withdrawn: 3,  outOfTreatment: 3,  noIntl: 0  } },
      Innovatiebox: { begin: 380, received: 154, closed: 179, end: 355, outcomes: { granted: 126, rejected: 0,  withdrawn: 16, outOfTreatment: 3,  noIntl: 34 } },
      Overige:      { begin: 32,  received: 45,  closed: 42,  end: 35,  outcomes: { granted: 21,  rejected: 1,  withdrawn: 17, outOfTreatment: 3,  noIntl: 0  } }
    },
    // 2021: the report combined unilateral APA with BAPA (one "APA" column), so
    // APA/BAPA are not separable for 2021 — only ATR, innovation box and other.
    2021: {
      ATR:          { begin: 141, received: 241, closed: 240, end: 142, outcomes: { granted: 165, rejected: 6,  withdrawn: 49, outOfTreatment: 10, noIntl: 10 } },
      Innovatiebox: { begin: 406, received: 207, closed: 233, end: 380, outcomes: { granted: 164, rejected: 1,  withdrawn: 14, outOfTreatment: 4,  noIntl: 50 } },
      Overige:      { begin: 38,  received: 43,  closed: 49,  end: 32,  outcomes: { granted: 25,  rejected: 3,  withdrawn: 11, outOfTreatment: 5,  noIntl: 5  } }
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
    },
    2023: {
      ATR:          { granted: 7,  rejected: 5,    withdrawn: 11,   outOfTreatment: 12 },
      APA:          { granted: 14, rejected: 12,   withdrawn: 36,   outOfTreatment: 19 },
      BAPA:         { granted: 40, rejected: 6,    withdrawn: null, outOfTreatment: 53 },
      Innovatiebox: { granted: 18, rejected: null, withdrawn: 33,   outOfTreatment: 41 },
      Overige:      { granted: 9,  rejected: 9,    withdrawn: 12,   outOfTreatment: 12 }
    },
    2022: {
      ATR:          { granted: 8,  rejected: 15,   withdrawn: 9,  outOfTreatment: 8  },
      APA:          { granted: 13, rejected: 14,   withdrawn: 20, outOfTreatment: 23 },
      BAPA:         { granted: 35, rejected: 51,   withdrawn: 33, outOfTreatment: 45 },
      Innovatiebox: { granted: 17, rejected: null, withdrawn: 28, outOfTreatment: 28 },
      Overige:      { granted: 7,  rejected: 14,   withdrawn: 7,  outOfTreatment: 7  }
    },
    // 2021: APA/BAPA combined in the source report — only ATR, innovation box, other.
    2021: {
      ATR:          { granted: 6,  rejected: 8,    withdrawn: 10, outOfTreatment: 7  },
      Innovatiebox: { granted: 17, rejected: 10,   withdrawn: 24, outOfTreatment: 21 },
      Overige:      { granted: 10, rejected: 13,   withdrawn: 8,  outOfTreatment: 10 }
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
      body: "In one APA, the Dutch entity and a foreign affiliate jointly performed key treasury functions and controlled the financing risks, leading to a contribution-based (profit-split) allocation of treasury profits such as cash-pooling and intercompany financing.",
      source: 'Rulings 2024'
    },
    {
      icon: '💳', group: 'TP', title: 'Implicit Support in Financial TP',
      body: "An entity had enough financial capacity to borrow independently (so no guarantee fee was due), yet its group affiliation lifted its credit profile. Implicit support was recognised as a pricing factor for the intercompany loans.",
      source: 'Rulings 2024'
    },
    {
      icon: '⚠️', group: 'TP', title: 'Comparability Adjustments: Handle with Care',
      body: "A toll manufacturer applied TNMM against comparables that owned inventory and bore real operational risk, then tried to adjust their margins by stripping out material costs. The authorities found the comparables functionally unsuitable and the adjustments unreliable, so the APA was not accepted and the request was withdrawn.",
      source: 'Rulings 2024'
    },
    {
      icon: '🚫', group: 'Access', title: 'No APAs with Low-Tax Jurisdictions',
      body: "Certainty up front is not granted in anticipation of a future restructuring; the low-tax disconnection must be fully completed beforehand. Only narrow exceptions apply for genuinely dismantling tax-avoidance structures, and a >30%-of-revenue-from-LTJ test bars access.",
      source: 'Rulings 2024'
    },
    {
      icon: '🧭', group: 'Access', title: 'Economic Nexus, Made Concrete',
      body: "For participation- and withholding-exemption certainty, the authorities weigh both the quality and the quantity of Dutch personnel that actually steer the foreign holdings, judged on the full facts, not on whether costs are recharged.",
      source: 'Rulings 2024-25'
    },
    {
      icon: '💧', group: 'TP', title: 'Cash-Pool Synergies: Who Keeps Them?',
      body: "2023 brought a wave of financing-TP questions on splitting cash-pool synergy benefits versus rewarding the cash-pool leader. The line drawn: the leader is usually a coordinator earning a routine return, so the synergy benefit accrues to the participating group companies, not to the leader. Don't let a 'leader' label pull excess profit into the cash-pool entity.",
      source: 'Rulings 2023'
    },
    {
      icon: '🎛️', group: 'TP', title: 'How Much Financial Control Buys Nexus?',
      body: "Once the authorities gained access to financial databases, financing cases turned on one question: how much financial control is needed for relevant economic nexus, and when is financial capacity sufficient? The takeaway: to price and own a financing risk in the Netherlands, the people and decision-making for that risk must actually sit here. Capital alone is not enough.",
      source: 'Rulings 2023'
    },
    {
      icon: '🏛️', group: 'Access', title: 'Certainty for Dual-Resident Listed Groups',
      body: "In 2025 the College IFZ gave some listed dual-resident companies advance certainty on Dutch dividend withholding even where the group no longer had operational nexus here, weighing the taxpayer's interest, the specific facts, and the authority's own oversight interest. A narrow, fact-driven opening; the restrictive line for relocated non-listed dual residents still holds.",
      source: 'Rulings 2025'
    },
    {
      icon: '🔗', group: 'Access', title: 'The New "Qualifying Entity" Test',
      body: "From 2025, withholding-tax rulings test for a 'qualifying entity': parties acting together with a main purpose of avoiding withholding tax, for example by splitting one qualifying interest into several non-qualifying ones. The main-purpose element is decisive, and everyone involved in the splitting is pulled into the qualifying entity. Fragmenting interests to dodge withholding will be looked through.",
      source: 'Rulings 2025'
    },
    {
      icon: '🏦', group: 'TP', title: 'A Routine Reward for Treasury Support',
      body: "2025 prefilings asked whether the Netherlands can get an APA for a routine financing activity that serves a foreign 'group treasury' which holds control over the treasury functions. The answer: in principle yes, provided the financial flows don't run over the Dutch company's balance sheet and P&L. Control sitting abroad caps the Dutch reward at a routine service fee, not the financing spread.",
      source: 'Rulings 2025'
    },
    {
      icon: '🧮', group: 'TP', title: 'Cost-Plus: Which Costs Belong in the Base?',
      body: "When the arm's-length reward for a service uses operating profit over costs as the profit-level indicator, which costs go in the cost base? Align with the base the benchmark comparables use. Under the 2022 Transfer Pricing Decree, pass-through costs can be stripped out only if independent parties would likewise earn no profit on them, and a routine reward should still absorb or pass through financing costs.",
      source: 'Rulings 2025'
    },
    {
      icon: '🎯', group: 'TP', title: 'Price to the Median',
      body: "Without a CUP or a profit split, the Dutch authority anchors the arm's-length reward to the median of the range, correcting to the middle to absorb unknown comparability defects. You can sit elsewhere in the range, but only with a documented reason: a materially different turnover, a COVID-hit market, a higher or lower functional-and-risk profile. In one 2022 APA the off-median point wasn't substantiated and no agreement was reached; bilateral cases get more room to negotiate a specific point.",
      source: 'Rulings 2022'
    },
    {
      icon: '💶', group: 'TP', title: 'Cash-Pool Leader Reward',
      body: "Two 2022 cash-pool requests, opposite outcomes. Where the Dutch entity genuinely ran the pool (setting rates, contracting with banks, owning the risks with the staff to match), the authority gave certainty on the leader's reward on arm's-length terms, though not yet on the interest rates themselves. Where control over the flows was thin and it wasn't even clear a real pool existed, the request was withdrawn. A 'leader' label earns nothing without the functions behind it.",
      source: 'Rulings 2022'
    },
    {
      icon: '🔎', group: 'TP', title: 'Look at the Other Side Too',
      body: "A Dutch company sought certainty on a routine procurement and logistics reward, with all dealings running to an EU head office. The authority kept asking what that head office actually did, and whether its large carry-forward losses were the real reason flows were routed through it, until the request was withdrawn. The lesson: a clean arm's-length return in the Netherlands isn't enough; they also test whether the foreign counterparty's functionality fits and whether the structure exists mainly for tax.",
      source: 'Rulings 2022'
    },
    {
      icon: '🧩', group: 'Access', title: 'Nexus That Arrives With the Deal',
      body: "Can economic substance that lands in the Netherlands right after an external acquisition count when judging access to certainty on the closely-connected steps that precede it? In 2022 the College IFZ said yes: where those steps sit in a very short window before the deal, the post-acquisition nexus can be weighed. A pragmatic read of the access test for acquisition structuring.",
      source: 'Rulings 2022'
    },
    {
      icon: '⚖️', group: 'TP', title: 'Two Cash Pools, Two Answers',
      body: "2021 made the financing-substance test concrete with a published pair. One cash pool, with 11 to 25 people in the Netherlands setting rates, contracting with banks and managing the risks, earned its arm's-length reward. Another, where the work was purely administrative and the real functions sat abroad, was refused certainty on its reward. Same instrument, opposite outcomes, one dividing line: control has to live where you book the return.",
      source: 'Rulings 2021'
    },
    {
      icon: '💡', group: 'TP', title: 'Royalties Into a Tax-Free Zone',
      body: "A routine Dutch distributor paid royalties to a foreign IP owner whose receipts were almost untaxed and whose functionality, on a quick look, was thin. The authority read a tax-saving motive and refused certainty. The signal is general: they are sceptical of royalty flows for IP parked in untaxed or low-taxed environments, and will test the substance on the far end before pricing the deduction here.",
      source: 'Rulings 2021'
    },
    {
      icon: '🔁', group: 'TP', title: 'Re-Invoicing: Allowed, Barely',
      body: "A Dutch company ran routine re-invoicing on a cost-plus reward. The authority, in its own words extremely reticent about these requests, pressed hard on the commercial rationale and whether the aim was to save foreign withholding tax. Here there were valid business reasons and no tax advantage, so a reward was agreed. Read it as a warning shot: pure re-invoicing without substance won't get certainty.",
      source: 'Rulings 2021'
    },
    {
      icon: '🛡️', group: 'Access', title: 'No Ruling Under an Integrity Cloud',
      body: "While handling an APA request, the authority pressed for more on the ultimate beneficial owners after public signals of serious financial crime abroad. The signals weren't dispelled, and the request was withdrawn. Access to certainty runs through an integrity gate: a suspicion of money laundering or serious offences, absent proof to the contrary, is enough to close the door, whatever the technical merits.",
      source: 'Rulings 2021'
    }
  ],

  publishedSummaries2025: { ATR: 273, 'APA/BAPA': 104, Innovatiebox: 157, Overige: 31 },

  sources: [
    { year: 2021, title: 'International Rulings Annual Report 2021', file: 'sources/international-rulings-2021.pdf', bytes: 340281 },
    { year: 2022, title: 'International Rulings Annual Report 2022', file: 'sources/international-rulings-2022.pdf', bytes: 692268 },
    { year: 2023, title: 'International Rulings Annual Report 2023', file: 'sources/international-rulings-2023.pdf', bytes: 1090743 },
    { year: 2024, title: 'International Rulings Annual Report 2024', file: 'sources/international-rulings-2024.pdf', bytes: 1303351 },
    { year: 2025, title: 'International Rulings Annual Report 2025', file: 'sources/international-rulings-2025.pdf', bytes: 958454 }
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
