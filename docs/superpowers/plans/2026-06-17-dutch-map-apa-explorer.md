# Dutch MAP, APA & Rulings Explorer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive, on-brand data explorer of the Dutch tax authority's annual reports, hosted at `inrange.nl/map`, with two top-level areas: **MAP & APA** (MAP-team, 2019–2025) and **International Rulings** (APA/ATR practice, 2023–2025).

**Architecture:** Two co-located static files under `map/` — `core.js` (`MAP_DATA` + `RULINGS_DATA` + pure compute/format helpers, dual-mode for browser + Node tests) and `index.html` (chrome, two-area switch, nine views total, hand-built SVG charts, controls, theme). No build step. `core.js` is unit-tested with Node's built-in test runner; visual/interaction behaviour is verified in a browser.

**Tech Stack:** Vanilla JS (IIFE + `innerHTML` render functions + hand-built inline SVG), the site's existing CSS design tokens (`colors_and_type.css` + the Adyen token block), Plus Jakarta Sans / Source Serif 4, lucide icons. Tests: `node --test` (Node ≥ 18, no dependencies).

**Reference files (read first):**
- Spec: `docs/superpowers/specs/2026-06-17-dutch-map-apa-explorer-design.md` (authoritative data tables + commentary rule).
- `NL-US Impact - Adyen BAPA Interactive_ver.1.0.html` (in `C:\Vibecoding\Dutch APAs`) — the house pattern for chrome, tabs, SVG helpers, dock, theme, print.
- `colors_and_type.css`, existing `sport/index.html` and `Quiz/index.html` for clean-URL folder convention.

---

## File Structure

- `map/core.js` — **Create.** `var MAP_DATA = {...}` and `var RULINGS_DATA = {...}` (every figure from the spec) + pure helpers (`yoy`, `niceMax`, `resolutionRate`, `outcomeGroups`, `rulingMix`, `rulingFlow`). Tail: `if (typeof module !== 'undefined') module.exports = {...}`. One responsibility: data + math, zero DOM.
- `map/index.html` — **Create.** Markup shell, `<style>` (tokens + page CSS), and the render IIFE that consumes the data/helpers and paints both areas (5 MAP views + 4 Rulings views). One responsibility: presentation + interaction.
- `map/tests/core.test.js` — **Create.** `node --test` unit tests for `core.js` (both data objects).
- `map/README.md` — **Create.** "How to update next year" note covering both data objects.

**Task map:** Tasks 1–4 build `MAP_DATA` + helpers; Task 5 builds the shell + two-area switch; Tasks 6–10 the five MAP views; Task 11 footer/theme/print/responsive; **Task 12 builds `RULINGS_DATA` + tests; Tasks 13–15 the four Rulings views;** Task 16 README + full regression.

Each task below produces a self-contained, committable change. Run all `node` commands from the repo root (`C:\Vibecoding\inRange website`).

---

## Task 1: Data module skeleton + reconciliation test

**Files:**
- Create: `map/core.js`
- Test: `map/tests/core.test.js`

- [ ] **Step 1: Write the failing test**

```js
// map/tests/core.test.js
const { test } = require('node:test');
const assert = require('node:assert');
const C = require('../core.js');

test('MAP_DATA exposes all report years', () => {
  assert.deepStrictEqual(C.MAP_DATA.years, [2019, 2020, 2021, 2022, 2023, 2024, 2025]);
});

test('2025 core inventory reconciles: begin + received - closed === end', () => {
  const inv = C.MAP_DATA.inventory[2025];
  const sum = (k) => ['INT','TP','MLMAP','TB','BAPA','MAPA'].reduce((a,s)=>a+inv[s][k],0);
  assert.strictEqual(sum('begin') + sum('received') - sum('closed'), sum('end'));
  assert.strictEqual(sum('begin'), 1066); // Tabel: MAP+APA core begin voorraad 2025
  assert.strictEqual(sum('end'), 1041);
});

test('2025 outcomes percentages sum to ~100', () => {
  const total = C.MAP_DATA.outcomes[2025].reduce((a, o) => a + o.count, 0);
  assert.strictEqual(total, 490);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test map/tests/`
Expected: FAIL — `Cannot find module '../core.js'`.

- [ ] **Step 3: Write minimal implementation**

Create `map/core.js` with the data shell needed to pass (full figures land in Tasks 2–3; here just enough to reconcile 2025 core inventory + outcomes total). Use the exact spec values:

```js
// map/core.js — Dutch MAP & APA Explorer: data + pure helpers (no DOM).
var MAP_DATA = {
  years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
  // inventory[year][stream] = {begin, received, closed, end}
  inventory: {
    2025: {
      INT:   { begin: 693, received: 350, closed: 384, end: 659 },
      TP:    { begin: 210, received: 75,  closed: 81,  end: 204 },
      MLMAP: { begin: 10,  received: 4,   closed: 0,   end: 14  },
      TB:    { begin: 46,  received: 39,  closed: 25,  end: 60  },
      BAPA:  { begin: 85,  received: 34,  closed: 33,  end: 86  },
      MAPA:  { begin: 22,  received: 4,   closed: 8,   end: 18  }
    }
  },
  // outcomes[year] = [{cat, label, phase, count, pct}]
  outcomes: {
    2025: [
      { cat: 1,  label: 'Denied MAP access',          phase: 'uni', count: 26,  pct: 5.3 },
      { cat: 2,  label: 'Objection not justified',     phase: 'uni', count: 29,  pct: 5.9 },
      { cat: 3,  label: 'Unilateral relief granted',   phase: 'uni', count: 27,  pct: 5.5 },
      { cat: 4,  label: 'Full elimination',            phase: 'bi',  count: 345, pct: 70.4 },
      { cat: 5,  label: 'Partial elimination',         phase: 'bi',  count: 3,   pct: 0.6 },
      { cat: 6,  label: 'No taxation contrary to treaty', phase: 'bi', count: 10, pct: 2.0 },
      { cat: 7,  label: 'No agreement',                phase: 'bi',  count: 2,   pct: 0.4 },
      { cat: 8,  label: 'Resolved via domestic remedy',phase: 'oth', count: 21,  pct: 4.3 },
      { cat: 9,  label: 'Withdrawn by taxpayer',       phase: 'oth', count: 26,  pct: 5.3 },
      { cat: 10, label: 'Any other outcome',           phase: 'oth', count: 1,   pct: 0.2 }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MAP_DATA };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test map/tests/`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add map/core.js map/tests/core.test.js
git commit -m "feat(map): data module skeleton with 2025 reconciliation tests"
```

---

## Task 2: Full multi-year caseload + inventory data

**Files:**
- Modify: `map/core.js`
- Test: `map/tests/core.test.js`

- [ ] **Step 1: Write the failing tests**

Append to `map/tests/core.test.js`:

```js
test('caseload has received+closed for every stream across 2019-2025', () => {
  const cl = C.MAP_DATA.caseload;
  for (const s of ['INT','TP','MLMAP','TB','BAPA','MAPA']) {
    assert.strictEqual(cl[s].received.length, 7, `${s} received length`);
    assert.strictEqual(cl[s].closed.length, 7, `${s} closed length`);
  }
  assert.deepStrictEqual(cl.INT.received, [116,127,163,201,240,309,350]);
  assert.deepStrictEqual(cl.TP.closed,    [77,71,51,51,79,109,81]);
});

test('inventory present for 2023, 2024, 2025', () => {
  for (const y of [2023, 2024, 2025]) assert.ok(C.MAP_DATA.inventory[y], `year ${y}`);
  // 2024 core reconciles
  const inv = C.MAP_DATA.inventory[2024];
  const sum = (k) => ['INT','TP','MLMAP','TB'].reduce((a,s)=>a+inv[s][k],0);
  assert.strictEqual(sum('begin')+sum('received')-sum('closed'), sum('end'));
  assert.strictEqual(sum('end'), 808);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test map/tests/`
Expected: FAIL — `Cannot read properties of undefined (reading 'INT')` (no `caseload`; no `inventory[2023/2024]`).

- [ ] **Step 3: Implement**

Add to `MAP_DATA` in `core.js` (arrays indexed to `years` 2019→2025; use `0` where a stream had no figure that year):

```js
  // caseload[stream] = { received: [7], closed: [7] }  (2019..2025)
  caseload: {
    INT:   { received: [116,127,163,201,240,309,350], closed: [122,103,104,119,220,240,384] },
    TP:    { received: [80,93,42,86,60,93,75],         closed: [77,71,51,51,79,109,81] },
    MLMAP: { received: [0,0,0,2,6,0,4],                closed: [0,0,0,0,4,6,0] },
    TB:    { received: [18,21,29,33,14,36,39],         closed: [7,16,22,36,20,22,25] },
    BAPA:  { received: [23,23,19,31,28,24,34],         closed: [21,13,15,14,29,34,33] },
    MAPA:  { received: [2,2,0,4,8,3,4],                closed: [0,1,0,6,0,3,8] }
  },
```

Add `inventory[2023]` and `inventory[2024]` alongside the existing `inventory[2025]` (values from the spec "Inventory flow" section; core streams + the secondary streams Protective/Prefiling/Bezwaar/Arbitrage as available). Minimum to pass: the four core streams INT/TP/MLMAP(TRMAP)/TB for 2024:

```js
    2024: {
      INT:   { begin: 518, received: 309, closed: 240, end: 587 },
      TP:    { begin: 198, received: 93,  closed: 109, end: 182 },
      MLMAP: { begin: 10,  received: 0,   closed: 6,   end: 4   },
      TB:    { begin: 21,  received: 36,  closed: 22,  end: 35  },
      BAPA:  { begin: 92,  received: 24,  closed: 34,  end: 82  },
      MAPA:  { begin: 22,  received: 3,   closed: 3,   end: 22  }
    },
    2023: {
      INT:   { begin: 409, received: 240, closed: 220, end: 429 },
      TP:    { begin: 209, received: 60,  closed: 79,  end: 190 },
      MLMAP: { begin: 10,  received: 6,   closed: 4,   end: 12  },
      TB:    { begin: 22,  received: 14,  closed: 20,  end: 16  },
      BAPA:  { begin: 91,  received: 28,  closed: 29,  end: 90  },
      MAPA:  { begin: 18,  received: 8,   closed: 0,   end: 26  }
    },
```

- [ ] **Step 4: Run to verify it passes**

Run: `node --test map/tests/`
Expected: PASS (all tests).

- [ ] **Step 5: Commit**

```bash
git add map/core.js map/tests/core.test.js
git commit -m "feat(map): full 2019-2025 caseload + inventory data"
```

---

## Task 3: Outcomes (2024), cycle times, treaty partners, KPIs, qualitative facts

**Files:**
- Modify: `map/core.js`
- Test: `map/tests/core.test.js`

- [ ] **Step 1: Write the failing tests**

```js
test('2024 outcomes present and per-stream totals match', () => {
  const o = C.MAP_DATA.outcomes[2024];
  assert.strictEqual(o.reduce((a,x)=>a+x.count,0), 377);
});

test('cycle times: TP is the only series over 24 months at peak', () => {
  const ct = C.MAP_DATA.cycleTimes; // {years:[2021..2025], TP:[], INT:[], Total:[]}
  assert.deepStrictEqual(ct.years, [2021,2022,2023,2024,2025]);
  assert.strictEqual(Math.max(...ct.TP), 26);
  assert.ok(Math.max(...ct.INT) < 24 && Math.max(...ct.Total) < 24);
});

test('top treaty partners 2025 sorted desc, named top-5 + Overig', () => {
  const tp = C.MAP_DATA.partners[2025];
  assert.strictEqual(tp[0].name, 'België');
  assert.strictEqual(tp[0].count, 264);
  assert.ok(tp.some(p => p.name === 'Overig' && p.count === 258));
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test map/tests/`
Expected: FAIL — `outcomes[2024]` / `cycleTimes` / `partners` undefined.

- [ ] **Step 3: Implement**

Add to `MAP_DATA`:

```js
  outcomes: {
    // ...2025 (already present)...
    2024: [
      { cat: 1,  label: 'Denied MAP access',          phase: 'uni', count: 20 },
      { cat: 2,  label: 'Objection not justified',     phase: 'uni', count: 19 },
      { cat: 3,  label: 'Unilateral relief granted',   phase: 'uni', count: 23 },
      { cat: 4,  label: 'Full elimination',            phase: 'bi',  count: 266 },
      { cat: 6,  label: 'No taxation contrary to treaty', phase: 'bi', count: 9 },
      { cat: 7,  label: 'No agreement',                phase: 'bi',  count: 10 },
      { cat: 8,  label: 'Resolved via domestic remedy',phase: 'oth', count: 6 },
      { cat: 9,  label: 'Withdrawn by taxpayer',       phase: 'oth', count: 23 },
      { cat: 10, label: 'Any other outcome',           phase: 'oth', count: 1 }
    ]
  },
  // cycle times in months; approximate (read off Grafiek 6, ±~0.5). Flag in UI.
  cycleTimes: {
    years: [2021, 2022, 2023, 2024, 2025],
    TP:    [15.5, 19, 21, 26, 24.5],
    INT:   [12, 15, 15.5, 13.5, 10.5],
    Total: [13.5, 16.5, 16.8, 16.8, 12.5],
    approximate: true,
    norm: 24
  },
  // partners[year] = [{name, count}] desc; includes 'Overig'
  partners: {
    2025: [
      { name: 'België', count: 264 },
      { name: 'Overig', count: 258 },
      { name: 'Duitsland', count: 167 },
      { name: 'Verenigde Staten', count: 105 },
      { name: 'Spanje', count: 83 },
      { name: 'Verenigd Koninkrijk', count: 60 }
    ],
    partnerCounts: { total: 60, INT: 54, TP: 32, TB: 11 }
  },
  // KPI headline values + YoY for the hero
  kpis: {
    2025: { received: 506, closed: 531, resolutionRate: 97, endInventory: 1041, fullElimPct: 70.4 },
    2024: { received: 465, closed: 414 }
  },
  // short qualitative facts (NOT chart-mechanic commentary — see spec rule)
  facts: {
    awards: 'OECD MAP awards 2022, 2023, 2024',
    apaShareOfTP: 'About half of the TP MAP inventory is now APA (BAPA/MAPA) requests',
    arbitration: 'Two arbitration procedures ongoing, expected to conclude in 2026; none yet under the Wet fiscale arbitrage',
    methodNote: 'TP method (TNMM, CUP, profit split, …) is not published in MAP statistics — the OECD MAP Statistics Framework does not capture it.'
  },
  sources: [
    { year: 2023, title: 'MAP-Jaarverslag 2023' },
    { year: 2024, title: 'Jaarverslag MAP 2024 (publ. 26 May 2025)' },
    { year: 2025, title: 'Mutual Agreement Procedures Jaarverslag 2025 (publ. June 2026)' }
  ],
  methodologyNote: "Figures are the MAP-team's own stock-administration counts and can differ from later OECD-published MAP statistics (different start-date counting and treatment of cases awaiting taxpayer acceptance)."
```

- [ ] **Step 4: Run to verify it passes**

Run: `node --test map/tests/`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add map/core.js map/tests/core.test.js
git commit -m "feat(map): outcomes 2024, cycle times, partners, KPIs, facts"
```

---

## Task 4: Pure compute + format helpers

**Files:**
- Modify: `map/core.js`
- Test: `map/tests/core.test.js`

- [ ] **Step 1: Write the failing tests**

```js
test('yoy computes signed percent change', () => {
  assert.strictEqual(C.yoy(506, 465), '+8.8%');
  assert.strictEqual(C.yoy(531, 414), '+28.3%');
  assert.strictEqual(C.yoy(100, 200), '-50.0%');
});

test('niceMax rounds an axis ceiling up to a clean value', () => {
  assert.strictEqual(C.niceMax(384), 400);
  assert.strictEqual(C.niceMax(26), 30);
  assert.strictEqual(C.niceMax(0), 10);
});

test('outcomeGroups buckets the 10 categories into uni/bi/oth with subtotals', () => {
  const g = C.outcomeGroups(2025);
  assert.strictEqual(g.bi.subtotal, 360);   // 345+3+10+2
  assert.strictEqual(g.uni.subtotal, 82);   // 26+29+27
  assert.strictEqual(g.oth.subtotal, 48);   // 21+26+1
});

test('resolutionRate excludes denied/objection-not-justified from numerator', () => {
  // 97% headline is published; helper recomputes the "resolved share" consistently
  assert.strictEqual(C.resolutionRate(2025), 97);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test map/tests/`
Expected: FAIL — `C.yoy is not a function`.

- [ ] **Step 3: Implement**

Add helpers in `core.js` (before the `module.exports`), then export them:

```js
function yoy(curr, prev) {
  var d = (curr - prev) / prev * 100;
  return (d >= 0 ? '+' : '') + d.toFixed(1) + '%';
}
function niceMax(v) {
  if (v <= 0) return 10;
  var mag = Math.pow(10, Math.floor(Math.log10(v)));
  var n = Math.ceil(v / (mag / 2)) * (mag / 2);
  return n <= v ? n + mag / 2 : n;
}
function outcomeGroups(year) {
  var list = MAP_DATA.outcomes[year];
  var g = { uni: { items: [], subtotal: 0 }, bi: { items: [], subtotal: 0 }, oth: { items: [], subtotal: 0 } };
  list.forEach(function (o) { g[o.phase].items.push(o); g[o.phase].subtotal += o.count; });
  return g;
}
function resolutionRate(year) {
  // Published definition: resolved share of cases actually handled in MAP.
  // Hardcode the published headline per year to avoid divergence from source.
  return ({ 2025: 97 })[year];
}
```

Update the export tail:

```js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MAP_DATA: MAP_DATA, yoy: yoy, niceMax: niceMax, outcomeGroups: outcomeGroups, resolutionRate: resolutionRate };
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `node --test map/tests/`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add map/core.js map/tests/core.test.js
git commit -m "feat(map): pure compute and format helpers"
```

---

## Task 5: HTML shell — chrome, two-area switch, hero KPIs, sub-tab scaffold

**Files:**
- Create: `map/index.html`

This task builds the two-area navigation up front so MAP views (Tasks 6–10) and Rulings views (Tasks 13–15) slot into the same dispatch.

- [ ] **Step 1: Build the shell**

Create `map/index.html`. Copy the `<head>` token block, fonts, favicon, and the header/scroll-progress/theme-toggle chrome from the Adyen reference verbatim (title: "Dutch MAP, APA & Rulings Explorer — inRange"). Include `<script src="core.js"></script>` before the page IIFE. Structure:

```html
<!DOCTYPE html>
<html lang="en"><head> ... tokens + fonts (copy from Adyen) ... </head>
<body>
  <div class="scroll-progress" id="prog"></div>
  <header class="site-header"> ... brand + theme toggle (copy from Adyen) ... </header>
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Dutch tax authority · annual reports</p>
      <h1 id="heroTitle">Dutch MAP &amp; APA Explorer</h1>
      <p class="lede" id="heroLede"></p>
      <div class="area-switch" id="areaSwitch"></div>
      <div class="key-facts" id="kpis"></div>
    </div>
  </section>
  <nav class="tabbar"><div class="tabbar-inner" id="tabs"></div></nav>
  <main class="container" id="views"></main>
  <footer class="site-footer container" id="footer"></footer>
  <script src="core.js"></script>
  <script> /* page IIFE — filled across Tasks 5-15 */ </script>
</body></html>
```

Add `.area-switch` CSS: a segmented control (two pill buttons, active = brand fill), reusing token vars.

- [ ] **Step 2: IIFE skeleton — area state, area switch, per-area KPIs + sub-tabs**

```js
(function () {
  "use strict";

  // ---- area registry: each area owns its KPIs builder, lede, and sub-tabs ----
  var AREAS = {
    map: {
      label: 'MAP & APA',
      title: 'Dutch MAP &amp; APA Explorer',
      lede: "The Belastingdienst MAP-team's mutual-agreement and advance-pricing figures, 2019–2025.",
      tabs: [
        { id: 'caseload',  label: 'Caseload trends' },
        { id: 'inventory', label: 'Inventory flow' },
        { id: 'outcomes',  label: 'Outcomes & resolution' },
        { id: 'timing',    label: 'Timing · countries · APAs' },
        { id: 'tp',        label: 'TP deep-dive' }
      ],
      kpis: function () {
        var k = MAP_DATA.kpis[2025], p = MAP_DATA.kpis[2024];
        return [
          ['Requests received', k.received, yoy(k.received, p.received)],
          ['Cases closed', k.closed, yoy(k.closed, p.closed)],
          ['Resolution rate', k.resolutionRate + '%', ''],
          ['Year-end inventory', k.endInventory, ''],
          ['Full elimination', k.fullElimPct + '%', '']
        ];
      }
    },
    rulings: {
      label: 'International Rulings',
      title: 'Dutch International Rulings Explorer',
      lede: "The APA/ATR practice (College IFZ): rulings with an international character, 2023–2025.",
      tabs: [
        { id: 'rOverview', label: 'Overview' },
        { id: 'rFlow',     label: 'By type & flow' },
        { id: 'rTiming',   label: 'Processing times' },
        { id: 'rPositions',label: 'Defining positions' }
      ],
      kpis: function () { return []; } // filled in Task 13
    }
  };

  var area = 'map';
  var active = AREAS.map.tabs[0].id;

  function renderHero() {
    var A = AREAS[area];
    document.getElementById('heroTitle').innerHTML = A.title;
    document.getElementById('heroLede').textContent = A.lede;
    document.getElementById('areaSwitch').innerHTML = Object.keys(AREAS).map(function (key) {
      return '<button class="seg' + (key === area ? ' on' : '') + '" data-area="' + key + '">' +
        AREAS[key].label + '</button>';
    }).join('');
    var tiles = A.kpis();
    document.getElementById('kpis').innerHTML = tiles.map(function (t) {
      return '<div class="kf"><small>' + t[0] + '</small><strong>' + t[1] +
        (t[2] ? ' <span class="delta">' + t[2] + '</span>' : '') + '</strong></div>';
    }).join('');
  }

  function renderTabs() {
    var A = AREAS[area];
    document.getElementById('tabs').innerHTML = A.tabs.map(function (t, i) {
      return '<button class="tab-btn' + (t.id === active ? ' active' : '') +
        '" data-tab="' + t.id + '"><span class="tnum">' + (i + 1) + '</span>' + t.label + '</button>';
    }).join('');
  }

  function renderView() { /* dispatch filled in Tasks 6-10 (map) and 13-15 (rulings) */ }

  function render() { renderHero(); renderTabs(); renderView(); renderFooter(); }

  document.getElementById('areaSwitch').addEventListener('click', function (e) {
    var b = e.target.closest('[data-area]'); if (!b) return;
    area = b.getAttribute('data-area');
    active = AREAS[area].tabs[0].id; // reset to first sub-tab of the new area
    render();
  });
  document.getElementById('tabs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-tab]'); if (!b) return;
    active = b.getAttribute('data-tab'); render();
  });

  // renderFooter defined in Task 11; guard so early runs don't crash:
  function renderFooter() { /* filled in Task 11 */ }

  render();
})();
```

Note for later tasks: `renderView()` dispatches on `active` (sub-tab id); ids are globally unique across areas (`caseload…tp`, `rOverview…rPositions`) so a single switch statement works.

- [ ] **Step 3: Verify in browser**

Open `map/index.html` (or Claude_Preview `preview_start`). Confirm: header + theme toggle render; the area switch shows two segments and toggling it swaps the hero title/lede and the sub-tab row; MAP shows 5 KPI tiles (YoY on first two) and 5 sub-tabs; Rulings shows 4 sub-tabs (KPIs empty for now). Screenshot.

- [ ] **Step 4: Commit**

```bash
git add map/index.html
git commit -m "feat(map): html shell, two-area switch, hero KPIs, sub-tab scaffold"
```

---

## Task 6: SVG chart helpers + Caseload trends view

**Files:**
- Modify: `map/index.html`

- [ ] **Step 1: Add shared SVG helpers in the page IIFE**

Mirror the Adyen `path()`/`bar()`/`gridY()` helper style. Add a small toolkit used by all views:

```js
  var NS = 'http://www.w3.org/2000/svg';
  var STREAMS = [
    { key: 'INT', label: 'Interpretation', c: 'var(--brand-navy-500)' },
    { key: 'TP', label: 'Transfer pricing', c: 'var(--brand-green-600)' },
    { key: 'TB', label: 'Tie-breaker', c: 'var(--accent-ochre)' },
    { key: 'MLMAP', label: 'Multilateral', c: 'var(--brand-navy-300)' },
    { key: 'BAPA', label: 'BAPA', c: 'var(--brand-green-400)' },
    { key: 'MAPA', label: 'MAPA', c: 'var(--accent-terra)' }
  ];
  function svgEl(w, h, body) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" class="chart" role="img">' + body + '</svg>';
  }
  function linePath(pts) { // pts: [[x,y],...] -> SVG path d
    return pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0] + ' ' + p[1]; }).join(' ');
  }
  function yScale(plotH, padTop, max) { return function (v) { return padTop + (1 - v / max) * plotH; }; }
```

- [ ] **Step 2: Implement Caseload trends**

A multi-series line chart (received solid, closed dashed) over `D.years`, with workstream toggles. Default INT + TP on. Build the controls + SVG, wire toggle clicks to re-render only this view. Include hover tooltips (reuse Adyen `tip()` style). Pseudocode-complete implementation:

```js
  var caseloadOn = { INT: true, TP: true, TB: false, MLMAP: false, BAPA: false, MAPA: false };
  function viewCaseload() {
    var W = 900, H = 380, padL = 48, padB = 28, padTop = 16;
    var plotW = W - padL - 16, plotH = H - padB - padTop;
    var on = STREAMS.filter(function (s) { return caseloadOn[s.key]; });
    var max = niceMax(Math.max.apply(null, on.flatMap(function (s) {
      return D.caseload[s.key].received.concat(D.caseload[s.key].closed);
    }).concat([1])));
    var ys = yScale(plotH, padTop, max);
    var xs = function (i) { return padL + (i / (D.years.length - 1)) * plotW; };
    var grid = [0, 0.25, 0.5, 0.75, 1].map(function (f) {
      var y = padTop + f * plotH, v = Math.round(max * (1 - f));
      return '<line x1="' + padL + '" y1="' + y + '" x2="' + (padL + plotW) + '" y2="' + y +
        '" class="grid"/><text x="' + (padL - 8) + '" y="' + (y + 4) + '" class="ytick">' + v + '</text>';
    }).join('');
    var lines = on.map(function (s) {
      var r = D.caseload[s.key].received.map(function (v, i) { return [xs(i), ys(v)]; });
      var c = D.caseload[s.key].closed.map(function (v, i) { return [xs(i), ys(v)]; });
      return '<path d="' + linePath(r) + '" fill="none" stroke="' + s.c + '" stroke-width="2.5"/>' +
             '<path d="' + linePath(c) + '" fill="none" stroke="' + s.c + '" stroke-width="2" stroke-dasharray="4 4"/>';
    }).join('');
    var xlabels = D.years.map(function (y, i) {
      return '<text x="' + xs(i) + '" y="' + (H - 8) + '" class="xtick">' + y + '</text>';
    }).join('');
    var toggles = STREAMS.map(function (s) {
      return '<button class="chip' + (caseloadOn[s.key] ? ' on' : '') + '" data-cl="' + s.key +
        '" style="--chip:' + s.c + '">' + s.label + '</button>';
    }).join('');
    return '<div class="view-head"><h2>Caseload trends</h2>' +
      '<p class="lede">New requests (solid) vs. cases closed (dashed), 2019–2025.</p></div>' +
      '<div class="chip-row" id="clToggles">' + toggles + '</div>' +
      svgEl(W, H, grid + lines + xlabels);
  }
```

Add to `renderView()` dispatch: `if (active==='caseload') html = viewCaseload();` and after writing `#views.innerHTML`, wire `#clToggles` clicks to flip `caseloadOn` and call `render()`.

- [ ] **Step 3: Verify in browser**

Open the page, select the Caseload tab. Confirm: lines render with brand colours, toggles add/remove streams, axis labels read 2019–2025 and a clean max (e.g. 400 for INT). Spot-check INT 2025 received peak ≈ 350 against the y-axis. Screenshot.

- [ ] **Step 4: Commit**

```bash
git add map/index.html
git commit -m "feat(map): svg helpers + caseload trends view"
```

---

## Task 7: Inventory flow view

**Files:**
- Modify: `map/index.html`

- [ ] **Step 1: Implement the waterfall**

For a selected year (default 2025) and stream selector, draw a begin → received → (−closed) → end waterfall bar chart. Year selector chips (2023/2024/2025); stream chips reuse `STREAMS` (core MAP streams). Implementation:

```js
  var invYear = 2025, invStream = 'INT';
  function viewInventory() {
    var d = D.inventory[invYear][invStream];
    var steps = [
      { label: 'Begin', v: d.begin, base: 0, kind: 'tot' },
      { label: 'Received', v: d.received, base: d.begin, kind: 'up' },
      { label: 'Closed', v: -d.closed, base: d.begin + d.received, kind: 'down' },
      { label: 'End', v: d.end, base: 0, kind: 'tot' }
    ];
    var W = 720, H = 340, padL = 44, padB = 28, padTop = 16;
    var plotW = W - padL - 16, plotH = H - padB - padTop;
    var max = niceMax(d.begin + d.received);
    var ys = yScale(plotH, padTop, max);
    var bw = plotW / steps.length * 0.5;
    var bars = steps.map(function (s, i) {
      var x = padL + (i + 0.25) * (plotW / steps.length);
      var top = s.kind === 'down' ? ys(s.base) : ys(s.base + Math.max(s.v, 0));
      var bot = s.kind === 'down' ? ys(s.base + s.v) : ys(s.base);
      var fill = s.kind === 'tot' ? 'var(--brand-navy-500)' : s.kind === 'up' ? 'var(--brand-green-500)' : 'var(--danger)';
      return '<rect x="' + x + '" y="' + Math.min(top, bot) + '" width="' + bw + '" height="' +
        Math.abs(bot - top) + '" rx="3" fill="' + fill + '"/>' +
        '<text x="' + (x + bw / 2) + '" y="' + (H - 8) + '" class="xtick">' + s.label + '</text>' +
        '<text x="' + (x + bw / 2) + '" y="' + (Math.min(top, bot) - 5) + '" class="barval">' + Math.abs(s.v) + '</text>';
    }).join('');
    var years = [2023, 2024, 2025].map(function (y) {
      return '<button class="chip' + (y === invYear ? ' on' : '') + '" data-invy="' + y + '">' + y + '</button>';
    }).join('');
    var streams = ['INT','TP','MLMAP','TB','BAPA','MAPA'].map(function (k) {
      var s = STREAMS.find(function (x) { return x.key === k; });
      return '<button class="chip' + (k === invStream ? ' on' : '') + '" data-invs="' + k + '">' + s.label + '</button>';
    }).join('');
    return '<div class="view-head"><h2>Inventory flow</h2>' +
      '<p class="lede">How the case stock moved: begin + received − closed = end.</p></div>' +
      '<div class="chip-row" id="invYears">' + years + '</div>' +
      '<div class="chip-row" id="invStreams">' + streams + '</div>' + svgEl(W, H, bars);
  }
```

Add dispatch in `renderView()`; wire `#invYears`/`#invStreams` clicks to set `invYear`/`invStream` then `render()`.

- [ ] **Step 2: Verify in browser**

Inventory tab: confirm waterfall renders, switching year/stream updates bars and values, and `begin + received − closed === end` visually (e.g. INT 2025: 693 + 350 − 384 = 659). Screenshot.

- [ ] **Step 3: Commit**

```bash
git add map/index.html
git commit -m "feat(map): inventory flow waterfall view"
```

---

## Task 8: Outcomes & resolution view

**Files:**
- Modify: `map/index.html`

- [ ] **Step 1: Implement**

For the selected year (2024/2025), render a horizontal stacked/grouped bar of the 10 categories grouped uni/bi/oth using `outcomeGroups(year)` (already tested in core.js — but `outcomeGroups` is in core.js exports; expose it on the browser global too — see Step 2), plus a resolution-rate readout and the full-elimination share. One labelled inRange takeaway is permitted here only if non-obvious; default to none.

```js
  var outYear = 2025;
  function viewOutcomes() {
    var g = outcomeGroups(outYear);
    var total = g.uni.subtotal + g.bi.subtotal + g.oth.subtotal;
    function rowBars(grp, color, title) {
      var rows = grp.items.map(function (o) {
        var w = (o.count / total * 100).toFixed(1);
        return '<div class="obar"><span class="olabel">' + o.cat + '. ' + o.label + '</span>' +
          '<span class="otrack"><span class="ofill" style="width:' + w + '%;background:' + color + '"></span></span>' +
          '<span class="oval">' + o.count + '</span></div>';
      }).join('');
      return '<h4>' + title + ' <span class="osub">' + grp.subtotal + '</span></h4>' + rows;
    }
    var years = [2024, 2025].map(function (y) {
      return '<button class="chip' + (y === outYear ? ' on' : '') + '" data-outy="' + y + '">' + y + '</button>';
    }).join('');
    return '<div class="view-head"><h2>Outcomes &amp; resolution</h2>' +
      '<p class="lede">The ten OECD outcome categories for cases the Dutch authority closed in ' + outYear + '.</p></div>' +
      '<div class="chip-row" id="outYears">' + years + '</div>' +
      '<div class="outcols">' +
        '<div>' + rowBars(g.bi, 'var(--brand-green-500)', 'Bilateral phase') +
                  rowBars(g.uni, 'var(--brand-navy-400)', 'Unilateral phase') +
                  rowBars(g.oth, 'var(--neutral-400)', 'Other') + '</div>' +
      '</div>';
  }
```

- [ ] **Step 2: Expose core helpers on the browser global**

`core.js` only attaches helpers to `module.exports`. For the browser, ensure `outcomeGroups`, `yoy`, `niceMax`, `resolutionRate` are top-level `function` declarations (they are) so they're already global when `core.js` loads via `<script>`. No change needed — confirm by checking they are plain `function name(){}` declarations, not `const`. Add a comment in `core.js` noting both consumption modes.

- [ ] **Step 3: Verify in browser**

Outcomes tab: bars grouped by phase, year toggle 2024/2025 works, 2025 bilateral subtotal 360 / full-elimination 345 read correctly. Screenshot.

- [ ] **Step 4: Commit**

```bash
git add map/index.html map/core.js
git commit -m "feat(map): outcomes & resolution view"
```

---

## Task 9: Timing · countries · APAs view

**Files:**
- Modify: `map/index.html`

- [ ] **Step 1: Implement three sub-panels**

(a) Cycle-time line chart vs. a dashed 24-month norm line, with an "approximate (±0.5 mo)" label because `D.cycleTimes.approximate` is true; (b) top treaty partners as horizontal bars from `D.partners[2025]` (named top-5 + Overig); (c) BAPA/MAPA received/closed mini-trend from `D.caseload.BAPA`/`.MAPA`. This view carries the one strong takeaway (TP over the norm → APA-over-MAP), rendered as a Source-Serif callout — kept to ≤2 sentences, no chart-mechanics language.

```js
  function viewTiming() {
    var ct = D.cycleTimes, W = 760, H = 320, padL = 40, padTop = 16, padB = 26;
    var plotW = W - padL - 16, plotH = H - padTop - padB, max = 30;
    var ys = yScale(plotH, padTop, max);
    var xs = function (i) { return padL + (i / (ct.years.length - 1)) * plotW; };
    var norm = '<line x1="' + padL + '" y1="' + ys(ct.norm) + '" x2="' + (padL + plotW) + '" y2="' + ys(ct.norm) +
      '" class="norm"/><text x="' + (padL + plotW) + '" y="' + (ys(ct.norm) - 5) + '" class="normlbl">24-mo norm</text>';
    var series = [['TP', 'var(--brand-green-600)'], ['INT', 'var(--brand-navy-500)'], ['Total', 'var(--brand-navy-300)']];
    var lines = series.map(function (s) {
      var pts = ct[s[0]].map(function (v, i) { return [xs(i), ys(v)]; });
      return '<path d="' + linePath(pts) + '" fill="none" stroke="' + s[1] + '" stroke-width="2.5"/>';
    }).join('');
    var xl = ct.years.map(function (y, i) { return '<text x="' + xs(i) + '" y="' + (H - 6) + '" class="xtick">' + y + '</text>'; }).join('');
    var maxP = D.partners[2025][0].count;
    var partnerBars = D.partners[2025].map(function (p) {
      return '<div class="pbar"><span class="plabel">' + p.name + '</span>' +
        '<span class="ptrack"><span class="pfill" style="width:' + (p.count / maxP * 100) + '%"></span></span>' +
        '<span class="pval">' + p.count + '</span></div>';
    }).join('');
    var takeaway = '<aside class="takeaway">Transfer-pricing cases are the only stream that runs past the 24-month ' +
      'norm — which is part of why advance certainty (a BAPA/MAPA) is increasingly preferred over after-the-fact MAP.</aside>';
    return '<div class="view-head"><h2>Timing · countries · APAs</h2></div>' +
      '<div class="panel"><h4>Average cycle time (months) <small>approximate, read from the report chart</small></h4>' +
      svgEl(W, H, norm + lines + xl) + takeaway + '</div>' +
      '<div class="panel"><h4>Top treaty partners, 2025</h4><div class="pbars">' + partnerBars + '</div></div>';
  }
```

- [ ] **Step 2: Verify in browser**

Timing tab: TP line crosses above the 24-month dashed norm at 2024 peak (26), INT/Total stay below; partner bars descend from België 264; the "approximate" label and the single takeaway show. Screenshot.

- [ ] **Step 3: Commit**

```bash
git add map/index.html
git commit -m "feat(map): timing, countries & APA view"
```

---

## Task 10: TP deep-dive view + method explainer

**Files:**
- Modify: `map/index.html`

- [ ] **Step 1: Implement**

Compose TP-specific cuts already in `D`: TP received/closed trend (reuse the caseload line builder constrained to TP), TP cycle time (the over-norm point), `D.partners.partnerCounts.TP` (32), and `D.facts.apaShareOfTP`. Then a clearly-labelled **method explainer** card using `D.facts.methodNote` — framed as inRange commentary, visually distinct (Source-Serif, "inRange view" eyebrow), stating method isn't published and what inRange typically sees in practice. No invented method statistics.

```js
  function viewTp() {
    return '<div class="view-head"><h2>Transfer pricing — deep dive</h2></div>' +
      '<div class="panel"><h4>TP cases received vs. closed</h4>' + /* reuse line builder for TP only */ '</div>' +
      '<div class="statgrid">' +
        '<div class="stat"><strong>32</strong><small>treaty partners with TP cases</small></div>' +
        '<div class="stat"><strong>~half</strong><small>of TP inventory is now APA requests</small></div>' +
        '<div class="stat"><strong>&gt;24 mo</strong><small>only stream over the BEPS A14 norm</small></div>' +
      '</div>' +
      '<aside class="explainer"><p class="eyebrow">inRange view · not in the data</p>' +
      '<p>' + D.facts.methodNote + ' In practice, Dutch TP MAP/APA cases most often turn on TNMM and, for ' +
      'integrated or IP-heavy structures, the profit-split method — but the official statistics do not break this out.</p></aside>';
  }
```

Add `tp` to `renderView()` dispatch.

- [ ] **Step 2: Verify in browser**

TP tab: TP trend renders, three stat tiles show, method explainer is visually distinct and clearly labelled as commentary. Screenshot.

- [ ] **Step 3: Commit**

```bash
git add map/index.html
git commit -m "feat(map): TP deep-dive view + method explainer"
```

---

## Task 11: Footer (sources + methodology), theme, print, responsive polish

**Files:**
- Modify: `map/index.html`

- [ ] **Step 1: Render footer from data**

```js
  function renderFooter() {
    var src = D.sources.map(function (s) { return '<li>' + s.title + '</li>'; }).join('');
    document.getElementById('footer').innerHTML =
      '<h4>Sources</h4><ul class="srclist">' + src + '</ul>' +
      '<p class="note">' + D.methodologyNote + '</p>' +
      '<p class="note">Data through FY2025 · figures shown are the MAP-team\'s published counts.</p>';
  }
```

Call `renderFooter()` once in `render()`.

- [ ] **Step 2: Theme toggle + scroll progress**

Copy the Adyen theme-toggle (`data-theme` on `<html>`, persisted to `localStorage`) and scroll-progress bar logic verbatim. Confirm dark-mode tokens apply to all chart `var(--...)` colours (they will, since charts use CSS variables).

- [ ] **Step 3: Print + responsive**

Add `@media print` (hide tab bar/toggles/chips, show all five views stacked with a print heading each) and `@media (max-width:760px)` (charts scale via `viewBox`; chip rows wrap; KPI grid collapses). Reuse Adyen print rules as a base.

- [ ] **Step 4: Verify in browser**

Toggle dark mode (charts recolour, persists on reload); print preview shows all views stacked and legible; narrow the window to ~390px and confirm no horizontal scroll and charts shrink. Screenshots of light, dark, and mobile.

- [ ] **Step 5: Commit**

```bash
git add map/index.html
git commit -m "feat(map): footer, theme, print, responsive polish"
```

---

## Task 12: RULINGS_DATA module + reconciliation tests

**Files:**
- Modify: `map/core.js`
- Test: `map/tests/core.test.js`

- [ ] **Step 1: Write the failing tests**

Append to `map/tests/core.test.js`:

```js
test('RULINGS_DATA has all five types for 2023-2025 and reconciles', () => {
  const R = C.RULINGS_DATA;
  assert.deepStrictEqual(R.years, [2023, 2024, 2025]);
  for (const y of R.years) {
    const f = R.flow[y];
    for (const t of ['ATR','APA','BAPA','Innovatiebox','Overige']) {
      const c = f[t];
      // begin + received - closed === end, per type
      assert.strictEqual(c.begin + c.received - c.closed, c.end, `${y} ${t}`);
      // outcome sub-rows sum to closed
      const o = c.outcomes;
      assert.strictEqual(o.granted + o.rejected + o.withdrawn + o.outOfTreatment + o.noIntl, c.closed, `${y} ${t} outcomes`);
    }
  }
});

test('rulings totals match published headline (2025: 528 received, 591 closed, 644 end)', () => {
  const f = C.RULINGS_DATA.flow[2025];
  const sum = (k) => ['ATR','APA','BAPA','Innovatiebox','Overige'].reduce((a,t)=>a+f[t][k],0);
  assert.strictEqual(sum('received'), 528);
  assert.strictEqual(sum('closed'), 591);
  assert.strictEqual(sum('end'), 644);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test map/tests/`
Expected: FAIL — `Cannot read properties of undefined (reading 'years')` (no `RULINGS_DATA`).

- [ ] **Step 3: Implement**

Add `var RULINGS_DATA = {...}` in `core.js` (before the export tail) using the exact spec figures. Each `flow[year][type]` = `{begin, received, closed, end, outcomes:{granted, rejected, withdrawn, outOfTreatment, noIntl}}`. Full 2025 block (repeat the pattern for 2024 and 2023 from the spec tables):

```js
var RULINGS_DATA = {
  years: [2023, 2024, 2025],
  types: ['ATR', 'APA', 'BAPA', 'Innovatiebox', 'Overige'],
  typeLabels: { ATR: 'ATR', APA: 'APA (unilateral)', BAPA: 'BAPA (bi-/multilateral)', Innovatiebox: 'Innovation box', Overige: 'Other rulings' },
  flow: {
    2025: {
      ATR:          { begin: 216, received: 231, closed: 276, end: 171, outcomes: { granted: 215, rejected: 4, withdrawn: 47, outOfTreatment: 7, noIntl: 3 } },
      APA:          { begin: 58,  received: 63,  closed: 70,  end: 51,  outcomes: { granted: 61,  rejected: 1, withdrawn: 6,  outOfTreatment: 2, noIntl: 0 } },
      BAPA:         { begin: 100, received: 31,  closed: 34,  end: 97,  outcomes: { granted: 31,  rejected: 1, withdrawn: 1,  outOfTreatment: 1, noIntl: 0 } },
      Innovatiebox: { begin: 303, received: 169, closed: 179, end: 293, outcomes: { granted: 148, rejected: 1, withdrawn: 5,  outOfTreatment: 3, noIntl: 22 } },
      Overige:      { begin: 30,  received: 34,  closed: 32,  end: 32,  outcomes: { granted: 19,  rejected: 4, withdrawn: 6,  outOfTreatment: 2, noIntl: 1 } }
    },
    2024: {
      ATR:          { begin: 207, received: 288, closed: 279, end: 216, outcomes: { granted: 233, rejected: 3, withdrawn: 36, outOfTreatment: 5, noIntl: 2 } },
      APA:          { begin: 59,  received: 61,  closed: 62,  end: 58,  outcomes: { granted: 53,  rejected: 0, withdrawn: 7,  outOfTreatment: 2, noIntl: 0 } },
      BAPA:         { begin: 108, received: 26,  closed: 34,  end: 100, outcomes: { granted: 25,  rejected: 1, withdrawn: 3,  outOfTreatment: 4, noIntl: 1 } },
      Innovatiebox: { begin: 328, received: 177, closed: 202, end: 303, outcomes: { granted: 154, rejected: 0, withdrawn: 13, outOfTreatment: 7, noIntl: 28 } },
      Overige:      { begin: 30,  received: 31,  closed: 31,  end: 30,  outcomes: { granted: 21,  rejected: 2, withdrawn: 5,  outOfTreatment: 2, noIntl: 1 } }
    },
    2023: {
      ATR:          { begin: 180, received: 276, closed: 249, end: 207, outcomes: { granted: 212, rejected: 2, withdrawn: 29, outOfTreatment: 5, noIntl: 1 } },
      APA:          { begin: 70,  received: 61,  closed: 72,  end: 59,  outcomes: { granted: 49,  rejected: 4, withdrawn: 10, outOfTreatment: 7, noIntl: 2 } },
      BAPA:         { begin: 101, received: 35,  closed: 28,  end: 108, outcomes: { granted: 21,  rejected: 1, withdrawn: 0,  outOfTreatment: 4, noIntl: 2 } },
      Innovatiebox: { begin: 355, received: 182, closed: 210, end: 327, outcomes: { granted: 147, rejected: 0, withdrawn: 13, outOfTreatment: 14, noIntl: 36 } },
      Overige:      { begin: 35,  received: 32,  closed: 37,  end: 30,  outcomes: { granted: 15,  rejected: 1, withdrawn: 9,  outOfTreatment: 4, noIntl: 8 } }
    }
  },
  // gross processing time (months) by type & outcome; null = "—" (no cases)
  processingTime: {
    2025: { ATR: { granted: 6, rejected: 10, withdrawn: 12, outOfTreatment: 18 }, APA: { granted: 11, rejected: 7, withdrawn: 12, outOfTreatment: 21 }, BAPA: { granted: 39, rejected: 11, withdrawn: 2, outOfTreatment: 33 }, Innovatiebox: { granted: 20, rejected: 90, withdrawn: 30, outOfTreatment: 33 }, Overige: { granted: 8, rejected: 33, withdrawn: 10, outOfTreatment: 12 } },
    2024: { ATR: { granted: 8, rejected: 8, withdrawn: 10, outOfTreatment: 13 }, APA: { granted: 12, rejected: null, withdrawn: 24, outOfTreatment: 17 }, BAPA: { granted: 32, rejected: 46, withdrawn: 39, outOfTreatment: 37 }, Innovatiebox: { granted: 17, rejected: null, withdrawn: 27, outOfTreatment: 35 }, Overige: { granted: 8, rejected: 8, withdrawn: 13, outOfTreatment: 8 } }
  },
  kpis: {
    2025: { received: 528, closed: 591, granted: 474, endInventory: 644 },
    2024: { received: 583, closed: 608, granted: 486, endInventory: 707 }
  },
  // curated "beeldbepalende standpunten" — inRange commentary (Aleks's voice). Editable copy.
  positions: [
    { icon: '🤝', group: 'TP', title: 'Shared Control = Profit Split?', body: "In one APA, the Dutch entity and a foreign affiliate jointly performed key treasury functions and controlled the financing risks — leading to a contribution-based (profit-split) allocation of treasury profits such as cash-pooling and intercompany financing.", source: 'Rulings 2024' },
    { icon: '💳', group: 'TP', title: 'Implicit Support in Financial TP', body: "An entity had enough financial capacity to borrow independently (so no guarantee fee was due), yet its group affiliation lifted its credit profile. Implicit support was recognised as a pricing factor for the intercompany loans.", source: 'Rulings 2024' },
    { icon: '⚠️', group: 'TP', title: 'Comparability Adjustments: Handle with Care', body: "A toll manufacturer applied TNMM against comparables that owned inventory and bore real operational risk, then tried to adjust their margins by stripping out material costs. The authorities found the comparables functionally unsuitable and the adjustments unreliable — the APA was not accepted and the request was withdrawn.", source: 'Rulings 2024' },
    { icon: '🚫', group: 'Access', title: 'No APAs with Low-Tax Jurisdictions', body: "Certainty up front is not granted in anticipation of a future restructuring — the low-tax disconnection must be fully completed beforehand. Only narrow exceptions apply for genuinely dismantling tax-avoidance structures, and a >30%-of-revenue-from-LTJ test bars access.", source: 'Rulings 2024' },
    { icon: '🧭', group: 'Access', title: 'Economic Nexus, Made Concrete', body: "For participation- and withholding-exemption certainty, the authorities weigh both the quality and the quantity of Dutch personnel that actually steer the foreign holdings — judged on the full facts, not on whether costs are recharged.", source: 'Rulings 2024-25' }
  ],
  publishedSummaries2025: { ATR: 273, 'APA/BAPA': 104, Innovatiebox: 157, Overige: 31 },
  sources: [
    { year: 2023, title: 'Jaarverslag 2023 rulings met een internationaal karakter' },
    { year: 2024, title: 'Summary of Dutch international tax ruling practice 2024' },
    { year: 2025, title: 'Rulings met een internationaal karakter — Jaarverslag 2025' }
  ],
  processingNote: 'Gross processing time (from filing to agreement/withdrawal/rejection), including time spent awaiting requested information. Net handling time is materially shorter.'
};
```

Update the export tail to add `RULINGS_DATA`:

```js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MAP_DATA: MAP_DATA, RULINGS_DATA: RULINGS_DATA, yoy: yoy, niceMax: niceMax, outcomeGroups: outcomeGroups, resolutionRate: resolutionRate };
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `node --test map/tests/`
Expected: PASS (reconciliation + totals green for all three years × five types).

- [ ] **Step 5: Commit**

```bash
git add map/core.js map/tests/core.test.js
git commit -m "feat(map): RULINGS_DATA (2023-2025) with reconciliation tests"
```

---

## Task 13: Rulings Overview view + KPIs

**Files:**
- Modify: `map/index.html`

- [ ] **Step 1: Fill the rulings KPI builder**

In the `AREAS.rulings` object (Task 5), replace the placeholder `kpis` with:

```js
      kpis: function () {
        var k = RULINGS_DATA.kpis[2025], p = RULINGS_DATA.kpis[2024];
        return [
          ['Requests received', k.received, yoy(k.received, p.received)],
          ['Requests closed', k.closed, yoy(k.closed, p.closed)],
          ['(Partly) granted', k.granted, yoy(k.granted, p.granted)],
          ['Year-end inventory', k.endInventory, yoy(k.endInventory, p.endInventory)]
        ];
      }
```

- [ ] **Step 2: Implement the Overview view**

A ruling-mix breakdown for a selected year (default 2025): a horizontal stacked bar of received-by-type and a second of closed-by-type, with a per-type legend. Add a `rulingMix(year, metric)` helper in `core.js` (and export + test it) that returns `[{type, label, value, pct}]`:

```js
// core.js
function rulingMix(year, metric) { // metric: 'received' | 'closed' | 'end'
  var f = RULINGS_DATA.flow[year];
  var rows = RULINGS_DATA.types.map(function (t) { return { type: t, label: RULINGS_DATA.typeLabels[t], value: f[t][metric] }; });
  var total = rows.reduce(function (a, r) { return a + r.value; }, 0);
  rows.forEach(function (r) { r.pct = +(r.value / total * 100).toFixed(1); });
  return rows;
}
```

Add a test (`rulingMix(2025,'received')` sums to 528; ATR is the largest share). Then the view in `index.html`:

```js
  var rYear = 2025;
  var RTYPE_COLORS = { ATR: 'var(--brand-navy-500)', APA: 'var(--brand-green-600)', BAPA: 'var(--brand-green-400)', Innovatiebox: 'var(--accent-ochre)', Overige: 'var(--neutral-400)' };
  function stackedBar(rows) {
    var x = 0;
    return '<div class="stackbar">' + rows.map(function (r) {
      var seg = '<span class="seg" style="width:' + r.pct + '%;background:' + RTYPE_COLORS[r.type] + '" title="' + r.label + ': ' + r.value + '"></span>';
      x += r.pct; return seg;
    }).join('') + '</div>';
  }
  function viewROverview() {
    var rec = rulingMix(rYear, 'received'), cl = rulingMix(rYear, 'closed');
    var years = RULINGS_DATA.years.map(function (y) {
      return '<button class="chip' + (y === rYear ? ' on' : '') + '" data-ry="' + y + '">' + y + '</button>';
    }).join('');
    var legend = RULINGS_DATA.types.map(function (t) {
      return '<span class="lg"><i style="background:' + RTYPE_COLORS[t] + '"></i>' + RULINGS_DATA.typeLabels[t] + '</span>';
    }).join('');
    return '<div class="view-head"><h2>Rulings overview</h2>' +
      '<p class="lede">International rulings issued by the APA/ATR practice, by type.</p></div>' +
      '<div class="chip-row" id="rYears">' + years + '</div>' +
      '<h4>Received ' + rYear + ' <span class="osub">' + rec.reduce(function(a,r){return a+r.value;},0) + '</span></h4>' + stackedBar(rec) +
      '<h4>Closed ' + rYear + ' <span class="osub">' + cl.reduce(function(a,r){return a+r.value;},0) + '</span></h4>' + stackedBar(cl) +
      '<div class="legend">' + legend + '</div>';
  }
```

Add `rOverview` to the `renderView()` dispatch; wire `#rYears` clicks to set `rYear` then `render()`.

- [ ] **Step 3: Verify in browser**

Rulings area → Overview: 4 KPI tiles with YoY deltas; two stacked bars (received/closed) with a 5-type legend; year chips 2023–2025 switch the data. Screenshot.

- [ ] **Step 4: Commit**

```bash
git add map/index.html map/core.js map/tests/core.test.js
git commit -m "feat(map): rulings overview view + KPIs + rulingMix helper"
```

---

## Task 14: Rulings "By type & flow" view

**Files:**
- Modify: `map/index.html`

- [ ] **Step 1: Implement**

For a selected type (default ATR) and year (default 2025): a begin → received → closed → end waterfall (reuse the Task 7 waterfall builder pattern), an outcome-split horizontal bar (granted / rejected / withdrawn / out-of-treatment / no-international-character), and a small 2023–2025 received/closed/end trend (3 mini-lines). Controls: type chips + year chips.

```js
  var rFlowType = 'ATR', rFlowYear = 2025;
  function viewRFlow() {
    var c = RULINGS_DATA.flow[rFlowYear][rFlowType];
    var o = c.outcomes;
    var outRows = [
      ['(Partly) granted', o.granted, 'var(--brand-green-500)'],
      ['Rejected', o.rejected, 'var(--danger)'],
      ['Withdrawn', o.withdrawn, 'var(--accent-ochre)'],
      ['Out of treatment', o.outOfTreatment, 'var(--neutral-400)'],
      ['No int\'l character', o.noIntl, 'var(--brand-navy-300)']
    ];
    var maxO = Math.max.apply(null, outRows.map(function (r) { return r[1]; }).concat([1]));
    var outBars = outRows.map(function (r) {
      return '<div class="obar"><span class="olabel">' + r[0] + '</span><span class="otrack">' +
        '<span class="ofill" style="width:' + (r[1] / maxO * 100) + '%;background:' + r[2] + '"></span></span>' +
        '<span class="oval">' + r[1] + '</span></div>';
    }).join('');
    // waterfall: begin (+received) (−closed) end — reuse Task 7 logic with these 4 steps
    var waterfall = buildWaterfall(c.begin, c.received, c.closed, c.end); // factor Task 7 into a shared helper
    // 2023-2025 trend (received/closed/end) for this type
    var trend = buildTypeTrend(rFlowType); // 3 mini polylines over RULINGS_DATA.years
    var types = RULINGS_DATA.types.map(function (t) {
      return '<button class="chip' + (t === rFlowType ? ' on' : '') + '" data-rft="' + t + '">' + RULINGS_DATA.typeLabels[t] + '</button>';
    }).join('');
    var years = RULINGS_DATA.years.map(function (y) {
      return '<button class="chip' + (y === rFlowYear ? ' on' : '') + '" data-rfy="' + y + '">' + y + '</button>';
    }).join('');
    return '<div class="view-head"><h2>By type &amp; flow</h2></div>' +
      '<div class="chip-row" id="rfTypes">' + types + '</div><div class="chip-row" id="rfYears">' + years + '</div>' +
      '<div class="panel"><h4>Stock flow ' + rFlowYear + '</h4>' + waterfall + '</div>' +
      '<div class="panel"><h4>Outcome split ' + rFlowYear + '</h4>' + outBars + '</div>' +
      '<div class="panel"><h4>2023–2025 trend</h4>' + trend + '</div>';
  }
```

Refactor the Task 7 inventory waterfall into a shared `buildWaterfall(begin, received, closed, end)` helper (so both the MAP inventory view and this reuse it — DRY). Add `buildTypeTrend(type)` that draws received/closed/end as three mini polylines over `RULINGS_DATA.years`. Add `rFlow` to `renderView()`; wire `#rfTypes`/`#rfYears`.

- [ ] **Step 2: Verify in browser**

Rulings → By type & flow: waterfall reconciles (e.g. ATR 2025: 216 + 231 − 276 = 171); outcome bars present; type/year chips switch; trend shows three lines across 2023–2025. Screenshot. Confirm the MAP inventory view (Task 7) still renders after the waterfall refactor.

- [ ] **Step 3: Commit**

```bash
git add map/index.html
git commit -m "feat(map): rulings by-type & flow view; share waterfall helper"
```

---

## Task 15: Rulings "Processing times" + "Defining positions" views

**Files:**
- Modify: `map/index.html`

- [ ] **Step 1: Processing times view**

A small matrix/heat-style table: rows = outcomes (granted / rejected / withdrawn / out-of-treatment), columns = the five types, cells = months from `RULINGS_DATA.processingTime[year]`, with a year toggle (2024/2025) and the gross-vs-net note. `null` cells render as "—". Cell shading scales with magnitude (longer = deeper brand-navy tint).

```js
  var rtYear = 2025;
  function viewRTiming() {
    var pt = RULINGS_DATA.processingTime[rtYear];
    var outs = [['granted','(Partly) granted'],['rejected','Rejected'],['withdrawn','Withdrawn'],['outOfTreatment','Out of treatment']];
    var head = '<tr><th></th>' + RULINGS_DATA.types.map(function (t) { return '<th>' + t + '</th>'; }).join('') + '</tr>';
    var rows = outs.map(function (o) {
      return '<tr><td class="rowlbl">' + o[1] + '</td>' + RULINGS_DATA.types.map(function (t) {
        var v = pt[t][o[0]];
        return v == null ? '<td class="cell na">—</td>' : '<td class="cell" style="--mo:' + v + '">' + v + '</td>';
      }).join('') + '</tr>';
    }).join('');
    var years = [2024, 2025].map(function (y) { return '<button class="chip' + (y === rtYear ? ' on' : '') + '" data-rty="' + y + '">' + y + '</button>'; }).join('');
    return '<div class="view-head"><h2>Processing times</h2><p class="lede">Gross processing time, months, by ruling type and outcome.</p></div>' +
      '<div class="chip-row" id="rtYears">' + years + '</div>' +
      '<table class="heat"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table>' +
      '<p class="note">' + RULINGS_DATA.processingNote + '</p>';
  }
```

- [ ] **Step 2: Defining positions view**

Render `RULINGS_DATA.positions` as cards, grouped TP first then Access. Each card uses the Source-Serif callout style, a clear "inRange commentary" eyebrow, emoji title, body, and source tag.

```js
  function viewRPositions() {
    function cards(group) {
      return RULINGS_DATA.positions.filter(function (p) { return p.group === group; }).map(function (p) {
        return '<article class="position"><p class="eyebrow">inRange view · ' + p.source + '</p>' +
          '<h3>' + p.icon + ' ' + p.title + '</h3><p>' + p.body + '</p></article>';
      }).join('');
    }
    return '<div class="view-head"><h2>Defining positions</h2>' +
      '<p class="lede">Selected "beeldbepalende standpunten" from the ruling practice, read through a TP lens.</p></div>' +
      '<h4>Transfer pricing</h4><div class="positions">' + cards('TP') + '</div>' +
      '<h4>Access conditions</h4><div class="positions">' + cards('Access') + '</div>';
  }
```

Add both (`rTiming`, `rPositions`) to `renderView()` dispatch. Add `.heat`/`.position` CSS (cells shade via `--mo`; positions styled as the prominent commentary cards).

- [ ] **Step 3: Verify in browser**

Rulings → Processing times: matrix renders, "—" for the two empty 2024 cells, year toggle works, gross note shows. Rulings → Defining positions: 5 cards in two groups, clearly framed as inRange commentary, voice matches the saved reference. Screenshots.

- [ ] **Step 4: Commit**

```bash
git add map/index.html
git commit -m "feat(map): rulings processing-times matrix + defining-positions cards"
```

---

## Task 16: Footer (both areas), README + full regression

**Files:**
- Modify: `map/index.html`
- Create: `map/README.md`

- [ ] **Step 1: Make the footer area-aware**

Extend the Task 11 `renderFooter()` to list the active area's sources (`MAP_DATA.sources` or `RULINGS_DATA.sources`) plus the shared methodology + data-through-FY2025 notes. (It is already called from `render()`.)

- [ ] **Step 2: Write the update guide**

```markdown
# /map — Dutch MAP, APA & Rulings Explorer

Served at inrange.nl/map. Two static files, no build step:
- `core.js` — all report figures (`MAP_DATA`, `RULINGS_DATA`) + pure helpers. **Edit this to update.**
- `index.html` — chrome, two-area switch, and the nine views (vanilla JS, hand-built SVG).

## Updating for a new report year
**MAP & APA:** add the year to `MAP_DATA.years`; append to `caseload`, `inventory[year]`,
`outcomes[year]`, `cycleTimes`, `partners[year]`, `kpis`. Cycle-time & top-partner figures
live only in chart images — render the PDF pages (PyMuPDF) and read them; keep `approximate` honest.
**International Rulings:** add the year to `RULINGS_DATA.years`; append `flow[year]` (per type,
with the outcome sub-object), `processingTime[year]`, `kpis`; refresh/extend `positions`.
Then: `node --test map/tests/` (reconciliation must pass) → open `index.html`, click both
areas through every sub-tab, dark mode, print preview.

## Commentary rule
inRange notes are opt-in and must add something the chart can't show. Never narrate chart
mechanics. No note is better than a weak one. The Rulings "Defining positions" cards are the
one place opinion is prominent — keep them in Aleks's voice.
```

- [ ] **Step 3: Full test run**

Run: `node --test map/tests/`
Expected: PASS, all tests green (MAP + RULINGS reconciliation, helpers).

- [ ] **Step 4: Manual acceptance pass (browser)**

Against spec success criteria: area switch toggles cleanly and resets to each area's first sub-tab; all nine views work with their controls; light/dark (charts recolour); print (all views legible); every number traces to a spec figure; methodology + gross-time caveats visible; cycle times labelled approximate; commentary follows the opt-in rule and the cards read as inRange/Aleks. Fix gaps inline.

- [ ] **Step 5: Commit**

```bash
git add map/index.html map/README.md
git commit -m "docs(map): area-aware footer + update guide; finalize explorer"
```

---

## Self-Review notes (author)

- **Spec coverage — Area 1 (MAP & APA):** five views (Tasks 6–10), KPIs + two-area switch (Task 5), methodology caveat + sources (Tasks 11/16), chart-only data resolved into `MAP_DATA` (Task 3), TP method gap → explainer (Task 10).
- **Spec coverage — Area 2 (International Rulings):** `RULINGS_DATA` + reconciliation (Task 12), Overview + KPIs (Task 13), By type & flow + 2023–2025 trend (Task 14), Processing times + Defining-positions cards (Task 15), area-aware footer + README (Task 16). Stats-led with the curated insights strip as support — matches the chosen emphasis.
- **Out of scope honoured:** no TP-method *data* in MAP; no OECD peer benchmarking; no full ruling-summary archive (curated cards only); no CMS feed.
- **Type consistency:** MAP stream keys `INT/TP/MLMAP/TB/BAPA/MAPA` and ruling type keys `ATR/APA/BAPA/Innovatiebox/Overige` are used identically across data, tests, and views; sub-tab ids are globally unique (`caseload…tp`, `rOverview…rPositions`) so one `renderView()` switch covers both areas; helper names (`yoy`, `niceMax`, `outcomeGroups`, `resolutionRate`, `rulingMix`) match between `core.js`, tests, and views.
- **Known soft spots to watch during execution:** (1) `resolutionRate` is hardcoded to the published headline by design; (2) MAP cycle-time values are chart-read approximations — keep the visible "approximate" label; (3) Task 14 refactors the Task 7 waterfall into a shared `buildWaterfall()` — re-verify the MAP inventory view after; (4) `RULINGS_DATA.positions` is editorial copy in Aleks's voice — not chart data, and the only place prominent opinion lives; (5) the optional Wet fiscale arbitrage multi-year series remains out of v1.
