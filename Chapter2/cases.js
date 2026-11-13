// Single source of truth for the case content rendered on the page.
// Each case must match the shape validated by tools/validate-cases.mjs.

globalThis.CASES = [

{
    id: 1,
    theme: "cup",
    themeLabel: "CUP method",
    title: "Coffee beans: Colombian, then Brazilian",
    group: null,
    refs: "Chapter II · CUP method · ¶2.24",
    atGlance:
      "Unbranded Colombian coffee beans are sold between two associated enterprises, and an independent enterprise sells beans of a similar type, quality and quantity under similar conditions. If the only uncontrolled sale available were of unbranded Brazilian beans instead, how far could the CUP method still be relied on?",
    timeline: [
      "One associated enterprise sells unbranded coffee beans from Colombia to another.",
      "Unbranded Colombian coffee beans are also sold by an independent enterprise; in type, quality and quantity they are similar to the beans in the controlled sales.",
      "The two sets of sales are assumed to coincide roughly in time, to sit at one and the same stage of the production and distribution chain, and to be made under similar conditions.",
      "In a variation, the only uncontrolled transaction available involves unbranded Brazilian coffee beans."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Unbranded Colombian coffee beans are what the independent enterprise sells and what is sold between the two associated enterprises, and the beans in the two sales are similar in type, quality and quantity. Timing is about the same, the stage in the chain is the same and the conditions are similar.",
        question: "How reliable is the CUP method on these facts?",
        mcq: [
          "Particularly reliable, because the product sold between the associated enterprises is also sold by an independent enterprise.",
          "Of little use, because the uncontrolled sale is made by an outsider and not by one of the associated enterprises themselves.",
          "Less reliable than a margin-based method, because commodity prices move too much for sales to be compared directly."
        ],
        correctIdx: 0,
        analysis:
          "For the Guidelines this is where the CUP method is particularly reliable: the very product that passes between the two associated enterprises is also sold by an independent enterprise. The beans are similar in type, quality and quantity, and the example assumes about the same timing, the same stage in the chain and similar conditions for both sets of sales. The uncontrolled sale in the example is one made by an independent enterprise.",
        verdict: "CUP particularly reliable"
      },
      {
        letter: "B",
        facts:
          "The only uncontrolled transaction available now involves unbranded Brazilian coffee beans, whereas the beans sold between the associated enterprises are Colombian.",
        question: "What should be done with the Brazilian sale?",
        mcq: [
          "Ask whether the difference in the beans has a material effect on price and, if it does, make an adjustment for it.",
          "Set it aside, because beans of another origin are a different product and cannot support a CUP analysis at all.",
          "Use its price as it stands, because both sales are of unbranded coffee beans and no further inquiry is needed."
        ],
        correctIdx: 0,
        analysis:
          "The Guidelines neither discard the Brazilian sale nor accept it untested. The appropriate step is to ask whether the difference between the beans matters materially to price, for instance whether beans from one source generally fetch a premium, or sell at a discount, in the open market. Commodity markets may supply that information, or it may be worked out from dealer prices. Where the effect on price is material, the Guidelines consider some adjustment appropriate.",
        verdict: "Inquire; adjust if material"
      },
      {
        letter: "C",
        facts:
          "The difference between the Colombian and the Brazilian beans does have a material effect on price, and a reasonably accurate adjustment for it cannot be made.",
        question: "What follows for the CUP method?",
        mcq: [
          "It becomes less reliable, and another, less direct method might have to be selected in its place.",
          "Nothing changes, because the CUP method takes priority whenever any uncontrolled price for coffee beans exists.",
          "A rough adjustment will do, because the CUP method then stays as reliable as it was for identical beans."
        ],
        correctIdx: 0,
        analysis:
          "Where a material difference cannot be adjusted for with reasonable accuracy, the Guidelines say the CUP method loses reliability. Another, less direct method might then have to be chosen. The wording is measured: reliability is reduced, and a change of method is a possibility, not an automatic consequence.",
        verdict: "Reliability reduced"
      }
    ],
    takeaway:
      "Where the product sold between associated enterprises is also sold by an independent enterprise in similar circumstances, the CUP method is particularly reliable. Where the product differs, ask whether the difference materially affects price and adjust if it does; if no reasonably accurate adjustment can be made, the method is less reliable and another might have to be chosen.",
    crossRefs: [
      "Part II, Section B.2 (examples of the CUP method)",
      "¶2.25 and ¶2.26 (differences in delivery terms and in volume)"
    ]
  },

  {
    id: 2,
    theme: "cup",
    themeLabel: "CUP method",
    title: "Delivered price against f.o.b. factory",
    group: null,
    refs: "Chapter II · CUP method · ¶2.25",
    atGlance:
      "Controlled and uncontrolled sales are made in identical circumstances, with one exception: a delivered price applies to the controlled sales, whereas the uncontrolled ones are on f.o.b. factory terms. Does the difference in delivery terms stand in the way of the CUP method, or can it be dealt with?",
    timeline: [
      "A delivered price is charged in the controlled sales.",
      "The uncontrolled sales are on f.o.b. factory terms.",
      "The two sets of sales therefore differ in their terms for transportation and insurance.",
      "In every other respect the circumstances surrounding the controlled and the uncontrolled sales are identical."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The only difference between the controlled and the uncontrolled sales lies in the delivery terms: a delivered price on one side, f.o.b. factory on the other. It concerns transportation and insurance.",
        question: "How should the uncontrolled sales price be used?",
        mcq: [
          "After adjusting it for the difference in delivery terms between the two sets of sales.",
          "As it stands, because the product and all other circumstances are identical and delivery terms are a detail.",
          "Not at all, because sales made on different delivery terms cannot serve as comparable uncontrolled sales."
        ],
        correctIdx: 0,
        analysis:
          "The Guidelines present this as a case where adjustments may be required. Transportation and insurance terms generally affect price in a way that is definite and can reasonably be ascertained. The difference in delivery terms should therefore be adjusted for when the uncontrolled sales price is determined. The difference is neither ignored nor treated as a reason to give up the comparison.",
        verdict: "Adjust for delivery terms"
      }
    ],
    takeaway:
      "A difference in delivery terms does not disqualify an uncontrolled price. Its effect on price can generally be ascertained, so the price is adjusted for it and the comparison goes ahead.",
    crossRefs: [
      "Part II, Section B.2 (examples of the CUP method)",
      "¶2.24 (a difference in the product: coffee beans)",
      "¶2.26 (a difference in volume)"
    ]
  },

  {
    id: 3,
    theme: "cup",
    themeLabel: "CUP method",
    title: "Same product, different volumes",
    group: null,
    refs: "Chapter II · CUP method · ¶2.26",
    atGlance:
      "An associated enterprise in a taxpayer's MNE group pays the taxpayer USD 80 per ton for 1 000 tons of a product. An independent enterprise, buying 500 tons of the same product from the taxpayer at the same time, pays USD 100 per ton. What does the difference in volume mean for the transfer price?",
    parties: {
      kind: "provider-to-recipients",
      provider: { name: "Taxpayer", role: "Seller of the product" },
      recipients: [
        { name: "Associated enterprise", role: "1 000 tons · USD 80 per ton" },
        { name: "Independent enterprise", role: "500 tons · USD 100 per ton" }
      ],
      arrowLabel: "same product, same time"
    },
    timeline: [
      "An associated enterprise in the taxpayer's MNE group buys 1 000 tons of a product from the taxpayer at USD 80 per ton.",
      "An independent enterprise buys 500 tons of the same product from the taxpayer at the same time, at USD 100 per ton.",
      "The product is the same in both sales; the volumes and the prices per ton differ."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The product and the timing are the same. The controlled sale is for the larger volume, 1 000 tons against 500 tons, and at the lower price, USD 80 against USD 100 per ton.",
        question: "What does the difference in volume call for?",
        mcq: [
          "An evaluation of whether it should lead to an adjustment, using market research into typical volume discounts.",
          "Nothing more, because the USD 100 per ton charged to the independent buyer applies to the controlled sale as it stands.",
          "Nothing more, because the larger volume plainly accounts for the lower price and USD 80 per ton needs no support."
        ],
        correctIdx: 0,
        analysis:
          "The Guidelines do not say whether USD 80 per ton is an arm's-length price. What the case requires, they say, is an assessment of whether the difference in volume should lead to an adjustment of the transfer price. That means researching the relevant market: transactions in similar products are analysed to find out what volume discounts are typical. The outcome depends on what that research shows.",
        verdict: "Open: research volume discounts"
      }
    ],
    takeaway:
      "A price charged to an independent enterprise for the same product cannot simply be carried over when the volumes differ. Whether the difference calls for an adjustment is a question for market research into typical volume discounts.",
    crossRefs: [
      "Part II, Section B.2 (examples of the CUP method)",
      "¶2.25 (an adjustment for a difference in delivery terms)"
    ]
  },

  {
    id: 4,
    theme: "resale-price",
    themeLabel: "Resale price method",
    title: "A warranty from one distributor, none from the other",
    group: "Distributor A · Distributor B",
    refs: "Chapter II · Resale price method · ¶2.42",
    atGlance:
      "Distributors A and B sell the same product, under the same brand name, in the same market. A offers a warranty and sells at a higher price, which gives it the higher gross profit margin so long as warranty servicing costs are left aside; B offers no warranty and sells for less. Can the two margins be compared as they stand?",
    timeline: [
      "Two distributors, A and B, sell the same product under the same brand name in the same market.",
      "A warranty is offered by Distributor A but not by Distributor B.",
      "The warranty is not part of a pricing strategy on Distributor A's part, so A sells the product at a higher price than B.",
      "Before the costs of servicing the warranty are taken into account, Distributor A's gross profit margin is higher than Distributor B's."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The warranty is the difference between the two distributors. Distributor A's higher price gives it a higher gross profit margin than Distributor B, so long as the costs of servicing the warranty are left out of account.",
        question: "Are the gross profit margins of A and B comparable?",
        mcq: [
          "Only once the warranty difference has been adjusted for with reasonable accuracy.",
          "Yes, because both distributors sell the same product, under the same brand, in the same market.",
          "No, and no adjustment can change that, because only one of the two distributors offers a warranty."
        ],
        correctIdx: 0,
        analysis:
          "Product, market and brand are the same, but the warranty feeds into price and so into the gross margin. Distributor A's higher price produces a higher gross profit margin as long as the costs of servicing the warranty are left out. The Guidelines conclude that the margins cannot be compared until that difference has been adjusted for with reasonable accuracy. The implication is that the comparison can go ahead once such an adjustment has been made.",
        verdict: "Adjust before comparing"
      }
    ],
    takeaway:
      "The same product, market and brand do not guarantee comparable gross margins. A difference such as a warranty offered by only one distributor has to be adjusted for with reasonable accuracy before the margins are compared.",
    crossRefs: [
      "Part II, Section C.2 (examples of the resale price method)",
      "¶2.43 (warranty function performed by the distributor or by the supplier)",
      "¶2.113 (the same facts where the warranty expenses cannot be ascertained)"
    ]
  },

  {
    id: 5,
    theme: "resale-price",
    themeLabel: "Resale price method",
    title: "Who performs the warranty, and where the cost is booked",
    group: "Distributor C · Distributor D",
    refs: "Chapter II · Resale price method · ¶2.43",
    atGlance:
      "The downstream price is uniform, because a warranty comes with every product. Distributor C carries out the warranty function and is compensated for it through a lower price from the supplier; for Distributor D the supplier performs the function and charges a higher price. Does it matter how C accounts for the cost of the warranty work?",
    timeline: [
      "The downstream price is uniform, because a warranty comes with every product.",
      "Distributor C carries out the warranty function itself; the supplier in fact compensates it for this by charging a lower price.",
      "The warranty function is not performed by Distributor D but by the supplier, with products going back to the factory.",
      "The price Distributor D pays its supplier is higher than the price charged to Distributor C."
    ],
    scenarios: [
      {
        letter: "A",
        facts:
          "Cost of goods sold is where Distributor C books the cost of performing the warranty function.",
        question: "Is a separate adjustment needed before the gross profit margins of C and D are compared?",
        mcq: [
          "No, because the gross profit margins adjust automatically once the warranty cost sits in cost of goods sold.",
          "Yes, because C performs a function that D does not, so C's margin has to be adjusted upwards for it.",
          "Yes, because D pays the higher purchase price, so D's margin has to be recomputed at the price C pays."
        ],
        correctIdx: 0,
        analysis:
          "Distributor C is compensated for the warranty function through a lower purchase price, and in this variation the cost of performing the function is recorded in cost of goods sold. On that footing, the Guidelines say, the gross profit margins adjust for the differences between C and D automatically. No further correction is called for.",
        verdict: "Adjustment is automatic"
      },
      {
        letter: "B",
        facts:
          "Distributor C records its warranty expenses as operating expenses, not in cost of goods sold.",
        question: "Can the gross profit margins of C and D be compared as reported?",
        mcq: [
          "No, because the margins are distorted and the distortion must be corrected first.",
          "Yes, because the downstream price is uniform, so the two gross margins already measure the same thing.",
          "No, and they never can be, because only one of the two distributors performs the warranty function."
        ],
        correctIdx: 0,
        analysis:
          "With the warranty expenses in operating expenses, the Guidelines find that the margins are distorted and that the distortion has to be corrected. Their reasoning runs through Distributor D: were D to perform the warranty function itself, its supplier would charge a lower transfer price, leaving D with a larger gross profit margin. The paragraph does not set out how the correction is to be made.",
        verdict: "Distortion must be corrected"
      }
    ],
    takeaway:
      "Where a distributor is paid for a function through a lower purchase price, gross margins line up automatically only if the cost of that function is booked in cost of goods sold. If it is booked in operating expenses, the margins are distorted and must be corrected before they are compared.",
    crossRefs: [
      "Part II, Section C.2 (examples of the resale price method)",
      "¶2.42 (a warranty offered by only one of two distributors)"
    ]
  },

  {
    id: 6,
    theme: "resale-price",
    themeLabel: "Resale price method",
    title: "Exclusive sales and technical applications",
    group: null,
    refs: "Chapter II · Resale price method · ¶2.44",
    atGlance:
      "In five jurisdictions a company sells a product through independent distributors that simply market it. In one other country, a market of strategic importance, its subsidiary must sell only the company's product and perform technical applications for customers. Can the independent distributors' margins be applied to the subsidiary?",
    parties: {
      kind: "provider-to-recipients",
      provider: { name: "The company", role: "Supplier of the product" },
      recipients: [
        { name: "Independent distributors", role: "Five jurisdictions · simply market the product" },
        { name: "Subsidiary", role: "One country · sells only the company's product · technical applications" }
      ],
      arrowLabel: "product"
    },
    timeline: [
      "In five jurisdictions where it has no subsidiaries, a company sells a product through independent distributors.",
      "All those distributors do is market the product; they perform no additional work.",
      "The company has created a subsidiary in one country.",
      "Given the strategic importance of that market, the subsidiary is required by the company to sell only the company's product and to carry out technical applications for customers."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The margins on offer are derived from independent enterprises that have no exclusive sales arrangement and do not perform technical applications like those the subsidiary undertakes. In every other respect the facts and circumstances are taken to be similar.",
        question: "Can those margins be applied to the subsidiary?",
        mcq: [
          "Only once it has been considered whether adjustments are needed to make them comparable.",
          "Yes, as they stand, because the product and all other facts and circumstances are similar.",
          "No, because the differences in function make the resale price method unusable here."
        ],
        correctIdx: 0,
        analysis:
          "The subsidiary differs from the independent distributors in two ways: it sells only the company's product, and it performs technical applications for customers. Even where everything else about the facts and circumstances is similar, the Guidelines say, it has to be considered whether adjustments are needed to achieve comparability. They go no further than that. The paragraph does not say that an adjustment will always be needed, what it would be, or that the method fails.",
        verdict: "Consider comparability adjustments"
      }
    ],
    takeaway:
      "Margins earned by distributors that simply market a product cannot be applied unexamined to a distributor that sells exclusively and performs technical applications. Whether adjustments are needed to achieve comparability has to be considered first.",
    crossRefs: [
      "Part II, Section C.2 (examples of the resale price method)",
      "¶2.112 (the same facts with the technical function performed by the comparables)"
    ]
  },

  {
    id: 7,
    theme: "cost-plus",
    themeLabel: "Cost plus method",
    title: "Timing mechanisms: comparing gross mark-ups",
    group: "A · B · X, Y and Z",
    refs: "Chapter II · Cost plus method · ¶2.59",
    atGlance:
      "A makes timing mechanisms for mass-market clocks and sells them to its foreign subsidiary B, earning a 5% gross profit mark-up. Independent manufacturers X, Y and Z make them for mass-market watches and earn 3% to 5%, but treat supervisory, general and administrative costs differently in their accounts. Can the mark-ups be compared as reported?",
    parties: {
      kind: "tested-party",
      left: { name: "A", role: "Domestic manufacturer · timing mechanisms for mass-market clocks" },
      right: { name: "B", role: "Foreign subsidiary of A" },
      arrowLabel: "timing mechanisms",
      note: "X, Y and Z, independent manufacturers in the same country as A, make timing mechanisms for mass-market watches and sell them to independent purchasers abroad."
    },
    timeline: [
      "A manufactures timing mechanisms for mass-market clocks in its home country and sells them to B, its foreign subsidiary.",
      "On its manufacturing operation A earns a gross profit mark-up of 5%.",
      "X, Y and Z, independent manufacturers in the same country, make timing mechanisms for mass-market watches, sell them to independent foreign purchasers and earn gross profit mark-ups of between 3% and 5% on their manufacturing operations.",
      "A books its supervisory, general and administrative costs as operating expenses, which keeps them out of cost of goods sold.",
      "For X, Y and Z, those costs are part of cost of goods sold and so are reflected in their gross profit mark-ups."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "A's 5% mark-up does not reflect supervisory, general and administrative costs, because A treats them as operating expenses. X, Y and Z carry those costs in cost of goods sold, so their mark-ups of 3% to 5% do reflect them.",
        question: "Can A's mark-up be tested against those of X, Y and Z as reported?",
        mcq: [
          "No, because the accounting must first be made consistent by adjusting the mark-ups of X, Y and Z.",
          "Yes, because A's 5% falls within the 3% to 5% earned by the independent manufacturers.",
          "No, because X, Y and Z make mechanisms for watches, not clocks, and must be rejected as comparables."
        ],
        correctIdx: 0,
        analysis:
          "The reported figures are not measured on the same basis. A leaves supervisory, general and administrative costs out of cost of goods sold, whereas the mark-ups of X, Y and Z are struck after those costs. The Guidelines conclude that the mark-ups of X, Y and Z have to be adjusted so that the accounting is consistent. The example keeps X, Y and Z in the comparison even though their mechanisms are for watches; the one adjustment it calls for is an accounting one. It gives no adjusted figures and does not say whether A's mark-up proves to be at arm's length.",
        verdict: "Adjust for accounting consistency"
      }
    ],
    takeaway:
      "A gross profit mark-up means little until you know which costs sit in cost of goods sold. Before mark-ups are compared under the cost plus method, the controlled and uncontrolled figures have to treat the same costs in the same way.",
    crossRefs: [
      "Part II, Section D.2 (examples of the cost plus method)",
      "¶2.111 (net profit indicators where the costs to be adjusted cannot be identified)"
    ]
  },

  {
    id: 8,
    theme: "cost-plus",
    themeLabel: "Cost plus method",
    title: "Television sets assembled at the parent's risk",
    group: "Company C · Company E",
    refs: "Chapter II · Cost plus method · ¶2.60",
    atGlance:
      "Company C in Country D, where wages are very low compared with Country F, assembles television sets at the expense and risk of its parent, Company E in Country F. Company E provides the necessary components and know-how, and the sets then go to its distribution centres. What is Company C's function, and what is the basis for the cost plus method?",
    parties: {
      kind: "tested-party",
      left: { name: "Company C", role: "Country D · 100% subsidiary of Company E · assembles television sets" },
      right: { name: "Company E", role: "Country F · provides components and know-how · bears expense and risk" },
      arrowLabel: "assembled television sets"
    },
    timeline: [
      "Company E, located in Country F, owns 100% of Company C in Country D; wages in Country D are very low in comparison with Country F.",
      "Company C assembles television sets at the expense and risk of Company E, which provides all the necessary components, know-how and the like.",
      "Company E guarantees to purchase the assembled product in the event that the sets do not meet a certain quality standard.",
      "Once quality-checked, the sets go to distribution centres that Company E has in several countries, again at Company E's expense and risk."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company E provides the components and know-how and bears the expense and risk of the assembly and of the transport to its distribution centres. Any risk that might fall on Company C concerns deviations from the quality and quantity agreed.",
        question: "What forms the basis for applying the cost plus method to Company C?",
        mcq: [
          "All the costs connected with the assembling activities, as Company C's function can be described as pure contract manufacturing.",
          "Company C's wage costs alone, as low-cost labour is the only thing that Company C adds to the television sets.",
          "No cost base at all, as Company C should share in the profit on the sets because of the low wages in Country D."
        ],
        correctIdx: 0,
        analysis:
          "Company E carries the expense and risk and provides the components and know-how. On those facts the Guidelines say Company C's function can be described as purely contract manufacturing, and any risk that might fall on it concerns deviations from the quality and quantity agreed. The cost plus method is then built on every cost connected with the assembling activities. The paragraph records the low wages in Country D but draws no separate conclusion from them, and it does not say what the mark-up should be.",
        verdict: "Cost plus on assembly costs"
      }
    ],
    takeaway:
      "A company that assembles at its parent's expense and risk, with components and know-how the parent provides, can be described as a pure contract manufacturer. The cost plus method is then applied to all the costs connected with its assembling activities.",
    crossRefs: [
      "Part II, Section D.2 (examples of the cost plus method)",
      "¶2.61 (contract research rewarded on a cost plus basis)"
    ]
  },

  {
    id: 9,
    theme: "cost-plus",
    themeLabel: "Cost plus method",
    title: "Contract research for a group company",
    group: "Company A · Company B",
    refs: "Chapter II · Cost plus method · ¶2.61",
    atGlance:
      "Company A agrees to carry out contract research for Company B, a member of the same MNE group. Company B assumes all the risks related to the research and owns all the intangibles developed through it, and so also has the profit chances. How should Company A be remunerated?",
    parties: {
      kind: "tested-party",
      left: { name: "Company A", role: "Carries out the contract research" },
      right: { name: "Company B", role: "Assumes all research risks · owns the intangibles developed" },
      arrowLabel: "contract research"
    },
    timeline: [
      "Company A and Company B both belong to the same MNE group.",
      "Under an agreement between the two, Company A is to carry out contract research for Company B.",
      "Every risk connected with the research is assumed by Company B.",
      "The intangibles developed through the research all belong to Company B, which therefore also has the profit chances the research brings."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Company A performs the research. All the related risks lie with Company B, which also owns every intangible the research produces and therefore also has the profit chances that come from it.",
        question: "How should Company A be remunerated for the research?",
        mcq: [
          "On a cost plus basis, with the research costs compensated and a mark-up that may reflect how innovative and complex the research is.",
          "By a share of the profit from the intangibles, because Company A is the party that actually carries out the research.",
          "By reimbursement of its costs with no mark-up, because Company B assumes every risk related to the research."
        ],
        correctIdx: 0,
        analysis:
          "The Guidelines regard an arrangement of this kind as typical of those to which a cost plus method is applied. The risks all lie with Company B, and because the intangibles developed are Company B's, so are the profit chances the research brings. Company A is to be compensated for all the costs of the research which the associated parties have agreed upon. The mark-up on top may reflect the degree of innovation and complexity of the research carried out.",
        verdict: "Typical cost plus setup"
      }
    ],
    takeaway:
      "Contract research carried out for a group company that assumes all the risks and owns the resulting intangibles is a typical case for the cost plus method. The costs of the research are compensated, and the mark-up may reflect how innovative and complex the research is.",
    crossRefs: [
      "Part II, Section D.2 (examples of the cost plus method)",
      "¶2.60 (contract manufacturing rewarded on a cost plus basis)"
    ]
  },

  {
    id: 10,
    theme: "tnmm",
    themeLabel: "Transactional net margin method",
    title: "Timing mechanisms: costs that cannot be identified",
    group: "A · B · X, Y and Z",
    refs: "Chapter II · TNMM · ¶2.111",
    atGlance:
      "A makes timing mechanisms for mass-market clocks, sells them to its foreign subsidiary B and earns a 5% gross profit mark-up; the mark-ups of independent manufacturers X, Y and Z run from 3% to 5%. Those mark-ups, unlike A's, reflect supervisory, general and administrative costs, so an adjustment is needed. What if those costs cannot be identified?",
    parties: {
      kind: "tested-party",
      left: { name: "A", role: "Domestic manufacturer · timing mechanisms for mass-market clocks" },
      right: { name: "B", role: "Foreign subsidiary of A" },
      arrowLabel: "timing mechanisms",
      note: "X, Y and Z, independent manufacturers in the same country as A, make timing mechanisms for mass-market watches and sell them to independent purchasers abroad."
    },
    timeline: [
      "A manufactures timing mechanisms for mass-market clocks in its home country, sells them to its foreign subsidiary B and earns a gross profit mark-up of 5% on its manufacturing operation.",
      "X, Y and Z, independent manufacturers in the same country, make timing mechanisms for mass-market watches, sell them to independent foreign purchasers and earn gross profit mark-ups of between 3% and 5%.",
      "Supervisory, general and administrative costs are operating expenses in A's accounts but part of cost of goods sold in those of X, Y and Z, so the gross profit mark-ups of X, Y and Z reflect those costs and A's does not.",
      "It is known that the mark-ups of X, Y and Z need an adjustment for that difference.",
      "The supervisory, general and administrative costs within the cost of goods sold of X, Y and Z cannot be identified well enough to adjust the mark-ups for a reliable application of the cost plus method."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "An adjustment to the mark-ups of X, Y and Z is known to be required, because they reflect supervisory, general and administrative costs and A's mark-up does not. The particular costs cannot be identified, so the mark-ups cannot be adjusted for a reliable application of cost plus.",
        question: "What do the Guidelines suggest in that situation?",
        mcq: [
          "Net profit indicators may need to be examined, in the absence of more reliable comparisons.",
          "The cost plus method still applies with the mark-ups as reported, since A's 5% lies within the 3% to 5% range.",
          "X, Y and Z must be dropped as comparables, since mark-ups that cannot be adjusted allow no consistent comparison."
        ],
        correctIdx: 0,
        analysis:
          "¶2.59 shows that gross mark-ups have to be adjusted before they can be compared consistently and reliably. If the costs concerned are easy to analyse, making that adjustment may present no difficulty. Here an adjustment is known to be required but the particular costs cannot be identified; the Guidelines say it may nevertheless be possible to identify the net profit on the transaction and in that way to use a consistent measure. For X, Y and Z that means net profit indicators may need to be examined, in the absence of more reliable comparisons. Both steps are hedged: the paragraph offers net profit as a route that may be open when a gross mark-up cannot be reliably adjusted, not as a certainty.",
        verdict: "May need net profit indicators"
      }
    ],
    takeaway:
      "Where gross mark-ups are known to need an adjustment but the costs behind it cannot be identified, it may still be possible to identify net profit and so compare on a consistent measure. Examining net profit indicators may then be necessary, in the absence of more reliable comparisons.",
    crossRefs: [
      "¶2.59 (the base facts, under the cost plus method)",
      "¶2.112 and ¶2.113 (net margins where the cost of a functional difference is unknown)",
      "Part III, Section B.4 (examples of the transactional net margin method)"
    ]
  },

  {
    id: 11,
    theme: "tnmm",
    themeLabel: "Transactional net margin method",
    title: "Comparables with an extra function, cost unknown",
    group: null,
    refs: "Chapter II · TNMM · ¶2.112",
    atGlance:
      "A company uses independent distributors to sell a product in five jurisdictions; in one strategically important market it has a subsidiary. Here the independent distributors, not the subsidiary, perform technical support, and its cost, reported within cost of goods sold, cannot be separately identified. Which comparison can still be relied on?",
    parties: {
      kind: "provider-to-recipients",
      provider: { name: "The company", role: "Supplier of the product" },
      recipients: [
        { name: "Independent distributors", role: "Five jurisdictions · perform technical support" },
        { name: "Subsidiary", role: "One country · sells only the company's product · no technical support" }
      ],
      arrowLabel: "product"
    },
    timeline: [
      "As in ¶2.44, a company uses independent distributors to sell a product in five jurisdictions where it has no subsidiaries, and has set up a subsidiary in one country.",
      "That one market is of strategic importance, and the subsidiary is required to sell only the company's product.",
      "Unlike in ¶2.44, the additional function of technical support is performed by the comparable independent enterprises and not by the subsidiary.",
      "What that function costs is reported within cost of goods sold and cannot be identified separately."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Technical support is an additional function performed by the comparable independent enterprises, not by the associated enterprise. Cost of goods sold is where its costs are reported, and they cannot be identified separately.",
        question: "How do the Guidelines suggest the transfer price be assessed?",
        mcq: [
          "Examining net margins may be more reliable, but not necessarily so if the extra function or market differences materially affect them.",
          "By the resale price method, applying the independent distributors' gross margins to the subsidiary as they stand.",
          "By net margins without further inquiry, because a net margin comparison is not affected by differences in functions."
        ],
        correctIdx: 0,
        analysis:
          "A CUP may be out of reach because of product and market differences. A resale price method would be unreliable, because the additional function, and the unknown additional costs that come with it, would call for a higher gross margin at the independent enterprises than at the subsidiary. In this situation, the Guidelines say, looking at net margins may be the more reliable way to gauge how far the transfer price should differ on account of the difference in function. They add a caution: comparability has to be taken into account, and net margins may not be reliable if the additional function or market differences would have a material effect on them.",
        verdict: "Net margins, with caution"
      }
    ],
    takeaway:
      "Where comparables perform an extra function whose cost cannot be separated out of cost of goods sold, a gross margin comparison becomes unreliable and net margins may be the more reliable measure. They are not immune: a material effect of the extra function, or of market differences, on net margin could undermine them too.",
    crossRefs: [
      "¶2.44 (the base facts, under the resale price method)",
      "¶2.111 (the similar approach where the costs needing adjustment cannot be identified)",
      "Part III, Section B.4 (examples of the transactional net margin method)"
    ]
  },

  {
    id: 12,
    theme: "tnmm",
    themeLabel: "Transactional net margin method",
    title: "Warranty costs that cannot be ascertained",
    group: "Distributor A · Distributor B",
    refs: "Chapter II · TNMM · ¶2.113",
    atGlance:
      "Distributors A and B sell the same product, under the same brand name, in the same market; A offers a warranty and sells at a higher price, B offers none. Here the amount of A's warranty expenses cannot be ascertained, so A's gross profit cannot be reliably adjusted. Is there another way to compare the two?",
    timeline: [
      "Two distributors, A and B, sell the same product under the same brand name in the same market.",
      "Because its warranty is not offered as part of a pricing strategy, Distributor A charges a higher price for the product than Distributor B, which offers no warranty.",
      "Leaving the costs of servicing the warranty out of account, Distributor A's gross profit margin is higher than Distributor B's.",
      "It proves impossible to ascertain the amount of the warranty expenses that Distributor A incurs."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "Because A's warranty expenses cannot be ascertained, A's gross profit cannot be reliably adjusted to make its gross profit margin properly comparable with B's. Suppose A and B do not otherwise differ materially in their functions, and A's net profit relative to its sales is known.",
        question: "What route do the Guidelines leave open?",
        mcq: [
          "Applying the transactional net margin method to B might be possible, using A's net profit relative to its sales.",
          "The resale price method still applies, comparing the two gross profit margins without a warranty adjustment.",
          "None, because a difference that cannot be quantified rules out any comparison between A and B at all."
        ],
        correctIdx: 0,
        analysis:
          "A gross margin comparison is not available: without the amount of A's warranty expenses, A's gross profit cannot be reliably adjusted to make its margin properly comparable with B's. The Guidelines then look to net profit. Provided A and B do not otherwise differ materially in their functions and A's net profit relative to its sales is known, applying the transactional net margin method to B might be possible, by comparing A's ratio of net profit to sales with the ratio calculated on the same basis for B. The wording is tentative and conditional: the paragraph offers a possibility, not a guaranteed solution.",
        verdict: "TNMM might be possible"
      }
    ],
    takeaway:
      "When the cost behind a functional difference cannot be ascertained, a reliable gross margin adjustment is out of reach. A net margin comparison might still be possible, provided the functions do not otherwise differ materially and the ratio of net profit to sales is known.",
    crossRefs: [
      "¶2.42 (the base facts, under the resale price method)",
      "¶2.112 (net margins where the cost of a function cannot be identified)",
      "Part III, Section B.4 (examples of the transactional net margin method)"
    ]
  },

  {
    id: 13,
    theme: "gross-net",
    themeLabel: "Gross versus net profit indicators (Annex I)",
    title: "Marketing function: gross margin against net margin",
    group: null,
    refs: "Annex I to Ch.II · Illustration 1 · ¶1–2",
    atGlance:
      "Two distributors each have sales of 1 000, with the same product, market and price. One performs a limited marketing function, the other a more significant one, and the purchase price from the manufacturer takes account of that. If the difference goes unidentified, which is further out: a gross margin test or a net margin test?",
    timeline: [
      "Both distributors have sales of 1 000: volume, product, market and price are the same for both.",
      "Case 1, a limited marketing function: purchase price from the manufacturer 600, gross margin 400 (40%), marketing expenses 50, other expenses (overheads) 300, net profit margin 50 (5%).",
      "Case 2, a more significant marketing function: purchase price 480, gross margin 520 (52%), marketing expenses 150, other expenses (overheads) 300, net profit margin 70 (7%).",
      "The purchase price differs by 120, which is assumed to reflect how much more extensive and complex the marketing function is in case 2: 100 of additional expense plus remuneration for the distributor's function.",
      "The taxpayer, which deals with an associated manufacturer, is in the position of case 2 and the third-party comparables are in that of case 1. The difference between their marketing functions goes unidentified, for instance because the information on the comparables is not detailed enough."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The taxpayer operates as in case 2 (gross margin 52%, net profit margin 7%) and the comparables as in case 1 (gross margin 40%, net profit margin 5%). The difference between the two marketing functions, in extent and complexity, has not been identified.",
        question: "Which margin is less sensitive to the unidentified difference, and by how much?",
        mcq: [
          "The net margin: the risk of error would amount to 20 (2% × 1 000), against a possible 120 (12% × 1 000) under a gross margin method.",
          "The gross margin: the risk of error would amount to 20 (2% × 1 000), against a possible 120 (12% × 1 000) under a net margin method.",
          "Neither: the 120 difference in purchase price is missed in full whichever of the two margins is compared."
        ],
        correctIdx: 0,
        analysis:
          "Under a gross margin method the taxpayer's 52% would be tested against the comparables' 40%, and the potential error could amount to 120 (12% × 1 000). Under a net margin method, 7% against 5%, it would amount to 20 (2% × 1 000). Of the 120 difference in purchase price, 100 is additional marketing expense, which comes off after the gross margin. The Guidelines' lesson is that differences in the extent and complexity of functions can affect net profit margins less than gross margins, depending on the circumstances and in particular on their effect on the cost structure and revenue of the comparables. The figures are illustrative only and are not guidance on the choice of method or comparables.",
        verdict: "Net margin less sensitive here"
      }
    ],
    takeaway:
      "Functional differences that show up in operating expenses can move gross margins more than net margins. Whether they do depends on the circumstances, in particular on how the differences affect the cost structure and revenue of the comparables.",
    crossRefs: [
      "Chapter II, Part III, Section B (transactional net margin method)",
      "¶2.76 (sensitivity of net profit indicators to functional differences; refers to this annex)",
      "Illustrations 2 and 3 (differences in risk and in capacity utilisation)"
    ]
  },

  {
    id: 14,
    theme: "gross-net",
    themeLabel: "Gross versus net profit indicators (Annex I)",
    title: "Obsolescence risk: gross margin against net margin",
    group: null,
    refs: "Annex I to Ch.II · Illustration 2 · ¶3",
    atGlance:
      "Two distributors each have sales of 1 000 of the same product. One has a buy-back clause under which the manufacturer purchases back all unsold inventory; the other assumes the obsolescence risk itself and pays a lower purchase price. If the difference in risk goes unidentified, which is further out: a gross margin test or a net margin test?",
    timeline: [
      "Both distributors have sales of 1 000: volume, product, market and price are the same for both.",
      "Case 1, no obsolescence risk, because under a buy-back clause the manufacturer purchases back all unsold inventory: purchase price 700, gross margin 300 (30%), loss on obsolete inventory 0, other expenses (overheads) 250, net profit margin 50 (5%).",
      "Case 2, the distributor assumes the obsolescence risk and has no buy-back clause: purchase price 640, gross margin 360 (36%), loss on obsolete inventory 50, other expenses (overheads) 250, net profit margin 60 (6%).",
      "The purchase prices differ by 60, assumed to reflect who bears the obsolescence risk, manufacturer or distributor: an estimated additional loss of 50 plus remuneration for the distributor's risk. Put another way, 60 is what the buy-back clause costs.",
      "The controlled transaction follows case 1 and the third-party comparables follow case 2. The difference in the level of risk goes unidentified because the information on the comparables is not detailed enough."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The controlled transaction follows case 1 (gross margin 30%, net profit margin 5%) and the comparables follow case 2 (gross margin 36%, net profit margin 6%). The difference in the level of risk has not been identified.",
        question: "Which margin is less sensitive to the unidentified difference in risk, and by how much?",
        mcq: [
          "The net margin: the risk of error is 10 (1% × 1 000), against a possible 60 (6% × 1 000) under a gross margin method.",
          "The gross margin: the risk of error is 10 (1% × 1 000), against a possible 60 (6% × 1 000) under a net margin method.",
          "Neither: the 60 difference in purchase price is missed in full whichever of the two margins is compared."
        ],
        correctIdx: 0,
        analysis:
          "Under a gross margin method the controlled distributor's 30% would be tested against the comparables' 36%, and the potential error could amount to 60 (6% × 1 000). Under a net margin method it is 10 (1% × 1 000), because the comparables that assume the risk also show a loss of 50 on obsolete inventory, which comes off after the gross margin. The Guidelines' lesson is that differences in the level of risk can affect net profit margins less than gross margins, depending on the circumstances and in particular on their effect on the cost structure and revenue of the comparables. That lesson assumes an arm's-length contractual allocation of risks. The figures are illustrative only and are not guidance on the choice of method or comparables.",
        verdict: "Net margin less sensitive here"
      }
    ],
    takeaway:
      "A difference in risk that is priced into the purchase price can distort a gross margin comparison more than a net margin comparison, because the party assuming the risk also carries the related loss below the gross margin. This depends on the circumstances and assumes an arm's-length contractual allocation of risk.",
    crossRefs: [
      "Chapter II, Part III, Section B (transactional net margin method)",
      "¶2.76 (sensitivity of net profit indicators to differences in risk; refers to this annex)",
      "Illustration 1 (difference in the marketing function)"
    ]
  },

  {
    id: 15,
    theme: "gross-net",
    themeLabel: "Gross versus net profit indicators (Annex I)",
    title: "Capacity utilisation: gross mark-up against net margin",
    group: null,
    refs: "Annex I to Ch.II · Illustration 3 · ¶4–5",
    atGlance:
      "A product priced at 1 m.u. a unit is made and sold by two manufacturers of equal total capacity: one runs at full capacity, 1 000 units a year, the other at 80%, 800 units. Unit variable cost, fixed personnel costs and indirect costs are the same for both. If the difference in capacity utilisation goes unidentified, which indicator is further out?",
    timeline: [
      "The two manufacturers have identical total capacity; each makes and sells the same product, on the same market, at 1 m.u. per unit; the arm's-length price is assumed not to be affected by capacity utilisation.",
      "Both have variable cost of goods sold of 0.75 m.u. per unit, fixed personnel costs of 50 within cost of goods sold, and indirect costs of 150.",
      "Case 1, full capacity of 1 000 units a year: sales 1 000, cost of goods sold 800 (variable 750, fixed 50), gross mark-up on cost of goods sold 200 (25%), net profit margin 50 (5%).",
      "Case 2, excess capacity, making 800 units a year or 80% of full capacity: sales 800, cost of goods sold 650 (variable 600, fixed 50), gross mark-up on cost of goods sold 150 (23%), net result break-even.",
      "The controlled transaction follows case 1 and the third-party comparables follow case 2. The difference in capacity utilisation goes unidentified because the information on the comparables is not detailed enough."
    ],
    scenarios: [
      {
        letter: "—",
        facts:
          "The controlled transaction follows case 1 (gross mark-up 25%, net profit margin 5%) and the comparables follow case 2 (gross mark-up 23%, break-even). The difference in capacity utilisation has not been identified.",
        question: "Which indicator is more sensitive to the unidentified difference in capacity utilisation, and by how much?",
        mcq: [
          "The net margin: the risk of error is 50 (5% × 1 000), against a possible 16 (2% × 800) under a gross margin method.",
          "The gross mark-up: the risk of error is 50 (5% × 1 000), against a possible 16 (2% × 800) under a net margin method.",
          "Neither: both sell at 1 m.u. per unit with the same variable cost per unit, so neither method is thrown off."
        ],
        correctIdx: 0,
        analysis:
          "Under a gross margin method the potential error could amount to 16 (2% × 800), the gross mark-up being 25% in case 1 and 23% in case 2. Under a net margin method it is 50 (5% × 1 000): indirect costs are 150 in both cases, so the manufacturer at full capacity earns 5% and the one with excess capacity only breaks even. The Guidelines explain that differences in the absorption of indirect fixed costs feed through to net profit, yet may leave the gross margin or gross mark-up unaffected if they are not reflected in price differences. Differences in capacity utilisation can therefore weigh more heavily on net profit indicators than on gross mark-ups or gross margins, depending on the facts, notably on how costs divide between fixed and variable and on which of the two, taxpayer or comparable, has the over-capacity. The figures are illustrative only and are not guidance on the choice of method or comparables.",
        verdict: "Net margin more sensitive here"
      }
    ],
    takeaway:
      "Net profit indicators are not always the more robust measure: where capacity utilisation differs, unabsorbed indirect fixed costs fall on net profit and may hardly show in the gross mark-up. How much this matters depends on how costs divide between fixed and variable, and on whether the excess capacity lies with the taxpayer or with the comparable.",
    crossRefs: [
      "Chapter II, Part III, Section B (transactional net margin method)",
      "¶2.76 (capacity utilisation and net profit indicators; refers to this annex)",
      "Illustrations 1 and 2 (where the net margin is the less sensitive measure)"
    ]
  }

];
