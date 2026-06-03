// 4june/dashboard/viz.js
export function aggregateBy(records, keyFn) {
  const counts = {};
  for (const r of records) {
    const keys = keyFn(r) || [];
    for (const k of keys) {
      if (!k) continue;
      counts[k] = (counts[k] || 0) + 1;
    }
  }
  return counts;
}

export function donutSegments(counts) {
  const entries = Object.entries(counts);
  const total = entries.reduce((s, [, n]) => s + n, 0) || 1;
  return entries.map(([label, count]) => ({ label, count, frac: count / total }));
}

export function topN(counts, n) {
  const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
  if (sorted.length <= n) return sorted.map(([label, count]) => ({ label, count }));
  const head = sorted.slice(0, n);
  const tailSum = sorted.slice(n).reduce((s, [, c]) => s + c, 0);
  return [...head.map(([label, count]) => ({ label, count })), { label: "Other", count: tailSum }];
}

export function hashHue(name) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 360;
}
