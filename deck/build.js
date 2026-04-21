// inRange capability deck — generated via pptxgenjs
// Brand palette mirrors colors_and_type.css on the inrange website.

const pptxgen = require('pptxgenjs');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// ---------- Brand tokens ----------
const NAVY_900 = '07111D';
const NAVY_800 = '0D1B2D';
const NAVY_700 = '14273F';
const NAVY_500 = '2C4868';
const NAVY_300 = '7E93AE';
const NAVY_100 = 'D6DEE9';
const NAVY_50  = 'EEF2F7';

const GREEN_700 = '0F6B2E';
const GREEN_600 = '15893B';
const GREEN_500 = '1FA84A';
const GREEN_400 = '3FBB65';
const GREEN_300 = '6CCE89';
const GREEN_200 = '9FDFB1';
const GREEN_100 = 'CFEFD8';
const GREEN_50  = 'EBF8EE';

const N_0   = 'FFFFFF';
const N_50  = 'F7F8FA';
const N_100 = 'EEF0F3';
const N_200 = 'DEE2E8';
const N_300 = 'C3CAD3';
const N_500 = '6E7887';
const N_700 = '343D4C';

const FONT_DISPLAY = 'Plus Jakarta Sans';
const FONT_BODY    = 'Plus Jakarta Sans';
const FONT_FALLBACK = 'Calibri';

const SITE_URL = 'https://inrange.nl';
const LOGO_WHITE = path.join(__dirname, 'assets', 'logo-white.png');
const LOGO_DARK  = path.join(__dirname, 'assets', 'logo-dark.png');
const FOUNDER_PHOTO = path.join(__dirname, 'assets', 'founder.jpg');
// Logo intrinsic aspect ratio (width / height) — used to size without distortion.
const LOGO_ASPECT = 502 / 214;

// ---------- Helpers ----------
const SLIDE_W = 13.333; // LAYOUT_WIDE: 13.333 x 7.5
const SLIDE_H = 7.5;

function eyebrow(slide, text, { x, y, color = GREEN_600 }) {
  slide.addText(text, {
    x, y, w: 10, h: 0.3,
    fontFace: FONT_DISPLAY, fontSize: 11, bold: true,
    color, charSpacing: 4, margin: 0,
  });
}

function titleText(slide, text, { x, y, w, h = 1.4, color = NAVY_800, fontSize = 44 }) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: FONT_DISPLAY, fontSize, bold: true, color,
    valign: 'top', margin: 0, charSpacing: -0.5,
  });
}

function body(slide, text, opts) {
  slide.addText(text, {
    fontFace: FONT_BODY, fontSize: 14, color: N_700,
    paraSpaceAfter: 8, margin: 0, ...opts,
  });
}

// Small pill with number + label
function statBlock(slide, { x, y, w, big, unit, label, numColor = GREEN_600, labelColor = N_500 }) {
  slide.addText(big, {
    x, y, w, h: 0.8,
    fontFace: FONT_DISPLAY, fontSize: 40, bold: true, color: numColor,
    margin: 0, charSpacing: -1,
  });
  slide.addText(unit, {
    x, y: y + 0.75, w, h: 0.3,
    fontFace: FONT_DISPLAY, fontSize: 10, bold: true, color: GREEN_600,
    charSpacing: 4, margin: 0,
  });
  slide.addText(label, {
    x, y: y + 1.05, w, h: 0.5,
    fontFace: FONT_BODY, fontSize: 11, color: labelColor,
    margin: 0,
  });
}

// Tag chip (inline pill)
function chip(slide, text, { x, y, w = 1.5, h = 0.32, fill = GREEN_50, color = GREEN_700, fontSize = 10 }) {
  slide.addShape('roundRect', {
    x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: h / 2,
  });
  slide.addText(text, {
    x, y, w, h, align: 'center', valign: 'middle',
    fontFace: FONT_DISPLAY, fontSize, bold: true, color, margin: 0,
  });
}

// Numbered circle badge (green on navy etc.)
function numberBadge(slide, label, { x, y, size = 0.55, fill = GREEN_500, color = N_0, fontSize = 14 }) {
  slide.addShape('ellipse', {
    x, y, w: size, h: size, fill: { color: fill }, line: { color: fill },
  });
  slide.addText(label, {
    x, y, w: size, h: size, align: 'center', valign: 'middle',
    fontFace: FONT_DISPLAY, fontSize, bold: true, color, margin: 0, charSpacing: -0.5,
  });
}

// Decorative corner orb (abstract graphic motif used throughout)
function cornerOrb(slide, { x, y, size = 3, color = GREEN_500, transparency = 92 }) {
  slide.addShape('ellipse', {
    x, y, w: size, h: size,
    fill: { color, transparency },
    line: { color, transparency: 100 },
  });
}

// Footer: small subtle page number and brand mark
function footer(slide, pageNum, pageTotal, { inverted = false } = {}) {
  const baseColor = inverted ? NAVY_100 : N_500;
  slide.addText(`inRange  ·  Your trusted transfer pricing partner`, {
    x: 0.5, y: SLIDE_H - 0.35, w: 6, h: 0.25,
    fontFace: FONT_BODY, fontSize: 9, color: baseColor, margin: 0,
  });
  slide.addText(`${pageNum} / ${pageTotal}`, {
    x: SLIDE_W - 1.5, y: SLIDE_H - 0.35, w: 1, h: 0.25,
    fontFace: FONT_DISPLAY, fontSize: 9, color: baseColor, align: 'right', margin: 0,
  });
}

// QR code generator -> base64 PNG
async function qrDataUrl(url, darkColor = NAVY_800, lightColor = N_0) {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 512,
    color: { dark: '#' + darkColor, light: '#' + lightColor },
  });
}

// ---------- Build ----------
async function build() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'inRange Solutions';
  pres.title = 'inRange — Capability Deck';
  pres.company = 'inRange Solutions B.V.';

  const PAGE_TOTAL = 9;

  // ==================== Slide 1: Cover ====================
  {
    const s = pres.addSlide();
    s.background = { color: NAVY_800 };

    // Decorative abstract orbs (brand motif)
    cornerOrb(s, { x: SLIDE_W - 4, y: -1.5, size: 6, color: GREEN_500, transparency: 88 });
    cornerOrb(s, { x: SLIDE_W - 2, y: 4, size: 3.5, color: GREEN_500, transparency: 94 });
    // soft navy-blue accent ring (outline)
    s.addShape('ellipse', {
      x: SLIDE_W - 3.2, y: 1.2, w: 2.4, h: 2.4,
      fill: { color: NAVY_800, transparency: 100 },
      line: { color: NAVY_100, width: 0.75, transparency: 70 },
    });

    // Top eyebrow pill
    s.addShape('ellipse', {
      x: 0.7, y: 0.86, w: 0.14, h: 0.14,
      fill: { color: GREEN_400 }, line: { color: GREEN_400 },
    });
    s.addText('TRANSFER PRICING · AMSTERDAM', {
      x: 0.95, y: 0.76, w: 8, h: 0.35,
      fontFace: FONT_DISPLAY, fontSize: 11, bold: true, color: GREEN_300,
      charSpacing: 6, margin: 0,
    });

    // Wordmark — logo image (white version for navy background)
    {
      const logoH = 1.15;
      const logoW = logoH * LOGO_ASPECT;
      s.addImage({ path: LOGO_WHITE, x: 0.7, y: 1.3, w: logoW, h: logoH, hyperlink: { url: SITE_URL } });
    }

    // Title
    s.addText([
      { text: 'Your trusted', options: { color: N_0, breakLine: true } },
      { text: 'transfer pricing ', options: { color: N_0 } },
      { text: 'partner.', options: { color: GREEN_400 } },
    ], {
      x: 0.7, y: 2.9, w: 11, h: 2.8,
      fontFace: FONT_DISPLAY, fontSize: 72, bold: true,
      charSpacing: -2, margin: 0,
    });

    // Subtitle
    s.addText('Capability deck — 2026', {
      x: 0.7, y: 5.5, w: 8, h: 0.45,
      fontFace: FONT_DISPLAY, fontSize: 16, color: NAVY_100, margin: 0,
    });

    // Divider
    s.addShape('rect', {
      x: 0.7, y: 5.95, w: 1.2, h: 0.04,
      fill: { color: GREEN_500 }, line: { color: GREEN_500 },
    });

    // Bottom row — firm name + QR
    s.addText('inRange Solutions B.V.', {
      x: 0.7, y: 6.4, w: 5, h: 0.35,
      fontFace: FONT_DISPLAY, fontSize: 13, bold: true, color: N_0, margin: 0,
    });
    s.addText('Amsterdam, Netherlands', {
      x: 0.7, y: 6.75, w: 5, h: 0.3,
      fontFace: FONT_BODY, fontSize: 11, color: NAVY_100, margin: 0,
    });

    // QR — bottom right
    const qr = await qrDataUrl(SITE_URL, N_0, NAVY_800);
    s.addImage({ data: qr, x: SLIDE_W - 1.9, y: 5.95, w: 1.2, h: 1.2, hyperlink: { url: SITE_URL } });
    s.addText('Scan for full site', {
      x: SLIDE_W - 2.4, y: 7.15, w: 2.2, h: 0.25,
      fontFace: FONT_BODY, fontSize: 9, color: NAVY_100, align: 'right', margin: 0,
    });
  }

  // ==================== Slide 2: About us ====================
  {
    const s = pres.addSlide();
    s.background = { color: N_0 };

    // Very subtle brand orb top-right
    cornerOrb(s, { x: SLIDE_W - 3.5, y: -2, size: 5, color: GREEN_500, transparency: 96 });

    eyebrow(s, 'ABOUT US', { x: 0.7, y: 0.65 });
    titleText(s, 'Transfer pricing expertise,\ncombined with market-leading technology.', {
      x: 0.7, y: 1.0, w: 11, h: 1.8, fontSize: 40, color: NAVY_800,
    });

    // Divider
    s.addShape('rect', {
      x: 0.7, y: 2.85, w: 0.9, h: 0.04,
      fill: { color: GREEN_500 }, line: { color: GREEN_500 },
    });

    // Two-column layout — mission/value on left, team + bio placeholder on right
    // LEFT — mission & unique value
    s.addText('Our mission', {
      x: 0.7, y: 3.15, w: 6, h: 0.35,
      fontFace: FONT_DISPLAY, fontSize: 14, bold: true, color: GREEN_700, margin: 0,
    });
    body(s, 'At inRange, we combine Transfer Pricing expertise with market-leading technology and a passion for serving clients. Our experts have decades of experience gained at leading global consulting firms and multinational companies — and apply it to develop practical, sustainable solutions for your group.', {
      x: 0.7, y: 3.5, w: 6, h: 1.8, fontSize: 13, color: N_700,
    });

    s.addText('What sets us apart', {
      x: 0.7, y: 5.25, w: 6, h: 0.35,
      fontFace: FONT_DISPLAY, fontSize: 14, bold: true, color: GREEN_700, margin: 0,
    });
    s.addText([
      { text: 'Senior-led — partner-calibre advice on every engagement.', options: { bullet: { code: '25CF' }, color: N_700, breakLine: true } },
      { text: 'AI-enabled delivery — documentation and research up to 60% faster.', options: { bullet: { code: '25CF' }, color: N_700, breakLine: true } },
      { text: 'Independent — TP-only focus, no cross-sell conflicts.', options: { bullet: { code: '25CF' }, color: N_700, breakLine: true } },
      { text: 'Materially better value than Big-Four engagements.', options: { bullet: { code: '25CF' }, color: N_700 } },
    ], {
      x: 0.7, y: 5.6, w: 6, h: 1.5,
      fontFace: FONT_BODY, fontSize: 12.5, color: N_700,
      paraSpaceAfter: 4, margin: 0,
    });

    // RIGHT — founder placeholder card
    const cardX = 7.4, cardY = 3.15, cardW = 5.2, cardH = 3.95;
    s.addShape('roundRect', {
      x: cardX, y: cardY, w: cardW, h: cardH,
      fill: { color: N_50 }, line: { color: N_200, width: 1 }, rectRadius: 0.2,
    });

    // Founder photo — circular crop
    s.addImage({
      path: FOUNDER_PHOTO,
      x: cardX + 0.5, y: cardY + 0.5, w: 1.6, h: 1.6,
      rounding: true,
    });
    // Thin ring around the photo to match the card's subtle border
    s.addShape('ellipse', {
      x: cardX + 0.5, y: cardY + 0.5, w: 1.6, h: 1.6,
      fill: { color: 'FFFFFF', transparency: 100 },
      line: { color: NAVY_100, width: 1 },
    });

    // Name + role placeholder (right of photo)
    s.addText('[ Founder name ]', {
      x: cardX + 2.3, y: cardY + 0.7, w: 2.7, h: 0.45,
      fontFace: FONT_DISPLAY, fontSize: 18, bold: true, color: NAVY_800, margin: 0,
    });
    s.addText('Founder · Managing Partner', {
      x: cardX + 2.3, y: cardY + 1.15, w: 2.7, h: 0.3,
      fontFace: FONT_BODY, fontSize: 11, color: GREEN_700, margin: 0,
    });
    s.addText('15+ yrs · Amsterdam', {
      x: cardX + 2.3, y: cardY + 1.45, w: 2.7, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10, color: N_500, margin: 0,
    });

    // Bio placeholder
    s.addText('[ Short bio — prior firms, focus areas, typical engagements. Replace this placeholder before sending. ]', {
      x: cardX + 0.5, y: cardY + 2.35, w: cardW - 1, h: 1.3,
      fontFace: FONT_BODY, fontSize: 11.5, italic: true, color: N_500,
      paraSpaceAfter: 6, margin: 0,
    });

    footer(s, 2, PAGE_TOTAL);
  }

  // ==================== Slide 3: Services ====================
  {
    const s = pres.addSlide();
    s.background = { color: N_0 };

    eyebrow(s, 'OUR SERVICES', { x: 0.7, y: 0.65 });
    titleText(s, 'Six ways we help.', {
      x: 0.7, y: 1.0, w: 8, h: 1.1, fontSize: 44, color: NAVY_800,
    });
    body(s, 'A focused Transfer Pricing practice. Every engagement led by a senior specialist; every deliverable reviewed at partner level.', {
      x: 0.7, y: 2.15, w: 8.6, h: 0.7, fontSize: 13.5, color: N_700,
    });

    // 3x2 grid of service cards
    const services = [
      { n: '01', title: 'Transfer Pricing Advice',         sub: 'Planning → implementation',
        body: "Expert guidance on all aspects of TP, ensuring your intercompany set-up is at arm's length." },
      { n: '02', title: 'TP Documentation',                sub: 'Master file · Local files · CbCR',
        body: 'Stay compliant worldwide — we prepare, update and review your Master file, Local files and CbCR.' },
      { n: '03', title: 'Audit Support',                   sub: 'Tax audits & controversy',
        body: 'Safeguard your business during TP examinations — early-stage support, strategic defence, favourable outcomes.' },
      { n: '04', title: 'Interim Placements',              sub: 'Peak-workload support',
        body: 'Experienced TP specialists embedded inside your team during peak workload periods.' },
      { n: '05', title: 'Economic Analyses',               sub: 'Financial & non-financial data',
        body: 'Expert support analysing financial and non-financial data for Transfer Pricing purposes.' },
      { n: '06', title: 'Legal Agreements',                sub: 'Intercompany contracts',
        body: 'Prepare or refresh the legal agreements supporting your intercompany transactions.' },
    ];

    const cols = 3, rows = 2;
    const gridX = 0.7, gridY = 3.1;
    const gridW = SLIDE_W - 1.4;
    const gap = 0.25;
    const cardW = (gridW - gap * (cols - 1)) / cols;
    const cardH = 1.85;

    services.forEach((svc, i) => {
      const col = i % cols, row = Math.floor(i / cols);
      const x = gridX + col * (cardW + gap);
      const y = gridY + row * (cardH + gap);

      s.addShape('roundRect', {
        x, y, w: cardW, h: cardH,
        fill: { color: N_0 }, line: { color: N_200, width: 1 }, rectRadius: 0.16,
        shadow: { type: 'outer', color: '000000', blur: 6, offset: 2, angle: 135, opacity: 0.04 },
      });
      numberBadge(s, svc.n, { x: x + 0.35, y: y + 0.3, size: 0.5, fill: GREEN_500, color: N_0, fontSize: 12 });
      s.addText(svc.sub, {
        x: x + 1.0, y: y + 0.32, w: cardW - 1.3, h: 0.25,
        fontFace: FONT_DISPLAY, fontSize: 9.5, bold: true, color: GREEN_700, charSpacing: 3, margin: 0,
      });
      s.addText(svc.title, {
        x: x + 0.35, y: y + 0.88, w: cardW - 0.7, h: 0.45,
        fontFace: FONT_DISPLAY, fontSize: 17, bold: true, color: NAVY_800, charSpacing: -0.3, margin: 0,
      });
      s.addText(svc.body, {
        x: x + 0.35, y: y + 1.3, w: cardW - 0.7, h: 0.52,
        fontFace: FONT_BODY, fontSize: 10.5, color: N_700, margin: 0,
      });
    });

    footer(s, 3, PAGE_TOTAL);
  }

  // ==================== Slide 4: How we work ====================
  {
    const s = pres.addSlide();
    s.background = { color: N_0 };

    cornerOrb(s, { x: SLIDE_W - 3, y: -2, size: 5, color: GREEN_500, transparency: 96 });

    eyebrow(s, 'HOW WE WORK', { x: 0.7, y: 0.65 });
    titleText(s, 'A predictable path from scope to sign-off.', {
      x: 0.7, y: 1.0, w: 11.5, h: 1.1, fontSize: 42, color: NAVY_800,
    });
    body(s, 'Every engagement runs on the same four-stage cadence — led end-to-end by a senior specialist, with AI-enabled tooling handling the mechanical work so yours gets the considered thought.', {
      x: 0.7, y: 2.15, w: 11.5, h: 0.75, fontSize: 13.5, color: N_700,
    });

    const stages = [
      { n: '01', title: 'Scope', timing: 'Week 1',
        body: 'Discovery call, review of your group structure and intercompany flows, agreement on deliverables and fee.',
        tags: ['Fixed fee', 'Senior-led'] },
      { n: '02', title: 'Analyse', timing: 'Weeks 2–4',
        body: 'Functional analysis, economic analyses and benchmarking — AI-accelerated research, human judgement on method and comparables.',
        tags: ['OECD-aligned', 'AI-enabled'] },
      { n: '03', title: 'Document', timing: 'Weeks 4–8',
        body: 'Master file, Local files and Country-by-Country Reporting, drafted to local-country regulatory requirements in every jurisdiction you operate.',
        tags: ['Locally compliant', 'Partner-reviewed'] },
      { n: '04', title: 'Support', timing: 'Ongoing',
        body: 'Tax-audit defence, controversy support, refreshes on change — and interim placement when your own team needs an extra set of hands.',
        tags: ['Audit defence', 'Interim specialists'] },
    ];

    const startY = 3.35;
    const circleSize = 0.85;
    const gridX = 0.7;
    const gridW = SLIDE_W - 1.4;
    const colCount = 4;
    const gap = 0.3;
    const colW = (gridW - gap * (colCount - 1)) / colCount;

    // Connector line behind circles (horizontal) — matches website's desktop process timeline
    const lineY = startY + circleSize / 2;
    s.addShape('rect', {
      x: gridX + colW / 2, y: lineY - 0.005,
      w: gridW - colW, h: 0.012,
      fill: { color: N_200 }, line: { color: N_200 },
    });

    stages.forEach((st, i) => {
      const x = gridX + i * (colW + gap);
      const circleX = x + (colW - circleSize) / 2;

      // Circle with white border (covers connector line at this position)
      s.addShape('ellipse', {
        x: circleX, y: startY, w: circleSize, h: circleSize,
        fill: { color: NAVY_800 }, line: { color: N_0, width: 3 },
      });
      s.addText(st.n, {
        x: circleX, y: startY, w: circleSize, h: circleSize,
        align: 'center', valign: 'middle',
        fontFace: FONT_DISPLAY, fontSize: 15, bold: true, color: N_0, margin: 0,
      });

      // Timing eyebrow (centered under circle)
      s.addText(st.timing.toUpperCase(), {
        x, y: startY + circleSize + 0.2, w: colW, h: 0.28,
        fontFace: FONT_DISPLAY, fontSize: 9.5, bold: true, color: GREEN_600,
        charSpacing: 5, align: 'center', margin: 0,
      });

      // Title
      s.addText(st.title, {
        x, y: startY + circleSize + 0.5, w: colW, h: 0.45,
        fontFace: FONT_DISPLAY, fontSize: 22, bold: true, color: NAVY_800,
        align: 'center', margin: 0, charSpacing: -0.5,
      });

      // Body
      s.addText(st.body, {
        x, y: startY + circleSize + 1.05, w: colW, h: 1.35,
        fontFace: FONT_BODY, fontSize: 11, color: N_700, margin: 0,
      });

      // Tag chips — stacked if multiple
      const tagY = startY + circleSize + 2.45;
      let tx = x;
      st.tags.forEach((t) => {
        const tw = Math.max(1.0, 0.25 + t.length * 0.095);
        chip(s, t, { x: tx, y: tagY, w: tw, h: 0.35, fill: GREEN_50, color: GREEN_700, fontSize: 9.5 });
        tx += tw + 0.1;
      });
    });

    footer(s, 4, PAGE_TOTAL);
  }

  // ==================== Slides 5 & 6: Highlighted projects ====================
  const highlightedProjects = [
    {
      city: 'Amsterdam · Netherlands',
      tag: 'TP Policy Design',
      industry: 'Payments · Fintech',
      title: 'Group-wide TP policy for a global fintech.',
      challenge: '[ Placeholder — brief description of the client situation: group structure, core flows and the regulatory pressure that triggered the review. ]',
      approach: '[ Placeholder — what we did: functional mapping, benchmarking, intercompany framework design covering licensing and intra-group services. ]',
      results:  '[ Placeholder — quantifiable outcome: e.g., policy adopted across N jurisdictions, successful audit defence, documentation cycle X% faster. ]',
    },
    {
      city: 'London · United Kingdom',
      tag: 'Audit Defence',
      industry: 'FMCG',
      title: 'HMRC audit defence for a mid-size FMCG.',
      challenge: '[ Placeholder — context of the HMRC enquiry, period under review, intercompany flows in scope. ]',
      approach: '[ Placeholder — early engagement with HMRC, position papers, economic analysis supporting the existing TP set-up. ]',
      results:  '[ Placeholder — quantifiable outcome: enquiry closed favourably, £X of proposed adjustment avoided, no penalty. ]',
    },
  ];

  for (let idx = 0; idx < highlightedProjects.length; idx++) {
    const p = highlightedProjects[idx];
    const s = pres.addSlide();
    s.background = { color: N_0 };

    // Hero band (navy) on the left
    const heroW = 4.8;
    s.addShape('rect', {
      x: 0, y: 0, w: heroW, h: SLIDE_H,
      fill: { color: NAVY_800 }, line: { color: NAVY_800 },
    });
    // Decorative green orb on the hero band
    cornerOrb(s, { x: heroW - 2.5, y: -2, size: 4, color: GREEN_500, transparency: 88 });

    // Eyebrow + project number
    s.addText(`HIGHLIGHTED PROJECT · 0${idx + 1}`, {
      x: 0.6, y: 0.75, w: heroW - 0.8, h: 0.3,
      fontFace: FONT_DISPLAY, fontSize: 11, bold: true, color: GREEN_300, charSpacing: 6, margin: 0,
    });

    // City
    s.addText(p.city, {
      x: 0.6, y: 1.15, w: heroW - 0.8, h: 0.4,
      fontFace: FONT_BODY, fontSize: 13, color: NAVY_100, margin: 0,
    });

    // Project title
    s.addText(p.title, {
      x: 0.6, y: 1.75, w: heroW - 0.8, h: 2.8,
      fontFace: FONT_DISPLAY, fontSize: 30, bold: true, color: N_0,
      charSpacing: -1, margin: 0, valign: 'top',
    });

    // Tags at bottom of hero
    chip(s, p.tag,      { x: 0.6, y: 4.7, w: 2.1, h: 0.4, fill: GREEN_500, color: N_0, fontSize: 10 });
    chip(s, p.industry, { x: 0.6, y: 5.2, w: 2.6, h: 0.4, fill: NAVY_700, color: GREEN_300, fontSize: 10 });

    // Divider + footer mark on hero
    s.addShape('rect', {
      x: 0.6, y: 6.7, w: 0.9, h: 0.04,
      fill: { color: GREEN_500 }, line: { color: GREEN_500 },
    });
    s.addText('inRange', {
      x: 0.6, y: 6.8, w: 3, h: 0.3,
      fontFace: FONT_DISPLAY, fontSize: 12, bold: true, color: N_0, margin: 0,
    });

    // Right content column
    const rx = heroW + 0.7;
    const rw = SLIDE_W - rx - 0.7;

    eyebrow(s, 'CASE STUDY', { x: rx, y: 0.75 });

    // Three sections: Challenge, Approach, Results — icon-led rows
    const rows = [
      { label: 'THE CHALLENGE', text: p.challenge, n: '01' },
      { label: 'OUR APPROACH',  text: p.approach,  n: '02' },
      { label: 'THE RESULTS',   text: p.results,   n: '03' },
    ];

    let ry = 1.3;
    rows.forEach((row) => {
      // number badge
      numberBadge(s, row.n, { x: rx, y: ry, size: 0.55, fill: GREEN_50, color: GREEN_700, fontSize: 13 });
      // label
      s.addText(row.label, {
        x: rx + 0.75, y: ry + 0.05, w: rw - 0.75, h: 0.3,
        fontFace: FONT_DISPLAY, fontSize: 10.5, bold: true, color: GREEN_700, charSpacing: 6, margin: 0,
      });
      // body
      s.addText(row.text, {
        x: rx + 0.75, y: ry + 0.4, w: rw - 0.75, h: 1.4,
        fontFace: FONT_BODY, fontSize: 12, color: N_700, italic: true, margin: 0,
      });
      ry += 1.85;
    });

    footer(s, 5 + idx, PAGE_TOTAL);
  }

  // ==================== Slide 7: Recent engagements (radial map) ====================
  {
    const s = pres.addSlide();
    s.background = { color: NAVY_800 };

    // Decorative orbs
    cornerOrb(s, { x: -2, y: SLIDE_H - 4, size: 5, color: GREEN_500, transparency: 93 });
    cornerOrb(s, { x: SLIDE_W - 3, y: -2, size: 5, color: GREEN_500, transparency: 90 });

    s.addText('RECENT ENGAGEMENTS', {
      x: 0.7, y: 0.55, w: 10, h: 0.3,
      fontFace: FONT_DISPLAY, fontSize: 11, bold: true, color: GREEN_300,
      charSpacing: 6, margin: 0,
    });
    s.addText('Amsterdam-based, working internationally.', {
      x: 0.7, y: 0.88, w: 11.5, h: 0.9,
      fontFace: FONT_DISPLAY, fontSize: 32, bold: true, color: N_0,
      charSpacing: -0.8, margin: 0,
    });
    s.addText('15 engagements · 12 cities · scoped out of Amsterdam, delivered wherever they are needed.', {
      x: 0.7, y: 1.75, w: 11.5, h: 0.32,
      fontFace: FONT_BODY, fontSize: 12, color: NAVY_100, margin: 0,
    });

    // HQ centre position
    const cx = 6.75, cy = 4.4;
    const xStretch = 1.2; // extend horizontally; labels need room on the sides

    // Projects (15 engagements across 12 cities)
    const projects = [
      { city: 'Amsterdam',        tag: 'TP Policy',             lat: 52.37, lon: 4.90 },
      { city: 'Amsterdam',        tag: 'Financial Transactions',lat: 52.37, lon: 4.90 },
      { city: 'Amsterdam',        tag: 'TP Diagnostics',        lat: 52.37, lon: 4.90 },
      { city: 'Tokyo',            tag: 'Local File',            lat: 35.68, lon: 139.69 },
      { city: 'London',           tag: 'Audit Defence',         lat: 51.51, lon: -0.13 },
      { city: 'London',           tag: 'Master File',           lat: 51.51, lon: -0.13 },
      { city: 'Mexico City',      tag: 'Local File',            lat: 19.43, lon: -99.13 },
      { city: 'Frankfurt',        tag: 'Audit Support',         lat: 50.11, lon: 8.68 },
      { city: 'Stockholm',        tag: 'Master File Review',    lat: 59.33, lon: 18.07 },
      { city: 'New York',         tag: 'Benchmarking',          lat: 40.71, lon: -74.01 },
      { city: 'Ho Chi Minh City', tag: 'Profit Attribution',    lat: 10.82, lon: 106.63 },
      { city: 'Sydney',           tag: 'Profit Attribution',    lat: -33.87, lon: 151.21 },
      { city: 'Copenhagen',       tag: 'Audit Defence',         lat: 55.68, lon: 12.57 },
      { city: 'San Jose',         tag: 'APA Support',           lat: 37.34, lon: -121.89 },
      { city: 'Dubai',            tag: 'Valuation',             lat: 25.20, lon: 55.27 },
    ];

    // Group by city so one marker per location shows all its tags.
    const byCity = new Map();
    for (const p of projects) {
      if (!byCity.has(p.city)) byCity.set(p.city, { city: p.city, tags: [] });
      byCity.get(p.city).tags.push(p.tag);
    }

    // Manual angles + radii (math angle, 0°=east, 90°=up). Tuned for readability — roughly geographic but no collisions.
    const CALLOUTS = {
      'Copenhagen':       { deg:  85, r: 1.7 },
      'Stockholm':        { deg:  55, r: 2.1 },
      'Tokyo':            { deg:  18, r: 3.0 },
      'Dubai':            { deg: -15, r: 2.9 },
      'Ho Chi Minh City': { deg: -42, r: 2.8 },
      'Sydney':           { deg: -68, r: 2.4 },
      'Frankfurt':        { deg: -100, r: 1.7 },
      'Mexico City':      { deg: -138, r: 2.8 },
      'New York':         { deg: -162, r: 3.0 },
      'London':           { deg:  175, r: 2.2 },
      'San Jose':         { deg:  148, r: 3.2 },
    };

    const toRad = (d) => d * Math.PI / 180;

    // Draw spokes first (so dots + labels layer above)
    for (const [city, cfg] of Object.entries(CALLOUTS)) {
      const a = toRad(cfg.deg);
      const tx = cx + cfg.r * Math.cos(a) * xStretch;
      const ty = cy - cfg.r * Math.sin(a);
      s.addShape('line', {
        x: cx, y: cy, w: tx - cx, h: ty - cy,
        line: { color: GREEN_500, width: 1, transparency: 45, dashType: 'dash' },
      });
    }

    // City dots + labels
    for (const [city, cfg] of Object.entries(CALLOUTS)) {
      const c = byCity.get(city);
      if (!c) continue;
      const a = toRad(cfg.deg);
      const dx = Math.cos(a) * xStretch, dy = -Math.sin(a);
      const tx = cx + cfg.r * dx;
      const ty = cy + cfg.r * dy;

      // dot
      s.addShape('ellipse', {
        x: tx - 0.1, y: ty - 0.1, w: 0.2, h: 0.2,
        fill: { color: GREEN_400 }, line: { color: N_0, width: 1 },
      });

      // Label side: right half of circle → text to right; left half → text to left
      const labelOnRight = Math.cos(a) >= 0;
      const labelW = 2.2;
      const labelGap = 0.15;
      const labelX = labelOnRight ? tx + labelGap : tx - labelW - labelGap;
      const cityLabel = c.city.toUpperCase() + (c.tags.length > 1 ? `  ×${c.tags.length}` : '');

      s.addText(cityLabel, {
        x: labelX, y: ty - 0.3, w: labelW, h: 0.28,
        fontFace: FONT_DISPLAY, fontSize: 10, bold: true, color: N_0,
        charSpacing: 4, align: labelOnRight ? 'left' : 'right', margin: 0,
      });
      s.addText(c.tags.join(' · '), {
        x: labelX, y: ty - 0.02, w: labelW, h: 0.58,
        fontFace: FONT_BODY, fontSize: 9, color: GREEN_300,
        align: labelOnRight ? 'left' : 'right', margin: 0,
      });
    }

    // HQ (Amsterdam) marker — layered: outer glow, mid ring, bright core
    s.addShape('ellipse', {
      x: cx - 0.35, y: cy - 0.35, w: 0.7, h: 0.7,
      fill: { color: GREEN_500, transparency: 75 }, line: { color: GREEN_500, transparency: 100 },
    });
    s.addShape('ellipse', {
      x: cx - 0.22, y: cy - 0.22, w: 0.44, h: 0.44,
      fill: { color: GREEN_500, transparency: 50 }, line: { color: GREEN_500, transparency: 100 },
    });
    s.addShape('ellipse', {
      x: cx - 0.13, y: cy - 0.13, w: 0.26, h: 0.26,
      fill: { color: N_0 }, line: { color: GREEN_500, width: 2 },
    });

    // HQ text block (centered under marker) — kept compact to avoid clashing with Frankfurt callout below
    s.addText('AMSTERDAM · HQ', {
      x: cx - 2.0, y: cy + 0.42, w: 4.0, h: 0.3,
      fontFace: FONT_DISPLAY, fontSize: 12, bold: true, color: N_0,
      align: 'center', charSpacing: 5, margin: 0,
    });
    const ams = byCity.get('Amsterdam');
    if (ams) {
      s.addText(`${ams.tags.length} engagements · ${ams.tags.join(' · ')}`, {
        x: cx - 2.8, y: cy + 0.72, w: 5.6, h: 0.28,
        fontFace: FONT_BODY, fontSize: 9.5, color: GREEN_300, italic: true,
        align: 'center', margin: 0,
      });
    }

    // Legend — bottom-left
    const lgY = SLIDE_H - 0.8;
    s.addShape('ellipse', {
      x: 0.7, y: lgY, w: 0.15, h: 0.15,
      fill: { color: N_0 }, line: { color: GREEN_500, width: 1.5 },
    });
    s.addText('HQ', {
      x: 0.9, y: lgY - 0.02, w: 0.4, h: 0.22,
      fontFace: FONT_DISPLAY, fontSize: 9.5, bold: true, color: NAVY_100, margin: 0,
    });
    s.addShape('ellipse', {
      x: 1.5, y: lgY, w: 0.15, h: 0.15,
      fill: { color: GREEN_400 }, line: { color: GREEN_400 },
    });
    s.addText('Engagement', {
      x: 1.7, y: lgY - 0.02, w: 1.3, h: 0.22,
      fontFace: FONT_DISPLAY, fontSize: 9.5, bold: true, color: NAVY_100, margin: 0,
    });

    footer(s, 7, PAGE_TOTAL, { inverted: true });
  }

  // ==================== Slide 8: Credentials — Industries served ====================
  {
    const s = pres.addSlide();
    s.background = { color: N_0 };

    // Soft orbs
    cornerOrb(s, { x: -1.5, y: SLIDE_H - 3, size: 5, color: NAVY_500, transparency: 95 });
    cornerOrb(s, { x: SLIDE_W - 3, y: -1.5, size: 4, color: GREEN_500, transparency: 94 });

    eyebrow(s, 'CREDENTIALS', { x: 0.7, y: 0.65 });
    titleText(s, 'Industries we serve.', {
      x: 0.7, y: 1.0, w: 9, h: 1.1, fontSize: 44, color: NAVY_800,
    });
    body(s, 'A focused practice, applied across the sectors where transfer pricing complexity is highest.', {
      x: 0.7, y: 2.2, w: 11, h: 0.5, fontSize: 13.5, color: N_700,
    });

    // Left block — 3 stats
    const stats = [
      { big: '15+', unit: 'ENGAGEMENTS', label: 'Across recent projects' },
      { big: '15+', unit: 'JURISDICTIONS', label: 'From Amsterdam outward' },
      { big: '8',   unit: 'INDUSTRIES',   label: 'Where we have depth' },
    ];
    stats.forEach((st, i) => {
      statBlock(s, { x: 0.7 + i * 2.2, y: 3.1, w: 2.0, big: st.big, unit: st.unit, label: st.label, numColor: GREEN_600 });
    });

    // Thin divider
    s.addShape('rect', {
      x: 0.7, y: 5.0, w: SLIDE_W - 1.4, h: 0.02,
      fill: { color: N_200 }, line: { color: N_200 },
    });

    // Industries chip cloud
    s.addText('INDUSTRIES', {
      x: 0.7, y: 5.25, w: 3, h: 0.3,
      fontFace: FONT_DISPLAY, fontSize: 10.5, bold: true, color: GREEN_700, charSpacing: 6, margin: 0,
    });

    const industries = [
      'Construction', 'Consumer & Retail', 'FMCG', 'Food Delivery',
      'Industrial', 'Payments', 'SaaS & Technology', 'Travel',
    ];
    const chipStartX = 0.7;
    const chipY = 5.7;
    const chipH = 0.42;
    const chipGap = 0.12;
    // wrap across two rows if needed
    let x = chipStartX;
    let y = chipY;
    const rowMaxX = SLIDE_W - 0.7;
    industries.forEach((label) => {
      const estWidth = Math.max(1.3, 0.2 + label.length * 0.11);
      if (x + estWidth > rowMaxX) { x = chipStartX; y += chipH + 0.2; }
      chip(s, label, { x, y, w: estWidth, h: chipH, fill: GREEN_50, color: GREEN_700, fontSize: 11.5 });
      x += estWidth + chipGap;
    });

    footer(s, 8, PAGE_TOTAL);
  }

  // ==================== Slide 9: Get in touch ====================
  {
    const s = pres.addSlide();
    s.background = { color: NAVY_800 };

    // Decorative orbs
    cornerOrb(s, { x: SLIDE_W - 4, y: SLIDE_H - 4, size: 6, color: GREEN_500, transparency: 88 });
    cornerOrb(s, { x: -2, y: -2, size: 4, color: GREEN_500, transparency: 93 });
    s.addShape('ellipse', {
      x: SLIDE_W - 3.5, y: 1, w: 2.6, h: 2.6,
      fill: { color: NAVY_800, transparency: 100 },
      line: { color: NAVY_100, width: 0.75, transparency: 70 },
    });

    eyebrow(s, "WE'D LOVE TO HEAR FROM YOU", { x: 0.7, y: 0.85, color: GREEN_300 });

    // Big title
    s.addText([
      { text: 'Get your transfer', options: { breakLine: true } },
      { text: 'pricing ', options: {} },
      { text: 'done.', options: { color: GREEN_400 } },
    ], {
      x: 0.7, y: 1.3, w: 9, h: 2.5,
      fontFace: FONT_DISPLAY, fontSize: 58, bold: true, color: N_0,
      charSpacing: -2, margin: 0,
    });

    // Body
    s.addText("A short note is usually enough to start. Tell us what you're working on — a new structure, a documentation cycle, or a question from a tax authority — and we'll come back with a clear next step, typically within a working day.", {
      x: 0.7, y: 3.8, w: 7.8, h: 1.6,
      fontFace: FONT_BODY, fontSize: 14, color: NAVY_100, paraSpaceAfter: 6, margin: 0,
    });

    // Contact block — left
    const cx = 0.7, cy = 5.5;
    s.addShape('rect', {
      x: cx, y: cy, w: 0.04, h: 1.4,
      fill: { color: GREEN_500 }, line: { color: GREEN_500 },
    });
    const contactItems = [
      { label: 'ADDRESS', value: 'Saskia van Uijlenburgkade 104\nAmsterdam, Netherlands' },
      { label: 'EMAIL',   value: 'info@inrange.nl', href: 'mailto:info@inrange.nl' },
      { label: 'PHONE',   value: '+31 648 44 6063', href: 'tel:+31648446063' },
    ];
    contactItems.forEach((c, i) => {
      const colX = cx + 0.25 + i * 2.85;
      s.addText(c.label, {
        x: colX, y: cy, w: 2.7, h: 0.3,
        fontFace: FONT_DISPLAY, fontSize: 9.5, bold: true, color: GREEN_300, charSpacing: 5, margin: 0,
      });
      const textOpts = {
        x: colX, y: cy + 0.3, w: 2.7, h: 1.1,
        fontFace: FONT_BODY, fontSize: 13, color: N_0, margin: 0,
      };
      if (c.href) textOpts.hyperlink = { url: c.href };
      s.addText(c.value, textOpts);
    });

    // QR code block — right
    const qr = await qrDataUrl(SITE_URL, N_0, NAVY_800);
    const qrSize = 1.5;
    const qrX = SLIDE_W - qrSize - 0.7;
    const qrY = 4.1;
    // Card behind QR
    s.addShape('roundRect', {
      x: qrX - 0.3, y: qrY - 0.3, w: qrSize + 0.6, h: qrSize + 1.0,
      fill: { color: NAVY_700 }, line: { color: NAVY_500, width: 1 }, rectRadius: 0.14,
    });
    s.addImage({ data: qr, x: qrX, y: qrY, w: qrSize, h: qrSize, hyperlink: { url: SITE_URL } });
    s.addText('inrange.nl', {
      x: qrX - 0.3, y: qrY + qrSize + 0.05, w: qrSize + 0.6, h: 0.35,
      fontFace: FONT_DISPLAY, fontSize: 12, bold: true, color: N_0, align: 'center', margin: 0,
      hyperlink: { url: SITE_URL },
    });
    s.addText('Scan to visit', {
      x: qrX - 0.3, y: qrY + qrSize + 0.38, w: qrSize + 0.6, h: 0.25,
      fontFace: FONT_BODY, fontSize: 9.5, color: NAVY_100, align: 'center', margin: 0,
    });

    // Footer (inverted colors)
    footer(s, 9, PAGE_TOTAL, { inverted: true });
  }

  const outPath = path.join(__dirname, 'inRange_Capability_Deck.pptx');
  await pres.writeFile({ fileName: outPath });
  console.log('Wrote ' + outPath);
}

build().catch((e) => { console.error(e); process.exit(1); });
