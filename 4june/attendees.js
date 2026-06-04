// Tax Expats Club — 4 June 2026 participant list.
// 35 acceptances on the main calendar invite + Aleks (organiser) + Servais (host, on
// the internal BLOCK event). Each entry: id (kebab-case slug), name, company, role,
// optional taxAreas (only pre-filled where the role makes the area unambiguous;
// otherwise left empty so the participant confirms via the check-in form).
//
// Sources cross-referenced 2026-06-03:
//   - "Tax expats contacts (2).xlsx"  (member list with roles)
//   - Calendar event "Tax Expat Club meeting on AI @Nutanix [IN PERSON]"
//     (id 0elm1n6vgg4r2kcqredj0btiov) — responseStatus="accepted" only
//   - Calendar event "BLOCK: Tax Expats Club event @Nutanix"  (Servais sourced here)
// Hannah Saleem accepted from two emails (work + personal); listed once.
// Raymond Van-Der-Velde accepted but is not in the contacts sheet — entry uses the
// calendar displayName and company; role unknown so falls back to "Tax professional".

export const ATTENDEES = [
  { id: "aleks-davydov",            name: "Aleks Davydov",            company: "inRange Solutions",       role: "Director",                                       taxAreas: ["Transfer Pricing"] },
  { id: "servais-willie-ngabo",     name: "Servais Willie Ngabo",     company: "Nutanix",                 role: "Director, International Tax",                    taxAreas: ["International / Pillar 2 / BEPS"] },
  { id: "alexei-sorokin",           name: "Alexei Sorokin",           company: "DTEK",                    role: "Head of TP",                                     taxAreas: ["Transfer Pricing"] },
  { id: "anna-sherlaw",             name: "Anna Sherlaw",             company: "Coty",                    role: "Senior Manager TP",                              taxAreas: ["Transfer Pricing"] },
  { id: "ariel-hou",                name: "Ariel Hou",                company: "MBK Investment / Mitsui", role: "Tax Manager",                                    taxAreas: [] },
  { id: "arlene-tsai",              name: "Arlene Tsai",              company: "INGKA",                   role: "TP Manager",                                     taxAreas: ["Transfer Pricing"] },
  { id: "bartosz-jedryszczyk",      name: "Bartosz Jedryszczyk",      company: "OPPO / OnePlus",          role: "Tax Manager",                                    taxAreas: [] },
  { id: "charlotte-chen",           name: "Charlotte Chen",           company: "MGA Entertainment",       role: "Tax Manager — EMEA",                             taxAreas: [] },
  { id: "dalton-hirata",            name: "Dalton Hirata",            company: "RHI Magnesita",           role: "Head of Corporate Tax Governance",               taxAreas: ["Direct / CIT"] },
  { id: "ekaterina-shakhvorostova", name: "Ekaterina Shakhvorostova", company: "Delta Electronics",       role: "Chief Accountant, EMEA Indirect Tax",            taxAreas: ["Indirect / VAT"] },
  { id: "felicia-widadi",           name: "Felicia Widadi",           company: "Under Armour",            role: "Indirect Tax",                                   taxAreas: ["Indirect / VAT"] },
  { id: "hannah-saleem",            name: "Hannah Saleem",            company: "ACT Group",               role: "Senior Tax Specialist",                          taxAreas: [] },
  { id: "hans-topril",              name: "Hans Topril",              company: "Rabobank",                role: "Tax Transfer Pricing Specialist",                taxAreas: ["Transfer Pricing"] },
  { id: "hector-castro-zapata",     name: "Hector Castro Zapata",     company: "Coty",                    role: "TP Manager",                                     taxAreas: ["Transfer Pricing"] },
  { id: "heidi-pohl",               name: "Heidi Pohl",               company: "SGS Group",               role: "Senior Director, Tax & Business Partnering",     taxAreas: [] },
  { id: "ilayda-ayvaci",            name: "Ilayda Ayvaci",            company: "JET",                     role: "Transfer Pricing",                               taxAreas: ["Transfer Pricing"] },
  { id: "kanshi-ram",               name: "Kanshi Ram",                company: "Digital Realty",          role: "Tax professional",                               taxAreas: [] },
  { id: "khrystyna-franchuk",       name: "Khrystyna Franchuk",       company: "Waterland",               role: "Tax Manager",                                    taxAreas: [] },
  { id: "marcos-moreira-teixeira",  name: "Marcos Moreira Teixeira",  company: "Seagate",                 role: "Senior Tax Manager",                             taxAreas: [] },
  { id: "marina-strakhal",          name: "Marina Strakhal",          company: "Coty",                    role: "EMEA Tax Manager",                               taxAreas: [] },
  { id: "min-shi",                  name: "Min Shi",                  company: "IBFD",                    role: "Analyst",                                        taxAreas: [] },
  { id: "natasha-chen",             name: "Natasha Chen",             company: "Delta Electronics",       role: "Specialist, Finance",                            taxAreas: [] },
  { id: "navita-parwanda",          name: "Navita Parwanda",          company: "Danone",                  role: "TP Manager",                                     taxAreas: ["Transfer Pricing"] },
  { id: "niall-cogan",              name: "Niall Cogan",              company: "Digital Realty",          role: "VP, Tax EMEA",                                   taxAreas: [] },
  { id: "nikhil-krishnan",          name: "Nikhil Krishnan",          company: "HelloFresh",              role: "International Tax",                              taxAreas: [] },
  { id: "ravid-barzilay",           name: "Ravid Barzilay",           company: "Teva",                    role: "EMEA Tax Director",                              taxAreas: [] },
  { id: "raymond-van-der-velde",    name: "Raymond Van-Der-Velde",    company: "Hitachi Energy",          role: "Tax professional",                               taxAreas: [] },
  { id: "roza-chour",               name: "Roza Chour",               company: "Ecco",                    role: "Junior VAT Accountant",                          taxAreas: ["Indirect / VAT"] },
  { id: "satoko-nishihara",         name: "Satoko Nishihara",         company: "Kubota",                  role: "Tax Manager",                                    taxAreas: [] },
  { id: "tarkeshwar-upmanyu",       name: "Tarkeshwar Upmanyu",       company: "ACT Commodities",         role: "Transfer Pricing",                               taxAreas: ["Transfer Pricing"] },
  { id: "tatiana-kvardakova",       name: "Tatiana Kvardakova",       company: "IKEA (Inter IKEA)",       role: "Tax Advisor",                                    taxAreas: [] },
  { id: "valon-bytyci",             name: "Valon Bytyci",             company: "Magnum Ice Cream",        role: "TP Senior Manager",                              taxAreas: ["Transfer Pricing"] },
  { id: "vito-mastrorocco",         name: "Vito Mastrorocco",         company: "Ecco",                    role: "Indirect Tax Manager",                           taxAreas: ["Indirect / VAT"] },
  { id: "vjola-shehi",              name: "Vjola Shehi",              company: "Fertiglobe",              role: "Tax professional",                               taxAreas: [] },
  { id: "ying-yan",                 name: "Ying Yan",                 company: "Sabic",                   role: "Tax Risk Management",                            taxAreas: [] },
  { id: "zosia-mika",               name: "Zosia Mika",               company: "Lipton",                  role: "CIT and TP Manager",                             taxAreas: ["Direct / CIT", "Transfer Pricing"] },
];
