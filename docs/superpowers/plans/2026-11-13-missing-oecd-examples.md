# Missing OECD Examples Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the 63 OECD examples that are missing from inrange.nl as 61 new cases: two new pages (Chapter I, Chapter II) and additions to Chapters VI, VII, IX, X and Other examples, then publish everything in one push.

**Architecture:** The site is static. Each example page is a near-identical `index.html` that renders the array in its own `cases.js`. New content is drafted from the extracted text of the Guidelines into fragment files, checked by a separate reviewer, and assembled into the pages' `cases.js`. Small Node scripts in the unpublished `tools/` folder validate the data, set page-specific text, rewrite the chapter menu, render share images and rebuild the Quiz pool.

**Tech Stack:** Plain HTML/CSS/JS (no build step), Node 24 for scripts, Python 3 with PyMuPDF for text extraction (already done), puppeteer from `deck/` for share images.

**Spec:** `docs/superpowers/specs/2026-11-13-missing-oecd-examples-design.md`. **Approved list:** `tools/oecd-missing-examples-inventory.md`.

---

## Ground rules

- Work on branch `oecd-missing-examples` (already created). **Do not push and do not merge to `main`** until Task 16.
- `tools/` is gitignored on purpose: scripts and source text are never committed.
- Shell on this machine is Git Bash on Windows. Two quirks:
  - A Bash heredoc that contains an unbalanced apostrophe fails to parse. Write prose and code files with the Write tool, not with heredocs.
  - Run Python with `-I`, and set `PYTHONIOENCODING=utf-8` when a script prints non-ASCII text.
- Site root in commands: `cd "/c/inRange/inRange Internal/Vibecoding/inRange website"`.
- Never copy OECD wording into the site. Every case is a paraphrase.

## File structure

**Created (published):**

| File | Responsibility |
|---|---|
| `Chapter1/index.html`, `cases.js`, `og-image.svg`, `og-image.png` | New Chapter I page: 20 cases |
| `Chapter2/index.html`, `cases.js`, `og-image.svg`, `og-image.png` | New Chapter II page: 14 cases |

**Modified (published):**

| File | Change |
|---|---|
| `Chapter6/cases.js` | +2 cases (ids 32, 33) |
| `Chapter7/cases.js` | +8 cases (ids 22–29); every `refs` starts with `Draft (June 2026) · ` |
| `Chapter9/cases.js` | +8 cases (ids 9–16); `origin` field on all 16 |
| `Chapter10/cases.js` | +7 cases (ids 3–9) |
| `OtherExamples/cases.js` | +2 cases (ids 8, 9) |
| `Chapter6/`, `Chapter7/`, `Chapter9/`, `Chapter10/`, `OtherExamples/` `index.html` | Page text, chapter menu |
| `Chapter9/index.html` | Also: origin label (CSS and one render line) |
| `ProfitSplit/index.html`, `Quiz/index.html` | Chapter menu only |
| `og-image.svg` and `og-image.png` in `Chapter6/`, `Chapter7/`, `Chapter9/`, `Chapter10/`, `OtherExamples/` | New counts and scope |
| `Quiz/quiz.js` | Chapter map, one sentence |
| `Quiz/quiz_pool.js` | Regenerated |
| `sitemap.xml` | Two new URLs, new dates |

**Created (unpublished, in `tools/`):**

| File | Responsibility |
|---|---|
| `validate-cases.mjs` | Shape check of every `cases.js`; exports `loadCases` |
| `build-quiz-pool.mjs` | Builds `Quiz/quiz_pool.js` |
| `assemble-cases.mjs` | Appends fragment files to a page's `cases.js` |
| `set-page-text.mjs` | Sets page-specific text; creates the two new pages |
| `update-nav.mjs` | Rewrites the chapter menu and pill row on every page |
| `render-og.mjs` | Renders `og-image.svg` to `og-image.png` |
| `show-paras.py`, `show-draft.py` | Print source paragraphs |
| `authoring-guide.md`, `review-guide.md` | Rules for drafting and for checking cases |
| `work/` | Fragment files and review notes |

---

### Task 1: Case validator

**Files:**
- Create: `tools/validate-cases.mjs`

- [ ] **Step 1: Write the validator**

```js
// Checks each example page's cases.js against the shape the pages render.
// Usage: node tools/validate-cases.mjs            all pages that exist
//        node tools/validate-cases.mjs Chapter1   named pages only
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const PAGES = ['Chapter1', 'Chapter2', 'Chapter6', 'Chapter7', 'Chapter9', 'Chapter10', 'ProfitSplit', 'OtherExamples'];

// For each diagram type: the party objects it needs.
const KINDS = {
  'tested-party': ['left', 'right'],
  'three-party-flow': ['first', 'second', 'third'],
  'provider-to-recipients': ['provider'],
  'provider-with-internal-capability': ['provider', 'recipient'],
  'franchise': ['franchisor', 'franchisee'],
  'parent-and-subsidiaries': ['parent', 'subsidiaries'],
  'shareholder-activity': ['parent', 'target'],
  'supplier-association': ['supplier', 'buyer'],
};

export function loadCases(page) {
  const file = path.join(ROOT, page, 'cases.js');
  const sandbox = {};
  new Function('globalThis', readFileSync(file, 'utf8'))(sandbox);
  if (!Array.isArray(sandbox.CASES)) throw new Error(`${page}/cases.js does not set globalThis.CASES to an array`);
  return sandbox.CASES;
}

const isText = v => typeof v === 'string' && v.trim().length > 0;

export function validateCases(cases, page) {
  const errors = [];
  const seen = new Set();
  for (const c of cases) {
    const bad = msg => errors.push(`${page} case ${c.id}: ${msg}`);
    if (!Number.isInteger(c.id) || c.id < 1) bad('id must be a positive integer');
    if (seen.has(c.id)) bad('duplicate id');
    seen.add(c.id);
    for (const k of ['theme', 'themeLabel', 'title', 'refs', 'atGlance', 'takeaway']) if (!isText(c[k])) bad(`missing ${k}`);
    if (c.group !== undefined && !isText(c.group)) bad('group must be text when present');
    if (!Array.isArray(c.timeline) || c.timeline.length < 2 || !c.timeline.every(isText)) bad('timeline needs at least two text items');
    if (!Array.isArray(c.crossRefs) || !c.crossRefs.every(isText)) bad('crossRefs must be a list of text items');
    if (c.parties !== undefined) {
      const need = KINDS[c.parties.kind];
      if (!need) bad(`unsupported parties.kind "${c.parties.kind}"`);
      else {
        for (const k of need) if (!c.parties[k] || !isText(c.parties[k].name)) bad(`parties.${k}.name missing`);
        if (c.parties.kind === 'provider-to-recipients') {
          const r = c.parties.recipients;
          if (!Array.isArray(r) || r.length === 0 || !r.every(x => x && isText(x.name))) bad('parties.recipients must be a non-empty list of named parties');
        }
      }
    }
    if (c.origin !== undefined && !['oecd-example', 'inrange-illustration'].includes(c.origin)) bad(`unknown origin "${c.origin}"`);
    if (!Array.isArray(c.scenarios) || c.scenarios.length === 0) { bad('needs at least one scenario'); continue; }
    const letters = new Set();
    for (const s of c.scenarios) {
      const at = `scenario ${s.letter}`;
      if (!isText(s.letter)) bad('scenario letter missing');
      if (letters.has(s.letter)) bad(`${at}: duplicate letter`);
      letters.add(s.letter);
      for (const k of ['facts', 'question', 'analysis', 'verdict']) if (!isText(s[k])) bad(`${at}: missing ${k}`);
      if (!Array.isArray(s.mcq) || s.mcq.length !== 3 || !s.mcq.every(isText)) bad(`${at}: mcq needs exactly three text options`);
      else if (new Set(s.mcq).size !== 3) bad(`${at}: mcq options must differ`);
      if (![0, 1, 2].includes(s.correctIdx)) bad(`${at}: correctIdx must be 0, 1 or 2`);
    }
    if (c.scenarios.length > 1 && letters.has('—')) bad('a case with several scenarios must letter them A, B, C');
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const named = process.argv.slice(2);
  const pages = named.length ? named : PAGES.filter(p => existsSync(path.join(ROOT, p, 'cases.js')));
  let failed = false;
  for (const page of pages) {
    const cases = loadCases(page);
    const errors = validateCases(cases, page);
    const scenarios = cases.reduce((n, c) => n + (c.scenarios?.length || 0), 0);
    console.log(`${errors.length ? 'FAIL' : 'ok  '} ${page}: ${cases.length} cases, ${scenarios} scenarios`);
    for (const e of errors) console.log('   ' + e);
    if (errors.length) failed = true;
  }
  process.exit(failed ? 1 : 0);
}
```

- [ ] **Step 2: Run it on today's pages**

Run: `cd "/c/inRange/inRange Internal/Vibecoding/inRange website" && node tools/validate-cases.mjs`

Expected:

```
ok   Chapter6: 31 cases, 32 scenarios
ok   Chapter7: 21 cases, 28 scenarios
ok   Chapter9: 8 cases, 10 scenarios
ok   Chapter10: 2 cases, 4 scenarios
ok   ProfitSplit: 16 cases, 18 scenarios
ok   OtherExamples: 7 cases, 8 scenarios
```

If an existing case fails a rule, the rule is wrong, not the case: the pages render that data today. Relax the rule to what the existing data satisfies and note the change in a comment.

---

### Task 2: Quiz pool builder, proven against today's pool

**Files:**
- Create: `tools/build-quiz-pool.mjs`

- [ ] **Step 1: Write the builder**

```js
// Builds Quiz/quiz_pool.js from every example page's cases.js: one question per scenario.
// Usage: node tools/build-quiz-pool.mjs           write Quiz/quiz_pool.js
//        node tools/build-quiz-pool.mjs --check   compare with the file on disk, write nothing
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { loadCases, ROOT } from './validate-cases.mjs';

const OUT = path.join(ROOT, 'Quiz', 'quiz_pool.js');

// The order here is the order of questions in the pool.
const SOURCES = [
  { page: 'Chapter1', source: "Chapter I · The arm's length principle", chapterShort: 'Chapter I' },
  { page: 'Chapter2', source: 'Chapter II · Transfer pricing methods', chapterShort: 'Chapter II' },
  { page: 'Chapter6', source: 'Chapter VI · Intangibles', chapterShort: 'Chapter VI' },
  { page: 'Chapter7', source: 'Chapter VII · Intra-group services', chapterShort: 'Chapter VII' },
  { page: 'Chapter9', source: 'Chapter IX · Business restructurings', chapterShort: 'Chapter IX' },
  { page: 'Chapter10', source: 'Chapter X · Financial transactions', chapterShort: 'Chapter X' },
  { page: 'ProfitSplit', source: 'Profit split', chapterShort: 'Profit split' },
  { page: 'OtherExamples', source: 'Other examples', chapterShort: 'Other examples' },
];

const HEADER =
  '// Generated by tools/build-quiz-pool.mjs — do NOT hand-edit.\n' +
  "// Re-run the script whenever any chapter's cases.js changes.\n";

function buildPool() {
  const pool = [];
  for (const { page, source, chapterShort } of SOURCES) {
    if (!existsSync(path.join(ROOT, page, 'cases.js'))) continue;
    for (const c of loadCases(page)) {
      for (const s of c.scenarios) {
        pool.push({
          id: `${page.toLowerCase()}-c${c.id}-${s.letter === '—' ? 'x' : s.letter}`,
          source,
          chapterShort,
          caseId: c.id,
          caseTitle: c.title,
          timeline: c.timeline,
          facts: s.facts,
          question: s.question,
          mcq: s.mcq,
          correctIdx: s.correctIdx,
          analysis: s.analysis,
          verdict: s.verdict,
        });
      }
    }
  }
  return pool;
}

const pool = buildPool();
const body = 'globalThis.QUIZ_POOL = ' + JSON.stringify(pool, null, 2) + ';\n';

if (process.argv.includes('--check')) {
  // Compare everything from the assignment onwards, ignoring the header comment and line-ending style.
  const disk = readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n');
  const diskBody = disk.slice(disk.indexOf('globalThis.QUIZ_POOL'));
  if (diskBody === body) {
    console.log(`identical: ${pool.length} questions`);
  } else {
    const a = diskBody.split('\n'), b = body.split('\n');
    const i = a.findIndex((line, n) => line !== b[n]);
    console.log(`DIFFERENT at line ${i + 1} of the body\n  disk : ${a[i]}\n  built: ${b[i]}`);
    process.exit(1);
  }
} else {
  writeFileSync(OUT, HEADER + body);
  console.log(`wrote Quiz/quiz_pool.js: ${pool.length} questions`);
}
```

- [ ] **Step 2: Prove it reproduces today's pool**

Run: `node tools/build-quiz-pool.mjs --check`

Expected: `identical: 100 questions`

If it reports a difference, read the two lines it prints, fix the builder (field order, id scheme or number formatting) and re-run. Do not continue until it is identical: this is the only evidence that the rebuilt generator matches the lost one.

---

### Task 3: Source helpers, guides and the fragment assembler

**Files:**
- Create: `tools/show-paras.py`, `tools/show-draft.py`, `tools/assemble-cases.mjs`, `tools/authoring-guide.md`, `tools/review-guide.md`, `tools/work/` (folder)

- [ ] **Step 1: Write `tools/show-paras.py`**

```python
"""Print paragraphs of the 2022 Guidelines from tools/oecd-tpg-2022-text/paras.json.

Usage: python -I tools/show-paras.py "Ch I" 1.83,1.101
       python -I tools/show-paras.py "Ch IX" 9.94-9.97
       python -I tools/show-paras.py "Annex I Ch II" 1-5

Sections: "Ch I" ... "Ch X", "Annex I Ch II", "Annex II Ch II", "Annex Ch III",
"Annex I Ch VI", "Annex II Ch VI", "Annex Ch VIII".
"""
import json
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")
here = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(here, "oecd-tpg-2022-text", "paras.json"), encoding="utf-8") as f:
    paras = json.load(f)

section, spec = sys.argv[1], sys.argv[2]
wanted = []
for part in spec.split(","):
    if "-" in part:
        a, b = part.split("-")
        prefix = a.rsplit(".", 1)[0] + "." if "." in a else ""
        lo, hi = int(a.rsplit(".", 1)[-1]), int(b.rsplit(".", 1)[-1])
        wanted += [f"{prefix}{n}" for n in range(lo, hi + 1)]
    else:
        wanted.append(part)

seen = set()
for p in paras:
    key = (p["num"], p["page"])
    if p["section"] == section and p["num"] in wanted and key not in seen:
        seen.add(key)
        head = f" [{p['heading']}]" if p["heading"] else ""
        print(f"¶{p['num']} (PDF page {p['page']}){head}\n{p['text']}\n")
```

- [ ] **Step 2: Write `tools/show-draft.py`**

```python
"""Print paragraphs of the June 2026 Chapter VII discussion draft.

Usage: python -I tools/show-draft.py 7.20 7.30 7.81 7.82
"""
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
here = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(here, "ch7-draft-2026-text", "tpg2022.txt"), encoding="utf-8") as f:
    text = f.read().replace(" ", " ")

# Main text only: from PDF page 6 up to Annex I (PDF page 32).
start = text.index("=== PAGE 6 ===")
end = text.index("=== PAGE 32 ===")
body = text[start:end]

marks = [(m.group(1), m.start()) for m in re.finditer(r"(?m)^(?:[A-Z]\. )?(7\.\d+)\.\s", body)]
for want in sys.argv[1:]:
    hits = [i for i, (num, _) in enumerate(marks) if num == want]
    if not hits:
        print(f"¶{want}: not found\n")
        continue
    i = hits[0]
    stop = marks[i + 1][1] if i + 1 < len(marks) else len(body)
    chunk = re.sub(r"\s+", " ", body[marks[i][1]:stop]).strip()
    print(f"¶{want} (draft)\n{chunk}\n")
```

- [ ] **Step 3: Check both helpers**

Run: `PYTHONIOENCODING=utf-8 python -I tools/show-paras.py "Ch I" 1.83 | head -3`
Expected: a line starting `¶1.83 (PDF page 61) [Example 1]`, then text starting `Company A seeks to pursue a development opportunity`.

Run: `PYTHONIOENCODING=utf-8 python -I tools/show-draft.py 7.20 | head -2`
Expected: `¶7.20 (draft)`, then text starting `7.20. For example, assume Parent Co, located in Country A`.

- [ ] **Step 4: Write `tools/assemble-cases.mjs`**

```js
// Appends the case objects in one or more fragment files to <page>/cases.js.
// A fragment file holds object literals separated by commas, nothing else.
// For a page with no cases.js yet, the file is created with the header below.
// Usage: node tools/assemble-cases.mjs Chapter1 tools/work/ch1-a.fragment.js tools/work/ch1-b.fragment.js
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT, validateCases } from './validate-cases.mjs';

const [page, ...fragmentFiles] = process.argv.slice(2);
if (!page || !fragmentFiles.length) {
  console.error('Usage: node tools/assemble-cases.mjs <Page> <fragment.js> [more fragments]');
  process.exit(1);
}

const fragments = fragmentFiles.map(f => readFileSync(path.resolve(ROOT, f), 'utf8').replace(/\r\n/g, '\n').trim().replace(/,\s*$/, ''));
const added = fragments.flatMap(src => new Function(`return [${src}\n];`)());

const file = path.join(ROOT, page, 'cases.js');
const header =
  '// Single source of truth for the case content rendered on the page.\n' +
  '// Each case must match the shape validated by tools/validate-cases.mjs.\n\n';

let existing = [];
let text;
if (existsSync(file)) {
  text = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const sandbox = {};
  new Function('globalThis', text)(sandbox);
  existing = sandbox.CASES;
  const clash = added.filter(c => existing.some(e => e.id === c.id)).map(c => c.id);
  if (clash.length) {
    console.error(`${page}: ids already present: ${clash.join(', ')}. Nothing written.`);
    process.exit(1);
  }
}

const errors = validateCases([...existing, ...added], page);
if (errors.length) {
  console.error(errors.join('\n'));
  console.error('Nothing written.');
  process.exit(1);
}

const block = fragments.join(',\n\n');
if (text === undefined) {
  text = `${header}globalThis.CASES = [\n\n${block}\n\n];\n`;
} else {
  const end = text.lastIndexOf('];');
  if (end === -1) throw new Error(`${page}/cases.js: closing "];" not found`);
  const head = text.slice(0, end).replace(/[\s,]*$/, '');
  text = `${head},\n\n${block}\n\n];\n`;
}
writeFileSync(file, text);
console.log(`${page}/cases.js: ${existing.length} + ${added.length} = ${existing.length + added.length} cases`);
```

- [ ] **Step 5: Write `tools/authoring-guide.md`**

```markdown
# Writing a case from an OECD example

You are turning one example from the OECD Transfer Pricing Guidelines into one "case" for inrange.nl.
The readers are transfer pricing practitioners. The case must be accurate first, clear second.

## Before you write

1. Print the source paragraphs and read them in full:
   - 2022 Guidelines: `PYTHONIOENCODING=utf-8 python -I tools/show-paras.py "Ch I" 1.83,1.101`
   - Chapter VII draft: `PYTHONIOENCODING=utf-8 python -I tools/show-draft.py 7.20`
   - Tables do not survive paragraph splitting. For a table (Annex I to Chapter II, ¶9.46) read the page text in
     `tools/oecd-tpg-2022-text/tpg2022.txt` between the `=== PAGE n ===` markers.
   - Ignore page furniture inside the text ("OECD TRANSFER PRICING GUIDELINES © OECD 2022 ...") and footnote text
     that has been pulled into the paragraph.
2. Read `Chapter10/cases.js` (two cases, with scenarios) and the first case in `Chapter6/cases.js`. Match their
   length, tone and level of detail.

## The object

```js
{
  id: 1,                               // given to you; do not choose it
  theme: "risk-steps",                 // given to you
  themeLabel: "Risk analysis in six steps", // given to you
  title: "Outsourced research under the hirer's control",
  group: "Company A · Company B",      // the parties or the setting, a few words
  refs: "Chapter I · Example 1 (risk) · ¶1.83, 1.101", // format given to you
  atGlance: "…",
  parties: { kind: "tested-party", left: { name: "…", role: "…" }, right: { name: "…", role: "…" }, arrowLabel: "…" },
  timeline: ["…", "…", "…"],
  scenarios: [
    { letter: "—", facts: "…", question: "…", mcq: ["…", "…", "…"], correctIdx: 0, analysis: "…", verdict: "…" }
  ],
  takeaway: "…",
  crossRefs: ["…"]
}
```

Field by field:

- **title**: what the case is about, in under 60 characters. No example number.
- **atGlance**: two or three sentences that set the scene and end with the question the example answers.
  About 250 to 350 characters.
- **parties**: optional. Leave it out when the example has no identifiable parties. Each party is
  `{ name, role }`; `role` is a few words separated by " · ". Supported kinds and what each needs:
  - `tested-party`: `left`, `right`, `arrowLabel` (what flows from left to right)
  - `three-party-flow`: `first`, `second`, `third`, `label1`, `label2`
  - `provider-to-recipients`: `provider`, `recipients` (a list), `arrowLabel`
  - `provider-with-internal-capability`: `provider`, `recipient`
  - `parent-and-subsidiaries`: `parent`, `subsidiaries` (one party object), `arrowLabel`
  - `shareholder-activity`: `parent`, `target`, `arrowLabel`
  - `supplier-association`: `supplier`, `buyer`, optional `group`, `arrowLabel`
  - `franchise`: `franchisor`, `franchisee`
  Any kind may carry `note`: one short line shown under the diagram.
- **timeline**: three to five facts in the order they happen. Facts only, no conclusions.
- **scenarios**: one scenario with `letter: "—"` unless the Guidelines vary the facts. Then use `"A"`, `"B"`, `"C"`,
  one per variation, each with its own facts, question, options, analysis and verdict.
  - **facts**: one to three sentences with the facts that decide the answer.
  - **question**: one question.
  - **mcq**: exactly three options of similar length, each one sentence. The first is the correct one
    (`correctIdx: 0`; the page shuffles them). The two wrong ones must be positions a practitioner could
    plausibly take, and clearly wrong on the text: for example respecting the contract when conduct differs,
    or giving the legal owner the whole return.
  - **analysis**: two to five sentences giving the OECD's reasoning and conclusion in your own words.
  - **verdict**: a label of at most five words.
- **takeaway**: one or two sentences with the general lesson.
- **crossRefs**: one to three pointers, such as a section of the Guidelines the example applies or a related
  example. Use only cross-references the source itself makes, or the section the example sits in.

## Rules that are not negotiable

1. **Nothing from memory.** Every fact, number, party name and conclusion comes from the paragraphs you printed.
   If the source does not say it, the case does not say it.
2. **Your own words.** Paraphrase throughout. Never reproduce a sentence of the Guidelines.
3. **Keep the hedges.** Where the source says "may", "generally" or "depending on the facts", the case does too.
   Where the source leaves the answer open, the analysis says the answer is open and why.
4. **Names as in the source.** "Company A" stays "Company A".
5. **British spelling**, as on the existing pages: licence (noun), centralise, arm's-length.
6. **Plain JavaScript object literals**: double-quoted strings, no template literals, no computed values,
   no trailing commentary. Escape a double quote inside a string as `\"`.

## Output

Write only the object literals, separated by commas, to the fragment file you were given
(`tools/work/<name>.fragment.js`). No `globalThis.CASES =`, no surrounding brackets.
Then check the fragment parses:

`node -e "const s=require('fs').readFileSync(process.argv[1],'utf8'); const a=new Function('return ['+s+'\n];')(); console.log(a.length+' cases: '+a.map(c=>c.id).join(', '))" tools/work/<name>.fragment.js`
```

- [ ] **Step 6: Write `tools/review-guide.md`**

```markdown
# Checking a case against its source

You did not write these cases. Your job is to find where a case departs from the Guidelines.
Assume there are errors until you have looked.

For each case in the fragment:

1. Print the paragraphs named in `refs` with `tools/show-paras.py` or `tools/show-draft.py`
   (see `tools/authoring-guide.md` for usage) and read them in full.
2. Check, in this order:
   - **Reference**: do the paragraph numbers in `refs` contain this example, and nothing is missing?
   - **Facts**: is every fact in `atGlance`, `parties`, `timeline` and each scenario's `facts` in the source?
     List anything added, changed or dropped that matters.
   - **Numbers**: every figure, percentage, rating, currency and duration matches the source exactly.
   - **Who does what**: no party's role, ownership or risk has been swapped or blurred.
   - **Conclusion**: `analysis`, `verdict` and `takeaway` say what the source concludes, with the same
     strength. A "may" in the source must not become a "must".
   - **Correct option**: `mcq[correctIdx]` is what the source supports. The other two are wrong on the
     source, and neither is arguably right.
   - **Wording**: no sentence is lifted from the source.
3. Write your findings to the notes file you were given, one block per case:

   `Case <id> — OK` or
   `Case <id> — <field>: <what is wrong> | source says: <short paraphrase with ¶ number> | fix: <replacement text>`

Report every departure that could mislead a practitioner. Do not report matters of taste.
Do not edit the fragment yourself.
```

- [ ] **Step 7: Create the work folder**

Run: `mkdir -p tools/work && ls tools`
Expected: the listing includes `work`, `authoring-guide.md`, `review-guide.md`, `assemble-cases.mjs`, `show-paras.py`, `show-draft.py`.

---

### Task 4: Draft, review and assemble Chapter I (20 cases)

**Files:**
- Create: `tools/work/ch1-a.fragment.js`, `tools/work/ch1-b.fragment.js`, `tools/work/ch1-a.review.md`, `tools/work/ch1-b.review.md`
- Create: `Chapter1/cases.js` (by the assembler; the folder is created in Task 9 if it does not exist yet, so create it here with `mkdir -p Chapter1`)

Case list. Every case uses refs in the form shown; theme codes and labels are fixed.

| id | theme | themeLabel | Source (section "Ch I") | refs |
|---|---|---|---|---|
| 1 | `contract-conduct` | Contract versus conduct | 1.44 | `Chapter I · ¶1.44` |
| 2 | `contract-conduct` | Contract versus conduct | 1.48 | `Chapter I · ¶1.48` |
| 3 | `contract-conduct` | Contract versus conduct | 1.50 | `Chapter I · ¶1.50` |
| 4 | `control` | Control over risk | 1.69 | `Chapter I · ¶1.69` |
| 5 | `control` | Control over risk | 1.70 | `Chapter I · ¶1.70` |
| 6 | `risk-significance` | Economic significance of risk | 1.73,1.74 | `Chapter I · ¶1.74` |
| 7 | `risk-significance` | Economic significance of risk | 1.73,1.75 | `Chapter I · ¶1.75` |
| 8 | `risk-steps` | Risk analysis in six steps | 1.83,1.101 | `Chapter I · Example 1 (risk) · ¶1.83, 1.101` |
| 9 | `risk-steps` | Risk analysis in six steps | 1.84,1.91,1.102 | `Chapter I · Example 2 (risk) · ¶1.84, 1.91, 1.102` |
| 10 | `risk-steps` | Risk analysis in six steps | 1.85,1.92,1.103,1.106 | `Chapter I · Example 3 (risk) · ¶1.85, 1.92, 1.103, 1.106` |
| 11 | `risk-steps` | Risk analysis in six steps | 1.88,1.89 | `Chapter I · ¶1.89` |
| 12 | `funding-returns` | Risk-free and risk-adjusted returns | 1.108-1.116,1.125 | `Chapter I · ¶1.114, 1.125` |
| 13 | `funding-returns` | Risk-free and risk-adjusted returns | 1.117-1.120 | `Chapter I · ¶1.119` |
| 14 | `non-recognition` | Non-recognition | 1.142-1.147 | `Chapter I · Example 1 (non-recognition) · ¶1.146–1.147` |
| 15 | `non-recognition` | Non-recognition | 1.142-1.145,1.148 | `Chapter I · Example 2 (non-recognition) · ¶1.148` |
| 16 | `group-synergies` | Group synergies | 1.177-1.186 | `Chapter I · Example 1 (synergies) · ¶1.184–1.186` |
| 17 | `group-synergies` | Group synergies | 1.184-1.187 | `Chapter I · Example 2 (synergies) · ¶1.187` |
| 18 | `group-synergies` | Group synergies | 1.180-1.182,1.188 | `Chapter I · Example 3 (synergies) · ¶1.188` |
| 19 | `group-synergies` | Group synergies | 1.188,1.189 | `Chapter I · Example 4 (synergies) · ¶1.189` |
| 20 | `group-synergies` | Group synergies | 1.190-1.193 | `Chapter I · Example 5 (synergies) · ¶1.190–1.193` |

Notes for the drafter:
- Case 9 has two scenarios: A is the example as given in ¶1.84 with its consequence in ¶1.102; B is the variation in ¶1.91.
- Case 10 has two scenarios: A is who bears the utilisation risk and what Company A earns (¶1.85, 1.92, 1.103); B is the unexpected destruction of the asset (¶1.106).
- Case 12 has two scenarios: A is the risk-free return of ¶1.114; B is the risk-adjusted return of ¶1.125. Read ¶1.108–1.116 for context.
- Where the source list includes paragraphs beyond those in `refs`, they are context: read them, but the case is about the paragraphs in `refs`.
- The heading shown for ¶1.187 by `show-paras.py` reads "Example 24". It is Example 2; the "4" is a footnote mark.

- [ ] **Step 1: Draft cases 1–11** into `tools/work/ch1-a.fragment.js`, following `tools/authoring-guide.md`.

- [ ] **Step 2: Draft cases 12–20** into `tools/work/ch1-b.fragment.js`, following `tools/authoring-guide.md`.

- [ ] **Step 3: Check both fragments parse**

Run for each file: `node -e "const s=require('fs').readFileSync(process.argv[1],'utf8'); const a=new Function('return ['+s+'\n];')(); console.log(a.length+' cases: '+a.map(c=>c.id).join(', '))" tools/work/ch1-a.fragment.js`

Expected: `11 cases: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11` and, for the second file, `9 cases: 12, 13, 14, 15, 16, 17, 18, 19, 20`.

- [ ] **Step 4: Independent review.** A reviewer who did not draft the fragment follows `tools/review-guide.md` and writes `tools/work/ch1-a.review.md` and `tools/work/ch1-b.review.md`.

- [ ] **Step 5: Apply every finding** to the fragments. For each finding, re-read the cited paragraph before changing the text. If a finding is wrong, record why in the review file under the finding.

- [ ] **Step 6: Assemble**

Run: `mkdir -p Chapter1 && node tools/assemble-cases.mjs Chapter1 tools/work/ch1-a.fragment.js tools/work/ch1-b.fragment.js && node tools/validate-cases.mjs Chapter1`

Expected: `Chapter1/cases.js: 0 + 20 = 20 cases`, then `ok   Chapter1: 20 cases, 23 scenarios`.

- [ ] **Step 7: Commit**

```bash
git add Chapter1/cases.js
git commit -m "Chapter I: 20 cases from the main text of the Guidelines" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 5: Draft, review and assemble Chapter II (14 cases)

**Files:**
- Create: `tools/work/ch2.fragment.js`, `tools/work/ch2.review.md`, `Chapter2/cases.js`

| id | theme | themeLabel | Source | refs |
|---|---|---|---|---|
| 1 | `cup` | CUP method | "Ch II" 2.23,2.24 | `Chapter II · CUP method · ¶2.24` |
| 2 | `cup` | CUP method | "Ch II" 2.25 | `Chapter II · CUP method · ¶2.25` |
| 3 | `cup` | CUP method | "Ch II" 2.26 | `Chapter II · CUP method · ¶2.26` |
| 4 | `resale-price` | Resale price method | "Ch II" 2.42 | `Chapter II · Resale price method · ¶2.42` |
| 5 | `resale-price` | Resale price method | "Ch II" 2.43 | `Chapter II · Resale price method · ¶2.43` |
| 6 | `resale-price` | Resale price method | "Ch II" 2.44 | `Chapter II · Resale price method · ¶2.44` |
| 7 | `cost-plus` | Cost plus method | "Ch II" 2.59 | `Chapter II · Cost plus method · ¶2.59` |
| 8 | `cost-plus` | Cost plus method | "Ch II" 2.60 | `Chapter II · Cost plus method · ¶2.60` |
| 9 | `cost-plus` | Cost plus method | "Ch II" 2.61 | `Chapter II · Cost plus method · ¶2.61` |
| 10 | `tnmm` | Transactional net margin method | "Ch II" 2.44,2.111,2.112 | `Chapter II · TNMM · ¶2.112` |
| 11 | `tnmm` | Transactional net margin method | "Ch II" 2.42,2.113 | `Chapter II · TNMM · ¶2.113` |
| 12 | `gross-net` | Gross versus net profit indicators (Annex I) | "Annex I Ch II" 1-2 and PDF pages 463–464 | `Annex I to Ch.II · Illustration 1 · ¶1–2` |
| 13 | `gross-net` | Gross versus net profit indicators (Annex I) | "Annex I Ch II" 3 and PDF pages 464–465 | `Annex I to Ch.II · Illustration 2 · ¶3` |
| 14 | `gross-net` | Gross versus net profit indicators (Annex I) | "Annex I Ch II" 4-5 and PDF pages 466–467 | `Annex I to Ch.II · Illustration 3 · ¶4–5` |

Notes for the drafter:
- Cases 12–14 rest on tables. Read the tables in `tools/oecd-tpg-2022-text/tpg2022.txt` (pages 463–467) and put the figures that matter into `timeline` and `facts` as text. Check every figure twice.
- Cases 10 and 11 are variations on cases 6 and 4. Say so in `crossRefs`, and restate the base facts so each case stands alone.

- [ ] **Step 1: Draft cases 1–14** into `tools/work/ch2.fragment.js`, following `tools/authoring-guide.md`.

- [ ] **Step 2: Check the fragment parses** (command as in Task 4, Step 3). Expected: `14 cases: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14`.

- [ ] **Step 3: Independent review** into `tools/work/ch2.review.md`, following `tools/review-guide.md`.

- [ ] **Step 4: Apply every finding**, as in Task 4, Step 5.

- [ ] **Step 5: Assemble**

Run: `mkdir -p Chapter2 && node tools/assemble-cases.mjs Chapter2 tools/work/ch2.fragment.js && node tools/validate-cases.mjs Chapter2`

Expected: `Chapter2/cases.js: 0 + 14 = 14 cases`, then `ok   Chapter2: 14 cases, 14 scenarios`.

- [ ] **Step 6: Commit**

```bash
git add Chapter2/cases.js
git commit -m "Chapter II: 14 cases on the CUP, resale price, cost plus and net margin methods" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 6: Draft, review and assemble the Chapter X additions (7 cases)

**Files:**
- Create: `tools/work/ch10.fragment.js`, `tools/work/ch10.review.md`
- Modify: `Chapter10/cases.js` (append ids 3–9)

| id | theme | themeLabel | Source (section "Ch X") | refs |
|---|---|---|---|---|
| 3 | `loans` | Delineating intra-group loans | 10.12,10.13 | `Chapter X · ¶10.13` |
| 4 | `loans` | Delineating intra-group loans | 10.24,10.25 | `Chapter X · ¶10.25` |
| 5 | `loans` | Delineating intra-group loans | 10.36,10.37 | `Chapter X · ¶10.37` |
| 6 | `guarantees` | Financial guarantees | 10.183-10.186 | `Chapter X · ¶10.184–10.186 · Example 1` |
| 7 | `guarantees` | Financial guarantees | 10.184-10.188 | `Chapter X · ¶10.187–10.188 · Example 2` |
| 8 | `captive-insurance` | Captive insurance | 10.222,10.223 | `Chapter X · ¶10.223` |
| 9 | `captive-insurance` | Captive insurance | 10.224-10.226 | `Chapter X · ¶10.225–10.226` |

- [ ] **Step 1: Draft cases 3–9** into `tools/work/ch10.fragment.js`, following `tools/authoring-guide.md`.

- [ ] **Step 2: Check the fragment parses.** Expected: `7 cases: 3, 4, 5, 6, 7, 8, 9`.

- [ ] **Step 3: Independent review** into `tools/work/ch10.review.md`.

- [ ] **Step 4: Apply every finding.**

- [ ] **Step 5: Assemble**

Run: `node tools/assemble-cases.mjs Chapter10 tools/work/ch10.fragment.js && node tools/validate-cases.mjs Chapter10`

Expected: `Chapter10/cases.js: 2 + 7 = 9 cases`, then `ok   Chapter10: 9 cases, 11 scenarios`.

- [ ] **Step 6: Commit**

```bash
git add Chapter10/cases.js
git commit -m "Chapter X: seven more cases on loans, guarantees and captive insurance" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 7: Chapter IX additions (8 cases) and the origin field

**Files:**
- Create: `tools/work/ch9.fragment.js`, `tools/work/ch9.review.md`
- Modify: `Chapter9/cases.js` (origin on ids 1–8; append ids 9–16)

Every new Chapter IX case carries `origin: "oecd-example"` directly after `refs`.

| id | theme | themeLabel | Source (section "Ch IX") | refs |
|---|---|---|---|---|
| 9 | `risk-and-recognition` | Risk reallocation & recognition | 9.24-9.26 | `Ch.IX · ¶9.25` |
| 10 | `compensation-for-restructuring` | Compensation for the restructuring itself | 9.45-9.47 and PDF pages 375–376 | `Ch.IX · ¶9.46–9.47` |
| 11 | `compensation-for-restructuring` | Compensation for the restructuring itself | 9.49-9.53 | `Ch.IX · ¶9.49–9.53` |
| 12 | `compensation-for-restructuring` | Compensation for the restructuring itself | 9.66,9.67 | `Ch.IX · ¶9.67` |
| 13 | `compensation-for-restructuring` | Compensation for the restructuring itself | 9.73,9.74 | `Ch.IX · ¶9.74` |
| 14 | `compensation-for-restructuring` | Compensation for the restructuring itself | 9.93-9.97 | `Ch.IX · ¶9.94–9.97` |
| 15 | `post-restructuring` | Post-restructuring TP & location savings | 9.121-9.124 | `Ch.IX · ¶9.122–9.124` |
| 16 | `post-restructuring` | Post-restructuring TP & location savings | 9.126,9.127,9.130,9.131 | `Ch.IX · ¶9.130–9.131` |

Notes for the drafter:
- Case 10 has three scenarios, A, B and C, one per column of the table in ¶9.46 (PDF pages 375–376). Read the table from `tpg2022.txt` and check each percentage twice. The Guidelines say the example illustrates the distributor's perspective only; say so in the analysis.
- Case 16 must not repeat the clothing example in ¶9.128–9.129, which is existing case 8.

- [ ] **Step 1: Mark the eight existing cases as inRange illustrations**

Run: `sed -i 's/^\(    refs: "Ch\.IX [^\r]*",\)\(\r\?\)$/\1\2\n    origin: "inrange-illustration",\2/' Chapter9/cases.js && grep -c 'origin: "inrange-illustration"' Chapter9/cases.js && node tools/validate-cases.mjs Chapter9`

Expected: `8`, then `ok   Chapter9: 8 cases, 10 scenarios`. If the count is not 8, run `git checkout Chapter9/cases.js`, look at how the `refs` lines are indented (`grep -n "refs:" Chapter9/cases.js`), correct the pattern and re-run.

- [ ] **Step 2: Draft cases 9–16** into `tools/work/ch9.fragment.js`, following `tools/authoring-guide.md`.

- [ ] **Step 3: Check the fragment parses.** Expected: `8 cases: 9, 10, 11, 12, 13, 14, 15, 16`.

- [ ] **Step 4: Independent review** into `tools/work/ch9.review.md`.

- [ ] **Step 5: Apply every finding.**

- [ ] **Step 6: Assemble**

Run: `node tools/assemble-cases.mjs Chapter9 tools/work/ch9.fragment.js && node tools/validate-cases.mjs Chapter9 && grep -c 'origin: "oecd-example"' Chapter9/cases.js`

Expected: `Chapter9/cases.js: 8 + 8 = 16 cases`, then `ok   Chapter9: 16 cases, 20 scenarios`, then `8`.

- [ ] **Step 7: Commit**

```bash
git add Chapter9/cases.js
git commit -m "Chapter IX: eight OECD worked examples; mark each case as OECD example or inRange illustration" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 8: Chapter VII additions from the draft (8 cases) and the draft prefix

**Files:**
- Create: `tools/work/ch7.fragment.js`, `tools/work/ch7.review.md`
- Modify: `Chapter7/cases.js` (refs prefix on ids 1–21; append ids 22–29)

Sources are paragraphs of the June 2026 draft; print them with `tools/show-draft.py`.

| id | theme | themeLabel | Source (draft) | refs |
|---|---|---|---|---|
| 22 | `services-and-intangibles` | Services and intangibles | 7.11 7.12 | `Draft (June 2026) · Main text · ¶7.12` |
| 23 | `benefit-test` | Benefit test | 7.19 7.20 | `Draft (June 2026) · Main text · ¶7.20` |
| 24 | `shareholder` | Shareholder activity | 7.29 7.30 | `Draft (June 2026) · Main text · ¶7.30` |
| 25 | `services-and-intangibles` | Services and intangibles | 7.40 7.41 | `Draft (June 2026) · Main text · ¶7.41` |
| 26 | `charging` | Charging approaches | 7.43 7.44 7.45 | `Draft (June 2026) · Main text · ¶7.44` |
| 27 | `charging` | Charging approaches | 7.47 7.48 | `Draft (June 2026) · Main text · ¶7.48` |
| 28 | `low-value-adding` | Low value-adding services | 7.80 7.81 | `Draft (June 2026) · Main text · ¶7.81` |
| 29 | `low-value-adding` | Low value-adding services | 7.82 | `Draft (June 2026) · Main text · ¶7.82` |

Notes for the drafter:
- Case 28 has two scenarios: A is the shoe manufacturer in ¶7.81(a); B is Company X in ¶7.81(b).
- These come from a discussion draft. Write "the draft" where an existing page would write "the Guidelines".
- Before choosing `theme` codes for cases 23 and 24, confirm the existing codes with `grep -o 'theme: "[^"]*"' Chapter7/cases.js | sort | uniq -c`. Use the existing code for "Benefit test" and for "Shareholder activity" exactly as they appear there.

- [ ] **Step 1: Add the draft prefix to the 21 existing references**

Run: `sed -i 's/refs: "Annex I · /refs: "Draft (June 2026) · Annex I · /' Chapter7/cases.js && grep -c 'refs: "Draft (June 2026) · Annex I · ' Chapter7/cases.js && node tools/validate-cases.mjs Chapter7`

Expected: `21`, then `ok   Chapter7: 21 cases, 28 scenarios`. If the count is not 21, list the references that did not match with `grep -n 'refs: "' Chapter7/cases.js | grep -v "Draft (June 2026)"` and prefix each by hand.

- [ ] **Step 2: Draft cases 22–29** into `tools/work/ch7.fragment.js`, following `tools/authoring-guide.md`.

- [ ] **Step 3: Check the fragment parses.** Expected: `8 cases: 22, 23, 24, 25, 26, 27, 28, 29`.

- [ ] **Step 4: Independent review** into `tools/work/ch7.review.md`.

- [ ] **Step 5: Apply every finding.**

- [ ] **Step 6: Assemble**

Run: `node tools/assemble-cases.mjs Chapter7 tools/work/ch7.fragment.js && node tools/validate-cases.mjs Chapter7`

Expected: `Chapter7/cases.js: 21 + 8 = 29 cases`, then `ok   Chapter7: 29 cases, 37 scenarios`.

- [ ] **Step 7: Commit**

```bash
git add Chapter7/cases.js
git commit -m "Chapter VII: eight main-text examples from the June 2026 draft; label every reference as draft" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 9: Chapter VI (2 cases) and Other examples (2 cases)

**Files:**
- Create: `tools/work/ch6.fragment.js`, `tools/work/other.fragment.js`, `tools/work/ch6-other.review.md`
- Modify: `Chapter6/cases.js` (append ids 32, 33), `OtherExamples/cases.js` (append ids 8, 9)

| Page | id | theme | themeLabel | Source | refs |
|---|---|---|---|---|---|
| Chapter6 | 32 | `main-text` | Use of intangibles in sales and services (main text) | "Ch VI" 6.104,6.105 | `Chapter VI · main text · ¶6.105` |
| Chapter6 | 33 | `main-text` | Use of intangibles in sales and services (main text) | "Ch VI" 6.104,6.106 | `Chapter VI · main text · ¶6.106` |
| OtherExamples | 8 | `tested-party` | Choosing the tested party (Ch.III) | "Ch III" 3.18,3.19 | `Chapter III · ¶3.19` |
| OtherExamples | 9 | `cost-contribution` | Cost contribution arrangements (Ch.VIII) | "Ch VIII" 8.32-8.38 | `Chapter VIII · ¶8.33, 8.38` |

- [ ] **Step 1: Draft Chapter VI cases 32–33** into `tools/work/ch6.fragment.js` and **Other examples cases 8–9** into `tools/work/other.fragment.js`, following `tools/authoring-guide.md`.

- [ ] **Step 2: Check both fragments parse.** Expected: `2 cases: 32, 33` and `2 cases: 8, 9`.

- [ ] **Step 3: Independent review** of both into `tools/work/ch6-other.review.md`.

- [ ] **Step 4: Apply every finding.**

- [ ] **Step 5: Assemble**

Run: `node tools/assemble-cases.mjs Chapter6 tools/work/ch6.fragment.js && node tools/assemble-cases.mjs OtherExamples tools/work/other.fragment.js && node tools/validate-cases.mjs`

Expected, among the lines printed: `Chapter6/cases.js: 31 + 2 = 33 cases`, `OtherExamples/cases.js: 7 + 2 = 9 cases`, and a final table with

```
ok   Chapter1: 20 cases, 23 scenarios
ok   Chapter2: 14 cases, 14 scenarios
ok   Chapter6: 33 cases, 34 scenarios
ok   Chapter7: 29 cases, 37 scenarios
ok   Chapter9: 16 cases, 20 scenarios
ok   Chapter10: 9 cases, 11 scenarios
ok   ProfitSplit: 16 cases, 18 scenarios
ok   OtherExamples: 9 cases, 10 scenarios
```

That is 146 cases and 167 scenarios.

- [ ] **Step 6: Commit**

```bash
git add Chapter6/cases.js OtherExamples/cases.js
git commit -m "Chapter VI and Other examples: four cases from the main text of Chapters III, VI and VIII" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 10: Page text, and the two new pages

**Files:**
- Create: `tools/set-page-text.mjs`, `Chapter1/index.html`, `Chapter2/index.html`
- Modify: `Chapter6/index.html`, `Chapter7/index.html`, `Chapter9/index.html`, `Chapter10/index.html`, `OtherExamples/index.html`

- [ ] **Step 1: Write `tools/set-page-text.mjs`**

```js
// Sets the page-specific text of the example pages from the table below.
// Chapter1/ and Chapter2/ are created as copies of Chapter10/index.html when they have no index.html yet.
// Usage: node tools/set-page-text.mjs            every page in the table
//        node tools/set-page-text.mjs Chapter9   named pages only
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './validate-cases.mjs';

const SITE = 'https://www.inrange.nl';
const OECD = 'https://www.oecd.org/en/publications/oecd-transfer-pricing-guidelines-for-multinational-enterprises-and-tax-administrations-2022_0e655865-en.html';
const SOURCE = `<br>Source: <a href="${OECD}" target="_blank" rel="noreferrer">OECD Transfer Pricing Guidelines (2022)</a>.`;
const TPG = 'OECD Transfer Pricing Guidelines for Multinational Enterprises and Tax Administrations (2022 edition)';

// Only the keys present for a page are changed. `isNew` pages also get their own URLs and storage key.
const TEXT = {
  Chapter1: {
    isNew: true,
    title: "OECD Chapter I — the arm's length principle: 20 examples",
    description: "An interactive walkthrough of the 20 examples in Chapter I of the OECD Transfer Pricing Guidelines (2022): contract versus conduct, control over risk, the six-step risk analysis, risk-free and risk-adjusted returns, non-recognition and group synergies.",
    shortDescription: 'The 20 examples in Chapter I of the OECD TP Guidelines (2022): contracts, risk, non-recognition and group synergies.',
    imageAlt: "OECD Chapter I — Interactive walkthrough of the arm's length principle examples. An inRange page.",
    eyebrow: 'OECD Chapter I · TPG 2022',
    h1: "The arm's length principle.",
    lead: 'A walkthrough of the 20 examples in the main text of Chapter I of the OECD Transfer Pricing Guidelines (2022 edition).',
    ctaTitle: "Compare notes on arm's length cases",
    mailSubject: "OECD Chapter I arm's length principle",
    footer: `This walkthrough is based on Chapter I (The arm's length principle) of the ${TPG}.${SOURCE}`,
    shareTitle: "OECD Chapter I — The arm's length principle: 20 examples",
    shareText: 'An interactive walkthrough of the 20 examples in Chapter I of the OECD Transfer Pricing Guidelines (2022).',
    storageKey: 'oecd-ch1-theme',
  },
  Chapter2: {
    isNew: true,
    title: 'OECD Chapter II — transfer pricing methods: 14 examples',
    description: 'An interactive walkthrough of 14 examples from Chapter II of the OECD Transfer Pricing Guidelines (2022) and its Annex I: the CUP, resale price, cost plus and transactional net margin methods, and gross versus net profit indicators.',
    shortDescription: '14 examples from Chapter II of the OECD TP Guidelines (2022): CUP, resale price, cost plus, TNMM and gross versus net margins.',
    imageAlt: 'OECD Chapter II — Interactive walkthrough of the transfer pricing method examples. An inRange page.',
    eyebrow: 'OECD Chapter II · TPG 2022',
    h1: 'Transfer pricing methods.',
    lead: 'A walkthrough of the examples on the CUP, resale price, cost plus and transactional net margin methods in Chapter II of the OECD Transfer Pricing Guidelines (2022 edition), and the three illustrations in its Annex I. The profit split examples in Annex II have their own page.',
    ctaTitle: 'Compare notes on method selection',
    mailSubject: 'OECD Chapter II methods',
    footer: `This walkthrough is based on Chapter II (Transfer pricing methods) and Annex I to Chapter II (Sensitivity of gross and net profit indicators) of the ${TPG}.${SOURCE}`,
    shareTitle: 'OECD Chapter II — Transfer pricing methods: 14 examples',
    shareText: 'An interactive walkthrough of 14 examples from Chapter II of the OECD Transfer Pricing Guidelines (2022): CUP, resale price, cost plus and TNMM.',
    storageKey: 'oecd-ch2-theme',
  },
  Chapter6: {
    title: 'OECD Chapter VI — interactive walkthrough of the 33 intangibles examples',
    description: 'An interactive walkthrough of the 31 case studies in Annex I and Annex II to Chapter VI of the OECD Transfer Pricing Guidelines (intangibles), and two examples from the main text.',
    shortDescription: 'An interactive walkthrough of the 31 case studies in Annex I and Annex II to Chapter VI of the OECD Transfer Pricing Guidelines (intangibles), and two examples from the main text.',
    imageAlt: 'OECD Chapter VI — Interactive walkthrough of 33 intangibles examples. An inRange page.',
    lead: 'A walkthrough of the examples in Annexes I and II to Chapter VI of the OECD Transfer Pricing Guidelines (2022 edition), and two examples from the main text of the chapter.',
    footer: `This walkthrough is based on Chapter VI and its Annexes I and II of the ${TPG}.${SOURCE}`,
    shareText: 'An interactive walkthrough of 33 case studies from Chapter VI of the OECD Transfer Pricing Guidelines (2022) and its Annexes I and II.',
  },
  Chapter7: {
    title: 'OECD Chapter VII (draft) — interactive walkthrough of 29 examples',
    description: 'An interactive walkthrough of the 21 Annex I case studies and eight main-text examples in the 1 June 2026 OECD WP6 discussion draft on intra-group services. A draft, not final guidance.',
    shortDescription: 'The 21 Annex I case studies and eight main-text examples in the 1 June 2026 OECD WP6 discussion draft on intra-group services.',
    imageAlt: 'OECD Chapter VII (draft) — Interactive walkthrough of 29 practical examples. An inRange page.',
    lead: 'A walkthrough of the examples in the WP6 discussion draft of 1 June 2026: the 21 in Annex I and eight from the main text. This is a draft, not final guidance.',
    shareTitle: 'OECD Chapter VII (draft) — Intra-group services case studies',
    shareText: 'An interactive walkthrough of 29 examples from the OECD WP6 discussion draft on intra-group services (1 June 2026).',
  },
  Chapter9: {
    title: 'OECD Chapter IX — business restructurings: 16 examples',
    description: 'An interactive walkthrough of 16 examples on Chapter IX of the OECD Transfer Pricing Guidelines (2022): eight worked examples from the text and eight inRange illustrations distilled from it, covering conversions, indemnification, inventory and brand transfers, outsourcing and location savings.',
    shortDescription: '16 case studies on Chapter IX of the OECD TP Guidelines (2022): eight OECD examples and eight inRange illustrations.',
    imageAlt: 'OECD Chapter IX — Interactive walkthrough of business-restructuring examples. An inRange page.',
    lead: 'A walkthrough of 16 examples on Chapter IX of the OECD Transfer Pricing Guidelines (2022 edition). Eight are worked examples set out in the text of the chapter, marked “OECD example”. Eight are inRange illustrations distilled from its prose and anchored to specific paragraphs, marked “inRange illustration”.',
    footer: `These examples are drawn from Chapter IX (Transfer pricing aspects of business restructurings) of the ${TPG}.${SOURCE}`,
    shareTitle: 'OECD Chapter IX — Business restructurings: 16 examples',
    shareText: '16 case studies on Chapter IX of the OECD Transfer Pricing Guidelines (2022): recognition, risk reallocation, indemnification, location savings and more.',
  },
  Chapter10: {
    title: 'OECD Chapter X — financial transactions: nine examples',
    description: 'An interactive walkthrough of nine examples in Chapter X of the OECD Transfer Pricing Guidelines (2022): delineating intra-group loans, cash pooling, financial guarantees and captive insurance.',
    shortDescription: 'Nine case studies from Chapter X of the OECD TP Guidelines (2022): loans, cash pooling, guarantees and captive insurance.',
    imageAlt: 'OECD Chapter X — Interactive walkthrough of the financial transactions examples. An inRange page.',
    lead: 'A walkthrough of nine examples in Chapter X of the OECD Transfer Pricing Guidelines (2022 edition): intra-group loans, cash pooling, financial guarantees and captive insurance.',
    ctaTitle: 'Compare notes on financial transactions',
    mailSubject: 'OECD Chapter X financial transactions',
    shareTitle: 'OECD Chapter X — Financial transactions: nine case studies',
    shareText: 'An interactive walkthrough of nine case studies in Chapter X of the OECD Transfer Pricing Guidelines (2022): loans, cash pooling, guarantees and captive insurance.',
  },
  OtherExamples: {
    title: 'Other OECD examples — working capital, tested party + cost contribution arrangements',
    description: 'A walkthrough of nine case studies from Chapters III and VIII of the OECD TP Guidelines (2022) and their Annexes: a working capital adjustment, the choice of tested party, and cost contribution arrangements.',
    shortDescription: 'Nine case studies from Chapters III and VIII of the OECD TP Guidelines (2022): working capital, tested party and CCAs.',
    imageAlt: 'Other OECD examples — Interactive walkthrough of comparability and cost-contribution-arrangement examples. An inRange page.',
    eyebrow: 'OECD Chapters III & VIII · TPG 2022',
    lead: 'A walkthrough of nine case studies from Chapter III (a working capital adjustment and the choice of tested party) and Chapter VIII (cost contribution arrangements) of the OECD Transfer Pricing Guidelines (2022 edition), including their Annexes.',
    footer: `This walkthrough is based on Chapter III and its Annex (Example of a working capital adjustment) and on Chapter VIII and its Annex (Examples to illustrate the guidance on cost contribution arrangements) of the ${TPG}.${SOURCE}`,
    shareTitle: 'Other OECD examples — working capital, tested party + cost contribution arrangements',
    shareText: 'Nine case studies from Chapters III and VIII of the OECD TP Guidelines (2022): working capital, tested party and cost contribution arrangements.',
  },
};

const attr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const text = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setPage(page) {
  const t = TEXT[page];
  const file = path.join(ROOT, page, 'index.html');
  if (t.isNew && !existsSync(file)) {
    mkdirSync(path.join(ROOT, page), { recursive: true });
    writeFileSync(file, readFileSync(path.join(ROOT, 'Chapter10', 'index.html')));
    console.log(`${page}: created from Chapter10/index.html`);
  }
  let html = readFileSync(file, 'utf8');
  const put = (label, regex, value) => {
    if (!regex.test(html)) throw new Error(`${page}: ${label} not found`);
    html = html.replace(regex, (_m, before, after) => before + value + after);
  };
  const meta = (kind, name) => new RegExp(`(<meta ${kind}="${name}" content=")[^"]*(")`);

  if (t.title) {
    put('title', /(<title>)[^<]*(<\/title>)/, text(t.title) + ' | inRange');
    put('og:title', meta('property', 'og:title'), attr(t.title));
    put('twitter:title', meta('name', 'twitter:title'), attr(t.title));
  }
  if (t.description) put('description', meta('name', 'description'), attr(t.description));
  if (t.shortDescription) {
    put('og:description', meta('property', 'og:description'), attr(t.shortDescription));
    put('twitter:description', meta('name', 'twitter:description'), attr(t.shortDescription));
  }
  if (t.imageAlt) put('og:image:alt', meta('property', 'og:image:alt'), attr(t.imageAlt));
  if (t.eyebrow) put('eyebrow', /(<section class="hero" id="intro">\s*<span class="eyebrow">)[^<]*(<\/span>)/, text(t.eyebrow));
  if (t.h1) put('h1', /(<h1>)[^<]*(<\/h1>)/, text(t.h1));
  if (t.lead) put('lead', /(<p class="lead">)[^<]*(<\/p>)/, text(t.lead));
  if (t.ctaTitle) put('cta title', /(<h2 class="closing__cta-title">)[^<]*(<\/h2>)/, text(t.ctaTitle));
  if (t.mailSubject) put('mail subject', /(href="mailto:aleks@inrange\.nl\?subject=)[^"]*(")/, encodeURIComponent(t.mailSubject));
  if (t.footer) put('footer', /(<footer class="page-footer">\s*<p>)[\s\S]*?(<\/p>\s*<\/footer>)/, t.footer);
  if (t.shareTitle) put('SHARE_TITLE', /(const SHARE_TITLE = )"[^"]*"(;)/, JSON.stringify(t.shareTitle));
  if (t.shareText) put('SHARE_TEXT', /(const SHARE_TEXT = )"[^"]*"(;)/, JSON.stringify(t.shareText));
  if (t.isNew) {
    put('og:url', meta('property', 'og:url'), `${SITE}/${page}/`);
    put('og:image', meta('property', 'og:image'), `${SITE}/${page}/og-image.png`);
    put('twitter:image', meta('name', 'twitter:image'), `${SITE}/${page}/og-image.png`);
    put('SHARE_URL', /(const SHARE_URL = ")[^"]*(")/, `${SITE}/${page}`);
    put('STORAGE_KEY', /(const STORAGE_KEY = ")[^"]*(")/, t.storageKey);
  }
  writeFileSync(file, html);
  console.log(`${page}: text set`);
}

const named = process.argv.slice(2);
for (const page of named.length ? named : Object.keys(TEXT)) {
  if (!TEXT[page]) throw new Error(`No text defined for ${page}`);
  setPage(page);
}
```

- [ ] **Step 2: Run it**

Run: `node tools/set-page-text.mjs`

Expected:

```
Chapter1: created from Chapter10/index.html
Chapter1: text set
Chapter2: created from Chapter10/index.html
Chapter2: text set
Chapter6: text set
Chapter7: text set
Chapter9: text set
Chapter10: text set
OtherExamples: text set
```

If a line reports `not found`, open that page, look at how the field is written there, and adjust the pattern for that field.

- [ ] **Step 3: Confirm nothing of Chapter X is left in the new pages**

Run: `grep -n -i "chapter x\b\|Chapter10\|cash pool\|ch10" Chapter1/index.html Chapter2/index.html | grep -v 'chapter-nav-item\|chapter-pill\|href="/Chapter10/"' | cut -c1-200`

Expected: no output. Any line printed is page-specific text the script missed: fix it in the page and add the field to the script.

- [ ] **Step 4: Confirm the changed pages only changed where intended**

Run: `git diff --stat -- Chapter6/index.html Chapter7/index.html Chapter9/index.html Chapter10/index.html OtherExamples/index.html`

Expected: five files, each with roughly 8 to 14 changed lines. Read one diff in full (`git diff Chapter9/index.html`) and confirm every changed line is a title, a meta tag, the lead, the footer or a share constant.

- [ ] **Step 5: Commit**

```bash
git add Chapter1/index.html Chapter2/index.html Chapter6/index.html Chapter7/index.html Chapter9/index.html Chapter10/index.html OtherExamples/index.html
git commit -m "Example pages: new Chapter I and II pages; page text follows the new scope" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 11: Chapter menu on every page

**Files:**
- Create: `tools/update-nav.mjs`
- Modify: `index.html` in `Chapter1/`, `Chapter2/`, `Chapter6/`, `Chapter7/`, `Chapter9/`, `Chapter10/`, `ProfitSplit/`, `OtherExamples/`, `Quiz/`

- [ ] **Step 1: Write `tools/update-nav.mjs`**

```js
// Rewrites the chapter menu and the chapter pill row in every example page and the Quiz
// from the list below. Counts are read from each page's cases.js.
// Usage: node tools/update-nav.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { loadCases, ROOT } from './validate-cases.mjs';

const ITEMS = [
  { page: 'Chapter1', num: 'I', title: "The arm's length principle" },
  { page: 'Chapter2', num: 'II', title: 'Transfer pricing methods' },
  { page: 'Chapter6', num: 'VI', title: 'Intangibles' },
  { page: 'Chapter7', num: 'VII', title: 'Intra-group services (draft)' },
  { page: 'Chapter9', num: 'IX', title: 'Business restructurings' },
  { page: 'Chapter10', num: 'X', title: 'Financial transactions' },
  { page: 'ProfitSplit', num: 'PS', title: 'Profit split' },
  { page: 'OtherExamples', num: '+', title: 'Other examples' },
];
const FILES = [...ITEMS.map(i => i.page), 'Quiz'];

for (const i of ITEMS) i.count = loadCases(i.page).length;

const menu = (current, eol) => ITEMS.map(i => {
  const active = i.page === current;
  return [
    `          <a class="chapter-nav-item${active ? ' chapter-nav-item--active' : ''}" href="/${i.page}/" role="menuitem"${active ? ' aria-current="page"' : ''}>`,
    `            <span class="chapter-nav-item__num">${i.num}</span>`,
    `            <span class="chapter-nav-item__title">${i.title}</span>`,
    `            <span class="chapter-nav-item__count">${i.count}</span>`,
    `          </a>`,
  ].join(eol);
}).join(eol);

const pills = (current, eol) => ITEMS.map(i => {
  const active = i.page === current;
  return [
    `          <a class="chapter-pill${active ? ' chapter-pill--active' : ''}" href="/${i.page}/"${active ? ' aria-current="page"' : ''} data-pill-num="${i.num}">`,
    `            <span class="chapter-pill__num">${i.num}</span>`,
    `            <span class="chapter-pill__title">${i.title}</span>`,
    `          </a>`,
  ].join(eol);
}).join(eol);

for (const page of FILES) {
  const file = path.join(ROOT, page, 'index.html');
  let html = readFileSync(file, 'utf8');
  const eol = html.includes('\r\n') ? '\r\n' : '\n';
  const menuRe = /(<div class="chapter-nav-menu"[^>]*>)[\s\S]*?(\r?\n\s*<\/div>)/;
  const pillRe = /(<nav class="chapter-pills"[^>]*>)[\s\S]*?(\r?\n\s*<\/nav>)/;
  const done = [];
  if (menuRe.test(html)) { html = html.replace(menuRe, (_m, open, close) => open + eol + menu(page, eol) + close); done.push('menu'); }
  if (pillRe.test(html)) { html = html.replace(pillRe, (_m, open, close) => open + eol + pills(page, eol) + close); done.push('pills'); }
  if (!done.length) throw new Error(`${page}: no chapter menu or pill row found`);
  writeFileSync(file, html);
  console.log(`${page}: ${done.join(' + ')} rewritten`);
}
console.log(ITEMS.map(i => `${i.num} ${i.count}`).join(' · '));
```

- [ ] **Step 2: Run it**

Run: `node tools/update-nav.mjs`

Expected: one line per page ending `rewritten` (the eight example pages show `menu + pills`; the Quiz shows whichever of the two it has), then `I 20 · II 14 · VI 33 · VII 29 · IX 16 · X 9 · PS 16 · + 9`.

- [ ] **Step 3: Check the result on an unchanged-content page**

Run: `git diff ProfitSplit/index.html | grep '^[+-]' | grep -v '^+++\|^---' | cut -c1-140`

Expected: only added lines for the two new items (I and II) in the menu and in the pill row, and changed lines for the counts (31→33, 21→29, 8→16, 2→9, 7→9) and for the title `Intra-group services (draft)`. No other line changes. If indentation or attribute order of existing items changed, fix the templates in the script so existing items are reproduced exactly, restore the pages with `git checkout -- '*/index.html'`, re-run Task 10 Step 2 and this task.

- [ ] **Step 4: Commit**

```bash
git add Chapter1/index.html Chapter2/index.html Chapter6/index.html Chapter7/index.html Chapter9/index.html Chapter10/index.html ProfitSplit/index.html OtherExamples/index.html Quiz/index.html
git commit -m "Chapter menu: add Chapters I and II, new counts, mark Chapter VII as draft" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 12: Origin label on the Chapter IX page

**Files:**
- Modify: `Chapter9/index.html` (one CSS block, one render line)

- [ ] **Step 1: Add the styles.** Find the line that starts `.oecd-case__refs{` and add directly after it:

```css
.oecd-case__origin{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:2px 8px;border-radius:999px;margin-right:8px;vertical-align:1px}
.oecd-case__origin--oecd-example{background:var(--brand-green-100);color:var(--brand-green-700)}
.oecd-case__origin--inrange-illustration{background:var(--accent-sand);color:var(--accent-terra)}
[data-theme="dark"] .oecd-case__origin--oecd-example{background:rgba(31,168,74,.16);color:var(--brand-green-300)}
[data-theme="dark"] .oecd-case__origin--inrange-illustration{background:rgba(212,160,98,.14);color:#E8A85A}
```

- [ ] **Step 2: Render the label.** Replace this line:

```js
      el("p", { class: "oecd-case__refs" }, c.refs + (c.group ? ` · ${c.group}` : ""))
```

with:

```js
      el(
        "p",
        { class: "oecd-case__refs" },
        c.origin
          ? el(
              "span",
              { class: "oecd-case__origin oecd-case__origin--" + c.origin },
              c.origin === "oecd-example" ? "OECD example" : "inRange illustration"
            )
          : null,
        c.refs + (c.group ? ` · ${c.group}` : "")
      )
```

- [ ] **Step 3: Check in the browser.** Start the preview server (`preview_start` with name `inrange-static`) and open `http://localhost:5173/Chapter9/`.

Expected: no console errors; case 1 shows an ochre "INRANGE ILLUSTRATION" pill before its reference; case 9 shows a green "OECD EXAMPLE" pill. Toggle dark mode: both pills stay readable.

- [ ] **Step 4: Commit**

```bash
git add Chapter9/index.html
git commit -m "Chapter IX: show whether a case is an OECD example or an inRange illustration" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 13: Share images

**Files:**
- Create: `tools/render-og.mjs`, `Chapter1/og-image.svg`, `Chapter1/og-image.png`, `Chapter2/og-image.svg`, `Chapter2/og-image.png`
- Modify: `og-image.svg` and `og-image.png` in `Chapter6/`, `Chapter7/`, `Chapter9/`, `Chapter10/`, `OtherExamples/`

- [ ] **Step 1: Write `tools/render-og.mjs`**

```js
// Renders <page>/og-image.svg to <page>/og-image.png at 2400×1260.
// Usage: node tools/render-og.mjs Chapter1 Chapter2
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Reuse the puppeteer install from deck/, as tools/prerender.mjs does.
const require = createRequire(path.join(ROOT, 'deck', 'package.json'));
const puppeteer = require('puppeteer');

const pages = process.argv.slice(2);
if (!pages.length) {
  console.error('Name at least one page folder, for example: node tools/render-og.mjs Chapter1');
  process.exit(1);
}

const browser = await puppeteer.launch({ headless: true });
try {
  for (const p of pages) {
    const svg = await readFile(path.join(ROOT, p, 'og-image.svg'), 'utf8');
    const tab = await browser.newPage();
    await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
    await tab.setContent(`<!doctype html><html><body style="margin:0">${svg}</body></html>`);
    await tab.screenshot({ path: path.join(ROOT, p, 'og-image.png'), clip: { x: 0, y: 0, width: 1200, height: 630 } });
    await tab.close();
    console.log(`rendered ${p}/og-image.png`);
  }
} finally {
  await browser.close();
}
```

- [ ] **Step 2: Prove the renderer matches the existing images.** Render Profit split, whose image must not change, and compare.

Run: `cp ProfitSplit/og-image.png tools/work/ps-before.png && node tools/render-og.mjs ProfitSplit && python -I -c "import fitz,sys; a=fitz.Pixmap(sys.argv[1]); b=fitz.Pixmap(sys.argv[2]); print(a.width,a.height,b.width,b.height)" tools/work/ps-before.png ProfitSplit/og-image.png`

Expected: `2400 1260 2400 1260`. Then look at both images side by side (Read tool). They should look the same apart from font rendering. Afterwards restore the original: `git checkout ProfitSplit/og-image.png`.

- [ ] **Step 3: Create the two new SVGs.** Copy `Chapter10/og-image.svg` to `Chapter1/og-image.svg` and `Chapter2/og-image.svg`, then replace the text of these elements (the content between `>` and `</text>`):

| Element (current Chapter X text) | Chapter I | Chapter II |
|---|---|---|
| `OECD CHAPTER X · TPG 2022` | `OECD CHAPTER I · TPG 2022` | `OECD CHAPTER II · TPG 2022` |
| `Financial transactions:` | `The arm's length principle:` | `Transfer pricing methods:` |
| `cash pooling case studies.` | `20 case studies.` | `14 case studies.` |
| `Co-ordinator or lender? See how the OECD reasons through each case study.` | `Contracts, risk and group synergies, case by case.` | `CUP, resale price, cost plus and TNMM, case by case.` |
| `2 case studies · Section C.2.3.1` | `20 case studies · main text` | `14 case studies · incl. Annex I` |
| `Co-ordinator vs lender` | `Risk · synergies` | `Gross vs net margins` |
| `CASH POOL LEADER` | `RISK ANALYSIS` | `CUP METHOD` |
| `Co-ordinator` | `Outsourced research` | `Coffee beans` |

Leave `Test yourself · or Show OECD answer`, `Example 1`, `Test yourself` and `Show answer` as they are.

- [ ] **Step 4: Update the five existing SVGs.** Replace text as follows:

| File | Current text | New text |
|---|---|---|
| `Chapter6/og-image.svg` | `31 intangibles case studies.` | `33 intangibles case studies.` |
| `Chapter6/og-image.svg` | `31 intangibles case studies` | `33 intangibles case studies` |
| `Chapter7/og-image.svg` | `21 practical case studies.` | `29 practical case studies.` |
| `Chapter7/og-image.svg` | `21 case studies · Annex I` | `29 case studies · draft` |
| `Chapter7/og-image.svg` | `Comments due 22 July 2026` | `Draft · not final guidance` |
| `Chapter9/og-image.svg` | `curated walkthrough.` | `16 case studies.` |
| `Chapter9/og-image.svg` | `Eight curated case studies — recognition, risk, indemnification.` | `OECD examples and inRange illustrations, side by side.` |
| `Chapter9/og-image.svg` | `8 curated case studies` | `16 case studies` |
| `Chapter10/og-image.svg` | `cash pooling case studies.` | `nine case studies.` |
| `Chapter10/og-image.svg` | `Co-ordinator or lender? See how the OECD reasons through each case study.` | `Loans, cash pooling, guarantees and captive insurance.` |
| `Chapter10/og-image.svg` | `2 case studies · Section C.2.3.1` | `9 case studies` |
| `Chapter10/og-image.svg` | `Co-ordinator vs lender` | `Loans · pools · guarantees` |
| `OtherExamples/og-image.svg` | `ANNEXES TO OECD CHAPTERS III &amp; VIII · TPG 2022` | `OECD CHAPTERS III &amp; VIII · TPG 2022` |
| `OtherExamples/og-image.svg` | `Seven case studies — one TNMM comparability adjustment, six CCAs.` | `Nine case studies — working capital, tested party and CCAs.` |
| `OtherExamples/og-image.svg` | `7 case studies` | `9 case studies` |

- [ ] **Step 5: Render and look**

Run: `node tools/render-og.mjs Chapter1 Chapter2 Chapter6 Chapter7 Chapter9 Chapter10 OtherExamples`

Expected: seven `rendered …` lines. Open each PNG with the Read tool. For each image check: no text runs outside its chip or off the image, and no chip is much wider than its text. Where a chip does not fit its text, change that chip's `<rect width="…">` so the text has about 22px of padding on the right, and move the chips after it by changing their `translate(x, 0)` so the gap between chips stays 20px. Re-render and look again until all seven are clean.

- [ ] **Step 6: Commit**

```bash
git add Chapter1/og-image.svg Chapter1/og-image.png Chapter2/og-image.svg Chapter2/og-image.png Chapter6/og-image.svg Chapter6/og-image.png Chapter7/og-image.svg Chapter7/og-image.png Chapter9/og-image.svg Chapter9/og-image.png Chapter10/og-image.svg Chapter10/og-image.png OtherExamples/og-image.svg OtherExamples/og-image.png
git commit -m "Share images for Chapters I and II; updated counts on the others" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 14: Quiz and sitemap

**Files:**
- Modify: `Quiz/quiz_pool.js` (regenerated), `Quiz/quiz.js`, `sitemap.xml`

- [ ] **Step 1: Regenerate the pool**

Run: `node tools/build-quiz-pool.mjs`

Expected: `wrote Quiz/quiz_pool.js: 167 questions`

- [ ] **Step 2: Add the two chapters to the Quiz's chapter map.** In `Quiz/quiz.js` replace:

```js
  const CHAPTERS = {
    "Chapter VI":     { url: "/Chapter6/",       topic: "Intangibles" },
```

with:

```js
  const CHAPTERS = {
    "Chapter I":      { url: "/Chapter1/",       topic: "The arm's length principle" },
    "Chapter II":     { url: "/Chapter2/",       topic: "Transfer pricing methods" },
    "Chapter VI":     { url: "/Chapter6/",       topic: "Intangibles" },
```

- [ ] **Step 3: Correct the sentence that counts chapters.** In `Quiz/quiz.js` replace `Five random questions drawn from across all six chapters.` with `Five random questions drawn from across the whole walkthrough.`

- [ ] **Step 4: Add the new pages to the sitemap.** In `sitemap.xml`, directly before the `<url>` block for `https://www.inrange.nl/Chapter6/`, add:

```xml
  <url>
    <loc>https://www.inrange.nl/Chapter1/</loc>
    <lastmod>2026-11-13</lastmod>
  </url>
  <url>
    <loc>https://www.inrange.nl/Chapter2/</loc>
    <lastmod>2026-11-13</lastmod>
  </url>
```

Then set `<lastmod>` to the same date in the blocks for `/Chapter6/`, `/Chapter7/`, `/Chapter9/`, `/Chapter10/`, `/ProfitSplit/`, `/OtherExamples/` and `/Quiz/`. Use the actual date of the work if it is later than 2026-11-13.

- [ ] **Step 5: Check**

Run: `node tools/build-quiz-pool.mjs --check && grep -c "<loc>" sitemap.xml && grep -c '"Chapter I"\|"Chapter II"' Quiz/quiz.js`

Expected: `identical: 167 questions`, then `13`, then `2`.

- [ ] **Step 6: Commit**

```bash
git add Quiz/quiz_pool.js Quiz/quiz.js sitemap.xml
git commit -m "Quiz draws on all 167 scenarios; sitemap lists Chapters I and II" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
```

---

### Task 15: Verify everything in a local preview

**Files:** none changed unless a check fails.

- [ ] **Step 1: Data checks**

Run: `node tools/validate-cases.mjs && node tools/build-quiz-pool.mjs --check`

Expected: eight `ok` lines totalling 146 cases and 167 scenarios, then `identical: 167 questions`.

- [ ] **Step 2: Open every page.** Start the preview (`preview_start`, name `inrange-static`) and visit, in turn, `/Chapter1/`, `/Chapter2/`, `/Chapter6/`, `/Chapter7/`, `/Chapter9/`, `/Chapter10/`, `/ProfitSplit/`, `/OtherExamples/` and `/Quiz/` on `http://localhost:5173`. For each example page run this in the page and read the result:

```js
({
  title: document.title,
  cases: document.querySelectorAll(".oecd-case").length,
  sidebarItems: document.querySelectorAll(".toc__item").length,
  groups: [...document.querySelectorAll(".toc__group-label")].map(e => e.textContent.trim()),
  menu: [...document.querySelectorAll(".chapter-nav-item")].map(a => a.textContent.replace(/\s+/g, " ").trim()),
  activeMenu: document.querySelector(".chapter-nav-item--active")?.getAttribute("href"),
  h1: document.querySelector("h1")?.textContent
})
```

Expected for each page: `cases` and `sidebarItems` equal the count in the table of Task 9 Step 5; `groups` are the themes in the spec; `menu` has eight entries with the counts `20, 14, 33, 29, 16, 9, 16, 9`; `activeMenu` is the page's own folder; no console errors (`read_console_messages`, errors only).

- [ ] **Step 3: Exercise one case per page.** On each page, on one of the new cases: choose a wrong option and confirm the feedback appears; press "Show OECD answer" and confirm the analysis and verdict appear; confirm the party diagram is drawn where the case has one. On `/Chapter1/#case-12` and `/Chapter9/#case-10` confirm the scenarios A, B (and C) each render.

- [ ] **Step 4: Phone width.** Resize to 375×812 and reload `/Chapter1/`, `/Chapter9/` and `/OtherExamples/`. Expected: no horizontal scrolling of the page, the chapter menu opens and lists eight items, the pill row wraps cleanly. Reset the size afterwards.

- [ ] **Step 5: Quiz.** On `/Quiz/` start a five-question round and finish it. Expected: questions load, at least the pool's source labels include "Chapter I" or "Chapter II" over a few rounds, the end screen renders, no console errors. In the page, run `globalThis.QUIZ_POOL.length` and expect `167`.

- [ ] **Step 6: Fix and re-run** any check that failed, commit the fix with a message that says what was wrong, and repeat Steps 1 to 5 for the affected pages.

---

### Task 16: Hand over, then publish in one push

**Files:** none.

- [ ] **Step 1: Summarise for Aleks.** Report what was added per page, the counts, what the independent review found and how it was resolved, and anything the Guidelines leave open that a case had to reflect. Give him the local preview address.

- [ ] **Step 2: Flag what else the push publishes.** `main` carries one earlier local commit that has not been pushed, the client-quotes design document (`docs/superpowers/specs/2026-10-20-client-quotes-design.md`). Pushing publishes it, together with this plan and its spec, under `/docs/` (which `robots.txt` excludes from search engines but which is public). Ask him whether that is fine.

- [ ] **Step 3: Wait for his go-ahead.** Pushing `main` deploys the public site. Do not push before he says so.

- [ ] **Step 4: Publish**

```bash
git checkout main
git merge --ff-only oecd-missing-examples
git push origin main
```

Expected: a fast-forward merge and a successful push.

- [ ] **Step 5: Check the live site** a few minutes later: `https://www.inrange.nl/Chapter1/` and `https://www.inrange.nl/Chapter2/` load, and the chapter menu on `https://www.inrange.nl/Chapter6/` shows eight items. Tell Aleks it is live, and update the project notes: the examples are done and the connector work can resume.
