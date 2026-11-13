# Missing OECD examples — design

**Date:** 2026-11-13
**Status:** Approved by Aleks in the brainstorm session. His instruction: write all of them and publish them together in one push.
**Scope:** The OECD example pages (`Chapter6/`, `Chapter7/`, `Chapter9/`, `Chapter10/`, `ProfitSplit/`, `OtherExamples/`, `Quiz/`), two new pages (`Chapter1/`, `Chapter2/`) and `sitemap.xml`. The homepage is not touched.

## Goal

Put every worked example in the OECD Transfer Pricing Guidelines on the site, so the walkthrough covers the Guidelines completely. This comes before the MCP connector, which will serve these examples to Claude and must be able to answer "what examples do the Guidelines contain?" in full.

## Sources

- OECD Transfer Pricing Guidelines, 2022 edition, the latest consolidated edition. Official PDF in `tools/oecd-tpg-2022/`, extracted text in `tools/oecd-tpg-2022-text/` (`paras.json` is split by paragraph number).
- Chapter VII only: the OECD public consultation document of 1 June 2026. PDF in `Chapter7/`, extracted text in `tools/ch7-draft-2026-text/`. Aleks decided that Chapter VII follows the draft and says it is a draft.

`tools/` is gitignored, so the source material is not published.

## What counts as an example

- **In:** passages the Guidelines label as an example or illustration, or that set out a fact pattern and draw a conclusion from it.
- **Out:** illustrations of a sentence or two inside a paragraph (¶1.52, 1.170, 1.175, 2.48, 2.78, 6.41, 8.8) and passing "for example" phrases.
- Chapters IV and V and their annexes have no worked examples. Amount B (2024 annex to Chapter IV) is outside the 2022 edition and out of scope.

The approved list, with a one-line description of each example, is in `tools/oecd-missing-examples-inventory.md`. The appendix below repeats the paragraph numbers so the scope is under version control.

## Scope and placement

63 examples, written as 61 cases. The site goes from 85 cases to 146.

| Page | Today | Added | After |
|---|---|---|---|
| Chapter I (new, `Chapter1/`) | none | 21 examples as 20 cases | 20 |
| Chapter II (new, `Chapter2/`) | none | 14 | 14 |
| Chapter VI | 31 | 2 from the main text | 33 |
| Chapter VII (draft) | 21 | 9 from the draft's main text as 8 cases | 29 |
| Chapter IX | 8 | 8 | 16 |
| Chapter X | 2 | 7 | 9 |
| Other examples | 7 | 2 (Chapters III and VIII) | 9 |
| Profit split | 16 | none | 16 |

Rule for cases: one case per OECD example. Where the Guidelines return to an example with changed facts, the variation is an extra scenario in the same case. Two pairs are merged because the Guidelines present them as a contrast: ¶1.114 with ¶1.125, and draft ¶7.81(a) with ¶7.81(b).

## Content rules

- **Format:** the existing case shape in `cases.js`: `id`, `theme`, `themeLabel`, `title`, `group`, `refs`, `atGlance`, `parties`, `timeline`, `scenarios` (`letter`, `facts`, `question`, `mcq` with three options, `correctIdx`, `analysis`, `verdict`), `takeaway`, `crossRefs`.
- **Own words:** a paraphrase for learning, as on the existing pages. Never the OECD's wording.
- **Faithful:** every fact, number and conclusion comes from the cited paragraphs. Nothing is added from memory or from other sources. Where the Guidelines leave a point open, the analysis says so.
- **Options:** one correct option and two plausible wrong ones that a practitioner might actually choose. `correctIdx` can stay 0: the page shuffles the options when it renders them.
- **Party diagrams:** use only the `parties.kind` values the renderer already supports (`tested-party`, `three-party-flow`, `provider-to-recipients`, `provider-with-internal-capability`, `franchise`, `parent-and-subsidiaries`, `shareholder-activity`, `supplier-association`).
- **Numbers:** the data model has no tables. Figures from tables (Annex I to Chapter II, ¶9.46) go into the facts and timeline as text.
- **Ids:** numeric and unique per page. New pages number from 1 in paragraph order. Existing pages continue after their last id, so existing links (`#case-N`) and Quiz ids stay valid.

### References

| Page | Format | Example |
|---|---|---|
| Chapter I | `Chapter I · ¶…`, with the OECD label where there is one | `Chapter I · Example 1 (risk) · ¶1.83, 1.101` |
| Chapter II | `Chapter II · method · ¶…` or `Annex I to Ch.II · Illustration n · ¶…` | `Chapter II · CUP method · ¶2.24` |
| Chapter VI | `Chapter VI · main text · ¶…` | `Chapter VI · main text · ¶6.105` |
| Chapter VII | `Draft (June 2026) · Main text · ¶…` | `Draft (June 2026) · Main text · ¶7.20` |
| Chapter IX | `Ch.IX · ¶…` (existing style) | `Ch.IX · ¶9.94–9.97` |
| Chapter X | `Chapter X · ¶…` (existing style) | `Chapter X · ¶10.184–10.186 · Example 1` |
| Other examples | `Chapter III · ¶…`, `Chapter VIII · ¶…` | `Chapter III · ¶3.19` |

### Themes (sidebar groups)

- **Chapter I:** Contract versus conduct (¶1.44, 1.48, 1.50); Control over risk (¶1.69, 1.70); Economic significance of risk (¶1.74, 1.75); Risk analysis in six steps (¶1.83, 1.84, 1.85, 1.89); Risk-free and risk-adjusted returns (¶1.114 with 1.125, 1.119); Non-recognition (¶1.146, 1.148); Group synergies (¶1.184, 1.187, 1.188, 1.189, 1.190).
- **Chapter II:** CUP method (3); Resale price method (3); Cost plus method (3); Transactional net margin method (2); Gross versus net profit indicators, Annex I (3).
- **Chapter VI:** new group "Use of intangibles in sales and services (main text)" (2).
- **Chapter VII:** ¶7.20 joins "Benefit test"; ¶7.30 joins "Shareholder activity"; new groups "Services and intangibles" (¶7.12, 7.41), "Charging approaches" (¶7.44, 7.48) and "Low value-adding services" (¶7.81, 7.82).
- **Chapter IX:** ¶9.25 joins "Risk reallocation & recognition"; ¶9.46–9.47, 9.49–9.53, 9.67, 9.74 and 9.94–9.97 join "Compensation for the restructuring itself"; ¶9.122–9.124 and 9.130–9.131 join "Post-restructuring TP & location savings".
- **Chapter X:** new groups "Delineating intra-group loans" (¶10.13, 10.25, 10.37), "Financial guarantees" (2) and "Captive insurance" (2).
- **Other examples:** new group "Choosing the tested party (Ch.III)" (¶3.19); ¶8.33 with 8.38 joins "Cost contribution arrangements (Ch.VIII)".

### Labels that tell sources apart

- **Chapter IX:** cases get an optional `origin` field. The eight existing cases are `"inrange-illustration"`; the eight new ones are `"oecd-example"`. The Chapter IX page shows it as a small label beside the reference ("OECD example" or "inRange illustration").
- **Chapter VII:** every reference starts with `Draft (June 2026) · `, including the 21 existing cases. The chapter menu on every page reads "Intra-group services (draft)". The existing "Discussion draft only" banner stays.

## Page changes

1. **Two new pages.** `Chapter1/` and `Chapter2/`, each a copy of `Chapter10/index.html` with its page-specific parts changed (about 25 lines: title, meta and share tags, active menu item, hero, closing call to action, footer source line, share constants, storage key), plus its own `cases.js`, `og-image.svg` and `og-image.png`.
2. **Chapter menu on all eight pages plus the Quiz.** New items I ("The arm's length principle") and II ("Transfer pricing methods") at the start, in both the drop-down menu and the pill row. Counts become: I 20, II 14, VI 33, VII 29, IX 16, X 9, PS 16, Other 9.
3. **Page text where the content changed.** Title, meta description, share tags, hero lead, footer source line and share text for Chapter VI (adds "and two from the main text"), Chapter VII (adds the main-text examples), Chapter IX (no longer "eight curated examples"), Chapter X (no longer only cash pooling) and Other examples (adds Chapters III and VIII main text).
4. **Share images.** New `og-image.svg` and `og-image.png` (2400×1260) for the two new pages; updated ones wherever the image states a count or a scope that changed. PNGs are rendered from the SVGs with the puppeteer install in `deck/`.
5. **Sitemap.** Add `/Chapter1/` and `/Chapter2/`; update `lastmod` on the changed pages.
6. **Quiz.** The pool (`Quiz/quiz_pool.js`, 100 questions today) is generated, and its generator is not in this repository. Rebuild it as `tools/build-quiz-pool.mjs`, prove it reproduces today's file exactly from today's cases, then regenerate with the new cases. Add Chapter I and Chapter II to the chapter map in `Quiz/quiz.js` and correct any stated totals.

## Tooling (in `tools/`, unpublished)

- `validate-cases.mjs`: loads every `cases.js` and checks the shape (required fields, three options, `correctIdx` in range, unique ids, supported `parties.kind`, non-empty strings). Prints the case and scenario count per page, to check against the menu.
- `build-quiz-pool.mjs`: see above.
- `render-og.mjs`: renders each `og-image.svg` to `og-image.png`.

## Quality checks

1. Drafting works from the extracted text of the cited paragraphs.
2. A separate reviewer, who did not write the case, compares each case with its source paragraphs: facts, figures, who does what, the conclusion, and the paragraph reference. Every discrepancy is fixed and re-checked.
3. `validate-cases.mjs` passes for all pages, and its counts match the chapter menu.
4. In a local preview, every page loads without console errors, the sidebar groups and counts are right, a sample of cases per page renders correctly (diagram, options, reveal), the links between pages work, and the layout holds at phone width.
5. The Quiz loads, draws questions from the new chapters, and its end screen links to the new pages.

## Rollout

1. Work on a branch, `oecd-missing-examples`.
2. All pages are completed and checked locally.
3. Aleks looks at the local preview.
4. One push to `main` publishes everything together. Pushing `main` deploys the site, so it happens only on his go-ahead.

## Out of scope

- The MCP connector (resumes after this; see the project notes).
- Making the example pages readable without JavaScript.
- The homepage, which keeps linking to the Chapter VI page as the entry to the walkthrough.
- The seven short illustrations and Amount B.

## Appendix: examples by page

Paragraph numbers are from the 2022 edition, except Chapter VII, which uses the June 2026 draft.

- **Chapter I (21 examples, 20 cases):** ¶1.44; 1.48; 1.50; 1.69; 1.70; 1.74; 1.75; 1.83 (Example 1, with 1.101); 1.84 (Example 2, with 1.91 and 1.102); 1.85 (Example 3, with 1.92, 1.103, 1.106); 1.89; 1.114 with 1.125 (one case); 1.119; 1.146–1.147 (Example 1); 1.148 (Example 2); 1.184–1.186 (Example 1); 1.187 (Example 2); 1.188 (Example 3); 1.189 (Example 4); 1.190–1.193 (Example 5).
- **Chapter II (14):** ¶2.24; 2.25; 2.26; 2.42; 2.43; 2.44; 2.59; 2.60; 2.61; 2.112; 2.113; Annex I Illustrations 1, 2 and 3.
- **Chapter VI (2):** ¶6.105; 6.106.
- **Chapter VII, draft (9 examples, 8 cases):** ¶7.12; 7.20; 7.30; 7.41; 7.44; 7.48; 7.81(a) with 7.81(b) (one case); 7.82.
- **Chapter IX (8):** ¶9.25; 9.46–9.47; 9.49–9.53; 9.67; 9.74; 9.94–9.97; 9.122–9.124; 9.130–9.131.
- **Chapter X (7):** ¶10.13; 10.25; 10.37; 10.184–10.186 (Example 1); 10.187–10.188 (Example 2); 10.223; 10.225–10.226.
- **Other examples (2):** ¶3.19; 8.33 with 8.38.
