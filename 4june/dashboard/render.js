// 4june/dashboard/render.js
import { aggregateBy, donutSegments, topN, hashHue } from "./viz.js";

const PALETTE = ["#1FA84A","#14273F","#6FA3C0","#C98A2B","#5B3A63","#0F6B2E","#6CCE89","#818B98"];

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
    const a0 = acc * 2 * Math.PI - Math.PI / 2;
    const a1 = (acc + seg.frac) * 2 * Math.PI - Math.PI / 2;
    acc += seg.frac;
    const large = seg.frac > 0.5 ? 1 : 0;
    const x0 = cx + radius * Math.cos(a0), y0 = cy + radius * Math.sin(a0);
    const x1 = cx + radius * Math.cos(a1), y1 = cy + radius * Math.sin(a1);
    const color = PALETTE[i % PALETTE.length];
    return `<path d="M ${x0} ${y0} A ${radius} ${radius} 0 ${large} 1 ${x1} ${y1}"
                   fill="none" stroke="${color}" stroke-width="${thick}"
                   data-label="${seg.label}" data-count="${seg.count}"></path>`;
  }).join("");
  const legend = segments.map((seg, i) => `
    <div class="legend-row">
      <span><span class="legend-swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${seg.label}</span>
      <span class="legend-count">${seg.count}</span>
    </div>`).join("");
  container.innerHTML = `
    <div style="display:flex;gap:16px;align-items:center;flex:1;min-height:0;">
      <svg viewBox="0 0 ${size} ${size}" style="width:180px;height:180px;flex:0 0 auto">${arcs}</svg>
      <div class="legend" style="flex:1;align-self:center">${legend}</div>
    </div>`;
  container.querySelectorAll("path").forEach(p => {
    p.addEventListener("mousemove", (e) => {
      const label = p.dataset.label;
      const count = p.dataset.count;
      const names = (namesByLabel?.[label] || []).slice(0, 12).join(", ");
      showTooltip(`<b>${label}</b> · ${count}<br><span style="opacity:.8">${names}</span>`, e.clientX, e.clientY);
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
  const max = Math.max(1, ...Object.values(counts));
  container.innerHTML = `<div class="chip-cloud">` +
    Object.entries(counts).sort((a,b) => a[0].localeCompare(b[0])).map(([co, n]) => {
      const fs = 14 + Math.round((n / max) * 14);
      return `<span class="cloud-chip" data-company="${co}" style="font-size:${fs}px">${co} · ${n}</span>`;
    }).join("") + `</div>`;
  container.querySelectorAll(".cloud-chip").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const co = el.dataset.company;
      const names = (namesByCompany[co] || []).join(", ");
      showTooltip(`<b>${co}</b><br>${names}`, e.clientX, e.clientY);
    });
    el.addEventListener("mouseleave", hideTooltip);
  });
}

// ---------- Clustered themes ----------
function renderThemes(container, items) {
  container.innerHTML = `<div class="themes">` + items.map((t, i) => `
    <details class="theme" data-i="${i}">
      <summary><span>${t.theme}</span><span class="theme-count">${t.count}</span></summary>
      <ul class="theme-quotes" style="display:block">
        ${(t.quotes || []).map(q => `<li>"${q}"</li>`).join("")}
      </ul>
    </details>`).join("") + `</div>`;
  // Native <details> handles open/close without extra JS
}

// ---------- Main entry ----------
async function main() {
  const [responses, clusters] = await Promise.all([
    fetch("./responses.json").then(r => r.json()),
    fetch("./clusters.json").then(r => r.json()).catch(() => ({ wishes: [], expectations: [], generatedAt: "" }))
  ]);

  const total = responses.length;
  const firstTimers = responses.filter(r => r.previousEvents === "First time").length;
  const ts = (clusters.generatedAt || new Date().toISOString()).slice(11, 16);

  document.getElementById("status").innerHTML =
    `${total} <span class="dim">of 35 checked in</span> · ${firstTimers} <span class="dim">first-timers</span> · <span class="dim">updated ${ts}</span>`;

  // Tax areas
  const taxCounts = aggregateBy(responses, r => r.taxAreas);
  const taxSegs = donutSegments(taxCounts).sort((a,b) => b.count - a.count);
  const namesByTax = {};
  for (const r of responses) for (const t of (r.taxAreas || [])) (namesByTax[t] ||= []).push(r.name.split(" ")[0]);
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
  for (const r of responses) (namesByCo[r.company] ||= []).push(r.name.split(" ")[0]);
  renderCompanies(document.querySelector("#p-companies .panel-body"), companies, namesByCo);

  // Wishes + Expectations
  renderThemes(document.querySelector("#p-wishes .panel-body"), clusters.wishes || []);
  renderThemes(document.querySelector("#p-exp .panel-body"), clusters.expectations || []);

  // Prev attendance
  const prevCounts = aggregateBy(responses, r => [r.previousEvents]);
  const prevSegs = donutSegments(prevCounts);
  const namesByPrev = {};
  for (const r of responses) (namesByPrev[r.previousEvents] ||= []).push(r.name.split(" ")[0]);
  renderDonut(document.querySelector("#p-prev .panel-body"), prevSegs, namesByPrev);
}
main();
