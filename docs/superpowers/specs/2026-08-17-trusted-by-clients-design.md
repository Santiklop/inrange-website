# Trusted-by client names — design

**Date:** 2026-08-17
**Status:** Approved by Aleks (brainstorm session with visual mockups)
**Scope:** Homepage (`index.html` → `variations/V2_Modern.jsx`)

## Goal

Show prospects which companies trust inRange — impactful but restrained. Company names only; never people's names; no logos (text treatment chosen deliberately, so no logo assets or brand-color noise).

## Client roster (fixed order, most recognizable first)

Adyen, Just Eat Takeaway, Revolut, Nutanix, Miki Travel, ACT, Humble, Bentham, Taiga, Pinnacle.

Name forms are the short common ones (e.g. "Just Eat Takeaway", not "Just Eat Takeaway.com"). The list lives in one JS array in `V2_Modern.jsx` so both renderings share it.

## Desktop & tablet (≥768px): names inside the navy "At a glance" card

In the hero card (`variations/V2_Modern.jsx`, currently lines ~234–241), replace the "Industries we serve" block with:

- Label **"Trusted by"** — identical styling to the current label (fontSize 11, fontWeight 700, letterSpacing 0.14em, uppercase, color `rgba(255,255,255,0.55)`, marginBottom 12).
- **Two-column grid** of the ten names: fontSize 13.5, fontWeight 600, color `rgba(255,255,255,0.87)`, gap 9px 18px (starting values; fine-tune visually during implementation). Plain text spans — no links, no hover states, no icons.
- The three metrics above (15+ / 60% / 40%) are untouched.

The industry chips disappear from the site's hero entirely; sector context remains in the projects-map story titles and services copy. No replacement section is added.

"Just Eat Takeaway" may wrap to two lines at tablet card widths — acceptable if it wraps cleanly within its grid cell.

## Mobile (<768px): rolling band under the stat strip

The navy card does not render on mobile; the compact three-stat strip does. Directly beneath it, add:

- A **"Trusted by"** microlabel (same small-caps style family as the strip's labels, muted gray).
- A **full-width endless marquee** of the ten names: ink text (`var(--fg-1)`, the site's near-black) on the white page background, fontSize ~13, fontWeight 600, separated by small green dots (`var(--brand-green-500)` at reduced opacity).
- Motion: CSS-only — track contains the name sequence twice; `@keyframes` translateX(0 → −50%), linear, infinite, ~26s per loop (slow and quiet; not a stock ticker). Keyframes join the existing block at the end of `V2_Modern.jsx` (~line 773).
- Soft edge fade on both sides via CSS `mask-image` linear-gradient.
- **Reduced motion:** when `prefers-reduced-motion: reduce`, no animation — render the names as a static wrapped list (same ink color and size, middot separators, two to three lines) instead.

Desktop and mobile treatments never coexist in one viewport (card is ≥768px, band is <768px), so no visitor sees the names twice.

## Implementation notes

- Pure JSX/content change in `variations/V2_Modern.jsx`; no new files, no data fetching.
- Bump the cache-busting query for the component in `index.html` (`variations/V2_Modern.jsx?v=9` → `?v=10`).
- Regenerate the crawler snapshot afterwards: `node tools/prerender.mjs` (desktop viewport; will capture the new card block and drop the old industries chips from the static HTML).

## Verification

- Serve locally (`node tools/serve.mjs`) and check all three breakpoints (<768, 768–1023, ≥1024): card grid renders ten names, band scrolls smoothly with no jump at the loop seam, edge fade present.
- Emulate `prefers-reduced-motion: reduce` and confirm the static list fallback.
- Confirm the prerendered snapshot in `index.html` contains "Trusted by" + the ten names and no "Industries we serve" remnants.
- No console errors; existing animations (pulse dot, projects map) unaffected.

## Pre-launch checklist (Aleks, outside code)

- Confirm each of the ten clients is comfortable being named publicly; remove any name lacking an OK before deploying.

## Out of scope

- No testimonials, quotes, logos, case-study pages, or changes to other sections (projects map, services, Open Practice).
- No industries relocation — if industries need a new home later, that's a separate task.

## Alternatives considered (rejected)

- **Strip under hero / projects-section footer** — placement lost to the navy card (user preference: proof inside the first-screen card).
- **Logo chips (mono)** — needs white/mono logo assets from each client; heavier look.
- **Rotating spotlight** — only one name visible at a time.
- **Desktop marquee band** — chosen for mobile only; on desktop the static in-card roster is quieter.
