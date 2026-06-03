// 4june/utils.js
export function stripDiacritics(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function slugify(name) {
  return stripDiacritics(name)
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function searchFilter(query, attendees) {
  const q = stripDiacritics(query.toLowerCase()).trim();
  if (!q) return attendees;
  return attendees.filter(a => {
    const hay = stripDiacritics(`${a.name} ${a.company}`.toLowerCase());
    return hay.includes(q);
  });
}

export function randomSuffix() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}
