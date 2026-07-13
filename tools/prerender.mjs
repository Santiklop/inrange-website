// Prerenders the homepage into index.html so crawlers (and networks that
// block CDNs) see the full page content without executing JavaScript.
//
// Renders the live React app headlessly at a desktop viewport, captures the
// resulting #root markup, and splices it between the PRERENDER:START/END
// markers in index.html. The React app replaces the snapshot on load, so the
// rendered page is unchanged.
//
// Re-run after changing homepage content:  node tools/prerender.mjs
import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from './serve.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Reuse the puppeteer install from deck/
const require = createRequire(path.join(ROOT, 'deck', 'package.json'));
const puppeteer = require('puppeteer');

const START = '<!-- PRERENDER:START -->';
const END = '<!-- PRERENDER:END -->';

const server = await startServer(0);
const port = server.address().port;
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0', timeout: 60000 });
  // Wait until the app is mounted and lucide has converted every icon.
  await page.waitForFunction(
    () => document.querySelector('#root [data-screen-label]') && !document.querySelector('#root i[data-lucide]'),
    { timeout: 30000 },
  );
  await new Promise((r) => setTimeout(r, 1000));
  let html = await page.evaluate(() => document.getElementById('root').innerHTML);

  // Mark the snapshot so CSS can hide it on small screens and the app can
  // remove it if React ever leaves it in place.
  const marked = html.replace('<div data-screen-label="Home"', '<div data-prerender="1" data-screen-label="Home"');
  if (marked === html) throw new Error('Could not find the app root element in the captured markup');
  html = marked;

  for (const expected of ['info@inrange.nl', 'Transfer pricing', '<svg']) {
    if (!html.includes(expected)) throw new Error(`Sanity check failed: snapshot is missing "${expected}"`);
  }
  if (html.includes('<script')) throw new Error('Sanity check failed: snapshot contains a script tag');

  const indexPath = path.join(ROOT, 'index.html');
  const doc = await readFile(indexPath, 'utf8');
  const s = doc.indexOf(START);
  const e = doc.indexOf(END);
  if (s === -1 || e === -1 || e < s) throw new Error('PRERENDER markers not found in index.html');
  const updated = doc.slice(0, s + START.length) + html + doc.slice(e);
  await writeFile(indexPath, updated);
  console.log(`Prerendered ${(html.length / 1024).toFixed(0)} KB of markup into index.html (${(updated.length / 1024).toFixed(0)} KB total)`);
} finally {
  await browser.close();
  server.close();
}
