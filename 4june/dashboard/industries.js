// 4june/dashboard/industries.js
// Company → industry mapping for the Tax Expats Club 4 June attendees.
// Used by the dashboard to render an "Industries in the room" donut.
// Unknown companies (walk-ins or typos) fall through to "Other".

export const COMPANY_TO_INDUSTRY = {
  // Professional services / advisory
  "inRange":              "Professional Services",
  "inRange Solutions":    "Professional Services",
  "SGS Group":            "Professional Services",
  "IBFD":                 "Professional Services",

  // Tech & software
  "Nutanix":              "Tech & Software",
  "JET":                  "Tech & Software",
  "Digital Realty":       "Tech & Software",

  // Consumer goods / apparel
  "Coty":                 "Consumer Goods & Apparel",
  "Under Armour":         "Consumer Goods & Apparel",
  "Ecco":                 "Consumer Goods & Apparel",
  "MGA Entertainment":    "Consumer Goods & Apparel",

  // Food & beverage
  "Magnum Ice Cream":     "Food & Beverage",
  "HelloFresh":           "Food & Beverage",
  "Danone":               "Food & Beverage",
  "Lipton":               "Food & Beverage",

  // Industrial / manufacturing
  "RHI Magnesita":        "Industrial & Manufacturing",
  "Kubota":               "Industrial & Manufacturing",
  "Seagate":              "Industrial & Manufacturing",
  "Delta Electronics":    "Industrial & Manufacturing",
  "OPPO / OnePlus":       "Industrial & Manufacturing",
  "Hitachi Energy":       "Industrial & Manufacturing",

  // Energy & chemicals
  "DTEK":                 "Energy & Chemicals",
  "Sabic":                "Energy & Chemicals",
  "Fertiglobe":           "Energy & Chemicals",

  // Retail
  "INGKA":                "Retail",
  "IKEA (Inter IKEA)":    "Retail",

  // Financial services
  "MBK Investment / Mitsui": "Financial Services",
  "Waterland":            "Financial Services",
  "Rabobank":             "Financial Services",

  // Pharma
  "Teva":                 "Pharma",

  // Commodities trading
  "ACT Group":            "Commodities Trading",
  "ACT Commodities":      "Commodities Trading",
};

export function getIndustry(company) {
  return COMPANY_TO_INDUSTRY[company] || "Other";
}
