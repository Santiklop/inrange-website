// Single source of truth for the Profit Split case content rendered on the page.
// Each case mirrors the shape used by Chapters VI and VII and is validated by
// scripts/validate-cases.mjs.
//
// Theme codes (used for sidebar grouping):
//   when-ps         → When the profit split is the most appropriate method
//   ps-application  → Applying the profit split method
//
// Source: 2022 OECD TPG, Annex II to Chapter II — 16 case studies on the
// application of the transactional profit split method.

globalThis.CASES = [

  /* ===================================================================
     WHEN THE PROFIT SPLIT IS THE MOST APPROPRIATE METHOD
     (Examples 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
     =================================================================== */

  {
    id: 1,
    theme: "when-ps",
    themeLabel: "When PS is appropriate",
    title: "Pharma — patent licensed to a developing affiliate",
    group: "Pharma MNE",
    refs: "Annex II Ch.II · Example 1 · ¶1–4",
    atGlance:
      "Company A patents a new pharmaceutical formulation after early-stage R&D, then licenses the patent to subsidiary Company S, which performs the subsequent development, obtains regulatory approval, and brings the drug to market. Both contributions are unique and valuable. Which method prices the licence?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A (parent)", role: "Early-stage R&D · designed clinical trials · owns patent" },
      right: { name: "Company S (subsidiary)", role: "Subsequent development · regulatory approval · enhancement" },
      arrowLabel: "patent licence →"
    },
    timeline: [
      "Company A performs early-stage R&D and designs the clinical trials, leading to a patent on a new formulation.",
      "Company A licenses the patent to its subsidiary Company S.",
      "Company S performs subsequent development and important enhancement functions.",
      "Company S obtains regulatory authorisation and the product is sold in markets worldwide."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Both sides contribute something unique and valuable: Company A's early-stage R&D and the patent, and Company S's later development and enhancement.",
        question: "Which method best prices the licence?",
        mcq: [
          "Transactional profit split — both parties make unique and valuable contributions to the patent's exploitation.",
          "CUP using third-party patent licences in the pharma sector.",
          "Cost-plus on Company S's development costs, with Company A as residual owner."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 1 (¶4), where both parties make unique and valuable contributions to the licensed intangible, the transactional profit split method is likely to be the most appropriate method. A CUP fails because the contributions are unique (¶2.130). A cost-plus on Company S treats it as a routine developer, which is inconsistent with the delineation that its enhancement functions are themselves unique and valuable.",
        verdict: "Profit split most appropriate"
      }
    ],
    takeaway:
      "Where both the licensor's underlying IP and the licensee's enhancement functions are unique and valuable, a one-sided method on either party leaves the other's contribution unpriced. Profit split is the natural answer.",
    crossRefs: [
      "¶2.130 (unique and valuable contributions)",
      "Chapter VI (development of intangibles)"
    ]
  },

  {
    id: 2,
    theme: "when-ps",
    themeLabel: "When PS is appropriate",
    title: "Tea — soil, blending know-how and a brand",
    group: "T Group",
    refs: "Annex II Ch.II · Example 2 · ¶5–9",
    atGlance:
      "A Co grows and processes a uniquely flavoured tea using proprietary cultivation and blending know-how. B Co repackages, brands, and sells the tea on premium markets it has built through its own marketing. Both make unique and valuable contributions — what method prices the intercompany sale?",
    parties: {
      kind: "tested-party",
      left: { name: "A Co (Country A)", role: "Grows · processes · proprietary blending know-how" },
      right: { name: "B Co (parent, Country B)", role: "Owns trademark · runs branding & advertising · sells to market" },
      arrowLabel: "processed tea →"
    },
    timeline: [
      "A Co cultivates land with exceptional soil and develops proprietary growing and blending know-how.",
      "A Co processes the tea (sorting, grading, fermenting, blending, packaging) and sells it to its parent B Co.",
      "B Co repackages and brands the teas for sale in target markets.",
      "B Co's branding features the origin and unique blend; its marketing builds the product range into a market leader commanding premium prices."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Both sides bring something unique: A Co's growing and blending know-how, B Co's trademark and marketing.",
        question: "Which method best prices the tea sale from A Co to B Co?",
        mcq: [
          "Transactional profit split — both parties make unique and valuable contributions.",
          "CUP using independent bulk-tea prices on commodity exchanges.",
          "TNMM on A Co with a routine return on processing costs."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 2 (¶9), each party makes unique and valuable contributions — A Co's growing and blending know-how and B Co's trademark and goodwill — so the transactional profit split method is likely to be the most appropriate method. A commodity CUP ignores the very characteristics that produce the premium. A TNMM on A Co would leave A Co's unique know-how unpriced.",
        verdict: "Profit split most appropriate"
      }
    ],
    takeaway:
      "Unique contributions can sit at both ends of a supply chain — on the production side and on the brand/marketing side. When they do, neither end is a good tested party.",
    crossRefs: [
      "¶2.130 (unique and valuable contributions)",
      "Chapter VI (marketing intangibles)"
    ]
  },

  {
    id: 3,
    theme: "when-ps",
    themeLabel: "When PS is appropriate",
    title: "Electronics — manufacturing IP plus distribution IP",
    group: "Electronics MNE",
    refs: "Annex II Ch.II · Example 3 · ¶10–15",
    atGlance:
      "Company A designs, develops and manufactures a new product line using valuable manufacturing know-how. Company B handles cutting-edge marketing (building a valuable trademark) and global distribution using a proprietary forecasting algorithm. Both ends are non-routine — what's the right method?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "R&D · manufacturing · valuable know-how" },
      right: { name: "Company B", role: "Marketing (creates trademark) · distribution algorithm" },
      arrowLabel: "finished products →"
    },
    timeline: [
      "Company A performs R&D, decides research lines and timelines, and manufactures the new product line using its valuable manufacturing know-how.",
      "Company A sells the products to Company B.",
      "Company B designs and executes cutting-edge global marketing, building a valuable trademark and goodwill.",
      "Company B runs global distribution using a proprietary algorithm for demand forecasting and 48-hour fulfilment."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Both sides have unique value drivers: Company A's manufacturing IP, and Company B's trademark plus proprietary distribution algorithm.",
        question: "Which method best prices the sale from A to B?",
        mcq: [
          "Transactional profit split — both parties make unique and valuable contributions.",
          "Resale price minus, using Company B's wholesale margin against comparable distributors.",
          "TNMM on Company A using comparable contract manufacturers."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 3 (¶15), both parties make unique and valuable contributions, so the transactional profit split method is likely to be the most appropriate method. Resale price minus on Company B ignores its non-routine marketing trademark and proprietary algorithm. TNMM on Company A treats it as a routine manufacturer, which contradicts the delineation that its manufacturing IP is itself non-routine.",
        verdict: "Profit split most appropriate"
      }
    ],
    takeaway:
      "Non-routine distribution (a proprietary algorithm, a self-built brand) can be just as unique as non-routine manufacturing. Don't treat a distributor as a routine tested party by reflex.",
    crossRefs: [
      "¶2.130 (unique and valuable contributions)",
      "Example 4 (same fact pattern, routine distribution)"
    ]
  },

  {
    id: 4,
    theme: "when-ps",
    themeLabel: "When PS is appropriate",
    title: "Electronics — same setup, but distribution is routine",
    group: "Electronics MNE",
    refs: "Annex II Ch.II · Example 4 · ¶16–19",
    atGlance:
      "Same as Example 3, except that Company B's marketing is limited and does not significantly enhance the brand, and its distribution does not provide a competitive advantage. Success rests on Company A's product and price. Does profit split still fit?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Design · development · manufacturing · drives success" },
      right: { name: "Company B", role: "Limited marketing · routine distribution · feedback relay" },
      arrowLabel: "finished products →"
    },
    timeline: [
      "Company A designs, develops and manufactures the new product line.",
      "Company A sells to Company B.",
      "Company B performs limited marketing that does not significantly enhance goodwill or reputation.",
      "Company B operates a simple customer feedback relay — not a unique and valuable contribution.",
      "Distribution does not provide a particular source of competitive advantage; success depends on the product's technical specs, design and price."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company A bears all the meaningful risks (design, development, manufacturing). Company B's marketing and distribution risks aren't economically significant, and its work isn't unique or valuable.",
        question: "Is profit split still the right method?",
        mcq: [
          "No — Company B's contribution can be reliably benchmarked; a one-sided method on Company B is more appropriate.",
          "Yes — both parties earn a share of the value chain, so profit split still applies.",
          "Yes — Company B's distribution and feedback role makes it a profit-split party."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 4 (¶19), where Company B does not make any unique and valuable contribution and its assumed risks are not economically significant, the transactional profit split is unlikely to be the most appropriate method. The arm's length compensation for Company B can be reliably benchmarked using a one-sided method (e.g. TNMM on Company B). Profit split is not a default for any two-party intra-group flow.",
        verdict: "One-sided method on Company B"
      }
    ],
    takeaway:
      "Profit split is reserved for cases where one-sided methods fail. If one party's contribution can be benchmarked reliably, that's the tested party — even if the counterparty has substantial value drivers.",
    crossRefs: [
      "¶2.127 (when PS is not appropriate)",
      "Example 3 (mirror — when distribution IS unique)"
    ]
  },

  {
    id: 5,
    theme: "when-ps",
    themeLabel: "When PS is appropriate",
    title: "Web crawler — shared development risk",
    group: "IT MNE",
    refs: "Annex II Ch.II · Example 5 · ¶20–25",
    atGlance:
      "WebCo writes the core web-crawler engine. ScaleCo customises and scales it for market needs, designs add-ons, and decides the crawling strategy. Both contribute unique IP; both assume the development risk that the product fails. What method prices the licence between them?",
    parties: {
      kind: "tested-party",
      left: { name: "WebCo", role: "Designs architecture · writes core code · ongoing base technology" },
      right: { name: "ScaleCo", role: "Scales up · designs add-ons · crawling strategy" },
      arrowLabel: "software licence →"
    },
    timeline: [
      "WebCo designs the architecture of a web crawler and writes its code, achieving superior speed and efficiency.",
      "WebCo licenses the programme to ScaleCo.",
      "ScaleCo scales up the crawler, designs add-ons, customises the product and decides the crawling strategy.",
      "WebCo continues developing the underlying base technology; ScaleCo uses these developments in scale-up.",
      "Both WebCo and ScaleCo assume the development risk that the crawler is unsuccessful."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Both parties share the development risk (the main economic risk here), and both bring unique and valuable IP.",
        question: "Which method best prices the licence?",
        mcq: [
          "Transactional profit split — unique and valuable contributions plus shared assumption of the economically significant risk.",
          "CUP using independent software licences.",
          "Cost-plus on ScaleCo's customisation costs."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 5 (¶25), the contributions are unique and valuable and both parties share the economically significant development risk, so the transactional profit split is likely to be the most appropriate method. A CUP fails because the IP is unique. Cost-plus on ScaleCo strips out its non-routine contribution and the shared risk it bears.",
        verdict: "Profit split most appropriate"
      }
    ],
    takeaway:
      "Shared assumption of an economically significant risk is itself a trigger for profit split — not just unique and valuable contributions. The two indicators often appear together.",
    crossRefs: [
      "¶2.130 (unique and valuable contributions)",
      "¶2.137–2.143 (shared assumption of economically significant risks)"
    ]
  },

  {
    id: 6,
    theme: "when-ps",
    themeLabel: "When PS is appropriate",
    title: "Asset management — highly integrated portfolio teams",
    group: "ASSET Co",
    refs: "Annex II Ch.II · Example 6 · ¶26–33",
    atGlance:
      "FUND Co (independent) hires ASSET Co to manage two-country mirror funds. ASSET Co is a nominee — actual portfolio management is done jointly by Company A (Country A equity) and Company B (Country B equity) through a shared investment committee. Comparables exist for the bundled service but cannot split the fee between A and B. Method?",
    parties: {
      kind: "three-party-flow",
      first: { name: "FUND Co", role: "Independent · pays AUM fee" },
      second: { name: "ASSET Co (parent)", role: "Nominee · no functions, assets, risks" },
      third: { name: "Companies A & B", role: "Joint portfolio management · share fund-performance risk" },
      label1: "AUM fee →",
      label2: "split →"
    },
    timeline: [
      "Independent FUND Co hires ASSET Co to manage mirror funds and pays a fee based on combined AUM.",
      "ASSET Co contracts with Companies A and B to actually provide the portfolio management; ASSET Co performs no functions, contributes no assets, assumes no risks.",
      "Company A's specialists handle Country A equity; Company B's specialists handle Country B equity.",
      "A joint investment management committee (equal numbers from A and B) decides composition of the funds.",
      "Risk: retail investors withdrawing from poor-performing funds — Companies A and B share assumption of that risk."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Portfolio management itself isn't unique — there are bundled-fee comparables. But those comparables don't tell you how to split the fee between A and B. A and B's work is tightly integrated, and they share the risk of fund underperformance.",
        question: "What's the right method for paying A and B?",
        mcq: [
          "Transactional profit split of the arm's length fee from FUND Co, with ASSET Co compensated at zero.",
          "Split the AUM fee 50/50 between A and B based on committee composition.",
          "Apply TNMM to each of A and B separately using independent portfolio managers."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 6 (¶33), operations of A and B are so highly integrated and interdependent that a one-sided method cannot determine an arm's length outcome for either. Profit split is the most appropriate method; the FUND Co fee forms the revenue pool to be split between A and B. ASSET Co — performing no functions, holding no assets, assuming no risks — earns zero. A mechanical 50/50 ignores relative value of A's and B's contributions; separate TNMMs lack data on how to allocate between them.",
        verdict: "Profit split (A and B); ASSET Co = 0"
      }
    ],
    takeaway:
      "High integration plus shared risk can make profit split appropriate even when the underlying service itself is not unique. The trigger is whether you can reliably price either party in isolation — not whether comparables exist for the bundle.",
    crossRefs: [
      "¶2.137–2.143 (high integration · shared risk)",
      "¶2.135 (when one-sided methods cannot reliably reward each contribution)"
    ]
  },

  {
    id: 7,
    theme: "when-ps",
    themeLabel: "When PS is appropriate",
    title: "Trade facilitation — joint, seamless service across borders",
    group: "LM Corporation",
    refs: "Annex II Ch.II · Example 7 · ¶34–37",
    atGlance:
      "Companies L (Country L) and M (Country M) jointly provide cross-border freight-forwarding and customs brokerage to unrelated customers. They use a shared IT system, perform the same functions in mirror geographies, and depend on each other to complete each transaction. Pricing exists for the joint activity — but not for L or M separately. Method?",
    parties: {
      kind: "tested-party",
      left: { name: "Company L (Country L)", role: "Trade facilitation, freight forwarding, customs broking" },
      right: { name: "Company M (Country M)", role: "Same functions in mirror geography · shared IT" },
      arrowLabel: "joint service to external customers"
    },
    timeline: [
      "Companies L and M jointly provide trade facilitation, freight forwarding and customs broking to external customers.",
      "They perform the same value-adding functions in mirror geographies, depending on each other for the success of each transaction.",
      "They jointly purchased and continue improving an integrated goods-tracking IT system.",
      "Customers pay based on volume and weight. LM's value proposition: competitive pricing through efficiency, scale, scope and seamless cross-border integration."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "There are external comparables for the joint service, but L and M are so tightly integrated that a one-sided method can't price either side standalone. They probably also share the main risks.",
        question: "Which method best prices L and M?",
        mcq: [
          "Transactional profit split — high integration and interdependence; if risks are also shared, a split of actual profits is likely appropriate.",
          "Apply TNMM separately to L and to M using independent freight forwarders.",
          "CUP on the joint fee — comparables already exist for the bundle."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 7 (¶36–37), the high integration and interdependence make profit split the most appropriate method, and where economically significant risks are also shared, a profit split of actual profits is likely appropriate. Applying TNMM separately on L or M overlooks that the comparable pricing exists only for the joint activity — not for either side standalone.",
        verdict: "Profit split — actual profits if risks shared"
      }
    ],
    takeaway:
      "The choice between anticipated and actual profits to split is itself driven by the risk allocation. Shared risk points to actual; separately assumed risk points to anticipated.",
    crossRefs: [
      "¶2.137–2.143 (high integration · shared risk)",
      "¶2.158–2.162 (anticipated vs. actual profits)"
    ]
  },

  {
    id: 8,
    theme: "when-ps",
    themeLabel: "When PS is appropriate",
    title: "Contract manufacturing — no unique contribution by B",
    group: "M Group",
    refs: "Annex II Ch.II · Example 8 · ¶38–41",
    atGlance:
      "Company A directs the manufacturing of electronic devices subcontracted to Company B. B follows A's instructions, sources inputs (including a key component from A), and sells finished goods back to A. B has specific tooling and no other customer, so it is integrated with A — but its risks are not economically significant. Method?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A (parent)", role: "Exclusive distribution rights · directs manufacturing · key component supplier" },
      right: { name: "Company B", role: "Contract manufacturer · specific tooling · sole customer is A" },
      arrowLabel: "finished goods →"
    },
    timeline: [
      "Company A subcontracts manufacturing of electronic devices to Company B.",
      "Company B follows Company A's directions to produce the devices.",
      "Company B sources and supplies most materials; a key component is sourced from Company A.",
      "Company B has invested in tooling specifically adapted to the devices and has no other customer.",
      "Company B sells the finished goods to Company A, which markets and distributes to unrelated customers."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company B brings nothing unique or valuable; its risks aren't economically significant. There's some integration with Company A and B has only one customer — but B can still be benchmarked against comparable contract manufacturers.",
        question: "Is profit split the right method for B?",
        mcq: [
          "No — a one-sided method on Company B can reliably benchmark its contribution; profit split is unlikely to be most appropriate.",
          "Yes — operational integration and B's sole-customer dependence justify profit split.",
          "Yes — both parties' contributions to the supply chain warrant a split."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 8 (¶41), although B is integrated with and dependent on A, B makes no unique and valuable contribution and its risks are not economically significant. Comparable uncontrolled transactions enable a reliable one-sided method (e.g. cost-plus or TNMM on B). Integration alone is not enough — the integration indicator must come with the inability to reliably one-side either party.",
        verdict: "One-sided method on Company B"
      }
    ],
    takeaway:
      "Operational integration and customer concentration do not, by themselves, trigger profit split. The decisive question is whether reliable comparables exist for either party's contribution.",
    crossRefs: [
      "¶2.127 (when PS is not appropriate)",
      "Example 4 (companion — limited B-side contribution)"
    ]
  },

  {
    id: 9,
    theme: "when-ps",
    themeLabel: "When PS is appropriate",
    title: "Compound A + Enzyme B — combination creates value",
    group: "AB Inc",
    refs: "Annex II Ch.II · Example 9 · ¶42–45",
    atGlance:
      "ACo and BCo each developed unique components — Compound A and Enzyme B — for their own purposes. Neither has significant value on its own. Engineers from both discover that combined they create a highly valuable drug. ACo licenses Compound A to BCo, which combines and markets. Method?",
    parties: {
      kind: "tested-party",
      left: { name: "ACo (Country A)", role: "Worldwide patent on Compound A · originally unrelated purpose" },
      right: { name: "BCo (Country B)", role: "Worldwide patent on Enzyme B · combines and markets the drug" },
      arrowLabel: "right to use Compound A →"
    },
    timeline: [
      "ACo and BCo each independently develop their own component for different intended purposes.",
      "Neither component has significant value on its own.",
      "Engineers from both companies, working together, discover that combining Compound A with Enzyme B produces a unique and effective drug.",
      "ACo grants BCo the right to use Compound A; BCo combines the components and markets the resulting drug."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Each component alone is nearly worthless. They become unique and valuable only when combined.",
        question: "Which method best prices the right to use Compound A?",
        mcq: [
          "Transactional profit split — each contribution is unique and valuable when combined with the other.",
          "CUP using royalty rates for licences of unrelated compounds.",
          "Cost-plus on ACo's historical R&D for Compound A."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 9 (¶45), high integration and inter-dependency mean each contribution is unique and valuable in combination — so profit split is the most appropriate method. A CUP fails because the value emerges only from the specific combination. Cost-plus on ACo strips out the unique value of Compound A in this combination — which, alone, was practically worthless.",
        verdict: "Profit split most appropriate"
      }
    ],
    takeaway:
      "Uniqueness can emerge from combination, not just from a single contribution standing alone. Two items neither of which has standalone value can still be unique and valuable together.",
    crossRefs: [
      "¶2.130 (unique and valuable contributions)",
      "¶2.131 (uniqueness in combination)"
    ]
  },

  {
    id: 10,
    theme: "when-ps",
    themeLabel: "When PS is appropriate",
    title: "Key component — separate but interdependent risks",
    group: null,
    refs: "Annex II Ch.II · Example 10 · ¶46–50",
    atGlance:
      "Company A designs, produces and sells a new line of products. Company B has developed a unique key component that is the new line's point of difference and that cannot be used in any other product. Each company separately controls the risks for its own piece — but those risks are tightly interdependent. Method?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Designs · produces · sells the product line · bears production/sale risks" },
      right: { name: "Company B", role: "Develops the unique key component · bears component-development risks" },
      arrowLabel: "key component →"
    },
    timeline: [
      "Company A designs, develops and produces a line of high-tech industrial products.",
      "Company B develops a highly innovative key component, the new generation's point of difference.",
      "The key component is specifically tailored for this product line and cannot be used elsewhere.",
      "Each company performs the control functions and assumes the risks in its own domain — B for the component, A for overall production and sale.",
      "A cannot control (and so does not assume) the risk of how the key component performs."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "A and B each carry their own significant risks — but those risks are tightly linked. The product line lives or dies with the component, and the component has no other use.",
        question: "Which method best prices the component sale?",
        mcq: [
          "Transactional profit split — separately assumed but closely related (interdependent) economically significant risks point to profit split.",
          "Apply TNMM to Company B as a routine component supplier.",
          "CUP on the component price using independent specialty-component sales."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 10 (¶49), although A and B each assume separate economically significant risks, those risks are highly inter-dependent — so profit split is most appropriate. Per ¶50, splitting revenues or gross profits from the new product would also leave each party bearing the consequences of its own operating costs. A TNMM on Company B ignores its unique component IP; a CUP fails because the component is bespoke and has no other use.",
        verdict: "Profit split most appropriate"
      }
    ],
    takeaway:
      "Risk allocation is not binary. Risks can be separately assumed but closely related — and that interdependence is itself a profit-split indicator. Splitting at the gross-profit line keeps each party's own cost discipline.",
    crossRefs: [
      "¶2.137–2.143 (closely related risks)",
      "¶2.155–2.157 (measure of profits to split)"
    ]
  },

  /* ===================================================================
     APPLYING THE PROFIT SPLIT METHOD
     (Examples 11, 12, 13, 14, 15, 16)
     =================================================================== */

  {
    id: 11,
    theme: "ps-application",
    themeLabel: "Applying the PS method",
    title: "Residual analysis with R&D-cost splitter — worked numbers",
    group: null,
    refs: "Annex II Ch.II · Example 11 · ¶51–57",
    atGlance:
      "A manufactures a unique component (no reliable CUP); B incorporates it into the finished product (also using unique IP); C distributes (routine). Net combined profit of A and B is 10. Routine manufacturing returns are 10% of manufacturing cost. Residual is to be split on relative R&D expenditure (15 vs 10). What are A's and B's net profits?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Company A", role: "Designs & manufactures the key component · unique IP" },
      second: { name: "Company B", role: "Designs & manufactures the finished product · unique IP" },
      third: { name: "Company C", role: "Distributor · benchmarkable resale margin" },
      label1: "component →",
      label2: "finished product →"
    },
    timeline: [
      "Three group affiliates: Company A designs and manufactures a unique key component using its own IP; Company B incorporates that component into the finished product using its own IP; Company C is a routine distributor. No reliable CUP exists for A or B.",
      "A's sales to B = 50; B's sales to C = 100. Routine return on manufacturing cost = 10%.",
      "A's manufacturing cost = 15 → routine manufacturing profit for A = 1.5.",
      "B's manufacturing cost = 20 → routine manufacturing profit for B = 2.0.",
      "Combined net profit of A and B (before reallocation) = 10. Residual profit = 10 − (1.5 + 2.0) = 6.5.",
      "Relative R&D expenditure: A = 15, B = 10. Residual split: A = 6.5 × 15/25 = 3.9; B = 6.5 × 10/25 = 2.6."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Two-step residual split. Step 1: pay each manufacturer a routine return on its manufacturing cost. Step 2: split what's left in proportion to each side's R&D spend (the established proxy for their relative value contribution).",
        question: "What net profit does each of A and B end up with?",
        mcq: [
          "A = 5.4 (1.5 routine + 3.9 residual); B = 4.6 (2.0 routine + 2.6 residual).",
          "A = 3.9; B = 2.6 — only the residual share is paid.",
          "A = 5.0; B = 5.0 — equal split of the combined 10."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 11 (¶57), A's final net profit is 1.5 + 3.9 = 5.4; B's is 2.0 + 2.6 = 4.6. The routine return rewards manufacturing functions; the residual rewards each party's unique and valuable intangible contribution. Distributing only the residual ignores the routine reward. An equal split is arbitrary — it ignores that R&D expenditure was determined to be a reliable proxy for relative value (¶2.145 in the OECD footnote; broader splitting-factor guidance at ¶2.165–2.171).",
        verdict: "A = 5.4 · B = 4.6"
      }
    ],
    takeaway:
      "Residual profit split walks in two steps: route the routine returns first, then split what's left on a factor that proxies the relative value of the unique contributions. The note to Example 11 cautions that relative current R&D can need refinement for risk and for legacy IP.",
    crossRefs: [
      "¶2.165–2.171 (splitting factors)",
      "Section C.5.3.2 Ch.II (legacy IP refinements)"
    ]
  },

  {
    id: 12,
    theme: "ps-application",
    themeLabel: "Applying the PS method",
    title: "Residual split alongside a routine distributor",
    group: null,
    refs: "Annex II Ch.II · Example 12 · ¶58–63",
    atGlance:
      "Companies A and B jointly design and manufacture products (highly integrated; shared risks; unique contributions on both sides) and also distribute to their own markets. Company C distributes in Country C — benchmarkable. How do we combine a one-sided method on C with a residual profit split between A and B?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Companies A & B", role: "Joint design/manufacturing + own-market distribution · unique IP" },
      second: { name: "Company C", role: "Distribution in Country C · benchmarkable" },
      third: { name: "External customers", role: "Buy in Countries A, B, C" },
      label1: "products →",
      label2: "sales →"
    },
    timeline: [
      "Companies A and B undertake design and manufacturing in a highly integrated manner and each distributes in its own home market.",
      "Company C performs benchmarkable marketing and distribution of A's and B's products to customers in Country C.",
      "Functional analysis: A and B share assumption of the design/manufacturing risks and both make unique and valuable contributions.",
      "Sales in Countries A, B and C all form part of the relevant profits to be split between A and B."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Profit split is right for A and B. Company C is routine — its return can be set with a one-sided method (resale price or TNMM).",
        question: "How do you build the profit pool and allocate it?",
        mcq: [
          "Take Country C's sales revenue, subtract C's arm's length return; combined with sales in Countries A and B that becomes the pool; A and B receive routine returns on their less-complex activities then split the residual on relative contributions.",
          "Split all combined profit (incl. C's) between A, B and C on relative sales.",
          "Apply profit split only to A and B's intercompany flows, ignoring Country C sales altogether."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 12 (¶62–63), Country C sales feed into the pool through C's revenue less C's arm's length return. The first step of the residual approach assigns routine returns to A's and B's benchmarkable functions; step two splits the residual on their relative contributions to it. Including C in the split ignores the determination that C makes no unique and valuable contribution. Excluding Country C sales understates the pool that A's and B's unique contributions actually generate.",
        verdict: "Residual split between A & B; one-sided return for C"
      }
    ],
    takeaway:
      "Profit split and one-sided methods coexist. Strip out the routine party's arm's length return first, then split what's left among the parties that make unique and valuable contributions.",
    crossRefs: [
      "¶2.150–2.154 (residual analysis)",
      "¶2.165–2.171 (splitting factors)"
    ]
  },

  {
    id: 13,
    theme: "ps-application",
    themeLabel: "Applying the PS method",
    title: "Retail franchise — anticipated vs. actual profits",
    group: "Retail Group",
    refs: "Annex II Ch.II · Example 13 · ¶64–72",
    atGlance:
      "Company A grants Company B the right to use Retail Group's know-how and trademark in Country B. Both make unique and valuable contributions. Should the split be applied to anticipated profits or to actual profits? The answer turns on who shares the economically significant risks of commercialisation.",
    parties: {
      kind: "tested-party",
      left: { name: "Company A (parent)", role: "Owns know-how and trademark · in-house brand-building" },
      right: { name: "Company B (Country B)", role: "Country B retail · in-house marketing team · strong local track record" },
      arrowLabel: "licence of know-how + trademark →"
    },
    timeline: [
      "Company A has built the trademark and goodwill through intensive marketing; the intangibles are not HTVI.",
      "Company A grants Company B the right to use the know-how and trademark for fashion retail in Country B.",
      "Company B has its own marketing team and a track record of building brand recognition in Country B.",
      "Both parties make unique and valuable contributions; profit split is determined to be the most appropriate method."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Scenario 1: Company A does NOT share in the economically significant risks tied to Company B's marketing and exploitation of the licensed IP.",
        question: "Split anticipated profits, or actual ones?",
        mcq: [
          "Anticipated profits — Company A doesn't share Company B's economically significant risks; e.g. a DCF of B's expected profits, with payment as lump sum or sales-based royalty.",
          "Actual profits — any profit split must always look at outcomes once known.",
          "Anticipated profits, but only over a fixed five-year window."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 13 Scenario 1 (¶68–70), where Company A does not share the relevant risks, profit split is applied to anticipated profits (e.g. DCF over an appropriate period, with payment by lump sum or sales-based royalty). Splitting actual profits in this case would have Company A bearing the consequences of risks it does not control or assume. The relative value of contributions sets the split ratio (¶2.158–2.162).",
        verdict: "Anticipated profits"
      },
      {
        letter: "B",
        facts:
          "Scenario 2: A and B jointly run marketing and distribution and both bear the risks of how Country B commercialisation goes.",
        question: "Split anticipated profits, or actual ones?",
        mcq: [
          "Actual profits — both parties share the assumption of the economically significant risks, so each shares the upside and downside as outcomes materialise.",
          "Anticipated profits — profit split should always lock in expectations ex ante.",
          "Anticipated for the first year, then actual thereafter."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 13 Scenario 2 (¶71–72), where both parties share the assumption of the economically significant risks, profit split applies to actual profits achieved from sales by Company B. The relative value of contributions still drives the split ratio. Mechanically locking in anticipated profits would frustrate the risk-sharing the parties have agreed.",
        verdict: "Actual profits"
      }
    ],
    takeaway:
      "Choice between anticipated and actual profits follows the risk allocation. Risk borne by one party → split anticipated profits; risk shared → split actual profits.",
    crossRefs: [
      "¶2.158–2.162 (anticipated vs. actual)",
      "Chapter VI · Sections D.2.6.3 and D.2.6.4 (DCF valuation)"
    ]
  },

  {
    id: 14,
    theme: "ps-application",
    themeLabel: "Applying the PS method",
    title: "Choice of profit measure — operating vs gross",
    group: null,
    refs: "Annex II Ch.II · Example 14 · ¶73–77",
    atGlance:
      "Same residual setup for two manufacturers A and B with unique intangible expenditure, split on relative intangible expenditure. The illustration shows the consequence of choosing different profit measures (operating profit vs. operating profit before overhead; before vs. after intangible expenditure). Which choice changes the allocation?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Manufactures widgets · COGS 60 · IP spend 30 · overhead 3" },
      right: { name: "Company B", role: "Manufactures widgets · COGS 170 · IP spend 40 · overhead 6" },
      arrowLabel: "share IP; sell to third parties"
    },
    timeline: [
      "Companies A and B are two related-party widget manufacturers that each contribute unique and valuable IP and sell to third parties; profit split using a residual approach has been determined as the most appropriate method, with the residual split on relative current-year IP expenditure.",
      "Sales: A = 100, B = 300. COGS: A = 60, B = 170. Overhead: A = 3, B = 6. Other operating: A = 2, B = 4.",
      "IP expenditure: A = 30, B = 40 (combined 70). Combined operating profit = 85.",
      "Step 1: each manufacturer earns COGS + 10% as routine return. A's routine = 6; B's = 17 (total 23).",
      "Step 2 (a): residual = 85 − 23 = 62, split 30/70 to A (26.57) and 40/70 to B (35.43).",
      "Step 2 (b): if overhead is excluded from the pool, residual rises to 71; A's net stays at allocate-then-deduct outcome 33.43, B's 51.57."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Scenario 1: should the residual pool be operating profit, or operating profit before overhead is deducted?",
        question: "Does this choice change the split between A and B?",
        mcq: [
          "It changes the allocation — including/excluding overhead shifts amounts (e.g. 32.57/52.43 vs. 33.43/51.57). The choice must be consistent with the accurate delineation of the transaction.",
          "It never changes the allocation — accounting choices cannot affect arm's length results.",
          "It only changes the allocation when one party has a loss."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 14 Scenario 1 (¶74–75), excluding overhead leaves each party responsible for its own overhead — and shifts total profits to A from 32.57 to 33.43 and to B from 52.43 to 51.57. The decision whether to exclude items must follow the accurate delineation of the transaction. The choice is not cosmetic.",
        verdict: "Choice matters · must follow delineation"
      },
      {
        letter: "B",
        facts:
          "Scenario 2: the splitter is current-year IP spend. Should the residual pool be measured before or after deducting that same IP spend?",
        question: "Does this choice affect the split?",
        mcq: [
          "No — when the splitter relies on the current-year expense, before-or-after-deduction yields the same allocation; outcomes can differ if the splitter is based on accumulated expenditure across years.",
          "Yes — the residual must always be measured after deducting the expense used as splitter.",
          "Yes — measuring residual before the splitter expense always favours the party with higher current spend."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 14 Scenario 2 (¶76–77), when the splitter relies on a category of current-period expense, splitting before vs. after that expense is deducted is mathematically irrelevant — both produce the same allocation. The outcome can differ when the splitter uses accumulated expenditure across prior and current years.",
        verdict: "Same allocation when splitter uses current-period expense"
      }
    ],
    takeaway:
      "Choice of profit measure is a substantive decision — not a presentation choice. Decide which costs and items belong in the pool by reference to the accurate delineation. When the splitter and the pool reference the same current-period item, the maths is invariant.",
    crossRefs: [
      "¶2.155–2.157 (measure of profits to split)",
      "¶2.165–2.171 (splitting factors)"
    ]
  },

  {
    id: 15,
    theme: "ps-application",
    themeLabel: "Applying the PS method",
    title: "Asset-based splitting factor",
    group: null,
    refs: "Annex II Ch.II · Example 15 · ¶78–82",
    atGlance:
      "Companies A and B jointly design and manufacture in a highly integrated way, share the assumption of design/manufacturing risks, and each makes unique and valuable contributions. There are no comparable uncontrolled transactions and no direct evidence of how independents would split. What splitting factor is appropriate?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A (Country A)", role: "Design + manufacturing · sells in Country A · unique IP" },
      right: { name: "Company B (Country B)", role: "Design + manufacturing · sells in Country B · unique IP" },
      arrowLabel: "components, moulds, semi-finished products ↔"
    },
    timeline: [
      "Companies A and B run highly integrated design and manufacturing operations.",
      "They exchange components, moulds and semi-finished products as needed to meet customer demand.",
      "Each company has developed unique and valuable design and manufacturing know-how.",
      "Risk analysis: A and B share assumption of the design/manufacturing risks; both perform relevant control functions.",
      "No comparable uncontrolled transactions exist; no direct evidence of how independents would have split."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Profit split is the right method. With no CUPs and no evidence of how independents would split, the team is considering an asset-based splitting factor. Asset creation appears to track value creation here.",
        question: "Can an asset-based splitter be used?",
        mcq: [
          "Yes — provided the functional analysis concludes that there is a strong correlation between the assets of A and B and value creation in their controlled transactions.",
          "No — splitting factors must always be expense-based to be objective.",
          "Yes — asset-based splitters are always preferred over cost-based ones."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 15 (¶82), an asset-based splitter may be appropriate provided the functional analysis concludes that there is a strong correlation between the assets of A and B and the creation of value in their controlled transactions. Expense-based splitters are not the only option (¶2.176–2.181); asset-based splitters are not always preferred — the right splitter depends on the facts.",
        verdict: "Asset-based splitter (subject to correlation test)"
      }
    ],
    takeaway:
      "There is no default splitter. Pick the factor that has a strong, demonstrable correlation with the value created by the parties' unique contributions. Cost, asset, headcount, time — all are possible; all need justification.",
    crossRefs: [
      "¶2.165–2.171 (selecting splitting factors)",
      "¶2.176–2.181 (asset-based splitters)"
    ]
  },

  {
    id: 16,
    theme: "ps-application",
    themeLabel: "Applying the PS method",
    title: "Greenfield development split — and the CCA comparison",
    group: null,
    refs: "Annex II Ch.II · Example 16 · ¶83–85",
    atGlance:
      "Companies A, B and C jointly develop a new product greenfield — no pre-existing contributions. Each is responsible for one of three key components. The functional analysis concludes that the relative expenses incurred by each company in development directly proxy relative value contributed. How should the resulting profits (or losses) be allocated?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Company A", role: "Develops & manufactures component 1" },
      second: { name: "Company B", role: "Develops & manufactures component 2" },
      third: { name: "Company C", role: "Develops & manufactures component 3" },
      label1: "joint dev →",
      label2: "joint dev →"
    },
    timeline: [
      "Companies A, B and C jointly agree to share the greenfield development of a new product.",
      "None of them brings existing intangibles or other contributions of value to the project.",
      "Each company is responsible for developing and manufacturing one of the three key components.",
      "Functional analysis concludes that relative expenses incurred by each company in component development directly correlate with relative value contributed."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Profit split is the right method. Relative development spend across A, B and C is a reliable proxy for relative value contributed.",
        question: "How should profits (or losses) be allocated between A, B and C?",
        mcq: [
          "Split based on each company's relative development cost — yielding results similar to an analogous cost contribution arrangement.",
          "Equal three-way split — three parties to a greenfield project.",
          "Allocate all profit/loss to the parent."
        ],
        correctIdx: 0,
        analysis:
          "Per Annex II Ch.II · Example 16 (¶84–85), relative development costs directly correlate with relative value contributed, so they are an appropriate splitter. The result is similar to an analogous CCA outcome (see ¶8.4) because parties with similar economic characteristics should receive similar expected returns regardless of whether the arrangement is formally termed a CCA. An equal split ignores the established correlation between cost and value.",
        verdict: "Split on relative development costs"
      }
    ],
    takeaway:
      "Splitting profits in a greenfield development based on relative development costs converges economically with an analogous CCA outcome. Form follows substance — labelling an arrangement \"profit split\" or \"CCA\" should not change the arm's length result.",
    crossRefs: [
      "¶2.165–2.171 (splitting factors)",
      "¶8.4 (CCA vs. profit split convergence)"
    ]
  }

];
