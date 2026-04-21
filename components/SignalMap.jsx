// SignalMap — flat world map with pulses radiating from Amsterdam (HQ) to project cities.
// Every few seconds the next project advances; a soft pulse arcs to its city and
// the accompanying description slides in alongside.

// Piecewise-linear horizontal stretch so Europe (~-15°..45° lon) gets the lion's
// share of width — most projects are there. Americas and Asia/Oceania are compressed
// toward the edges. Latitude is a simple linear crop (60°S..75°N) but biased so the
// vertical centre sits around Europe rather than the equator.
//
// x "zones" (all values are fractions of the canvas width):
//   -180 → -15   : Americas           → 0.00 .. 0.22  (22% of width for 165° of lon)
//    -15 →  45   : Europe/Med/Africa  → 0.22 .. 0.62  (40% of width for only 60° of lon)
//     45 → 180   : Asia / Oceania     → 0.62 .. 1.00  (38% of width for 135° of lon)
const X_ZONES = [
  { lonMin: -180, lonMax: -15, xMin: 0.00, xMax: 0.22 },
  { lonMin:  -15, lonMax:  45, xMin: 0.22, xMax: 0.62 },
  { lonMin:   45, lonMax: 180, xMin: 0.62, xMax: 1.00 },
];
const lonToFrac = (lon) => {
  const z = X_ZONES.find(z => lon >= z.lonMin && lon <= z.lonMax) || X_ZONES[X_ZONES.length - 1];
  const t = (lon - z.lonMin) / (z.lonMax - z.lonMin);
  return z.xMin + t * (z.xMax - z.xMin);
};
const latToFrac = (lat) => {
  // Crop: show 60°S .. 75°N. Keep linear so cities stay plausibly placed.
  const latMin = -60, latMax = 75;
  return (latMax - lat) / (latMax - latMin);
};
const project = (lat, lon, w, h) => [lonToFrac(lon) * w, latToFrac(lat) * h];

// Land bitmap, 120 cols x 56 rows, generated from hand-authored continent polygons.
// Coastline is coarse but reads as a recognisable world map, and verified positions
// for Amsterdam, London, Tokyo, Mexico City, Stockholm, Berlin, NYC, São Paulo, Sydney.
const LAND_ROWS = [
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000000000001111111111110000000000000000000000000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000000000001111111111111000000000000000000000000000000011111111110000000000000000000000000",
  "000000000000000000000000000000000000000001111111111110000000000000000000000000000111111111111111111110000000000000000000",
  "000000000000000000000000000000111100000001111111111000000000000000000000000000111111111111111111111111111110000001111111",
  "000000001000000000001111111111111111100000111111000000000000000000000000000111111111111111111111111111111111111111111111",
  "000000111111111111111111111111111111111000111000000000000000000011111111111111111111111111111111111111111111111111111111",
  "000011111111111111111111111111111111111100000000000001100000000111111111111111111111111111111111111111111111111111111110",
  "000011111111111111111111111111111111111110000000000000000000001111111111111111111111111111111111111111111111111111110000",
  "000011111111111111111111111111111111111111000000000000000000001111111101111111111111111111111111111111111111111100000000",
  "000001111000000111111111111111111111111110000000000000000010000111110001111111111111111111111111111111111111110000000000",
  "000000000000000011111111111111111111111100000000000000000111000111111001111111111111111111111111111111111111000000000000",
  "000000000000000001111111111111111111111000000000000000000011011111111101111111111111111111111111111111111111000000000000",
  "000000000000000000111111111111111111111000000000000000000111111111111111111111111111111111111111111111111110000000000000",
  "000000000000000000011111111111111111110000000000000000000111111111111111111111111111111111111111111111111100000000000000",
  "000000000000000000011111111111111111110000000000000000000111111111111100111111111111111111111111111111111000000000000000",
  "000000000000000000011111111111111111100000000000000000000111110011111000011111111111111111111111111111100001100000000000",
  "000000000000000000011111111111111111000000000000000000000111100000001000000000000011111111111111111111000011000000000000",
  "000000000000000000011111111111111110000000000000000000000111000000000000011100000000011111111111111110000011000000000000",
  "000000000000000000001111111111111100000000000000000000000000000000000000111100000000000011111111111110000110000000000000",
  "000000000000000000000111111111111000000000000000000000000000000000000001111110000000000001111111111100000000000000000000",
  "000000000000000000000011111111111000000000000000000000000000000000000001111110000000000000111111111000000000000000000000",
  "000000000000000000000011111111111000000000000000000000000000000000000000111110000000000000001111110000000000000000000000",
  "000000000000000000000001111111111000000000000000000000001110000000000000111111100000111110000111100000000000000000000000",
  "000000000000000000000000011111100000000000000000000000011111111111111110011111100001111110001111100000000000000000000000",
  "000000000000000000000000001111000000000000000000000000111111111111111111001111100000111110001110000000000000000000000000",
  "000000000000000000000000000110000000000000000000000000111111111111111111100111000000111100000111000010000000000000000000",
  "000000000000000000000000000000010000000000000000000000011111111111111111110011000000011100000111000010000000000000000000",
  "000000000000000000000000000000001110000000000000000000011111111111111111110110000000011000000010000011000000000000000000",
  "000000000000000000000000000000000111111100000000000000001111111111111111111100000000001000000000000010000000000000000000",
  "000000000000000000000000000000000011111111000000000000000111111111111111111100000000000000000000000000000000000000000000",
  "000000000000000000000000000000000011111111100000000000000000000111111111111000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000111111111110000000000000000000111111111111000000000000000001100000000000000000000000000",
  "000000000000000000000000000000000111111111111000000000000000000011111111110000000000000000001111000000000000000000000000",
  "000000000000000000000000000000000111111111111100000000000000000011111111100000000000000000000111111111111100000000000000",
  "000000000000000000000000000000000011111111111110000000000000000001111111100000000000000000000001111111111100000000000000",
  "000000000000000000000000000000000011111111111111000000000000000001111111100000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000011111111111111000000000000000011111111100000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000001111111111110000000000000000011111111101000000000000000000000000000111111000000000000",
  "000000000000000000000000000000000000111111111110000000000000000011111111101100000000000000000000000001111111100000000000",
  "000000000000000000000000000000000000011111111110000000000000000011111111100100000000000000000000000111111111100000000000",
  "000000000000000000000000000000000000011111111100000000000000000001111111000110000000000000000000001111111111110000000000",
  "000000000000000000000000000000000000111111111000000000000000000001111110000100000000000000000000001111111111111000000000",
  "000000000000000000000000000000000000111111110000000000000000000001111110000000000000000000000000001111111111111000000000",
  "000000000000000000000000000000000000111111100000000000000000000000111100000000000000000000000000001111111111111000000000",
  "000000000000000000000000000000000000111111000000000000000000000000111100000000000000000000000000001111000111111000000000",
  "000000000000000000000000000000000000111110000000000000000000000000000000000000000000000000000000000000000011111000000100",
  "000000000000000000000000000000000000111110000000000000000000000000000000000000000000000000000000000000000001110000000110",
  "000000000000000000000000000000000000111000000000000000000000000000000000000000000000000000000000000000000000000000001110",
  "000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000011100",
  "000000000000000000000000000000000001110000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000001100000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000001100000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
];

function WorldDots({ width, height }) {
  const rows = LAND_ROWS.length;
  const cols = LAND_ROWS[0].length;
  const LON_MIN = -180, LON_MAX = 180, LAT_TOP = 85, LAT_BOT = -60;

  // Sample: given lon/lat, is that point on land per the bitmap?
  const sampleLand = (lon, lat) => {
    const c = Math.floor(((lon - LON_MIN) / (LON_MAX - LON_MIN)) * cols);
    const r = Math.floor(((LAT_TOP - lat) / (LAT_TOP - LAT_BOT)) * rows);
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    return LAND_ROWS[r][c] === '1';
  };

  // Render dots on a fixed screen-space grid so density stays even across zones
  // even though geographic scale is non-linear.
  const DOT_GRID_COLS = 180;
  const DOT_GRID_ROWS = 90;
  const cellW = width / DOT_GRID_COLS;
  const cellH = height / DOT_GRID_ROWS;
  const radius = Math.min(cellW, cellH) * 0.32;

  // Inverse projection — for each screen cell, find its lon/lat to sample the bitmap.
  const fracToLon = (fx) => {
    const z = X_ZONES.find(z => fx >= z.xMin && fx <= z.xMax) || X_ZONES[X_ZONES.length - 1];
    const t = (fx - z.xMin) / (z.xMax - z.xMin);
    return z.lonMin + t * (z.lonMax - z.lonMin);
  };
  const fracToLat = (fy) => {
    const latMin = -60, latMax = 75;
    return latMax - fy * (latMax - latMin);
  };

  const dots = [];
  for (let gr = 0; gr < DOT_GRID_ROWS; gr++) {
    for (let gc = 0; gc < DOT_GRID_COLS; gc++) {
      const fx = (gc + 0.5) / DOT_GRID_COLS;
      const fy = (gr + 0.5) / DOT_GRID_ROWS;
      const lon = fracToLon(fx);
      const lat = fracToLat(fy);
      if (!sampleLand(lon, lat)) continue;
      dots.push(
        <circle
          key={`${gr}-${gc}`}
          cx={fx * width}
          cy={fy * height}
          r={radius}
          fill="rgba(255,255,255,0.24)"
        />
      );
    }
  }
  return <g>{dots}</g>;
}

// Great-circle approximation: a quadratic bezier with a curve-up control point
// reads as an arc and is cheaper than proper geodesics.
function arcPath(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / dist;
  const ny = dx / dist;
  const offset = dist * 0.28;
  const cx = mx + nx * offset;
  const cy = my + ny * offset - Math.min(40, dist * 0.08);
  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, cx, cy };
}

function SignalMapSection() {
  const isMobile = window.useMediaQuery('(max-width: 767px)');
  const isTablet = window.useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isNarrow = isMobile || isTablet;
  const HQ = { name: 'Amsterdam', country: 'Netherlands', lat: 52.37, lon: 4.90 };
  const projects = [
    {
      city: 'Amsterdam', country: 'Netherlands', lat: 52.37, lon: 4.90,
      tag: 'TP Policy Design', industry: 'Payments',
      title: 'Group-wide transfer pricing policy for a global fintech',
      body: 'TP Policy design for a leading payment company — intercompany framework covering core flows, licensing and intra-group services, drafted to hold up under audit across every country of operation.',
    },
    {
      city: 'Tokyo', country: 'Japan', lat: 35.68, lon: 139.69,
      tag: 'Local File', industry: 'Travel',
      title: 'Japan Local File for an international travel group.',
      body: 'Transfer Pricing Local File for the Japan subsidiary of an international travel company — functional analysis, benchmarking and documentation compliant with Japanese NTA requirements.',
    },
    {
      city: 'London', country: 'United Kingdom', lat: 51.51, lon: -0.13,
      tag: 'Audit Defence', industry: 'FMCG',
      title: 'HMRC audit defence for a mid-size FMCG.',
      body: 'Tax audit defence for a mid-size FMCG company — early-stage HMRC engagement, position papers and economic analysis supporting the existing TP set-up through to favourable resolution.',
    },
    {
      city: 'Mexico City', country: 'Mexico', lat: 19.43, lon: -99.13,
      tag: 'Local File', industry: 'Payments',
      title: 'Mexico Local File for a leading payments company.',
      body: 'Transfer Pricing Local File for the Mexican entity of a leading fintech —  documentation prepared to SAT standards, aligned with the group master file and statutory financial statements.',
    },
    {
      city: 'Frankfurt', country: 'Germany', lat: 50.11, lon: 8.68,
      tag: 'Audit Support', industry: 'Industrial',
      title: 'Assistance with a German tax audit.',
      body: 'Hands-on support through a German Betriebsprüfung — responding to information requests, positioning the existing TP framework and preparing economic analysis to defend intra-group pricing.',
    },
    {
      city: 'Stockholm', country: 'Sweden', lat: 59.33, lon: 18.07,
      tag: 'Master File Review', industry: 'Industrial',
      title: 'Master File review for a Sweden-based manufacturer.',
      body: 'Independent review of the group Master File for a Sweden-based manufacturer — gap analysis against BEPS Action 13, practical recommendations and redrafted sections where needed.',
    },
    {
      city: 'Amsterdam', country: 'Netherlands', lat: 52.37, lon: 4.90,
      tag: 'Financial Transactions', industry: 'Holding',
      title: 'Intercompany loan benchmarking study.',
      body: 'Financial transactions benchmarking for an Amsterdam-based holding company — credit rating analysis and arm\'s length interest range supporting an intercompany loan, documented for Dutch tax review.',
    },
    {
      city: 'New York', country: 'United States', lat: 40.71, lon: -74.01,
      tag: 'Benchmarking', industry: 'Travel',
      title: 'Benchmark returns for a US travel subsidiary.',
      body: 'Benchmarking study for the US subsidiary of a multinational travel group — comparable search, functional profile alignment and arm\'s length range supporting the local routine return.',
    },
    {
      city: 'Ho Chi Minh City', country: 'Vietnam', lat: 10.82, lon: 106.63,
      tag: 'Profit Attribution', industry: 'Construction',
      title: 'Profit attribution methodology for a Vietnam branch.',
      body: 'Developed the profit attribution methodology for the Vietnam branch of a Dutch construction company — functional and asset analysis, dealings between head office and branch, and the arm\'s length attribution framework.',
    },
    {
      city: 'Sydney', country: 'Australia', lat: -33.87, lon: 151.21,
      tag: 'Profit Attribution', industry: 'Fintech',
      title: 'Interest income attribution — Australia branch.',
      body: 'Analysis of the treatment of interest income and profit attribution between the Australian branch and the Dutch head office of a fintech — KERT functions, capital attribution and dealings documentation.',
    },
    {
      city: 'Copenhagen', country: 'Denmark', lat: 55.68, lon: 12.57,
      tag: 'Audit Defence', industry: 'Food Delivery',
      title: 'Business restructuring audit defence.',
      body: 'Audit defence of a business restructuring for a leading online food delivery company — economic rationale, exit taxation analysis and positioning of the post-restructuring set-up through Danish tax authority review.',
    },
    {
      city: 'San Jose', country: 'United States', lat: 37.34, lon: -121.89,
      tag: 'APA Support', industry: 'SaaS',
      title: 'Intercompany licence analysis for a Dutch APA.',
      body: 'Economic analysis supporting an intercompany licence between the US parent of a SaaS company and its Dutch subsidiary for Dutch Advance Pricing Agreement purposes.',
    },
    {
      city: 'Amsterdam', country: 'Netherlands', lat: 52.37, lon: 4.90,
      tag: 'TP Diagnostics', industry: 'Climate Tech',
      title: 'Global TP diagnostics for a carbon trading platform.',
      body: 'Diagnostics review of the global transfer pricing set-up for a leading carbon trading platform — mapping intercompany flows, identifying risk pockets and recommending design changes.',
    },
    {
      city: 'Dubai', country: 'United Arab Emirates', lat: 25.20, lon: 55.27,
      tag: 'Valuation', industry: 'Financial',
      title: 'TP valuation of an intercompany financial asset transfer.',
      body: 'Transfer pricing valuation supporting the intercompany transfer of a financial asset from the Netherlands to the UAE — arm\'s length pricing analysis and documentation aligned with both Dutch and UAE requirements.',
    },
    {
      city: 'London', country: 'United Kingdom', lat: 51.51, lon: -0.13,
      tag: 'Master File', industry: 'Travel',
      title: 'Master File for an international travel group.',
      body: 'Preparation of the group Master File for an international travel company — organisational structure, business description, intangibles, intercompany financial activity and financial positions, drafted to meet BEPS Action 13 expectations.',
    },
  ];

  const W = 960, H = 520;
  const hq = project(HQ.lat, HQ.lon, W, H);
  const pts = projects.map(p => ({ ...p, xy: project(p.lat, p.lon, W, H) }));

  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setActive(a => (a + 1) % projects.length);
    }, 4600);
    return () => clearTimeout(timerRef.current);
  }, [active, paused, projects.length]);

  const current = pts[active];
  const arc = arcPath(hq[0], hq[1], current.xy[0], current.xy[1]);

  return (
    <section id="projects" style={{ padding: isMobile ? '64px 20px' : (isTablet ? '88px 32px' : '112px 40px'), background: 'var(--neutral-50)', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '5fr 7fr', gap: isMobile ? 20 : (isTablet ? 48 : 72), alignItems: isNarrow ? 'start' : 'end', marginBottom: isMobile ? 32 : 48 }}>
          <div>
            <Eyebrow>Recent projects</Eyebrow>
            <h2 style={{ margin: '16px 0 0', fontSize: isMobile ? 32 : (isTablet ? 42 : 52), letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Amsterdam-based.<br/>Working internationally.
            </h2>
          </div>
          <p style={{ fontSize: isMobile ? 15.5 : 17, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>
            A rolling view of recent engagements. Every pulse is a project — scoped out of Amsterdam, delivered wherever it's needed.
          </p>
        </div>

        <div style={{
          position: 'relative', background: 'var(--brand-navy-800)', borderRadius: isMobile ? 20 : 24, overflow: 'hidden',
          padding: isMobile ? 16 : 32, display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1.65fr 1fr', gap: isMobile ? 20 : 32, alignItems: 'stretch',
        }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* MAP */}
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: 'block' }}>
              <WorldDots width={W} height={H} />

              {/* project markers — clickable; active one shows inside the label/pulse group below */}
              {pts.map((p, i) => {
                const isActive = i === active;
                return (
                  <g
                    key={`dot-${i}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActive(i)}
                  >
                    {/* invisible hit target */}
                    <circle cx={p.xy[0]} cy={p.xy[1]} r={14} fill="transparent" />
                    {/* visible marker — dimmer when not active */}
                    <circle
                      cx={p.xy[0]}
                      cy={p.xy[1]}
                      r={isActive ? 5 : 4}
                      fill={isActive ? 'var(--brand-green-400)' : 'var(--brand-green-300)'}
                      opacity={isActive ? 1 : 0.55}
                      style={{ transition: 'all 180ms var(--ease-out)' }}
                    />
                    <title>{`${p.city} — ${p.tag}`}</title>
                  </g>
                );
              })}

              {/* HQ marker */}
              <g>
                <circle cx={hq[0]} cy={hq[1]} r={18} fill="var(--brand-green-500)" opacity="0.12" />
                <circle cx={hq[0]} cy={hq[1]} r={10} fill="var(--brand-green-500)" opacity="0.25" />
                <circle cx={hq[0]} cy={hq[1]} r={5} fill="#fff" stroke="var(--brand-green-500)" strokeWidth="2" />
              </g>

              {/* active arc */}
              <path
                key={`arc-${active}`}
                d={arc.d}
                fill="none"
                stroke="var(--brand-green-500)"
                strokeWidth="2"
                strokeDasharray="600"
                strokeDashoffset="600"
                style={{ animation: 'drawArc 1.6s var(--ease-out) forwards' }}
              />

              {/* pulse circles at target */}
              <g key={`pulse-${active}`}>
                <circle cx={current.xy[0]} cy={current.xy[1]} r={8} fill="var(--brand-green-500)" opacity="0" style={{ animation: 'pulseRing 1.6s ease-out 1.2s 2' }} />
                <circle cx={current.xy[0]} cy={current.xy[1]} r={8} fill="var(--brand-green-500)" opacity="0" style={{ animation: 'pulseRing 1.6s ease-out 1.8s 2' }} />
                <circle cx={current.xy[0]} cy={current.xy[1]} r={6} fill="var(--brand-green-400)" opacity="0" style={{ animation: 'dotIn 400ms ease-out 1.3s forwards' }} />
                <circle cx={current.xy[0]} cy={current.xy[1]} r={3} fill="#fff" opacity="0" style={{ animation: 'dotIn 400ms ease-out 1.4s forwards' }} />
              </g>

              {/* moving packet along arc */}
              <circle key={`packet-${active}`} r="4" fill="#fff" opacity="0.9">
                <animateMotion dur="1.4s" repeatCount="1" fill="freeze" path={arc.d} />
              </circle>

              {/* label for target — nudged upward when the target is Amsterdam itself,
                  so it doesn't collide with the fixed HQ pill that sits below the pin. */}
              {(() => {
                const isAms = Math.abs(current.lon - HQ.lon) < 0.5 && Math.abs(current.lat - HQ.lat) < 0.5;
                const lx = current.xy[0] + (isAms ? -10 : 10);
                const ly = current.xy[1] + (isAms ? -12 : 14);
                const anchor = isAms ? 'end' : 'start';
                return (
                  <text
                    key={`label-${active}`}
                    x={lx}
                    y={ly}
                    textAnchor={anchor}
                    fill="#fff" fontSize="12" fontWeight="700"
                    style={{ opacity: 0, animation: 'dotIn 400ms ease-out 1.5s forwards', letterSpacing: '0.04em' }}
                  >
                    {current.city.toUpperCase()}
                  </text>
                );
              })()}
            </svg>

            {/* legend */}
            <div style={{
              position: 'absolute', bottom: 16, left: 16, display: 'flex', gap: 14,
              fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 500, letterSpacing: '0.04em',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: '#fff', border: '2px solid var(--brand-green-500)' }} />HQ
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--brand-green-500)' }} />Engagement
              </span>
            </div>

            {/* pause/play — touch devices can't rely on hover */}
            {isNarrow && (
              <button
                onClick={() => setPaused(p => !p)}
                aria-label={paused ? 'Resume auto-advance' : 'Pause auto-advance'}
                style={{
                  position: 'absolute', bottom: 12, right: 12,
                  width: 34, height: 34, borderRadius: 999,
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Icon name={paused ? 'play' : 'pause'} size={14} />
              </button>
            )}
          </div>

          {/* PROJECT CARD */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 20, color: '#fff', padding: '16px 8px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--brand-green-500)', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brand-green-300)' }}>Project {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            </div>

            <div key={`card-${active}`} style={{ animation: 'slideIn 500ms var(--ease-out) both' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>{current.city}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{current.country}</div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 999, background: 'var(--brand-green-500)', color: '#fff', letterSpacing: '0.04em' }}>{current.tag}</span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.12)' }}>{current.industry}</span>
              </div>
              <h3 style={{ fontSize: 22, margin: '0 0 14px', letterSpacing: '-0.015em', lineHeight: 1.2, color: '#fff' }}>{current.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', margin: 0 }}>{current.body}</p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 6, alignItems: 'center' }}>
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show project ${i + 1}`}
                  style={{
                    flex: 1, height: 3, borderRadius: 2, border: 'none', padding: 0, cursor: 'pointer',
                    background: i === active ? 'var(--brand-green-500)' : 'rgba(255,255,255,0.15)',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {i === active && !paused && (
                    <span style={{
                      position: 'absolute', inset: 0, background: 'var(--brand-green-300)',
                      transformOrigin: 'left', animation: 'progressBar 4.6s linear',
                    }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes drawArc { to { stroke-dashoffset: 0; } }
            @keyframes pulseRing {
              0% { opacity: 0.7; r: 6; }
              100% { opacity: 0; r: 36; }
            }
            @keyframes dotIn {
              0% { opacity: 0; transform: scale(0.2); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes slideIn {
              0% { opacity: 0; transform: translateY(12px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes progressBar {
              0% { transform: scaleX(0); }
              100% { transform: scaleX(1); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

window.SignalMapSection = SignalMapSection;
