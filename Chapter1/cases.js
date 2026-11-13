// Single source of truth for the case content rendered on the page.
// Each case must match the shape validated by tools/validate-cases.mjs.

globalThis.CASES = [

{
    id: 1,
    theme: "contract-conduct",
    themeLabel: "Contract versus conduct",
    title: "An agency contract that is silent on marketing",
    group: "Company P · Company S",
    refs: "Chapter I · ¶1.44",
    atGlance:
      "Company S acts as agent for the branded products of its parent, Company P, in the Country S market. Their agency contract says nothing about marketing or advertising, yet Company S has launched an intensive media campaign there to build brand awareness, a significant investment for it. Can the analysis stop at the written contract?",
    parties: {
      kind: "tested-party",
      left: { name: "Company P", role: "Parent of the MNE group · Country P" },
      right: { name: "Company S", role: "Wholly-owned subsidiary · Country S · agent for Company P's branded products" },
      arrowLabel: "agency contract (silent on marketing and advertising)"
    },
    timeline: [
      "Company P, situated in Country P, heads an MNE group as its parent company. It wholly owns Company S, situated in Country S.",
      "Under an agency contract between the two, Company S is the agent in the Country S market for Company P's branded products.",
      "The contract does not say what marketing or advertising either party is to carry out in Country S.",
      "To develop brand awareness, Company S launches a media campaign in Country S. For Company S, this intensive campaign is a significant investment."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Nothing in the agency contract deals with marketing or advertising in Country S. The functional analysis nevertheless finds that Company S launched an intensive media campaign there, a significant investment for it.",
        question: "How should the analysis treat a campaign that the written contract does not mention?",
        mcq: [
          "Look beyond the contract: more evidence is needed of how the parties actually behaved, including on what basis Company S ran the campaign.",
          "Keep to the contract: marketing is no part of the agency arrangement, so the campaign is Company S's own affair, outside the analysis.",
          "The facts already settle it: an agent would not fund brand building, so Company P must bear the campaign costs plus a mark-up."
        ],
        correctIdx: 0,
        analysis:
          "A written contract is the starting point, but this one does not address an economically relevant feature of the relationship (¶1.42–1.43). What Company S actually did points to a possible conclusion: the written contract may not capture everything in the commercial or financial relations of the two companies. So the analysis should not stop at the recorded terms. More evidence of the parties' conduct is needed, including the basis on which Company S took on the campaign. The example ends there: it does not say how the campaign should be treated or rewarded.",
        verdict: "Look beyond the contract"
      }
    ],
    takeaway:
      "A written contract is where the delineation of a transaction starts, not where it ends. Where the contract does not address something economically relevant, evidence of what the parties actually do supplements it.",
    crossRefs: [
      "Section D.1.1 (the contractual terms of the transaction)",
      "¶1.42–1.43 (the contract as starting point, supplemented by evidence of conduct)",
      "¶1.48 (the next example: conduct that differs from the contract)"
    ]
  },

  {
    id: 2,
    theme: "contract-conduct",
    themeLabel: "Contract versus conduct",
    title: "A written licence and what the licensor actually does",
    group: "Company P · Company S",
    refs: "Chapter I · ¶1.48",
    atGlance:
      "By written contract, Company P licenses intellectual property to its wholly-owned subsidiary, Company S, in return for a royalty. In practice Company P negotiates Company S's sales and supplies technical support and staff, and most customers insist on having it as joint contracting party. Is the transaction between the two really a licence?",
    parties: {
      kind: "tested-party",
      left: { name: "Company P", role: "Parent · licensor on paper · negotiates sales, provides support and staff" },
      right: { name: "Company S", role: "Wholly-owned subsidiary · licensee on paper · fee income payable to it" },
      arrowLabel: "written licence of intellectual property → · royalty ←",
      note: "Most customers insist that Company P be made a joint contracting party alongside Company S."
    },
    timeline: [
      "Company P wholly owns its subsidiary, Company S.",
      "The two enter into a written contract: Company P grants Company S a licence of intellectual property for use in Company S's business, and Company S agrees to pay a royalty in return.",
      "To achieve sales for Company S, it is Company P that negotiates with the third-party customers.",
      "Company P gives Company S regular technical services support and regularly provides staff, so that Company S can deliver on and fulfil its customer contracts.",
      "The fee income under the customer contracts is payable to Company S, although most customers insist that Company P be made a joint contracting party alongside it."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Without significant support from Company P, Company S could not deliver the services it has contracted to provide to customers, and it is not building up a capability of its own. On paper, Company P is only its licensor.",
        question: "Is the transaction between Company P and Company S the licence that the written contract describes?",
        mcq: [
          "No: conduct shows Company P acting as principal rather than licensor, so functions, assets and risks do not fit the written licence.",
          "Yes: the written licence and the royalty define the transaction, and Company P's support is a separate matter for a service fee.",
          "Yes: the customers' fees are payable to Company S, which shows that Company S runs the business and bears its risks as licensee."
        ],
        correctIdx: 0,
        analysis:
          "Company P negotiates the sales, supplies technical support and staff, and is the joint contracting party most customers insist on; Company S cannot perform without that support and is not building its own capability. Company P thus controls Company S's business risk and output: it has not passed on risk and function as a licensing arrangement would, and it acts as principal rather than licensor. The actual transaction is therefore determined from conduct, not solely from the written contract. The example stops at the finding that functions, assets and risks are inconsistent with the licence agreement; it does not price the arrangement.",
        verdict: "Principal, not licensor"
      }
    ],
    takeaway:
      "Where conduct departs materially from the written contract, it is the functions the parties in fact perform, the assets they use and the risks they assume, seen in the context of the contract, that delineate the transaction. A label such as 'licence' does not decide the matter.",
    crossRefs: [
      "Section D.1.1 (the contractual terms of the transaction)",
      "¶1.45–1.46 (conduct that is inconsistent with the written contract)",
      "¶1.44 (the previous example: a contract that is silent, not contradicted)"
    ]
  },

  {
    id: 3,
    theme: "contract-conduct",
    themeLabel: "Contract versus conduct",
    title: "Services paid for by the parent, with no recharge",
    group: "Company P · its subsidiaries",
    refs: "Chapter I · ¶1.50",
    atGlance:
      "Company P engages an independent party whose services are received by Company P's subsidiaries, and Company P pays for them. The subsidiaries do not reimburse it, either directly or through the price of another transaction, and no service agreement exists between them and Company P. Is there a controlled transaction to analyse at all?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Company P", role: "Engages the independent party · pays for the services" },
      second: { name: "Independent party", role: "Provides the services" },
      third: { name: "Subsidiaries of Company P", role: "Receive the services · do not reimburse Company P" },
      label1: "engagement and payment",
      label2: "services",
      note: "No service agreement covers these services: Company P and its subsidiaries have not put one in place."
    },
    timeline: [
      "Company P engages an independent party to provide services.",
      "The services are received by Company P's subsidiaries.",
      "The bill for the services is paid by Company P.",
      "The subsidiaries do not pay Company P back: not directly, and not indirectly by way of the price of some other transaction.",
      "Company P and the subsidiaries have no service agreement between them."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The MNE has not identified any transaction between Company P and its subsidiaries: there is no service agreement and nothing is reimbursed. Yet the subsidiaries receive services from a provider that Company P engaged and paid.",
        question: "Is there anything between Company P and its subsidiaries for the transfer pricing analysis to delineate?",
        mcq: [
          "Yes: commercial or financial relations transfer potential value from Company P to the subsidiaries, and their nature has to be determined.",
          "No: with no agreement and no charge there is no controlled transaction to price, only services supplied by an independent party.",
          "Yes: it is plainly an intra-group service by Company P, so its cost must be recharged with a mark-up and no more analysis is needed."
        ],
        correctIdx: 0,
        analysis:
          "The absence of a contract or a charge does not mean that there is no transaction. The independent party's provision of services to the subsidiaries is not the whole picture: Company P and the subsidiaries also have commercial or financial relations of their own, through which potential value passes from Company P to the subsidiaries. The Guidelines do not say what those relations amount to. Their nature has to be established from the economically relevant characteristics, and only then can the terms and conditions of the transaction so identified be determined.",
        verdict: "A transaction to delineate"
      }
    ],
    takeaway:
      "A transfer of value can exist even where the group has not identified, documented or charged for it. Where nothing has been formalised, every aspect of the transaction has to be inferred from what the parties actually do.",
    crossRefs: [
      "Section D.1.1 (the contractual terms of the transaction)",
      "¶1.49 (relations the MNE has not identified as a transaction, deduced from conduct)"
    ]
  },

  {
    id: 4,
    theme: "control",
    themeLabel: "Control over risk",
    title: "Control over risk when the work is outsourced",
    group: "Company A · Company B · Company C",
    refs: "Chapter I · ¶1.69",
    atGlance:
      "Company A has its products made by a specialist manufacturer, Company B, and engages Company C to carry out regular quality controls of the production process. The contractual relations imply that the inventory risk and the product recall risk lie with Company A. With others doing the day-to-day work, does Company A control those risks?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Provides product specifications and designs · determines production scheduling" },
      right: { name: "Company B", role: "Specialist manufacturer · performs manufacturing services" },
      arrowLabel: "specifications, designs and production scheduling",
      note: "Company A also engages Company C to carry out regular quality controls of the production process. Company C reports directly to Company A."
    },
    timeline: [
      "Company B, a specialist manufacturer, is appointed by Company A to make products on Company A's behalf.",
      "Under the contractual arrangements Company B performs manufacturing services. Company A supplies the product specifications and designs and sets the production schedule, including volumes and the timing of product delivery.",
      "By implication from the contractual relations, the inventory risk and the product recall risk lie with Company A.",
      "Company A engages Company C to carry out regular quality controls of the production process, and tells it what the audits are to achieve and what information to gather on Company A's behalf.",
      "Company C's reports go directly to Company A."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Companies B and C do the manufacturing and the quality checks. Company A set the objectives of that outsourced work and chose both providers; it assesses whether those objectives are being adequately met and, if need be, decides to adapt or terminate the contracts.",
        question: "Who controls the product recall and inventory risks?",
        mcq: [
          "Company A: it takes the decisions on taking on and responding to the risks, and it directs and assesses the outsourced mitigation.",
          "Companies B and C: each carries out the day-to-day activity that mitigates a risk, and performing that activity is what control means.",
          "All three together: Company A sets the objectives, but it shares control with the companies doing the manufacturing and the checks."
        ],
        correctIdx: 0,
        analysis:
          "Control over risk means the capability to decide whether to take on a risk and whether and how to respond to it, together with actually taking those decisions; performing the day-to-day mitigation is not required (¶1.65). Company A takes the relevant decisions on its product recall and inventory risks. It also has the capability to assess and decide on the outsourced mitigation, and does so: it set the objectives, chose the providers, assesses whether they are adequately met and, where necessary, decides to adapt or terminate the contracts. Company A therefore controls both risks.",
        verdict: "Company A controls"
      }
    ],
    takeaway:
      "Day-to-day mitigation of a risk can be outsourced without giving up control of that risk. Control stays with the party that has the capability to set the objectives, choose the provider, assess the results and adapt or end the arrangement, and that actually does so.",
    crossRefs: [
      "Section D.1.2.1 (analysis of risks in commercial or financial relations)",
      "¶1.65 (what control over risk requires, including where mitigation is outsourced)",
      "¶1.70 (the companion example: investor and fund manager)"
    ]
  },

  {
    id: 5,
    theme: "control",
    themeLabel: "Control over risk",
    title: "Investor and fund manager: who controls the risk?",
    group: "Investor · fund manager",
    refs: "Chapter I · ¶1.70",
    atGlance:
      "An investor engages a fund manager, who is to invest money on the investor's account. Depending on their agreement, the manager may be authorised to make the day-to-day portfolio investments in line with the investor's risk preferences, while any loss in value would fall on the investor. Is it now the manager who controls the investment risk?",
    parties: {
      kind: "tested-party",
      left: { name: "Investor", role: "Engages the fund manager · would bear a loss in value of the investment" },
      right: { name: "Fund manager", role: "Invests on the investor's account · would generally report back regularly" },
      arrowLabel: "funds to invest on the investor's account",
      note: "The Guidelines use an investor and a fund manager to illustrate the concept of control. They are not described as associated enterprises."
    },
    timeline: [
      "An investor engages a fund manager to invest money on the investor's account.",
      "Their agreement may give the fund manager authority over the day-to-day portfolio investments, to be made on the investor's behalf and in line with the investor's risk preferences.",
      "The risk that the investment loses value would be borne by the investor.",
      "The fund manager would generally have to give the investor regular reports, because the investor would want to judge how the manager's activities have turned out."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The investor decides on its risk preference (and so the diversification it requires), on hiring this fund manager or ending its contract, on the manager's authority and objectives, and on the amount to be managed. The day-to-day investment decisions are left to the fund manager.",
        question: "Who controls the investment risk?",
        mcq: [
          "The investor: it controls the risk through four decisions of its own, even though the manager takes the daily investment decisions.",
          "The fund manager: whoever selects the individual investments from day to day is the party that controls the investment risk.",
          "Both: the manager shares in the control, because its own risk of losing the client is part of the same investment risk."
        ],
        correctIdx: 0,
        analysis:
          "The investor controls its risk through the four decisions it takes itself: on risk preference and diversification, on the choice of fund manager, on the manager's authority and objectives, and on the amount to be managed. The fund manager provides a service and manages its own business risk, for example to protect its credibility. That operational risk, which includes the chance of losing a client, is a different risk from the client's investment risk. So an investor who authorises another person to carry out risk mitigation of this kind has not necessarily handed control of the investment risk to the person taking the day-to-day decisions.",
        verdict: "Investor keeps control"
      }
    ],
    takeaway:
      "Authorising another party to take the day-to-day decisions that mitigate a risk does not necessarily transfer control of that risk. The provider's own business risk is a different risk from the one it manages for its client.",
    crossRefs: [
      "Section D.1.2.1 (analysis of risks in commercial or financial relations)",
      "¶1.65 (what control over risk requires, including where mitigation is outsourced)",
      "¶1.69 (the companion example: outsourced manufacturing and quality control)"
    ]
  },

  {
    id: 6,
    theme: "risk-significance",
    themeLabel: "Economic significance of risk",
    title: "Heating oil distribution: how does risk matter?",
    group: "Heating oil distributor",
    refs: "Chapter I · ¶1.74",
    atGlance:
      "An MNE group distributes heating oil to consumers: an undifferentiated product in a competitive market of predictable size, in which the players are price-takers. The credit terms the distributor achieves by managing its relationship with the oil suppliers fund its working capital. What is economically significant about risk in such a business?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Oil suppliers", role: "Their credit terms fund the distributor's working capital" },
      second: { name: "MNE group", role: "Distributes heating oil · a price-taker in a competitive market" },
      third: { name: "Consumers", role: "Buy an undifferentiated product" },
      label1: "credit terms",
      label2: "heating oil",
      note: "The Guidelines describe the business of the group as a whole. No controlled transaction is specified."
    },
    timeline: [
      "The business of an MNE group is the distribution of heating oil to consumers.",
      "Heating oil is an undifferentiated product, and the market for it is competitive.",
      "The size of the market is predictable, and those active in it are price-takers.",
      "The distributor manages its relationship with the oil suppliers and achieves credit terms from them, which fund its working capital."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "With an undifferentiated product and price-taking players in a market of predictable size, there may be little scope to influence margins. Working capital is funded by the credit terms obtained from the oil suppliers, and those terms are crucial to the distributor's margin.",
        question: "What do the Guidelines single out as significant about risk in this business?",
        mcq: [
          "Its impact on the cost of capital: working capital is funded by supplier credit terms, which are crucial to the distributor's margin.",
          "Market risk: demand for heating oil and the prices the distributor sets are what drive its margin and create its value.",
          "Nothing in particular: an undifferentiated product sold by price-takers in a market of predictable size is a routine, low-risk activity."
        ],
        correctIdx: 0,
        analysis:
          "With an undifferentiated product, a competitive market of predictable size and price-taking players, the distributor's ability to influence its margins may be limited. Its working capital is funded by the credit terms it achieves through managing its relationship with the oil suppliers, and those terms are crucial to its margin. That is why the impact of the risk on the cost of capital is significant here, given how the distribution function creates value. The paragraph does not name that risk or say which entity assumes it: significance is judged against how the business creates value (¶1.73).",
        verdict: "Cost-of-capital impact is significant"
      }
    ],
    takeaway:
      "The economic significance of a risk is judged in the context of how the business creates value. Where the product, the market and prices leave little room to influence margins, the effect of risk on the cost of capital can be what matters.",
    crossRefs: [
      "Section D.1.2.1.1 (step 1: identify economically significant risks with specificity)",
      "¶1.73 (economic significance as part of the broader functional analysis)",
      "¶1.75 (the second situation: a multinational toy retailer)"
    ]
  },

  {
    id: 7,
    theme: "risk-significance",
    themeLabel: "Economic significance of risk",
    title: "Toy retailing: which risk matters?",
    group: "Multinational toy retailer",
    refs: "Chapter I · ¶1.75",
    atGlance:
      "A multinational toy retailer buys its wide product range from a number of third-party manufacturers and makes most of its sales in the last two months of the calendar year. Trends and demand can differ from one market to another. Which risk is economically significant in a business like this?",
    parties: {
      kind: "tested-party",
      left: { name: "Third-party manufacturers", role: "A number of manufacturers supplying the retailer" },
      right: { name: "Multinational toy retailer", role: "Most sales in the last two months of the calendar year" },
      arrowLabel: "a wide range of products",
      note: "The Guidelines describe the retailer's business as a whole. No controlled transaction is specified."
    },
    timeline: [
      "A number of third-party manufacturers supply the wide range of products that a multinational toy retailer buys.",
      "Trends and product demand can differ from one market to another.",
      "Most of the retailer's sales fall in the last two months of the calendar year."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The retailer's products come from a number of third-party manufacturers, and most of its sales fall in the last two months of the calendar year. Trends and demand can differ from market to market.",
        question: "Where do the Guidelines locate a significant risk for this retailer?",
        mcq: [
          "In the buying function: which strategic direction it takes, and whether it bets correctly on trends, products and volumes.",
          "In selling: with sales bunched into the last two months of the year, how well the retailer sells in that short period decides the result.",
          "With the manufacturers: buying from third parties is routine for the retailer, and product risk stays with those who make the goods."
        ],
        correctIdx: 0,
        analysis:
          "For this retailer a significant risk sits in the buying function: the strategic direction it takes, and whether it bets correctly on trends and picks the products that will sell, in the right volumes. Trends and demand can differ from market to market, so judging the right bets takes expertise in the local market. A period of exclusivity negotiated with a manufacturer for a particular product can magnify the effect of the buying risk. The paragraph identifies the risk and goes no further: it does not say which entity in the group assumes or controls it.",
        verdict: "Buying risk"
      }
    ],
    takeaway:
      "Significant risks should be identified with specificity: here the Guidelines point to one in the buying function, in its strategic direction and its bets on trends, products and volumes. Where trends and demand differ by market, expertise in the local market is needed to judge those bets.",
    crossRefs: [
      "Section D.1.2.1.1 (step 1: identify economically significant risks with specificity)",
      "¶1.73 (economic significance as part of the broader functional analysis)",
      "¶1.74 (the first situation: a heating oil distributor)"
    ]
  },

  {
    id: 8,
    theme: "risk-steps",
    themeLabel: "Risk analysis in six steps",
    title: "Outsourced research and the development risk",
    group: "Company A · Company B",
    refs: "Chapter I · Example 1 (risk) · ¶1.83, 1.87, 1.90, 1.101",
    atGlance:
      "Company A has a development opportunity it wants to pursue, and for part of the research it engages a specialist, Company B. The contract places the development risk with Company A, which decides on the research and its budget and assesses progress at milestones. Who bears the outcome, and what if the contract put the risk on Company B instead?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Decides type of research, objectives and budget · assesses progress" },
      right: { name: "Company B", role: "Specialist company · carries out part of the research day to day" },
      arrowLabel: "research objectives and budget → · milestone reports ←"
    },
    timeline: [
      "Company A wants to pursue a development opportunity. It decides to do part of the development work itself and to seek specialist input.",
      "Company A engages Company B, a specialist company, to carry out part of the research for it. Under the contract the development risk is assumed by Company A.",
      "Company A decides what type of research is to be carried out, which objectives are assigned to it and what budget is allocated to Company B.",
      "Company B takes on the day-to-day responsibility for the research and reports to Company A at milestones fixed in advance.",
      "Company A assesses how the development is progressing and whether it still meets Company A's ongoing objectives, and decides in that light whether continued investment in the project is warranted."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Development risk is the economically significant risk. Company A assumes it under the contract, takes the decisions on it and has the financial capacity to assume it. Company B cannot evaluate that risk; its own decisions concern the processes, expertise and assets it needs to do its research competently.",
        question: "Who bears the consequences of the development risk, and what is Company B rewarded for?",
        mcq: [
          "Company A bears the financial results of failure or success; Company B earns an appropriate reward for its development services.",
          "Company B bears them: it carries out the research day to day, and the outcome depends on how well that research is done.",
          "The two share them: each performs development work and each controls a risk, so the results are divided between them."
        ],
        correctIdx: 0,
        analysis:
          "Company A assumes the development risk under the contract, both companies do what the contract requires, and Company A controls the risk through its own decisions and has the financial capacity to assume it, so step 5 is not needed (¶1.87). Outsourcing the research to Company B is how Company A has mitigated its risk. Company B's own risk is mainly that of performing the research competently, which it controls and which is distinct from the development risk. Company A should therefore carry the financial consequences of failure and enjoy those of success, and Company B should receive an appropriate reward for its development services, allowing for the risk that it fails to perform them competently (¶1.101).",
        verdict: "Development risk with Company A"
      },
      {
        letter: "B",
        facts:
          "One fact changes: the contract now allocates the development risk to Company B, not to Company A. Nothing in the parties' conduct suggests that this allocation is not being followed. Everything else is as before: Company B still cannot evaluate the development risk and takes no decisions about Company A's activities.",
        question: "How does the risk analysis deal with the development risk now?",
        mcq: [
          "Company B assumes the risk under the contract but cannot control it, whereas Company A does, so the analysis must go on to step 5.",
          "Company B bears the outcome: the contract gives it the risk and the parties act on the contract, so step 4 is satisfied.",
          "The two companies share the outcome: Company B assumes the risk on paper and Company A controls it, so each bears a part."
        ],
        correctIdx: 0,
        analysis:
          "Step 4(i) raises no difficulty: the parties' conduct gives no sign that the contract is not being followed, so Company B contractually assumes the development risk. Step 4(ii) is not met, because Company B still cannot evaluate the risk, takes no decisions about Company A's activities and has no decision-making function that would let it control the risk. On the facts of the example it is Company A that controls the development risk. The party assuming the risk is thus not the party controlling it, and the analysis has to go on to step 5. ¶1.90 stops at that point; under step 5 the risk should go to the enterprise that exercises control and has the financial capacity to assume it (¶1.98).",
        verdict: "On to step 5"
      }
    ],
    takeaway:
      "A contractual assumption of risk stands where the party acts on it in practice, controls the risk and can bear it financially; where the party assuming a risk does not control it, the analysis moves on to step 5. A service provider that controls only the risk of doing its own work competently is rewarded for the service, with that risk reflected in its reward.",
    crossRefs: [
      "Section D.1.2.1.3 (step 3: functional analysis in relation to risk)",
      "¶1.62 (contract R&D: the reward for risk mitigation done through the development work is part of the service payment)",
      "¶1.98 (step 5: allocation of risk)"
    ]
  },

  {
    id: 9,
    theme: "risk-steps",
    themeLabel: "Risk analysis in six steps",
    title: "Manufacturing services and capacity utilisation risk",
    group: "Company A · Company B",
    refs: "Chapter I · Example 2 (risk) · ¶1.84, 1.87, 1.91, 1.102",
    atGlance:
      "Company B built and equipped its plant to Company A's specifications and makes products to Company A's designs. Company A determines the volumes, runs the supply chain and, under the contract, assumes the capacity utilisation and supply chain risks. Who bears the cost of an under-used plant, and what if the contract is not followed in practice?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Provides specifications and designs · determines volumes · runs the supply chain" },
      right: { name: "Company B", role: "Builds and equips the plant · employs and trains personnel · schedules production" },
      arrowLabel: "specifications, designs and volumes → · manufactured products ←"
    },
    timeline: [
      "Company B builds and equips its plant to Company A's specifications, and employs and trains competent manufacturing personnel.",
      "Company B makes products for Company A, to technical requirements and designs that Company A provides.",
      "Company A determines the volume levels; Company B determines production scheduling on the basis of those volumes.",
      "Company A runs the supply chain, which includes procuring components and raw materials, and it carries out regular quality checks of the manufacturing process.",
      "Under the contract, the capacity utilisation risk and the supply chain risk are assumed by Company A."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Company B has incurred fixed costs, but as Company A determines the volumes, Company B cannot manage their recovery by deciding over how many units they are spread. Each of the two companies has the financial capacity for its respective risks.",
        question: "Who should be allocated the risk that the plant is under-utilised?",
        mcq: [
          "Company A: it controls the capacity utilisation risk, so uncovered fixed costs, write-downs or closure costs are allocated to it.",
          "Company B: the plant is its own and it incurred the fixed costs, so the risk of not recovering them stays with the plant's owner.",
          "Both: Company A sets the volumes but Company B schedules production, so the cost of idle capacity is divided between the two."
        ],
        correctIdx: 0,
        analysis:
          "Company A controls the risks it assumes under the contract: it determines the volumes, runs the supply chain and determines significant component and raw material costs and the security of supply. Company B performs manufacturing services and controls the risk of failing to deliver them competently. Both companies do what the contract requires, each controls the risks it assumes and each has the financial capacity to bear them, so step 5 is not needed (¶1.87). The upside and downside of the significant risks should be allocated to Company A, including under-utilisation and its consequences, such as a failure to cover fixed costs, write-downs or closure costs. Company B's remuneration should reflect its own performance risk and its funding costs for acquiring the plant (¶1.102).",
        verdict: "Under-utilisation risk with Company A"
      },
      {
        letter: "B",
        facts:
          "As before, Company A runs the supply chain and the contract specifies that it assumes the supply chain risks. But when key components were not secured on time, Company A did not reimburse Company B.",
        question: "How does the risk analysis deal with the supply chain risk now?",
        mcq: [
          "Company B bears the downside in practice but does not control the risk, so step 4(ii) is not met and step 5 must be considered.",
          "Company B assumes the risk and its return: conduct overrides the contract, and conduct leaves the downside with Company B.",
          "Company A assumes the risk as the contract says: what happens in practice has no bearing while the contract is unchanged."
        ],
        correctIdx: 0,
        analysis:
          "Step 4(i) asks whether the parties follow the contract. Here they do not: Company B is left unreimbursed, so in fact it assumes the downside consequences of the supply chain risk. Under step 4(ii), however, Company B has no control over that risk, while Company A does control it. The party assuming the risk therefore does not control it, and the analysis has to go on to step 5. ¶1.91 stops at that point; under step 5 the risk should go to the enterprise that exercises control and has the financial capacity to assume it (¶1.98).",
        verdict: "On to step 5"
      }
    ],
    takeaway:
      "Owning the plant and incurring its fixed costs does not settle who bears the risk of idle capacity: that risk goes to the party that controls it and can bear it financially. And where conduct leaves a risk with a party that does not control it, the analysis does not stop at conduct but moves on to step 5.",
    crossRefs: [
      "Section D.1.2.1.3 (step 3: functional analysis in relation to risk)",
      "¶1.88 (step 4(i): is the contractual assumption of risk followed in the parties' conduct?)",
      "¶1.98 (step 5: allocation of risk)"
    ]
  },

  {
    id: 10,
    theme: "risk-steps",
    themeLabel: "Risk analysis in six steps",
    title: "Owning an asset without controlling its risks",
    group: "Company A · Company B · Company C",
    refs: "Chapter I · Example 3 (risk) · ¶1.85, 1.92, 1.103, 1.106",
    atGlance:
      "Company A owns a tangible asset and contracts with unrelated customers for its use, but its contribution is limited to financing the asset's cost. Company B decided on the investment and specified the asset, and Company C decides how it is used and negotiates with customers. What is Company A entitled to, and who bears an unexpected loss?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Companies B and C", role: "B decides on the investment and specifies the asset · C decides on its use and deals with customers" },
      second: { name: "Company A", role: "Legal owner of the asset · finances its cost" },
      third: { name: "Unrelated customers", role: "Contract with Company A for the use of the asset" },
      label1: "investment and utilisation decisions",
      label2: "use of the asset",
      note: "Companies A, B and C belong to the same group. Company A's contract for the provision of services with Company C does not address the assumption of utilisation risk."
    },
    timeline: [
      "Company B, a group company, identifies and evaluates commercial opportunities, assesses the asset's anticipated useful life and decides that investing in the asset is appropriate.",
      "Company B specifies the asset and the unique features it needs, arranges for it to be constructed accordingly and arranges for Company A to acquire it.",
      "Company A acquires ownership of the tangible asset, providing financing for an amount equal to its cost, and enters into contracts with unrelated customers for its use.",
      "A contract for the provision of services exists between Company A and another group company, Company C. It is silent on whether Company A, as owner of the asset, assumes the utilisation risk.",
      "Company C decides how the asset is utilised, markets what the asset can do to third-party customers, negotiates their contracts and makes sure the asset is delivered and properly installed."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Company A, the legal owner, assumes the utilisation risk, consistently with its contractual arrangements with Company C. It lacks any capability to decide on investing in the asset or exploiting it, and it does not evaluate the financing opportunity, its pricing or the protection of its investment. All three companies have the financial capacity for their respective risks.",
        question: "Who bears the risks of the asset, and what return is left for Company A?",
        mcq: [
          "Companies B and C, which control those risks; Company A, contributing only finance, is entitled to no more than a risk-free return.",
          "Company A as legal owner: its contracts leave the utilisation risk with it, so it keeps the whole profit or loss from the asset.",
          "Companies B and C bear the asset's risks, but Company A earns a risk-adjusted return because it financed the cost of the asset."
        ],
        correctIdx: 0,
        analysis:
          "Company A's assumption of utilisation risk fits its contractual arrangements with Company C (step 4(i)), but it has no decision-making function that lets it control the risks of investing in and exploiting the asset (step 4(ii)). Those risks are therefore aligned with Companies B and C, which control them. Company A contributes only financing equal to the cost of the asset and cannot control even the risk of that financial investment, so it is entitled to no more than a risk-free return; the risk attached to the financial asset is allocated to Company B. Company A could be entitled to less, for instance where the transaction is disregarded under Section D.2, and an assessment of commercial rationality may be necessary.",
        verdict: "No more than risk-free"
      },
      {
        letter: "B",
        facts:
          "Company A, the legal owner, controls neither the investment risk nor the utilisation risk and is entitled to no more than a risk-free return. The asset is then unexpectedly destroyed, which results in an unanticipated loss.",
        question: "To whom is the unanticipated loss allocated for transfer pricing purposes?",
        mcq: [
          "To whichever company or companies control the investment risk and have the financial capacity to bear it, and not to Company A.",
          "To Company A: the asset was its property, so its destruction is a loss for the legal owner and for nobody else in the group.",
          "To all three companies in shares: an event that nobody foresaw was outside the control of each of them, the owner included."
        ],
        correctIdx: 0,
        analysis:
          "A party that, once the steps have been applied, neither assumes a risk nor contributes to its control is not entitled to unanticipated profits from that risk and is not required to bear unanticipated losses. Neither is therefore allocated to Company A. For transfer pricing purposes, the loss from an unexpected destruction of the asset would fall on whichever company or companies control the investment risk, contribute to that control and have the financial capacity to assume the risk; ¶1.106 does not name them. They would still owe Company A the return it is entitled to under ¶1.103.",
        verdict: "Not Company A's loss"
      }
    ],
    takeaway:
      "Legal ownership of an asset does not bring its risks or its returns to a party that controls none of them. A party whose only contribution is funding, and which does not control even the financing risk, is entitled to no more than a risk-free return and neither gains nor loses from unanticipated outcomes.",
    crossRefs: [
      "¶1.98 (step 5: allocation of risk to the enterprise with control and financial capacity)",
      "Section D.2 (recognition of the accurately delineated transaction)",
      "¶1.104 and ¶6.60–6.64 (funding and the risks of the activity funded)"
    ]
  },

  {
    id: 11,
    theme: "risk-steps",
    themeLabel: "Risk analysis in six steps",
    title: "Exchange rate risk on paper and in practice",
    group: "Manufacturer · distributor",
    refs: "Chapter I · ¶1.89",
    atGlance:
      "The functional currency of a manufacturer is the US dollar; that of the associated distributor to which it sells goods is the euro. The written contract puts all exchange rate risks on the distributor, yet over an extended period the manufacturer charges for the goods in euros. Which decides who assumes the risk: the contract or the conduct?",
    parties: {
      kind: "tested-party",
      left: { name: "Manufacturer", role: "Functional currency: US dollars" },
      right: { name: "Distributor", role: "Associated enterprise in another jurisdiction · functional currency: euros" },
      arrowLabel: "goods, charged in euros"
    },
    timeline: [
      "A manufacturer with the US dollar as its functional currency sells goods to a distributor in another jurisdiction. The distributor is an associated enterprise and has the euro as its functional currency.",
      "Their written contract provides that all exchange rate risks relating to this controlled transaction are assumed by the distributor.",
      "Over an extended period of time, the manufacturer charges the distributor for the goods in euros, the distributor's own currency."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "On paper, all exchange rate risks of the transaction lie with the distributor. In practice the manufacturer has charged for the goods in euros, the distributor's own currency, over an extended period.",
        question: "What determines who assumes the exchange rate risk in this transaction?",
        mcq: [
          "The parties' actual conduct, read in the context of the contract: a written term that is not applied in practice does not decide it.",
          "The written contract: the distributor agreed to assume all exchange rate risks, and the currency of the price is a mere payment detail.",
          "Conduct alone: one unapplied term shows that the contract is unreliable, so the whole contract is set aside for the analysis."
        ],
        correctIdx: 0,
        analysis:
          "Step 4(i) asks whether the parties act in line with the assumption of risk set out in their written contract (¶1.88). If the manufacturer charges for the goods in the distributor's own currency over an extended period, the written terms do not, in that respect, reflect what actually goes on between the parties. Who assumes the risk should then be decided by what the parties actually do, read in the context of the contract, and not by clauses they do not apply in practice. The paragraph stops at this principle: it does not say in so many words which party then bears the exchange rate risk, and it does not re-price the transaction.",
        verdict: "Conduct, not unapplied terms"
      }
    ],
    takeaway:
      "A contractual allocation of risk counts only as far as the parties apply it. Where contract and conduct differ in a way that is economically significant and that third parties would price in, conduct, seen against the contract terms the parties do follow, should generally be treated as the best evidence of what they intended (¶1.88).",
    crossRefs: [
      "Section D.1.2.1.4 (step 4: interpreting steps 1-3)",
      "Section D.1.1 (the contractual terms of the transaction)",
      "Example 7 in Annex I to Chapter VI (contractual risk contradicted by who bears the costs)"
    ]
  },

{
    id: 12,
    theme: "funding-returns",
    themeLabel: "Risk-free and risk-adjusted returns",
    title: "Reference rates for risk-free and risk-adjusted returns",
    group: "Company A · Company B",
    refs: "Chapter I · ¶1.114, 1.125",
    atGlance:
      "Company A, resident in Country X, makes a one-year advance of funds to Company B, an associated enterprise. Country X's tax administration must estimate Company A's return: first where Company A is entitled to no more than a risk-free return, then where it is entitled to a risk-adjusted return. Which market rates may it look to?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Funder · MNE group member · resident in Country X" },
      right: { name: "Company B", role: "Associated enterprise · receives the funds" },
      arrowLabel: "advance of funds · one-year term",
      note: "Country X's tax administration finds three one-year government securities in Company A's functional currency: Country X (government rated A), Country Y (rated B) and Country Z (rated AA)."
    },
    timeline: [
      "Company A belongs to an MNE group and makes a one-year advance of funds to Company B, an associated enterprise.",
      "Company A is resident in Country X. To approximate its return, Country X's tax administration looks for a security issued when the funding was provided and denominated in Company A's functional currency.",
      "It finds three one-year securities in that currency, issued by the governments of Country X (rated A), Country Y (rated B) and Country Z (rated AA).",
      "Of all outstanding one-year government bonds in that currency, the Country Z security offers the lowest rate of return when the funding is provided."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Company A's entitlement on its one-year advance to Company B is capped at a risk-free return. Three one-year government securities exist in its functional currency: Country X's (issuer rated A), Country Y's (rated B) and Country Z's (rated AA).",
        question: "Which security may the tax administration take as its reference for the risk-free rate?",
        mcq: [
          "Country Z's, because it offers the lowest rate of return among the outstanding one-year government bonds in that currency.",
          "Country X's, because Company A is resident in Country X and it is Country X's tax administration that assesses the return.",
          "An average of the three, because each of them matches the advance in currency and in term and none should be preferred."
        ],
        correctIdx: 0,
        analysis:
          "In setting the minimum credit rating an issuer needs for its security to count as a risk-free investment, the tax administration may select the Country Z security: of all outstanding one-year government bonds in Company A's functional currency, it offers the lowest return available when the funding is provided. Where several governments issue in one currency, a difference in rate can only reflect a difference in issuer risk; the investor's functional currency counts, not its domicile (¶1.111). This is a practical solution: other references, such as interbank rates or interest rate swap rates, may also be considered on the facts (¶1.115).",
        verdict: "May use Country Z's security"
      },
      {
        letter: "B",
        facts:
          "Here Company A's entitlement is found to be a risk-adjusted rate of return, and the one-year Country Z security serves as the risk-free rate. Independent parties resident in Country X and active in Company B's industry have issued corporate bonds.",
        question: "What approach does the tax administration consider for estimating the risk-adjusted return?",
        mcq: [
          "Adding a risk premium to the Country Z rate, guided by the yield on bonds of independent Country X issuers in Company B's industry.",
          "Applying the Country Z rate without any premium, because a one-year advance to an associated enterprise carries little risk.",
          "Giving Company A a share of the profit Company B earns with the funds, because Company A now bears the risk of the financing."
        ],
        correctIdx: 0,
        analysis:
          "A funder that assumes the financial risk is exposed to its upside and downside, which warrants an expected return above the risk-free rate (¶1.121). The approach the tax administration considers is the risk-free rate, taken from the one-year Country Z security, plus a risk premium. As its yardstick it takes the corporate bonds of independent issuers resident in Country X in Company B's industry, whose yield it considers comparable to the return an independent investor would have expected from funding Company B in comparable circumstances. The Guidelines give no figures and present the premium as one of several possible approaches (¶1.122–1.124).",
        verdict: "Risk-free rate plus premium"
      }
    ],
    takeaway:
      "A risk-free return can be approximated from a government security in the funder's functional currency with a matching term: where several governments issue in that currency, the lowest return is the reference point. A funder that assumes the financial risk expects more, for instance that rate plus a market-based risk premium.",
    crossRefs: [
      "Section D.1.2.2 (risk-free and risk-adjusted rates of return)",
      "¶1.111–1.113 (currency, timing and maturity of the reference security)",
      "Section C.1.2 of Chapter X (arm's-length interest rate of intra-group loans)"
    ]
  },

  {
    id: 13,
    theme: "funding-returns",
    themeLabel: "Risk-free and risk-adjusted returns",
    title: "Funding an intangible without the development risk",
    group: "Company F · Company D",
    refs: "Chapter I · ¶1.119",
    atGlance:
      "Company F lends to Company D, an associated enterprise that is developing an intangible. Company F controls the financial risk, including the risk of not being repaid if Company D fails to develop the intangible, but the development risk is entirely Company D's. If the intangible earns more or less than projected, is the difference Company F's?",
    parties: {
      kind: "tested-party",
      left: { name: "Company F", role: "Lender · controls and is allocated the financial risk" },
      right: { name: "Company D", role: "Borrower · develops the intangible · assumes the development risk" },
      arrowLabel: "loan"
    },
    timeline: [
      "Company F makes a loan to Company D, an associated enterprise that is developing an intangible.",
      "It is determined under Chapter I that Company F controls, and so is allocated, the financial risk of funding the development, including the risk that Company D fails to develop the intangible and therefore cannot repay the loan.",
      "The development risk is not Company F's: as the transaction is accurately delineated, Company D assumes all of it.",
      "Once the developed intangible is exploited, actual results may come out above or below those calculated beforehand."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "As lender, Company F has control of the financial risk on its loan, while the development risk lies wholly with the borrower, Company D. Exploiting the developed intangible then yields results above, or below, those calculated ex ante.",
        question: "What is Company F entitled to?",
        mcq: [
          "A risk-adjusted rate of return on its loan, and no part of the difference between the projected and the actual results.",
          "A share of the difference between the projected and the actual results, because its loan made the development possible.",
          "No more than a risk-free return, because the risk of developing the intangible lies entirely with Company D."
        ],
        correctIdx: 0,
        analysis:
          "The financial risk a funder assumes in its financing activity must be told apart from the operational risk tied to the use of the funds, here the development of the intangible (¶1.118). Company F controls and is allocated the first, including the risk that Company D fails to develop the intangible and so cannot repay. It did not assume the second, so the gap between the results calculated ex ante and those actually derived from exploiting the intangible, up or down, is not Company F's. Its entitlement is a risk-adjusted rate of return: in general, the risk-free rate plus a premium for the risks the funder assumes (¶1.120).",
        verdict: "Risk-adjusted return only"
      }
    ],
    takeaway:
      "A funder that controls the financial risk of its funding, and no other specific risk, can generally expect only a risk-adjusted return (¶1.117, quoting ¶6.61). The difference between projected and actual results of the funded activity is tied to the operational risk, which the funder did not assume, so it is not the funder's.",
    crossRefs: [
      "Section D.1.2.2.2 (determining a risk-adjusted rate of return)",
      "¶6.60–6.64 (funding and the risks of the activity funded)",
      "¶1.85 and ¶1.103 (Example 3 on risk: a funder limited to a risk-free return)"
    ]
  },

  {
    id: 14,
    theme: "non-recognition",
    themeLabel: "Non-recognition",
    title: "Insuring a flood-prone property within the group",
    group: "Company S1 · Company S2",
    refs: "Chapter I · Example 1 (non-recognition) · ¶1.146–1.147",
    atGlance:
      "Company S1, a manufacturer, owns commercial property in an area of increasingly frequent flooding, where there is no active market for property insurance. An associated enterprise, Company S2, insures it for an annual premium of 80% of the value of the inventory, property and contents. Should the insurance be priced, or not recognised at all?",
    parties: {
      kind: "tested-party",
      left: { name: "Company S1", role: "Manufacturer · owns property in a flood-prone area" },
      right: { name: "Company S2", role: "Associated enterprise · provides the insurance" },
      arrowLabel: "annual premium",
      note: "The annual premium equals 80% of what the inventory, property and contents are worth, in an area where property insurance has no active market."
    },
    timeline: [
      "Company S1 is a manufacturer whose business requires it to hold substantial inventory and to invest significantly in plant and machinery.",
      "It owns commercial property in an area prone to flooding, which has become increasingly frequent in recent years.",
      "Third-party insurers are significantly uncertain about their exposure to large claims, so there is no active market for insuring properties in the area.",
      "Company S1 is insured by an associated enterprise, Company S2, and pays it each year a premium equal to 80% of the value of the inventory, property and contents."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "There is no market for insuring properties in the area, given the likelihood of significant claims. Company S1 still takes insurance from Company S2, at an annual premium of 80% of the value of the inventory, property and contents.",
        question: "How should the insurance be treated for transfer pricing purposes?",
        mcq: [
          "It is not recognised: S1 is treated as not buying insurance and S2 as not issuing it, so the premium does not reduce S1's profits.",
          "It is recognised, with the premium adjusted to the level an independent insurer would charge for comparable property cover.",
          "It is recognised as it stands: that such insurance is not seen between independent parties is no reason to set it aside."
        ],
        correctIdx: 0,
        analysis:
          "Significant claims are likely, which is why no market for this insurance exists, and S1 may have more attractive realistic alternatives in relocating or in going uninsured. The Guidelines therefore regard the transaction as commercially irrational, so that no price exists that both S1 and S2 would accept from their own perspectives. It should not be recognised: for transfer pricing purposes it is as if S1 had bought no insurance, so the payment to S2 does not reduce its profits, and as if S2 had issued none, so S2 is not liable for any claim.",
        verdict: "Not recognised"
      }
    ],
    takeaway:
      "A transaction may be disregarded where, viewed as a whole, it differs from what commercially rational independent enterprises would have agreed, so that no price acceptable to both parties can be determined. That it is hard to price, or is not seen between independent parties, is not enough (¶1.142).",
    crossRefs: [
      "Section D.2 (recognition of the accurately delineated transaction)",
      "¶1.142–1.143 (when a transaction may be disregarded)",
      "¶1.148 (Example 2: twenty years of future intangibles for a lump sum)"
    ]
  },

  {
    id: 15,
    theme: "non-recognition",
    themeLabel: "Non-recognition",
    title: "Lump sum for twenty years of future intangibles",
    group: "Company S1 · Company S2",
    refs: "Chapter I · Example 2 (non-recognition) · ¶1.148",
    atGlance:
      "Company S1 develops intangibles through research and uses them for new products that it can make and sell. For a lump sum, it agrees to transfer to Company S2, an associated company, unlimited rights to every future intangible that may come out of its work over twenty years. Can the arrangement be priced as it stands and, if not, what replaces it?",
    parties: {
      kind: "tested-party",
      left: { name: "Company S1", role: "Conducts research · develops intangibles for new products" },
      right: { name: "Company S2", role: "Associated company · pays a lump sum" },
      arrowLabel: "unlimited rights to all future intangibles",
      note: "The rights extend to whatever intangibles Company S1's future work may produce during a twenty-year period."
    },
    timeline: [
      "Company S1 carries out research to develop intangibles and uses them to create new products, which it can manufacture and sell.",
      "It agrees to transfer to Company S2, an associated company, unlimited rights to every future intangible that may result from its future work during a period of twenty years.",
      "In return, Company S2 makes a lump sum payment.",
      "The range of development activities that Company S1 may carry on during those twenty years is uncertain."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Neither company can reliably determine whether the lump sum reflects an appropriate valuation: the range of Company S1's development activities over the twenty years is uncertain, and any valuation of the possible outcomes would be entirely speculative.",
        question: "How should the arrangement be dealt with in the transfer pricing analysis?",
        mcq: [
          "Its structure, including the form of payment, is replaced by the alternative that best fits the facts of the case.",
          "Its structure is respected, and the lump sum is tested against a valuation based on projections of Company S1's research.",
          "It is disregarded with nothing in its place, as if no rights had been transferred and no lump sum had been paid."
        ],
        correctIdx: 0,
        analysis:
          "Neither party can reliably judge whether the payment reflects an appropriate valuation, which makes the arrangement commercially irrational for both. Its structure, form of payment included, should be modified to the one most consistent with the facts, guided by functions, assets, risks and the other economically relevant characteristics. No single replacement is named: depending on the facts, it could be financing by Company S2, research services by Company S1 or, where specific intangibles are identifiable, a licence with contingent payment terms for developing them, with the guidance on hard-to-value intangibles taken into account as appropriate.",
        verdict: "Structure should be modified"
      }
    ],
    takeaway:
      "An arrangement that neither party has a reliable means of valuing may be commercially irrational; then its structure, not merely its price, is modified. The replacement should stay as close as possible to the actual facts while achieving a commercially rational result on which the parties could have agreed a price (¶1.144).",
    crossRefs: [
      "Section D.2 (recognition of the accurately delineated transaction)",
      "¶1.146–1.147 (Example 1: insurance where there is no market)",
      "Section D.4 of Chapter VI (hard-to-value intangibles)"
    ]
  },

  {
    id: 16,
    theme: "group-synergies",
    themeLabel: "Group synergies",
    title: "Borrowing on the strength of group membership",
    group: "P group",
    refs: "Chapter I · Example 1 (synergies) · ¶1.184–1.186",
    atGlance:
      "On its own S would be rated only Baa, but because it belongs to the P group, whose parent is rated AAA, large independent lenders lend to it at the rates charged to A-rated borrowers. S takes a EUR 50 million loan from an independent lender and, at the same time and rate, another EUR 50 million from T, a fellow subsidiary. Is T's rate arm's-length?",
    parties: {
      kind: "tested-party",
      left: { name: "T", role: "Subsidiary of P · lender" },
      right: { name: "S", role: "Borrower · Baa on a stand-alone basis · borrows on A-rated terms" },
      arrowLabel: "EUR 50 million loan",
      note: "At the same time an independent lender lends S another EUR 50 million; terms, conditions and interest rate are the same. P, the parent, maintains an AAA rating."
    },
    timeline: [
      "A financial services MNE group has P as its parent company. Because the group's consolidated balance sheet is strong, P is able to keep an AAA credit rating consistently.",
      "S belongs to the group and offers the same type of financial services as other members, with large-scale operations in an important market. Judged on its own balance sheet, S would merit a rating of only Baa.",
      "Membership of the P group nevertheless means that large independent lenders will lend to S at the interest rates they would charge an independent A-rated borrower.",
      "An independent lender lends S EUR 50 million at the market interest rate for A-rated borrowers. It sets its terms and conditions aware that S has other borrowings, the simultaneous loan from T among them.",
      "Simultaneously T, which like S is a subsidiary of P and has characteristics similar to the independent lender's, lends S a further EUR 50 million; its terms, conditions and interest rate match the independent lender's."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "T lends S EUR 50 million; its terms, conditions and interest rate match those of an independent lender that lends S the same amount at the same time. The rate is the market rate for A-rated borrowers, which S obtains because it is a member of the P group.",
        question: "Is the interest rate on T's loan an arm's-length rate?",
        mcq: [
          "Yes: it equals the rate an independent lender charges S on a comparable loan, and group membership alone calls for no payment or adjustment.",
          "No: the rate should be the higher one for a Baa-rated borrower, because Baa is the rating that S's own balance sheet would support.",
          "Yes as to the rate, but S should also pay P a fee for the better credit standing it enjoys as a member of the P group."
        ],
        correctIdx: 0,
        analysis:
          "The rate T charges is an arm's-length rate, for two reasons. First, an independent lender charged S the very same rate in a comparable transaction. Second, S's ability to borrow from independent enterprises more cheaply than it could outside the group is a synergy that flows from group membership alone: no member of the group took any deliberate concerted action to bring it about, so it calls for neither a payment nor a comparability adjustment.",
        verdict: "Arm's-length, no adjustment"
      }
    ],
    takeaway:
      "A synergy benefit that arises purely from group membership, without deliberate concerted action or any service or other function performed by group members, need not be separately compensated or allocated, whatever its size (¶1.178). An independent lender's rate on a comparable loan can then be used unadjusted.",
    crossRefs: [
      "Section D.8 (MNE group synergies)",
      "¶1.178 and ¶7.13 (incidental benefits of group membership)",
      "¶1.187 (Example 2: P adds an express guarantee)"
    ]
  },

  {
    id: 17,
    theme: "group-synergies",
    themeLabel: "Group synergies",
    title: "Parent guarantee on top of group membership",
    group: "P group",
    refs: "Chapter I · Example 2 (synergies) · ¶1.187",
    atGlance:
      "S would be rated only Baa on its own, but as a member of the P group it can borrow at the rate for A-rated borrowers without any formal guarantee. Its parent P, rated AAA, guarantees a EUR 50 million loan from Bank A to induce it to lend at the rate available to AAA-rated borrowers. Should S pay P a guarantee fee and, if so, for which benefit?",
    parties: {
      kind: "three-party-flow",
      first: { name: "P", role: "Parent · AAA rating · guarantor" },
      second: { name: "Bank A", role: "Lender" },
      third: { name: "S", role: "Borrower · Baa on a stand-alone basis" },
      label1: "express guarantee",
      label2: "EUR 50 million loan",
      note: "No formal guarantee is needed, the functional analysis suggests, for Bank A to lend to S at the rate for A-rated borrowers. What P's guarantee is meant to obtain is the rate available to AAA-rated borrowers."
    },
    timeline: [
      "P, the parent of an MNE group in the financial services business, keeps an AAA credit rating thanks to the group's strong consolidated balance sheet (facts taken over from Example 1, ¶1.184).",
      "S, a group member, would merit only a Baa rating on its own balance sheet. As a member of the P group it can nevertheless borrow from large independent lenders at the interest rates charged to A-rated borrowers (also ¶1.184).",
      "S takes a EUR 50 million loan from Bank A. The functional analysis suggests that, even without a formal guarantee, Bank A would lend at the interest rate for A-rated borrowers.",
      "P nevertheless agrees to guarantee the loan, so as to induce Bank A to charge the interest rate it would offer an AAA-rated borrower."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The functional analysis suggests Bank A would lend S the EUR 50 million at the rate for A-rated borrowers with no formal guarantee, though S's own balance sheet would support only Baa. P's express guarantee is meant to secure the rate for AAA-rated borrowers.",
        question: "Should S pay P a guarantee fee and, if so, for which benefit?",
        mcq: [
          "Yes, for the improvement in its credit standing from A to AAA, as the step from Baa to A need not be compensated.",
          "Yes, for the improvement in its credit standing from Baa to AAA, since Baa is all its own balance sheet supports.",
          "No, because borrowing on the strength of the parent's AAA rating is a benefit of group membership, which is not paid for."
        ],
        correctIdx: 0,
        analysis:
          "For P's express guarantee, S should be required to pay P a fee. The arm's-length fee should reflect only the improvement the guarantee itself brings, from A to AAA, not the whole distance from S's stand-alone Baa to AAA. The step from Baa to A is a synergy from purely passive association with the group, which under this section need not be compensated; the step from A to AAA exists only because P provided the guarantee, a deliberate concerted action, and should be compensated. A footnote cautions that the example is not comprehensive guidance on guarantee fees and refers to Chapter X.",
        verdict: "Fee for A to AAA"
      }
    ],
    takeaway:
      "Split the benefit by its source: what a borrower gains from passive association with its group need not be paid for, while what it gains from a deliberate concerted action, such as a parent's express guarantee, should be. By its own footnote, the example is not comprehensive guidance on guarantee fees.",
    crossRefs: [
      "¶1.184–1.186 (Example 1: the same borrower without a guarantee)",
      "Chapter X (transfer pricing aspects of financial transactions)",
      "Section D.8 (MNE group synergies)"
    ]
  },

  {
    id: 18,
    theme: "group-synergies",
    themeLabel: "Group synergies",
    title: "Central purchasing: Company A buys and resells",
    group: "Company A · group members",
    refs: "Chapter I · Example 3 (synergies) · ¶1.188",
    atGlance:
      "Company A acts as central purchasing manager for its whole group, buying from independent suppliers and reselling to its associated enterprises. Using only the purchasing power of the entire group, it negotiates a supplier's price for widgets down from USD 200 to USD 110. At what price should it resell the widgets to the other group members?",
    parties: {
      kind: "three-party-flow",
      first: { name: "Independent supplier", role: "Sells widgets · price reduced from USD 200 to USD 110" },
      second: { name: "Company A", role: "Central purchasing manager · buys and resells" },
      third: { name: "Group members", role: "Associated enterprises · buy from Company A" },
      label1: "widgets at USD 110",
      label2: "resale price?"
    },
    timeline: [
      "Company A is given the role of central purchasing manager for the group as a whole.",
      "Company A buys from independent suppliers and sells on to its associated enterprises.",
      "Using only the negotiating leverage that comes from the purchasing power of the entire group, Company A gets a supplier to cut its widget price from USD 200 to USD 110.",
      "Comparable co-ordination services, in comparable uncontrolled transactions with a comparable volume of purchases, are assumed to have earned a service fee equal to USD 6 per widget in total."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The cut from USD 200 to USD 110 was won solely with the purchasing power of the entire group. Comparable co-ordination services are assumed to earn a fee of USD 6 per widget in total, set as Company A's costs plus a mark-up.",
        question: "What is the arm's-length price for Company A's resale of the widgets to group members?",
        mcq: [
          "Approximately USD 116: Company A earns USD 6 per widget for its co-ordination services and the members benefit by about USD 84 per widget.",
          "At or near USD 200: Company A negotiated the reduction and, as the buyer and reseller of the widgets, keeps the margin it created.",
          "USD 110: the reduction is owed to the group's purchasing power alone, so Company A should resell at exactly its purchase price."
        ],
        correctIdx: 0,
        analysis:
          "The reduction was obtained solely on the strength of the entire group's purchasing power, so the arm's-length resale price would not be at or anywhere near the undiscounted USD 200. It would instead reward Company A for its services in co-ordinating the purchasing. On the assumed benchmark of USD 6 per widget, the intercompany resale price comes out at approximately USD 116. Each group member then derives approximately USD 84 per widget of benefit from the group's purchasing power, and Company A earns USD 6 per widget bought by the members for its service functions.",
        verdict: "Resale at about USD 116"
      }
    ],
    takeaway:
      "Where a central purchasing company obtains a price reduction solely through the group's purchasing power, it is rewarded for its co-ordination services and does not keep the reduction. What remains of the purchasing synergy should typically be shared by group members in proportion to their purchase volumes (¶1.182).",
    crossRefs: [
      "Section D.8 (MNE group synergies)",
      "¶1.180–1.182 (deliberate concerted action and how its benefits are shared)",
      "¶1.189 (Example 4: Company A negotiates but does not buy)"
    ]
  },

  {
    id: 19,
    theme: "group-synergies",
    themeLabel: "Group synergies",
    title: "Central purchasing: Company A only negotiates",
    group: "Company A · group members",
    refs: "Chapter I · Example 4 (synergies) · ¶1.189",
    atGlance:
      "Company A is its group's central purchasing manager and, relying on the purchasing power of the entire group, negotiates a discount on widgets with an independent supplier. It does not buy and resell the widgets: having negotiated for the group, it leaves the members to buy from the supplier directly. Who keeps the benefit of the discount?",
    parties: {
      kind: "provider-to-recipients",
      provider: { name: "Company A", role: "Central purchasing manager · negotiates the discount" },
      recipients: [
        { name: "Group members", role: "Buy the widgets directly from the independent supplier" }
      ],
      arrowLabel: "co-ordinating services",
      note: "Company A never takes title to the widgets and holds no inventory."
    },
    timeline: [
      "Company A is given the role of central purchasing manager for the group as a whole.",
      "Using only the purchasing power of the entire group, it negotiates a supplier's price for widgets down from USD 200 to USD 110 (facts taken over from ¶1.188).",
      "Unlike in ¶1.188, Company A does not buy and resell the widgets. It negotiates the discount for the group, after which the members buy the widgets directly from the independent supplier.",
      "For these co-ordinating services the comparability analysis is assumed to suggest a fee of USD 5 per widget, against USD 6 per widget where Company A buys and resells (¶1.188)."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company A negotiates the discount for the group; the members then buy the widgets from the independent supplier themselves. For Company A's co-ordinating services, the comparability analysis is assumed to suggest a fee of USD 5 per widget.",
        question: "Who keeps the benefit of the group purchasing discount?",
        mcq: [
          "Each member that buys widgets keeps the discount on its own purchases, after paying Company A its service fee.",
          "Company A keeps part of the discount on top of its fee, because without its negotiation there would be no discount.",
          "All group members share the discount, whether or not they buy widgets, because the whole group's purchasing power produced it."
        ],
        correctIdx: 0,
        analysis:
          "Company A performed co-ordinating services for the other group members, and on the assumed comparability analysis its entitlement is a service fee of USD 5 per widget, even though it never buys or resells a widget. Once that fee is paid, the benefit of the group purchasing discount stays with the members that buy the widgets, each for the part attributable to its own purchases. The fee is assumed to be lower than the USD 6 of the buy-and-resell example (¶1.188), which may reflect the lower risk of a service provider that takes no title to the widgets and holds no inventory.",
        verdict: "Members keep discount after fee"
      }
    ],
    takeaway:
      "Where a discount rests on the group's purchasing power, the company that negotiates it earns a fee for its co-ordinating services, whether or not it also buys and resells, and the purchasing members keep the rest. Taking no title and holding no inventory may mean less risk and a lower fee.",
    crossRefs: [
      "¶1.188 (Example 3: Company A buys and resells)",
      "¶1.180 (concerted action without purchase and sale transactions among group members)",
      "Section D.8 (MNE group synergies)"
    ]
  },

  {
    id: 20,
    theme: "group-synergies",
    themeLabel: "Group synergies",
    title: "A group volume discount invoiced to one affiliate",
    group: "MNE group based in Country A",
    refs: "Chapter I · Example 5 (synergies) · ¶1.190–1.193",
    atGlance:
      "Manufacturing affiliates in Country B (tax rate 30%) and Country C (10%) each need 5 000 widgets. A purchasing employee at the shared services centre in Country D arranges simultaneous orders that earn a 5% bulk discount, then has the supplier invoice the Country B affiliate USD 50 000 and the Country C affiliate USD 45 000. May Country B adjust?",
    parties: {
      kind: "provider-to-recipients",
      provider: { name: "Independent supplier", role: "USD 10 per widget · 5% discount on bulk purchases above 7 500 units" },
      recipients: [
        { name: "Country B manufacturing affiliate", role: "Country B tax rate 30% · 5 000 widgets · invoiced USD 50 000" },
        { name: "Country C manufacturing affiliate", role: "Country C tax rate 10% · 5 000 widgets · invoiced USD 45 000" }
      ],
      arrowLabel: "10 000 widgets for USD 95 000",
      note: "A purchasing employee at the group's shared services centre in Country D arranges the purchase and the invoicing. Other group members pay for the centre's services at cost plus, which the example assumes to be arm's-length compensation."
    },
    timeline: [
      "A multinational group has its base in Country A, manufacturing subsidiaries in Country B (tax rate 30%) and Country C (tax rate 10%), and a shared services centre in Country D.",
      "Other group members, including the two manufacturing subsidiaries, pay the shared services centre on a cost plus basis, which is assumed to be arm's-length compensation for its services.",
      "Each manufacturing subsidiary needs 5 000 widgets from an independent supplier, which sells them at USD 10 apiece and gives a 5% discount on bulk purchases above 7 500 units.",
      "A purchasing employee at the centre confirms with the supplier that if both affiliates buy 5 000 widgets at the same time, the discount applies to all 10 000: a total price of USD 95 000.",
      "The employee places the orders and asks the supplier to invoice the Country B affiliate USD 50 000 and the Country C affiliate USD 45 000, each for 5 000 widgets. As it still receives the agreed USD 95 000, the supplier does so."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Each affiliate takes 5 000 of the 10 000 widgets that together earn the 5% discount. The Country B affiliate is invoiced USD 50 000, what it would have paid buying alone, and the Country C affiliate USD 45 000. No explicit transaction links the two.",
        question: "May Country B adjust the expenses of its manufacturing affiliate?",
        mcq: [
          "Yes: it may reduce the Country B affiliate's expenses by USD 2 500, because the invoicing misallocates the benefit of the volume discount.",
          "No: buying alone, the Country B affiliate could not have paid less than USD 50 000, so the price it was invoiced is arm's-length.",
          "No: the Country B and Country C affiliates did not transact with each other, so there is no controlled transaction to adjust."
        ],
        correctIdx: 0,
        analysis:
          "Country B would be entitled to a transfer pricing adjustment that lowers its manufacturing affiliate's expenses by USD 2 500. The Guidelines state the figure without the working: it equals the 5% discount on the affiliate's own 5 000 widgets at USD 10 apiece, which is half of the total discount. The way the invoices were split puts the benefit of the volume-purchasing synergy in the wrong place. That the Country B affiliate, acting alone, could not have bought for less than USD 50 000 does not stand in the way. Nor does the absence of an explicit transaction between the two manufacturing affiliates: the discount was arranged by deliberate concerted group action, which provides a basis for allocating part of it to the Country B affiliate.",
        verdict: "Adjustment of USD 2 500"
      }
    ],
    takeaway:
      "When a deliberate concerted group action earns a volume discount, the way the supplier is asked to split the invoices does not settle who gets the benefit. Part of it may be allocated to an affiliate that paid no more than it would have paid alone, even without an explicit transaction between the affiliates.",
    crossRefs: [
      "Section D.8 (MNE group synergies)",
      "¶1.179, footnote 3 (deliberate concerted action requires arm's-length compensation)",
      "¶1.182 (purchasing synergies shared in proportion to purchase volumes)"
    ]
  }

];
