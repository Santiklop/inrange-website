// Single source of truth for the case content rendered on the page.
// Each case must match the shape validated by scripts/validate-cases.mjs.
//
// Theme codes (used for sidebar grouping):
//   compensation-for-restructuring → Compensation for the restructuring itself
//   risk-and-recognition           → Risk reallocation & recognition
//   post-restructuring             → Post-restructuring TP & location savings

globalThis.CASES = [

  /* ===================================================================
     COMPENSATION FOR THE RESTRUCTURING ITSELF (Examples 1, 2, 5, 6)
     =================================================================== */

  {
    id: 1,
    theme: "compensation-for-restructuring",
    themeLabel: "Compensation for the restructuring itself",
    title: "Full-fledged → limited-risk distributor",
    group: "MNE Group · sales conversion",
    refs: "Ch.IX · ¶9.2, 9.39, 9.41, 9.45",
    atGlance:
      "A long-established full-fledged distributor in Country A is converted into an LRD for a Principal in Country B. Profit potential drops sharply. Is something owed at the moment of conversion — and on what basis?",
    parties: {
      kind: "tested-party",
      left: { name: "FFD-A → LRD-A", role: "Pre-restructuring full-fledged distributor; post-restructuring limited-risk distributor" },
      right: { name: "Principal-B", role: "Foreign associated enterprise (post-restructuring counter-party)" },
      arrowLabel: "rights, contract, intangibles?"
    },
    timeline: [
      "FFD-A has long operated as a full-fledged distributor under a multi-year contract for a given product line; expected returns are above an LRD margin.",
      "Group decides to centralise risk and decision-making in Principal-B; FFD-A is converted to a limited-risk distributor.",
      "Post-restructuring, LRD-A earns a stable, modest return (the OECD's ¶9.45 illustration uses ~+2% per year); Principal-B captures residual.",
      "Question turns to whether anything is owed for the conversion itself."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "The pre-restructuring contract gave FFD-A enforceable rights for several more years, and a functional review shows FFD-A had developed local marketing intangibles still owned by FFD-A at the moment of conversion.",
        question: "Is compensation owed at the moment of conversion, and on what basis?",
        mcq: [
          "Yes — there is a transfer (or substantial renegotiation) of something of value, so compensation is required at arm's length.",
          "No — the arm's length principle never requires compensation when an entity's expected future profits fall.",
          "Only the post-restructuring LRD margin needs to be priced; the conversion itself is never a separately priced event."
        ],
        correctIdx: 0,
        analysis:
          "¶9.39 sets the test: the question is whether there is a transfer of something of value (an asset or an ongoing concern) or a termination/substantial renegotiation of existing arrangements that would be compensated between independent parties. ¶9.41 makes clear that an entity with considerable rights or assets at the time of the restructuring has considerable profit potential that must be remunerated. Here the rights under the contract AND the local marketing intangibles are both 'something of value', so the conversion itself needs to be priced (Section E and/or F of Part I).",
        verdict: "Conversion needs to be priced"
      },
      {
        letter: "B",
        facts:
          "FFD-A2 is a full-fledged distributor in Country A being converted to a limited-risk distributor for a Principal in Country B. Unlike a distributor with long-term contractual rights and local marketing intangibles, FFD-A2 has no contractual rights beyond a rolling one-year arrangement and the functional review shows it owns no local intangibles. Pre-conversion profits were higher and fluctuating; post-conversion the stable LRD return is lower.",
        question: "Does the mere fall in expected future profit trigger arm's-length compensation?",
        mcq: [
          "No — under ¶9.39 the arm's length principle does not require compensation for a mere decrease in the expectation of future profits.",
          "Yes — any reduction in profit potential is, by itself, compensable at arm's length.",
          "Yes — but only if the post-restructuring LRD return is below the median of a benchmarking range."
        ],
        correctIdx: 0,
        analysis:
          "¶9.39: the arm's length principle does not require compensation for a mere decrease in the expectation of an entity's future profits. ¶9.41: if an entity has no discernible rights or other assets at the time of the restructuring, it has no compensable profit potential. The post-restructuring TP still needs to be set at arm's length (Part II), but the conversion itself triggers no separate compensation.",
        verdict: "No separate conversion fee"
      }
    ],
    takeaway:
      "The conversion itself needs a separate compensation only when there is a transfer of something of value or a substantial renegotiation of existing arrangements. A bare fall in expected future profits — with no rights, no intangibles, no enforceable contract term being surrendered — is not compensable at arm's length.",
    crossRefs: [
      "Section D (reallocation of profit potential)",
      "Section E (transfer of something of value) / Section F (indemnification)",
      "Section D.1 of Chapter I (accurate delineation)"
    ]
  },

  {
    id: 2,
    theme: "compensation-for-restructuring",
    themeLabel: "Compensation for the restructuring itself",
    title: "Centralisation of intangibles in an IP company",
    group: "MNE Group · IP holding structure",
    refs: "Ch.IX · ¶9.2 (3rd bullet), 9.57, 9.65–9.66, 9.68–9.70",
    atGlance:
      "Local operating entities transfer their trademarks, know-how and customer contracts to a newly-created group IP company, which then licenses them back. How many distinct transactions need to be priced — and on what basis?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Operating subs A, B, C", role: "Pre-restructuring owners of local trademarks, know-how, contracts" },
      second: { name: "IPCo", role: "Newly-created central IP holding entity" },
      third: { name: "Operating subs (post)", role: "Now licensees of the centralised IP" },
      label1: "transfer of IP + ongoing concern",
      label2: "licence-back · royalty"
    },
    timeline: [
      "Group decision to centralise IP ownership in IPCo for management reasons (synergies, single-window licensing).",
      "Operating subs A, B, C assign their trademarks, know-how, and (in A's case) the customer contracts and key R&D staff to IPCo.",
      "IPCo licenses the IP back to the operating subs for a royalty; in A's case the relocation also moves an experienced workforce.",
      "Group must now price (a) what was transferred to IPCo and (b) the post-restructuring licence-back."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Sub A's transfer included not only the trademarks but the customer contracts and a relocated R&D team — facts that together would, between independent parties, be regarded as the transfer of an integrated business unit.",
        question: "How should the transfer from Sub A be priced — element-by-element or as an aggregate?",
        mcq: [
          "As an ongoing concern, with the valuation reflecting all valuable elements together (including the assembled workforce), per Section E.2 of Part I.",
          "Strictly element-by-element: trademark valuation + workforce valuation + contracts valuation, summed.",
          "Only the trademark needs a transfer price; workforce and contracts are never separately compensable."
        ],
        correctIdx: 0,
        analysis:
          "¶9.68–9.69. The transfer of an ongoing concern means the transfer of assets bundled with the ability to perform certain functions and assume certain risks. The arm's-length compensation does not necessarily amount to the sum of the separate valuations; aggregate valuation may give the most reliable measure. The valuation should reflect ALL the valuable elements that would be remunerated between independent parties, including the impact of the assembled workforce (cross-ref Section D.7 of Chapter I; Section A.4.6 of Chapter VI).",
        verdict: "Ongoing-concern valuation"
      },
      {
        letter: "B",
        facts:
          "After the transfers, IPCo licenses the IP back to the operating subs. IPCo is a small holding company with limited substance.",
        question: "Can IPCo simply set the royalty by reference to a market range without any link to whether it actually controls and bears the IP-related risks?",
        mcq: [
          "No — the licence-back royalty must be set under accurate delineation (Section D.1 of Ch.I): if IPCo doesn't control the DEMPE-style functions and risks, it shouldn't earn the residual associated with them.",
          "Yes — once legal ownership is transferred, the legal owner can always set the royalty at the upper end of any benchmark range.",
          "No — but the only fix is to disregard the IP transfer entirely."
        ],
        correctIdx: 0,
        analysis:
          "¶9.57 directs the analyst to Chapter VI Sections D.1–D.4 for valuing intangibles transferred and licensed back. Legal ownership is the starting point, not the endpoint: under Chapter VI Section B.2, IPCo's return depends on whether it actually performs (or controls) the DEMPE functions and bears the associated risks. If it does not, the licence-back royalty cannot rest only on legal title.",
        verdict: "Substance over legal title"
      }
    ],
    takeaway:
      "Centralising IP into a holding company is usually not one transaction but several — a transfer of value (often an ongoing concern, not isolated assets) plus a post-restructuring licence-back. Both must be priced at arm's length, and the licence-back can't outrun IPCo's substance.",
    crossRefs: [
      "Chapter VI Sections B.2 (DEMPE), D.1–D.4 (IP valuation)",
      "Section E.2 of Part I (transfer of intangibles)",
      "Section A.4.6 of Chapter VI (ongoing concern)",
      "Example 6 (transfer of ongoing concern)"
    ]
  },

  {
    id: 3,
    theme: "risk-and-recognition",
    themeLabel: "Risk reallocation & recognition",
    title: "Recognition or disregard of the restructuring",
    group: "MNE Group · principal in a low-tax jurisdiction",
    refs: "Ch.IX · ¶9.34–9.38, cross-ref Section D.2 of Chapter I (¶1.142)",
    editorial:
      "This scenario sits at the boundary between Chapters I and IX. It is included because business restructurings occasionally raise the threshold question of whether the arrangement itself should be respected before any transfer-pricing analysis can be undertaken.",
    atGlance:
      "A restructuring takes a form rarely seen between independent enterprises and the principal sits in a low-tax jurisdiction. A tax administration is tempted to disregard it. What's the test — and how high is the bar?",
    parties: {
      kind: "tested-party",
      left: { name: "Operating co-A", role: "Restructured entity (post: stripped-risk distributor)" },
      right: { name: "Principal-B", role: "Low-tax-jurisdiction principal under the new structure" },
      arrowLabel: "post-restructuring transactions"
    },
    timeline: [
      "Group restructures so that Operating co-A becomes a stripped-risk distributor for Principal-B.",
      "Principal-B sits in a low-tax jurisdiction; the model is uncommon between independent enterprises.",
      "Country A's tax administration considers whether to disregard the restructuring under domestic and treaty rules.",
      "The accurate-delineation framework of Section D.1 of Ch.I has been applied and all relevant facts are known."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "After accurate delineation, the transactions are commercially rational from each separate entity's perspective (each has options realistically available and is no worse off), even though the structure is unusual; Principal-B has tax motives but the arrangement also has business substance.",
        question: "Can the tax administration disregard the restructuring?",
        mcq: [
          "Only if the exceptional circumstances described in ¶1.142 (Section D.2 of Ch.I) are met — non-recognition is a high bar.",
          "Yes — once the structure is rarely seen between independent enterprises and the principal is in a low-tax jurisdiction, it is presumed non-arm's-length.",
          "Yes — if any tax motive is present, the structure must be disregarded."
        ],
        correctIdx: 0,
        analysis:
          "¶9.34: MNEs are free to organise their business as they see fit. ¶9.35: a tax administration should not disregard part or all of a restructuring unless the exceptional circumstances described in ¶1.142 are met (Section D.2 of Chapter I). ¶9.38: the fact that a restructuring is motivated by tax benefits does not, of itself, warrant a conclusion that it is non-arm's-length, nor justify non-recognition. The right discipline is accurate delineation first, non-recognition only as a last resort.",
        verdict: "Price the structure — don't disregard it lightly"
      }
    ],
    takeaway:
      "Non-recognition is a high bar. The default discipline is accurate delineation under Section D.1 of Ch.I: characterise what is actually happening and price it. Only in the exceptional ¶1.142 circumstances can the tax administration disregard or substitute the parties' arrangement.",
    crossRefs: [
      "Section D.2 of Chapter I (non-recognition, ¶1.142)",
      "Section D.1 of Chapter I (accurate delineation)",
      "Example 4 (risk control under the same framework)"
    ]
  },

  {
    id: 4,
    theme: "risk-and-recognition",
    themeLabel: "Risk reallocation & recognition",
    title: "Risk reallocated to a low-substance principal",
    group: "MNE Group · risk-transfer audit",
    refs: "Ch.IX · ¶9.19–9.23, cross-ref Section D.1.2.1 of Chapter I",
    atGlance:
      "The contract reallocates bad-debt and inventory risk from the local distributor to a foreign principal. The principal has no people with credit or inventory decision-making roles and no balance sheet to absorb a loss. Does the contractual reallocation hold?",
    parties: {
      kind: "tested-party",
      left: { name: "Distributor-A", role: "Pre-restructuring full-fledged distributor (post: contractually 'limited-risk')" },
      right: { name: "Principal-B", role: "Foreign principal contractually allocated bad-debt + inventory risk" },
      arrowLabel: "risk reallocation under the contract"
    },
    timeline: [
      "Pre-restructuring: Distributor-A bears bad-debt and inventory risk under its contracts and balance sheet.",
      "Group signs a new master contract reallocating those risks to Principal-B.",
      "Functional review: Principal-B has no relevant decision-making staff (credit-line decisions and inventory write-down decisions still happen in A); B has no financial capacity to absorb a write-down of the size at stake.",
      "Tax administration in Country A challenges the post-restructuring TP."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Distributor-A's people still make the credit and inventory decisions; Principal-B has neither risk-control functions nor the financial capacity to bear the risk it has contractually assumed.",
        question: "Where does the bad-debt and inventory risk sit for transfer pricing purposes?",
        mcq: [
          "It stays with Distributor-A — under accurate delineation a party that does not control the risk and lacks financial capacity cannot be allocated the profit potential associated with it.",
          "It moves to Principal-B — once the contract reallocates the risk in writing, that allocation governs the TP outcome.",
          "It is split 50/50 between A and B as a default."
        ],
        correctIdx: 0,
        analysis:
          "¶9.20 directs the analyst to Section D.1.2.1 of Chapter I: the party that assumes risk must control it (relevant capability + decision-making per ¶1.65) AND have the financial capacity to bear it (¶1.64). ¶9.21 spells out the consequence: 'a party that after the restructuring does not assume a risk under the analysis of Section D.1.2.1 of Chapter I should not be allocated the profit potential associated with that risk.' Contractual reallocation, on its own, is not enough.",
        verdict: "Risk follows control + capacity"
      }
    ],
    takeaway:
      "A bare contractual reallocation of risk doesn't move the profit potential. Under Section D.1.2.1 of Ch.I (echoed in ¶9.20–9.21), the risk — and the associated return — follows the party that actually controls it AND has the financial capacity to bear it.",
    crossRefs: [
      "Section D.1.2.1 of Chapter I (six-step risk framework)",
      "Example 3 (recognition vs disregard)",
      "Example 1 (FF→LRD conversion)"
    ]
  },

  {
    id: 5,
    theme: "compensation-for-restructuring",
    themeLabel: "Compensation for the restructuring itself",
    title: "Indemnification on contract termination",
    group: "MNE Group · distribution termination",
    refs: "Ch.IX · ¶9.75–9.79, 9.88",
    atGlance:
      "Principal-B terminates Distributor-A's distribution agreement unilaterally, before the end of its term. A seeks indemnification. Is it owed — and on what test?",
    parties: {
      kind: "tested-party",
      left: { name: "Distributor-A", role: "Restructured entity (terminated counter-party)" },
      right: { name: "Principal-B", role: "Counter-party that terminated the arrangement" },
      arrowLabel: "termination"
    },
    timeline: [
      "Distributor-A and Principal-B have a distribution agreement with several years left on its term.",
      "Principal-B terminates the agreement with limited notice as part of a group-wide restructuring.",
      "Distributor-A claims indemnification.",
      "Counsel and TP need to determine whether any indemnification is owed and, if so, how much."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The arrangement, accurately delineated, contains no express indemnification clause; commercial law in the jurisdiction would, however, recognise a right to indemnification on these facts; and independent parties in comparable circumstances would normally have negotiated some form of indemnification given the contract's length and economics.",
        question: "Is indemnification owed, and how is the test framed?",
        mcq: [
          "Yes — the three-part test in ¶9.79 supports an arm's-length indemnification: (i) commercial-law rights, (ii) whether the arrangement's terms (including the absence of a clause) are arm's length, (iii) which party should ultimately bear the cost.",
          "Yes — every contract termination automatically triggers a right to indemnification at arm's length.",
          "No — once there is no express indemnification clause in the written contract, no indemnification is ever owed."
        ],
        correctIdx: 0,
        analysis:
          "¶9.78 states there is no presumption that all terminations give a right to indemnification — facts and circumstances matter. ¶9.79 sets out the three aspects: commercial-law rights; whether the existence or absence of an indemnification clause (and its terms) is arm's length; and which party should ultimately bear the cost. On these facts the law supports a claim AND independent parties would have priced in some indemnification, so the arrangement as accurately delineated does not pass the arm's-length test without one.",
        verdict: "Indemnification likely warranted"
      }
    ],
    takeaway:
      "Termination indemnification isn't automatic and isn't excluded by the absence of an express clause. The arm's-length test runs through ¶9.79: commercial-law support → would independent parties have agreed to an indemnification clause → who bears the cost.",
    crossRefs: [
      "Section F of Part I (¶9.75–9.97 indemnification framework)",
      "Section D.1 of Chapter I (accurate delineation)",
      "Example 1 (compensation at conversion)"
    ]
  },

  {
    id: 6,
    theme: "compensation-for-restructuring",
    themeLabel: "Compensation for the restructuring itself",
    title: "Transfer of an ongoing concern",
    group: "MNE Group · manufacturing relocation",
    refs: "Ch.IX · ¶9.68–9.70",
    atGlance:
      "Manufacturing moves from M1 to M2: machinery, inventory, patents, processes, supplier and customer contracts — and key employees. Three valuation routes are on the table. Which one is right?",
    parties: {
      kind: "tested-party",
      left: { name: "M1", role: "Pre-restructuring manufacturer (transferor)" },
      right: { name: "M2", role: "Post-restructuring manufacturer (transferee, in a lower-cost jurisdiction)" },
      arrowLabel: "ongoing concern transfer"
    },
    timeline: [
      "M1 has been manufacturing in a high-cost jurisdiction; the group plans to relocate manufacturing to M2 in a lower-cost jurisdiction.",
      "M1 transfers to M2: machinery and equipment, inventories, patents, manufacturing processes and know-how, key contracts with suppliers and clients.",
      "Several key M1 employees relocate to M2 to assist with start-up.",
      "Comparable transactions between independent parties would treat this as a single integrated transfer."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Between independent parties this would be characterised as a transfer of an ongoing concern. The relocated assembled workforce is a meaningful part of what is being transferred (time and expense savings for M2).",
        question: "Which valuation route gives the right answer at arm's length?",
        mcq: [
          "Value it as an ongoing-concern transfer — compare with arm's-length transfers of ongoing concerns; account for the assembled workforce in the price.",
          "Value each item in isolation (machinery + patents + inventory + contracts) and sum — assembled workforce has no transfer-pricing value.",
          "Skip the transfer price; charge M2 a contract-manufacturer cost-plus margin going forward."
        ],
        correctIdx: 0,
        analysis:
          "¶9.68 frames the situation: an ongoing concern is a functioning, economically integrated business unit; the valuation should reflect all valuable elements that would be remunerated between independent parties, including the impact of the assembled workforce. ¶9.69: the price does NOT necessarily equal the sum of separate valuations. ¶9.70: the transfer should be compared with a transfer of an ongoing concern between independent parties, not with a transfer of isolated assets. Setting only a post-restructuring cost-plus margin ignores the conversion itself.",
        verdict: "Ongoing-concern valuation"
      }
    ],
    takeaway:
      "When the package is functionally integrated — assets + workforce + contracts + the capacity to carry on the business — the right arm's-length price is for the whole ongoing concern, not the sum of the parts. The assembled workforce is part of the value, not a free rider.",
    crossRefs: [
      "Section E.3 of Part I (¶9.68–9.74 ongoing concern)",
      "Section D.7 of Chapter I (assembled workforce)",
      "Section A.4.6 of Chapter VI (goodwill / ongoing concern value)",
      "Example 2 (IP centralisation as ongoing concern)"
    ]
  },

  {
    id: 7,
    theme: "post-restructuring",
    themeLabel: "Post-restructuring TP & location savings",
    title: "Loss-making LRD post-conversion",
    group: "MNE Group · post-restructuring review",
    refs: "Ch.IX · ¶9.105, 9.108",
    editorial:
      "While this issue is closely connected to comparability and pricing analyses elsewhere in the Guidelines, it is frequently encountered following conversions of entrepreneurial entities into limited-risk entities and therefore provides a useful post-restructuring perspective.",
    atGlance:
      "A freshly-converted LRD records a loss in its first post-restructuring year. The benchmark range for LRDs is firmly positive. What does the loss mean — for the conversion, the post-restructuring TP, or both?",
    parties: {
      kind: "tested-party",
      left: { name: "LRD-A (was FFD-A)", role: "Restructured limited-risk distributor" },
      right: { name: "Principal-B", role: "Foreign principal under the new structure" },
      arrowLabel: "post-restructuring transactions"
    },
    timeline: [
      "FFD-A was converted to LRD-A at year-start; pre-restructuring functions, expenses (incl. marketing), risks and possibly intangibles existed in FFD-A.",
      "LRD-A is benchmarked to an LRD range with a firmly positive lower quartile.",
      "First post-restructuring year: LRD-A records a loss.",
      "Tax administration audits."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Functional review post-conversion shows LRD-A still owns local marketing intangibles and still controls some market risk — facts that diverge from the long-existing LRDs in the comparable set.",
        question: "What is the most likely explanation, and what does it imply?",
        mcq: [
          "The 'LRD' label may understate what LRD-A actually does — the post-restructuring TP, or the conversion itself, needs to reflect the intangibles and risks LRD-A continues to bear.",
          "The loss is automatically arm's length: stripped-risk entities can be loss-making in any given year.",
          "The conversion was correctly priced and the LRD return is irrelevant — only group-level profitability matters."
        ],
        correctIdx: 0,
        analysis:
          "¶9.105 flags that a long-established FFD that becomes an LRD may have performed functions, borne expenses (including marketing) and developed intangibles before conversion — and these should affect either the pricing of the transfers at conversion or the post-restructuring LRD return (or both). ¶9.108 reinforces that labels don't dictate the TP: 'an entity that is labelled as a limited risk distributor can sometimes be found to own valuable local intangibles and to continue to assume significant market risks.' A loss alongside retained intangibles/risks is a signal that the substance disagrees with the label.",
        verdict: "Substance over label"
      }
    ],
    takeaway:
      "Labels don't drive the TP. When a post-restructuring 'LRD' is loss-making and the functional review shows retained intangibles or market risks, either the conversion was under-priced (¶9.105) or the post-restructuring TP is mischaracterising the entity (¶9.108) — usually a bit of both.",
    crossRefs: [
      "Section D of Part II (¶9.100–9.107 pre/post comparison)",
      "Section B of Part II (¶9.108 post-restructuring method)",
      "Example 1 (compensation at conversion)",
      "Example 4 (substance over contract on risk)"
    ]
  },

  {
    id: 8,
    theme: "post-restructuring",
    themeLabel: "Post-restructuring TP & location savings",
    title: "Location savings on a manufacturing relocation",
    group: "MNE Group · brand-name clothing manufacturer",
    refs: "Ch.IX · ¶9.126–9.131",
    atGlance:
      "A high-cost-country brand owner moves basic clothing manufacturing to a low-cost-country affiliate operating as a contract manufacturer. Significant location savings emerge. Who keeps them?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Brand-A (Country A)", role: "Designer, brand owner; on-sells finished goods to customers" },
      second: { name: "Contract Mfr-B (Country B)", role: "Low-cost-country affiliate; no significant intangibles or risks" },
      third: { name: "Customers", role: "Third-party buyers" },
      label1: "contract manufacturing",
      label2: "finished goods · brand price"
    },
    timeline: [
      "Brand-A designs and previously manufactured high-end branded clothing in Country A (high labour cost).",
      "Manufacturing is relocated to affiliate Contract Mfr-B in Country B (significantly lower labour cost).",
      "Brand-A retains the brand and design IP; Contract Mfr-B holds no significant intangibles and bears no significant risks.",
      "Finished goods flow back to Brand-A, which on-sells to third-party customers; significant location savings emerge."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The manufacturing activity is highly competitive: Brand-A has the realistic option of using either Contract Mfr-B or a third-party contract manufacturer in Country B, and reliable comparables exist.",
        question: "How are the location savings allocated at arm's length?",
        mcq: [
          "Very little, if any, of the location savings is attributed to Contract Mfr-B — an arm's-length contract manufacturer in the same market would be priced from local comparables; the residual stays with Brand-A.",
          "The location savings are always split 50/50 between Brand-A and Contract Mfr-B.",
          "All of the location savings are automatically attributed to Contract Mfr-B as the entity in the low-cost country."
        ],
        correctIdx: 0,
        analysis:
          "¶9.129 is exactly on point: where the relocated activity is highly competitive and reliable comparables exist for the low-cost market, an arm's-length contract manufacturer would generally be attributed very little, if any, of the location savings — to do otherwise would put the associated manufacturer in a position different from an independent contract manufacturer in the same market, contrary to the arm's-length principle. ¶9.131 generalises: the allocation turns on functions/risks/assets, options realistically available, bargaining power, and market features.",
        verdict: "Location savings follow the comparables"
      }
    ],
    takeaway:
      "Location savings aren't 'free money' for the low-cost entity. Where reliable local comparables exist and the relocated activity is commoditised, the contract manufacturer earns a market return on those comparables — the location savings sit with the party that has the realistic alternatives and the bargaining power.",
    crossRefs: [
      "Section E of Part II (¶9.126–9.131 location savings)",
      "Section D.6 of Chapter I (location savings, options realistically available)",
      "Example 6 (transfer of ongoing concern)"
    ]
  }

];
