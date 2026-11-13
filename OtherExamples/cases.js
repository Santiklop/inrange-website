// Single source of truth for the case content rendered on the page.
// Each case must match the shape validated by scripts/validate-cases.mjs.
//
// Theme codes (used for sidebar grouping):
//   working-capital   → Working capital adjustment (Annex to Ch.III)
//   cost-contribution → Cost contribution arrangements (Annex to Ch.VIII)

globalThis.CASES = [

  /* ===================================================================
     WORKING CAPITAL ADJUSTMENT — Annex to Chapter III
     =================================================================== */

  {
    id: 1,
    theme: "working-capital",
    themeLabel: "Working capital adjustment",
    title: "Working capital adjustment",
    group: "TestCo vs CompCo · TNMM benchmarking",
    refs: "Annex to Ch.III · Working capital adjustment · ¶1–8 (cross-ref ¶3.47–3.54)",
    atGlance:
      "TestCo and CompCo carry materially different levels of receivables, inventory and payables. Should the comparable's result be adjusted before reading off an arm's-length range — and if so, how?",
    parties: {
      kind: "tested-party",
      left: { name: "TestCo", role: "Tested party (R + I − P ≈ 26% of sales)" },
      right: { name: "CompCo", role: "Selected comparable (R + I − P ≈ 24% of sales, fluctuating)" },
      arrowLabel: "comparability adjustment"
    },
    timeline: [
      "TNMM is the most appropriate method; EBIT/Sales is the chosen indicator.",
      "Five years of data are gathered for TestCo and one external comparable, CompCo.",
      "Working-capital levels (R + I − P / Sales) differ materially between TestCo (~25–29%) and CompCo (~20–29%, swinging).",
      "Analyst weighs whether to adjust CompCo's EBIT/Sales before testing TestCo against the range."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "TestCo carries more working capital than CompCo (longer customer credit and inventory days). Reliable yearly receivables, inventory and payables data are available for CompCo, plus a market interest rate.",
        question: "Should the comparable's result be adjusted for the working-capital gap?",
        mcq: [
          "Yes — but only because the reliability of the comparable will be improved and reasonably accurate adjustments can be made.",
          "Yes — any difference in receivables, inventory, or payables between tested party and comparable automatically triggers an adjustment.",
          "No — working-capital adjustments are never accepted in practice; raw comparable EBIT/Sales should be used."
        ],
        correctIdx: 0,
        analysis:
          "Annex to Ch.III · ¶1 and ¶8: working-capital adjustments may be warranted under TNMM (and, less commonly, cost plus or resale price) when the reliability of the comparables WILL BE IMPROVED and reasonably accurate adjustments can be made. They should not be made automatically and would not automatically be accepted by tax administrations. The mechanical 'always-adjust' option misses the reliability test; the 'never' option ignores ¶3.47–3.54 of the Guidelines.",
        verdict: "Adjust — when reliability improves"
      },
      {
        letter: "B",
        facts:
          "Time to pick the interest rate. TestCo borrows locally at ~5%; CompCo's market has very different rates. The analyst is using period-end balances.",
        question: "Whose borrowing rate should be used — and what should the analyst flag?",
        mcq: [
          "The rate at which the TESTED PARTY (TestCo) can borrow in its local market — typically a commercial loan rate — and flag that period-end balances may not represent the year (consider averages).",
          "The interest rate that maximises the adjustment in the tested party's favour.",
          "A risk-free rate, because the adjustment is for a comparability fix rather than a financing transaction."
        ],
        correctIdx: 0,
        analysis:
          "Annex to Ch.III · ¶8: the interest rate should generally be determined by reference to the rate(s) applicable to a commercial enterprise operating in the same market AS THE TESTED PARTY — in most cases a commercial loan rate. A negative working-capital balance may warrant a different rate. The example also flags that period-end balances may not be representative and averages might be better. Picking the rate to maximise outcome, or defaulting to risk-free, both ignore the OECD's reliability framing.",
        verdict: "Tested-party borrowing rate"
      }
    ],
    takeaway:
      "Working-capital adjustments under TNMM are a reliability tool, not a default. Make them when the differences are material AND reasonably measurable, use the tested party's market-rate borrowing cost, and watch the timing point (period-end vs averages).",
    crossRefs: [
      "¶3.47–3.54 (general guidance on comparability adjustments)",
      "¶2.64 (selecting the base for TNMM)",
      "Chapter III Section A.6 (comparability adjustments)"
    ]
  },

  /* ===================================================================
     COST CONTRIBUTION ARRANGEMENTS — Annex to Chapter VIII
     =================================================================== */

  {
    id: 2,
    theme: "cost-contribution",
    themeLabel: "Cost contribution arrangements (Ch.VIII)",
    title: "Services CCA — contributions at value, not at cost",
    group: "Companies A & B · services CCA",
    refs: "Annex to Ch.VIII · Example 1 · ¶1–7",
    atGlance:
      "A and B each provide one service to the CCA; each consumes 50% of both. The two services have different cost/value margins. Should contributions be measured at cost or at value — and what balancing payment falls out?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Provides Service 1 (cost 100, value 120 per unit) — 30 units/year" },
      right: { name: "Company B", role: "Provides Service 2 (cost 100, value 105 per unit) — 20 units/year" },
      arrowLabel: "CCA — both consume 50% of total"
    },
    timeline: [
      "A produces Service 1 at cost 100/unit; arm's-length charge would be 120 → 30 units = cost 3 000, value 3 600.",
      "B produces Service 2 at cost 100/unit; arm's-length charge would be 105 → 20 units = cost 2 000, value 2 100.",
      "Each company consumes 50% of total contributions (value 2 850 each).",
      "Need to determine the balancing payment from B to A."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Total value of contributions = 5 700, so each side should bear 2 850. A's contribution at value is 3 600; B's is 2 100. If there were no CCA, A and B buying these services from each other on the open market would result in net 750 flowing from B to A.",
        question: "What balancing payment from B to A makes the CCA arm's-length?",
        mcq: [
          "750 — measure contributions at value (3 600 vs 2 100), so B tops up by 750. This matches the 'absent the CCA' arm's-length result.",
          "500 — measure contributions at cost (3 000 vs 2 000), so each bears 50% of total cost (2 500) and B tops up by 500.",
          "No payment is needed — both parties consume the same 50%, so each keeps its own contribution."
        ],
        correctIdx: 0,
        analysis:
          "Annex to Ch.VIII · Example 1 · ¶5–7. Under the CCA, each participant's contribution should correspond to its proportionate share of expected benefits (50%). At value, A contributes 3 600 and B contributes 2 100, so B must top up by 750. Crucially, the alternative-to-the-CCA scenario (independent market purchases) yields exactly 750 from B to A — confirming that contributions-at-value is the route to an arm's-length outcome. Contributions-at-cost (the 500 answer) systematically under-compensates the higher-value provider.",
        verdict: "Balancing payment 750 — at value"
      }
    ],
    takeaway:
      "Contributions to a CCA are assessed at value (arm's-length price), not at cost — that is the only way to produce results consistent with the arm's-length principle. The exception (low-value contributions where cost ≈ value) appears in Example 2.",
    crossRefs: [
      "¶8.26 (contributions at value)",
      "¶8.27 (alternative two-step method — see Example 1A)",
      "Example 2 (low-value services exception)"
    ]
  },

  {
    id: 3,
    theme: "cost-contribution",
    themeLabel: "Cost contribution arrangements (Ch.VIII)",
    title: "Two-step method — costs plus a separate value payment",
    group: "Companies A & B · services CCA",
    refs: "Annex to Ch.VIII · Example 1A · ¶8–11 (cross-ref ¶8.27)",
    atGlance:
      "Same facts as Example 1 — but instead of valuing all contributions at value up front, the parties run the CCA in two steps: a cost-share now, plus a separate payment for the additional value contributed. Does the answer change?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Same as Example 1: Service 1 at cost 100, value 120" },
      right: { name: "Company B", role: "Same as Example 1: Service 2 at cost 100, value 105" },
      arrowLabel: "two-step CCA settlement"
    },
    timeline: [
      "Two related companies A and B run a services CCA. A produces Service 1 (cost 100/unit, arm's-length value 120 — 30 units/year); B produces Service 2 (cost 100/unit, arm's-length value 105 — 20 units/year); each consumes 50% of both.",
      "Step 1: contributions measured at COST. Total cost 5 000 → each bears 50% = 2 500.",
      "A's cost contribution = 3 000; B's = 2 000. B pays A 500 (cost-share balancing payment).",
      "Step 2: account for the additional VALUE A contributes above cost.",
      "A consumes 10 units of Service 2 (value-over-cost 50); B consumes 15 units of Service 1 (value-over-cost 300). Net additional value from A = 250."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Step 1 transferred 500 from B to A (cost-share). Step 2 settles the value-over-cost differential: A's added value (300 − 50 = 250) means B owes A another 250.",
        question: "What's the total flow B → A — and how does it compare with the at-value answer from Example 1?",
        mcq: [
          "500 + 250 = 750 — identical to Example 1's contributions-at-value answer.",
          "500 — the cost share alone, because Step 2 only applies when pre-existing intangibles are involved.",
          "1 050 — sum the value-over-cost of every service exchanged."
        ],
        correctIdx: 0,
        analysis:
          "Annex to Ch.VIII · Example 1A · ¶9–11. The two-step approach (¶8.27) reaches the same answer (750) as contributions-at-value: 500 for the cost share + 250 for A's additional value contribution. ¶11 flags that the two-step method is particularly useful for DEVELOPMENT CCAs where one participant brings pre-existing contributions (e.g. intangibles). Skipping Step 2 (the 500 option) would systematically under-compensate the higher-value provider; double-counting (1 050) ignores the netting in the cost share.",
        verdict: "Same answer (750) — different mechanics"
      }
    ],
    takeaway:
      "The two-step method (¶8.27) is operationally different but economically equivalent to contributions-at-value: cost-share now, plus a separate payment for the additional value (often pre-existing intangibles) brought to the CCA. Most useful for development CCAs.",
    crossRefs: [
      "¶8.27 (two-step alternative)",
      "Example 1 (one-step contributions at value)",
      "Example 4 (development CCA, where the two-step framing is most natural)"
    ]
  },

  {
    id: 4,
    theme: "cost-contribution",
    themeLabel: "Cost contribution arrangements (Ch.VIII)",
    title: "Low-value services — cost as a practical proxy",
    group: "Companies A & B · low-margin services CCA",
    refs: "Annex to Ch.VIII · Example 2 · ¶12–14",
    atGlance:
      "Same CCA as Example 1, but the cost-to-value gap on each service is small enough that valuing contributions at cost produces broadly the same answer as valuing at value. Practical shortcut or sloppy practice?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Service 1 (cost 100, value 103 per unit) — low margin" },
      right: { name: "Company B", role: "Service 2 (cost 100, value 105 per unit) — low margin" },
      arrowLabel: "low-value services CCA"
    },
    timeline: [
      "Two related companies A and B run a services CCA: A produces Service 1, B produces Service 2, and each consumes 50% of each.",
      "Both services are low-margin: Service 1 = 103/unit, Service 2 = 105/unit (cost 100 each).",
      "30 units of Service 1 + 20 units of Service 2 produced; each company consumes 50% of each.",
      "At value: total contributions 5 190, each bears 2 595, B tops up A by 495.",
      "At cost: total cost 5 000, each bears 2 500, B tops up A by 500."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The gap between at-value (495) and at-cost (500) is small, and the services are low-value in nature. The analyst wants a shortcut.",
        question: "Can contributions be measured at cost here?",
        mcq: [
          "Yes — where all contributions to the CCA are LOW-VALUE services, valuing at cost achieves results broadly consistent with the arm's-length principle and is acceptable as a practical matter.",
          "No — Example 1 already established that contributions must be at value, with no exception.",
          "Only if both parties contribute identical numbers of units and at identical cost."
        ],
        correctIdx: 0,
        analysis:
          "Annex to Ch.VIII · Example 2 · ¶14. Where all contributions are LOW-VALUE SERVICES, the practical approach of valuing at cost will produce results broadly consistent with the arm's-length principle. The Example 1 rule still holds in general; Example 2 carves out a tightly scoped practical exception. The 'identical units / identical cost' option is not the OECD's condition — what matters is that the contributions themselves are low-value in nature.",
        verdict: "At cost OK for low-value services"
      }
    ],
    takeaway:
      "Contributions-at-value is the default, but for low-value services the practical at-cost approach gives a result close enough to be acceptable. The exception is narrow: it's about the NATURE of the contribution, not the convenience of the analyst.",
    crossRefs: [
      "Example 1 (general at-value rule)",
      "Ch.VII Section D (low value-adding intra-group services framework)"
    ]
  },

  {
    id: 5,
    theme: "cost-contribution",
    themeLabel: "Cost contribution arrangements (Ch.VIII)",
    title: "Identical mark-up doesn't justify cost-based contributions",
    group: "Companies A & B · symmetric-margin services CCA",
    refs: "Annex to Ch.VIII · Example 3 · ¶15–16",
    atGlance:
      "Now both services have the SAME 20% mark-up (cost 100, value 120). Surely you can just use cost — the mark-up is the same on both sides? Wrong. Here's why.",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Service 1 (cost 100, value 120) — 30 units" },
      right: { name: "Company B", role: "Service 2 (cost 100, value 120) — 20 units" },
      arrowLabel: "symmetric margins, asymmetric volumes"
    },
    timeline: [
      "Two related companies A and B run a services CCA: A produces Service 1 (cost 100/unit, value 120 — 30 units), B produces Service 2 (cost 100/unit, value 120 — 20 units). Each consumes 50% of each.",
      "Both services now carry the same 20% mark-up over cost.",
      "At value: total 6 000, each bears 3 000, B tops up A by 600.",
      "At cost: total 5 000, each bears 2 500, B tops up A by 500."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Both services carry the same 20% mark-up. Surely measuring contributions at cost would give the same answer as measuring at value?",
        question: "Does the identical mark-up rescue the cost-based shortcut?",
        mcq: [
          "No — A contributes more VOLUME (30 vs 20 units), so even with identical margins, the value gap (600) differs from the cost gap (500). Contributions must still be at value.",
          "Yes — when mark-ups are identical on both sides, contributions-at-cost is mathematically equivalent.",
          "Yes — provided each party consumes exactly 50% of each service."
        ],
        correctIdx: 0,
        analysis:
          "Annex to Ch.VIII · Example 3 · ¶16. Identical mark-up does NOT make at-cost equivalent to at-value, because the volumes (and therefore the absolute values) of each party's contribution differ. The example expressly illustrates that assessing contributions at cost will not result in an arm's-length outcome 'even in those situations in which the arm's length mark-up on the cost of contributions is identical.' The intuition that consumption symmetry rescues the cost approach also fails for the same reason.",
        verdict: "At value — even with equal mark-ups"
      }
    ],
    takeaway:
      "Don't be fooled by symmetric margins. Where contribution VOLUMES differ, contributions must still be valued at value to produce an arm's-length result. Symmetric mark-ups are a red herring.",
    crossRefs: [
      "Example 1 (general at-value rule)",
      "Example 2 (low-value services exception — narrow)"
    ]
  },

  {
    id: 6,
    theme: "cost-contribution",
    themeLabel: "Cost contribution arrangements (Ch.VIII)",
    title: "Development CCA — funding vs pre-existing intangibles",
    group: "Companies A & B · development CCA",
    refs: "Annex to Ch.VIII · Example 4 · ¶17–20 (cross-ref ¶8.14–8.18)",
    atGlance:
      "A funds the R&D; B brings pre-existing intangibles and runs the development. Anticipated profits are USD 550m/yr; A is allocated USD 330m/yr in benefits but its arm's-length funding return is only USD 110m/yr. Who owes whom — and how much?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Funder of R&D (USD 100m/yr × 5 years); RoW exploitation rights" },
      right: { name: "Company B", role: "Pre-existing intangibles + all R&D activity; Country B rights" },
      arrowLabel: "development CCA — funding + IP"
    },
    timeline: [
      "5-year development phase: A contributes USD 100m/yr funding; B contributes pre-existing intangibles + performs all R&D activities.",
      "Years 6–15: intangible expected to generate USD 550m/yr globally — A gets RoW (USD 330m/yr); B gets Country B (USD 220m/yr).",
      "A's arm's-length funding return for that risk level is determined to be USD 110m/yr (years 6–15).",
      "A is anticipated to reap USD 330m/yr — more than 3× its funding return. Where does the excess belong?"
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "A actually controls the risks it took on. Its arm's-length funding return is 110m/yr — but the CCA structure hands A 330m/yr. The 220m/yr excess reflects the value of B's pre-existing IP and its R&D work.",
        question: "What balancing payment fixes the result?",
        mcq: [
          "A pays B (in present-value terms) the USD 220m/yr excess A is anticipated to receive over and above its arm's-length funding return — a balancing payment for B's pre-existing contributions.",
          "B pays A — A is contributing scarce capital and should keep all USD 330m/yr.",
          "No balancing payment — the territorial split (RoW vs Country B) is itself the consideration and nothing more needs to flow."
        ],
        correctIdx: 0,
        analysis:
          "Annex to Ch.VIII · Example 4 · ¶20. A's contribution is funding; B's contribution combines pre-existing intangibles AND the development activity. A's arm's-length return for the funding risk is USD 110m/yr — but the CCA hands A anticipated profits of USD 330m/yr. The excess of USD 220m/yr per year (in PV terms) is properly attributable to B's pre-existing contributions and must be paid to B as a balancing payment. The 'B pays A' answer mistakes funding for the principal economic contribution; the 'no payment' answer ignores that the territorial split itself only makes sense once B's pre-existing IP is paid for.",
        verdict: "A pays B — for the pre-existing IP"
      }
    ],
    takeaway:
      "In development CCAs, funding earns a funding return — not a residual. When the territorial split hands the funder more than its risk-adjusted funding return, the excess belongs to the participant that brought the pre-existing intangibles and ran the development.",
    crossRefs: [
      "¶8.14–8.18 (control of risk in a CCA)",
      "Chapter VI (IP valuation — for valuing B's contribution)",
      "Example 5 (same facts, but A lacks risk control)"
    ]
  },

  {
    id: 7,
    theme: "cost-contribution",
    themeLabel: "Cost contribution arrangements (Ch.VIII)",
    title: "Development CCA — funder with no risk control",
    group: "Companies A & B · development CCA, no risk control at A",
    refs: "Annex to Ch.VIII · Example 5 · ¶21–22 (cross-ref ¶8.15)",
    atGlance:
      "Same development CCA as Example 4 — except A's functional analysis reveals no capability to decide on, mitigate, or even monitor the risks it has contractually assumed. Does A still earn a share of the output?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Contractual funder; NO capacity to control CCA risks" },
      right: { name: "Company B", role: "Pre-existing intangibles, R&D activity, AND risk control" },
      arrowLabel: "delineation under ¶8.15"
    },
    timeline: [
      "Same starting facts as Example 4: A funds, B contributes IP + R&D, intangible expected to generate USD 550m/yr.",
      "Functional analysis: A has no capacity to decide on or decline the risks under the CCA, no capability to mitigate them, and cannot assess B's risk-mitigation activities.",
      "Accurate delineation of the transactions associated with the CCA proceeds under Section D.1 of Chapter I and ¶8.15.",
      "Conclusion changes: A is no longer treated as a participant entitled to a share in the CCA output."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "A is a participant on paper only — no people, no decisions, no ability to mitigate or even assess the risks. B does everything that matters.",
        question: "Is A still entitled to a share of the CCA's output?",
        mcq: [
          "A does not control its specific risks under the CCA per ¶8.15 — consequently A is NOT entitled to a share in the output that is the objective of the CCA.",
          "A is still a CCA participant because it provided the funding, and the funding return alone is enough.",
          "A is still entitled to the output share contractually allocated, but at a discount for the missing functions."
        ],
        correctIdx: 0,
        analysis:
          "Annex to Ch.VIII · Example 5 · ¶22 is explicit: where the functional analysis shows that A does not control its specific risks under the CCA in accordance with ¶8.15, A is not entitled to a share in the output of the CCA. This mirrors the control-of-risk framework in Section D.1 of Chapter I — a contractual allocation of risk to a party that doesn't control it (and doesn't have the financial capacity to bear it) doesn't hold for TP purposes. The 'funding alone is enough' answer is exactly what ¶8.15 rules out; the 'discounted share' answer invents a half-measure the OECD doesn't endorse.",
        verdict: "Not a participant — no output share"
      }
    ],
    takeaway:
      "Funding without risk control doesn't make you a participant in a CCA. The control-of-risk test (¶8.15, echoing Section D.1 of Ch.I) decides who is in the arrangement for TP purposes — and contractual designations don't override it.",
    crossRefs: [
      "¶8.15 (control of risk in a CCA)",
      "Section D.1.2.1 of Chapter I (six-step risk framework)",
      "Example 4 (same facts, with risk control intact)"
    ]
  },

{
  id: 8,
  theme: "tested-party",
  themeLabel: "Choosing the tested party (Ch.III)",
  title: "Two products, one manufacturer: choosing the tested party",
  group: "Company A · Company B",
  refs: "Chapter III · ¶3.19",
  atGlance:
    "Company A manufactures P1 and P2 and sells both product types to Company B, an associated enterprise in a different country. For P1 the valuable, unique intangibles and the technical specifications are B's; for P2 the valuable, unique intangibles are A's own and B acts as distributor. Which company would most often be the tested party for each product?",
  parties: {
    kind: "tested-party",
    left: { name: "Company A", role: "Manufactures P1 and P2 · owns the intangibles used for P2" },
    right: { name: "Company B", role: "In another country · owns the intangibles used for P1 · distributor of P2" },
    arrowLabel: "sales of P1 and P2"
  },
  timeline: [
    "Company A is the manufacturer of two types of products, P1 and P2.",
    "Company B, which buys both from A, is an associated enterprise in a different country.",
    "A makes P1 with valuable, unique intangibles belonging to B and works to technical specifications that B sets.",
    "For P2, the valuable, unique intangibles (such as valuable patents and trademarks) are ones that A itself owns and uses, and B acts as distributor."
  ],
  scenarios: [
    {
      letter: "A",
      facts:
        "P1: the valuable, unique intangibles used to make the product belong to B, and B sets the technical specifications that A follows. A's own part in the transaction is limited to simple functions, with no valuable, unique contribution.",
      question: "Which company would most often be the tested party for the P1 transaction?",
      mcq: [
        "Company A, because it performs only simple functions and makes no valuable, unique contribution to the P1 transaction.",
        "Company B, because it owns the valuable, unique intangibles used for P1 and sets the technical specifications.",
        "Either company, because both are parties to the P1 transaction and the taxpayer may test whichever it prefers."
      ],
      correctIdx: 0,
      analysis:
        "A tested party is needed whenever a cost plus, resale price or transactional net margin method is applied, and the choice should be in line with the functional analysis of the transaction (¶3.18). The general rule turns on reliability: the tested party is the one for which the method, and the comparables found for it, are the most reliable, and that will most often be the party with the less complex functional analysis. For P1 the valuable, unique intangibles belong to B, while A performs only simple functions and makes no valuable, unique contribution. On those facts A is the party that would most often be tested for P1.",
      verdict: "Most often Company A"
    },
    {
      letter: "B",
      facts:
        "P2: the valuable, unique intangibles, such as valuable patents and trademarks, are owned and used by A, and B's role is that of distributor. B's part in the transaction is limited to simple functions, with no valuable, unique contribution.",
      question: "Which company would most often be the tested party for the P2 transaction?",
      mcq: [
        "Company B, because it performs only simple functions and makes no valuable, unique contribution to the P2 transaction.",
        "The same company as for P1, because one tested party should be used for every transaction between the same two companies.",
        "Company A, because it is the manufacturer, and a manufacturer's mark-up on costs is the natural indicator to test."
      ],
      correctIdx: 0,
      analysis:
        "For P2 the positions are reversed. A owns and uses the valuable, unique intangibles, such as valuable patents and trademarks, while B acts as distributor, performs only simple functions and makes no valuable, unique contribution. B is therefore the party that would most often be tested for P2. The same two companies would thus most often have a different tested party for each product, because what guides the choice is the functional analysis of each transaction (¶3.18).",
      verdict: "Most often Company B"
    }
  ],
  takeaway:
    "The tested party should be chosen for each transaction in line with its functional analysis, and will most often be the party with the less complex functional analysis. Between the same two companies that may be the manufacturer for one product and the distributor for another.",
  crossRefs: [
    "Section A.3.3 of Chapter III, ¶3.18 (general rule on the choice of the tested party)",
    "Chapter II (cost plus, resale price and transactional net margin methods, for which a tested party is chosen)"
  ]
},

{
  id: 9,
  theme: "cost-contribution",
  themeLabel: "Cost contribution arrangements (Ch.VIII)",
  title: "Contributions and benefits in a 75:25 development CCA",
  group: "Company A · Company B · development CCA",
  refs: "Chapter VIII · ¶8.33, 8.38",
  atGlance:
    "Company A and Company B conclude a CCA to develop intangibles, expecting 75% of the benefits to go to A and 25% to B. Each makes a pre-existing contribution, valued in the first year at 10 million for A and 6 million for B. Do the contributions match the expected benefits and, if not, who owes whom a balancing payment, and how much?",
  parties: {
    kind: "tested-party",
    left: { name: "Company A", role: "Country A · rest-of-world rights · 75% of expected benefits" },
    right: { name: "Company B", role: "Country B · Country B rights · 25% of expected benefits" },
    arrowLabel: "CCA to develop intangibles",
    note: "Each company is experienced in developing intangibles, has its own R&D personnel and controls its development risk under the CCA (¶8.14–8.16)."
  },
  timeline: [
    "Two members of an MNE group, Company A in Country A and Company B in Country B, enter into a CCA to develop intangibles; it entitles B to exploit them in Country B, while the rest of the world is for A to exploit.",
    "Sales are expected to split 75% for A and 25% for B, and the parties put their shares of the expected benefits from the CCA at 75:25.",
    "As pre-existing contributions, A brings in intangibles recently acquired from a third party and B brings in proprietary analytical techniques that it developed to improve efficiency and speed to market.",
    "The current contributions are of two kinds: day-to-day research, of which B is to perform 80% and A 20%, and its guidance by a leadership team staffed 90:10 in A's favour by the two companies.",
    "The pre-existing contributions are valued, in the first year, at 10 million (Company A) and 6 million (Company B)."
  ],
  scenarios: [
    {
      letter: "—",
      facts:
        "Expected benefits are shared 75:25 between Company A and Company B. In the first year, A's pre-existing contribution is worth 10 million and B's 6 million.",
      question: "What balancing payment, if any, do these figures require?",
      mcq: [
        "Company A pays Company B a net 2 million, taking A's contribution to 12 million and B's to 4 million, in line with the 75:25 ratio.",
        "Company B pays Company A a net 2 million, because A has contributed 4 million more and that difference should be evened out.",
        "No balancing payment is required, because both companies have made pre-existing contributions and both take part in the research."
      ],
      correctIdx: 0,
      analysis:
        "Where participants' shares of the value contributed are out of line with their shares of the expected benefits, the arm's-length principle would generally require an adjustment, generally through a balancing payment (¶8.34). The pre-existing contributions come to 16 million, of which a 75:25 split would be 12 million for Company A and 4 million for Company B, against the 10 million and 6 million contributed. Company A is therefore required to pay Company B a net 2 million, since a balancing payment adds to the payer's contribution and reduces the payee's. The text sets the 2 million out as 4.5 million from A to B less 2.5 million from B to A (the working is not shown, but these equal 75% of B's 6 million and 25% of A's 10 million). The calculation covers the pre-existing contributions only: the text puts no value on the two kinds of current contributions, which ¶8.33 says should each be analysed and valued separately.",
      verdict: "A pays B 2 million"
    }
  ],
  takeaway:
    "Each participant's share of the value contributed to a CCA should be in line with its share of the expected benefits. Where it is not, the arm's-length principle would generally require a balancing payment, which adds to the payer's contribution and reduces the payee's.",
  crossRefs: [
    "Section C.5 of Chapter VIII, ¶8.34–8.37 (balancing payments)",
    "¶8.14–8.16 (determining participants: control of risk)",
    "Sections D.3 and D.4 of Chapter VI (hard-to-value intangibles)"
  ]
},

{
  id: 10,
  theme: "burden-of-proof",
  themeLabel: "Burden of proof (Ch.IV)",
  title: "When divergent burden of proof rules guide behaviour",
  group: "Taxpayers and tax administrations · two jurisdictions",
  refs: "Chapter IV · ¶4.14–4.15",
  atGlance:
    "Two jurisdictions are involved in a controlled transaction that is under examination. In one of them it is the taxpayer who carries the burden of proof, in the other the tax administration. If taxpayers and tax administrations take their strict legal rights under those rules as the guide to how they should behave, what follows?",
  timeline: [
    "A controlled transaction that is under examination involves two jurisdictions.",
    "In the first jurisdiction it is the taxpayer who carries the burden of proof.",
    "In the second jurisdiction it is the tax administration that carries it.",
    "The example assumes that the burden of proof guides behaviour: taxpayers and tax administrations rely on their strict legal rights under those rules to decide how to act."
  ],
  scenarios: [
    {
      letter: "A",
      facts:
        "In the first jurisdiction it is the taxpayer who carries the burden of proof, and in the second the tax administration does. The burden of proof is guiding behaviour: taxpayers and tax administrations take their strict legal rights under those rules as the guide to how they should behave.",
      question: "What could follow if the burden of proof guides behaviour in this way?",
      mcq: [
        "It could be that neither the tax administration in the first jurisdiction nor the taxpayer in the second tries to establish an acceptable arm's-length price, which would open the way to significant conflict and to double taxation.",
        "The two that carry the burden, the taxpayer in the first jurisdiction and the tax administration in the second, can each be expected to establish an arm's-length price, so the transaction is likely to be properly tested from both sides.",
        "Whatever the tax administration in the first jurisdiction asserts and the taxpayer accepts would settle the price for both jurisdictions, so the second tax administration could be expected to follow it and double taxation should not arise."
      ],
      correctIdx: 0,
      analysis:
        "If behaviour follows the burden of proof, the tax administration in the first jurisdiction might put forward a view of the transfer pricing without substantiating it, and the taxpayer might accept it. It would then be for the tax administration in the second jurisdiction, which carries the burden there, to disprove the pricing. It could be that the two with no burden to carry, the tax administration in the first jurisdiction and the taxpayer in the second, make no effort to establish an acceptable arm's-length price. Behaviour of that kind would open the way to significant conflict and to double taxation. ¶4.16 calls this a misuse of the burden of proof, one that jurisdictions and taxpayers alike should, in practice, avoid.",
      verdict: "Risks conflict and double taxation"
    },
    {
      letter: "B",
      facts:
        "The facts are the same and the burden of proof again guides behaviour, but the taxpayer in the first jurisdiction is now a subsidiary of a taxpayer in the second. The subsidiary may be unable or unwilling to show its transfer prices to be arm's length. The tax administration in the first jurisdiction examines the case and, acting in good faith on the information it has, makes an adjustment.",
      question: "What follows for the two tax administrations?",
      mcq: [
        "The parent is not obliged to give its own tax administration information showing the pricing was arm's length, and the two tax administrations will find it difficult to agree in competent authority proceedings.",
        "The tax administration in the second jurisdiction is expected to accept the adjustment and give corresponding relief, because the first acted in good faith after examining the case on the information available to it.",
        "The tax administration in the second jurisdiction will be well placed to contest the adjustment, because it carries the burden of proof and can therefore require the parent to supply the evidence that it needs."
      ],
      correctIdx: 0,
      analysis:
        "The subsidiary carries the burden of proof in the first jurisdiction, yet, notwithstanding that burden and the Guidelines, it may be unable or unwilling to demonstrate that its transfer prices are at arm's length; after examination, the tax administration there adjusts in good faith on the information it has. In the second jurisdiction the burden rests with the tax administration, so the parent is not obliged to give it any information showing that the pricing was arm's length. The result, according to the text, is that the two tax administrations will find agreement hard to reach in competent authority proceedings. ¶4.17 adds that in such proceedings it is for the State proposing the primary adjustment to satisfy the other State that both the principle and the amount of the adjustment are justified, and that a cooperative approach is expected of both competent authorities.",
      verdict: "Competent authority agreement difficult"
    }
  ],
  takeaway:
    "As a matter of good practice, neither tax administrations nor taxpayers should use the burden of proof to justify assertions about transfer pricing that are groundless or cannot be verified. Each should be prepared to show in good faith that its determination, or its pricing, is consistent with the arm's-length principle, wherever the burden of proof lies (¶4.16).",
  crossRefs: [
    "Section B.2 of Chapter IV (burden of proof)",
    "¶4.16 (good practice: care and restraint in relying on the burden of proof)",
    "¶4.17 (competent authority proceedings; Commentary on paragraph 2 of Article 9 of the OECD Model Tax Convention)"
  ]
}

];
