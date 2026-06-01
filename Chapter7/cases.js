// Single source of truth for the case content rendered on the page.
// Each case must match the shape validated by scripts/validate-cases.mjs.
//
// Theme codes (used for sidebar grouping):
//   benefit-test       → Benefit test
//   shareholder        → Shareholder activity
//   already-compensated → Already compensated
//   methods            → Selecting the TP method
//   pass-through       → Mark-up and pass-through
//   documentation      → Documentation

globalThis.CASES = [

  /* ===================================================================
     BENEFIT TEST (Examples 1, 2, 3, 9, 10)
     =================================================================== */

  {
    id: 1,
    theme: "benefit-test",
    themeLabel: "Benefit test",
    title: "Cybersecurity services",
    group: "Retailer Group",
    refs: "Annex I · ¶1–9",
    atGlance:
      "A retailer's central IT function commissions and implements a group-wide cybersecurity programme. Does that still count as an intra-group service if a breach later occurs? What if a recipient is loss-making?",
    parties: {
      kind: "provider-to-recipients",
      provider: { name: "Company A", role: "Central IT services" },
      recipients: [{ name: "Group entities", role: "Online retail subsidiaries" }],
      note: "Plus: external cybersecurity vendor engaged by Company A — not a party to the intra-group charge."
    },
    timeline: [
      "Retailer Group pivots from physical stores to online; cyber risk increases.",
      "Company A engages an external vendor to assess group-wide digital security.",
      "Company A reviews recommendations and implements enhanced security systems.",
      "Company A charges subsidiaries an arm's-length amount for the assessment and implementation."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Two years later, several group entities suffer a data breach following a cyberattack. Some entities lose customers or grant commercial advantages to retain them. The breach was not caused by inadequate performance from Company A.",
        question: "Was an intra-group service rendered?",
        mcq: [
          "Yes — benefit is judged ex ante; a later loss does not negate the service.",
          "No — the breach proves the security work delivered no benefit.",
          "Only for the entities that were not affected by the breach."
        ],
        correctIdx: 0,
        analysis:
          "When Company A performed the assessment, there was a reasonable expectation that group entities would benefit by minimising the risk of a breach. The subsequent breach does not negate the service, since the damage was not caused by inadequate performance by Company A.",
        verdict: "Service rendered"
      },
      {
        letter: "B",
        facts:
          "Company B, a recipient of Company A's cybersecurity services, has been operating at a loss in the years under examination.",
        question: "Does Company B's loss position mean no service was rendered?",
        mcq: [
          "No — losses at the recipient do not, by themselves, negate the service.",
          "Yes — a loss-making recipient cannot have benefited from the service.",
          "Only if the losses are causally linked to the cybersecurity work."
        ],
        correctIdx: 0,
        analysis:
          "The mere fact that Company B has been operating at a loss does not provide grounds to conclude that no intra-group service was rendered. The benefit test is judged ex ante, not by reference to the recipient's ex-post profitability.",
        verdict: "Service rendered"
      }
    ],
    takeaway:
      "The benefit test is judged ex ante. Neither a later adverse event nor the recipient's loss position negates an intra-group service that was reasonably expected to provide value at the time it was rendered.",
    crossRefs: [
      "Section B.2 (benefit test)",
      "Example 2 (revenue outcome)"
    ]
  },

  {
    id: 2,
    theme: "benefit-test",
    themeLabel: "Benefit test",
    title: "Centralised marketing",
    group: "Hotel Group",
    refs: "Annex I · ¶10–15",
    atGlance:
      "A central marketing team in Country A serves group hotels in Countries A and B through a new corporate-clients unit. Is it still a service when revenue grows as expected? When competition wipes the growth out? When an unrelated country grows for reasons of its own?",
    parties: {
      kind: "provider-to-recipients",
      provider: { name: "Company A (Country A)", role: "Marketing & sales · corporate-clients unit" },
      recipients: [
        { name: "Company B (Country B)", role: "Hotel operator" },
        { name: "Company C (Country C)", role: "Hotel operator (no service activity)" }
      ],
      note: "The corporate-clients unit serves Country A and B only. Country C's hotels are not targeted by its activities."
    },
    timeline: [
      "Hotel Group sets a five-year target to grow corporate-client share in Countries A and B (30–45% incremental revenue).",
      "Company A creates a corporate-clients unit inside the central marketing team.",
      "The unit prospects clients, designs packages, runs digital campaigns, bids on global tenders and joins B2B platforms.",
      "Company A continually reviews its plans against evolving market conditions."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "A year in, hotels in Countries A and B grow their corporate-client portfolios. Trajectory suggests the five-year target will be hit.",
        question: "Are the unit's activities intra-group services to hotels in Countries A and B?",
        mcq: [
          "Yes — the activities provide value an independent enterprise would pay for.",
          "No — until the five-year target is actually hit, no service can be recognised.",
          "Only the share attributable to closed corporate contracts."
        ],
        correctIdx: 0,
        analysis:
          "The activities performed by the corporate-clients unit constitute intra-group services to hotels in Countries A and B because they provide economic or commercial value for which independent enterprises in comparable circumstances would be willing to pay or perform for themselves.",
        verdict: "Service rendered"
      },
      {
        letter: "B",
        facts:
          "New competing hotel chains enter Country B with sharper pricing. By year five, accumulated incremental revenue growth in Country B is only 10%, well below the 30–45% target.",
        question: "Does the missed target negate the service rendered to Company B?",
        mcq: [
          "No — the service stands; outcome was eroded by competition, not by absence of activity.",
          "Yes — without the projected growth, no benefit accrued.",
          "Only the shortfall percentage should be disallowed as a service charge."
        ],
        correctIdx: 0,
        analysis:
          "A service is considered to be provided to Company B even though revenue growth has not materialised as expected. The shortfall reflects competitive market conditions, not absence of activity by Company A. The benefit test is judged ex ante.",
        verdict: "Service rendered"
      },
      {
        letter: "C",
        facts:
          "During the same period, hotels in Country C also see a rise in sales — driven by tourist affluence, improved infrastructure, and Country C's popularity as a film-shoot location. The corporate-clients unit performs no activities targeting Country C.",
        question: "Is Country C's uplift attributable to a service from Company A?",
        mcq: [
          "No — exogenous demand, not Company A's activity, drives the result.",
          "Yes — Company C benefits from group-wide brand efforts.",
          "Yes — any group-wide marketing has a halo effect on Country C."
        ],
        correctIdx: 0,
        analysis:
          "The increase in profitability of Company C cannot be attributed to the new corporate-clients unit, since the unit performs no activities for Country C. The uplift is caused by exogenous factors and the activities of Company A are not a service rendered to Company C.",
        verdict: "No service to Company C"
      }
    ],
    takeaway:
      "Service recognition turns on what was performed and reasonably expected to benefit the recipient — not on whether the recipient's revenue ultimately rose or fell. Benefits enjoyed for unrelated, exogenous reasons are not services from the provider.",
    crossRefs: [
      "Section B.2 (benefit test)",
      "Example 1 (later adverse event)"
    ]
  },

  {
    id: 3,
    theme: "benefit-test",
    themeLabel: "Benefit test",
    title: "Accounting & legal alongside in-house staff",
    group: null,
    refs: "Annex I · ¶16–17",
    atGlance:
      "Company B pays Company A for accounting and legal support. Company B also employs its own accountants and lawyers — but their work is different from what Company A provides.",
    parties: {
      kind: "provider-with-internal-capability",
      provider: { name: "Company A", role: "Accounting & legal support" },
      recipient: { name: "Company B", role: "Pays Company A", sub: "+ in-house accounting & legal staff" }
    },
    timeline: [
      "Company A performs certain accounting and legal activities.",
      "Company B pays Company A for those activities.",
      "Company B's own accounting and legal personnel perform different work from what Company A provides."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Tested question: does Company B's internal accounting/legal capability defeat recognition of an intra-group service from Company A?",
        question: "Is Company A's activity an intra-group service to Company B?",
        mcq: [
          "Yes — internal capability does not preclude recognition where activities differ.",
          "No — Company B already has its own people, so the service is duplicative.",
          "Only if Company B's staff is fully utilised on other work."
        ],
        correctIdx: 0,
        analysis:
          "The benefit test asks whether an independent enterprise in comparable circumstances would be willing to pay for the activity or perform it itself. The mere fact that Company B has internal capability does not preclude recognition of a service for the activity performed by Company A.",
        verdict: "Service rendered"
      }
    ],
    takeaway:
      "Having in-house capability is not the same as performing the same activity. Look at what the provider actually does; if it differs from what the recipient does internally, an intra-group service can still arise.",
    crossRefs: [
      "Section B.2 (duplication)",
      "Example 9 (geographic / functional duplication)"
    ]
  },

  {
    id: 9,
    theme: "benefit-test",
    themeLabel: "Benefit test",
    title: "Marketing scope & duplication",
    group: "Apparel MNE",
    refs: "Annex I · ¶34–39",
    atGlance:
      "Company A and Company B both work on the marketing for a new product launch. When does that overlap count as duplication, and when is it really two different activities? Three scenarios test the line — by content, by geography, and by scope.",
    parties: {
      kind: "tested-party",
      left: { name: "Company A (Country A)", role: "Market research / verification" },
      right: { name: "Company B (Country B)", role: "Worldwide distributor; designs launch and campaign" },
      arrowLabel: "marketing activities →"
    },
    timeline: [
      "MNE Group designs a new line of menswear for the 25–45 demographic.",
      "Company A in Country A performs market research connected to the launch.",
      "Company B in Country B is the worldwide distributor and runs the launch campaign."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Company A undertakes market research to identify potential brand ambassadors for the new product. Company B designs the launch campaign, decides distribution channels, and develops the marketing for retail.",
        question: "Are Company A's activities duplicative of Company B's?",
        mcq: [
          "No — the activities differ in content; no duplication.",
          "Yes — both companies work on marketing for the same product.",
          "Yes — Company B as distributor already covers all marketing."
        ],
        correctIdx: 0,
        analysis:
          "There is no duplication because the marketing activities performed by Company A for Company B differ from those undertaken by Company B itself in relation to the same products.",
        verdict: "No duplication"
      },
      {
        letter: "B",
        facts:
          "Same as Scenario A, except Company B also identifies ambassadors for Country B itself. Company A still identifies ambassadors for other regional markets where Company B distributes. Cultural, linguistic and demographic factors mean each market's ambassadors do not move the needle elsewhere.",
        question: "Does Company B's local ambassador work make Company A's research duplicative?",
        mcq: [
          "No — the geographic scopes differ; Company A's work satisfies the benefit test.",
          "Yes — both companies are identifying ambassadors for the same launch.",
          "Only for the share of the budget tied to non-Country-B markets."
        ],
        correctIdx: 0,
        analysis:
          "The market research by Company A is not duplicative of Company B's, because they have different geographic scopes. This enables Company B to customise the campaign by region. Company B obtains commercial value from Company A's activities, which satisfy the benefit test and constitute an intra-group service.",
        verdict: "Service rendered"
      },
      {
        letter: "C",
        facts:
          "Same as Scenario A, except Company B designs a global marketing campaign for the new line. Lacking in-depth local knowledge, Company B outsources to Company A the verification of compliance with local customs, laws, regulations, and the translation of the campaign into local languages.",
        question: "Are Company A and Company B's activities duplicative because they relate to the same campaign?",
        mcq: [
          "No — Company A's activities are separate and distinct from Company B's.",
          "Yes — relating to the same initiative makes them duplicative.",
          "Only the translation work is non-duplicative."
        ],
        correctIdx: 0,
        analysis:
          "Although both companies perform activities related to the global marketing campaign, the mere fact that the activities relate to the same overall initiative does not lead to the conclusion that they are duplicative. The activities undertaken by Company A are separate and distinct from those of Company B.",
        verdict: "No duplication"
      }
    ],
    takeaway:
      "Duplication is tested on what is actually being done — by content, geography, and scope. Overlap with another affiliate's general initiative is not duplication if the specific activities differ.",
    crossRefs: [
      "Section B.2 (duplication)",
      "Example 3 (in-house capability)"
    ]
  },

  {
    id: 10,
    theme: "benefit-test",
    themeLabel: "Benefit test",
    title: "Passive association (supplier discount)",
    group: null,
    refs: "Annex I · ¶40–42",
    atGlance:
      "An independent supplier offers Company A a discounted price not because group members did anything, but because the supplier hopes to win future business from other group members. Is the discount the result of an intra-group service?",
    parties: {
      kind: "supplier-association",
      supplier: { name: "Supplier", role: "Independent · offers €8/unit instead of €10" },
      buyer: { name: "Company A", role: "Manufacturer · receives discount" },
      group: { name: "Wider MNE group", role: "Passive association · no concerted action" },
      arrowLabel: "discounted price →"
    },
    timeline: [
      "Independent Supplier would normally charge Company A €10/unit based on its standalone profile.",
      "Supplier expects long-term business with other group members and aims to be their main supplier.",
      "Supplier offers Company A a reduced €8/unit even though Company A is not placing larger orders.",
      "No group member performs any activity to produce the discount."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The price reduction is attributable to Company A being part of a larger MNE group — passive association — not to deliberate concerted action by group members.",
        question: "Has an intra-group service been rendered to Company A?",
        mcq: [
          "No — passive association is not a relevant activity for the benefit test.",
          "Yes — the group's existence creates the discount, so a service is rendered.",
          "Yes, but only at the level of the parent for governing the group."
        ],
        correctIdx: 0,
        analysis:
          "The price reduction is attributable solely to Company A being part of a larger MNE group — passive association — and not to deliberate concerted action of group members or the performance of any service or other function. The supplier's unilateral decision is not a relevant activity for the benefit test. There is no intra-group service transaction.",
        verdict: "No intra-group service"
      }
    ],
    takeaway:
      "Benefits arising purely from membership of an MNE group — passive association — do not give rise to an intra-group service. Look for an activity performed by a group member; the benefit must be tied to that activity.",
    crossRefs: [
      "Section B.2 (passive association)",
      "Chapter X · Section D (group synergies)"
    ]
  },

  /* ===================================================================
     SHAREHOLDER ACTIVITY (Examples 5, 6, 7, 8)
     =================================================================== */

  {
    id: 5,
    theme: "shareholder",
    themeLabel: "Shareholder activity",
    title: "Management information system",
    group: null,
    refs: "Annex I · ¶21–23",
    atGlance:
      "Company A (the parent) runs a management information system fed by data from all group entities. Part of what it produces is consolidation for Company A's own reporting. Part is operational advice to subsidiaries. Is this one charge, two, or neither?",
    parties: {
      kind: "parent-and-subsidiaries",
      parent: { name: "Company A", role: "Parent · operates the MIS" },
      subsidiaries: { name: "Subsidiaries", role: "Provide data; receive recommendations" },
      arrowLabel: "data ↑ · advice ↓"
    },
    timeline: [
      "Company A operates an MIS that collects financial and operational data from all group entities.",
      "The MIS supports Company A's own budgeting, performance control, and consolidated financial statements.",
      "Based on the data, Company A issues quarterly operational recommendations — e.g. reallocate capital from underperforming lines to higher-growth segments."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Two strands of activity flow from the same MIS: (i) consolidation and external reporting that Company A is required to do as parent; (ii) operational recommendations directed at subsidiaries that can change how they run their business.",
        question: "Are these activities a single intra-group service, two services, or something else?",
        mcq: [
          "Mixed: consolidation is shareholder activity; operational recommendations can be an intra-group service.",
          "Single intra-group service — the whole MIS is recharged.",
          "All of it is shareholder activity because Company A is the parent."
        ],
        correctIdx: 0,
        analysis:
          "Activities performed solely because of Company A's ownership interest — such as consolidation for parent-level reporting — are shareholder activities and do not give rise to a service. However, where recommendations strengthen subsidiaries' financial performance and operations (e.g. capital reallocation advice), the benefit test may be met and a service rendered. A fee may be charged for that portion.",
        verdict: "Mixed — partial service"
      }
    ],
    takeaway:
      "The same system can produce both shareholder activity and intra-group services. Bifurcate by reference to who benefits: parent-only reporting is shareholder; advice that subsidiaries would have paid for is a service.",
    crossRefs: [
      "Section B.1 (shareholder activities)",
      "Example 6 (divestment as shareholder activity)"
    ]
  },

  {
    id: 6,
    theme: "shareholder",
    themeLabel: "Shareholder activity",
    title: "Identifying buyers for a subsidiary",
    group: null,
    refs: "Annex I · ¶24–26",
    atGlance:
      "Parent Co starts a project to identify buyers for one of its subsidiaries. Later, it reuses what it learned to improve other subsidiaries' operations. Is this shareholder activity throughout, or does the second phase become an intra-group service?",
    parties: {
      kind: "shareholder-activity",
      parent: { name: "Parent Co", role: "MNE parent · seeks divestment of Co B" },
      target: { name: "Company B", role: "Divestment target" },
      arrowLabel: "potential buyers · structuring · due diligence"
    },
    timeline: [
      "Parent Co's board launches a project to identify buyers for Company B.",
      "The project covers buyer identification, deal structuring, and legal / regulatory due diligence.",
      "Parent Co does not advise other subsidiaries as part of the project.",
      "Later, Parent Co reuses learnings to assess other subsidiaries' operations and drives operational improvements at several of them."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Two phases: (i) buyer search and divestment work for Company B; (ii) later operational improvements at other subsidiaries using insights from the divestment work.",
        question: "Are Parent Co's activities a shareholder activity, an intra-group service, or both?",
        mcq: [
          "Both — divestment work is shareholder; later operational improvements are intra-group services.",
          "Shareholder only — both phases relate to Parent Co's ownership interest.",
          "Service only — Parent Co's later operational work proves benefit throughout."
        ],
        correctIdx: 0,
        analysis:
          "The divestment work relates solely to Parent Co's ownership interest in Company B; an independent enterprise in comparable circumstances would not pay for or perform it. That is a shareholder activity. But Parent Co's later activity — assessing other subsidiaries' operations, implementing changes and assisting with improvements — provides a benefit to those subsidiaries within paragraph 7.13 and should be characterised as a service, not a shareholder activity.",
        verdict: "Mixed — shareholder + service"
      }
    ],
    takeaway:
      "The character of an activity depends on whose interest it serves. Same team, different consumers: the work for the parent's own purposes is shareholder; the same know-how applied to improve subsidiaries' operations can become a service.",
    crossRefs: [
      "Section B.1 (shareholder activities)",
      "Example 7 (divestment costs)"
    ]
  },

  {
    id: 7,
    theme: "shareholder",
    themeLabel: "Shareholder activity",
    title: "Divesting a loss-making subsidiary",
    group: null,
    refs: "Annex I · ¶27–30",
    atGlance:
      "Parent Co sells Company A to an external buyer. The rest of the group benefits too — reduced funding costs, more cash flow. Does that turn the divestment work into an intra-group service the group should pay for?",
    parties: {
      kind: "shareholder-activity",
      parent: { name: "Parent Co", role: "MNE parent · centralised treasury" },
      target: { name: "Company A", role: "Loss-making manufacturer · sold to a third party" },
      arrowLabel: "divestment activities"
    },
    timeline: [
      "Parent Co centralises group treasury, funding subsidiaries at arm's length.",
      "Company A — a manufacturing subsidiary — incurs losses due to market conditions.",
      "Parent Co decides to sell Company A to an independent party.",
      "Parent Co incurs legal and advisory costs related to the divestment.",
      "On completion, Parent Co receives sale consideration and avoids further funding to Company A; the group's overall cash flow improves."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Other group entities derive incidental financial benefits from the divestment (better group cash flow). However, at the time of the divestment those potential benefits to others were indirect or remote.",
        question: "How should Parent Co's divestment costs be treated?",
        mcq: [
          "Shareholder costs — divestment serves Parent Co's ownership interest; group benefits are incidental.",
          "Service costs — group cash-flow uplift makes this an intra-group service.",
          "Allocate pro-rata between Parent Co and the group entities that benefit."
        ],
        correctIdx: 0,
        analysis:
          "The activities are performed by Parent Co solely because of its ownership interest and only provide a benefit to itself. Benefits to other group entities are incidental — at the time of the divestment they were indirect or remote, such that independent enterprises in comparable circumstances would not pay for them or perform them. The costs are shareholder costs.",
        verdict: "Shareholder costs"
      }
    ],
    takeaway:
      "Incidental, downstream financial benefits to the group do not convert a shareholder activity into a service. The test is the ex-ante expectation at the time of the activity: would independent enterprises have paid for it?",
    crossRefs: [
      "Section B.1 (shareholder activities)",
      "Example 8 (acquisition costs)"
    ]
  },

  {
    id: 8,
    theme: "shareholder",
    themeLabel: "Shareholder activity",
    title: "Acquiring an independent target",
    group: null,
    refs: "Annex I · ¶31–33",
    atGlance:
      "Parent Co acquires an independent foreign company to diversify into a new industry. The deal lifts shareholder value at the parent level but doesn't change how the existing subsidiaries operate. Whose costs are the acquisition costs?",
    parties: {
      kind: "shareholder-activity",
      parent: { name: "Parent Co", role: "MNE parent · diversification" },
      target: { name: "Enterprise Co", role: "Independent target in Country E" },
      arrowLabel: "acquisition activities"
    },
    timeline: [
      "Parent Co owns Company A (manufacturing) and Company B (distribution).",
      "Parent Co decides to enter a new industry by acquiring Enterprise Co — an independent entity in Country E.",
      "The acquisition is expected to raise Parent Co shareholder value but is not expected to change the operations of Companies A or B.",
      "Parent Co raises funds, complies with M&A requirements, and takes the actions needed to keep Enterprise Co operationally viable post-acquisition."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Companies A and B may derive some benefits from the acquisition (e.g. expanded portfolio), but at the time of the deal those potential benefits were indirect or remote.",
        question: "Are Parent Co's acquisition costs shareholder costs or intra-group service costs?",
        mcq: [
          "Shareholder costs — acquisition serves Parent Co's ownership interest; downstream benefits are incidental.",
          "Service costs — Companies A and B benefit from the larger group portfolio.",
          "Allocate based on Companies A and B's eventual revenue uplift."
        ],
        correctIdx: 0,
        analysis:
          "The acquisition activities are performed by Parent Co solely because of its ownership interest and only provide a benefit to itself. Any benefits to Companies A and B are incidental — at the time of the acquisition the potential benefits were indirect or remote such that independent enterprises in comparable circumstances would not pay for these acquisition activities or perform them.",
        verdict: "Shareholder costs"
      }
    ],
    takeaway:
      "Acquisition costs of an independent target are shareholder costs of the acquiring parent — even where existing subsidiaries may, over time, derive some incidental benefit from a broader group.",
    crossRefs: [
      "Section B.1 (shareholder activities)",
      "Example 7 (divestment costs)"
    ]
  },

  /* ===================================================================
     ALREADY COMPENSATED (Example 4)
     =================================================================== */

  {
    id: 4,
    theme: "already-compensated",
    themeLabel: "Already compensated",
    title: "Franchise fee covering brand activities",
    group: null,
    refs: "Annex I · ¶18–20",
    atGlance:
      "Company A pays a franchise fee to Company B for the brand and related intangibles. Under the franchise agreement, Company B must also perform global marketing. Should a separate service fee be charged for that global marketing?",
    parties: {
      kind: "franchise",
      franchisor: { name: "Company B", role: "Brand owner · franchisor" },
      franchisee: { name: "Company A", role: "Franchisee · pays franchise fee" }
    },
    timeline: [
      "Company A operates under a franchise agreement with Company B.",
      "Company A pays a franchise fee for the right to use Company B's brand and related intangibles.",
      "Under the agreement, Company B must develop and maintain global brand assets and perform global marketing.",
      "Comparable franchise agreements show the same package of rights and obligations."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company B carries out global brand strategy and asset development. Comparable franchise contracts confirm these activities are part of what a franchise fee normally covers.",
        question: "Should Company B charge a separate service fee for global brand marketing?",
        mcq: [
          "No — those activities are already compensated through the franchise fee.",
          "Yes — global marketing is a separate service that warrants its own charge.",
          "Yes, but only for activities exceeding what comparables show is included."
        ],
        correctIdx: 0,
        analysis:
          "The comparables show that the franchise fee already covers global brand management. At arm's length, Company B would not charge a separate service fee for activities that are already compensated through the franchise fee.",
        verdict: "No separate service fee"
      }
    ],
    takeaway:
      "Before recognising a separate intra-group service, check that the activity is not already remunerated through another transaction such as a franchise fee. Comparables on the parent transaction tell you what is — and isn't — baked in.",
    crossRefs: [
      "Section B.3 (services in connection with other transactions)"
    ]
  },

  /* ===================================================================
     SELECTING THE TP METHOD (Examples 11–18)
     =================================================================== */

  {
    id: 11,
    theme: "methods",
    themeLabel: "Selecting the TP method",
    title: "CUP without geographic adjustments",
    group: null,
    refs: "Annex I · ¶43–45",
    atGlance:
      "Company A in a low-cost country provides IT and back-office services to a principal in a high-cost country. The taxpayer uses the CUP method based on a global median, with no geographic adjustment. Reliable comparables data to adjust does not exist. Does the CUP method work?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A (Country A)", role: "Low-cost · IT & back-office services" },
      right: { name: "Company B (Country B)", role: "High-cost · principal" },
      arrowLabel: "service fee →"
    },
    timeline: [
      "Company A provides IT and back-office support to Company B and other affiliates.",
      "The fee is benchmarked using the CUP method, with a median from independent contracts across both low- and high-cost markets.",
      "No geographic adjustment is made, and reliable adjustment data is not available."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Accurate delineation indicates reliable adjustments would be needed for material market differences. The data needed to make those adjustments does not exist.",
        question: "Does this analysis support a reliable application of the CUP method?",
        mcq: [
          "No — without reliable adjustments for material comparability differences, the CUP application is not reliable.",
          "Yes — using a global median averages out market differences and is reliable.",
          "Yes — geographic adjustments are optional under the CUP method."
        ],
        correctIdx: 0,
        analysis:
          "Accurate delineation indicates reliable adjustments would be required to account for comparability differences in market conditions. There are no data available that would enable such reliable adjustments. Therefore, Company A's analysis would not lead to a reliable application of the CUP method.",
        verdict: "CUP unreliable"
      }
    ],
    takeaway:
      "Method selection is not just about a label — it requires that the data permits reliable adjustment for material differences. If you cannot adjust, you cannot apply.",
    crossRefs: [
      "Chapter II (selection of method)",
      "Example 12 (CUP and comparability)"
    ]
  },

  {
    id: 12,
    theme: "methods",
    themeLabel: "Selecting the TP method",
    title: "CUP and limited procurement support",
    group: null,
    refs: "Annex I · ¶46–50",
    atGlance:
      "Company S provides limited procurement support to Company A, while Company A keeps the substantive negotiation and risks. Company S benchmarks itself against full-service procurement agents. Are those agents really comparable?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Suppliers", role: "Third-party manufacturers" },
      second: { name: "Company A", role: "Parent · negotiates, ships, manages relationships" },
      third: { name: "Company S", role: "Procurement support · analytical only" },
      label1: "supply →",
      label2: "support →"
    },
    timeline: [
      "Company A coordinates sourcing from third-party contract manufacturers in low-cost jurisdictions and holds the supplier relationships.",
      "Company A establishes Company S to provide procurement support — supplier-selection analytics and review of contract terms.",
      "Company S does not interact with suppliers, does not hold title to goods, and does not manage the supply chain.",
      "Company S benchmarks its fee under the CUP method against independent sourcing agents who do the full procurement role."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Accurate delineation indicates Company S provides limited support; independent comparable agents perform negotiations, set prices, manage the supply chain, and bear corresponding risks.",
        question: "Is the CUP method (against full-service agents) appropriate for Company S?",
        mcq: [
          "No — functions and risks differ materially; Company S is not comparable to those agents.",
          "Yes — both perform procurement-related activities, so the comparison is sufficient.",
          "Yes, with a downward adjustment for the missing negotiation function."
        ],
        correctIdx: 0,
        analysis:
          "Given Company S's limited operations and the differences in functions and risks compared with independent agents, Company S is not comparable to those agents. The independent-party sourcing contracts cannot be used to reliably apply the CUP method.",
        verdict: "CUP unreliable"
      }
    ],
    takeaway:
      "Match comparables to the actual functions, assets, and risks performed by the tested party. A label-level match is not enough — look at what the comparable enterprise actually does and bears.",
    crossRefs: [
      "Chapter II (comparability and method selection)",
      "Example 11 (CUP and geographic differences)"
    ]
  },

  {
    id: 13,
    theme: "methods",
    themeLabel: "Selecting the TP method",
    title: "Pharma R&D — milestone pricing",
    group: "Pharma Co",
    refs: "Annex I · ¶51–55",
    atGlance:
      "Company A engages a specialised affiliate (Company B) to run clinical trials using its own proprietary computational biology. The risk of R&D failure is borne by Company A, but Company B contributes unique IP and proven outcome-shortening capability. How is Company B compensated?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "R&D principal · owns and exploits drug IP · bears R&D failure risk" },
      right: { name: "Company B", role: "Clinical trials with proprietary analytics IP" },
      arrowLabel: "data analysis & trials →"
    },
    timeline: [
      "Pharma Co centralises drug development in Company A (subsidiary that owns and exploits drug IP).",
      "Company A engages Company B for data analysis and patient stratification using Company B's own IP and track record.",
      "At contract date, the probability that any new drug succeeds is highly uncertain.",
      "Compensation is structured to keep Company B operating on a rolling basis and to incentivise specific clinical milestones."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company A holds drug IP and bears the financial risk of R&D failure. Company B holds analytics IP, designs and executes trials, bears the associated risks, and has a track record of accelerating timelines.",
        question: "How should Company B be remunerated for the services?",
        mcq: [
          "A structure that combines a rolling-operations base with milestone-based incentives reflecting its IP and risks.",
          "A simple cost-plus mark-up on its operating costs — it provides routine services.",
          "Equal profit-split with Company A, since both contribute IP."
        ],
        correctIdx: 0,
        analysis:
          "Based on industry practices documented by Company A, the remuneration is structured to ensure Company B can continue its operations on a rolling basis while incentivising successful clinical milestones, taking into account the risks Company B assumes and the IP it uses in providing the services.",
        verdict: "Milestone-based remuneration"
      }
    ],
    takeaway:
      "Where a service provider contributes unique IP and bears meaningful risks, pure cost-plus is rarely arm's length. Structures that combine baseline coverage with success-linked rewards can better reflect the parties' contributions.",
    crossRefs: [
      "Chapter VI (intangibles)",
      "Example 15 (contract research vs. unique R&D)"
    ]
  },

  {
    id: 14,
    theme: "methods",
    themeLabel: "Selecting the TP method",
    title: "Contract manufacturing",
    group: "Group X",
    refs: "Annex I · ¶56–61",
    atGlance:
      "Company B manufactures consumer electronics under detailed instructions from Company A — specifications, designs, QA, output, even who to buy raw materials from. Economically significant risks sit with Company A. What method prices Company B's services?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Global product dev & marketing · principal" },
      right: { name: "Company B", role: "Contract manufacturer · under Company A's direction" },
      arrowLabel: "instructions ↓ · finished goods ↑"
    },
    timeline: [
      "Company B builds and equips its plant to Company A's specifications.",
      "Company B manufactures to the technical requirements and designs provided by Company A.",
      "Company A performs regular quality checks and guarantees off-take of the entire compliant output.",
      "Company B coordinates inputs and trains its personnel; it assumes the risk of failing to competently deliver the manufacturing services.",
      "Economically significant risks associated with generating a return from manufacturing sit with Company A."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company B performs production activities under Company A's extensive instruction. Its risk profile is narrow — failure to perform competently.",
        question: "Which TP method is appropriate for pricing Company B's services?",
        mcq: [
          "Cost-plus or TNMM based on comparable manufacturers.",
          "Profit split — both parties contribute to the manufacturing outcome.",
          "Resale price minus, based on the wholesale margin on the finished product."
        ],
        correctIdx: 0,
        analysis:
          "Based on the facts and circumstances, the services provided by Company B to Company A may be appropriately priced using the cost-plus method or the transactional net margin method based on comparable manufacturers.",
        verdict: "Cost-plus / TNMM"
      }
    ],
    takeaway:
      "Where the manufacturer's contributions and risks are circumscribed by the principal's direction, a one-sided method anchored on the manufacturer's cost base is typically appropriate.",
    crossRefs: [
      "Chapter II (cost-plus and TNMM)",
      "Example 15 (contract research counterpart)"
    ]
  },

  {
    id: 15,
    theme: "methods",
    themeLabel: "Selecting the TP method",
    title: "Contract research vs. unique R&D",
    group: "Group X · Pharma",
    refs: "Annex I · ¶62–68",
    atGlance:
      "The same pharma group runs two R&D arrangements. One is tightly directed by Company A. The other gives the researcher real autonomy and unique IP. Should the same TP method price them both?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Company A", role: "Global R&D leader · owns intangibles" },
      second: { name: "Company B", role: "Contract research under direction" },
      third: { name: "Company C", role: "Autonomous early-stage research · own IP" },
      label1: "directed work →",
      label2: "autonomous R&D →"
    },
    timeline: [
      "Company A directs and controls group R&D, owns the resulting intangibles and pre-existing IP it uses to manage R&D.",
      "Company B performs research exclusively for Company A under a detailed service agreement that defines scope, protocols, reporting, and IP ownership.",
      "Separately, Company C conducts early-stage exploratory research under a broad framework — it chooses areas, assesses feasibility, decides on continuation, and uses its own specialised IP."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Company B has little or no discretion. It does not bear the risk of unsuccessful research outcomes. Parties operate in line with the contract.",
        question: "How should Company B be priced?",
        mcq: [
          "Cost-plus or TNMM on a cost-based PLI — characterised as contract research.",
          "Profit split — both parties contribute to research outcomes.",
          "CUP using independent CROs without further analysis."
        ],
        correctIdx: 0,
        analysis:
          "Taking into account functions, assets and risks, the arrangement is characterised as contract research services from Company B to Company A. The services may be appropriately priced using the cost-plus method or the TNMM with a cost-based profit level indicator.",
        verdict: "Cost-plus / TNMM"
      },
      {
        letter: "B",
        facts:
          "Company C autonomously identifies areas of research, assesses feasibility, decides continuation, and uses its own specialised IP. Both Company A and Company C contribute unique and valuable intangibles, and their operations are highly integrated.",
        question: "How should Company C be priced?",
        mcq: [
          "Transactional profit split — both parties make unique and valuable contributions and are highly integrated.",
          "Cost-plus on Company C's R&D spend — it is still a service provider.",
          "CUP using independent biotech firms."
        ],
        correctIdx: 0,
        analysis:
          "After analysing functions, assets and risks, both parties make unique and valuable contributions, and their operations are highly integrated such that intangibles cannot be utilised separately. The conditions for the transactional profit split method are met. It may be the most appropriate method for pricing the transaction.",
        verdict: "Profit split"
      }
    ],
    takeaway:
      "Method selection follows the substance of the parties' contributions and integration — not the form of the contract or the industry label. \"R&D services\" can mean very different things across affiliates of the same group.",
    crossRefs: [
      "Chapter II (profit split conditions)",
      "Example 13 (milestone pricing)"
    ]
  },

  {
    id: 16,
    theme: "methods",
    themeLabel: "Selecting the TP method",
    title: "ML model with non-routine intangibles",
    group: "Healthcare MNE",
    refs: "Annex I · ¶69–73",
    atGlance:
      "Company A builds and operates a proprietary ML model that delivers personalised treatment plans to affiliates X, Y and Z. Company A owns the model, the data, and assumes the operational risks. Can a one-sided method anchored on Company A's costs reliably price this service?",
    parties: {
      kind: "provider-to-recipients",
      provider: { name: "Company A", role: "Owns & operates ML model · proprietary data & tools" },
      recipients: [{ name: "Companies X, Y, Z", role: "Receive personalised treatment recommendations" }],
      note: "Each recommendation effectively transfers an intangible (the patient-specific output of the model) to X, Y or Z."
    },
    timeline: [
      "MNE Group decides to build an in-house ML model to retain control of sensitive patient data.",
      "Company A leads development, legally owns the model, and bears the economically significant risks.",
      "Company A collects and cleans proprietary datasets using proprietary tools, trains and tests the model on high-performance hardware.",
      "Company A delivers a continuous service of personalised treatment recommendations to X, Y, Z and continuously monitors performance."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company A hosts and maintains the model, bears uptime/security/performance risk, and develops and uses unique and valuable intangibles. Each output is a personalised treatment plan — a transfer of an intangible.",
        question: "Can cost-plus or TNMM with Company A as the tested party reliably price the service?",
        mcq: [
          "Unlikely — non-routine intangibles and risks make suitable comparables hard to find with Company A as the tested party.",
          "Yes — cost-plus on Company A's operating costs is standard for SaaS-type services.",
          "Yes — TNMM with a routine return on Company A is straightforward to apply."
        ],
        correctIdx: 0,
        analysis:
          "Given the development, use and contribution of unique and valuable intangibles through the performance of the intra-group service, it is unlikely that suitable comparables will be available to apply the cost-plus or TNMM with Company A as the tested party.",
        verdict: "One-sided methods unlikely reliable"
      }
    ],
    takeaway:
      "Where the provider contributes unique and valuable intangibles, expect to look beyond one-sided methods anchored on the provider's cost base — comparables for a non-routine party are usually unavailable.",
    crossRefs: [
      "Chapter II (selection of method)",
      "Chapter VI (intangibles)"
    ]
  },

  {
    id: 17,
    theme: "methods",
    themeLabel: "Selecting the TP method",
    title: "Profit split misapplied",
    group: null,
    refs: "Annex I · ¶74–76",
    atGlance:
      "Company A owns a supply management platform and licenses Company B to use it. Company B uses the platform to provide services to other affiliates and prices its work using the profit split method. Is profit split the right choice when Company B's own contribution is routine?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Company A", role: "Owns supply management platform & IP" },
      second: { name: "Company B", role: "Routine services using A's platform" },
      third: { name: "Group affiliates", role: "Receive supply management services" },
      label1: "platform license →",
      label2: "services →"
    },
    timeline: [
      "Company A owns a valuable supply management platform and associated tools.",
      "Company A authorises Company B to use the intangible.",
      "Company B's staff use the intangible to provide supply management services to other affiliates.",
      "Company B applies the transactional profit split to remunerate itself for the services."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Accurate delineation shows Company B performs routine service functions and does not make any unique and valuable contributions. Company A and Company B do not have highly integrated operations and do not share or separately assume closely related economically significant risks.",
        question: "Is the transactional profit split appropriate for Company B?",
        mcq: [
          "No — without unique and valuable contributions from both parties, a one-sided method on Company B is more reliable.",
          "Yes — Company B's use of the platform makes it a profit-split party.",
          "Yes — by default, services using group IP are profit-split."
        ],
        correctIdx: 0,
        analysis:
          "Where one party contributes the relevant intangibles and the other performs routine functions, a one-sided method would provide a more reliable outcome. The conditions for the transactional profit split method are not met, consistent with paragraphs 2.126 and 2.127 of Chapter II.",
        verdict: "Profit split inappropriate"
      }
    ],
    takeaway:
      "Profit split is the right answer only when both parties make unique and valuable contributions and the operations are highly integrated or risks are shared. Routine functions plus IP licensed in is a one-sided story.",
    crossRefs: [
      "Chapter II §2.126–2.127",
      "Example 15 (profit split correctly applied)"
    ]
  },

  {
    id: 18,
    theme: "methods",
    themeLabel: "Selecting the TP method",
    title: "TNMM with Core IP — wrong tested party",
    group: "Group XYZ · Construction",
    refs: "Annex I · ¶77–80",
    atGlance:
      "Company P, the parent, has decades of proprietary construction know-how (\"Core IP\"). It provides oversight and access to Core IP to affiliates running large projects. Affiliates apply TNMM treating Company P as the tested party, against comparables that do not develop or share comparable IP. Reliable?",
    parties: {
      kind: "tested-party",
      left: { name: "Company P (parent)", role: "Decades of proprietary Core IP · oversight" },
      right: { name: "Group XYZ affiliates", role: "Run construction projects for external clients" },
      arrowLabel: "oversight & access to Core IP →"
    },
    timeline: [
      "Group XYZ contracts with external clients for large construction projects worldwide.",
      "Company P develops Core IP — designs, methods, procedures, blueprints, training, technical advice.",
      "On each project, Company P oversees progress and gives affiliates access to Core IP without explicit licenses or transfers.",
      "Affiliates price Company P's services using TNMM, treating Company P as the tested party, against service providers that do not develop or provide access to comparable IP."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Comparables are functionally similar to Company P only in surface activities; they do not develop or provide access to critical proprietary know-how comparable to Core IP.",
        question: "Is selecting Company P as the tested party for TNMM appropriate?",
        mcq: [
          "No — the comparables differ materially in respect of Core IP; choosing Company P as tested party makes the TNMM unreliable.",
          "Yes — Company P performs services, so it can be the tested party.",
          "Yes — selecting the parent as tested party is conservative."
        ],
        correctIdx: 0,
        analysis:
          "It is not appropriate to select Company P as the tested party because the purported comparables differ materially in respect of developing and providing access to Core IP. This makes Company P's TNMM unreliable because it lacks consideration of the value of Core IP in connection with the services. See paragraph 2.65 of Chapter II.",
        verdict: "TNMM unreliable with P as tested party"
      }
    ],
    takeaway:
      "The tested party is normally the one whose role is less complex. A party that contributes uniquely valuable IP is rarely the right tested party — that choice strips the analysis of the very value the parties are pricing.",
    crossRefs: [
      "Chapter II §2.65 (tested-party selection)",
      "Chapter VI (intangibles)"
    ]
  },

  /* ===================================================================
     MARK-UP AND PASS-THROUGH (Examples 19, 20)
     =================================================================== */

  {
    id: 19,
    theme: "pass-through",
    themeLabel: "Mark-up & pass-through",
    title: "5% safe harbour does not bind non-LVA services",
    group: null,
    refs: "Annex I · ¶81–83",
    atGlance:
      "Company A charges a 3% mark-up on total costs for services that don't qualify as low value-adding (LVA). On audit, the tax administration argues the 5% LVA safe harbour should be a floor. Is it?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Service provider · 3% ROTC mark-up" },
      right: { name: "Group recipients", role: "Receive services that don't qualify as LVA" },
      arrowLabel: "service fees →"
    },
    timeline: [
      "Company A renders services to other group members and applies a 3% ROTC mark-up using TNMM.",
      "The services do not meet the criteria for low value-adding intra-group services under Section E.",
      "On audit, the local tax administration argues the mark-up should be at least 5% by reference to the LVA safe harbour."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Paragraph 7.92 of Chapter VII states the 5% LVA mark-up should not, without further justification, be used as a benchmark for services that don't qualify as LVA.",
        question: "Is a 5% floor implied for services that don't qualify as LVA?",
        mcq: [
          "No — outside the LVA scope, the arm's-length mark-up requires its own transfer pricing analysis and could be above, equal to or below 5%.",
          "Yes — the 5% LVA mark-up is a floor for any intra-group services.",
          "Yes — anything below 5% requires special documentation."
        ],
        correctIdx: 0,
        analysis:
          "The fact that services do not satisfy the definition of low value-adding intra-group services does not imply that a higher mark-up must necessarily be applied. The arm's length mark-up for services outside the LVA scope requires a separate transfer pricing analysis, taking into account functions, assets and risks. The arm's length rate could be above, equal to, or even below 5%.",
        verdict: "5% is not a floor"
      }
    ],
    takeaway:
      "The LVA safe harbour is a simplified expedient for a narrowly defined population. Outside that population, the answer comes from a normal arm's-length analysis — not by reference to the safe harbour rate.",
    crossRefs: [
      "Section E (low value-adding services)",
      "Chapter VII §7.92"
    ]
  },

  {
    id: 20,
    theme: "pass-through",
    themeLabel: "Mark-up & pass-through",
    title: "Advertising pass-through with no mark-up",
    group: "Group G · branded consumer products",
    refs: "Annex I · ¶84–88",
    atGlance:
      "Company Z coordinates marketing for Region Z affiliates, but third-party agencies actually design and place the advertising. Should the €440m/year that flows through Company Z to those agencies be marked up?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Indep. agencies", role: "Design & buy ads · €440m/yr" },
      second: { name: "Company Z", role: "5-person coordinator in Region Z" },
      third: { name: "Company Q", role: "Local affiliate · advertised in Country Q" },
      label1: "ad spend & strategy →",
      label2: "pass-through →"
    },
    timeline: [
      "Group G outsources advertising media strategy to independent agencies.",
      "Group G sets up Company Z (5 employees) in Region Z to coordinate marketing for affiliates including Company Q.",
      "Independent agencies place €200m/yr of advertising and charge €240m/yr in strategy fees — €440m total — to Company Z, which contracts with Company Q.",
      "Group G itself does not pay agencies a mark-up on ad spend; industry comparables show ad agencies typically pass through media spend without mark-up."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Accurate delineation shows Company Z is an intermediary — coordination only — and does not contribute beyond that. Company Q could have engaged the agencies directly.",
        question: "How should Company Z treat the €440m flowing through it?",
        mcq: [
          "Pass through to Company Q without a mark-up; earn arm's length only on Z's own coordination functions.",
          "Mark up the full €440m at a routine cost-plus rate.",
          "Mark up only the €240m strategy portion; pass through the €200m placements."
        ],
        correctIdx: 0,
        analysis:
          "The €200m of ad placements and the €240m of agency strategy fees should be passed through to Company Q without a mark-up, because independent agencies typically do not mark up such spend at arm's length and Company Z makes no contribution beyond its intermediary role. Company Z should earn an arm's length remuneration only for its own coordination functions.",
        verdict: "Pass through; mark up only Z's own role"
      }
    ],
    takeaway:
      "Treat third-party costs that flow through an intermediary as pass-through where the intermediary adds no value beyond paying. The intermediary earns a routine return on the activity it actually performs.",
    crossRefs: [
      "Section C.2 (pricing methods)",
      "Chapter II (pass-through costs)"
    ]
  },

  /* ===================================================================
     DOCUMENTATION (Example 21)
     =================================================================== */

  {
    id: 21,
    theme: "documentation",
    themeLabel: "Documentation",
    title: "Documenting IT support services",
    group: null,
    refs: "Annex I · ¶89–91",
    atGlance:
      "Company A provides IT support to Company B and the arrangement looks well documented. Can the tax authority in Country B still reasonably ask for more? And what changes if Company B also receives similar services from a local provider?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A (Country A)", role: "IT support provider" },
      right: { name: "Company B (Country B)", role: "Service recipient · sometimes uses local IT provider" },
      arrowLabel: "IT support →"
    },
    timeline: [
      "Company A performs IT support activities for Company B, of a type commonly required by similar businesses.",
      "The arrangement is documented in Company A's master file, Company B's local file, and other local documentation, including a detailed fee calculation."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Country B's tax authority considers the documentation insufficient and asks for further proof that the IT activities were performed for Company B. Company B provides a list of IT interventions and incident tickets with dates, descriptions and outcomes.",
        question: "What additional evidence can Country B's tax authority reasonably ask for?",
        mcq: [
          "A representative sample of IT tickets to substantiate the provision of services.",
          "Source code and internal cost ledgers of the entire IT function, regardless of relevance.",
          "Nothing — the documentation in master and local files always suffices."
        ],
        correctIdx: 0,
        analysis:
          "Given the facts and circumstances — IT services commonly required by similar businesses and the volume involved — the tax authorities of Country B can consider that a representative sample of IT tickets issued may be useful in substantiating the provision of IT services from Company A to Company B.",
        verdict: "Sampling is reasonable"
      },
      {
        letter: "B",
        facts:
          "Same facts as A, but the audit reveals Company B also receives IT services from a local independent enterprise under a broadly worded contract. The tax administration cannot conclude on the existing documentation whether there is duplication.",
        question: "What can Country B's tax authority reasonably request next?",
        mcq: [
          "Additional relevant evidence — type of IT services actually provided, organisation charts with role descriptions, and interview information.",
          "Nothing further — the audit must rely on the existing master and local files.",
          "Only the contracts with the independent provider; nothing about Company A."
        ],
        correctIdx: 0,
        analysis:
          "To fully understand the nature of the activities performed by Company A and the local independent enterprise and to reach a conclusion on duplication, the tax authorities of Country B may request additional relevant evidence, which the taxpayer would be expected to provide — such as the type of IT services actually provided, organisational charts with role descriptions, and information from interviews with relevant parties.",
        verdict: "Targeted additional evidence is reasonable"
      }
    ],
    takeaway:
      "Master and local files set the baseline. Where the facts raise specific questions — volume, overlap with local providers, possible duplication — auditors can reasonably ask for targeted additional evidence; taxpayers should be ready to provide it.",
    crossRefs: [
      "Section D (documentation)",
      "Chapter V Annex II",
      "Example 3 (duplication)"
    ]
  }

];
