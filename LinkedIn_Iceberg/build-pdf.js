// Render slides.html to a lightweight raster-based PDF carousel for LinkedIn.
// Each slide is captured as a high-res JPEG, then packed one-per-page into a PDF.
// This eliminates the viewer lag that complex vector gradients cause.
// Usage: node build-pdf.js
// Output: ../inRange_LinkedIn_Icebergs.pdf

const path = require('path');
const fs = require('fs');

const puppeteer = require('C:/Vibecoding/inRange website/deck/node_modules/puppeteer');

const HTML_PATH = path.join(__dirname, 'slides.html');
const OUT_PATH = path.join(__dirname, '..', 'inRange_LinkedIn_Icebergs.pdf');

// Each slide is a 286x286mm square at 1080px native. 2x scale = 2160px crisp on retina.
const SLIDE_SIZE_PX = 1080;
const SCALE = 2;
const JPEG_QUALITY = 92;

async function main() {
  console.log('Reading HTML source…');
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const tempHtmlPath = path.join(__dirname, '_build.html');
  fs.writeFileSync(tempHtmlPath, html);

  console.log('Launching headless Chrome…');
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: SLIDE_SIZE_PX,
      height: SLIDE_SIZE_PX,
      deviceScaleFactor: SCALE,
    },
  });
  const page = await browser.newPage();

  await page.goto('file:///' + tempHtmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));

  // Drop body margin/padding so each .slide screenshot is exact.
  await page.addStyleTag({
    content: `body { background: transparent !important; padding: 0 !important; gap: 0 !important; }
              .slide { box-shadow: none !important; }`,
  });

  console.log('Capturing slides as JPEGs…');
  const slides = await page.$$('.slide');
  const imgs = [];
  for (let i = 0; i < slides.length; i++) {
    const buf = await slides[i].screenshot({
      type: 'jpeg',
      quality: JPEG_QUALITY,
      omitBackground: false,
    });
    imgs.push('data:image/jpeg;base64,' + buf.toString('base64'));
    console.log(`  slide ${i + 1}/${slides.length} — ${(buf.length / 1024).toFixed(0)} KB`);
  }

  // Build a flat HTML: one slide per page, each page is a single image.
  const packedHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
    @page { size: 286mm 286mm; margin: 0; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; }
    .page { width: 286mm; height: 286mm; page-break-after: always; break-after: page; overflow: hidden; position: relative; }
    .page:last-child { page-break-after: auto; break-after: auto; }
    .page img { display: block; width: 100%; height: 100%; object-fit: cover; }
    .page a.overlay { position: absolute; inset: 0; display: block; }
  </style></head><body>
  ${imgs
    .map((src, i) => {
      // Only the last slide (CTA) is clickable — links to the site.
      const isLast = i === imgs.length - 1;
      return `<div class="page"><img src="${src}" alt="Slide ${i + 1}"/>${
        isLast ? '<a class="overlay" href="https://www.inrange.nl"></a>' : ''
      }</div>`;
    })
    .join('\n')}
  </body></html>`;

  const packedHtmlPath = path.join(__dirname, '_pdf_src.html');
  fs.writeFileSync(packedHtmlPath, packedHtml);

  console.log('Rendering PDF…');
  const pdfPage = await browser.newPage();
  await pdfPage.goto('file:///' + packedHtmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const pdfOpts = {
    width: '286mm',
    height: '286mm',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  };

  let writePath = OUT_PATH;
  try {
    await pdfPage.pdf({ ...pdfOpts, path: writePath });
  } catch (err) {
    if (err && err.code === 'EBUSY') {
      const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      writePath = OUT_PATH.replace(/\.pdf$/i, `_${ts}.pdf`);
      console.log('Target locked — writing to', writePath);
      await pdfPage.pdf({ ...pdfOpts, path: writePath });
    } else {
      throw err;
    }
  }

  await browser.close();
  console.log('Wrote', writePath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
