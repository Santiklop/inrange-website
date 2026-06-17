# Dutch MAP & APA Explorer — Design

**Date:** 2026-06-17
**Status:** Approved (pending spec review)
**Owner:** inRange Solutions

## Purpose

An interactive data explorer for the website that lets Tax & Transfer Pricing
practitioners interrogate the official figures from the Dutch competent
authority's annual reports. The page is organised into **two top-level areas**:

1. **MAP & APA** — the Belastingdienst MAP-team's mutual-agreement / advance-
   pricing statistics across **2019–2025** (five views).
2. **International Rulings** — the "Rulings met een internationaal karakter"
   annual reports across **2023–2025**: ruling statistics by type plus a curated
   strip of "beeldbepalende standpunten" (defining positions) with inRange
   commentary.

Both render as filterable, on-brand visualizations with sparse, high-value
inRange interpretation.

Audience: TP and tax-treaty practitioners. Positioning: a credible reference
resource that quietly demonstrates inRange's command of the Dutch MAP / APA /
rulings landscape.

## Source material

In `C:\Vibecoding\Dutch APAs`. **MAP-team reports:**

- `MAP-Jaarverslag 2023 vs 1.0 def.pdf` — incl. 2019–2023 received/closed series.
- `Jaarverslag MAP 2024.pdf`
- `Mutual Agreement ProceduresJaarverslag 2025.pdf` (latest, published June 2026).

**International-rulings reports (APA/ATR-team, College IFZ):**

- `Jaarverslag 2023 rulings met een internationaal karakter.pdf`
- `2024 summary of Dutch international tax ruling practice.pdf`
- `Rulings met een internationaal karakter; Jaarverslag 2025.pdf` (latest).

**Methodology caveat (must surface on the page):** the MAP reports state their
internal stock-administration counts differ from the later OECD-published MAP
statistics (different counting of start dates, cases awaiting taxpayer
acceptance, etc.). The page presents the reports' own figures and says so.

## Approach (decided)

**Single self-contained HTML file**, matching the existing
`NL-US Impact - Adyen BAPA Interactive_ver.1.0.html` stack:

- **Vanilla JS** in one IIFE — *not* React. (The main site uses React, but the
  Adyen reference interactive is plain JS: `render*()` functions build markup via
  `innerHTML`, hand-built SVG via small `path()`/`bar()` helpers, manual tab
  switching + `addEventListener` wiring, and `kpi()`/`tip()`/format helpers.) No
  build step, no CDN framework — lighter and faster to load.
- The site's CSS design tokens (brand green / navy palette), Plus Jakarta Sans
  + Source Serif 4, lucide icons.
- Light/dark theme, scroll progress, print-friendly.
- **Hand-built inline SVG charts** (no charting library) — on-brand, portable.
- All report figures embedded as one `DATA` object at the top of the script, so
  the annual update is a paste-in of the new year's numbers.

**Hosting:** served at **`inrange.nl/map`** via a `map/index.html` folder —
matching the existing clean-URL pattern of `/sport` and `/Quiz` (each an
`index.html` in its own folder). Site domain per CNAME: `www.inrange.nl`.

Rejected: (B) integrated React component in the site build — marginal benefit,
more coupling, harder yearly updates. (C) CDN charting library — adds a
dependency and diverges from the bespoke house look.

## Page structure

1. **Header** — inRange brand, dark-mode toggle, scroll progress (reuse Adyen chrome).
2. **Area switch** — a segmented control in the hero toggling the two top-level
   areas: **MAP & APA** | **International Rulings**. Selecting an area swaps the
   hero KPIs, the sub-tab bar, and the active view. Default: MAP & APA.
3. **Hero** — title, one-line lede, KPI tiles for the active area's latest-year
   headlines with YoY deltas. MAP & APA: received 506 (+9%), closed 531 (+28%),
   resolution rate 97%, year-end inventory 1,041, full-elimination 70.4%.
   Rulings: received 528, closed 591, (partly) granted 474, year-end inventory
   644 (from 707).
4. **Sticky sub-tab bar + contextual control dock** — sub-tabs switch lens within
   the active area; the dock shows year/segment selectors only where they apply.
5. **View region** — five MAP views or four Rulings views (below).
6. **Footer** — source citations linking all six reports + OECD MAP/APA datasets;
   the methodology caveat; a "data through FY2025" stamp.

## Area 1 — MAP & APA: the five views

1. **Caseload trends** — received vs. closed per year 2019–2025; workstream
   toggles (INT / TP / tie-breaker / multilateral / BAPA / MAPA).
2. **Inventory flow** — begin → received → closed → end, per workstream and
   selectable year (2023–2025).
3. **Outcomes & resolution** — the 10 OECD outcome categories (counts + %) for
   the selected year (2024/2025), grouped unilateral / bilateral / other, plus a
   resolution-rate readout.
4. **Timing, countries & APAs** — avg cycle time vs. the 24-month BEPS Action 14
   reference line; top-5 treaty-partner countries; BAPA/MAPA prevention trend.
5. **TP deep-dive** — TP-specific trend; the "TP is the only stream over 24
   months" point; TP outcome split; 32 TP treaty partners; the "~half of TP MAP
   inventory is now APA requests" prevention story; and a **method explainer**
   (clearly labelled commentary — method is *not* published in MAP statistics;
   inRange's practice-based view on which methods typically feature).

## Area 2 — International Rulings: stats-led, insights support

Ruling types: **ATR** (advance tax ruling), **APA** (unilateral), **BAPA**
(bi-/multilateral APA), **Innovatiebox**, **Overige rulings** (other). The four
views:

1. **Overview** — latest-year KPIs + the ruling-mix by type (share of received /
   closed) for the selected year. Sets the scene.
2. **By type & flow** — per type and selectable year (2023–2025): begin →
   received → closed → end, and the **outcome split** (granted / rejected /
   withdrawn / out-of-treatment / no-international-character). Includes the
   2023–2025 received/closed/end trend per type. *(All per-type figures for all
   three years are in the text layer — no chart-image gap.)*
3. **Processing times** — gross processing time (*bruto doorlooptijd*, months) by
   ruling type and outcome, selectable year (2024/2025). Note on the page that
   this is gross (incl. info-request waiting time); net is materially shorter.
4. **Defining positions** *(supporting insights strip)* — curated cards of
   "beeldbepalende standpunten" with inRange commentary in Aleks's voice (see
   commentary rule + the saved voice reference). Two groups:
   - **TP cases** — shared control → contribution/profit-split for treasury &
     cash-pooling; implicit support in financial TP; comparability adjustments
     (toll-manufacturer TNMM rejected → withdrawn).
   - **Access conditions** — no APAs with low-tax jurisdictions (structure must be
     fully dismantled *beforehand*; >30%-revenue test); economic-nexus
     (qualitative + quantitative) for participation / withholding exemptions.

   Each card: bold emoji title → case facts → authority's reasoning/threshold →
   practical takeaway. Seed the headline cards from Aleks's 2024-report LinkedIn
   post (verbatim-adapted), clearly framed as inRange commentary. This is the one
   place opinion is prominent; the three stats views stay clean.

## Commentary rule (important)

inRange "What this means" notes are **opt-in, not per-view**:

- **No note is the default.** A weak or obvious note is worse than none.
- **Never describe chart mechanics** ("this bar shows…", "as the line rises…").
  Commentary may only add what the reader can't get by looking — a consequence,
  a tension, a so-what.
- **Brief** — one or two sentences, in Source Serif, visually distinct.

In practice, expect real takeaways on ~2–3 views only (e.g. TP cycle time over
the norm → APA-over-MAP implication; the dispute-prevention shift toward APAs).

## Data model

One `DATA` constant. Below is what has been cleanly extracted from the text
layer. Values that live **only inside chart images** in the PDFs are listed
under "To extract during implementation."

### Caseload — received / closed by workstream and year (from text)

| Stream | Metric | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|---|---|---|
| INT | received | 116 | 127 | 163 | 201 | 240 | 309 | 350 |
| INT | closed | 122 | 103 | 104 | 119 | 220 | 240 | 384 |
| TP | received | 80 | 93 | 42 | 86 | 60 | 93 | 75 |
| TP | closed | 77 | 71 | 51 | 51 | 79 | 109 | 81 |
| TRMAP (ML) | received | 0 | 0 | 0 | 2 | 6 | 0 | 4 |
| TRMAP (ML) | closed | 0 | 0 | 0 | 0 | 4 | 6 | 0 |
| TB | received | 18 | 21 | 29 | 33 | 14 | 36 | 39 |
| TB | closed | 7 | 16 | 22 | 36 | 20 | 22 | 25 |
| BAPA | received | 23 | 23 | 19 | 31 | 28 | 24 | 34 |
| BAPA | closed | 21 | 13 | 15 | 14 | 29 | 34 | 33 |
| MAPA | received | 2 | 2 | 0 | 4 | 8 | 3 | 4 |
| MAPA | closed | 0 | 1 | 0 | 6 | 0 | 3 | 8 |

### Inventory flow — begin / received / closed / end (from text)

**2023** (end-2022 → 2023, post-matching begin): INT 409/240/220/429 ·
TP 209/60/79/190 · TRMAP 10/6/4/12 · TB 22/14/20/16 · BAPA 91/28/29/90 ·
MAPA 18/8/0/26 · Protective MAP 46/7/14/39 · Bezwaar/Beroep 3/6/4/5 ·
Prefiling 11/17/24/4. Totaal 819/386/394/811.

**2024:** INT 518/309/240/587 · TP 198/93/109/182 · TRMAP 10/0/6/4 ·
TB 21/36/22/35 · BAPA 92/24/34/82 · MAPA 22/3/3/22 · Bezwaar/Beroep 5/8/6/7 ·
Protective MAP 39/10/2/47 · Prefiling 10/22/27/5 · Arbitrage 0/1/0/1.
Totaal 915/506/449/972.

**2025:** INT 693/350/384/659 · TP 210/75/81/204 · ML-MAP 10/4/0/14 ·
TB 46/39/25/60 · BAPA 85/34/33/86 · MAPA 22/4/8/18 · Bezwaar/Beroep 9/3/8/4 ·
Pre-filing 8/34/32/10 · Protective MAP 47/14/13/48 · Arbitrage 1/1/0/2.
Totaal (incl. all) 1131/558/584/1105; MAP+APA core 1066/506/531/1041.

### Outcomes — 10 OECD categories (from text)

**2025 (% of 490 closed):** 1 Denied access 26 (5.3%) · 2 Objection not
justified 29 (5.9%) · 3 Unilateral relief 27 (5.5%) · 4 Full elimination 345
(70.4%) · 5 Partial 3 (0.6%) · 6 No taxation contrary to treaty 10 (2.0%) ·
7 No agreement 2 (0.4%) · 8 Resolved via domestic remedy 21 (4.3%) ·
9 Withdrawn 26 (5.3%) · 10 Any other 1 (0.2%). Per-stream split also available
(INT 384 / TP+TRMAP 81 / TB 25).

**2024 (of 377 closed; per-stream available):** unilateral subtotal 62
(1 Denied 20, 2 Objection 19, 3 Unilateral relief 23) · bilateral: 4 Full
elimination 266, 6 No taxation 9, 7 No agreement 10 · other: 8 Domestic remedy
6, 9 Withdrawn 23, 10 Other 1. (Per-stream INT 240 / TP+TR 115 / TB 22.)

### Treaty partners (from text)

2025: MAP cases with **60** partners — 54 INT, 32 TP, 11 TB. (2024 partner
counts to confirm during extraction.)

### Wet fiscale arbitrage (from text)

2025: begin 26, new 36, closed 16, end 46. Phases (begin → end): klacht 9→18,
overleg 17→28, arbitrage 0→0. First complaint filed 2020; series 2020–2025.

### Other notable facts (qualitative, for KPIs / commentary)

- NL won OECD MAP awards 2022, 2023, 2024.
- 2025 avg cycle time under 24 months overall; **TP slightly over 24 months**
  (the only stream over the norm).
- ~half of the TP MAP inventory consists of APA (BAPA/MAPA) requests.
- Two arbitration procedures ongoing, expected to conclude in 2026; none yet
  under the Wet fiscale arbitrage.
- Execution positions 2025: interest-mitigation (*rentematiging*) conditions;
  MAP-besluit revision underway; Latvian CJEU preliminary ruling on the meaning
  of "double taxation."

### Chart-image-only data — RESOLVED (read from rendered PDF charts)

Extracted by rendering the 2025 report chart pages with PyMuPDF and reading the
values. Cycle times are read off a line chart and are **approximate (±~0.5
months)** — the page should label them as such (no false precision).

**Average cycle times (months), 2021 → 2025 (Grafiek 6):**

| Series | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|
| TP | 15.5 | 19 | 21 | 26 | 24.5 |
| INT | 12 | 15 | 15.5 | 13.5 | 10.5 |
| Totaal | 13.5 | 16.5 | 16.8 | 16.8 | 12.5 |

Confirms the qualitative text: total under 24 months; TP the only stream over
the norm (peaks ~26 in 2024).

**Top treaty partners, 2025 MAP cases (Grafiek 7, pie):** België 264 ·
Duitsland 167 · Verenigde Staten 105 · Spanje 83 · Verenigd Koninkrijk 60 ·
Overig 258. (Top-5 named = BE, DE, US, ES, UK.)

**Still optional / not yet extracted:** Wet fiscale arbitrage multi-year counts
2020–2025 (Grafiek 8) — only the 2025 stock table is in text (begin 26 / new 36
/ closed 16 / end 46). This is a secondary element; if a multi-year arbitrage
visual is wanted, extract Grafiek 8 the same way. Rendered chart PNGs are in
`C:\Vibecoding\Dutch APAs\_charts\` (scratch, not part of the website).

## Area 2 data — International Rulings (all from text layer)

### Kerncijfers by ruling type — begin / received / closed / end + outcome split

Columns per year: ATR · APA · BAPA · Innovatiebox · Overige · **Totaal**.
("Closed" = *afgedane verzoeken*; its sub-rows sum to Closed.)

**2025** (Totaal 2024 in parentheses for KPI deltas):
- Begin: 216 · 58 · 100 · 303 · 30 · **707**
- Received: 231 · 63 · 31 · 169 · 34 · **528** (2024: 583)
- Closed: 276 · 70 · 34 · 179 · 32 · **591** (2024: 608)
  - (Partly) granted: 215 · 61 · 31 · 148 · 19 · **474**
  - Rejected: 4 · 1 · 1 · 1 · 4 · **11**
  - Withdrawn: 47 · 6 · 1 · 5 · 6 · **65**
  - Out-of-treatment: 7 · 2 · 1 · 3 · 2 · **15**
  - No international character: 3 · 0 · 0 · 22 · 1 · **26**
- End: 171 · 51 · 97 · 293 · 32 · **644**

**2024:**
- Begin: 207 · 59 · 108 · 328 · 30 · **732**
- Received: 288 · 61 · 26 · 177 · 31 · **583**
- Closed: 279 · 62 · 34 · 202 · 31 · **608**
  - Granted 233·53·25·154·21·**486** · Rejected 3·0·1·0·2·**6** ·
    Withdrawn 36·7·3·13·5·**64** · Out 5·2·4·7·2·**20** ·
    No-int'l 2·0·1·28·1·**32**
- End: 216 · 58 · 100 · 303 · 30 · **707**

**2023:**
- Begin: 180 · 70 · 101 · 355 · 35 · **741**
- Received: 276 · 61 · 35 · 182 · 32 · **586**
- Closed: 249 · 72 · 28 · 210 · 37 · **596**
  - Granted 212·49·21·147·15·**444** · Rejected 2·4·1·0·1·**8** ·
    Withdrawn 29·10·0·13·9·**61** · Out 5·7·4·14·4·**34** ·
    No-int'l 1·2·2·36·8·**49**
- End: 207 · 59 · 108 · 327 · 30 · **731**

(2022 totals, for trend context: received 559, closed 544.)

### Gross processing time (*bruto doorlooptijd*, months) by type & outcome

**2025** — ATR · APA · BAPA · Innovatiebox · Overige:
- Granted: 6 · 11 · 39 · 20 · 8
- Rejected: 10 · 7 · 11 · 90 · 33
- Withdrawn: 12 · 12 · 2 · 30 · 10
- Out-of-treatment: 18 · 21 · 33 · 33 · 12

**2024:**
- Granted: 8 · 12 · 32 · 17 · 8
- Rejected: 8 · — · 46 · — · 8
- Withdrawn: 10 · 24 · 39 · 27 · 13
- Out-of-treatment: 13 · 17 · 37 · 35 · 8

(Use `null` for the "—" cells. Page note: gross incl. info-request time; net is
materially shorter.)

### Published summaries 2025 (context stat)

ATR 273 · APA/BAPA 104 · Innovatiebox 157 · Overige 31 (all published within
~3 weeks of formalising).

### Defining-positions cards (curated, with inRange commentary)

Seed from Aleks's 2024-report LinkedIn post (his wording, adapted) + report
themes. Each card = `{ icon, title, body, source }`. Headline set:

- 🤝 **Shared Control = Profit Split?** — joint treasury functions / financing-
  risk control by NL + foreign affiliate → contribution-based (profit-split)
  allocation of treasury profits (cash pooling, intercompany financing).
- 💳 **Implicit Support in Financial TP** — borrower had standalone capacity (no
  guarantee fee), but group affiliation lifted its credit profile → implicit
  support priced into intercompany loans.
- ⚠️ **Comparability Adjustments: Handle with Care** — toll manufacturer's TNMM
  used comparables owning inventory / bearing operational risk; margin
  adjustments (stripping material costs) deemed unreliable → APA not accepted,
  taxpayer withdrew.
- 🚫 **No APAs with Low-Tax Jurisdictions** — access bar; rulings not granted in
  anticipation of a future restructuring — the low-tax disconnection must be
  *fully completed beforehand*; >30%-of-revenue-from-LTJ test; narrow dismantling
  exception only.
- 🧭 **Economic Nexus** *(optional 5th)* — participation / withholding-exemption
  certainty requires qualitative + quantitative NL personnel actually steering
  the foreign holdings.

Cards live in `RULINGS_DATA.positions`; copy is editable text (not chart data).

## Out of scope (v1)

- TP **method** breakdown as MAP data — not published in any MAP report
  (confirmed: zero mentions of TNMM/CUP/profit split). Served via the labelled
  method explainer (Area 1) and the real method discussion in the Rulings
  defining-positions cards (Area 2).
- OECD cross-country peer benchmarking — external data, not in these reports.
- Reproducing all published ruling summaries (hundreds/yr) — the Defining
  Positions strip is a curated highlight set, not a full archive.
- Live/CMS data feed — annual manual update of `core.js` is sufficient.

## Success criteria

- No build step; portable. Data + pure logic live in `map/core.js` (dual-mode:
  browser global + Node-requirable for tests; holds `MAP_DATA` + `RULINGS_DATA`);
  `index.html` consumes it via a plain `<script>` tag. Co-located static files
  served at `/map`.
- The area switch toggles cleanly between MAP & APA (5 views) and International
  Rulings (4 views); deep-state (active area + sub-tab) survives light/dark and
  is print-friendly.
- All views work with their controls (year / workstream / type selectors),
  light/dark, print.
- Every displayed number traces to a cited report figure (or a flagged
  approximate chart value); methodology + gross-processing-time caveats visible.
- Commentary follows the opt-in rule; no chart-mechanics narration. The Rulings
  Defining-Positions cards are clearly framed as inRange commentary, in Aleks's
  voice.
- Updating to FY2026 = editing `MAP_DATA` / `RULINGS_DATA` in `core.js` only.
