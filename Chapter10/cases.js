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
  }

];
