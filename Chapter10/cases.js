// Single source of truth for the case content rendered on the page.
// Each case must match the shape validated by scripts/validate-cases.mjs.
//
// Theme codes (used for sidebar grouping):
//   cash-pool-leader → Rewarding the cash pool leader

globalThis.CASES = [

  /* ===================================================================
     REWARDING THE CASH POOL LEADER (Examples 1, 2 — ¶10.132 onwards)
     =================================================================== */

  {
    id: 1,
    theme: "cash-pool-leader",
    themeLabel: "Rewarding the cash pool leader",
    title: "Cash pool leader as co-ordinator",
    group: "MNE Group X",
    refs: "Chapter X · ¶10.133–10.137",
    atGlance:
      "M sits at the legal centre of a physical cash pool — its account is what the bank sweeps to and from. But the credit risk stays with the members and X (the parent) guarantees M's facility. Service fee, or bank-like spread?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Third-party bank", role: "Provides facility; daily sweeps" },
      second: { name: "M", role: "Cash pool leader (sub of X)" },
      third: { name: "H · J · K · L", role: "Pool members (fellow subs of M)" },
      label1: "facility ↑ · sweeps ↓",
      label2: "target-balance transfers",
      note: "X (parent) guarantees M's facility but is not itself a pool participant. All participants share the same functional currency, which is the only currency in the pool."
    },
    timeline: [
      "X is the parent of an MNE group; subsidiaries H, J, K, L are pool participants and fellow sub M acts as cash pool leader.",
      "M signs a cash-management services agreement with an unrelated bank and sets a target balance for each pool participant.",
      "Each day, the bank moves cash to or from M's concentration account to hit each participant's target; net surplus is deposited by M, net deficits are met by the bank lending to M.",
      "Members H and J supply surplus; K and L draw funding. Interest on each member balance is charged or paid per the pooling agreement, and M pays less (or receives more) interest to the bank than absent the pool."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "M signs the bank agreement and runs the daily sweeps — but credit risk stays with the pool members, the bank takes credit risk on M, and the parent X guarantees M's facility.",
        question: "Is M a co-ordinator, a bank-like intermediary, or a real lender?",
        mcq: [
          "Co-ordination only — M does not bear credit risk and does not perform bank-like functions.",
          "Bank-like intermediation — M is the legal counterparty to every pool transaction, so it bears the economic risk.",
          "Principal lender — M lends to deficit members K and L on its own account."
        ],
        correctIdx: 0,
        analysis:
          "¶10.137. The functional analysis shows that M is not subject to credit risk — that risk remains with the cash pool members. M is not performing the functions or assuming the risks that a bank would. Being the legal counterparty to the sweeps does not, by itself, transfer the economic risk to M.",
        verdict: "Co-ordinator"
      },
      {
        letter: "B",
        facts:
          "M has been characterised as a pure co-ordinator — no credit risk, no bank-like functions. X guarantees its facility. Question now: how should M get paid?",
        question: "What's the right reward for M?",
        mcq: [
          "A service-fee-style reward commensurate with the co-ordination functions M provides.",
          "The interest spread between deposits and loans, since M is the legal counterparty on each leg.",
          "Pure cost reimbursement (no mark-up), since M's contribution is administrative in nature."
        ],
        correctIdx: 0,
        analysis:
          "¶10.137. M would not earn the kind of reward a bank earns — for example, retaining the interest spread between deposits and loans. Equally, the OECD frames the reward as commensurate with M's service functions, not as bare cost reimbursement. So a service-fee-style return is the right characterisation.",
        verdict: "Service-fee reward"
      }
    ],
    takeaway:
      "A co-ordinating cash pool leader earns a service-fee-style return, not the spread. The credit risk stays with the pool members, and the leader doesn't perform a bank's functions — so it shouldn't earn a bank's reward.",
    crossRefs: [
      "Section C.2.3.1 (rewarding the cash pool leader)",
      "¶10.143–10.145 (rewarding the cash pool members)",
      "Example 2 (treasury entity)"
    ]
  },

  {
    id: 2,
    theme: "cash-pool-leader",
    themeLabel: "Rewarding the cash pool leader",
    title: "Treasury entity as lender",
    group: "MNE Group y",
    refs: "Chapter X · ¶10.138–10.142",
    atGlance:
      "T runs the same kind of cash pool as M in Example 1 — but T also raises external finance, sets the intra-group rates and bears credit, liquidity and currency risk. Same architecture, very different reward.",
    parties: {
      kind: "three-party-flow",
      first: { name: "External lenders", role: "Bond markets · third-party banks" },
      second: { name: "Company T", role: "MNE group treasury entity" },
      third: { name: "Group members", role: "Borrowers within MNE Group y" },
      label1: "external funding",
      label2: "intra-group loans",
      note: "T also operates the group cash pool and bears credit, liquidity and currency risk on the intra-group leg — and decides how (or whether) to hedge."
    },
    timeline: [
      "T is the treasury entity of MNE Group y and transacts both intra-group and externally.",
      "T raises finance for the group by issuing bonds or borrowing from third-party banks.",
      "T arranges intra-group loans to meet the funding needs of other group members and operates a group-wide cash pool.",
      "T sets the intra-group interest rates and bears credit, liquidity and currency risk on the intra-group leg — and decides on hedging."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Unlike M in Example 1, T does substantive treasury work — it controls credit, liquidity and currency risks, has the money to bear them, sets the intra-group rates, and is on the hook for the spread between what it borrows at and what it lends at.",
        question: "How should T's intra-group activities be classified and rewarded?",
        mcq: [
          "Intra-group loans (not pure cash-pool co-ordination) — T may earn part or all of the spread between its borrowing and lending positions.",
          "Cash-pool co-ordination — T earns a service fee even though it actively manages the risks.",
          "Intra-group loans, but T may earn no more than a co-ordinator's fee because a cash pool is also part of its activity."
        ],
        correctIdx: 0,
        analysis:
          "¶10.140–10.141. T is performing functions and assuming risks that go beyond the co-ordination role of a cash pool leader, and T controls those risks with the capacity to bear them. The actual transactions are accurately delineated as intra-group loans, and T should be compensated for the functions performed and risks assumed — which may include part or all of the spread.",
        verdict: "Lender — may earn the spread"
      },
      {
        letter: "B",
        facts:
          "T's pricing looks arm's-length from T's side. But group member U — one of the borrowers from T — argues it could get cheaper funding directly from its own relationship bank.",
        question: "Does T's arm's-length pricing automatically settle the price for U?",
        mcq: [
          "No — the other group members would only deal with T at arm's length if doing so left them no worse off than their next best realistic option.",
          "Yes — once T's pricing is shown to be arm's length on T's side, group members must accept it.",
          "Yes — U must transact with T because of group treasury policy; arm's length only matters for T's tax administration."
        ],
        correctIdx: 0,
        analysis:
          "¶10.142. The other group members which transact with T would still only do so if this left them no worse off than their next best option. So if U's relationship-bank quote is genuinely the better realistic alternative, the arm's-length test is not satisfied just because T's side prices to T's lender benchmarks.",
        verdict: "Counterparty options matter"
      }
    ],
    takeaway:
      "When the entity at the centre of a cash pool actually controls — and has the capacity to bear — the financial risks, the substance is an intra-group lender, not a co-ordinator. The reward can include part or all of the spread, but counterparties still need to be no worse off than their next best option.",
    crossRefs: [
      "Section C.1 (intra-group loans)",
      "Section C.2.3.1 (rewarding the cash pool leader)",
      "Section D.1 of Chapter I (accurate delineation · risk control & capacity)",
      "Example 1 (co-ordinator)"
    ]
  },

{
  id: 3,
  theme: "loans",
  themeLabel: "Delineating intra-group loans",
  title: "A 10-year loan the borrower could not service",
  group: "Company B · Company C",
  refs: "Chapter X · ¶10.13",
  atGlance:
    "Company B, which belongs to an MNE group, needs more funding for its business and receives an advance from related Company C, labelled a 10-year loan. Company B's good-faith financial projections for those 10 years make clear that it could not service a loan of that amount. How much of the advance is a loan for transfer pricing purposes?",
  parties: {
    kind: "tested-party",
    left: { name: "Company C", role: "Related company · advances the funds" },
    right: { name: "Company B", role: "MNE group member · needs additional funding" },
    arrowLabel: "advance labelled a 10-year loan"
  },
  timeline: [
    "Company B belongs to an MNE group and needs more funding for its business activities.",
    "A related company, Company C, advances the funds; the advance is labelled a 10-year loan.",
    "Every good-faith financial projection for Company B over the next 10 years shows clearly that it could not service a loan of that amount."
  ],
  scenarios: [
    {
      letter: "—",
      facts:
        "The advance is labelled a 10-year loan. Company B's good-faith financial projections for that period make clear that it could not service a loan of that amount.",
      question: "How much of Company C's advance is delineated as a loan for transfer pricing purposes?",
      mcq: [
        "An amount that depends on the most an unrelated lender would have advanced and an unrelated borrower would have borrowed; the rest is not a loan for interest purposes.",
        "The whole advance, because the parties labelled it a 10-year loan and the label that they chose settles how the advance is characterised for pricing purposes.",
        "The whole advance, but at a higher interest rate, one that compensates the lender for the risk that Company B will prove unable to repay what it has borrowed."
      ],
      correctIdx: 0,
      analysis:
        "¶10.13. The facts and circumstances support the conclusion that an unrelated party would not have made such a loan to Company B, because Company B could not repay it. The amount accurately delineated as a loan is therefore a function of two maximums: what an unrelated lender would have been prepared to advance to Company B, and what a comparably placed unrelated borrower would have been prepared to borrow from Company C. Either may be nil. The remainder of the advance is not delineated as a loan when determining the arm's-length interest payable by Company B. The example does not say what the remainder is instead, although ¶10.10 names a contribution to equity capital in particular as the other kind of payment a purported loan may turn out to be.",
      verdict: "Remainder is not a loan"
    }
  ],
  takeaway:
    "Calling an advance a loan does not make all of it a loan: under accurate delineation, the amount delineated as a loan depends on what an unrelated lender would have lent and an unrelated borrower would have borrowed. The Guidelines give this guidance for jurisdictions that use accurate delineation to decide whether a purported loan is a loan (¶10.10).",
  crossRefs: [
    "Section B.1 (whether a purported loan should be regarded as a loan)",
    "Section C.1.1.1 (the lender's and borrower's perspectives)",
    "¶10.12 (indicators for delineating an advance of funds)"
  ]
},

{
  id: 4,
  theme: "loans",
  themeLabel: "Delineating intra-group loans",
  title: "A lender that does not control the risks",
  group: "Company A · Company B · Company P",
  refs: "Chapter X · ¶10.25",
  atGlance:
    "Company A advances funds to Company B but, as accurate delineation shows, performs no control functions in relation to the advance. Company P, the MNE group's parent company, exercises control over the risks of the advance and has the financial capacity to assume them. What return is Company A entitled to?",
  parties: {
    kind: "tested-party",
    left: { name: "Company A", role: "Advances the funds · no control functions" },
    right: { name: "Company B", role: "Receives the funds" },
    arrowLabel: "advance of funds",
    note: "Company P, the MNE group's parent company, exercises control over the risks of the advance and has the financial capacity to assume them."
  },
  timeline: [
    "The advance of funds is made by Company A to Company B.",
    "Company A exercises no control functions in connection with the advance.",
    "The MNE group's parent company, Company P, exercises control over the risks associated with the advance and has the financial capacity to assume them."
  ],
  scenarios: [
    {
      letter: "—",
      facts:
        "Company A provides the funds but, on an accurate delineation of the actual transaction, performs no control functions in relation to the advance. Company P exercises control over the risks of the advance and has the financial capacity to assume them.",
      question: "What return is Company A entitled to on the advance?",
      mcq: [
        "No more than a risk-free return, because the risks are allocated to Company P, which bears the consequences of their playing out.",
        "All of the interest on the advance, because Company A is the lender and provided the funds, so the risks of the advance are its own.",
        "A risk-adjusted return on the funds, because Company P's control over the risks is a service for which it receives only a fee."
      ],
      correctIdx: 0,
      analysis:
        "¶10.25. Where accurate delineation shows that the lender does not control the risks attached to its advance, or lacks the financial capacity to assume them, those risks should be allocated to the enterprise that exercises control and has the financial capacity (the paragraph refers to ¶1.98 of Chapter I). Here that enterprise is Company P. Under the Chapter I analysis, Company P therefore bears the consequences of the risks playing out, and Company A is entitled to no more than a risk-free return (the paragraph refers to Section D.1.2.1 of Chapter I).",
      verdict: "Risk-free return at most"
    }
  ],
  takeaway:
    "A company that advances funds without controlling the risks of the advance does not end up with those risks. They should be allocated to the enterprise that controls them and has the financial capacity to assume them, and the funder is entitled to no more than a risk-free return.",
  crossRefs: [
    "Section B.3.2 (functional analysis)",
    "¶1.98 of Chapter I (allocating risk to the enterprise with control and financial capacity)",
    "Section D.1.2.1 of Chapter I (analysis of risks in commercial or financial relations)"
  ]
},

{
  id: 5,
  theme: "loans",
  themeLabel: "Delineating intra-group loans",
  title: "A 10-year advance for a short-term working capital need",
  group: "AB Group",
  refs: "Chapter X · ¶10.37",
  atGlance:
    "Company A, an AB Group member, makes a 10-year advance of funds to Company B, an associated enterprise, which will use the money for short-term working capital. AB Group's policy and practices show that the group manages short-term working capital with a one-year revolving loan. Is the advance really a 10-year loan?",
  parties: {
    kind: "tested-party",
    left: { name: "Company A", role: "Member of AB Group · advances the funds" },
    right: { name: "Company B", role: "Associated enterprise · short-term working capital need" },
    arrowLabel: "advance with a 10-year term",
    note: "Under AB Group's policy and practices, short-term working capital is managed with a one-year revolving loan."
  },
  timeline: [
    "Company A belongs to AB Group. It makes a 10-year advance of funds to Company B, an associated enterprise.",
    "The money is for Company B's short-term working capital.",
    "Company B has no other loan on its balance sheet.",
    "AB Group's policy and practices show that, for short-term working capital, the group relies on a one-year revolving loan."
  ],
  scenarios: [
    {
      letter: "—",
      facts:
        "The advance has a 10-year term but funds a short-term working capital need. AB Group's own policy and practices show that the group manages short-term working capital with a one-year revolving loan.",
      question: "How may accurate delineation treat this 10-year advance?",
      mcq: [
        "As a one-year revolving loan, priced as a series of refreshed one-year revolving loans for as long as the working capital need continues.",
        "As the 10-year loan that was agreed, priced at a 10-year rate, because a group's financing policy cannot displace the term the parties chose.",
        "As something other than a loan, because an unrelated borrower would not sign a 10-year agreement to fund a short-term working capital need."
      ],
      correctIdx: 0,
      analysis:
        "¶10.37. Business strategies form part of the accurate delineation (¶10.34), and their analysis includes the MNE group's global financing policy (¶10.36). On the prevailing facts and circumstances, the delineation may conclude that an unrelated borrower in Company B's position would not take on a 10-year loan to cover a short-term working capital need, so that the transaction is delineated as a one-year revolving loan and not as a 10-year loan. The conclusion is worded as \"may\" and depends on those facts and circumstances. If the advance is delineated in that way, and assuming the working capital requirement continues to exist, the pricing approach is to price a succession of refreshed one-year revolving loans.",
      verdict: "May be a one-year revolver"
    }
  ],
  takeaway:
    "A group's own financing policy and practices are part of the evidence when an intra-group loan is delineated. A 10-year advance that funds a short-term working capital need may be delineated as a one-year revolving loan and, while that need lasts, priced as a series of refreshed one-year loans.",
  crossRefs: [
    "Section B.3.5 (business strategies)",
    "¶10.36 (the MNE group's global financing policy)",
    "Section D.1.5 of Chapter I (business strategies)"
  ]
},

{
  id: 6,
  theme: "guarantees",
  themeLabel: "Financial guarantees",
  title: "A 3% fee for a parent's explicit guarantee",
  group: "Company M · Company D",
  refs: "Chapter X · ¶10.184–10.186 · Example 1",
  atGlance:
    "Company D needs EUR 10 million from an independent lender, and its stand-alone credit rating is only BBB. Passive association lifts its credit standing to A, and an explicit guarantee from Company M, the group's AAA-rated parent, lifts it to AAA, where lenders charge 6%, not 8%; Company M's fee is 3%. Would an independent borrower pay that fee?",
  parties: {
    kind: "tested-party",
    left: { name: "Company M", role: "Parent entity of the MNE group · AAA rating" },
    right: { name: "Company D", role: "Group member · BBB stand-alone · A with passive association" },
    arrowLabel: "explicit guarantee (for a 3% fee)",
    note: "The EUR 10 million that Company D needs is to be borrowed from an independent lender. At an A rating such lenders charge 8% interest, at AAA 6%."
  },
  timeline: [
    "Company M, an MNE group's parent entity, owes its AAA credit rating to the strength of the group's consolidated balance sheet.",
    "Company D belongs to the same group. Its stand-alone credit rating is only BBB, and it needs a loan of EUR 10 million from an independent lender.",
    "The effect of passive association is to lift Company D's credit standing from BBB to A; an explicit guarantee from Company M lifts it further, to AAA.",
    "The interest rate that independent lenders charge is 8% for an entity rated A and 6% for one rated AAA.",
    "Company D is charged a fee of 3% by Company M for the guarantee."
  ],
  scenarios: [
    {
      letter: "—",
      facts:
        "The explicit guarantee takes Company D's credit standing from A to AAA. Independent lenders charge 8% at A and 6% at AAA, and Company M's fee for the guarantee is 3%.",
      question: "If an independent enterprise borrowed on Company D's conditions, would it be expected to pay Company M the 3% fee?",
      mcq: [
        "The analysis may indicate that it would not be expected to pay 3%, because at that fee Company D is better off without the guarantee.",
        "It would pay 3%, because the guarantee moves Company D from A to AAA and any improvement in its credit rating justifies the fee.",
        "It would pay 3%, because the benefit is measured from Company D's stand-alone BBB rating and the lift to AAA supports that fee."
      ],
      correctIdx: 0,
      analysis:
        "¶10.185–10.186. The benefit that comes from the guarantee is the move from A to AAA, which is the difference between borrowing at 8% and at 6%; the move from BBB to A is the effect of passive association. A fee of 3% more than offsets that benefit, so Company D is better off without the guarantee. On a Chapter I analysis, this may indicate that an independent enterprise in Company D's position as borrower would not be expected to pay Company M 3% for the explicit guarantee. The text goes no further than \"may indicate\", and its conclusion concerns a fee of 3%, not every possible fee.",
      verdict: "Better off without the guarantee"
    }
  ],
  takeaway:
    "Test a guarantee fee from the borrower's side: compare it with the benefit that the explicit guarantee itself adds, beyond the effect of passive association. Where the fee more than offsets that benefit, an independent borrower may not be expected to pay it.",
  crossRefs: [
    "Section D.3 (examples on financial guarantees)",
    "Section D.8 of Chapter I, in particular ¶1.187 (MNE group synergies)",
    "Example 7 on this page (Example 2 of Section D.3, ¶10.187–10.188: the same facts with comparables for the fee)"
  ]
},

{
  id: 7,
  theme: "guarantees",
  themeLabel: "Financial guarantees",
  title: "Comparable guarantees priced at 1% to 1.5%",
  group: "Company M · Company D",
  refs: "Chapter X · ¶10.187–10.188 · Example 2",
  atGlance:
    "Passive association lifts Company D's credit standing from a stand-alone BBB to A; an explicit guarantee from Company M, the group's AAA-rated parent, lifts it to AAA, where lenders charge 6%, not 8%. Comparable uncontrolled transactions put the arm's-length price of a comparable guarantee at 1% to 1.5%. Is a fee to be expected from Company D?",
  parties: {
    kind: "tested-party",
    left: { name: "Company M", role: "Parent entity of the MNE group · AAA rating" },
    right: { name: "Company D", role: "Group member · BBB stand-alone · A with passive association" },
    arrowLabel: "explicit guarantee",
    note: "The EUR 10 million that Company D needs is to be borrowed from an independent lender. At an A rating such lenders charge 8% interest, at AAA 6%. Comparable guarantees: arm's-length price of between 1% and 1.5%."
  },
  timeline: [
    "Company M, an MNE group's parent entity, owes its AAA credit rating to the strength of the group's consolidated balance sheet.",
    "Company D belongs to the same group. Its stand-alone credit rating is only BBB, and it needs a loan of EUR 10 million from an independent lender.",
    "The effect of passive association is to lift Company D's credit standing from BBB to A; an explicit guarantee from Company M lifts it further, to AAA.",
    "The interest rate that independent lenders charge is 8% for an entity rated A and 6% for one rated AAA.",
    "Comparable uncontrolled transactions, found by applying the guidance in Section D.2, put the arm's-length price of a comparable guarantee between 1% and 1.5%."
  ],
  scenarios: [
    {
      letter: "—",
      facts:
        "The facts are those of Example 1 in the same section of the Guidelines (¶10.184–10.186), in which Company M charged a fee of 3%. What is new is the comparables: they price a comparable guarantee, at arm's length, at between 1% and 1.5%.",
      question: "For the explicit guarantee, would Company D be expected to pay Company M a fee?",
      mcq: [
        "Yes, an arm's-length fee, because the move from A to AAA comes from the guarantee and Company D is better off with it than without.",
        "No, because Company D's stronger credit standing is a benefit of belonging to the group, and group membership carries no fee.",
        "Yes, a fee equal to the whole interest saving, because without Company M's guarantee Company D would have none of that saving."
      ],
      correctIdx: 0,
      analysis:
        "¶10.188. The accurate delineation traces the step from A to AAA in Company D's credit standing to a deliberate concerted group action: Company M's guarantee. The earlier step, from BBB to A, was the effect of passive association. Because Company D is better off than it would be without the guarantee, it would be expected to be willing to pay Company M an arm's-length guarantee fee. The assumed comparables price a comparable guarantee at between 1% and 1.5%; the example does not return to the 3% fee charged in Example 1 of Section D.3 (¶10.184–10.186).",
      verdict: "Arm's-length fee expected"
    }
  ],
  takeaway:
    "An explicit guarantee is a deliberate concerted group action, and the credit enhancement it adds on top of passive association can carry a fee. A borrower that is better off with the guarantee than without it would be expected to be willing to pay an arm's-length fee for it.",
  crossRefs: [
    "Example 6 on this page (Example 1 of Section D.3, ¶10.184–10.186: the same facts with a 3% fee)",
    "Section D.2 (determining the arm's-length price of guarantees)",
    "Section D.8 of Chapter I, in particular ¶1.187 (MNE group synergies)"
  ]
},

{
  id: 8,
  theme: "captive-insurance",
  themeLabel: "Captive insurance",
  title: "Earthquake cover pooled through a captive",
  group: "Manufacturing MNE group",
  refs: "Chapter X · ¶10.223",
  atGlance:
    "An MNE group in manufacturing has 50 subsidiaries worldwide, each insuring against earthquake damage at a plant in a different location with a substantial earthquake risk. The group forms a captive insurance, which takes on the risk of every subsidiary and reinsures it with independent reinsurers. Who is entitled to the synergy benefit?",
  parties: {
    kind: "three-party-flow",
    first: { name: "50 subsidiaries", role: "Manufacturing plants · different locations · substantial earthquake risk" },
    second: { name: "Captive insurance", role: "Set up by the MNE group · accepts the risk from all subsidiaries" },
    third: { name: "Independent reinsurers", role: "Reinsure the risk" },
    label1: "earthquake risk insured",
    label2: "risk reinsured",
    note: "Every plant is in a different location and is assessed on its own level of risk."
  },
  timeline: [
    "An MNE group in manufacturing has 50 subsidiaries spread around the world, every one in a location with a substantial risk of earthquake.",
    "Each subsidiary insures its manufacturing plant against earthquake damage; every plant is in a different location and is assessed on its own level of risk.",
    "The MNE group forms a captive insurance, and all of the subsidiaries place their earthquake risk with it.",
    "The captive insurance in turn reinsures that risk with independent reinsurers."
  ],
  scenarios: [
    {
      letter: "—",
      facts:
        "The captive insurance accepts the earthquake risk of all 50 subsidiaries, whose plants lie in different geographical zones, and reinsures it with independent reinsurers.",
      question: "Who is entitled to the synergy benefit of the arrangement?",
      mcq: [
        "The insured subsidiaries, according to the level of premium each contributed, because the benefit comes from the collective purchasing arrangement.",
        "The captive insurance, because it accepts the risk from all 50 subsidiaries and places it with the reinsurers, which is what creates the benefit.",
        "The insured subsidiaries in equal shares, because all 50 take part in the same arrangement and none could obtain the benefit on its own."
      ],
      correctIdx: 0,
      analysis:
        "¶10.223. Because the pooled insurance risks span different geographical zones, the MNE group is already a diversified risk as far as the market is concerned. The synergy benefit is the product of the collective purchasing arrangement, not of value added by the captive insurance, and it should be divided among the insured by reference to the level of premium each contributed. Under ¶10.222, the captive insurance should be appropriately rewarded for the basic services it provides when it insures the risk and reinsures it in the open market; what is left of the synergy benefit should go to the insured participants through discounted premiums.",
      verdict: "Benefit to the insured"
    }
  ],
  takeaway:
    "A benefit that comes from buying insurance cover collectively is a group synergy, to be shared among the insured members by reference to the premiums they contributed. The reward due to the captive insurance is an appropriate one for the basic services it provides.",
  crossRefs: [
    "Section E.3.3 (group synergy)",
    "¶10.222 (the captive's reward for basic services and discounted premiums)"
  ]
},

{
  id: 9,
  theme: "captive-insurance",
  themeLabel: "Captive insurance",
  title: "Insurance sold at the retailer's point of sale",
  group: "Company A · Company B",
  refs: "Chapter X · ¶10.225–10.226",
  atGlance:
    "Company A, a high street retailer that sells high-value new technology consumer goods, offers customers 3-year accidental damage and theft cover at the point of sale. The policies are very profitable: Company B, a group insurer, insures them and takes substantially all of the profit, while A receives a commission. Is that split arm's length?",
  parties: {
    kind: "three-party-flow",
    first: { name: "Company B", role: "Insurer in the same MNE group · takes substantially all of the profit" },
    second: { name: "Company A", role: "High street retailer · sales agent · receives a commission" },
    third: { name: "Third-party customers", role: "Buy the goods · 3-year accidental damage and theft cover" },
    label1: "insures the policies",
    label2: "offered at the point of sale"
  },
  timeline: [
    "Company A sells high-value new technology consumer goods as a high street retailer.",
    "Third-party customers are offered a policy by A at the point of sale, covering accidental damage and theft for a 3-year period.",
    "Company B, an insurer in the same MNE group as A, insures the policies; A is paid a commission, and B receives substantially all of the profit made on the insurance contracts.",
    "Two findings come out of a full factual and functional analysis: the insurance contracts are very profitable, and the type of risk they cover has an active insurance and reinsurance market.",
    "Benchmarking puts A's commission in line with independent agents that sell similar cover as a standalone product; B earns more profit than insurers that provide similar cover."
  ],
  scenarios: [
    {
      letter: "—",
      facts:
        "A's commission is in line with what independent agents receive for selling similar cover as a standalone product, while B earns more profit than insurers that provide similar cover. The policy is substantially the same as what any insurer in the general market could offer, and A offers it when it sells the goods to be insured.",
      question: "How should the profit on the policies be divided between A and B?",
      mcq: [
        "B earns a return in line with the benchmark for insurers of similar risks, and the remaining profit on the policies is allocated to A.",
        "A keeps its benchmarked commission and B keeps the rest of the profit, because B is the insurer and carries the insured risk.",
        "A and B share the profit above their benchmarks equally, because the sale needs both A's customers and B's insurance cover."
      ],
      correctIdx: 0,
      analysis:
        "¶10.226. What matters is how the high profitability arises and what each party contributes to it. A policy that is substantially the same could be obtained from any other insurer in the general market; the chance of a high profit comes from A's advantage of contact with the customer at the point of sale. A has an alternative, since it could have another insurer underwrite the policies and still keep most of the profit, whereas no other agent that B could find has that advantage. B's arm's-length remuneration would therefore be in line with the benchmarked return of insurers that insure similar risks, and the rest of the profit should be allocated to A.",
      verdict: "Balance of profit to A"
    }
  ],
  takeaway:
    "Where a sale earns an unusually high profit, find out what creates that profit before dividing it. Here it is the agent's contact with the customer at the point of sale, so the insurer earns a benchmarked insurer's return and the rest goes to the agent.",
  crossRefs: [
    "Section E.3.4 (agency sales)",
    "¶10.224 (circumstances behind a high profit on insurance sold through an agent)"
  ]
}

];
