// Generated from mcp-server/scripts/tpg/site/search.ts by build-pages.ts. Edit there.
// Search over the OECD text in the visitor's browser (inrange.nl/Paragraphs/). A paragraph number
// jumps straight to the paragraph; words return ranked paragraphs with a snippet. Pure functions,
// no DOM: tested in Node, stripped to /Paragraphs/search.js by build-pages.ts.

/** One searchable item: id, address, label ("¶3.9"), place (its section heading), plain text. */
                                                                                           
                                                    
                                                     

const STOP = new Set('a an and are as at be been by for from has have in is it its may not of on or that the their there these this those to was were which with'.split(' '));

export function normalise(text        )         {
  return text.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’‘`]/g, "'");
}

/** Plural endings only: "adjustments" → "adjustment", "activities" → "activity", "taxes" → "tax". */
export function stem(word        )         {
  if (word.length <= 3 || /\d/.test(word)) return word;
  if (word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (/(?:ss|x|z|ch|sh)es$/.test(word)) return word.slice(0, -2);
  if (/[^su]s$/.test(word) && !word.endsWith('is')) return word.slice(0, -1);
  return word;
}

/** The words of a text, without stop words, plurals folded. Paragraph numbers stay whole ("3.55"). */
export function tokens(text        )           {
  return normalise(text).replace(/(\d)\.(?=\d)/g, '$1§').split(/[^a-z0-9§]+/)
    .filter(word => word.length > 1 && !STOP.has(word)).map(word => stem(word.replace(/§/g, '.')));
}

const ROMAN = /^(?:i|ii|iii|iv|v|vi|vii|viii|ix|x)$/;
const ANNEX                         = { i: '1', ii: '2', iii: '3', iv: '4', 1: '1', 2: '2', 3: '3', 4: '4' };
const PARA = String.raw`(?:¶|§|paras?\.?|paragraphs?)?\s*`;

/** The id a query names when it is a paragraph reference: "3.9", "¶6.32–6.35", "Annex II to Chapter VI 5",
 *  "annex to chapter III, para 5", "Amount B 12", "Preface 10". Null for anything else. */
export function refQuery(query        )                {
  const q = normalise(query).trim().replace(/[–—]/g, '-').replace(/\s+/g, ' ');
  let m = q.match(new RegExp(String.raw`^${PARA}(\d{1,2}\.\d{1,3})(?:\s*(?:-|to)\s*\d{1,2}\.\d{1,3})?\.?$`));
  if (m) return m[1] ;
  m = q.match(new RegExp(String.raw`^annex (i{1,3}|iv|[1-4]) (?:to )?(?:chapter|ch\.?) ?([ivx]+),? ?${PARA}(\d{1,3})$`));
  if (m && ROMAN.test(m[2] )) return `${m[2] .toUpperCase()}-A${ANNEX[m[1] ]}-${m[3]}`;
  m = q.match(new RegExp(String.raw`^annex (?:to )?(?:chapter|ch\.?) ?([ivx]+),? ?${PARA}(\d{1,3})$`));
  if (m && ROMAN.test(m[1] )) return `${m[1] .toUpperCase()}-A-${m[2]}`;
  m = q.match(new RegExp(String.raw`^(?:amount b|ab),? ?${PARA}(\d{1,3})$`));
  if (m) return `AB-${m[1]}`;
  m = q.match(new RegExp(String.raw`^preface,? ?${PARA}(\d{1,2})$`));
  if (m) return `P-${m[1]}`;
  return null;
}

/** BM25 over the words of each entry's label, place and text. */
export class SearchIndex {
                   entries         ;
                   byId = new Map               ();
                   postings = new Map                                        ();
                   lengths           = [];
                   flat           = [];
                   average        ;

  constructor(entries         ) {
    this.entries = entries;
    let total = 0;
    entries.forEach((entry, doc) => {
      this.byId.set(entry[0], entry);
      this.flat.push(normalise(entry[4]).replace(/\s+/g, ' '));
      const words = tokens(`${entry[2]} ${entry[3]} ${entry[4]}`);
      this.lengths.push(words.length);
      total += words.length;
      const counts = new Map                ();
      for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);
      for (const [word, count] of counts) {
        const list = this.postings.get(word);
        if (list) list.push([doc, count]);
        else this.postings.set(word, [[doc, count]]);
      }
    });
    this.average = total / Math.max(1, entries.length);
  }

  get(id        )                    {
    return this.byId.get(id);
  }

  /** Entries ranked for the query. An entry with every word ranks higher, one with the query as written higher still. */
  search(query        , limit = 10)        {
    const words = [...new Set(tokens(query))];
    if (!words.length) return [];
    const scores = new Map                                            ();
    for (const word of words) {
      const list = this.postings.get(word);
      if (!list) continue;
      const idf = Math.log(1 + (this.entries.length - list.length + 0.5) / (list.length + 0.5));
      for (const [doc, count] of list) {
        const weight = (count * 2.2) / (count + 1.2 * (0.25 + (0.75 * this.lengths[doc] ) / this.average));
        const current = scores.get(doc) ?? { score: 0, matched: 0 };
        current.score += idf * weight;
        current.matched += 1;
        scores.set(doc, current);
      }
    }
    const phrase = words.length > 1 ? normalise(query).trim().replace(/\s+/g, ' ') : '';
    const hits        = [];
    for (const [doc, { score, matched }] of scores) {
      let total = score;
      if (matched === words.length) total *= 1.5;
      if (phrase && this.flat[doc] .includes(phrase)) total *= 2;
      hits.push({ entry: this.entries[doc] , score: total });
    }
    return hits.sort((a, b) => b.score - a.score).slice(0, limit);
  }
}

/** About `size` words from just before the first word of the query, with the query's words marked.
 *  With an empty query: the first `size` words. */
export function snippet(text        , query        , size = 28)          {
  const wanted = new Set(tokens(query));
  const words = text.split(/\s+/).filter(Boolean);
  const isHit = (word        ) => wanted.size > 0 && tokens(word).some(token => wanted.has(token));
  const start = Math.max(0, words.findIndex(isHit) - Math.floor(size / 3));
  const out          = [];
  const add = (text        , hit         ) => {
    if (!text) return;
    const last = out.at(-1);
    if (last && !last.hit && !hit) last.text += text;
    else out.push({ text, hit });
  };
  if (start > 0) add('… ', false);
  const shown = words.slice(start, start + size);
  shown.forEach((word, i) => {
    add(word, isHit(word));
    if (i < shown.length - 1) add(' ', false);
  });
  if (start + size < words.length) add(' …', false);
  return out;
}
