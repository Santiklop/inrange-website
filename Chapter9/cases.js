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
    origin: "inrange-illustration",
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
          "FFD-A still had several years of enforceable contract rights, and it owned local marketing intangibles it had built up over time.",
        question: "Does the conversion itself need to be priced — and if so, why?",
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
          "Same conversion — but this distributor (FFD-A2) only has a rolling one-year arrangement and owns no local intangibles. Pre-conversion profits were higher, post-conversion they're lower and stable.",
        question: "Does the drop in expected profit, on its own, need to be compensated?",
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
    origin: "inrange-illustration",
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
          "Sub A didn't just transfer trademarks — it also moved customer contracts and a key R&D team. Between independents this looks like the transfer of an integrated business unit.",
        question: "Price item-by-item, or as a single ongoing concern?",
        mcq: [
          "As an ongoing concern, with the valuation reflecting all valuable elements together (including the assembled workforce), per Section E.3 of Part I.",
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
          "IPCo is a small holding company with limited substance. It now licenses the IP back to the operating subs.",
        question: "Can IPCo just pick a market-range royalty, regardless of whether it actually controls the IP risks?",
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
    origin: "inrange-illustration",
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
          "Each entity is commercially rational given its options — even if the structure is unusual. There's a tax motive, but also real business substance.",
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
    origin: "inrange-illustration",
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
          "On paper the risks moved to Principal-B. In practice, Distributor-A still makes the credit and inventory calls — and Principal-B can't even afford the losses it has contractually accepted.",
        question: "Where do the risks really sit for transfer pricing?",
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
    origin: "inrange-illustration",
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
          "The contract has no indemnification clause. But commercial law would support an indemnification claim — and independent parties in similar deals would normally have negotiated some protection.",
        question: "Is indemnification owed at arm's length?",
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
    origin: "oecd-example",
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
          "Between independents this would be the transfer of an ongoing concern. The relocated workforce is a real part of what M2 gets — saving time and money.",
        question: "Which valuation route fits at arm's length?",
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
      "Section E.3 of Part I (¶9.68–9.73 ongoing concern)",
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
    origin: "inrange-illustration",
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
          "A closer look shows LRD-A still owns local marketing intangibles and still controls some market risk — unlike the long-established LRDs in the comparable set.",
        question: "What's the most likely explanation for the loss, and what does it imply?",
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
      "Section A of Part II (¶9.100–9.107 restructured vs newly set-up operations)",
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
    origin: "oecd-example",
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
          "Manufacturing is a competitive activity — Brand-A could just as easily use a third-party Country B manufacturer, and reliable local comparables exist.",
        question: "Who keeps the location savings?",
        mcq: [
          "Very little, if any, of the location savings is attributed to Contract Mfr-B — an arm's-length contract manufacturer in the same market would be priced from local comparables; the residual stays with Brand-A.",
          "The location savings are always split 50/50 between Brand-A and Contract Mfr-B.",
          "All of the location savings are automatically attributed to Contract Mfr-B as the entity in the low-cost country."
        ],
        correctIdx: 0,
        analysis:
          "¶9.129 is exactly on point: where the relocated activity is highly competitive and reliable comparables exist for the low-cost market, an arm's-length contract manufacturer would generally be attributed very little, if any, of the location savings — to do otherwise would put the associated manufacturer in a position different from an independent contract manufacturer in the same market, contrary to the arm's-length principle. ¶9.131 generalises: the allocation turns on functions/risks/assets and the options realistically available to each party.",
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
  },

{
    id: 9,
    theme: "risk-and-recognition",
    themeLabel: "Risk reallocation & recognition",
    title: "Central procurement company and group purchasing power",
    group: "MNE group · central procurement",
    refs: "Ch.IX · ¶9.25",
    origin: "oecd-example",
    atGlance:
      "An MNE group restructures by creating a central procurement operation that takes over the procurement of several associated enterprises, to benefit from volume discounts and possible savings in administrative costs. The new company may also take on, by contract, the risk of buying, holding and on-selling goods. Which profits is it entitled to?",
    parties: {
      kind: "tested-party",
      left: { name: "Central procurement company", role: "Single group company · purchasing centralised here · may contractually assume buying, holding and on-selling risk" },
      right: { name: "Several associated enterprises", role: "Group members · their own procurement activities are replaced" },
      arrowLabel: "centralised procurement"
    },
    timeline: [
      "Several associated enterprises in an MNE group each carry out their own procurement activities.",
      "In a business restructuring, the group sets up a central procurement operation that replaces those activities.",
      "Purchasing is deliberately centralised in a single group company so as to benefit from volume discounts and, potentially, lower administrative costs.",
      "By contract, the central procurement company may also take on the risk that comes with buying, holding and on-selling goods."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Here the central procurement company also takes on, by contract, the risk of buying, holding and on-selling goods. The volume discounts are a benefit of the group's purchasing power, which the group has deliberately combined in this one company.",
        question: "Which profits is the central procurement company entitled to?",
        mcq: [
          "The profit potential that comes with the risk it assumes in buying, holding and on-selling goods, but not the profits that stem from the group's purchasing power.",
          "The profit potential that comes with the risk it assumes, plus a share of the purchasing-power benefit, because it is the group company that now places the orders.",
          "Nothing beyond its costs, because every benefit of centralised purchasing belongs to the associated enterprises whose procurement activities it replaced."
        ],
        correctIdx: 0,
        analysis:
          "Centralising purchasing in a single company to obtain volume discounts is a deliberate concerted group action, and under the guidance in Chapter I the resulting benefits should be attributed to the enterprises that contribute to creating the synergies. The central procurement company makes no contribution to creating those synergies, so the profits that stem from the group's purchasing power are not its to keep. What it is entitled to is the profit potential that comes with the risk it assumes in buying, holding and on-selling goods. How economically significant that risk is, and which party or parties assume it, is determined under the risk framework of Section D.1.2.1 of Chapter I.",
        verdict: "Risk-related profit, not synergies"
      }
    ],
    takeaway:
      "A central procurement company can earn the profit potential that goes with the risk it assumes, but it does not keep the benefit of the group's purchasing power. Where a group deliberately pools its buying, the synergy benefits that result should be allocated to the group members whose contributions generate them.",
    crossRefs: [
      "Section B.2 of Part I (business reasons for the restructuring, including the role of synergies)",
      "Section D.8 of Chapter I (MNE group synergies), in particular ¶1.180 and ¶1.188",
      "Section D.1.2.1 of Chapter I (analysis of risks)"
    ]
  },

  {
    id: 10,
    theme: "compensation-for-restructuring",
    themeLabel: "Compensation for the restructuring itself",
    title: "Distributor conversion: three profitability profiles",
    group: "Distributor · foreign principal",
    refs: "Ch.IX · ¶9.46–9.47",
    origin: "oecd-example",
    atGlance:
      "A full-fledged distributor becomes a limited risk distributor with projected profitability of 2% per year, after its distribution arrangement is renegotiated and risk is reallocated between it and a foreign associated enterprise. The Guidelines give three sets of historical and projected figures. What does each show from the distributor's side?",
    parties: {
      kind: "tested-party",
      left: { name: "Distributor", role: "Full-fledged under the existing arrangement · limited risk after the conversion" },
      right: { name: "Foreign associated enterprise", role: "Principal after the conversion" },
      arrowLabel: "risks and associated profit potential",
      note: "The example shows the distributor's perspective only; the Guidelines state that the principal's perspective should also be taken into account."
    },
    timeline: [
      "The starting point is a full-fledged distributor with a long-term contractual arrangement and five years of profitability data. In the set-up in ¶9.45, its rights under that contract give it the realistic option of accepting or refusing a conversion.",
      "Under the restructuring it would become a limited risk distributor acting for a foreign associated enterprise, the principal. The existing distribution arrangement is renegotiated, and the renegotiation reallocates risk between the parties.",
      "Profitability is projected on both footings: as a full-fledged distributor over the remaining term of the agreement, and as a limited risk distributor for the next three years.",
      "In all three scenarios the limited risk projection is 2% per year; the historical and full-fledged figures differ from one scenario to the next."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Scenario 1 of the Guidelines' table. As a full-fledged distributor, profitability in the last five years was -2%, 4%, 2%, 0% and 6%, and it is projected at -2% to 6% over the remaining term of the agreement, with significant uncertainties within that range. As a limited risk distributor, it is projected at 2% per year for the next three years.",
        question: "Would an independent party be willing to give up this uncertain profit potential for a stable 2%?",
        mcq: [
          "That depends on the return it anticipates under each alternative, its risk tolerance, its realistically available options and any compensation for the restructuring itself.",
          "Probably not: even a cautious independent party would be unlikely to settle for a stable 2% while its range still reaches 6%, unless it received additional compensation.",
          "Yes: trading a return that can turn negative for a stable 2% is always acceptable, so compensation for the restructuring itself could never be due on these figures."
        ],
        correctIdx: 0,
        analysis:
          "Here the distributor gives up a profit potential that is significantly uncertain in return for a rate of profitability that is fairly low but stable. The Guidelines draw no inference from these figures as to whether an independent party would accept that trade. It would depend on the return it anticipates under each alternative, its level of risk tolerance, the options realistically available to it and possible compensation for the restructuring itself. The example shows the distributor's perspective only, although the principal's should also be taken into account, and it is not meant as a statement on method selection, the aggregation of transactions or arm's-length remuneration rates for distribution.",
        verdict: "It depends"
      },
      {
        letter: "B",
        facts:
          "Scenario 2 of the Guidelines' table. As a full-fledged distributor, profitability in the last five years was 5%, 10%, 5%, 5% and 10%, and it is projected at 5% to 10% over the remaining term of the agreement, with significant uncertainties within that range. As a limited risk distributor, it is projected at 2% per year for the next three years.",
        question: "Would independent parties in the distributor's situation agree to the conversion for no additional compensation?",
        mcq: [
          "Probably not: with the option to do otherwise, they would be unlikely to hand over the risks and the associated profit potential without additional compensation.",
          "Yes: a stable 2% is an arm's-length return for a limited risk distributor, so the conversion itself calls for no compensation on top of that return.",
          "It depends: with significant uncertainties in the 5% to 10% projection, no view can be taken without knowing the distributor's tolerance for risk."
        ],
        correctIdx: 0,
        analysis:
          "Both the five-year record and the projection for the remaining term put the full-fledged distributor at 5% to 10%, against 2% per year after the conversion. On those figures, and despite the uncertainties in the projection, the Guidelines take a view: it is unlikely that an independent distributor in this position would give up the risks and the profit potential that goes with them without further compensation, if it had the choice not to. The text goes no further than \"unlikely\" and does not say how much compensation would be needed. The example shows the distributor's perspective only and is not meant as a statement on method selection or arm's-length remuneration rates.",
        verdict: "Unlikely without additional compensation"
      },
      {
        letter: "C",
        facts:
          "Scenario 3 of the Guidelines' table. As a full-fledged distributor, profitability in the last five years was 5%, 7%, 10%, 8% and 6%, but it is projected at only 0% to 4% over the remaining term of the agreement, with significant uncertainties within that range; the table puts this down to new competitive pressures. As a limited risk distributor, it is projected at 2% per year for the next three years.",
        question: "What does this scenario show about assessing the profit potential the distributor gives up?",
        mcq: [
          "It should be assessed going forward: once the commercial or economic environment has changed significantly, historical data alone is not enough.",
          "It is best measured by the five-year record of 5% to 10%, because actual results are more reliable than projections that are uncertain.",
          "It can be left aside, because once new competitive pressures appear a distributor can no longer expect compensation for a conversion."
        ],
        correctIdx: 0,
        analysis:
          "The five-year record lies between 5% and 10%, but with new competitive pressures the projection for the remaining term is only 0% to 4%. The Guidelines use this scenario for one point: the analysis should look at the profit potential going forward, and where the commercial or economic environment has changed significantly, historical data alone is not a sufficient basis. They do not say whether compensation would be due on these figures. The example shows only the distributor's perspective and says nothing about method selection or arm's-length remuneration rates.",
        verdict: "History alone is not enough"
      }
    ],
    takeaway:
      "Whether a distributor would give up risk and profit potential for a low but stable return depends on what it can expect under each model, its risk tolerance, its realistic options and any compensation for the restructuring. That profit potential is assessed going forward: past profits matter only as far as they indicate future ones.",
    crossRefs: [
      "Section D.2 of Part I (reallocation of risks and profit potential)",
      "¶9.45 (the conversion on which the three scenarios build)",
      "Example 1 (full-fledged → limited-risk distributor)"
    ]
  },

  {
    id: 11,
    theme: "compensation-for-restructuring",
    themeLabel: "Compensation for the restructuring itself",
    title: "Pricing inventory transferred on conversion",
    group: "Taxpayer · foreign associated enterprise",
    refs: "Ch.IX · ¶9.49–9.53",
    origin: "oecd-example",
    atGlance:
      "A full-fledged manufacturer and distributor becomes a toll manufacturer and limited risk distributor for a newly established foreign associated enterprise. At the changeover it still has raw materials and finished products on its balance sheet, and these are transferred to that enterprise. How is the arm's-length price of this inventory determined?",
    parties: {
      kind: "tested-party",
      left: { name: "Taxpayer", role: "Was a full-fledged manufacturer and distributor · now toll manufacturer and limited risk distributor" },
      right: { name: "Foreign associated enterprise", role: "Established as part of the restructuring · owns raw materials and finished products · assumes inventory risk" },
      arrowLabel: "raw materials and finished products on hand",
      note: "The Guidelines use this example solely to illustrate the valuation of inventory transfers."
    },
    timeline: [
      "Before the restructuring, the taxpayer buys raw materials, manufactures finished products, performs marketing and distribution functions and sells to third-party customers, assuming risks such as inventory, bad debt and market risks.",
      "The restructuring involves setting up a foreign associated enterprise, which acquires intangibles from several affiliates, the taxpayer among them.",
      "Under the new model, the foreign associated enterprise acquires the raw materials and places them on consignment at the taxpayer's premises for manufacturing against a fee. The foreign associated enterprise owns the stock of finished products; the taxpayer buys them for immediate resale, only after it has made a sale to a customer.",
      "Inventory risk, previously borne by the taxpayer, is now assumed under the contract by the foreign associated enterprise, which both controls that risk and has the financial capacity to assume it.",
      "To move to the new arrangement, the taxpayer hands over to the foreign associated enterprise the raw materials and finished products then on its own balance sheet."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "When the new arrangement starts, the taxpayer still has raw materials and finished products on its balance sheet, and these are transferred to the foreign associated enterprise. The taxpayer has manufactured the finished products, while the marketing and distribution functions for them still remain to be performed.",
        question: "How is the arm's-length transfer price for the inventory determined?",
        mcq: [
          "No single method is prescribed: comparable uncontrolled prices, resale price less a distribution reward, or cost plus a mark-up may each fit, depending on the comparability analysis.",
          "At the book value shown on the taxpayer's balance sheet, because moving stock to an associated enterprise when the business model changes cannot give rise to a profit.",
          "Normally at manufacturing cost plus a mark-up, since the goods are already made; comparable prices or the resale price are generally fall-backs where costs cannot be established."
        ],
        correctIdx: 0,
        analysis:
          "The Guidelines do not choose a method: the choice depends on the comparability analysis of the parties, including a functional analysis that may have to cover a transition period. Three possibilities are mentioned, none ranked above the others: comparable uncontrolled prices for the raw materials and finished products, to the extent comparability is met; for the finished products, the price at which they are resold to customers, reduced by an arm's-length reward for the marketing and distribution functions that have yet to be performed; or manufacturing costs plus an arm's-length mark-up for the manufacturer's functions, assets and risks, although the market value of inventories is sometimes so low that no profit element can be added to costs. The choice depends in part on which side of the transaction, the manufacturing already done or the marketing and sales still to come, is simpler and can be evaluated with more certainty. The example is confined to inventory valuation: it does not delineate the restructuring as a whole or suggest that any one method is always acceptable.",
        verdict: "Three possibilities, none prescribed"
      }
    ],
    takeaway:
      "The arm's-length principle applies to inventory that passes between associated enterprises in different jurisdictions when a business model changes. Which approach fits depends on the comparability analysis and, in part, on which side of the transaction can be evaluated with more certainty.",
    crossRefs: [
      "Section E.1 of Part I (tangible assets)",
      "¶3.18–3.19 (choice of the tested party)",
      "Section D.1 of Chapter I (accurate delineation, which this example does not undertake)"
    ]
  },

  {
    id: 12,
    theme: "compensation-for-restructuring",
    themeLabel: "Compensation for the restructuring itself",
    title: "Customer contracts ended so an affiliate can step in",
    group: "Company A · Company B",
    refs: "Ch.IX · ¶9.67",
    origin: "oecd-example",
    atGlance:
      "Company A voluntarily ends valuable long-term contracts with independent customers, in circumstances where the customers are bound, legally or commercially, to make similar arrangements with Company B, a foreign entity in the same MNE group. B now holds the contractual rights and their profit potential. Is there anything to price between A and B?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Company A", role: "Held valuable long-term customer contracts · terminates them voluntarily" },
      second: { name: "Independent customers", role: "Legally or commercially obligated to contract with B" },
      third: { name: "Company B", role: "Foreign entity in the same MNE group as A · enters into similar contracts" },
      label1: "contracts terminated",
      label2: "similar contracts concluded"
    },
    timeline: [
      "A's long-term contracts with independent customers are valuable: they carry significant profit potential for A.",
      "Later, A ends these contracts by its own choice.",
      "The circumstances are such that the customers are obligated, legally or commercially, to make similar arrangements with B, a foreign entity belonging to the same MNE group as A.",
      "As a result, B now holds the contractual rights and the profit potential attached to them, which A held before."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Assume the factual situation is that B could contract with the customers only if A gave up its own contractual rights in B's favour, and that A ended its contracts only in the knowledge that the customers were obligated, legally or commercially, to conclude similar arrangements with B.",
        question: "How should the termination of A's contracts be analysed?",
        mcq: [
          "As in substance a tri-partite transaction that may amount to A transferring valuable contractual rights to B, which may need remunerating depending on their value to both.",
          "As A ending its own contracts with independent customers, which is not a controlled transaction and therefore leaves nothing to be priced between A and B.",
          "As a possible transfer of contractual rights from A to B, for which any remuneration would generally be measured by what the rights were worth to A alone."
        ],
        correctIdx: 0,
        analysis:
          "The Guidelines look at the substance. If that is the factual situation (B could obtain the contracts only if A gave up its rights, and A terminated only in the knowledge that the customers were obligated to contract with B), the arrangement is in substance a three-party (tri-partite) transaction. That may amount to A transferring valuable contractual rights to B, a transfer that may call for arm's-length remuneration. This depends on what the surrendered rights are worth, from A's perspective and from B's.",
        verdict: "Possible transfer of contractual rights"
      }
    ],
    takeaway:
      "A transfer of valuable contractual rights between associated enterprises can take place through third parties, without a direct transaction between the two. Where a company gives up a contract so that an affiliate can conclude a similar one, the substance may be a transfer of those rights, for which arm's-length remuneration may be due depending on their value to both sides.",
    crossRefs: [
      "Section E.2.4 of Part I (contractual rights)",
      "¶9.66 (valuable contractual rights transferred or surrendered between associated enterprises)"
    ]
  },

  {
    id: 13,
    theme: "compensation-for-restructuring",
    themeLabel: "Compensation for the restructuring itself",
    title: "Outsourcing and the taxpayer's restructuring costs",
    group: "Taxpayer · associated enterprise",
    refs: "Ch.IX · ¶9.74",
    origin: "oecd-example",
    atGlance:
      "A taxpayer that makes and sells products in a high-cost jurisdiction outsources manufacturing to an associated enterprise in a low-cost jurisdiction, buys the products from it and goes on selling them to third-party customers. The move may bring it restructuring costs. Would independent parties expect the associated enterprise to compensate it?",
    parties: {
      kind: "tested-party",
      left: { name: "Taxpayer", role: "High-cost jurisdiction · outsources manufacturing · continues to sell to third-party customers" },
      right: { name: "Associated enterprise", role: "Low-cost jurisdiction · manufactures the products and sells them to the taxpayer" },
      arrowLabel: "manufacturing activity"
    },
    timeline: [
      "The taxpayer manufactures and sells products in a high-cost jurisdiction.",
      "The taxpayer decides that an associated enterprise in a low-cost jurisdiction will do the manufacturing instead (outsourcing).",
      "After the restructuring, the taxpayer buys the manufactured products from the associated enterprise and goes on selling them to third-party customers.",
      "The taxpayer may incur restructuring costs as a result, but it also stands to save on its future purchases compared with its own manufacturing costs."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The taxpayer restructures of its own accord, accepting the restructuring costs in return for the savings it anticipates. Assume that the benefits it anticipates are greater than its restructuring costs.",
        question: "Would independent parties require the associated enterprise, as transferee, to compensate the taxpayer?",
        mcq: [
          "Not necessarily: explicit compensation from the transferee may be dispensed with, for instance if the transferor's anticipated benefits exceed its restructuring costs.",
          "Generally yes: because the transferee gains the manufacturing activity, it would normally be expected to meet the transferor's restructuring costs, expected savings or not.",
          "No, never: restructuring costs always stay with the entity that incurs them, whatever that entity and the transferee each expect to gain from the arrangement."
        ],
        correctIdx: 0,
        analysis:
          "The Guidelines describe a party that voluntarily decides to restructure and to bear the related costs in exchange for anticipated savings. Here the taxpayer may incur restructuring costs, but the outsourcing also makes it possible for it to procure the products at a saving compared with its own manufacturing costs. Independent parties setting up this kind of outsourcing might not necessarily insist on explicit compensation from the transferee; the Guidelines give the example of a transferor whose anticipated benefits exceed its restructuring costs. This is not a rule that compensation is never due: it is an example of when it may not be required. A further issue is whether, and how, location savings are to be divided between the parties, which Section D.6 of Chapter I and Section E of Part II address.",
        verdict: "Compensation not necessarily required"
      }
    ],
    takeaway:
      "Restructuring costs borne by the transferor do not automatically call for explicit compensation from the transferee. Independent parties may not necessarily require it where a party restructures voluntarily in exchange for anticipated savings, for example where its anticipated benefits are greater than those costs.",
    crossRefs: [
      "Section E.4 of Part I (outsourcing)",
      "Section D.6 of Chapter I and Section E of Part II (allocation of location savings)"
    ]
  },

  {
    id: 14,
    theme: "compensation-for-restructuring",
    themeLabel: "Compensation for the restructuring itself",
    title: "Terminated manufacturer: who bears the indemnification?",
    group: "Entity A · Entity B · Entity C",
    refs: "Ch.IX · ¶9.93–9.97",
    origin: "oecd-example",
    atGlance:
      "Entity A terminates its manufacturing contract with entity B, an associated manufacturer, and has entity C, another associated manufacturer, carry on the work. It is established that, at arm's length, B could claim an indemnification for the detriment this causes it. Which party should ultimately bear it: A, C or another group member?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Entity A", role: "Terminates the manufacturing contract with B · turns to C" },
      second: { name: "Entity B", role: "Associated manufacturer · contract terminated · could claim an indemnification" },
      third: { name: "Entity C", role: "Another associated manufacturer · continues the manufacturing" },
      label1: "contract terminated",
      label2: "manufacturing taken over"
    },
    timeline: [
      "Entity A and entity B, two associated enterprises, have a manufacturing contract; B is the manufacturer.",
      "A terminates the contract.",
      "A chooses entity C, another associated manufacturer, to carry on the manufacturing that B used to perform.",
      "It is established, on the guidance in Section F, that at arm's length and on the facts of the case B could claim an indemnification for the detriment the termination causes it."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "B's claim to an indemnification is taken as established in this example; the Guidelines recall that it cannot be presumed for every termination. A terminated the contract, C takes over the manufacturing, and other members of the MNE group may also benefit from the restructuring.",
        question: "Which party should, in the end, bear the cost of indemnifying B?",
        mcq: [
          "There is no single answer: depending on the facts it may be A, C, both of them or another group member that benefits from the restructuring.",
          "Normally A, as the party that chose to terminate; C or another group member would generally contribute only if contractually bound to do so.",
          "C in every case, because it takes over the manufacturing and will earn the profits that B would otherwise have continued to make."
        ],
        correctIdx: 0,
        analysis:
          "No single answer holds for every case: the response rests on the facts and circumstances (¶9.93), and the Guidelines go on to describe situations that can arise. A might be willing to bear the cost at arm's length, for instance if it expects cost savings from its new manufacturing agreement with C whose present value is greater than the indemnification (¶9.95). C might be prepared to pay an up-front fee to get the manufacturing contract rights from A if the present value of its expected profits makes the investment worthwhile; that payment might go to A, or take the form of C settling what A owes B (a constructive payment to A), and C might also pay B, for example for the transfer of certain rights that B had (¶9.96). A and C might be willing to share the cost, and where the benefits of the restructuring accrue to another group member, that member may bear it, directly or indirectly (¶9.97). The analysis starts from accurate delineation of the actual transactions that make up the restructuring, including economically related transactions with other group enterprises.",
        verdict: "No single answer"
      }
    ],
    takeaway:
      "The party that terminates a contract is not automatically the party that bears the indemnification: the terminating party, the party taking over the activity, both of them or another group member may bear it at arm's length. Which of them does depends on the facts and circumstances, in particular the parties' rights and other assets, the risks they assume, the economic rationale for the termination, who is expected to benefit from it and the options realistically available to them (¶9.93).",
    crossRefs: [
      "Section F.3 of Part I (which party should ultimately bear the costs of the indemnification)",
      "¶9.78 (no presumption of a right to indemnification; see Example 5)",
      "¶1.36–1.38 (delineating the controlled transaction, including economically related transactions)"
    ]
  },

  {
    id: 15,
    theme: "post-restructuring",
    themeLabel: "Post-restructuring TP & location savings",
    title: "Brand ownership moved to a newly set up affiliate",
    group: "Company A · Company Z",
    refs: "Ch.IX · ¶9.122–9.124",
    origin: "oecd-example",
    atGlance:
      "Company A owns an MNE's brand intangibles, and 125 employees at its head office run the worldwide marketing strategy. A newly set up affiliate, Company Z, then acquires legal ownership of the intangibles for a lump sum; A is paid on a cost plus basis from then on and the remaining profits go to Z. What is the arrangement in substance?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Country A · head office with 125 marketing-strategy employees · cost plus after the restructuring" },
      right: { name: "Company Z", role: "Country Z · newly set up · managed by a local trust company · receives the remaining profits" },
      arrowLabel: "legal ownership of the brand intangibles",
      note: "Affiliates manufacture the products under contract for Company A and affiliates distribute them; their remuneration stays the same after the restructuring."
    },
    timeline: [
      "An MNE's products owe their value to consumer recognition of the brand, not to their technical features. Company A in Country A owns the trademarks, trade names and other intangibles represented by the brand and assumes the risks of their ownership, development and exploitation.",
      "Developing, maintaining and executing a worldwide marketing strategy are the MNE's main value drivers. This work is done by 125 employees at Company A's head office, which also provides central services to group affiliates.",
      "Affiliates manufacture the products under contract for Company A, and affiliates that buy them from Company A distribute them. What Company A has left after their arm's-length remuneration is regarded as rewarding its intangibles, marketing activities and central services.",
      "Company A then transfers legal ownership of the brand intangibles to Company Z, an affiliate newly set up in Country Z, and receives a lump sum payment in return.",
      "From then on, Company A's services to Company Z and to the rest of the group are paid for on a cost plus basis. Nothing changes in the remuneration of the contract manufacturers and distributors, and Company Z receives the profits that remain."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "A local trust company manages Company Z. Company Z has no employees or directors with the capability to perform control functions over the risks of owning or strategically developing the brand intangibles, it does not in fact perform such functions, and it lacks the financial capacity to assume those risks. The same Company A employees still develop, maintain and execute the marketing strategy, and once a year senior Company A officials travel to Country Z to formally validate strategic decisions prepared by the head office in Country A; both activities are remunerated at cost plus.",
        question: "What may accurate delineation show the post-restructuring arrangement to be?",
        mcq: [
          "In substance a funding arrangement between Company A and Company Z, and not a restructuring that centralises intangible management.",
          "A genuine transfer under which Company Z, as the legal owner that paid a lump sum, is entitled to the remaining profits from the brand.",
          "A service arrangement in which Company A is properly paid at cost plus, since the strategic decisions are formally validated in Country Z."
        ],
        correctIdx: 0,
        analysis:
          "On these findings Company A's functions and risks are the same after the restructuring as before: it has the capability to perform control functions over the risk of exploiting the intangibles and actually performs them, and it still develops, maintains and executes the worldwide marketing strategy. Company Z, by contrast, is not capable of performing control functions and does not perform the ones needed to assume the intangible-related risks. Accurate delineation may therefore show that what the parties have is in substance a funding arrangement between Company A and Company Z, not a restructuring that centralises intangible management. The commercial rationality of the transaction may also need to be assessed under Section D.2 of Chapter I, on the full facts and circumstances. Both steps are put as possibilities (\"may\"), and the example does not say what return either company should earn.",
        verdict: "May be a funding arrangement"
      }
    ],
    takeaway:
      "After a restructuring, what each party earns should match the functions it actually performs, the assets it uses and the risks it assumes (¶9.121); a transfer of legal ownership does not settle it. Where the transferor carries on exactly as before and the transferee can neither control nor financially bear the risks, the arrangement may in substance be a funding arrangement.",
    crossRefs: [
      "Section D of Part II (comparing the pre- and post-restructuring situations); ¶9.121 states the principle this example illustrates",
      "Section D.2 of Chapter I (recognition of the accurately delineated transaction; commercial rationality)",
      "¶6.23 (meaning of the term \"brand\")"
    ]
  },

  {
    id: 16,
    theme: "post-restructuring",
    themeLabel: "Post-restructuring TP & location savings",
    title: "Location savings in subcontracted engineering services",
    group: "Company X · Company Y",
    refs: "Ch.IX · ¶9.130–9.131",
    origin: "oecd-example",
    atGlance:
      "An enterprise in Country X, where engineers' wages are high, subcontracts much of its engineering work to a new Country Y subsidiary, which hires equally qualified engineers for substantially lower wages. Competitive pressures later force its hourly rate down, passing part of the savings on to clients. Which party should be attributed the rest?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Company Y", role: "New subsidiary in Country Y · equally qualified engineers at substantially lower wages" },
      second: { name: "Company X", role: "Enterprise in Country X · well known · deals directly with the clients" },
      third: { name: "Independent clients", role: "Charged an hourly rate · not necessarily aware of the subcontracting" },
      label1: "subcontracted engineering work",
      label2: "engineering services"
    },
    timeline: [
      "Company X, an enterprise in Country X where wages for qualified engineers are high, provides highly specialised, high-quality engineering services to independent clients at a fixed hourly rate comparable to what competitors charge for similar services in the same market.",
      "A large part of Company X's engineering work is then subcontracted to Company Y, a new subsidiary in Country Y, which hires equally qualified engineers for substantially lower wages; significant location savings arise for the group.",
      "The clients still deal directly with Company X; they do not necessarily know about the subcontracting. For a while, Company X is able to keep its hourly rate at the original level.",
      "Competitive pressures then force Company X to lower its hourly rate to a level that would not cover the wages of qualified engineers in Country X but still yields a benefit when the engineers are in Country Y. Clients thereby receive part of the location savings."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Demand for this type of engineering service is high. Company Y is the only company in a lower-cost location able to provide the services to the required quality standard, and its established technical know-how is a barrier to competition that lets it withstand competitive pricing pressures. Company X cannot engage qualified engineers in Country X for this work, because their wages would cost too much relative to the hourly rate charged to clients.",
        question: "Who should be attributed the location savings that stay within the group?",
        mcq: [
          "Company Y's remuneration should take into account the location savings it created, as well as the value of its services, any intangibles used in them included.",
          "Company X should keep them, because a subcontractor earns only a routine return set from local comparables and X holds the clients and the reputation.",
          "Company Y should receive all of them automatically, because location savings always belong to the entity in the country where the lower costs arise."
        ],
        correctIdx: 0,
        analysis:
          "The answer depends on the functions, risks and assets of the parties and on the options realistically available to each of them. On the assumed facts Company X does not have many options other than using Company Y: Y is the only provider in a lower-cost location that meets the quality standard, its technical know-how is a barrier to competition, and engineers in Country X would cost too much for the hourly rate charged to clients. The Guidelines conclude that the location savings Company Y created should be taken into account in what Company X pays it, on top of the value of Y's services, which includes any intangibles used to provide them. They do not say in what proportions the savings are to be shared, and they add that in some instances the contributions of the two companies may meet the criteria for using a transactional profit split method.",
        verdict: "Savings factored into Y's remuneration"
      }
    ],
    takeaway:
      "Attributing location savings means looking at each party's functions, risks and assets and at the options realistically available to it. Where the enterprise that subcontracts the work has few alternatives to a lower-cost service provider with established know-how, the provider's remuneration should take into account the location savings it creates.",
    crossRefs: [
      "Section E of Part II (location savings)",
      "Section D.6 of Chapter I (location savings and other local market features)",
      "Example 8 (the clothing example of ¶9.128–9.129)"
    ]
  },

  {
    id: 17,
    theme: "post-restructuring",
    themeLabel: "Post-restructuring TP & location savings",
    title: "An acquired enterprise's earlier dealings with the group",
    group: "MNE group · acquired enterprise",
    refs: "Ch.IX · ¶9.110",
    origin: "oecd-example",
    atGlance:
      "An enterprise that used to deal with an MNE group as an independent party is acquired, so its transactions with the group are now controlled. After the acquisition those transactions are restructured. Can the conditions agreed before the acquisition help to price the controlled transactions after it?",
    parties: {
      kind: "tested-party",
      left: { name: "Acquired enterprise", role: "Formerly an independent counterparty of the MNE group · now an associated enterprise" },
      right: { name: "MNE group", role: "Deals with the enterprise before and after the acquisition" },
      arrowLabel: "transactions: uncontrolled before, controlled after",
      note: "The Guidelines do not say what the transactions are or in which direction they run."
    },
    timeline: [
      "An enterprise deals with an MNE group as an independent party.",
      "The enterprise is acquired; its transactions with the group are now controlled transactions.",
      "After the acquisition, those now controlled transactions are restructured."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Before the acquisition the two sides dealt with each other as independent parties, so those earlier transactions were uncontrolled. They took place at a different time from the controlled transactions now to be priced. Suppose the restructuring has also changed the conditions, so that, for instance, the bad debt risk is now assumed by a different party.",
        question: "Can the pre-acquisition transactions be used to price the controlled transactions after the acquisition?",
        mcq: [
          "Possibly: after a review of the five comparability factors and the timing difference they might provide a CUP, adjusted, where the facts allow, for what the restructuring changed.",
          "Generally yes: the counterparties are unchanged, so the earlier conditions can normally be carried over as a CUP without reviewing comparability or the difference in timing.",
          "No: before-and-after comparisons are irrelevant under the arm's-length principle, so transactions from before a restructuring can never serve as comparables."
        ],
        correctIdx: 0,
        analysis:
          "The Guidelines offer this as a case in which the CUP method could possibly be applied. Because the enterprise dealt with the group independently before it was acquired, the conditions of those uncontrolled transactions might provide a CUP for the controlled transactions that follow, but only after the five economically relevant characteristics (the comparability factors) have been reviewed, together with the possible effect of the two sets of transactions taking place at different times. Where the restructuring has changed the conditions, an adjustment for the functions, assets and/or risks transferred might still be feasible if the facts and circumstances allow it; the paragraph's own illustration is a comparability adjustment to reflect that the bad debt risk is assumed by a different party. The objection to before-and-after comparisons in ¶9.118 concerns earlier controlled transactions; here the earlier transactions were uncontrolled (¶9.125). Every step is put as a possibility: ¶9.110 does not say that the earlier transactions will in fact be reliable comparables.",
        verdict: "Possible CUP, subject to review"
      }
    ],
    takeaway:
      "When a former independent counterparty is acquired, its earlier dealings with the group were uncontrolled and may offer a comparable for the controlled transactions that follow. They are a candidate, not a given: the comparability factors and the effect of the difference in timing have to be reviewed, and it may be possible, depending on the facts, to adjust for what the restructuring changed.",
    crossRefs: [
      "Section B of Part II (selecting and applying a method for the post-restructuring controlled transactions)",
      "¶9.125 (refers back to this example: before-and-after comparisons can be made where the earlier transactions were not controlled and adjustments can reliably be made; whether they are reliable comparables is evaluated under ¶3.2)"
    ]
  }

];
