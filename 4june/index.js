// 4june/index.js
import { ATTENDEES } from "./attendees.js";
import { searchFilter, slugify, randomSuffix } from "./utils.js";

const STORAGE_KEY = "4june.submittedIds";

const submittedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));

const hueFromName = (name) => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 360;
};

function avatarHtml(name) {
  const initials = name.split(/\s+/).slice(0,2).map(w => w[0] || "").join("").toUpperCase();
  return `<span class="card-avatar" style="background:hsl(${hueFromName(name)},45%,42%)">${initials}</span>`;
}

function cardHtml(a) {
  const ta = (a.taxAreas && a.taxAreas[0]) || "Tax area ?";
  const tick = submittedIds.has(a.id) ? `<span class="card-tick" aria-label="Submitted">✓</span>` : "";
  return `
    <li>
      <button class="card" data-id="${a.id}">
        ${avatarHtml(a.name)}
        <span class="card-body">
          <span class="card-name">${a.name}</span>
          <span class="card-sub">${a.company} · ${ta}</span>
        </span>
        ${tick}
      </button>
    </li>`;
}

function render(query = "") {
  const matches = searchFilter(query, ATTENDEES);
  const picker = document.getElementById("picker");
  const meta = document.getElementById("search-meta");
  meta.textContent = query ? `${matches.length} result${matches.length === 1 ? "" : "s"}` : "";

  const addSelf = `
    <li>
      <button class="card card-addself" data-id="__add__">
        <span class="card-avatar card-avatar-plus">+</span>
        <span class="card-body">
          <span class="card-name">I'm not on this list</span>
          <span class="card-sub">Add yourself</span>
        </span>
      </button>
    </li>`;

  if (matches.length === 0) {
    picker.innerHTML = addSelf;
  } else {
    picker.innerHTML = matches.map(cardHtml).join("") + addSelf;
  }
}

document.getElementById("search").addEventListener("input", (e) => {
  render(e.target.value);
});

render();
document.getElementById("search").focus();
