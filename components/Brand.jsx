// Shared brand components for inRange UI kits
const { useState } = React;

// Icon — Lucide via data URIs; we use the CDN-loaded window.lucide if present
function Icon({ name, size = 20, className = '', style = {} }) {
  // Lucide is loaded globally as `lucide`; render an <i data-lucide> and let
  // lucide.createIcons() swap it on mount. Parent calls lucide.createIcons().
  return <i data-lucide={name} className={className} style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', ...style }} />;
}

function Logo({ variant = 'color', height = 32 }) {
  const src = (window.INRANGE_LOGO_SRC || 'assets/logo-inrange-transparent.png');
  const filter = variant === 'inverted' ? 'brightness(0) invert(1)' : 'none';
  return <img src={src} alt="inRange" style={{ height, width: 'auto', filter }} />;
}

function Button({ children, variant = 'primary', size = 'md', icon, iconRight, onClick, style = {} }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    border: '1px solid transparent',
    borderRadius: size === 'lg' ? 12 : 10,
    cursor: 'pointer',
    transition: 'all 220ms cubic-bezier(0.2, 0.8, 0.2, 1)',
    padding: size === 'sm' ? '6px 12px' : size === 'lg' ? '14px 24px' : '10px 18px',
    fontSize: size === 'sm' ? 13 : size === 'lg' ? 16 : 14,
    whiteSpace: 'nowrap',
  };
  const variants = {
    primary: { background: 'var(--brand-green-500)', color: '#fff' },
    secondary: { background: '#fff', color: 'var(--fg-1)', borderColor: 'var(--border-default)' },
    dark: { background: 'var(--brand-navy-700)', color: '#fff' },
    ghost: { background: 'transparent', color: 'var(--fg-1)' },
    outlineInverted: { background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' },
  };
  const [hov, setHov] = useState(false);
  const hovStyles = {
    primary: { background: 'var(--brand-green-600)' },
    secondary: { background: 'var(--neutral-50)', borderColor: 'var(--border-strong)' },
    dark: { background: 'var(--brand-navy-800)' },
    ghost: { background: 'var(--neutral-100)' },
    outlineInverted: { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.7)' },
  };
  return (
    <button
      style={{ ...base, ...variants[variant], ...(hov ? hovStyles[variant] : {}), ...style }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} />}
    </button>
  );
}

function Eyebrow({ children, color = 'var(--fg-brand)' }) {
  return <span style={{
    fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase', color,
  }}>{children}</span>;
}

function Badge({ children, tone = 'neutral', dot = true }) {
  const tones = {
    success: { bg: 'var(--success-bg)', color: 'var(--brand-green-700)', dot: 'var(--brand-green-500)' },
    warning: { bg: 'var(--warning-bg)', color: '#7A5A10', dot: 'var(--warning)' },
    danger: { bg: 'var(--danger-bg)', color: '#7C2617', dot: 'var(--danger)' },
    info: { bg: 'var(--info-bg)', color: '#1B4F83', dot: 'var(--info)' },
    neutral: { bg: 'var(--neutral-100)', color: 'var(--fg-1)', dot: 'var(--fg-3)' },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', fontSize: 12, fontWeight: 600,
      borderRadius: 999, background: t.bg, color: t.color,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: t.dot }} />}
      {children}
    </span>
  );
}

// Lucide ships no linkedin icon — inline the wordmark glyph so it matches the brand's iconography.
function LinkedInIcon({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState(get);
  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

Object.assign(window, { Icon, Logo, Button, Eyebrow, Badge, useMediaQuery, LinkedInIcon });
