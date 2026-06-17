// map/tests/core.test.js — unit tests for core.js using Node's built-in runner
// Run from repo root: node --test map/tests/
const { test } = require('node:test');
const assert = require('node:assert');
const C = require('../core.js');

// ---------------------------------------------------------------------------
// Task 1: Data module skeleton + reconciliation
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Task 2: Full multi-year caseload + inventory data
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Task 3: Outcomes (2024), cycle times, treaty partners
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Task 4: Pure compute + format helpers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Task 12: RULINGS_DATA module + reconciliation tests
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Task 13 Step 2: rulingMix helper
// ---------------------------------------------------------------------------

test('rulingMix(2025, "received") sums to 528 and ATR is the largest share', () => {
  const rows = C.rulingMix(2025, 'received');
  const total = rows.reduce((a, r) => a + r.value, 0);
  assert.strictEqual(total, 528);
  // ATR received 231 — largest single type in 2025
  const atr = rows.find(r => r.type === 'ATR');
  const maxVal = Math.max(...rows.map(r => r.value));
  assert.strictEqual(atr.value, maxVal);
});
