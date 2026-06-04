// 4june/dashboard/render.js
import { aggregateBy, donutSegments, topN, hashHue } from "./viz.js";
import { getIndustry } from "./industries.js";
import { ATTENDEES } from "../attendees.js";

// People who selected this many tax areas or more are "tax generalists" —
// collapsed under a single "General Tax" label rather than counted in
// every individual area. Raw taxAreas in responses.json stay untouched.
const GENERAL_TAX_THRESHOLD = 3;
const GENERAL_TAX_LABEL = "General Tax";
function effectiveTaxAreas(r) {
  const areas = (r && r.taxAreas) || [];
  if (areas.length >= GENERAL_TAX_THRESHOLD) return [GENERAL_TAX_LABEL];
  return areas;
}

// Role lookup — dashboard never shows names, only roles. Falls back to
// "Tax professional" for any id we don't have in the curated list (walk-ins).
const ROLE_BY_ID = Object.fromEntries(ATTENDEES.map(a => [a.id, a.role || "Tax professional"]));
function roleFor(id) { return ROLE_BY_ID[id] || "Tax professional"; }

const PALETTE = [
  "#1FA84A", // brand green
  "#6FA3C0", // sky
  "#C98A2B", // ochre
  "#5B3A63", // plum
  "#3FBB65", // green 400
  "#4F6B8A", // navy 400
  "#B25838", // terra
  "#6B8F3D", // moss
  "#9FDFB1", // green 200
  "#ADBCCE", // navy 200
  "#F1E6D2", // sand
  "#818B98", // neutral-500
];

const tooltipEl = document.getElementById("tooltip");
function showTooltip(html, x, y) {
  tooltipEl.innerHTML = html;
  tooltipEl.hidden = false;
  const offset = 12;
  const rect = tooltipEl.getBoundingClientRect();
  const xx = Math.min(x + offset, window.innerWidth - rect.width - 8);
  const yy = Math.min(y + offset, window.innerHeight - rect.height - 8);
  tooltipEl.style.left = `${xx}px`;
  tooltipEl.style.top = `${yy}px`;
}
function hideTooltip() { tooltipEl.hidden = true; }
window.addEventListener("scroll", hideTooltip, { passive: true });
window.addEventListener("resize", hideTooltip);

// ---------- Donut renderer ----------
function renderDonut(container, segments, namesByLabel) {
  const size = 180, radius = 70, thick = 22;
  const cx = size / 2, cy = size / 2;
  let acc = 0;
  const arcs = segments.map((seg, i) => {
    const color = PALETTE[i % PALETTE.length];
    // Edge case: a single segment at 100% (or near-100%) renders an arc
    // whose start and end coordinates are the same — SVG draws nothing.
    // Fall back to a full <circle>.
    if (seg.frac >= 0.9999) {
      return `<circle class="donut-slice" cx="${cx}" cy="${cy}" r="${radius}"
                       fill="none" stroke="${color}" stroke-width="${thick}"
                       data-label="${seg.label}" data-count="${seg.count}"></circle>`;
    }
    const a0 = acc * 2 * Math.PI - Math.PI / 2;
    const a1 = (acc + seg.frac) * 2 * Math.PI - Math.PI / 2;
    acc += seg.frac;
    const large = seg.frac > 0.5 ? 1 : 0;
    const x0 = cx + radius * Math.cos(a0), y0 = cy + radius * Math.sin(a0);
    const x1 = cx + radius * Math.cos(a1), y1 = cy + radius * Math.sin(a1);
    return `<path class="donut-slice" d="M ${x0} ${y0} A ${radius} ${radius} 0 ${large} 1 ${x1} ${y1}"
                   fill="none" stroke="${color}" stroke-width="${thick}"
                   data-label="${seg.label}" data-count="${seg.count}"></path>`;
  }).join("");
  const legend = segments.map((seg, i) => `
    <div class="legend-row">
      <span><span class="legend-swatch" style="background:${PALETTE[i % PALETTE.length]}"></span><span class="legend-label">${seg.label}</span></span>
      <span class="legend-count">${seg.count}</span>
    </div>`).join("");
  container.innerHTML = `
    <div class="donut-wrap">
      <svg viewBox="0 0 ${size} ${size}" style="width:140px;height:140px;flex:0 0 auto">${arcs}</svg>
      <div class="legend">${legend}</div>
    </div>`;
  container.querySelectorAll(".donut-slice").forEach(p => {
    p.addEventListener("mousemove", (e) => {
      const label = p.dataset.label;
      const count = p.dataset.count;
      const names = (namesByLabel?.[label] || []).slice(0, 12).join(", ");
      showTooltip(`<div class="t-title">${label} · ${count}</div>${names}`, e.clientX, e.clientY);
    });
    p.addEventListener("mouseleave", hideTooltip);
  });
}

// ---------- Paired-bar renderer ----------
function renderPairedBars(container, rows, namesByLabel) {
  const max = Math.max(1, ...rows.map(r => Math.max(r.work, r.home)));
  container.innerHTML = rows.map(r => `
    <div class="bars-row" data-label="${r.label}">
      <span>${r.label}</span>
      <div class="bar-track">
        <div class="bar-work" style="width:${(r.work / max) * 100}%"></div>
        <div class="bar-home" style="width:${(r.home / max) * 100}%"></div>
      </div>
      <span style="text-align:right;color:var(--fg-3)">${r.work} / ${r.home}</span>
    </div>
  `).join("") + `
    <div style="display:flex;gap:14px;margin-top:10px;font-size:12px;color:var(--fg-3)">
      <span><span class="legend-swatch" style="background:var(--brand-green-500)"></span>Work</span>
      <span><span class="legend-swatch" style="background:var(--accent-sky)"></span>Home</span>
    </div>`;
  container.querySelectorAll(".bars-row").forEach(row => {
    row.addEventListener("mousemove", (e) => {
      const label = row.dataset.label;
      const r = rows.find(x => x.label === label);
      const delta = r.work - r.home;
      const sign = delta > 0 ? `+${delta} work-only` : delta < 0 ? `+${-delta} home-only` : "balanced";
      showTooltip(`<b>${label}</b><br>${r.work} at work · ${r.home} at home · ${sign}`, e.clientX, e.clientY);
    });
    row.addEventListener("mouseleave", hideTooltip);
  });
}

// ---------- Companies chip cloud ----------
function renderCompanies(container, counts, namesByCompany) {
  container.innerHTML = `<div class="chip-cloud">` +
    Object.entries(counts).sort((a,b) => a[0].localeCompare(b[0])).map(([co]) => {
      return `<span class="cloud-chip" data-company="${co}">${co}</span>`;
    }).join("") + `</div>`;
  container.querySelectorAll(".cloud-chip").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const co = el.dataset.company;
      const list = namesByCompany[co] || [];
      showTooltip(`<div class="t-title">${co} · ${list.length}</div>${list.join(", ")}`, e.clientX, e.clientY);
    });
    el.addEventListener("mouseleave", hideTooltip);
  });
}

// ---------- Clustered themes ----------
function renderThemes(container, items) {
  container.innerHTML = `<div class="themes">` + items.map((t, i) => `
    <div class="theme" data-i="${i}">
      <span class="theme-label">${t.theme}</span>
      <span class="theme-count">${t.count}</span>
    </div>
  `).join("") + `</div>`;
  container.querySelectorAll(".theme").forEach(row => {
    const t = items[parseInt(row.dataset.i, 10)];
    row.addEventListener("mousemove", (e) => {
      const quotes = (t.quotes || []).map(q => `<li>${q}</li>`).join("");
      showTooltip(
        `<div class="t-title">${t.theme} · ${t.count}</div>${quotes ? `<ul>${quotes}</ul>` : ""}`,
        e.clientX, e.clientY
      );
    });
    row.addEventListener("mouseleave", hideTooltip);
    // Touch fallback for post-event phone visitors
    row.addEventListener("click", (e) => {
      const quotes = (t.quotes || []).map(q => `<li>${q}</li>`).join("");
      showTooltip(
        `<div class="t-title">${t.theme} · ${t.count}</div>${quotes ? `<ul>${quotes}</ul>` : ""}`,
        e.clientX, e.clientY
      );
    });
  });
}

// ---------- Horizontal bars (single-colour, for wins / frustrations) ----------
function renderHBars(container, rows, kind, namesByLabel) {
  const max = Math.max(1, ...rows.map(r => r.count));
  container.innerHTML = `<div class="hbars">` + rows.map(r => `
    <div class="hbars-row" data-label="${r.label}">
      <div class="hbars-head">
        <span class="hbars-text">${r.label}</span>
        <span class="hbars-count">${r.count}</span>
      </div>
      <div class="hbars-track"><div class="hbars-fill ${kind}" style="width:${(r.count / max) * 100}%"></div></div>
    </div>`).join("") + `</div>`;
  container.querySelectorAll(".hbars-row").forEach(row => {
    const label = row.dataset.label;
    const names = (namesByLabel?.[label] || []).slice(0, 20).join(", ");
    row.addEventListener("mousemove", (e) => {
      showTooltip(`<div class="t-title">${label}</div>${names}`, e.clientX, e.clientY);
    });
    row.addEventListener("mouseleave", hideTooltip);
  });
}

// ---------- Median helper ----------
function median(values) {
  const v = values.filter(Number.isFinite).slice().sort((a, b) => a - b);
  if (v.length === 0) return null;
  const n = v.length;
  return n % 2 ? v[(n - 1) / 2] : (v[n / 2 - 1] + v[n / 2]) / 2;
}

// ---------- Scatter plot (one point per person + median lines) ----------
function renderScatter(container, data, xKey, yKey, xLabel, yLabel) {
  const points = data
    .filter(d => Number.isFinite(d[xKey]) && Number.isFinite(d[yKey]))
    .map(d => ({ x: d[xKey], y: d[yKey], role: roleFor(d.id), id: d.id }));

  if (points.length === 0) {
    container.innerHTML = `<div class="empty-chart">Waiting for check-in data…</div>`;
    return;
  }

  const W = 420, H = 320, PAD_L = 32, PAD_R = 12, PAD_T = 14, PAD_B = 28;
  const innerW = W - PAD_L - PAD_R, innerH = H - PAD_T - PAD_B;
  const xPx = v => PAD_L + (v / 10) * innerW;
  const yPx = v => H - PAD_B - (v / 10) * innerH;  // 0 at bottom

  const xMed = median(points.map(p => p.x));
  const yMed = median(points.map(p => p.y));

  // Grid + tick labels at 0, 5, 10
  const ticks = [0, 5, 10];
  const grid = ticks.map(t => `
    <line x1="${xPx(t)}" y1="${PAD_T}" x2="${xPx(t)}" y2="${H - PAD_B}" />
    <line x1="${PAD_L}" y1="${yPx(t)}" x2="${W - PAD_R}" y2="${yPx(t)}" />
  `).join("");
  const xTickLabels = ticks.map(t =>
    `<text class="scatter-tick" x="${xPx(t)}" y="${H - PAD_B + 14}" text-anchor="middle">${t}</text>`
  ).join("");
  const yTickLabels = ticks.map(t =>
    `<text class="scatter-tick" x="${PAD_L - 6}" y="${yPx(t) + 3}" text-anchor="end">${t}</text>`
  ).join("");

  // Median dashed lines
  const medLines = `
    <line class="scatter-median" x1="${xPx(xMed)}" y1="${PAD_T}" x2="${xPx(xMed)}" y2="${H - PAD_B}" />
    <line class="scatter-median" x1="${PAD_L}" y1="${yPx(yMed)}" x2="${W - PAD_R}" y2="${yPx(yMed)}" />
  `;

  // Dots — jitter slightly when multiple people share the same coords so they
  // don't overlap exactly. Deterministic jitter from index.
  const seenAt = new Map();
  const dots = points.map((p, i) => {
    const key = `${p.x},${p.y}`;
    const k = seenAt.get(key) || 0;
    seenAt.set(key, k + 1);
    const dx = k === 0 ? 0 : (((k * 137) % 9) - 4);
    const dy = k === 0 ? 0 : (((k * 211) % 9) - 4);
    return `<circle class="scatter-dot" cx="${xPx(p.x) + dx}" cy="${yPx(p.y) + dy}" r="6"
                    data-role="${p.role}" data-x="${p.x}" data-y="${p.y}"></circle>`;
  }).join("");

  // Axis labels
  const labels = `
    <text class="scatter-axis" x="${W - PAD_R}" y="${H - 4}" text-anchor="end">${xLabel} →</text>
    <text class="scatter-axis" x="${PAD_L}" y="${PAD_T - 4}" text-anchor="start">↑ ${yLabel}</text>
  `;

  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" class="scatter-svg">
      <g class="scatter-grid">${grid}</g>
      ${medLines}
      ${xTickLabels}
      ${yTickLabels}
      ${dots}
      ${labels}
    </svg>
    <div class="chart-meta">N = ${points.length} · median: ${xLabel.toLowerCase()} ${xMed.toFixed(1)}, ${yLabel.toLowerCase()} ${yMed.toFixed(1)}</div>
  `;

  container.querySelectorAll(".scatter-dot").forEach(dot => {
    dot.addEventListener("mousemove", (e) => {
      showTooltip(
        `<div class="t-title">${dot.dataset.role}</div>` +
        `${xLabel}: ${dot.dataset.x}<br>${yLabel}: ${dot.dataset.y}`,
        e.clientX, e.clientY
      );
    });
    dot.addEventListener("mouseleave", hideTooltip);
  });
}

// ---------- Ranked total (horizontal lollipop, one row per person) ----------
function renderRankedTotal(container, data) {
  const enriched = data
    .map(d => {
      const a = Number.isFinite(d.selfAdoption)    ? d.selfAdoption    : null;
      const p = Number.isFinite(d.selfApplication) ? d.selfApplication : null;
      const c = Number.isFinite(d.selfCraft)       ? d.selfCraft       : null;
      const t = Number.isFinite(d.selfTrust)       ? d.selfTrust       : null;
      if (a == null || p == null || c == null || t == null) return null;
      return { id: d.id, role: roleFor(d.id), a, p, c, t, total: a + p + c + t };
    })
    .filter(Boolean);

  if (enriched.length === 0) {
    container.innerHTML = `<div class="empty-chart">Waiting for check-in data…</div>`;
    return;
  }

  const ranked = enriched.slice().sort((x, y) => y.total - x.total);
  const med = median(ranked.map(r => r.total));
  const MAX = 40;

  const rows = ranked.map((r, i) => `
    <div class="ranked-row" data-role="${r.role}" data-total="${r.total}"
         data-a="${r.a}" data-p="${r.p}" data-c="${r.c}" data-t="${r.t}">
      <span class="ranked-rank">${i + 1}</span>
      <div class="ranked-bar-track">
        <div class="ranked-bar-fill" style="width: ${(r.total / MAX) * 100}%"></div>
        <div class="ranked-bar-dot" style="left: calc(${(r.total / MAX) * 100}% - 7px)"></div>
      </div>
      <span class="ranked-total">${r.total} <span class="of">/ ${MAX}</span></span>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="ranked-list">${rows}</div>
    <div class="chart-meta">N = ${ranked.length} · median ${med.toFixed(1)} / ${MAX}</div>
  `;

  container.querySelectorAll(".ranked-row").forEach(row => {
    row.addEventListener("mousemove", (e) => {
      showTooltip(
        `<div class="t-title">${row.dataset.role}</div>` +
        `Total: <b>${row.dataset.total} / ${MAX}</b><br>` +
        `Adoption ${row.dataset.a} · Application ${row.dataset.p}<br>` +
        `Craft ${row.dataset.c} · Trust ${row.dataset.t}`,
        e.clientX, e.clientY
      );
    });
    row.addEventListener("mouseleave", hideTooltip);
  });
}

// ---------- Grouped averages (experience bucket / tax area) ----------
function totalScore(r) {
  const v = r.selfAdoption + r.selfApplication + r.selfCraft + r.selfTrust;
  return Number.isFinite(v) ? v : null;
}

function aggregateByYears(responses) {
  // Keep the ordinal sequence so the chart reads bottom-of-career → top-of-career
  const order = ["0–5", "5–15", "15+"];
  return order.map(label => {
    const totals = responses
      .filter(r => r.yearsInTax === label)
      .map(totalScore)
      .filter(v => v != null);
    if (totals.length === 0) return null;
    return {
      label: label + " years",
      count: totals.length,
      average: totals.reduce((a, b) => a + b, 0) / totals.length
    };
  }).filter(Boolean);
}

function aggregateByTaxArea(responses) {
  const buckets = new Map();
  for (const r of responses) {
    const tot = totalScore(r);
    if (tot == null) continue;
    for (const area of effectiveTaxAreas(r)) {  // collapse multi-area → "General Tax"
      if (!area) continue;
      if (!buckets.has(area)) buckets.set(area, []);
      buckets.get(area).push(tot);
    }
  }
  return [...buckets.entries()]
    .map(([label, totals]) => ({
      label,
      count: totals.length,
      average: totals.reduce((a, b) => a + b, 0) / totals.length
    }))
    .sort((a, b) => b.average - a.average); // descending by average
}

function renderGroupedAverages(container, items) {
  if (!items || items.length === 0) {
    container.innerHTML = `<div class="empty-chart">Waiting for check-in data…</div>`;
    return;
  }
  const MAX = 40;
  container.innerHTML = `
    <div class="grouped-list">
      ${items.map(it => `
        <div class="grouped-row" data-label="${it.label}" data-count="${it.count}" data-avg="${it.average.toFixed(1)}">
          <span class="grouped-label">${it.label}</span>
          <span class="grouped-n">N = ${it.count}</span>
          <div class="grouped-bar-track"><div class="grouped-bar-fill" style="width:${(it.average / MAX) * 100}%"></div></div>
          <span class="grouped-avg">${it.average.toFixed(1)} <span class="of">/ ${MAX}</span></span>
        </div>
      `).join("")}
    </div>
    <div class="chart-meta">Average of (Adoption + Application + Craft + Trust), 0–40 scale</div>
  `;

  container.querySelectorAll(".grouped-row").forEach(row => {
    row.addEventListener("mousemove", (e) => {
      showTooltip(
        `<div class="t-title">${row.dataset.label}</div>` +
        `${row.dataset.count} ${row.dataset.count === "1" ? "person" : "people"} · ` +
        `average total ${row.dataset.avg} / ${MAX}`,
        e.clientX, e.clientY
      );
    });
    row.addEventListener("mouseleave", hideTooltip);
  });
}

// ---------- Where we stand (room self-assessment averages) ----------
function renderWhereWeStand(container, responses) {
  const axes = [
    { key: "selfAdoption",   label: "Adoption" },
    { key: "selfApplication", label: "Application" },
    { key: "selfCraft",       label: "Craft" },
    { key: "selfTrust",       label: "Trust" },
  ];
  const cells = axes.map(a => {
    const vals = responses.map(r => r[a.key]).filter(v => Number.isFinite(v));
    if (vals.length === 0) {
      return `<div class="where-cell">
        <span class="where-name">${a.label}</span>
        <span class="where-value">—</span>
        <div class="where-bar"></div>
      </div>`;
    }
    const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
    const pct = (avg / 10) * 100;
    return `<div class="where-cell">
      <span class="where-name">${a.label}</span>
      <span class="where-value">${avg.toFixed(1)}<span class="out-of">/10</span></span>
      <div class="where-bar"><div class="where-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join("");
  container.innerHTML = `<div class="where-strip">${cells}</div>`;
}

// ---------- Main entry ----------
async function main() {
  const [responses, clusters] = await Promise.all([
    fetch("./responses.json").then(r => r.json()),
    fetch("./clusters.json").then(r => r.json()).catch(() => ({ wishes: [], expectations: [], generatedAt: "" }))
  ]);

  const total = responses.length;
  const firstTimers = responses.filter(r => r.previousEvents === "First time").length;
  const returnees = responses.filter(r => ["3–5", "5+"].includes(r.previousEvents)).length;
  const ts = (clusters.generatedAt || new Date().toISOString()).slice(11, 16);

  document.getElementById("status").innerHTML =
    `${total} <span class="dim">of 35 checked in</span> · ${firstTimers} <span class="dim">first-timers</span> · ${returnees} <span class="dim">regulars</span>`;

  // Tax areas — multi-area attendees (≥ GENERAL_TAX_THRESHOLD) collapse into "General Tax"
  const taxCounts = aggregateBy(responses, effectiveTaxAreas);
  const taxSegs = donutSegments(taxCounts).sort((a,b) => b.count - a.count);
  const namesByTax = {};
  for (const r of responses) for (const t of effectiveTaxAreas(r)) (namesByTax[t] ||= []).push(roleFor(r.id));
  renderDonut(document.querySelector("#p-tax .panel-body"), taxSegs, namesByTax);

  // Tools
  const work = aggregateBy(responses, r => r.aiToolsWork);
  const home = aggregateBy(responses, r => r.aiToolsHome);
  const labels = [...new Set([...Object.keys(work), ...Object.keys(home)])];
  const rows = labels.map(l => ({ label: l, work: work[l] || 0, home: home[l] || 0 }))
    .sort((a,b) => (b.work + b.home) - (a.work + a.home)).slice(0, 10);
  renderPairedBars(document.querySelector("#p-tools .panel-body"), rows, {});

  // Companies
  const companies = aggregateBy(responses, r => [r.company]);
  const namesByCo = {};
  for (const r of responses) (namesByCo[r.company] ||= []).push(roleFor(r.id));
  renderCompanies(document.querySelector("#p-companies .panel-body"), companies, namesByCo);

  // Wishes + Expectations
  renderThemes(document.querySelector("#p-wishes .panel-body"), clusters.wishes || []);
  renderThemes(document.querySelector("#p-exp .panel-body"), clusters.expectations || []);

  // Industries
  const industryCounts = aggregateBy(responses, r => [getIndustry(r.company)]);
  const industrySegs = donutSegments(industryCounts).sort((a,b) => b.count - a.count);
  const namesByIndustry = {};
  for (const r of responses) (namesByIndustry[getIndustry(r.company)] ||= []).push(roleFor(r.id));
  renderDonut(document.querySelector("#p-industries .panel-body"), industrySegs, namesByIndustry);

  // Biggest wins
  const winCounts = aggregateBy(responses, r => r.biggestWins);
  const winRows = Object.entries(winCounts)
    .sort((a,b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }));
  const namesByWin = {};
  for (const r of responses) for (const w of (r.biggestWins || [])) (namesByWin[w] ||= []).push(roleFor(r.id));
  renderHBars(document.querySelector("#p-wins .panel-body"), winRows, "win", namesByWin);

  // Biggest frustrations
  const frustCounts = aggregateBy(responses, r => r.biggestFrustrations);
  const frustRows = Object.entries(frustCounts)
    .sort((a,b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }));
  const namesByFrust = {};
  for (const r of responses) for (const f of (r.biggestFrustrations || [])) (namesByFrust[f] ||= []).push(roleFor(r.id));
  renderHBars(document.querySelector("#p-frust .panel-body"), frustRows, "frust", namesByFrust);

  // Where we stand (room self-assessment averages)
  renderWhereWeStand(document.querySelector("#p-where .panel-body"), responses);

  // Detailed metrics — collapsible section at the bottom of Overview
  renderScatter(document.getElementById("scatter-aa"), responses, "selfAdoption",    "selfApplication", "Adoption", "Application");
  renderScatter(document.getElementById("scatter-ct"), responses, "selfCraft",       "selfTrust",       "Craft",    "Trust");
  renderRankedTotal(document.getElementById("ranked-total"), responses);
  renderGroupedAverages(document.getElementById("avg-by-years"), aggregateByYears(responses));
  renderGroupedAverages(document.getElementById("avg-by-area"),  aggregateByTaxArea(responses));
}
main();

// ════════════════════════════════════════════════════════════════════════════
// LIVE NOTES VIEW — sticker cards driven by ./live-notes.json
// ════════════════════════════════════════════════════════════════════════════

const STICKER_COLORS = 5;        // matches .color-0 .. .color-4 in CSS
const ROTATION_RANGE = 3;        // ±degrees
const POLL_INTERVAL_MS = 5000;
const LIVE_NOTES_URL = "./live-notes.json";
const HIDDEN_KEY = "dashboard.hiddenStickers"; // localStorage key — Set of texts hidden via the × button

// Per-projector hide list — clicking × on a sticker adds its text here. The doc and
// the JSON file are untouched (other viewers still see the sticker). Persisted in
// localStorage so a tab refresh keeps the hide. Restore via the panel's "↺ Restore N hidden" button.
function getHidden() {
  try { return new Set(JSON.parse(localStorage.getItem(HIDDEN_KEY) || "[]")); }
  catch { return new Set(); }
}
function setHidden(set) {
  try { localStorage.setItem(HIDDEN_KEY, JSON.stringify([...set])); } catch {}
}
function hideText(text) { const h = getHidden(); h.add(text); setHidden(h); }
function unhideAll()    { setHidden(new Set()); }

// Deterministic hash so a card's color + rotation stay stable across renders.
function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return h;
}

function rotationFor(text) {
  // map hash → [-ROTATION_RANGE .. +ROTATION_RANGE], avoiding 0 for liveliness
  const h = hashCode(text);
  const r = ((Math.abs(h) % (ROTATION_RANGE * 200 + 1)) / 100) - ROTATION_RANGE;
  return r.toFixed(2);
}

function colorFor(text) {
  return Math.abs(hashCode(text)) % STICKER_COLORS;
}

/**
 * Diff-render a list of items into a sticker container.
 * Items can be:
 *   - a string (legacy shape): "the use case"
 *   - an object: { text: "...", attribution: "Aleks" }
 * If attribution is non-empty, hovering the sticker shows "Shared by <name>".
 *
 * - Existing cards whose text matches stay in place (no re-animation)
 * - New texts get added with the stickerIn animation
 * - Removed texts get the .leaving class then are removed after 260ms
 * - Preserves rotation/color for unchanged cards
 * - Attribution updates in place without re-animating
 */
function renderStickers(container, items, restoreBtn) {
  const hidden = getHidden();
  // Normalise to {text, attribution} and dedupe by text, preserving first-seen order
  const seen = new Set();
  const incomingAll = [];     // everything we'd show
  const incoming = [];        // filtered: not hidden
  let hiddenCount = 0;
  for (const raw of items) {
    let text, attribution;
    if (typeof raw === "string") { text = raw; attribution = ""; }
    else if (raw && typeof raw.text === "string") { text = raw.text; attribution = (raw.attribution || "").toString(); }
    else continue;
    text = text.trim();
    if (!text || seen.has(text)) continue;
    seen.add(text);
    const entry = { text, attribution: attribution.trim() };
    incomingAll.push(entry);
    if (hidden.has(text)) { hiddenCount++; continue; }
    incoming.push(entry);
  }
  const incomingTexts = new Set(incoming.map(it => it.text));

  const have = new Map();
  for (const el of container.querySelectorAll(".sticker:not(.leaving)")) {
    have.set(el.dataset.text, el);
  }

  // Remove cards no longer present (either gone from data OR newly hidden)
  for (const [text, el] of have) {
    if (!incomingTexts.has(text)) {
      el.classList.add("leaving");
      setTimeout(() => el.remove(), 280);
    }
  }

  // Append new cards / update attribution on existing ones
  for (const it of incoming) {
    let el = have.get(it.text);
    if (el) {
      if (el.dataset.attribution !== it.attribution) {
        el.dataset.attribution = it.attribution;
        el.classList.toggle("has-attribution", !!it.attribution);
      }
      continue;
    }
    el = document.createElement("div");
    el.className = `sticker color-${colorFor(it.text)}${it.attribution ? " has-attribution" : ""}`;
    el.style.setProperty("--rot", `${rotationFor(it.text)}deg`);
    el.dataset.text = it.text;
    el.dataset.attribution = it.attribution;
    // Body text + × button
    const body = document.createElement("span");
    body.textContent = it.text;
    el.appendChild(body);
    const xBtn = document.createElement("button");
    xBtn.type = "button";
    xBtn.className = "sticker-x";
    xBtn.setAttribute("aria-label", "Hide this sticker");
    xBtn.title = "Hide this sticker (this device only)";
    xBtn.textContent = "×";
    xBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      hideText(it.text);
      hideTooltip();
      el.classList.add("leaving");
      setTimeout(() => el.remove(), 280);
      updateRestoreButton(container, restoreBtn);
    });
    el.appendChild(xBtn);

    // Hover/touch tooltip — shows "Shared by <name>". No-op if no attribution.
    el.addEventListener("mousemove", (e) => {
      const attr = el.dataset.attribution;
      if (!attr) return;
      showTooltip(`<div class="t-title">Shared by ${attr}</div>`, e.clientX, e.clientY);
    });
    el.addEventListener("mouseleave", hideTooltip);
    el.addEventListener("click", (e) => {
      if (e.target.classList.contains("sticker-x")) return;
      const attr = el.dataset.attribution;
      if (!attr) return;
      showTooltip(`<div class="t-title">Shared by ${attr}</div>`, e.clientX, e.clientY);
    });

    container.appendChild(el);
  }

  // Sync the restore button
  if (restoreBtn) {
    if (hiddenCount > 0) {
      restoreBtn.hidden = false;
      restoreBtn.textContent = `↺ Restore ${hiddenCount} hidden`;
      restoreBtn.dataset.hiddenCount = String(hiddenCount);
    } else {
      restoreBtn.hidden = true;
    }
  }

  // Density mode — shrink stickers when there are many, so they all stay visible
  // without forcing a scroll. Thresholds tuned for a 1920×1080 projector.
  container.classList.toggle("dense", incoming.length >= 12 && incoming.length < 22);
  container.classList.toggle("very-dense", incoming.length >= 22);

  return incoming.length;
}

function updateRestoreButton(container, btn) {
  // Called when a sticker is X-ed out mid-poll. Recount from the current data state.
  if (!btn) return;
  const stored = parseInt(btn.dataset.hiddenCount || "0", 10);
  btn.dataset.hiddenCount = String(stored + 1);
  btn.textContent = `↺ Restore ${stored + 1} hidden`;
  btn.hidden = false;
}

function setEmptyState(emptyEl, count) {
  if (!emptyEl) return;
  emptyEl.hidden = count > 0;
}

let lastPollAt = null;
let lastGeneratedAt = null;
let lastUseCaseCount = 0;
let lastFrustrationCount = 0;
let lastObservationCount = 0;

async function pollLiveNotes() {
  try {
    const res = await fetch(`${LIVE_NOTES_URL}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const useCases = Array.isArray(data.useCases) ? data.useCases : [];
    const frustrations = Array.isArray(data.frustrations) ? data.frustrations : [];
    const observations = Array.isArray(data.observations) ? data.observations : [];

    lastUseCaseCount = renderStickers(
      document.getElementById("g-usecases"),
      useCases,
      document.getElementById("restore-usecases")
    );
    lastFrustrationCount = renderStickers(
      document.getElementById("g-frustrations"),
      frustrations,
      document.getElementById("restore-frustrations")
    );
    lastObservationCount = renderStickers(
      document.getElementById("g-observations"),
      observations,
      document.getElementById("restore-observations")
    );
    setEmptyState(document.getElementById("empty-usecases"), lastUseCaseCount);
    setEmptyState(document.getElementById("empty-frustrations"), lastFrustrationCount);
    setEmptyState(document.getElementById("empty-observations"), lastObservationCount);

    lastPollAt = Date.now();
    lastGeneratedAt = data.generatedAt || null;
    updateLiveStatus();
  } catch (err) {
    console.error("[live-notes] poll failed:", err);
  }
}

function fmtTime(iso) {
  if (!iso) return null;
  // Parse ISO and format as local HH:MM. Falls back to raw substring if Date can't parse.
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.slice(11, 16) || null;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function updateLiveStatus() {
  const el = document.getElementById("live-status-text");
  if (!el) return;
  const parts = [];
  const updatedAt = fmtTime(lastGeneratedAt);
  if (updatedAt) {
    parts.push(`updated at ${updatedAt}`);
  } else if (!lastPollAt) {
    parts.push("connecting…");
  }
  parts.push(`${lastUseCaseCount} use case${lastUseCaseCount === 1 ? "" : "s"}`);
  parts.push(`${lastFrustrationCount} frustration${lastFrustrationCount === 1 ? "" : "s"}`);
  parts.push(`${lastObservationCount} observation${lastObservationCount === 1 ? "" : "s"}`);
  el.textContent = parts.join("  ·  ");
}

// Wire the restore buttons (clears hidden stickers and re-renders on next poll)
for (const id of ["restore-usecases", "restore-frustrations", "restore-observations"]) {
  const btn = document.getElementById(id);
  if (!btn) continue;
  btn.addEventListener("click", () => {
    unhideAll();
    btn.hidden = true;
    btn.dataset.hiddenCount = "0";
    pollLiveNotes(); // immediate re-render to bring hidden cards back
  });
}

// Poll on a steady cadence regardless of view — when the user toggles,
// the cards are already in the DOM and ready.
pollLiveNotes();
setInterval(pollLiveNotes, POLL_INTERVAL_MS);
setInterval(updateLiveStatus, 1000); // tick the "Xs ago" counter every second

// ════════════════════════════════════════════════════════════════════════════
// KEY TOPICS VIEW — clustered themes from live-themes.json
// ════════════════════════════════════════════════════════════════════════════

const LIVE_THEMES_URL = "./live-themes.json";
const TOPICS_POLL_INTERVAL_MS = 15000; // refresh slower than live-notes; this is curated

let lastTopicsGeneratedAt = null;

function renderTopicCards(container, topics) {
  if (!container) return 0;
  container.innerHTML = (topics || []).map((t, i) => `
    <div class="topic-card" data-i="${i}" data-title="${t.title.replace(/"/g, "&quot;")}">
      <div class="topic-head">
        <span class="topic-title">${t.title}</span>
        <span class="topic-count">${(t.examples || []).length}</span>
      </div>
      <p class="topic-summary">${t.summary || ""}</p>
    </div>
  `).join("");
  // Hover/click → show examples in the shared tooltip
  container.querySelectorAll(".topic-card").forEach(card => {
    const t = topics[parseInt(card.dataset.i, 10)];
    const showExamples = (e) => {
      const examples = (t.examples || []).map(q => `<li>${q}</li>`).join("");
      showTooltip(
        `<div class="t-title">${t.title} · ${(t.examples || []).length}</div>` +
        `${t.summary ? `<div style="margin:4px 0 2px">${t.summary}</div>` : ""}` +
        `${examples ? `<ul>${examples}</ul>` : ""}`,
        e.clientX, e.clientY
      );
    };
    card.addEventListener("mousemove", showExamples);
    card.addEventListener("mouseleave", hideTooltip);
    card.addEventListener("click", showExamples); // touch fallback
  });
  return (topics || []).length;
}

async function pollKeyTopics() {
  try {
    const res = await fetch(`${LIVE_THEMES_URL}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const wins     = Array.isArray(data.wins)     ? data.wins     : [];
    const risks    = Array.isArray(data.risks)    ? data.risks    : [];
    const insights = Array.isArray(data.insights) ? data.insights : [];
    renderTopicCards(document.getElementById("t-wins"),     wins);
    renderTopicCards(document.getElementById("t-risks"),    risks);
    renderTopicCards(document.getElementById("t-insights"), insights);
    lastTopicsGeneratedAt = data.generatedAt || null;
    const total = wins.length + risks.length + insights.length;
    const el = document.getElementById("topics-status-text");
    if (el) {
      const updatedAt = fmtTime(lastTopicsGeneratedAt);
      const head = updatedAt ? `updated at ${updatedAt}` : "loaded";
      el.textContent = `${head}  ·  ${wins.length} wins  ·  ${risks.length} risks  ·  ${insights.length} takeaways  ·  ${total} themes`;
    }
  } catch (err) {
    console.error("[key-topics] poll failed:", err);
    const el = document.getElementById("topics-status-text");
    if (el) el.textContent = "could not load live-themes.json";
  }
}
pollKeyTopics();
setInterval(pollKeyTopics, TOPICS_POLL_INTERVAL_MS);

// ════════════════════════════════════════════════════════════════════════════
// VIEW TOGGLE — Welcome ↔ Overview ↔ Live notes ↔ Key topics, persisted
// ════════════════════════════════════════════════════════════════════════════

const VIEW_KEY = "dashboard.view";
const VALID_VIEWS = new Set(["overview", "live", "topics"]);

function setView(view) {
  if (!VALID_VIEWS.has(view)) view = "overview";
  document.querySelector(".root").dataset.view = view;
  for (const btn of document.querySelectorAll(".view-toggle button")) {
    const isActive = btn.dataset.view === view;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  }
  try { localStorage.setItem(VIEW_KEY, view); } catch {}
}

// Wire toggle buttons
for (const btn of document.querySelectorAll(".view-toggle button")) {
  btn.addEventListener("click", () => setView(btn.dataset.view));
}

// Restore last view (default: overview). Migrate any legacy "welcome" preference
// from before the tab was removed → fall through to overview.
try {
  const stored = localStorage.getItem(VIEW_KEY);
  setView(VALID_VIEWS.has(stored) ? stored : "overview");
} catch { setView("overview"); }

// Keyboard shortcuts: O = overview · L = live · T = topics
document.addEventListener("keydown", (e) => {
  if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
  if (e.key === "o" || e.key === "O") setView("overview");
  if (e.key === "l" || e.key === "L") setView("live");
  if (e.key === "t" || e.key === "T") setView("topics");
});

// ════════════════════════════════════════════════════════════════════════════
// THEME TOGGLE — light ↔ dark, persisted (matches /Chapter7/ pattern)
// ════════════════════════════════════════════════════════════════════════════
(function setupTheme() {
  const STORAGE_KEY = "dashboard.theme";
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  const updateLabel = () => {
    const cur = root.getAttribute("data-theme");
    toggle.setAttribute("aria-label", cur === "dark" ? "Switch to light mode" : "Switch to dark mode");
  };
  updateLabel();
  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    updateLabel();
  });
})();
