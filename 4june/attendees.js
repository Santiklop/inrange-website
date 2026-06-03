// Tax Expats Club — 4 June 2026 participant list.
// 35 acceptances on the main calendar invite + Aleks (organiser) + Servais (host, on
// the internal BLOCK event). Each entry: id (kebab-case slug), name, company, optional
// taxAreas (only pre-filled where the role makes the area unambiguous; otherwise left
// empty so the participant confirms via the check-in form).
//
// Sources cross-referenced 2026-06-03:
//   - "Tax expats contacts (2).xlsx"  (member list with roles)
//   - Calendar event "Tax Expat Club meeting on AI @Nutanix [IN PERSON]"
//     (id 0elm1n6vgg4r2kcqredj0btiov) — responseStatus="accepted" only
//   - Calendar event "BLOCK: Tax Expats Club event @Nutanix"  (Servais sourced here)
// Hannah Saleem accepted from two emails (work + personal); listed once.
// Raymond Van-Der-Velde accepted but is not in the contacts sheet — entry uses the
// calendar displayName and company; tax area unknown.

export const ATTENDEES = [
  { id: "aleks-davydov",            name: "Aleks Davydov",            company: "inRange Solutions",       taxAreas: ["Transfer Pricing"] },
  { id: "servais-willie-ngabo",     name: "Servais Willie Ngabo",     company: "Nutanix",                 taxAreas: ["International / Pillar 2 / BEPS"] },
  { id: "alexei-sorokin",           name: "Alexei Sorokin",           company: "DTEK",                    taxAreas: ["Transfer Pricing"] },
  { id: "anna-sherlaw",             name: "Anna Sherlaw",             company: "Coty",                    taxAreas: ["Transfer Pricing"] },
  { id: "ariel-hou",                name: "Ariel Hou",                company: "MBK Investment / Mitsui", taxAreas: [] },
  { id: "arlene-tsai",              name: "Arlene Tsai",              company: "INGKA",                   taxAreas: ["Transfer Pricing"] },
  { id: "bartosz-jedryszczyk",      name: "Bartosz Jedryszczyk",      company: "OPPO / OnePlus",          taxAreas: [] },
  { id: "charlotte-chen",           name: "Charlotte Chen",           company: "MGA Entertainment",       taxAreas: [] },
  { id: "dalton-hirata",            name: "Dalton Hirata",            company: "RHI Magnesita",           taxAreas: ["Direct / CIT"] },
  { id: "ekaterina-shakhvorostova", name: "Ekaterina Shakhvorostova", company: "Delta Electronics",       taxAreas: ["Indirect / VAT"] },
  { id: "felicia-widadi",           name: "Felicia Widadi",           company: "Under Armour",            taxAreas: ["Indirect / VAT"] },
  { id: "hannah-saleem",            name: "Hannah Saleem",            company: "ACT Group",               taxAreas: [] },
  { id: "hans-topril",              name: "Hans Topril",              company: "Rabobank",                taxAreas: ["Transfer Pricing"] },
  { id: "hector-castro-zapata",     name: "Hector Castro Zapata",     company: "Coty",                    taxAreas: ["Transfer Pricing"] },
  { id: "heidi-pohl",               name: "Heidi Pohl",               company: "SGS Group",               taxAreas: [] },
  { id: "ilayda-ayvaci",            name: "Ilayda Ayvaci",            company: "JET",                     taxAreas: ["Transfer Pricing"] },
  { id: "kanshi-ram",               name: "Kanshi Ram",               company: "Digital Realty",          taxAreas: [] },
  { id: "khrystyna-franchuk",       name: "Khrystyna Franchuk",       company: "Waterland",               taxAreas: [] },
  { id: "marcos-moreira-teixeira",  name: "Marcos Moreira Teixeira",  company: "Seagate",                 taxAreas: [] },
  { id: "marina-strakhal",          name: "Marina Strakhal",          company: "Coty",                    taxAreas: [] },
  { id: "min-shi",                  name: "Min Shi",                  company: "IBFD",                    taxAreas: [] },
  { id: "natasha-chen",             name: "Natasha Chen",             company: "Delta Electronics",       taxAreas: [] },
  { id: "navita-parwanda",          name: "Navita Parwanda",          company: "Danone",                  taxAreas: ["Transfer Pricing"] },
  { id: "niall-cogan",              name: "Niall Cogan",              company: "Digital Realty",          taxAreas: [] },
  { id: "nikhil-krishnan",          name: "Nikhil Krishnan",          company: "HelloFresh",              taxAreas: [] },
  { id: "ravid-barzilay",           name: "Ravid Barzilay",           company: "Teva",                    taxAreas: [] },
  { id: "raymond-van-der-velde",    name: "Raymond Van-Der-Velde",    company: "Hitachi Energy",          taxAreas: [] },
  { id: "roza-chour",               name: "Roza Chour",               company: "Ecco",                    taxAreas: ["Indirect / VAT"] },
  { id: "satoko-nishihara",         name: "Satoko Nishihara",         company: "Kubota",                  taxAreas: [] },
  { id: "tarkeshwar-upmanyu",       name: "Tarkeshwar Upmanyu",       company: "ACT Commodities",         taxAreas: ["Transfer Pricing"] },
  { id: "tatiana-kvardakova",       name: "Tatiana Kvardakova",       company: "IKEA (Inter IKEA)",       taxAreas: [] },
  { id: "valon-bytyci",             name: "Valon Bytyci",             company: "Magnum Ice Cream",        taxAreas: ["Transfer Pricing"] },
  { id: "vito-mastrorocco",         name: "Vito Mastrorocco",         company: "Ecco",                    taxAreas: ["Indirect / VAT"] },
  { id: "vjola-shehi",              name: "Vjola Shehi",              company: "Fertiglobe",              taxAreas: [] },
  { id: "ying-yan",                 name: "Ying Yan",                 company: "Sabic",                   taxAreas: [] },
  { id: "zosia-mika",               name: "Zosia Mika",               company: "Lipton",                  taxAreas: ["Direct / CIT", "Transfer Pricing"] },
];
