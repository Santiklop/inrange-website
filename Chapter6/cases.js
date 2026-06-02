// Single source of truth for the Chapter VI case content rendered on the page.
// Each case mirrors the shape used by Chapter VII (see ../src/cases.js).
//
// Theme codes (used for sidebar grouping):
//   ownership            → Legal vs. economic ownership
//   dempe                → DEMPE attribution
//   funding-return       → Funding contributions & risk
//   marketing-intangibles → Marketing intangibles
//   conduct-vs-contract  → Conduct overrides contract
//   transfers            → Transfers of intangibles & services with IP
//   valuation            → Valuation techniques
//   htv                  → Hard-to-value intangibles (Annex II)

globalThis.CASES = [

  /* ===================================================================
     OWNERSHIP — LEGAL VS. ECONOMIC (Examples 1, 2, 3, 4, 5)
     =================================================================== */

  {
    id: 1,
    theme: "ownership",
    themeLabel: "Legal vs. economic ownership",
    title: "Patent assignment to a low-functionality affiliate",
    group: "Premiere group",
    refs: "Annex I · Example 1 · ¶1–4",
    atGlance:
      "Premiere does all the R&D, but assigns each resulting patent to Company S — three lawyers, no R&D capability — for a nominal EUR 100. Company S immediately grants Premiere a perpetual, royalty-free, exclusive licence back. What is the real transaction, and how should it be priced?",
    parties: {
      kind: "tested-party",
      left: { name: "Premiere", role: "Parent · funds and performs all R&D · controls licensing" },
      right: { name: "Company S", role: "Patent admin only · 3 lawyers · no R&D" },
      arrowLabel: "nominal assignment ↑ · exclusive licence back ↓"
    },
    timeline: [
      "Premiere funds and performs ongoing R&D in support of its business.",
      "When R&D produces a patentable invention, rights are assigned to Company S for a nominal EUR 100.",
      "As a condition of the assignment, Company S grants Premiere a perpetual, royalty-free, exclusive licence with sub-licence rights.",
      "Company S registers and maintains the patents but does not control or fund R&D; key decisions sit with Premiere management."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Premiere performs all DEMPE functions, contributes the assets, and assumes the risks. Company S's three lawyers do patent administration; they do not control or share in the R&D risk.",
        question: "How should the arrangement be characterised and priced?",
        mcq: [
          "Delineate the nominal assignment plus licence-back together as a patent administration service from Company S to Premiere; Premiere retains the balance of intangible returns.",
          "Respect the legal form — Company S owns the patents and is entitled to the licensing returns once those exist.",
          "Split the residual returns equally between Premiere and Company S because both contribute to the patent."
        ],
        correctIdx: 0,
        analysis:
          "Looking at the actual conduct, the assignment plus the simultaneous licence-back in substance form a patent administration service arrangement. An arm's-length fee is determined for those administration services; Premiere — which performs all DEMPE functions, uses the assets and bears the risks — retains the bulk of the returns from exploiting the patents.",
        verdict: "Patent admin service"
      }
    ],
    takeaway:
      "Legal title to an intangible does not, by itself, entitle a party to the returns from it. Where the title-holder performs only administration, delineate the actual transaction as a service and leave the residual with the party doing the DEMPE.",
    crossRefs: [
      "Section B (legal ownership)",
      "Examples 2, 3 (same fact pattern, different exit paths)"
    ]
  },

  {
    id: 2,
    theme: "ownership",
    themeLabel: "Legal vs. economic ownership",
    title: "Company S licenses the patents to third parties",
    group: "Premiere group",
    refs: "Annex I · Example 2 · ¶5–7",
    atGlance:
      "Same setup as Example 1, but now Company S — still just three patent lawyers — actually licenses the patents to associated and independent enterprises at arm's-length royalties. Does the royalty income belong to Company S?",
    parties: {
      kind: "tested-party",
      left: { name: "Premiere", role: "Parent · performs and controls all DEMPE" },
      right: { name: "Company S", role: "Patent registrant · licenses patents under Premiere's direction" },
      arrowLabel: "royalty income →"
    },
    timeline: [
      "Premiere performs all R&D and controls the licensing strategy.",
      "Company S, the registered patent owner, licenses patents to associated and independent enterprises under Premiere's direction.",
      "Royalties flow to Company S; its three employees do not control or participate in the licensing decisions."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company S is the legal owner but its contributions are limited to registering and maintaining the patents. Premiere performs all DEMPE.",
        question: "How should Company S be remunerated?",
        mcq: [
          "Only for its patent registration functions; the bulk of the royalty income belongs to Premiere.",
          "It keeps the royalties — third-party rates are arm's-length and Company S is the legal owner.",
          "Split the royalties between Premiere and Company S based on relative headcount."
        ],
        correctIdx: 0,
        analysis:
          "Based on the functions performed, assets used and risks assumed, Company S is entitled only to compensation for its patent registration functions and should not retain income above an arm's-length fee for those services. The true nature of the arrangement is a patent administration service contract; the amount Company S pays Premiere for the assignments should leave it with that arm's-length return only.",
        verdict: "Patent admin only"
      }
    ],
    takeaway:
      "Real licensing income does not automatically belong to the registered owner. Where the owner does not perform or control DEMPE, the arm's-length result strips out a service-level return and reallocates the rest to the DEMPE party.",
    crossRefs: [
      "Example 1 (perpetual licence back)",
      "Example 3 (sale to a third party)"
    ]
  },

  {
    id: 3,
    theme: "ownership",
    themeLabel: "Legal vs. economic ownership",
    title: "Sale of patents after a period of licensing",
    group: "Premiere group",
    refs: "Annex I · Example 3 · ¶8–9",
    atGlance:
      "Facts as in Example 2. After a few years of licensing, Company S sells the patents to an independent buyer for a price reflecting appreciation since acquisition. Who gets the disposal proceeds?",
    parties: {
      kind: "tested-party",
      left: { name: "Premiere", role: "Performs and controls DEMPE throughout" },
      right: { name: "Company S", role: "Registered owner · sells under Premiere's direction" },
      arrowLabel: "disposal proceeds →"
    },
    timeline: [
      "Company S licenses the patents to associated and independent enterprises for several years.",
      "Acting under Premiere's direction, Company S sells the patents to an independent buyer.",
      "The sale price reflects appreciation in value during the licensing period."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company S's role throughout has been confined to patent registration. The decision to sell, and the structuring of the sale, are controlled by Premiere.",
        question: "Is Company S entitled to share in the disposal gain?",
        mcq: [
          "No — Company S earns only a registration-services return; the appreciation belongs to Premiere as the DEMPE party.",
          "Yes — Company S is the legal owner that contracts the sale, so disposal gains accrue to it.",
          "Yes, but only the portion accruing during the years Company S formally held title."
        ],
        correctIdx: 0,
        analysis:
          "Company S's income should be the same as in Example 2 — compensation for its registration functions. It should not share in returns from exploitation of the intangibles, including returns generated from their disposition. Premiere, which controls DEMPE, captures the appreciation.",
        verdict: "Patent admin only"
      }
    ],
    takeaway:
      "Disposal gains follow the DEMPE party, not the title-holder. Registration plus contractual signing authority does not, by itself, generate a residual return.",
    crossRefs: [
      "Examples 1, 2 (related fact pattern)",
      "Examples 4, 5 (compare: where Company S has substance)"
    ]
  },

  {
    id: 4,
    theme: "ownership",
    themeLabel: "Legal vs. economic ownership",
    title: "When the affiliate has real substance",
    group: "Premiere group",
    refs: "Annex I · Example 4 · ¶10–12",
    atGlance:
      "Same R&D backdrop as Example 3 — but now Company S has employees who actually decide to take on the patents, run the licensing programme and monitor licensees. The price Company S paid was arm's-length. The patents then appreciate due to unforeseen events and Company S sells them at a gain. Who keeps the gain?",
    parties: {
      kind: "tested-party",
      left: { name: "Premiere", role: "Develops patents · transfers to Company S at arm's-length price" },
      right: { name: "Company S", role: "Active decision-makers · runs licensing programme · manages disposal" },
      arrowLabel: "patent rights · arm's-length price ↑"
    },
    timeline: [
      "Premiere develops the patents and transfers them to Company S for an arm's-length price reflecting the parties' expectations at the time.",
      "Company S's own employees decide to take on the portfolio and run the licensing programme.",
      "Company S licenses the patents for several years.",
      "External circumstances unforeseen at the date of transfer push the patents' value up significantly.",
      "Company S decides, negotiates, and executes the sale of the patents to an unrelated buyer at a gain."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company S has the functions, assets and risk-control capabilities of a real owner of the portfolio. The HtV approach is assumed not to apply.",
        question: "Who is entitled to the disposal gain?",
        mcq: [
          "Company S — it controls the licensing and disposal decisions and bears the related risks.",
          "Premiere — it developed the patents, so the upside on disposition reverts to it.",
          "Split based on relative time of ownership in years."
        ],
        correctIdx: 0,
        analysis:
          "Company S has people who actually take and execute the licensing and disposal decisions, monitor licensees, and manage the disposition. Under these circumstances, Company S is entitled to retain the proceeds of the sale, including amounts attributable to appreciation resulting from the unanticipated external circumstances.",
        verdict: "Company S retains gain"
      }
    ],
    takeaway:
      "When the legal owner also has the people, decision-making and risk-control capability of an owner, it is entitled to the corresponding returns — including unanticipated upside. Substance unlocks ownership economics.",
    crossRefs: [
      "Examples 1–3 (no substance at the title-holder)",
      "Example 5 (downside variant)"
    ]
  },

  {
    id: 5,
    theme: "ownership",
    themeLabel: "Legal vs. economic ownership",
    title: "Same substance, but the value falls",
    group: "Premiere group",
    refs: "Annex I · Example 5 · ¶13",
    atGlance:
      "Same setup as Example 4 — Company S has real decision-making capability — but the patents lose value during its ownership because of unanticipated external circumstances. Who takes the loss?",
    parties: {
      kind: "tested-party",
      left: { name: "Premiere", role: "Developer · sold patents at arm's-length price" },
      right: { name: "Company S", role: "Active owner · runs the portfolio · sells at a loss" },
      arrowLabel: "disposal proceeds (lower than purchase)"
    },
    timeline: [
      "Premiere develops the patents and sells them to Company S at an arm's-length price.",
      "Company S runs the licensing programme using its own decision-making.",
      "External circumstances unanticipated at the time of transfer push the value down.",
      "Company S sells the patents at a loss."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company S decides, negotiates and executes the sale. The downward move was not foreseeable at the time the patents were acquired.",
        question: "Who bears the loss on disposal?",
        mcq: [
          "Company S — it has the substance to be the owner, so it takes the downside as well as the upside.",
          "Premiere — losses on an intangible should flow back to the original developer.",
          "Split the loss based on Company S's ownership period."
        ],
        correctIdx: 0,
        analysis:
          "Company S is entitled to retain the proceeds of the sale, meaning that it will suffer the loss. The same substance that would have entitled it to upside (Example 4) carries the downside here.",
        verdict: "Company S takes loss"
      }
    ],
    takeaway:
      "Ownership is symmetric: substance that captures unexpected gains also bears unexpected losses. Risk allocation is judged ex ante and held to the entity that actually controls it.",
    crossRefs: [
      "Example 4 (upside mirror image)"
    ]
  },

  /* ===================================================================
     FUNDING RETURN — PURE FUNDERS, RISK-FREE / RISK-ADJUSTED (Examples 6, 16, 17)
     =================================================================== */

  {
    id: 6,
    theme: "funding-return",
    themeLabel: "Funding contributions & risk",
    title: "Cash-box funder of intangible development",
    group: null,
    refs: "Annex I · Example 6 · ¶14–15",
    atGlance:
      "Company A funds a five-year intangible development programme run entirely by Company B. Company A becomes the legal owner and expects USD 200m/year of residual profit. The Country B tax administration sees only a funder. What is Company A actually entitled to?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Funder · legal owner · controls financial risk" },
      right: { name: "Company B", role: "Performs and controls all DEMPE · existing IP and R&D track record" },
      arrowLabel: "USD 100m/yr funding ↑ · contingent payments ↓"
    },
    timeline: [
      "Year 1: Companies A and B decide to develop an intangible building on Company B's track record.",
      "Five-year development phase; Company A funds USD 100m/yr; Company B performs and controls all DEMPE.",
      "Once developed, the intangible is expected to earn USD 550m/yr for ten years.",
      "Under the agreement, Company B licenses the intangible from Company A; contingent payments are calibrated to leave Company B with USD 200m/yr and Company A with USD 350m/yr.",
      "On audit, the Country B authority delineates the actual transaction."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Functional analysis shows Company A's only contribution is funding. It contractually assumes the financial risk, has the financial capacity to assume it, and exercises control over that risk in accordance with paragraphs 6.63–6.64. Company B performs and controls all DEMPE.",
        question: "What is Company A entitled to?",
        mcq: [
          "A risk-adjusted return on its funding commitment — illustratively USD 110m/yr (11%); Company B keeps the residual USD 440m/yr.",
          "The full USD 350m/yr it bargained for as legal owner of the intangible.",
          "Only a risk-free return because it does no DEMPE — even though it controls financial risk."
        ],
        correctIdx: 0,
        analysis:
          "Company A's contribution is solely funding. Taking into account its contributions and the realistic alternatives, Company A's anticipated remuneration is a risk-adjusted return on its funding commitment — illustratively USD 110m/yr, an 11% return. Company B is entitled to all remaining anticipated income, USD 440m/yr, rather than USD 200m as claimed. The taxpayer had incorrectly chosen Company B, not Company A, as the tested party.",
        verdict: "Risk-adjusted funding return"
      }
    ],
    takeaway:
      "A funder who controls financial risk earns a risk-adjusted financial return — not the full residual that legal ownership might suggest. The DEMPE-performing party keeps the rest.",
    crossRefs: [
      "Section B.2.1 (funding and control of financial risk)",
      "Example 16 (no control of risk → risk-free return)"
    ]
  },

  {
    id: 16,
    theme: "funding-return",
    themeLabel: "Funding contributions & risk",
    title: "Funder without control — risk-free only",
    group: "Shuyona group",
    refs: "Annex I · Example 16 · ¶54–58",
    atGlance:
      "Shuyona sells all its IP to a new Country Z subsidiary, Company T. Company T becomes the contract manufacturer and signs contract-research agreements with Shuyona and Company S — but it has no technical staff, no ability to manage R&D, and no control over R&D risk. What return does Company T get?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Shuyona", role: "Parent · designs and controls R&D programme" },
      second: { name: "Company T", role: "Buyer of IP · manufacturer · no R&D capability" },
      third: { name: "Company S", role: "Subsidiary R&D centre · supervised by Shuyona" },
      label1: "IP sale + contract R&D",
      label2: "directed R&D"
    },
    timeline: [
      "Shuyona sells all technology-related patents and intangibles, including rights for ongoing research, to Company T in Country Z.",
      "Company T establishes a manufacturing plant in Country Z and supplies products to the group.",
      "Company T signs contract-research agreements with Shuyona and Company S, contractually bearing financial risk and paying cost-plus.",
      "Shuyona continues to design and supervise all R&D; Company T has no technical personnel.",
      "Company T contractually assumes the financial risk and has the financial capacity to do so, but does not exercise control over that risk."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "All DEMPE and risk-management activities are performed by Shuyona and Company S; Shuyona controls the risks. Company T has the financial capacity to bear financial risk but does not control it.",
        question: "What return is Company T entitled to?",
        mcq: [
          "A manufacturing reward plus a risk-free return for its funding — it does not control the financial risk.",
          "A risk-adjusted return on its funding plus a manufacturing reward.",
          "The full residual from exploiting the intangibles, because it bought them and is the legal owner."
        ],
        correctIdx: 0,
        analysis:
          "The transaction should be accurately delineated as the provision of financing by Company T equating to the costs of the acquired intangibles and the ongoing development. Because Company T does not exercise control over the financial risk in accordance with paragraphs 6.63–6.64, it is entitled — in addition to its manufacturing reward — to no more than a risk-free return for its funding activities.",
        verdict: "Risk-free funding return"
      }
    ],
    takeaway:
      "Contractual risk-bearing plus financial capacity is not enough. Without the capacity to exercise control over the financial risk, a funder gets only a risk-free return — not the upside that legal ownership might imply.",
    crossRefs: [
      "Section B.2.1 (funding and risk control)",
      "Example 6 (with control → risk-adjusted return)",
      "Example 17 (financing-return variant)"
    ]
  },

  {
    id: 17,
    theme: "funding-return",
    themeLabel: "Funding contributions & risk",
    title: "Pharma transfer to an affiliate without research capability",
    group: null,
    refs: "Annex I · Example 17 · ¶59–63",
    atGlance:
      "Company A transfers Product M (a candidate Alzheimer's compound) and the related intangibles to Company S. Company S has no R&D capability and immediately contracts the research back to Company A, paying cost-plus margins based on independent CROs. Are those CRO margins really the right benchmark?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Integrated pharma · runs R&D · controls Product M risks" },
      right: { name: "Company S", role: "Legal owner of Product M IP · no technical staff" },
      arrowLabel: "IP rights ← · contract-research fee →"
    },
    timeline: [
      "Company A is an integrated pharma that regularly hires independent CROs for clinical trials under its own active supervision.",
      "Company A transfers Product M patents and related intangibles to Company S; price is based on projected cash flows.",
      "Company S has no technical personnel; it contracts the research back to Company A.",
      "Company S agrees to fund the research and assume financial risk, paying Company A cost-plus margins benchmarked to independent CROs."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company A continues to perform and control DEMPE; Company S lacks the capability to control research-related risks.",
        question: "Are the CRO comparables an appropriate benchmark for Company A's services to Company S?",
        mcq: [
          "No — Company A controls research risks (unlike the CROs); accurately delineated, the transaction is the provision of financing by Company S — entitled at most to a financing return.",
          "Yes — Company A provides research services, so independent CRO margins are an appropriate benchmark.",
          "Yes, with an upward adjustment of the CRO mark-up to reflect Company A's complexity."
        ],
        correctIdx: 0,
        analysis:
          "Company A continues to perform and control functions and to manage risks related to the Product M intangibles, including the important functions in paragraph 6.56. The CRO arrangements are not comparable because the CROs do not have ongoing interests or control over research risk. On a thorough examination, the transaction should be delineated as the provision of financing by Company S; Company S is entitled to a financing return whose level depends on its control over financing risk. Company A is entitled to the remaining income or losses.",
        verdict: "Financing return only"
      }
    ],
    takeaway:
      "A label of 'contract research' does not unlock CRO-level pricing. Where the funder cannot control research risk, the substance is financing — and the financing return goes with the financing risk it actually controls.",
    crossRefs: [
      "Paragraph 6.56 (important functions)",
      "Example 16 (parallel financing-return analysis)",
      "Example 14 (true contract R&D, with control retained at the parent)"
    ]
  },

  /* ===================================================================
     DEMPE — ATTRIBUTION OF FUNCTIONS, ASSETS, RISKS (Examples 7, 14, 15, 21)
     =================================================================== */

  {
    id: 7,
    theme: "dempe",
    themeLabel: "DEMPE attribution",
    title: "Conduct contradicts the contract — recall risk",
    group: "Primero · pharma",
    refs: "Annex I · Example 7 · ¶16–19",
    atGlance:
      "Primero contracts Company S as a limited-risk distributor for Product X and reserves all product-liability and recall risk. Three years in, the product is recalled — and Company S, not Primero, ends up bearing the recall costs. Which side is the inconsistency on?",
    parties: {
      kind: "tested-party",
      left: { name: "Primero", role: "Parent · owns Product X IP · contracted to bear recall risk" },
      right: { name: "Company S", role: "Limited-risk distributor in Europe & Middle East" },
      arrowLabel: "Product X · agreed limited-risk distribution"
    },
    timeline: [
      "Primero develops and patents Product X and registers its IP worldwide.",
      "Primero appoints Company S as a limited-risk distributor for Europe and the Middle East.",
      "Contract: Primero retains product-recall and product-liability risk; Company S earns a limited-risk return.",
      "Three years in, serious side effects emerge and Primero recalls the product.",
      "Company S incurs substantial recall costs; Primero does not reimburse them or product-liability claims."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The contractual risk allocation puts recall risk on Primero. The actual course of conduct loaded the recall costs onto Company S, while Primero continues to claim the residual return from exploiting the Product X intangibles.",
        question: "What is the appropriate adjustment?",
        mcq: [
          "Reallocate the recall and product-liability costs from Company S to Primero — the conduct should match the limited-risk distribution arrangement Primero asserts.",
          "Leave the costs with Company S — the conduct shows it has actually accepted recall risk.",
          "Split the costs based on which entity benefited more from the product."
        ],
        correctIdx: 0,
        analysis:
          "There is an inconsistency between Primero's asserted entitlement to intangible returns and its failure to bear the associated risk costs. If the true relationship is a limited-risk distribution, the appropriate adjustment is to allocate the recall and product-liability costs from Company S to Primero. Less plausibly, if conduct shows Company S in fact controls the relevant risks, its distribution margins for all years could be increased.",
        verdict: "Reallocate recall costs"
      }
    ],
    takeaway:
      "Asserting risk in the contract and dodging it in practice is not arm's-length. Conduct is the test: if the principal claims the residual, it must absorb the downside.",
    crossRefs: [
      "Chapter I · Section D.1",
      "Section B.2.4 (risk control)"
    ]
  },

  {
    id: 14,
    theme: "dempe",
    themeLabel: "DEMPE attribution",
    title: "Contract R&D — parent controls",
    group: "Shuyona group",
    refs: "Annex I · Example 14 · ¶46–48",
    atGlance:
      "Shuyona's R&D centre designs the group research programme, sets budgets, picks where R&D happens and monitors progress. Company S runs the work it is asked to run — and reports back monthly. Shuyona registers the resulting patents. Is Shuyona entitled to the intangible returns?",
    parties: {
      kind: "tested-party",
      left: { name: "Shuyona", role: "Parent R&D centre · designs programme · controls budgets and risk" },
      right: { name: "Company S", role: "Project-by-project R&D under Shuyona's direction" },
      arrowLabel: "directed R&D services · cost-plus fee →"
    },
    timeline: [
      "Shuyona's R&D centre designs the group's overall research programme.",
      "Company S R&D centre executes specific projects assigned by Shuyona; suggestions are formally approved by Shuyona.",
      "Company S reports at least monthly; budget over-runs require Shuyona R&D management approval.",
      "Contracts state Shuyona bears all R&D risks and costs; patents are registered by Shuyona.",
      "Shuyona pays Company S a service fee."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Shuyona is the legal owner, controls and manages both its own and Company S's R&D, and performs the important functions of budgeting, programme design, funding and expenditure control.",
        question: "How should each party be remunerated?",
        mcq: [
          "Shuyona keeps the returns from exploiting the intangibles; Company S earns an arm's-length R&D service fee reflecting its skill and efficiency.",
          "Profit-split: both parties contribute to the R&D outcomes and the IP arises from both.",
          "Company S is entitled to the intangible returns because the inventions are made on its premises by its people."
        ],
        correctIdx: 0,
        analysis:
          "Shuyona is entitled to returns derived from exploiting the intangibles developed through the R&D of Company S. Company S is entitled to compensation for its functions performed, assets used, and risks assumed. Adjustments to reach a comparable R&D-service provider rate relate to the years services are provided and do not affect Shuyona's future intangible returns.",
        verdict: "Cost-plus / service fee"
      }
    ],
    takeaway:
      "Where the parent designs, funds, monitors and controls R&D, the affiliate is a service provider — not a co-owner of the IP. Returns from the intangible follow the party that performs and controls the important functions.",
    crossRefs: [
      "Paragraph 6.56 (important functions)",
      "Example 15 (autonomous variant)"
    ]
  },

  {
    id: 15,
    theme: "dempe",
    themeLabel: "DEMPE attribution",
    title: "Autonomous R&D — legal owner sidelined",
    group: "Shuyona group",
    refs: "Annex I · Example 15 · ¶49–53",
    atGlance:
      "Same group, different R&D arrangement. Company S runs Product Line B globally — including the R&D — without reporting to Shuyona's R&D centre. Patents are still registered to Shuyona, with little or no payment to Company S. Does Shuyona keep the intangible returns?",
    parties: {
      kind: "tested-party",
      left: { name: "Shuyona", role: "Parent · legal owner/registrant · runs Product Line A only" },
      right: { name: "Company S", role: "Regional HQ · runs Product Line B globally · autonomous R&D" },
      arrowLabel: "no payment / nominal payment to Company S ↑"
    },
    timeline: [
      "Shuyona runs all Product Line A R&D itself.",
      "Company S runs all Product Line B R&D and acts as global Product Line B HQ.",
      "Company S develops its own research programmes, budgets, staffing and project decisions.",
      "Patents from Company S's research are nonetheless registered by Shuyona, with no or only nominal payment to Company S.",
      "Joint meetings occur, but Company S does not report to Shuyona's R&D centre."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Shuyona is the legal owner/registrant of intangibles developed by Company S but neither performs nor controls the underlying research functions.",
        question: "Who is entitled to Product Line B intangible returns?",
        mcq: [
          "Company S — confirm legal ownership at Shuyona but route the economic returns to Company S, including by ensuring no royalty flows from Company S to Shuyona for using its own intangibles.",
          "Shuyona — as the registered owner, it should receive a royalty from Company S for the use of the Product Line B intangibles.",
          "Split the returns by reference to legal title and operational substance."
        ],
        correctIdx: 0,
        analysis:
          "Because Shuyona neither performs nor controls the research, its legal ownership does not entitle it to retain or be attributed any income related to the Product Line B intangibles. The appropriate outcome can be achieved by ensuring Company S pays no royalty to Shuyona for using successfully developed Product Line B intangibles, so the future income flows to Company S. If Shuyona were to exploit those intangibles itself, it would need to compensate Company S — and Company S would be unlikely to be the tested party.",
        verdict: "Intangible returns to Company S"
      }
    ],
    takeaway:
      "Registering a patent in the parent's name does not transport the value there. Where the affiliate performs and controls DEMPE, the economic returns must follow — even if legal title sits elsewhere.",
    crossRefs: [
      "Example 14 (mirror image)",
      "Paragraph 6.56 (important functions)"
    ]
  },

  {
    id: 21,
    theme: "dempe",
    themeLabel: "DEMPE attribution",
    title: "Super-distributor that pays without performing",
    group: "Första group",
    refs: "Annex I · Example 21 · ¶73–77",
    atGlance:
      "Första shifts title to Product Y through Company S — a new super-distributor and invoicing centre. From year 2, Company S funds the distribution affiliates' advertising; from year 3, Första cuts the prices it charges Company S on the basis that Company S now 'owns' the marketing intangibles. Has it?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Första", role: "Manufacturer · legal owner of Product Y trademark" },
      second: { name: "Company S", role: "Super-distributor · invoicing centre · funds advertising" },
      third: { name: "Distribution affiliates", role: "Receive products · run local advertising" },
      label1: "products (title flips through S) →",
      label2: "advertising reimbursement →"
    },
    timeline: [
      "Pre-year 2: Första manufactures and ships Product Y direct to distribution affiliates; trademark premium accrues to Första.",
      "Year 2: Company S is set up as super-distributor/invoicing centre. Title to product passes through Company S but goods still ship direct.",
      "Year 2: Company S reimburses distribution affiliates for part of their advertising; affiliate prices adjusted up to keep affiliate margins constant.",
      "Year 3: Första reduces the prices it charges Company S, asserting Company S now 'owns' Product Y marketing intangibles."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company S performs no advertising functions and controls no marketing risk. In substance, it does not bear advertising costs because affiliate prices are simultaneously adjusted up.",
        question: "Does Company S have a claim to marketing-intangible income?",
        mcq: [
          "No — Company S performs no functions, assumes no risk and bears no real cost; adjust Första's income upward from year 3.",
          "Yes — Company S has funded the advertising and is therefore the economic owner of the marketing intangibles.",
          "Yes, but only to a residual amount equal to its co-funded advertising spend."
        ],
        correctIdx: 0,
        analysis:
          "In substance, Company S has no claim to income from exploiting Product Y intangibles. It performs no functions, assumes no risk and in substance bears no cost related to DEMPE — the affiliate price adjustments effectively recharge the advertising cost. Transfer pricing adjustments to increase Första's income from year 3 onwards are appropriate.",
        verdict: "No DEMPE entitlement"
      }
    ],
    takeaway:
      "Funding by itself — and even less, paper-funding that is recouped through pricing adjustments — does not generate intangible ownership. DEMPE substance is the gate.",
    crossRefs: [
      "Examples 6, 16, 17 (funding-return cases)",
      "Section B.2 (DEMPE framework)"
    ]
  },

  /* ===================================================================
     MARKETING INTANGIBLES (Examples 8, 9, 10, 11, 12, 13)
     =================================================================== */

  {
    id: 8,
    theme: "marketing-intangibles",
    themeLabel: "Marketing intangibles",
    title: "Routine distributor — reimbursed marketing support",
    group: "Primair group",
    refs: "Annex I · Example 8 · ¶20–25",
    atGlance:
      "Primair owns the R trademark and trade name. To enter the unfamiliar Country Y market, it sets up Company S as distributor. Primair sets the marketing plan; Company S consults locally and helps execute. Primair reimburses marketing spend with a profit element. Does Company S earn anything more?",
    parties: {
      kind: "tested-party",
      left: { name: "Primair", role: "Brand owner · controls marketing plan and budgets" },
      right: { name: "Company S", role: "Country Y distributor · executes plan · paid service fee + reimbursements" },
      arrowLabel: "branded watches & marketing reimbursement"
    },
    timeline: [
      "Primair sells R-brand watches worldwide; the R name has no recognition in Country Y.",
      "Year 1: Primair sets up Company S in Country Y as exclusive 5-year distributor (with 5-year option).",
      "Primair develops the marketing plan and budgets; approves designs, positioning and core messages.",
      "Company S consults on local issues, executes the plan, and reports back; bears no marketing budget risk.",
      "Primair reimburses Company S's marketing spend and pays an appropriate profit element."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Watch purchase price is arm's-length and gives Company S an arm's-length distribution margin. Marketing service fee paid to Company S is at the level paid to comparable independent agents.",
        question: "Is Company S entitled to additional compensation tied to the R-brand value in Country Y?",
        mcq: [
          "No — Primair retains the income from exploiting the R name in Country Y; Company S's marketing-services fee already reflects arm's-length comparables.",
          "Yes — Company S helped build the brand in Country Y and is entitled to a marketing-intangible return.",
          "Yes — at minimum a residual profit split between Primair and Company S."
        ],
        correctIdx: 0,
        analysis:
          "Primair is entitled to retain any income from exploiting the R trademark and trade name in Country Y that exceeds the arm's-length compensation to Company S for its functions. No transfer-pricing adjustment is warranted: the watch price gives Company S an arm's-length distribution return, and the marketing-services fee is at the rate paid to comparable independent agents.",
        verdict: "No further compensation"
      }
    ],
    takeaway:
      "Where the distributor is reimbursed for marketing under tight principal control, it has done no more than a comparable agent — and earns no marketing-intangible upside.",
    crossRefs: [
      "Examples 9–13 (variants with greater distributor risk)"
    ]
  },

  {
    id: 9,
    theme: "marketing-intangibles",
    themeLabel: "Marketing intangibles",
    title: "Distributor bears the marketing risk — long-term contract",
    group: "Primair group",
    refs: "Annex I · Example 9 · ¶26–29",
    atGlance:
      "Same group as Example 8, but now Company S must develop the marketing plan, bear the marketing spend at its own risk, and look for its reward only in the distribution margin. The R brand becomes well established by end of year 2. Does Company S need extra compensation?",
    parties: {
      kind: "tested-party",
      left: { name: "Primair", role: "Brand owner · less control over execution" },
      right: { name: "Company S", role: "Long-term exclusive distributor · bears marketing costs and risks" },
      arrowLabel: "watches (lower purchase price reflects greater S risk)"
    },
    timeline: [
      "Same long-term exclusive distribution arrangement as Example 8 in Country Y.",
      "Company S now obligated to develop and execute the marketing plan with best efforts; Primair does not approve detailed plan elements.",
      "Company S bears marketing costs and risks; no direct reimbursement, no separate marketing fee.",
      "Watch purchase price is set lower than in Example 8 to reflect S's greater functions and risks.",
      "Years 1–3: Company S incurs high marketing spend; brand becomes established by year 2."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Comparability analysis identifies independent distributors with similar long-term arrangements and similar levels of marketing spend; Company S's profits track those of the comparables.",
        question: "Does Company S need additional compensation for marketing-intangible contribution?",
        mcq: [
          "No — its returns are in line with comparable independent distributors carrying the same risks; no separate compensation is required.",
          "Yes — building the brand in Country Y entitles Company S to a marketing-intangible return on top of its distribution margin.",
          "Yes — at minimum a profit-split because Company S took the marketing risk."
        ],
        correctIdx: 0,
        analysis:
          "Where the marketer/distributor bears the costs and risks of its marketing activities, the issue is the extent to which it can share in the potential benefits. Here, Company S's profits are similar to those of independent marketers/distributors in comparable long-term arrangements for similarly unknown products. The comparables are the best measure of arm's-length return; no separate or additional compensation is required.",
        verdict: "No additional compensation"
      }
    ],
    takeaway:
      "A distributor that bears genuine marketing risk shares in the upside — but the comparables already capture that. Look for additional compensation only when functions and spend exceed what comparables show.",
    crossRefs: [
      "Examples 8 (reimbursed counterpart)",
      "Examples 10, 11 (where excess spend triggers adjustment)"
    ]
  },

  {
    id: 10,
    theme: "marketing-intangibles",
    themeLabel: "Marketing intangibles",
    title: "Distributor spends far above comparables",
    group: "Primair group",
    refs: "Annex I · Example 10 · ¶30–34",
    atGlance:
      "Same long-term arrangement as Example 9, but Company S's marketing functions and spend in years 1–5 far exceed those of comparable independent distributors. Its margins end up significantly below comparables. Is the lower margin arm's-length?",
    parties: {
      kind: "tested-party",
      left: { name: "Primair", role: "Brand owner" },
      right: { name: "Company S", role: "Long-term distributor · excess marketing spend and functions" },
      arrowLabel: "watches · margin substantially below comparables"
    },
    timeline: [
      "Same long-term distribution as Example 9; Company S bears the marketing costs and risks.",
      "Years 1–5: Company S incurs marketing spend substantially in excess of comparable independents.",
      "Excess spend reflects additional or more intensive functions expected to drive higher margins or volume.",
      "Company S's profit margins are significantly lower than comparables; brand develops successfully."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company S has made a larger functional contribution to development of the market and marketing intangibles, and assumed greater costs and risks than comparable independents.",
        question: "Is a transfer pricing adjustment warranted?",
        mcq: [
          "Yes — adjust by reducing the price for the watches, applying a residual profit split, or compensating Company S directly for excess marketing spend (including a profit element).",
          "No — Company S agreed to bear the risk and the margin shortfall is its problem.",
          "Yes — increase the licence royalty from Company S to Primair to disgorge any marketing-intangible value."
        ],
        correctIdx: 0,
        analysis:
          "By performing functions and incurring marketing spend substantially in excess of comparable distributors, Company S has not been adequately compensated by the resale margins it earns. The Country Y tax administration could base an adjustment on (i) reducing the watch purchase price (RPM or TNMM), (ii) a residual profit split, or (iii) direct compensation for the excess marketing spend including an appropriate profit element.",
        verdict: "Adjustment in Company S's favour"
      }
    ],
    takeaway:
      "Excess marketing spend and functions, unmatched by margin, are evidence of an uncompensated contribution to marketing intangibles. Adjust by any of several routes — through price, residual split, or direct reimbursement-plus.",
    crossRefs: [
      "Example 9 (matched comparables → no adjustment)",
      "Example 11 (short-term contract variant)"
    ]
  },

  {
    id: 11,
    theme: "marketing-intangibles",
    themeLabel: "Marketing intangibles",
    title: "Short-term contract amplifies the imbalance",
    group: "Primair group",
    refs: "Annex I · Example 11 · ¶35–38",
    atGlance:
      "Same as Example 9, except the marketing & distribution agreement is for three years only, with no renewal option and no renewal in fact. Company S nonetheless invests heavily in marketing. Does the short-term nature of the contract change anything?",
    parties: {
      kind: "tested-party",
      left: { name: "Primair", role: "Brand owner · benefits after contract ends" },
      right: { name: "Company S", role: "3-year distributor · no renewal · invests in marketing" },
      arrowLabel: "short-term marketing investment"
    },
    timeline: [
      "Year 1: 3-year marketing and distribution agreement signed; no renewal option.",
      "Company S incurs marketing and distribution expenses building the market.",
      "End of year 3: contract ends with no renewal.",
      "Independent comparables show short-term distributors only invest where reward is commensurate with within-contract returns."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Independents do not invest large sums in marketing infrastructure under short-term contracts at risk of non-renewal without compensation. Company S's efforts may well benefit Primair after the contract ends.",
        question: "Is Company S entitled to compensation for its at-risk marketing contribution?",
        mcq: [
          "Yes — direct compensation from Primair for the value created, or alternatively a reduction in the watch purchase price during years 1–3.",
          "No — Company S accepted a short-term contract; renewal risk is its own.",
          "No — without a long-term right, there is no marketing intangible to compensate."
        ],
        correctIdx: 0,
        analysis:
          "Company S has assumed higher risks than in Example 9 and has not been compensated for them. The short-term contract makes it unreasonable to expect Company S to obtain appropriate benefits within the contract term. Compensation can take the form of a direct payment from Primair, or a reduction in the watch purchase price during years 1–3.",
        verdict: "Direct compensation or price reduction"
      }
    ],
    takeaway:
      "Contract horizon matters. A short-term distributor that invests like a long-term partner cannot recoup the value within its window — the upside reverts to the principal and should be compensated.",
    crossRefs: [
      "Example 9 (long-term variant)",
      "Example 10 (excess spend variant)"
    ]
  },

  {
    id: 12,
    theme: "marketing-intangibles",
    themeLabel: "Marketing intangibles",
    title: "Royalty introduced mid-contract",
    group: "Primair group",
    refs: "Annex I · Example 12 · ¶39–41",
    atGlance:
      "Same as Example 9. By end of year 3 the R brand is well established. Primair and Company S then sign a new long-term licence under which Company S pays a sales-based royalty — with no adjustment to the watch purchase price. Company S's margins fall well below comparables. Should the royalty be respected?",
    parties: {
      kind: "tested-party",
      left: { name: "Primair", role: "Brand owner · introduces new royalty without price relief" },
      right: { name: "Company S", role: "Long-term licensee · margins fall below comparables" },
      arrowLabel: "royalty on gross sales → · no purchase-price adjustment"
    },
    timeline: [
      "End of year 3: R brand well established in Country Y due to Company S's efforts.",
      "New long-term licence agreement signed (5 + 5 year option) under which Company S pays a royalty based on gross sales of all R watches.",
      "No adjustment is made to the watch purchase price to reflect the new royalty.",
      "Years 4–5: Company S's marketing spend and activity remain at independent-distributor levels; profit margins fall substantially below comparables."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "No evidence that independent marketers/distributors in similar arrangements pay royalties when they receive only the right to use trademarks in distributing the principal's branded product. The royalty causes Company S's margins to be consistently lower than comparables.",
        question: "Should the royalty be respected?",
        mcq: [
          "No — disallow the royalty payments; in arm's-length distribution arrangements, a royalty would not be paid for the bare right to distribute branded product.",
          "Yes — Company S signed the licence and must honour it; the lower margins reflect that bargain.",
          "Reduce the royalty rate but allow some payment to reflect the brand strength built by end of year 3."
        ],
        correctIdx: 0,
        analysis:
          "It would not generally be expected at arm's length that a royalty is paid where a marketing-and-distribution entity obtains no transfer-pricing rights in the trademark other than the right to use it in distributing branded product. The royalty causes margins to fall consistently below those of comparable distributors. Disallow the royalties.",
        verdict: "Royalty disallowed"
      }
    ],
    takeaway:
      "Mid-contract royalties can disguise erosion of distributor margin. If comparable independent distributors do not pay a royalty for the bare right to distribute, the controlled royalty should not survive.",
    crossRefs: [
      "Example 9 (baseline)",
      "Example 13 (manufacturing-licence variant)"
    ]
  },

  {
    id: 13,
    theme: "marketing-intangibles",
    themeLabel: "Marketing intangibles",
    title: "From distributor to processor-licensee",
    group: "Primair group",
    refs: "Annex I · Example 13 · ¶42–45",
    atGlance:
      "Same group, the Example 10 fact pattern. At the end of year 3, Primair stops manufacturing and outsources to a third party. Company S now imports unbranded watches, brands them, and operates under a new long-term royalty-bearing licence — with no compensation for the renegotiation. Is this arm's-length?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Third-party CM", role: "Manufactures unbranded watches" },
      second: { name: "Primair", role: "Brand owner · grants new processing/licence to Company S" },
      third: { name: "Company S", role: "Now processes, brands, distributes · pays gross-sales royalty" },
      label1: "unbranded watches",
      label2: "new licence · royalty"
    },
    timeline: [
      "Years 1–3: as in Example 10 — Company S invests heavily in marketing under a long-term distribution agreement; excess spend, low margins.",
      "End of year 3: Primair stops manufacturing and contracts a third-party CM. Company S will now import unbranded watches, brand and package them, and sell.",
      "Year 4: new 5-year (+5-year option) licence agreement signed; Company S pays a royalty on gross sales of all such watches.",
      "No compensation paid for the renegotiation; the new watch purchase price is assumed to be arm's-length with no R-name component embedded."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Audit finds the year 1–3 over-investment as in Example 10; in years 4–5, Company S incurs marketing spend far above comparable long-term licensees and earns significantly lower margins.",
        question: "How can the tax administration redress the imbalance?",
        mcq: [
          "Years 1–3: adjust as in Example 10 (price reduction, residual split or direct compensation); years 4–5: reduce the royalty payable to Primair; also consider compensation for the year-3 renegotiation under Chapter IX.",
          "Disregard the new licence and treat Company S as economic owner of the brand from year 3.",
          "Leave both periods alone — Company S signed the new licence with full information."
        ],
        correctIdx: 0,
        analysis:
          "For years 1–3 the bases for adjustment are as in Example 10. For years 4–5 the bases are similar except the adjustment reduces the royalty payments rather than the purchase price. Depending on facts and circumstances, consideration could also be given to whether Company S should have received compensation for the year-3 renegotiation under Part II of Chapter IX.",
        verdict: "Adjustment via royalty + renegotiation review"
      }
    ],
    takeaway:
      "Restructures from distribution into licensing/processing don't reset history. The earlier period needs its own adjustment, the new period requires comparables for the new structure, and the renegotiation itself may warrant compensation under Chapter IX.",
    crossRefs: [
      "Example 10 (years 1–3 logic)",
      "Chapter IX · Part II (business restructurings)"
    ]
  },

  /* ===================================================================
     CONDUCT OVERRIDES CONTRACT — IMPUTED TRANSACTIONS (Examples 18, 19)
     =================================================================== */

  {
    id: 18,
    theme: "conduct-vs-contract",
    themeLabel: "Conduct overrides contract",
    title: "Conduct widens the licence beyond its written terms",
    group: null,
    refs: "Annex I · Example 18 · ¶64–66",
    atGlance:
      "Primarni licenses Company S to use Product X patents and know-how in Country B only. In practice, Company S sells Product X into associated distributors across Asia and Africa, and Primarni does not enforce its retained rights. Is this still a Country-B-only licence?",
    parties: {
      kind: "tested-party",
      left: { name: "Primarni", role: "Owner of Product X patents · retains rights in Asia & Africa" },
      right: { name: "Company S", role: "Licensee for Country B · in practice sells across Asia & Africa" },
      arrowLabel: "royalty (originally Country B only)"
    },
    timeline: [
      "Primarni develops Product X patents and know-how, holding valid patents in all relevant countries.",
      "Written licence: Company S can use the patents/know-how to manufacture and sell Product X in Country B only.",
      "Primarni retains patent and know-how rights in Asia, Africa and Country A.",
      "Company S manufactures Product X in Country B and sells it both to independent and to associated distributors based across Asia and Africa.",
      "Primarni does not exercise its retained rights to prevent these sales."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Conduct shows Primarni allowing Company S to exploit the patents in Asia and Africa as well as Country B.",
        question: "How should the licence be characterised for transfer-pricing purposes?",
        mcq: [
          "Treat the licence as extending to Country B plus Asia and Africa; recalculate the royalty by reference to projected sales in all those territories.",
          "Limit the licence to Country B per the written contract and treat Asia/Africa sales as separate unauthorised transactions.",
          "Disregard the licence entirely and treat Company S as economic owner of Product X."
        ],
        correctIdx: 0,
        analysis:
          "The conduct of the parties suggests that the actual transaction is a licence of the Product X patents and know-how for Country B plus Asia and Africa. Company S's licence should be treated as extending accordingly, and the royalty rate should be recalculated to take into account the total projected sales in all the relevant territories.",
        verdict: "Licence extended by conduct"
      }
    ],
    takeaway:
      "Conduct can broaden — or narrow — a written licence. Where the principal tolerates exploitation outside the written scope, accurately delineated the licence covers what is actually used.",
    crossRefs: [
      "Chapter I · Section D.1",
      "Example 19 (no licence on paper at all)"
    ]
  },

  {
    id: 19,
    theme: "conduct-vs-contract",
    themeLabel: "Conduct overrides contract",
    title: "Imputing a licence from substantial use",
    group: null,
    refs: "Annex I · Example 19 · ¶67–68",
    atGlance:
      "Company P built a successful retailing know-how and a unique marketing concept in Country A. Its new Country B subsidiary, Company S, uses the same know-how and concept and earns margins well above comparable Country B retailers. There is no licence on paper. Should there be?",
    parties: {
      kind: "tested-party",
      left: { name: "Company P", role: "Parent · developed know-how and marketing concept in Country A" },
      right: { name: "Company S", role: "Country B subsidiary · uses same know-how · above-market margins" },
      arrowLabel: "use of know-how & concept (no written agreement)"
    },
    timeline: [
      "Company P develops special know-how and a unique marketing concept for its department-store business in Country A.",
      "The know-how and the marketing concept are assumed to be intangibles within the meaning of Chapter VI Section A.",
      "Company P establishes Company S in Country B; Company S operates new department stores using the same know-how and marketing concept.",
      "Company S earns profit margins substantially higher than comparable Country B retailers."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Functional analysis shows Company S uses Company P's know-how and marketing concept. Independent parties would have signed a licence for that use.",
        question: "What transfer-pricing remedy is available?",
        mcq: [
          "Impute a royalty payment from Company S to Company P for the use of the know-how and marketing concept.",
          "Leave the arrangement alone — without a written licence, there is no transaction to price.",
          "Adjust Company S's purchase prices on group inventory to claw back the premium."
        ],
        correctIdx: 0,
        analysis:
          "The conduct of the parties reveals a transaction consisting of the transfer from Company P to Company S of the right to use the know-how and unique marketing concept. Independent parties in comparable circumstances would have entered into a licence agreement. One available remedy is to impute a royalty payment from Company S to Company P for the use of these intangibles.",
        verdict: "Royalty imputed"
      }
    ],
    takeaway:
      "Use of group intangibles without a written licence is a transaction. Accurately delineated, it is whatever independent parties in comparable circumstances would have signed — typically a royalty-bearing licence.",
    crossRefs: [
      "Example 18 (written licence too narrow)",
      "Chapter I · Section D (accurate delineation)"
    ]
  },

  /* ===================================================================
     TRANSFERS OF INTANGIBLES & SERVICES WITH IP (Examples 20, 24, 25)
     =================================================================== */

  {
    id: 20,
    theme: "transfers",
    themeLabel: "Transfers & services with IP",
    title: "Country-business migration — goodwill follows the value",
    group: "Ilcha group",
    refs: "Annex I · Example 20 · ¶69–72",
    atGlance:
      "Company S1 ran the Product Q business in Countries B and C. The group then sets up Company S2 in Country C, transferring tangible assets and surrendering the relevant Rights so Ilcha can relicense them to S2. Has just legal title moved — or has business value moved with it?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Company S1 (Country B)", role: "Surrenders Country C Rights · transfers tangible assets" },
      second: { name: "Ilcha", role: "Parent · patent and trademark owner · relicenses" },
      third: { name: "Company S2 (Country C)", role: "New operating company · receives Rights and assets" },
      label1: "surrender Rights · transfer assets",
      label2: "new long-term licence"
    },
    timeline: [
      "Ilcha owns Product Q patents and the trademark; S1 had operated the Product Q business in Countries B and C for many years.",
      "Ilcha incorporates Company S2 in Country C.",
      "Company S1 transfers tangible manufacturing and marketing assets used in Country C to Company S2.",
      "Ilcha and Company S1 terminate the agreement granting S1 the Country C Rights (manufacture/distribute, use of patents/trademark, customer relationships, customer lists, goodwill).",
      "Ilcha grants Company S2 new long-term licences for the same Rights."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Over time S1 developed substantial business value in Country C; an independent buyer would pay for it in an acquisition. A purchase-price allocation would treat part of that value as goodwill.",
        question: "What should the transfer prices in this restructure reflect?",
        mcq: [
          "Three separate transactions, with prices that reflect tangible assets, the surrender of Rights by S1, and the new licence from Ilcha — including amounts treated as goodwill in accounting terms.",
          "A single transfer at book value of the tangible assets; the Rights are merely terminated and relicensed at no value.",
          "A pro-rata allocation of Group-level value to S2 only, ignoring goodwill."
        ],
        correctIdx: 0,
        analysis:
          "There is value being transferred to Company S2 through the combination of the tangible-asset transfer and the surrender-and-relicensing of the Rights. There are three separate transactions: (i) S1 → S2 tangible assets, (ii) S1 → Ilcha surrender of Rights, (iii) Ilcha → S2 new licence. The prices paid should reflect the value of the business — including amounts that would be treated as goodwill for accounting purposes.",
        verdict: "Three transactions priced at full business value"
      }
    ],
    takeaway:
      "Restructures don't destroy value. When a country business migrates, the prices on each leg must add up to the value an independent buyer would have paid for that business — including goodwill.",
    crossRefs: [
      "Chapter IX (business restructurings)",
      "Section D (transfers of intangibles)"
    ]
  },

  {
    id: 24,
    theme: "transfers",
    themeLabel: "Transfers & services with IP",
    title: "Services that carry embedded IP",
    group: null,
    refs: "Annex I · Example 24 · ¶86–88",
    atGlance:
      "Zhu lends staff to Company S for a similar Bank-B engagement. Those staff bring across Zhu's proprietary code from an earlier Bank-A engagement, and Company S embeds it in the deliverable. Is this a services transaction, an IP transfer, or both?",
    parties: {
      kind: "tested-party",
      left: { name: "Zhu", role: "Owner of proprietary ATM software code · supplies people" },
      right: { name: "Company S", role: "Delivers ATM software to Bank B · uses Zhu staff and code" },
      arrowLabel: "services · IP rights →"
    },
    timeline: [
      "Zhu develops and retains proprietary ATM software code during a Bank A engagement.",
      "Company S enters a separate Bank B engagement of similar character.",
      "Zhu agrees to support by providing staff who worked on Bank A; those staff have access to Bank A designs, know-how and code.",
      "Portions of Zhu's proprietary code are embedded in the software delivered by Company S to Bank B.",
      "The embedded portions are extensive enough to support a copyright-infringement claim against unauthorised use."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company S receives both the time and skill of Zhu's people and rights in Zhu's proprietary code.",
        question: "What does Company S owe Zhu?",
        mcq: [
          "Compensation for both elements — the services of the employees and the rights in the embedded software.",
          "A service fee covering only the staff hours; the embedded code is incidental.",
          "A royalty for the code only; the staff time is part of normal group support."
        ],
        correctIdx: 0,
        analysis:
          "A transfer-pricing analysis should recognise that Company S received two benefits requiring compensation: services from the Zhu employees, and rights in Zhu's proprietary software used as the foundation for the Bank B system. The compensation paid by Company S should include both.",
        verdict: "Pay for both services and IP"
      }
    ],
    takeaway:
      "When a service transaction carries embedded IP across an entity line, that IP is itself a transferred right. Price both legs — the service and the right.",
    crossRefs: [
      "Chapter VI Section A (definition of intangibles)",
      "Example 25 (services that don't transfer IP)"
    ]
  },

  {
    id: 25,
    theme: "transfers",
    themeLabel: "Transfers & services with IP",
    title: "Services improved by tools — but no IP transfer",
    group: null,
    refs: "Annex I · Example 25 · ¶89–91",
    atGlance:
      "Prathamika lends two of its litigation lawyers to Company S for one specific lawsuit. The lawyers use Prathamika's proprietary document-management software in their work, but Company S receives no right to use the software elsewhere. Is there an intangible transfer?",
    parties: {
      kind: "tested-party",
      left: { name: "Prathamika", role: "Parent · litigation team and proprietary tools" },
      right: { name: "Company S", role: "Receives two lawyers for one matter" },
      arrowLabel: "legal services (tool-enabled)"
    },
    timeline: [
      "Prathamika's internal legal team develops experience in large-scale litigation and proprietary document-management software.",
      "Company S faces a complex litigation matter similar to those handled by Prathamika.",
      "Two Prathamika lawyers are made available to Company S to manage documents in the Company S litigation.",
      "They use Prathamika's document-management software on this matter only; Company S obtains no rights to use the software in other matters or to make it available to its customers."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The software is used as a productivity tool in delivering the service; no separate right to use it is transferred to Company S.",
        question: "How should the arrangement be priced?",
        mcq: [
          "As a service fee, with the experience and software treated as comparability factors that may justify a higher fee — not as an IP transfer.",
          "As a service fee plus a separate royalty for the use of the document-management software during the engagement.",
          "As a transfer of intangibles to Company S, since Company S benefits from the proprietary software."
        ],
        correctIdx: 0,
        analysis:
          "It would not be appropriate to treat Prathamika as having transferred rights in intangibles as part of the service arrangement. However, the fact that the lawyers had experience and software tools that allowed them to perform their services more effectively should be considered in the comparability analysis when setting the service fee.",
        verdict: "Service fee, no IP transfer"
      }
    ],
    takeaway:
      "Not every use of group IP in a service is a transfer of that IP. Where the recipient gets no right to use the IP itself, the service fee — calibrated for the team's enhanced effectiveness — is the full answer.",
    crossRefs: [
      "Example 24 (where IP rights do transfer)",
      "Chapter VII (intra-group services)"
    ]
  },

  /* ===================================================================
     VALUATION TECHNIQUES (Examples 22, 23, 26, 27, 28, 29)
     =================================================================== */

  {
    id: 22,
    theme: "valuation",
    themeLabel: "Valuation techniques",
    title: "Goodwill from synergies in an acquisition",
    group: null,
    refs: "Annex I · Example 22 · ¶78–82",
    atGlance:
      "Birincil buys all of Company A — which owns a mining licence (standalone value 20) and a railway licence (standalone value 10) — for 100. Its purchase-price allocation puts 70 of the price into goodwill from the synergy between the two licences. The licences are then transferred to Company S. At what price?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Birincil", role: "Acquirer · pays 100 for Company A" },
      second: { name: "Company A", role: "Holder of mining (20) + railway (10) licences" },
      third: { name: "Company S", role: "Subsidiary · receives the two licences" },
      label1: "share acquisition · 100",
      label2: "licence transfer · ?"
    },
    timeline: [
      "Company A holds two government licences: mining (standalone value 20) and railway (standalone value 10).",
      "Birincil, independent of Company A, acquires 100% of Company A's equity for 100.",
      "Purchase-price allocation: 20 to mining, 10 to railway, 70 to goodwill (synergies between the licences).",
      "Immediately after acquisition, Birincil causes Company A to transfer both licences to Company S, a Birincil subsidiary."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The 100 paid by Birincil to acquire Company A is arm's-length and reflects the combined value of the licences plus the synergy goodwill.",
        question: "What should the arm's-length price for the Company A → Company S transfer be?",
        mcq: [
          "It should take account of the mining licence, the railway licence, and the goodwill — value does not disappear in an intra-group restructure; the 100 paid by Birincil is useful evidence.",
          "30 — the sum of the standalone values of the two licences only.",
          "It should track the accounting purchase-price allocation: 20 + 10 + 70."
        ],
        correctIdx: 0,
        analysis:
          "Identifying the intangibles transferred with specificity matters. The goodwill associated with the licences must be considered in the transfer to Company S because value generally does not disappear or is not destroyed in an internal restructuring. The arm's-length price should take account of the two licences and the value ascribed to goodwill; the 100 paid by Birincil provides useful information on the combined value of the intangibles.",
        verdict: "Price must include synergy goodwill"
      }
    ],
    takeaway:
      "Goodwill arising from synergies between transferred intangibles travels with them. An intra-group transfer cannot strip out the synergy value that an independent purchase price included.",
    crossRefs: [
      "Section D (transfers of intangibles)",
      "Example 23 (workforce/goodwill split)"
    ]
  },

  {
    id: 23,
    theme: "valuation",
    themeLabel: "Valuation techniques",
    title: "Acquisition then immediate IP migration",
    group: null,
    refs: "Annex I · Example 23 · ¶83–85",
    atGlance:
      "Birincil acquires Company T for 100 — driven mainly by promising technologies and the R&D workforce. Right after closing, Company T transfers all developed and partly developed tech to Company S and switches to contract research for Company S. What did Company S actually get?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Birincil", role: "Acquirer of Company T · 100" },
      second: { name: "Company T", role: "Continues as contract researcher on its old tech" },
      third: { name: "Company S", role: "Receives Company T technology · funds future R&D" },
      label1: "share acquisition · 100",
      label2: "tech transfer + contract research"
    },
    timeline: [
      "Birincil acquires independent Company T for 100; PPA shows 20 to tangibles & identified intangibles, 80 to goodwill.",
      "The 80 in goodwill reflects partly developed technologies and the potential of Company T's workforce to develop new ones.",
      "Immediately after closing, Company T transfers all developed and partly developed technologies, patents, trade secrets and know-how to Company S.",
      "Company T enters a contract-research agreement with Company S at cost-plus; Company T workforce continues to work exclusively on the transferred technologies and future technologies.",
      "Company S has the personnel and management to direct and control Company T's R&D work."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company S now controls research; Company T continues to host the people. The 100 paid for Company T provides useful information on total business value.",
        question: "How should the analysis allocate the 80 of accounting goodwill?",
        mcq: [
          "Identify which intangibles are transferred to Company S and which are retained by Company T; price the IP transfer and the ongoing R&D services such that, together, they compensate Company T for the value it gives up — the PPA's goodwill is not determinative.",
          "Transfer the whole 80 of goodwill to Company S as part of the IP sale.",
          "Leave the 80 of goodwill at Company T; only the 20 of identified intangibles transfers."
        ],
        correctIdx: 0,
        analysis:
          "It is necessary to identify which intangibles are transferred to Company S and which are retained by Company T. The PPA's allocations are not determinative for transfer-pricing purposes. The 100 paid by Birincil reflects an arm's-length price for the business; that full value should be reflected either in the assets transferred to Company S or in the assets and workforce retained by Company T. Company T should be compensated for its contribution — either through the IP-transfer price or through the post-transaction R&D-services compensation.",
        verdict: "Specific identification + combined remuneration"
      }
    ],
    takeaway:
      "Accounting goodwill is a starting point, not the answer. The transfer-pricing question is: which specific intangibles moved, what stayed behind (including workforce-in-place), and across the two legs together does Company T get the value the independent purchase price implied?",
    crossRefs: [
      "Example 22 (synergy goodwill)",
      "Example 26 (acquisition premium and licensing)"
    ]
  },

  {
    id: 26,
    theme: "valuation",
    themeLabel: "Valuation techniques",
    title: "Acquisition premium licensed to a regional sub",
    group: "Osnovni group",
    refs: "Annex I · Example 26 · ¶92–96",
    atGlance:
      "Osnovni acquires publicly listed Company S for 160 when the shares were trading at 100. The premium reflects synergies with Osnovni's existing products. Osnovni liquidates Company S and grants Company T (its European/Asian licensee) an exclusive perpetual licence over the acquired IP. What should T pay?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Osnovni", role: "Parent · acquired Company S at 160 vs trading value 100" },
      second: { name: "Company S (liquidated)", role: "Brings products, IP and workforce" },
      third: { name: "Company T", role: "European/Asian licensee · receives perpetual licence" },
      label1: "acquisition + liquidation",
      label2: "exclusive licence · ?"
    },
    timeline: [
      "Company S is publicly traded at an aggregate value of 100; competing bidders offer 120–130.",
      "Osnovni acquires 100% of Company S for 160; PPA: tangibles 10, intangibles 60, goodwill 90.",
      "Osnovni justifies the 160 by reference to complementarity between its products and Company S's products and pipeline.",
      "Company T is Osnovni's wholly-owned subsidiary that has historically held arm's-length exclusive licences for Europe and Asia.",
      "Osnovni liquidates Company S, then grants Company T an exclusive perpetual licence covering Company S's products in European and Asian markets."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The premium over Company S's trading value reflects synergies. Some of those synergies relate to European and Asian markets (Company T's territory); some do not.",
        question: "How should the premium be reflected in Company T's licence price?",
        mcq: [
          "Allocate to Company T an appropriate share of the premium attributable to complementarities in European and Asian markets — and exclude premium that relates to non-T territories. PPA values are not determinative.",
          "Charge Company T the full 90 of accounting goodwill, allocated by territory share.",
          "Use only the pre-acquisition trading value of 100 — the premium reflects Osnovni's own group decisions and is not Company T's responsibility."
        ],
        correctIdx: 0,
        analysis:
          "In pricing the Company S intangibles licensed to Company T, the premium over the original trading value should be considered. To the extent that premium reflects complementarity with Osnovni group products in European and Asian markets, Company T should pay an amount that reflects an appropriate share of that premium. To the extent the premium reflects complementarities outside Company T's markets, it should not be taken into account. The PPA intangible value is not determinative.",
        verdict: "Allocate territory-relevant premium"
      }
    ],
    takeaway:
      "Acquisition premiums map to synergies. When an acquired intangible is sub-licensed to a related party, the part of the premium tied to that party's markets goes with the licence — and the rest does not.",
    crossRefs: [
      "Example 22 (synergy goodwill on transfer)",
      "Section D (transfers of intangibles)"
    ]
  },

  {
    id: 27,
    theme: "valuation",
    themeLabel: "Valuation techniques",
    title: "Patent valuation cross-checked against the whole business",
    group: null,
    refs: "Annex I · Example 27 · ¶97–100",
    atGlance:
      "Company B sells the Product M patent to Company A. Valuation analysis prices the patent at 80; a parallel DCF of the entire Product M business gives 100. After functional returns and value for trademarks and know-how retained by Company B, the 20 gap looks too thin. What does this mean?",
    parties: {
      kind: "tested-party",
      left: { name: "Company B", role: "Seller of Product M patent · retains trademarks & know-how" },
      right: { name: "Company A", role: "Parent · centralises patent ownership" },
      arrowLabel: "patent sale · valued at 80"
    },
    timeline: [
      "Company A owns various IP across the group; Company B owns Product M patents, trademarks and know-how.",
      "For sound business reasons related to coordinating patent protection, the group centralises patent ownership at Company A.",
      "Company B sells the Product M patents to Company A for a lump sum.",
      "No comparable uncontrolled transactions are identified; the parties apply valuation techniques.",
      "Patent valuation arrives at NPV of 80 (with adjustments to address material differences vs. industry royalty data).",
      "A DCF of the entire Product M business by Company A arrives at NPV of 100."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The 20 difference between the 100 business value and the 80 patent value seems inadequate to reflect both routine functional returns for Company B and the value of trademarks and know-how it retains.",
        question: "What should the analysis do next?",
        mcq: [
          "Further review the reliability of the 80 patent value — the cross-check suggests it may be understated.",
          "Use the 80 patent value because it was derived directly from royalty data, which is closer to the patent itself.",
          "Use the full 100 business value as the patent price — the patent is the value driver."
        ],
        correctIdx: 0,
        analysis:
          "The 20 gap between the entire-business NPV (100) and the patent NPV (80) appears inadequate to cover routine functional returns for Company B and the value of trademarks and know-how that Company B retains. Further review of the reliability of the 80 patent valuation is called for.",
        verdict: "Cross-check exposes 80 as unreliable"
      }
    ],
    takeaway:
      "Cross-check valuation techniques against each other. If the residual after the patent valuation is too thin to cover everything left over, the valuation needs another look.",
    crossRefs: [
      "Chapter VI · valuation techniques",
      "Example 28 (aggregation)"
    ]
  },

  {
    id: 28,
    theme: "valuation",
    themeLabel: "Valuation techniques",
    title: "Aggregate valuation where intangibles cannot be split",
    group: null,
    refs: "Annex I · Example 28 · ¶101–103",
    atGlance:
      "Company B sells patents, trademarks, know-how and customer relationships to Company C, and then becomes Company C's contract manufacturer. The group can't reliably segregate the cash flows of the different intangibles. Aggregate or asset-by-asset?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Company A", role: "Parent" },
      second: { name: "Company B", role: "Sells intangibles · becomes contract manufacturer" },
      third: { name: "Company C", role: "Acquires intangibles · manages business going forward" },
      label1: "group context",
      label2: "intangibles · lump-sum"
    },
    timeline: [
      "For valid business reasons, the group centralises in Company C all intangibles related to business conducted outside Country S.",
      "Company B sells its patents, trademarks, know-how and customer relationships to Company C for a lump sum.",
      "Company C retains Company B as a contract manufacturer of products previously produced and sold by Company B on a full-risk basis.",
      "Company C has personnel and resources required to manage the acquired business and develop the intangibles further.",
      "The group is unable to identify comparable uncontrolled transactions."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Valuation techniques are appropriate; the group cannot reliably segregate cash flows associated with the specific intangibles.",
        question: "How should the intangibles be valued?",
        mcq: [
          "Value them in the aggregate — especially where individually identified values sum to materially less than the value of the business as a whole.",
          "Each intangible must be valued separately on its own cash flows, even if that requires arbitrary allocation.",
          "Use the book value of each intangible to keep things auditable."
        ],
        correctIdx: 0,
        analysis:
          "Under these circumstances, in determining the arm's-length compensation to be paid by Company C for the intangibles sold by Company B, it may be appropriate to value the transferred intangibles in the aggregate rather than to attempt a valuation on an asset-by-asset basis. This is particularly so when there is a significant difference between the sum of separately valued individual intangibles and the value of the business as a whole.",
        verdict: "Aggregate valuation"
      }
    ],
    takeaway:
      "When cash flows cannot be reliably split between intangibles, aggregate. Force-allocating across assets adds spurious precision without improving reliability.",
    crossRefs: [
      "Example 27 (cross-check failure)",
      "Chapter VI · Section D.2 (combining intangibles)"
    ]
  },

  {
    id: 29,
    theme: "valuation",
    themeLabel: "Valuation techniques",
    title: "DCF from both sides — and the realistic alternatives",
    group: "Pervichnyi group",
    refs: "Annex I · Example 29 · ¶104–111",
    atGlance:
      "Pervichnyi transfers Product F manufacturing — and the related patents and trademarks — to Company S in low-cost Country Y. DCF gives a seller value of 600, a buyer value of 1 100, and a third realistic alternative (toll-manufacture) at 875. Where does the arm's-length price fall?",
    parties: {
      kind: "tested-party",
      left: { name: "Pervichnyi", role: "Parent · developer · seller of IP" },
      right: { name: "Company S", role: "Low-cost manufacturing buyer · receives IP" },
      arrowLabel: "IP sale · lump sum (range 875 ↔ 1 100)"
    },
    timeline: [
      "Pre-year 1: Pervichnyi develops Product F patents and trademarks; manufactures in Country X and supplies arm's-length-priced distribution affiliates worldwide.",
      "Year 1: Pervichnyi sets up Company S in low-cost Country Y to save costs.",
      "Year 1: Pervichnyi sells the Product F patents and trademarks to Company S for a lump sum.",
      "DCF analysis: seller's keeping-as-is residual cash flow has NPV 600; buyer's residual cash flow has NPV 1 100.",
      "Realistic alternative for Pervichnyi: retain IP and use Company S (or alternative supplier) as toll manufacturer in Country Y — NPV 875."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Both perspectives must be taken into account along with realistic alternatives. The DCF inputs are oversimplified, but illustrate the principle.",
        question: "Where does the arm's-length price fall?",
        mcq: [
          "Above 875 (Pervichnyi's best realistic alternative) and below 1 100 (the maximum Company S would pay while still earning a positive return) — with tax effects of the transaction itself part of the negotiation.",
          "At 600 — Pervichnyi's continuation NPV — because that is what Pervichnyi gives up.",
          "At 1 100 — the buyer's NPV — because that is the value the IP generates in Company S's hands."
        ],
        correctIdx: 0,
        analysis:
          "Pervichnyi would not sell below 600 (continue-as-is) and would not sell below 875, since its realistic alternative is to use a low-cost contract manufacturer while retaining the IP. Company S would not pay more than 1 100. A DCF-based transfer-pricing analysis must consider how independents would take into account cost savings and tax effects in setting the price. The arm's-length price falls between 875 and 1 100.",
        verdict: "Range 875 ↔ 1 100"
      }
    ],
    takeaway:
      "DCF asks both sides — and asks each side what else it could realistically do. The arm's-length price lives between the seller's best alternative and the buyer's break-even.",
    crossRefs: [
      "Chapter VI ¶6.153–6.178 (DCF guidance)",
      "Chapter IX (realistic alternatives)"
    ]
  },

  /* ===================================================================
     HARD-TO-VALUE INTANGIBLES (Annex II Examples 1, 2)
     =================================================================== */

  {
    id: 30,
    theme: "htv",
    themeLabel: "Hard-to-value intangibles",
    title: "Phase II patent transfer — earlier sales than projected",
    group: null,
    refs: "Annex II · Example 1 · ¶21–27",
    atGlance:
      "In year 0, Company A transfers a Phase II pharma compound to Company S for a lump-sum 700, based on projections of sales starting in year 6. On audit in year 4, sales have already started — in year 3. What can the tax administration do, and does the answer change if the gap is small?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Patent transferor · Phase II compound · valuation 700 in year 0" },
      right: { name: "Company S", role: "Acquires patent · runs Phase III · earlier commercialisation than projected" },
      arrowLabel: "patent rights · lump sum 700"
    },
    timeline: [
      "Year 0: Company A transfers Phase II patent rights to Company S for a lump sum of 700.",
      "Pricing assumption: sales would start in year 6 and not exceed 1 000 a year.",
      "Year 3: commercialisation begins — Phase III completed earlier than projected.",
      "Years 3–4: sales correspond to those originally projected for years 6 and 7.",
      "Year 4: Country A tax administration audits years 0–2 and observes the ex-post outcomes."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Taxpayer cannot demonstrate that the original valuation took into account the possibility of earlier sales, or that earlier sales were unforeseeable.",
        question: "What adjustment is the tax administration entitled to make?",
        mcq: [
          "Revise the year-0 NPV from 700 to 1 000 — the risk-adjusted earlier-sales scenario — and assess additional profits of 300 in year 0.",
          "Revise the year-0 NPV to the actual ex-post NPV based on observed sales, with no risk weighting.",
          "Nothing — Phase III completing early is exactly the kind of forecast uncertainty the parties accepted in year 0."
        ],
        correctIdx: 0,
        analysis:
          "The tax administration uses the ex-post outcomes as presumptive evidence that the year-0 valuation did not consider earlier sales. The valuation is revised to include the risk-adjusted possibility of earlier sales — assume the year-0 arm's-length price should have been 1 000 rather than 700. The 1 000 is not the same as an NPV based solely on the actual outcome. An adjustment to assess additional profits of 300 in year 0 is appropriate.",
        verdict: "Adjust +300 (year 0)"
      },
      {
        letter: "B",
        facts:
          "The taxpayer cannot demonstrate that the original year-0 valuation accounted for the possibility of earlier sales. The HtV analysis revises the year-0 NPV, but here the risk-adjusted revised NPV is 800 rather than 1 000 — making the proposed adjustment 100 rather than 300.",
        question: "Does the HtV approach apply?",
        mcq: [
          "The adjustment is calculated as 100 — but the exemption in paragraph 6.193(iii) applies because the revision is within 20% of the year-0 compensation, so the HtV adjustment is not made.",
          "The adjustment of 100 is made unchanged — the 20% exemption applies only to non-pharma intangibles.",
          "The adjustment is made and additionally penalty interest applies — being within 20% triggers a documentation requirement, not exemption."
        ],
        correctIdx: 0,
        analysis:
          "The tax administration's analysis would lead to a 100 adjustment. However, the exemption in paragraph 6.193(iii) of Chapter VI applies, because the adjustment to the original compensation is within 20% of the compensation determined at the time of the transaction. The HtV approach therefore does not result in an adjustment in this scenario.",
        verdict: "Within 20% → exempt"
      }
    ],
    takeaway:
      "Significant ex-post deviations from the year-0 plan create presumptive evidence that the original valuation was wrong — but the adjustment is to the risk-adjusted year-0 view, not to the realised outcome. The 20% safe harbour caps small revisions.",
    crossRefs: [
      "Chapter VI · Section D.4 (HtV approach)",
      "Paragraph 6.193 (HtV exemptions)"
    ]
  },

  {
    id: 31,
    theme: "htv",
    themeLabel: "Hard-to-value intangibles",
    title: "Sales materially higher than projected — alternative payment structures",
    group: null,
    refs: "Annex II · Example 2 · ¶28–33",
    atGlance:
      "Same Phase-II transfer as the previous example. In year 7, audit of years 3–5 reveals sales of 1 500 in years 5 and 6 — vs. a year-0 cap of 1 000. The risk-adjusted revised NPV is 1 300. Is a single year-0 lump-sum adjustment really the right way to fix it?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Patent transferor · year-0 lump sum 700" },
      right: { name: "Company S", role: "Achieves sales of 1 500 in years 5–6 vs. projected ceiling of 1 000" },
      arrowLabel: "year-0 lump sum · adjustment in year 3?"
    },
    timeline: [
      "Year 0: Company A transfers Phase II patent rights to Company S for a lump sum of 700 (year-0 cap on sales: 1 000).",
      "Year 7: Country A tax administration audits years 3–5.",
      "Audit findings: sales of 1 500 in each of years 5 and 6 — significantly higher than projected.",
      "Taxpayer cannot demonstrate that the year-0 valuation considered such sales levels, or that they were unforeseeable.",
      "First market approvals were obtained in year 3."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Revising the year-0 valuation to include the risk-adjusted possibility of higher sales gives a year-0 NPV of 1 300 (vs. 700 originally) — a 600 adjustment. None of the paragraph 6.193 exemptions applies.",
        question: "How can the adjustment be implemented in an arm's-length way?",
        mcq: [
          "Re-assess the year-0 price by 600 — or, alternatively, restructure as a milestone payment in year 3 (when first market approvals were obtained), which may be more consistent with what independents would have done given the valuation uncertainty.",
          "Apply only the milestone adjustment in year 3 because the HtV approach forbids retroactive adjustments to year 0.",
          "Apply only the year-0 600 adjustment; alternative payment structures are not permitted under the HtV approach."
        ],
        correctIdx: 0,
        analysis:
          "Ex-post outcomes are presumptive evidence that higher sales should have been considered at year 0; the revised year-0 NPV is 1 300 (not the same as a pure ex-post NPV). The tax administration may assess additional profits of 600. Given the size of the revision and the valuation uncertainty, an alternative payment structure — for example, a further payment in year 3 when first market approvals were obtained — may be more consistent with what independent parties would have done. The principles apply whether the audit covers years 0–2, years 3–5, or both.",
        verdict: "Adjust 600 — consider milestone form"
      }
    ],
    takeaway:
      "Large HtV revisions invite a structural rethink, not just a number. Where independents would have used contingent or milestone payments to cope with valuation uncertainty, that form can be a better way to land the adjustment than a single year-0 reprice.",
    crossRefs: [
      "Chapter VI · Section D.4 (HtV approach)",
      "Paragraph 6.183 (alternative payment structures)",
      "Paragraph 6.192 (use of ex-post evidence)"
    ]
  }

];
