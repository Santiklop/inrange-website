// Generated from mcp-server/scripts/tpg/site/paragraphs.ts by build-pages.ts. Edit there.
// Script of the OECD TPG by paragraph pages (inrange.nl/Paragraphs/). build-pages.ts strips the
// types and writes it to /Paragraphs/paragraphs.js; the search itself is in search.ts.
import { refQuery, SearchIndex, snippet,            } from './search.js';

function el                                       (tag   , className = '', text = '')                           {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// ---------- toast and clipboard ----------
let toastTimer = 0;
function toast(message        )       {
  const node = document.getElementById('toast');
  if (!node) return;
  node.textContent = message;
  node.dataset.show = 'true';
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { node.dataset.show = 'false'; }, 1800);
}
async function copy(text        , done        )                {
  try {
    await navigator.clipboard.writeText(text);
    toast(done);
  } catch {
    window.prompt('Copy this text:', text);
  }
}

// ---------- header: theme, chapters menu, contents drawer, share, scroll bar ----------
function setupTheme()       {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const label = () => toggle?.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  label();
  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    label();
    try { localStorage.setItem('oecd-ch7-theme', next); } catch { /* storage blocked: the choice lasts for this page */ }
  });
}

function setupChapterNav()       {
  const wrap = document.getElementById('chapter-nav');
  const desktop = document.getElementById('chapter-nav-toggle');
  const mobile = document.getElementById('menu-toggle');
  const menu = document.getElementById('chapter-nav-menu');
  if (!menu) return;
  const setOpen = (open         ) => {
    menu.dataset.open = String(open);
    desktop?.setAttribute('aria-expanded', String(open));
    mobile?.setAttribute('aria-expanded', String(open));
  };
  const onToggle = (event       ) => { event.stopPropagation(); setOpen(menu.dataset.open !== 'true'); };
  desktop?.addEventListener('click', onToggle);
  mobile?.addEventListener('click', onToggle);
  document.addEventListener('click', event => {
    const target = event.target        ;
    if (menu.dataset.open !== 'true' || wrap?.contains(target) || mobile?.contains(target) || menu.contains(target)) return;
    setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.dataset.open === 'true') { setOpen(false); (desktop ?? mobile)?.focus(); }
  });
}

function setupContents()       {
  const toggle = document.getElementById('contents-toggle');
  const sidebar = document.getElementById('sidebar');
  if (!toggle || !sidebar) return;
  const setOpen = (open         ) => {
    sidebar.dataset.open = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close the contents' : 'Open the contents of this page');
  };
  toggle.addEventListener('click', () => setOpen(sidebar.dataset.open !== 'true'));
  sidebar.addEventListener('click', event => {
    // Close the drawer after the link's own jump has run.
    if ((event.target           ).closest('a') && matchMedia('(max-width: 1023px)').matches) window.setTimeout(() => setOpen(false), 0);
  });
}

function setupShare()       {
  const url = document.querySelector                 ('link[rel="canonical"]')?.href ?? location.href;
  document.getElementById('share-btn')?.addEventListener('click', async () => {
    try {
      if (navigator.share) { await navigator.share({ title: document.title, url }); return; }
    } catch { /* cancelled: copy instead */ }
    await copy(url, 'Link copied to clipboard');
  });
}

function setupScrollProgress()       {
  const fill = document.getElementById('scroll-progress-fill');
  if (!fill) return;
  let pending = false;
  const update = () => {
    pending = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.width = `${max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0}%`;
  };
  const schedule = () => { if (!pending) { pending = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  update();
}

/** Highlights, in the contents list, the section being read: the last one whose heading has passed
 *  the reading line just below the sticky header. Works after a jump into the middle of a section too. */
function setupScrollSpy()       {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  const sections                                                = [];
  for (const link of sidebar.querySelectorAll                   ('li a[href^="#"]')) {
    const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (heading) sections.push({ item: link.parentElement , heading });
  }
  if (!sections.length) return;
  let current                     = null;
  const update = () => {
    let found                     = null;
    // The headings come in page order, so the first one below the line ends the search.
    for (const { item, heading } of sections) {
      if (heading.getBoundingClientRect().top > 120) break;
      found = item;
    }
    if (found === current) return;
    current?.classList.remove('toc__item--active');
    found?.classList.add('toc__item--active');
    current = found;
    if (!found || matchMedia('(max-width: 1023px)').matches) return;
    const outside = found.offsetTop < sidebar.scrollTop || found.offsetTop > sidebar.scrollTop + sidebar.clientHeight - 40;
    if (outside) sidebar.scrollTo({ top: found.offsetTop - sidebar.clientHeight / 3 });
  };
  // Browsers send scroll events at most once per frame, so the update can run on each one.
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('load', update);
  update();
}

// ---------- paragraphs: copy, link, footnotes ----------
/** The words of a paragraph as published: footnote numbers, folded footnotes and example links left out. */
function plainText(para             )         {
  const body = para.querySelector('.para__body')?.cloneNode(true)                           ;
  if (!body) return '';
  body.querySelectorAll('.tpg-notes, .tpg-examples, sup.fn').forEach(node => node.remove());
  const blocks = [...body.children].map(child => {
    if (child.matches('ul')) return [...child.children].map(li => li.textContent?.trim() ?? '').join('\n');
    if (child.matches('.table-wrap')) return [...child.querySelectorAll('tr')].map(row => [...row.children].map(cell => cell.textContent?.trim() ?? '').join('\t')).join('\n');
    return child.textContent?.trim() ?? '';
  });
  return [para.querySelector('.tpg-term')?.textContent ?? '', ...blocks].filter(Boolean).join('\n\n');
}

function setupTools()       {
  const main = document.querySelector             ('main.main');
  if (!main) return;
  const cite = main.dataset.cite ?? '';
  const page = document.querySelector                 ('link[rel="canonical"]')?.href ?? location.href.split('#')[0] ;
  main.addEventListener('click', event => {
    const button = (event.target           ).closest             ('button[data-tool]');
    const para = button?.closest             ('.para');
    if (!button || !para) return;
    if (button.dataset.tool === 'link') void copy(`${page}#${para.id}`, 'Link to the paragraph copied');
    else void copy(`${plainText(para)}\n\n${cite}, ${para.dataset.loc ?? ''}.`, 'Paragraph and citation copied');
  });
}

/** A footnote number opens the folded footnotes and shows the note. */
function setupFootnotes()       {
  document.addEventListener('click', event => {
    const link = (event.target           ).closest                   ('a[data-fn]');
    if (!link) return;
    const note = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    const details = note?.closest('details');
    if (!note || !details) return;
    event.preventDefault();
    details.open = true;
    note.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
}

// ---------- pop-ups for cross-references ----------
const loaded = new Map                                  ();
/** The page a reference points to: this one, or another paragraph page fetched once. */
function pageDocument(path        )                           {
  if (path === location.pathname) return Promise.resolve(document);
  let doc = loaded.get(path);
  if (!doc) {
    doc = fetch(path)
      .then(response => (response.ok ? response.text() : Promise.reject(new Error(String(response.status)))))
      .then(html => new DOMParser().parseFromString(html, 'text/html'))
      .catch(() => null);
    loaded.set(path, doc);
  }
  return doc;
}

function setupPopups()       {
  const pop = document.getElementById('tpg-pop');
  if (!pop) return;
  const touch = matchMedia('(hover: none)');
  let shownFor                           = null;
  let showTimer = 0;
  let hideTimer = 0;
  const hide = () => { window.clearTimeout(showTimer); pop.hidden = true; shownFor = null; };
  const place = (link                   ) => {
    // On phones the pop-up is a sheet at the bottom of the screen (paragraphs.css).
    if (matchMedia('(max-width: 600px)').matches) { pop.style.left = ''; pop.style.top = ''; return; }
    const r = link.getBoundingClientRect();
    const left = Math.min(Math.max(16, r.left), window.innerWidth - pop.offsetWidth - 16);
    const below = r.bottom + 8 + pop.offsetHeight < window.innerHeight || r.top < pop.offsetHeight + 16;
    pop.style.left = `${left + window.scrollX}px`;
    pop.style.top = `${(below ? r.bottom + 8 : r.top - pop.offsetHeight - 8) + window.scrollY}px`;
  };
  const show = async (link                   ) => {
    shownFor = link;
    const doc = await pageDocument(link.pathname);
    if (shownFor !== link) return;
    const target = doc?.getElementById(decodeURIComponent(link.hash.slice(1)));
    const number = target?.querySelector('.para__n')?.textContent;
    const head = el('div', 'tpg-pop__head');
    const go = el('a', 'tpg-pop__go', 'Go to the paragraph →');
    go.href = link.href;
    head.append(el('span', '', number ? `Paragraph ${number}` : link.textContent ?? ''), go);
    const body = el('div', 'tpg-pop__body');
    const source = target?.querySelector('.para__body');
    if (source) {
      const clone = source.cloneNode(true)               ;
      clone.querySelectorAll('.tpg-notes, .tpg-examples').forEach(node => node.remove());
      body.append(...clone.childNodes);
    } else {
      body.textContent = 'This paragraph could not be shown here. Follow the link to read it.';
    }
    pop.replaceChildren(head, body);
    pop.hidden = false;
    place(link);
  };
  document.addEventListener('mouseover', event => {
    if (touch.matches) return;
    const target = event.target           ;
    if (target.closest('#tpg-pop')) { window.clearTimeout(hideTimer); return; }
    const link = target.closest                   ('a.xref');
    if (!link) return;
    window.clearTimeout(hideTimer);
    if (shownFor === link && !pop.hidden) return;
    window.clearTimeout(showTimer);
    showTimer = window.setTimeout(() => void show(link), 250);
  });
  document.addEventListener('mouseout', event => {
    if (touch.matches) return;
    const from = (event.target           ).closest('a.xref, #tpg-pop');
    if (!from) return;
    const to = event.relatedTarget                  ;
    if (to && (to.closest('#tpg-pop') || to.closest('a.xref') === from)) return;
    window.clearTimeout(showTimer);
    hideTimer = window.setTimeout(hide, 300);
  });
  document.addEventListener('click', event => {
    const target = event.target           ;
    const link = target.closest                   ('a.xref');
    // On a touch screen the first tap shows the paragraph; a second tap, or "Go to", follows the link.
    if (link && touch.matches && !link.closest('#tpg-pop') && shownFor !== link) {
      event.preventDefault();
      void show(link);
      return;
    }
    if (!target.closest('#tpg-pop')) hide();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); });
}

// ---------- search ----------
function setupSearch()       {
  const input = document.querySelector                  ('#tpg-q');
  const list = document.querySelector                  ('#tpg-results');
  if (!input || !list) return;
  let index                              = null;
  let ready = false;
  let shown          = [];
  let active = -1;
  let timer = 0;
  const load = () => (index ??= fetch('/Paragraphs/search.json')
    .then(response => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
    .then((data                      ) => { ready = true; return new SearchIndex(data.entries); }));
  const note = (text        ) => {
    const item = el('li', 'tpg-result tpg-result--note', text);
    item.setAttribute('role', 'presentation');
    return item;
  };
  const open = (items               ) => { list.replaceChildren(...items); list.hidden = false; input.setAttribute('aria-expanded', 'true'); };
  const close = () => {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    active = -1;
  };
  const option = (entry       , i        , query        , direct         ) => {
    const item = el('li', 'tpg-result');
    item.id = `tpg-r${i}`;
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', 'false');
    const link = el('a');
    link.href = entry[1];
    link.append(el('span', 'tpg-result__label', direct ? `Go to ${entry[2]}` : entry[2]), el('span', 'tpg-result__where', entry[3]));
    const text = el('span', 'tpg-result__snippet');
    for (const piece of snippet(entry[4], direct ? '' : query)) text.append(piece.hit ? el('mark', '', piece.text) : document.createTextNode(piece.text));
    link.append(text);
    item.append(link);
    return item;
  };
  const mark = () => {
    list.querySelectorAll('[role="option"]').forEach((item, i) => item.setAttribute('aria-selected', String(i === active)));
    const current = document.getElementById(`tpg-r${active}`);
    if (current) { input.setAttribute('aria-activedescendant', current.id); current.scrollIntoView({ block: 'nearest' }); }
  };
  const run = async (query        ) => {
    let found             ;
    try {
      found = await load();
    } catch {
      index = null;
      open([note('The search could not load. Please try again.')]);
      return;
    }
    if (input.value.trim() !== query) return;
    const id = refQuery(query);
    const direct = id ? found.get(id) : undefined;
    shown = [...(direct ? [direct] : []), ...found.search(query, 12).map(hit => hit.entry).filter(entry => entry !== direct)];
    if (!shown.length) {
      open([note(id ? `There is no paragraph ${query} in these texts.` : `Nothing in the text matches “${query}”.`)]);
      return;
    }
    open(shown.map((entry, i) => option(entry, i, query, entry === direct)));
    active = 0;
    mark();
  };
  input.addEventListener('focus', () => { load().catch(() => { index = null; }); });
  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    const query = input.value.trim();
    shown = [];
    if (!query || (query.length < 2 && !refQuery(query))) { close(); return; }
    if (!ready) open([note('Loading the text…')]);
    timer = window.setTimeout(() => void run(query), 120);
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!shown.length) return;
      event.preventDefault();
      active = (active + (event.key === 'ArrowDown' ? 1 : shown.length - 1)) % shown.length;
      mark();
    } else if (event.key === 'Enter') {
      const entry = shown[Math.max(0, active)];
      if (entry) { event.preventDefault(); close(); location.assign(entry[1]); }
    } else if (event.key === 'Escape') {
      close();
    }
  });
  list.addEventListener('click', () => close());
  document.addEventListener('click', event => { if (!(event.target           ).closest('.tpg-search')) close(); });
}

setupTheme();
setupChapterNav();
setupContents();
setupShare();
setupScrollProgress();
setupScrollSpy();
setupTools();
setupFootnotes();
setupPopups();
setupSearch();
