// 4june/index.js
import { ATTENDEES } from "./attendees.js";
import { searchFilter, slugify, randomSuffix } from "./utils.js";

const STORAGE_KEY = "4june.submittedIds";

const submittedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));

// Submissions cache populated by the 16:00 aggregation. May be empty if the
// aggregation hasn't run yet (or fetch fails). Used to pre-fill the form on
// card tap so people returning after the session see their prior answers.
let SUBMISSIONS = {};
fetch("./submissions.json", { cache: "no-store" })
  .then(r => r.ok ? r.json() : {})
  .then(data => { SUBMISSIONS = data || {}; })
  .catch(() => { SUBMISSIONS = {}; });

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

const TAX_AREAS = [
  "Transfer Pricing", "Direct / CIT", "Indirect / VAT", "Customs & Trade",
  "Compliance & Reporting", "Tax Tech / Data", "Tax Controversy / Audit",
  "International / Pillar 2 / BEPS"
];
const TOOLS = [
  "ChatGPT", "Claude", "Gemini", "M365 Copilot", "GitHub Copilot / Cursor",
  "Perplexity", "Tax-specific tool", "Custom in-house agent", "None yet"
];
const PREV_EVENTS = ["First time", "1–2", "3–5", "5+"];
const YEARS = ["0–5", "5–15", "15+"];
const WINS = [
  "Drafting memos / first-draft writing",
  "Summarising long documents",
  "Research and explanation",
  "Excel formulas and macros",
  "Brainstorming / second opinion",
  "Building small tools or apps",
  "Other"
];
const FRUSTRATIONS = [
  "Hallucinations / wrong answers",
  "Privacy — can't share internal company data",
  "Doesn't understand tax context",
  "Inconsistent output quality",
  "Hard to integrate with my workflow",
  "Compliance / audit defensibility",
  "Other"
];

function renderChips(containerId, options) {
  const el = document.getElementById(containerId);
  el.innerHTML = options.map(o => `<button type="button" class="chip" aria-pressed="false">${o}</button>`).join("");
  const isSingle = el.classList.contains("chips-single");
  const cap = parseInt(el.dataset.cap || "0", 10);
  el.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const pressed = chip.getAttribute("aria-pressed") === "true";
    if (isSingle) {
      for (const c of el.querySelectorAll(".chip")) c.setAttribute("aria-pressed", "false");
      chip.setAttribute("aria-pressed", !pressed);
    } else {
      const count = el.querySelectorAll('.chip[aria-pressed="true"]').length;
      if (!pressed && cap > 0 && count >= cap) return; // cap enforced
      chip.setAttribute("aria-pressed", !pressed);
    }
    updateCounters();
  });
}

function updateCounters() {
  for (const [groupId, counterId] of [["g-work","c-work"],["g-home","c-home"],["g-win","c-win"],["g-frust","c-frust"]]) {
    const sel = document.querySelectorAll(`#${groupId} .chip[aria-pressed="true"]`).length;
    const cap = document.getElementById(groupId).dataset.cap;
    document.getElementById(counterId).textContent = `${sel} / ${cap}`;
  }
}

function clearChips(containerId) {
  for (const c of document.querySelectorAll(`#${containerId} .chip`)) c.setAttribute("aria-pressed", "false");
}
function preselectChips(containerId, values) {
  if (!values) return;
  for (const c of document.querySelectorAll(`#${containerId} .chip`)) {
    if (values.includes(c.textContent)) c.setAttribute("aria-pressed", "true");
  }
}

const sheet = document.getElementById("sheet");
const closeBtn = document.getElementById("sheet-close");

function openSheet(attendee, isNew) {
  document.getElementById("f-name").value = attendee.name || "";
  document.getElementById("f-name").readOnly = !isNew;
  document.getElementById("f-company").value = attendee.company || "";
  document.getElementById("f-company").readOnly = !isNew;
  document.getElementById("sheet-title").textContent = isNew ? "Tell us who you are" : attendee.name;
  document.getElementById("sheet-subtitle").textContent = isNew ? "" : attendee.company;

  for (const id of ["g-tax","g-prev","g-years","g-work","g-home","g-win","g-frust"]) clearChips(id);
  preselectChips("g-tax", attendee.taxAreas);
  for (const id of ["f-tax-other","f-work-other","f-home-other","f-win-other","f-frust-other","f-wish","f-exp"]) document.getElementById(id).value = "";

  // If a prior submission exists for this card, pre-fill from it.
  const prior = SUBMISSIONS[attendee.id];
  if (prior && !isNew) {
    preselectChips("g-tax",   prior.taxAreas || []);
    preselectChips("g-prev",  prior.previousEvents ? [prior.previousEvents] : []);
    preselectChips("g-years", prior.yearsInTax ? [prior.yearsInTax] : []);
    preselectChips("g-work",  prior.aiToolsWork || []);
    preselectChips("g-home",  prior.aiToolsHome || []);
    preselectChips("g-win",   prior.biggestWins || []);
    preselectChips("g-frust", prior.biggestFrustrations || []);
    document.getElementById("f-tax-other").value   = prior.taxAreaOther || "";
    document.getElementById("f-work-other").value  = prior.aiToolsWorkOther || "";
    document.getElementById("f-home-other").value  = prior.aiToolsHomeOther || "";
    document.getElementById("f-win-other").value   = prior.biggestWinOther || "";
    document.getElementById("f-frust-other").value = prior.biggestFrustrationOther || "";
    document.getElementById("f-wish").value        = prior.wishToTry || "";
    document.getElementById("f-exp").value         = prior.expectationToday || "";
    setSliders(prior);
  } else {
    setSliders(null); // defaults to 5
  }

  updateCounters();
  sheet.dataset.cardId = attendee.id;
  sheet.dataset.isNew = isNew ? "1" : "0";
  document.documentElement.classList.add("sheet-open");
  document.body.classList.add("sheet-open");
  sheet.showModal();
}

renderChips("g-tax", TAX_AREAS);
renderChips("g-prev", PREV_EVENTS);
renderChips("g-years", YEARS);
renderChips("g-work", TOOLS);
renderChips("g-home", TOOLS);
renderChips("g-win", WINS);
renderChips("g-frust", FRUSTRATIONS);

// Spectrum band: 1–3 = low, 4–7 = mid, 8–10 = high. Highlights the matching
// stage text below each slider so the user sees which descriptor they sit at.
function spectrumStage(value) {
  if (value <= 3) return 0;
  if (value <= 7) return 1;
  return 2;
}

function highlightSpectrum(axis, value) {
  const container = document.querySelector(`.slider-spectrum[data-axis="${axis}"]`);
  if (!container) return;
  const stages = container.querySelectorAll(".spectrum-stage");
  const idx = spectrumStage(value);
  stages.forEach((s, i) => s.classList.toggle("active", i === idx));
}

// Live value display + spectrum highlight for the 4 self-assessment sliders.
for (const axis of ["adoption", "application", "craft", "trust"]) {
  const slider = document.getElementById(`s-${axis}`);
  const display = document.getElementById(`v-${axis}`);
  slider.addEventListener("input", () => {
    display.textContent = slider.value;
    highlightSpectrum(axis, parseInt(slider.value, 10));
  });
}

function setSliders(values) {
  for (const axis of ["adoption", "application", "craft", "trust"]) {
    const key = "self" + axis.charAt(0).toUpperCase() + axis.slice(1);
    const v = values && Number.isFinite(values[key]) ? values[key] : 3;
    document.getElementById(`s-${axis}`).value = v;
    document.getElementById(`v-${axis}`).textContent = v;
    highlightSpectrum(axis, v);
  }
}

document.getElementById("picker").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = card.dataset.id;
  if (id === "__add__") {
    openSheet({ id: "_new", name: "", company: "", taxAreas: [] }, true);
  } else {
    const a = ATTENDEES.find(x => x.id === id);
    if (a) openSheet(a, false);
  }
});

closeBtn.addEventListener("click", () => sheet.close());
sheet.addEventListener("close", () => {
  document.documentElement.classList.remove("sheet-open");
  document.body.classList.remove("sheet-open");
});

// iOS Safari touch-boundary lock: prevent rubber-band bounce when the form
// is at the top or bottom of its scroll range. overscroll-behavior alone
// is not always enough on iOS, so we also intercept touchmove and only
// preventDefault when a scroll past the boundary would otherwise bleed
// through to the page behind the dialog.
(function lockSheetTouchBoundaries() {
  const scroller = document.getElementById("sheet-form");
  let startY = 0;
  scroller.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    startY = e.touches[0].clientY;
  }, { passive: true });
  scroller.addEventListener("touchmove", (e) => {
    if (e.touches.length !== 1) return;
    const y = e.touches[0].clientY;
    const goingDown = y > startY;
    const goingUp = y < startY;
    const atTop = scroller.scrollTop <= 0;
    const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
    if ((goingDown && atTop) || (goingUp && atBottom)) {
      e.preventDefault();
    }
  }, { passive: false });
})();

const ENDPOINT = "https://formsubmit.co/ajax/92ff96a867d2b97bee73c7b50f43f788";

function readChips(id) {
  return [...document.querySelectorAll(`#${id} .chip[aria-pressed="true"]`)].map(c => c.textContent);
}
function readSingle(id) {
  const c = document.querySelector(`#${id} .chip[aria-pressed="true"]`);
  return c ? c.textContent : "";
}

function buildPayload() {
  const isNew = sheet.dataset.isNew === "1";
  const name = document.getElementById("f-name").value.trim();
  const company = document.getElementById("f-company").value.trim();

  let id = sheet.dataset.cardId;
  if (isNew) {
    const cached = JSON.parse(localStorage.getItem("4june.walkinId") || "null");
    if (cached && cached.name === name) id = cached.id;
    else id = `${slugify(name) || "guest"}-${randomSuffix()}`;
    localStorage.setItem("4june.walkinId", JSON.stringify({ name, id }));
  }

  const payload = {
    id, name, company,
    taxAreas: readChips("g-tax"),
    taxAreaOther: document.getElementById("f-tax-other").value.trim(),
    previousEvents: readSingle("g-prev"),
    yearsInTax: readSingle("g-years"),
    aiToolsWork: readChips("g-work"),
    aiToolsWorkOther: document.getElementById("f-work-other").value.trim(),
    aiToolsHome: readChips("g-home"),
    aiToolsHomeOther: document.getElementById("f-home-other").value.trim(),
    wishToTry: document.getElementById("f-wish").value.trim(),
    biggestWins: readChips("g-win"),
    biggestWinOther: document.getElementById("f-win-other").value.trim(),
    biggestFrustrations: readChips("g-frust"),
    biggestFrustrationOther: document.getElementById("f-frust-other").value.trim(),
    expectationToday: document.getElementById("f-exp").value.trim(),
    selfAdoption: parseInt(document.getElementById("s-adoption").value, 10),
    selfApplication: parseInt(document.getElementById("s-application").value, 10),
    selfCraft: parseInt(document.getElementById("s-craft").value, 10),
    selfTrust: parseInt(document.getElementById("s-trust").value, 10),
    submittedAt: new Date().toISOString(),
    isNewParticipant: isNew
  };

  const subjectTag = isNew ? "[Tax Expats Check-in NEW]" : "[Tax Expats Check-in]";
  return {
    _subject: `${subjectTag} ${name}`,
    _template: "box",
    _honey: "",
    ...payload,
    JSON: JSON.stringify(payload)
  };
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.hidden = false;
  setTimeout(() => { t.hidden = true; }, 3500);
}

function showConfirmation(name) {
  sheet.close();
  const main = document.querySelector("main.page");
  main.innerHTML = `
    <header class="brand">
      <div class="brand-wordmark">TAX EXPATS CLUB</div>
      <div class="event-line">4 June 2026 · Nutanix</div>
    </header>
    <div class="confirm">
      <h1 class="confirm-thanks">Thanks, ${name.split(" ")[0] || "you"} —<br>see you at 16:00.</h1>
      <p class="confirm-edit">Reload the page and tap your card to edit your answers.</p>
      <button type="button" class="sheet-submit" onclick="location.reload()">Back to the list</button>
    </div>
    <footer>Powered by inRange · <a href="https://www.inrange.nl">www.inrange.nl</a></footer>
  `;
}

document.getElementById("sheet-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("sheet-submit");
  btn.disabled = true;
  btn.textContent = "Sending…";

  const payload = buildPayload();

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (data.success !== "true") throw new Error("Formsubmit said: " + JSON.stringify(data));

    submittedIds.add(payload.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...submittedIds]));
    showConfirmation(payload.name);
  } catch (err) {
    console.error(err);
    showToast("Could not send. Check connection and try again.");
    localStorage.setItem("4june.pending", JSON.stringify(payload));
    btn.disabled = false;
    btn.textContent = "Submit";
  }
});
