# Trusted-By Client Names Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show the ten client names on the homepage — static "Trusted by" grid inside the hero navy card (desktop/tablet) and a rolling name band under the mobile stat strip — per the approved spec `docs/superpowers/specs/2026-08-17-trusted-by-clients-design.md`.

**Architecture:** Pure content/JSX change inside the single homepage component `variations/V2_Modern.jsx` (React 18 via CDN + Babel standalone; inline styles; no build step). One module-level roster array feeds both renderings. Crawler snapshot in `index.html` is regenerated afterwards with the existing puppeteer tool.

**Tech Stack:** React 18 UMD + @babel/standalone (JSX transpiled in-browser), inline styles, CSS keyframes in the component's `<style>` block, `tools/serve.mjs` (static server, port 5173), `tools/prerender.mjs` (puppeteer snapshot).

**No test framework exists in this repo** (static site, no root package.json, no runner) — adding one is out of scope. Every task therefore ends with explicit browser verification steps with expected outcomes; those are the tests. Use the Claude Browser pane (`preview_start`) for verification, never Bash-launched browsers.

**⚠ Publish gate:** The user has NOT approved deployment. Site deploys via GitHub Pages when `main` is pushed. Work on branch `feature/trusted-by-clients`; commit locally; **never push, never merge to `main`** within this plan. Final step is showing the local preview to the user and stopping.

---

### Task 1: Branch, shared roster, desktop/tablet "Trusted by" block

**Files:**
- Modify: `variations/V2_Modern.jsx:1-3` (module-level roster)
- Modify: `variations/V2_Modern.jsx:234-241` (industries block → trusted-by grid)

- [ ] **Step 1: Create the working branch**

```bash
cd "C:\Vibecoding\inRange website" && git checkout -b feature/trusted-by-clients
```

Expected: `Switched to a new branch 'feature/trusted-by-clients'`

- [ ] **Step 2: Add the module-level roster**

In `variations/V2_Modern.jsx`, the file currently starts:

```jsx
// V2 — "Modern SaaS" homepage variation.

function V2_Modern() {
```

Insert the roster between the comment and the function so it reads:

```jsx
// V2 — "Modern SaaS" homepage variation.

// Client roster for the "Trusted by" blocks (order: most recognizable first).
// Shared by the desktop/tablet card grid and the mobile rolling band.
// Company names only — never people's names, no logos (see docs/superpowers/specs/2026-08-17-trusted-by-clients-design.md).
const TRUSTED_CLIENTS = ['Adyen', 'Just Eat Takeaway', 'Revolut', 'Nutanix', 'Miki Travel', 'ACT', 'Humble', 'Bentham', 'Taiga', 'Pinnacle'];

function V2_Modern() {
```

(If the leading comment line differs, keep whatever line 1 is and insert the roster block immediately before `function V2_Modern() {`.)

- [ ] **Step 3: Replace the industries block with the trusted-by grid**

In `variations/V2_Modern.jsx` (currently lines 234–241, inside the navy at-a-glance card), replace exactly this block:

```jsx
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>Industries we serve</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['SaaS & Technology', 'Consumer & Retail', 'Travel', 'Food Delivery', 'Industrial', 'Payments', 'Construction', 'FMCG'].map(t => (
                    <span key={t} style={{ fontSize: 11.5, fontWeight: 600, padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' }}>{t}</span>
                  ))}
                </div>
              </div>
```

with:

```jsx
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>Trusted by</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px 18px' }}>
                  {TRUSTED_CLIENTS.map(name => (
                    <span key={name} style={{ fontSize: 13.5, fontWeight: 600, color: 'rgba(255,255,255,0.87)' }}>{name}</span>
                  ))}
                </div>
              </div>
```

Label style is byte-identical to the old one; only the text and the list rendering change.

- [ ] **Step 4: Verify on desktop**

Ensure `.claude/launch.json` has a config named `site` (create if missing):

```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "site", "runtimeExecutable": "node", "runtimeArgs": ["tools/serve.mjs"], "port": 5173 }
  ]
}
```

Then `preview_start` with `{name: "site"}`, open `http://127.0.0.1:5173/` in the Browser pane at desktop size (`resize_window` preset desktop), and check via `read_page` / screenshot:

Expected: navy card shows the three metrics, then label "TRUSTED BY", then ten names in two columns, Adyen first, Pinnacle last. No "Industries we serve" anywhere on the page. No console errors (`read_console_messages` clean of new errors).

- [ ] **Step 5: Commit**

```bash
cd "C:\Vibecoding\inRange website" && git add variations/V2_Modern.jsx && git commit -m "Hero card: replace industry chips with Trusted-by client names"
```

---

### Task 2: Mobile rolling band with reduced-motion fallback

**Files:**
- Modify: `variations/V2_Modern.jsx:7-9` (add reduced-motion hook next to the existing media-query hooks)
- Modify: `variations/V2_Modern.jsx:176-204` (mobile stat strip → strip + band, wrapped in a fragment)
- Modify: `variations/V2_Modern.jsx:773-776` (add marquee keyframes)

- [ ] **Step 1: Add the reduced-motion hook**

The component currently opens with:

```jsx
  const isMobile = window.useMediaQuery('(max-width: 767px)');
  const isTablet = window.useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isNarrow = isMobile || isTablet;
```

Add one line after `isNarrow`:

```jsx
  const reducedMotion = window.useMediaQuery('(prefers-reduced-motion: reduce)');
```

(`useMediaQuery` in `components/Brand.jsx:116` is a generic `matchMedia` wrapper — arbitrary queries are supported.)

- [ ] **Step 2: Add the band under the mobile stat strip**

The mobile-only block currently reads (lines ~176–204; the `.map()` body over the three stats is elided here **only for orientation — do not delete it**, it stays exactly as-is):

```jsx
            {/* Mobile-only compact proof strip (replaces the at-a-glance card) */}
            {isMobile && (
              <div style={{
                marginTop: 36, paddingTop: 28,
                borderTop: '1px solid var(--border-subtle)',
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
              }}>
                {[ ...three stat objects... ].map((s, i) => ( ...unchanged stat cells... ))}
              </div>
            )}
```

Wrap it in a fragment and append the band, so the block becomes:

```jsx
            {/* Mobile-only compact proof strip (replaces the at-a-glance card) */}
            {isMobile && (
              <>
                <div style={{
                  marginTop: 36, paddingTop: 28,
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
                }}>
                  {/* existing three-stat .map() stays byte-identical here */}
                </div>

                {/* Trusted-by band: endless slow scroll of client names; static list for reduced motion. */}
                <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 10 }}>Trusted by</div>
                  {reducedMotion ? (
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.9 }}>
                      {TRUSTED_CLIENTS.join(' · ')}
                    </div>
                  ) : (
                    <div style={{
                      overflow: 'hidden', whiteSpace: 'nowrap',
                      WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
                      maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
                    }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 24, paddingRight: 24, animation: 'tpMarquee 26s linear infinite', willChange: 'transform' }}>
                        {[...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS].map((name, i) => (
                          <React.Fragment key={`${name}-${i}`}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-1)' }}>{name}</span>
                            <span style={{ width: 3, height: 3, borderRadius: 999, background: 'var(--brand-green-500)', opacity: 0.5, flexShrink: 0 }} />
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
```

Indentation of the preserved stat-strip `.map()` shifts one level deeper with the fragment. The roster is rendered twice in the track so the −50% keyframe loops seamlessly.

- [ ] **Step 3: Add the marquee keyframes**

In the `<style>` block near the end of the component (currently lines 773–776):

```jsx
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
```

add one line inside the template string:

```jsx
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tpMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
```

- [ ] **Step 4: Verify on mobile viewport**

With the `site` preview running: `resize_window` preset mobile, reload the page (mobile renders a different React tree).

Expected: under the three-stat strip, a "TRUSTED BY" microlabel and a single-line band of ink-colored names with small green dots, softly faded at both edges, scrolling slowly leftward; watch one full loop (~26s — checking the seam once is enough) for a jump-free wrap. `read_console_messages`: no new errors. The navy card must NOT appear on mobile (unchanged behavior).

- [ ] **Step 5: Verify the reduced-motion branch**

In the Browser pane run `javascript_tool`:

```js
window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

Expected: `false` (so the marquee branch is what you just saw). The fallback branch renders from the same `TRUSTED_CLIENTS` array with no animation property at all — verify by code inspection that the ternary's first branch contains no `animation` key and joins the roster with ' · '. (OS-level reduced-motion emulation isn't available in the pane; the branch is trivial and shares its data source with the marquee.)

- [ ] **Step 6: Commit**

```bash
cd "C:\Vibecoding\inRange website" && git add variations/V2_Modern.jsx && git commit -m "Mobile hero: rolling Trusted-by band with reduced-motion fallback"
```

---

### Task 3: Cache-bust, regenerate crawler snapshot, full-breakpoint check

**Files:**
- Modify: `index.html:87-89` (script version query)
- Regenerate: `index.html` prerender region (via `node tools/prerender.mjs`)

- [ ] **Step 1: Bump the component's cache-busting version**

In `index.html`, change:

```html
  <script type="text/babel" src="variations/V2_Modern.jsx?v=9"></script>
```

to:

```html
  <script type="text/babel" src="variations/V2_Modern.jsx?v=10"></script>
```

- [ ] **Step 2: Regenerate the prerendered snapshot**

```bash
cd "C:\Vibecoding\inRange website" && node tools/prerender.mjs
```

Expected: exits 0 and rewrites the `<!-- PRERENDER:START -->…<!-- PRERENDER:END -->` region of `index.html` (captured at 1440×900, so it contains the desktop card; the mobile band is correctly absent).

- [ ] **Step 3: Verify the snapshot content**

```bash
cd "C:\Vibecoding\inRange website" && grep -c "Industries we serve" index.html; grep -o "Trusted by" index.html | wc -l; grep -c "Adyen" index.html
```

Expected: `0` for "Industries we serve"; ≥1 for "Trusted by"; ≥1 for "Adyen".

- [ ] **Step 4: Breakpoint sweep in the preview**

Reload the preview at each `resize_window` preset and confirm:
- **desktop (1280×800):** card grid with ten names, two columns, no band.
- **tablet (768×1024):** card still renders (tablet uses the desktop card with tighter padding); "Just Eat Takeaway" may wrap inside its cell but must not overflow the card.
- **mobile (375×812):** band scrolls; no card.

Also confirm no horizontal page scrollbar appears on mobile (the mask/overflow-hidden must contain the track).

- [ ] **Step 5: Commit**

```bash
cd "C:\Vibecoding\inRange website" && git add index.html && git commit -m "Homepage: cache-bust V2_Modern and refresh prerender for Trusted-by block"
```

- [ ] **Step 6: Hand the preview to the user — STOP, do not publish**

Leave the `site` preview running, tell the user it's at `http://127.0.0.1:5173/`, share a desktop screenshot and a mobile screenshot, and stop. **No push, no merge to `main`, no deploy** — the user reviews the look first. Branch integration happens later via superpowers:finishing-a-development-branch once the user approves.

---

## Self-Review

- **Spec coverage:** roster + order (Task 1 Step 2); desktop/tablet card grid with identical label styling (Task 1 Step 3); industries removal (Task 1 Step 3 + Task 3 Step 3 check); mobile band incl. ink color, green dots, 26s loop, edge fade, reduced-motion fallback (Task 2); shared array both renderings (Tasks 1–2 both reference `TRUSTED_CLIENTS`); cache-bust + prerender (Task 3); verification at three breakpoints (Task 3 Step 4); publish gate (header + Task 3 Step 6). Pre-launch client-OK checklist is a user action outside the plan — restated in the handoff step.
- **Placeholder scan:** the two "elided/orientation" markers in Task 2 Step 2 explicitly instruct preserving existing code byte-identical, with the full surrounding structure shown — no TBDs remain.
- **Type consistency:** `TRUSTED_CLIENTS` (module const) and `reducedMotion` (hook) are named identically across Tasks 1–2; keyframe name `tpMarquee` matches between the style block (Task 2 Step 3) and the `animation` property (Task 2 Step 2).
