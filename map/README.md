# /map — Dutch MAP, APA & Rulings Explorer

Served at **inrange.nl/map**. An interactive explorer of the Dutch tax
authority's annual reports, with two top-level areas: **MAP & APA** (the
Belastingdienst MAP-team, 2019–2025) and **International Rulings** (the APA/ATR
practice, 2023–2025).

Three files, no build step:

- `core.js` — all report figures (`MAP_DATA`, `RULINGS_DATA`) + pure helpers
  (`yoy`, `niceMax`, `outcomeGroups`, `resolutionRate`, `rulingMix`).
  **Edit this to update the data.** Zero DOM — dual-mode (browser globals via
  `<script src="core.js">`, plus `module.exports` for the Node tests).
- `index.html` — chrome, the two-area switch, and the nine views (vanilla JS,
  `innerHTML` render functions, hand-built inline SVG, the site's design
  tokens). **Presentation only — don't put data here.**
- `tests/core.test.js` — `node --test` unit tests for `core.js` (reconciliation
  of both data objects + the helpers).

## Updating for a new report year

Edit **`core.js` only** — the views read everything from the data objects.

**MAP & APA (`MAP_DATA`):**
- Add the new year to `MAP_DATA.years`.
- Append the year's figures to: `caseload` (per-stream `received`/`closed`
  arrays — push one value each, indexed to `years`), `inventory[year]` (per
  stream `{begin, received, closed, end}`), `outcomes[year]` (the ten OECD
  outcome categories), `cycleTimes` (push to `TP`/`INT`/`Total` and extend
  `years`), `partners[year]` (named top-5 + `Overig`), and `kpis[year]`.
- Update `kpis` so the hero compares the new year against the prior one.

**International Rulings (`RULINGS_DATA`):**
- Add the new year to `RULINGS_DATA.years`.
- Append `flow[year]` (per type — `ATR`/`APA`/`BAPA`/`Innovatiebox`/`Overige` —
  each `{begin, received, closed, end, outcomes:{granted, rejected, withdrawn,
  outOfTreatment, noIntl}}`), `processingTime[year]` (months per type ×
  outcome; use `null` for "—" where there were no cases), and `kpis[year]`.
- Refresh / extend `positions` (the "Defining positions" cards) and
  `publishedSummaries2025` if a new annex of summaries is published.

**Chart-only figures (read carefully):** the MAP cycle-time and top-treaty-
partner numbers do not appear as tables in the report — they live only in chart
images. Render the relevant PDF pages to images (e.g. PyMuPDF / `fitz`) and read
the values off the chart. These are approximations: keep `cycleTimes.approximate`
set to `true` so the UI keeps showing the "approximate (±~0.5 mo)" label. Don't
present a read-off-a-chart number as if it were an exact published figure.

## Running the tests

Reconciliation (begin + received − closed = end, per stream/type) and the
helpers are unit-tested. Run from the repo root:

```bash
node --test "map/tests/*.test.js"
```

Expected: **17 pass, 0 fail.**

> Note: on current Node (tested on v24), the bare directory form
> `node --test map/tests/` **fails** to discover the file — use the quoted glob
> form above (or the explicit path `node --test "map/tests/core.test.js"`).

After the tests are green, open `index.html` and do a quick manual pass: click
through **both** areas and every sub-tab, toggle dark mode (charts must recolour;
the theme persists on reload), and check the print preview (interactive chrome
hidden, the active view legible with the hero title + footer).

## Commentary rule

inRange notes are **opt-in** and must add something the chart can't show. Never
narrate chart mechanics ("the line goes up"). No note is better than a weak one.
The Rulings **"Defining positions"** cards are the one place opinion is
prominent — keep them in Aleks's voice, framed clearly as inRange commentary
(the "inRange view" eyebrow), with the source year tagged.
