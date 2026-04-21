// Render deck/web/index.html to a pixel-perfect PDF via headless Chrome.
// Usage: node deck/build-pdf.js
// Output: deck/inRange_Capability_Deck.pdf

const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Set VARIANT=founder to build the deck with the founder photo in the cover + contact circles.
const VARIANT = process.env.VARIANT || 'default';
const HTML_PATH = path.join(__dirname, 'web', VARIANT === 'founder' ? 'index-founder.html' : 'index.html');
const DEFAULT_OUT = VARIANT === 'founder'
  ? 'inRange_Capability_Deck_Founder.pdf'
  : 'inRange_Capability_Deck.pdf';
const OUT_PATH = path.join(__dirname, process.env.OUT_PDF || DEFAULT_OUT);

const SITE_URL = 'https://www.inrange.nl';
const MAILTO   = 'mailto:info@inrange.nl?subject=inRange%20—%20Hello';

async function qrDataUrl(url, dark = '#0D1B2D', light = '#FFFFFF') {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 512,
    color: { dark, light },
  });
}

async function main() {
  console.log('Generating QR codes…');
  const qrSite = await qrDataUrl(SITE_URL);
  const qrMailto = await qrDataUrl(MAILTO);

  console.log('Reading HTML source…');
  let html = fs.readFileSync(HTML_PATH, 'utf8');
  html = html.replace('__QR_SITE__', qrSite).replace('__QR_MAILTO__', qrMailto);

  console.log('Launching headless Chrome…');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Use a data URL so we don't need to start a server, and so the generated QR data URLs work.
  // But data URLs have a length cap in some setups — write the merged HTML to a temp file instead.
  const tempHtmlPath = path.join(__dirname, 'web', '_build.html');
  fs.writeFileSync(tempHtmlPath, html);

  await page.goto('file:///' + tempHtmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  // Wait an extra beat for webfonts + inline script (SignalMap SVG) to settle.
  await new Promise((r) => setTimeout(r, 1500));

  console.log('Rendering PDF…');
  await page.pdf({
    path: OUT_PATH,
    format: 'A4',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  // Keep the merged HTML for debugging but don't commit it.
  // fs.unlinkSync(tempHtmlPath);

  console.log('✓ Wrote', OUT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
