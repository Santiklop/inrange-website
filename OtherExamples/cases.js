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
          "TestCo and CompCo are otherwise comparable on a TNMM/EBIT-on-sales basis, but TestCo tends to carry more working capital (4 of 5 years, with longer customer credit and inventory days and similar supplier days). Reliable trade-receivables, inventory, and payables data are available for CompCo year-by-year, plus a market-rate interest cost.",
        question: "Should a working-capital adjustment be made?",
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
          "The analyst is now choosing the interest rate to apply to the (R + I − P)/Sales difference. TestCo borrows in its local market at a rate around 5%. CompCo operates in a different market with notably different borrowing rates. Period-end balances are being used for the working-capital computation.",
        question: "Which interest rate is the right reference, and what should the analyst flag?",
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
          "Total value of contributions = 5 700; each party should bear 50% = 2 850. A's in-kind contribution at value is 3 600; B's is 2 100. The 'absent the CCA' alternative is a market purchase between A and B at arm's-length values: B would buy 15 units of Service 1 (1 800) and A would buy 10 units of Service 2 (1 050) — net 750 from B to A.",
        question: "What balancing payment from B to A makes the CCA produce an arm's-length result?",
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
      "Step 1: contributions measured at COST. Total cost 5 000 → each bears 50% = 2 500.",
      "A's cost contribution = 3 000; B's = 2 000. B pays A 500 (cost-share balancing payment).",
      "Step 2: account for the additional VALUE A contributes above cost.",
      "A consumes 10 units of Service 2 (value-over-cost 50); B consumes 15 units of Service 1 (value-over-cost 300). Net additional value from A = 250."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "After Step 1 (500 from B to A), Step 2 settles the value differential. A contributes 250 of value above cost beyond what B contributes (300 − 50). B must pay A another 250 in respect of the additional pre-existing/value contributions A has brought to the CCA.",
        question: "What's the total transfer under the two-step method, and how does it compare to Example 1?",
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
      "Both services are low-margin: Service 1 = 103/unit, Service 2 = 105/unit (cost 100 each).",
      "30 units of Service 1 + 20 units of Service 2 produced; each company consumes 50% of each.",
      "At value: total contributions 5 190, each bears 2 595, B tops up A by 495.",
      "At cost: total cost 5 000, each bears 2 500, B tops up A by 500."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The difference between contributions-at-value (495) and contributions-at-cost (500) is small in absolute terms and the services are low-value in nature. The analyst wants a practical shortcut.",
        question: "Is it acceptable to value contributions at cost in this scenario?",
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
      "Same architecture as Example 1, but Service 2 now also has cost 100 / value 120 per unit.",
      "30 units of Service 1 + 20 units of Service 2 produced; each company consumes 50% of each.",
      "At value: total 6 000, each bears 3 000, B tops up A by 600.",
      "At cost: total 5 000, each bears 2 500, B tops up A by 500."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Both services carry an identical 20% mark-up on cost. Intuitively the cost-based shortcut might seem to work.",
        question: "Does the identical mark-up mean contributions-at-cost gives an arm's-length result?",
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
          "A controls the risks it contractually assumes (per ¶8.14–8.18). Its arm's-length anticipated return on the funding investment is USD 110m/yr. The CCA's structure gives A USD 330m/yr — USD 220m/yr more than its funding return justifies. That excess reflects the value of B's pre-existing intangibles + R&D activity.",
        question: "What balancing flow restores the arm's-length result?",
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
          "A's CCA participation looks fine on paper but has no functional substance: no people, no decisions, no capacity to mitigate or assess. B does everything that matters for the risk.",
        question: "What does accurate delineation conclude about A's entitlement under the CCA?",
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
  }

];
