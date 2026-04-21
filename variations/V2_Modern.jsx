// V2 — Modern & Clean. Copy aligned verbatim with inrange.nl where possible.

function V2_Modern() {
  const SignalMapSection = window.SignalMapSection;
  const [activeService, setActiveService] = React.useState(-1);
  const isMobile = window.useMediaQuery('(max-width: 767px)');
  const isTablet = window.useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isNarrow = isMobile || isTablet;
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  React.useEffect(() => {
    if (!isNarrow && activeService === -1) setActiveService(0);
  }, [isNarrow, activeService]);

  const scrollTo = (id) => (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  const [toast, setToast] = React.useState(null);
  const downloadDeck = (e) => {
    if (e) e.preventDefault();
    setToast('Capability deck — PDF coming soon. Email info@inrange.nl to request it.');
    setTimeout(() => setToast(null), 4000);
  };
  const navLinks = [
    ['About us', 'about'],
    ['Services', 'services'],
    ['Why inRange', 'why'],
    ['Contact', 'contact'],
  ];

  // Service copy lifted directly from inrange.nl
  const services = [
    {
      icon: 'compass',
      title: 'Transfer Pricing Advice',
      sub: 'Planning → implementation',
      body: "Get expert guidance on all aspects of Transfer Pricing, from planning to implementation, ensuring your intercompany set-up is at arm's length.",
    },
    {
      icon: 'file-stack',
      title: 'Transfer Pricing Documentation',
      sub: 'Master file · Local files · CbCR',
      body: 'Stay compliant with Transfer Pricing requirements across the world by letting us prepare, update, or review your TP Master file, Local files, and Country-by-Country Reporting.',
    },
    {
      icon: 'shield-check',
      title: 'Audit Support',
      sub: 'Tax audits & controversy',
      body: 'Safeguard your business interests during Transfer Pricing examinations by involving our experts at an early stage of the tax audit. Our team provides strategic support to resolve controversies efficiently and favourably.',
    },
    {
      icon: 'user-plus',
      title: 'Interim Placement Solutions',
      sub: 'Peak-workload support',
      body: 'Leverage our network of experienced Transfer Pricing experts to act as an interim TP specialist within your organisation during peak workload periods.',
    },
    {
      icon: 'line-chart',
      title: 'Economic Analyses',
      sub: 'Financial & non-financial data',
      body: 'Get expert support in analysing financial and non-financial data for Transfer Pricing purposes.',
    },
    {
      icon: 'file-signature',
      title: 'Legal Agreements',
      sub: 'Intercompany contracts',
      body: 'Prepare or refresh the legal agreements supporting your intercompany transactions.',
    },
  ];

  return (
    <div style={{ background: '#fff', fontFamily: 'var(--font-sans)', color: 'var(--fg-1)' }}>
      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: isMobile ? '12px 20px' : '14px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <Logo height={isMobile ? 32 : 40} />
          {!isMobile && (
            <div style={{ display: 'flex', gap: 2, background: 'var(--neutral-50)', padding: 4, borderRadius: 999 }}>
              {navLinks.map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={scrollTo(id)} style={{ padding: isTablet ? '6px 12px' : '8px 16px', fontSize: isTablet ? 12.5 : 13, fontWeight: 600, color: 'var(--fg-1)', borderRadius: 999, textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>{label}</a>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {!isMobile && <Button variant="ghost" size="sm" onClick={scrollTo('contact')}>Let's connect</Button>}
            {!isMobile && <Button variant="primary" size="sm" iconRight="download" onClick={downloadDeck}>Capability deck</Button>}
            {isMobile && (
              <button
                aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileNavOpen(o => !o)}
                style={{ background: 'var(--neutral-50)', border: '1px solid var(--border-subtle)', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
              >
                <Icon name={mobileNavOpen ? 'x' : 'menu'} size={20} />
              </button>
            )}
          </div>
        </div>
        {isMobile && mobileNavOpen && (
          <div style={{ borderTop: '1px solid var(--border-subtle)', background: '#fff', padding: '12px 20px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 16 }}>
              {navLinks.map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={(e) => { scrollTo(id)(e); setMobileNavOpen(false); }} style={{ padding: '12px 14px', fontSize: 15, fontWeight: 600, color: 'var(--fg-1)', borderRadius: 10, textDecoration: 'none', cursor: 'pointer' }}>{label}</a>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="primary" size="md" iconRight="download" onClick={(e) => { downloadDeck(e); setMobileNavOpen(false); }} style={{ width: '100%', justifyContent: 'center' }}>Capability deck</Button>
              <Button variant="secondary" size="md" onClick={(e) => { scrollTo('contact')(e); setMobileNavOpen(false); }} style={{ width: '100%', justifyContent: 'center' }}>Let's connect</Button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="top" style={{ padding: isMobile ? '40px 20px 16px' : (isTablet ? '56px 32px 24px' : '72px 40px 24px'), maxWidth: 1320, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1.35fr 1fr', gap: isMobile ? 32 : (isTablet ? 40 : 64), alignItems: 'start' }}>
          {/* LEFT: headline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: isMobile ? 16 : 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--brand-green-500)', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-brand)' }}>Transfer pricing · Amsterdam</span>
            </div>
            <h1 style={{
              margin: 0, fontSize: isMobile ? 42 : (isTablet ? 58 : 76), lineHeight: 0.95, letterSpacing: '-0.035em', fontWeight: 700,
            }}>
              Your trusted<br/>transfer pricing <span style={{
                background: 'linear-gradient(105deg, var(--brand-green-500), var(--brand-green-700))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>partner.</span>
            </h1>
            <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.5, color: 'var(--fg-2)', margin: isMobile ? '20px 0 28px' : '28px 0 36px', maxWidth: 560 }}>
              High-quality Transfer Pricing services for multinational companies.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button variant="primary" size={isMobile ? 'md' : 'lg'} iconRight="download" onClick={downloadDeck}>Download capability deck</Button>
              <Button variant="secondary" size={isMobile ? 'md' : 'lg'} iconRight="arrow-right" onClick={scrollTo('services')}>Our services</Button>
            </div>
          </div>

          {/* RIGHT: at-a-glance card */}
          <div style={{
            background: 'var(--brand-navy-800)', color: '#fff', borderRadius: 20, padding: isMobile ? 24 : 32,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 220, height: 220, borderRadius: 999, background: 'var(--brand-green-500)', opacity: 0.1 }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brand-green-300)' }}>At a glance</div>
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { big: '15+', unit: 'yrs', label: 'Average experience per specialist' },
                  { big: '60%', unit: 'faster', label: 'Turnaround, AI-enabled' },
                  { big: '40%', unit: 'more', label: 'Value for money vs. Big Four engagements' },
                ].map((s, i) => (
                  <div key={s.big} style={{
                    display: 'flex', alignItems: 'baseline', gap: 12, padding: '18px 0',
                    borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 38 : 48, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 0.9, color: '#fff', minWidth: isMobile ? 82 : 100 }}>{s.big}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-green-300)', letterSpacing: '0.02em' }}>{s.unit}</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2, lineHeight: 1.4 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>Industries we serve</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['Construction', 'Consumer & Retail', 'FMCG', 'Food Delivery', 'Industrial', 'Payments', 'SaaS & Technology', 'Travel'].map(t => (
                    <span key={t} style={{ fontSize: 11.5, fontWeight: 600, padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: isMobile ? '64px 20px' : (isTablet ? '88px 32px' : '112px 40px'), scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '5fr 7fr', gap: isMobile ? 28 : (isTablet ? 48 : 72) }}>
          <div>
            <Eyebrow>About our company</Eyebrow>
            <h2 style={{ margin: '16px 0 0', fontSize: isMobile ? 32 : (isTablet ? 42 : 52), letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Transfer pricing expertise, combined with market-leading technology.
            </h2>
          </div>
          <div style={{ paddingTop: 8 }}>
            <p style={{ fontSize: isMobile ? 17 : 20, lineHeight: 1.55, color: 'var(--fg-1)', fontWeight: 500, margin: '0 0 24px' }}>
              At inRange, we combine Transfer Pricing expertise with market leading technology and passion for serving clients.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: '0 0 20px' }}>
              Our experts have decades of professional Transfer Pricing experience gained at leading global consulting firms and having worked for some of the world's largest multinational companies. Through this experience, we develop practical and sustainable solutions for your transfer pricing needs.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0 }}>
              Utilising our dedicated (AI-enabled) documentation and research software, we streamline economic analyses and TP documentation work and ensure adherence to the local country regulatory requirements in all countries where you operate. With technology at our core, we deliver innovative, reliable, and compliant solutions faster and at a lower cost.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES — interactive split panel */}
      <section id="services" style={{ padding: isMobile ? '64px 20px' : (isTablet ? '88px 32px' : '112px 40px'), background: 'var(--neutral-50)', scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 32, justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'end', marginBottom: isMobile ? 32 : 56 }}>
            <div>
              <Eyebrow>Our services</Eyebrow>
              <h2 style={{ margin: '16px 0 0', fontSize: isMobile ? 34 : (isTablet ? 44 : 56), letterSpacing: '-0.03em', lineHeight: 1 }}>Six ways we help.</h2>
            </div>
            <p style={{ maxWidth: 420, fontSize: 16, color: 'var(--fg-2)', margin: 0, lineHeight: 1.55 }}>
              A focused Transfer Pricing practice. Every engagement led by a senior specialist; every deliverable reviewed at partner level.
            </p>
          </div>

          {isNarrow ? (
            <div style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', padding: 8 }}>
              {services.map((s, i) => {
                const active = activeService === i;
                return (
                  <React.Fragment key={s.title}>
                    <div
                      onClick={() => setActiveService(active ? -1 : i)}
                      style={{
                        padding: '18px 20px', borderRadius: active ? '14px 14px 0 0' : 14, cursor: 'pointer',
                        background: active ? 'var(--brand-navy-800)' : 'transparent',
                        color: active ? '#fff' : 'var(--fg-1)',
                        transition: 'all 180ms var(--ease-standard)',
                        display: 'flex', alignItems: 'center', gap: 14,
                      }}
                    >
                      <div style={{
                        width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: active ? 'var(--brand-green-500)' : 'var(--brand-green-50)',
                        color: active ? '#fff' : 'var(--brand-green-700)',
                        flexShrink: 0,
                      }}>
                        <Icon name={s.icon} size={19} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.01em' }}>{s.title}</div>
                        <div style={{ fontSize: 12, color: active ? 'var(--brand-green-300)' : 'var(--fg-3)', fontWeight: 500, marginTop: 2 }}>{s.sub}</div>
                      </div>
                      <Icon name={active ? 'chevron-up' : 'chevron-down'} size={18} style={{ opacity: active ? 1 : 0.5, flexShrink: 0 }} />
                    </div>
                    {active && (
                      <div style={{ background: 'var(--brand-navy-800)', color: '#fff', padding: '4px 24px 28px', margin: '0 0 8px', borderRadius: '0 0 14px 14px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: -60, right: -60, width: 180, height: 180, borderRadius: 999, background: 'var(--brand-green-500)', opacity: 0.08 }} />
                        <div style={{ position: 'relative' }}>
                          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 15, lineHeight: 1.6, margin: '0 0 20px' }}>{s.body}</p>
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <Button variant="primary" iconRight="arrow-right" onClick={scrollTo('contact')}>Let's connect</Button>
                            <Button variant="outlineInverted" onClick={scrollTo('why')}>All services</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 40, background: '#fff', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ padding: 16 }}>
                {services.map((s, i) => (
                  <div key={s.title}
                    onMouseEnter={() => setActiveService(i)}
                    style={{
                      padding: '20px 24px', borderRadius: 14, cursor: 'pointer',
                      background: activeService === i ? 'var(--brand-navy-800)' : 'transparent',
                      color: activeService === i ? '#fff' : 'var(--fg-1)',
                      transition: 'all 220ms var(--ease-standard)',
                      display: 'flex', alignItems: 'center', gap: 18,
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: activeService === i ? 'var(--brand-green-500)' : 'var(--brand-green-50)',
                      color: activeService === i ? '#fff' : 'var(--brand-green-700)',
                      flexShrink: 0,
                    }}>
                      <Icon name={s.icon} size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: activeService === i ? 'var(--brand-green-300)' : 'var(--fg-3)', fontWeight: 500, marginTop: 2 }}>{s.sub}</div>
                    </div>
                    <Icon name="arrow-right" size={18} style={{ opacity: activeService === i ? 1 : 0.3 }} />
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--brand-navy-800)', padding: 48, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: 999, background: 'var(--brand-green-500)', opacity: 0.08 }} />
                {(() => { const svc = services[activeService < 0 ? 0 : activeService]; return (
                <div style={{ position: 'relative' }}>
                  <Eyebrow color="var(--brand-green-300)">{svc.sub}</Eyebrow>
                  <h3 style={{ color: '#fff', fontSize: 40, margin: '16px 0 20px', letterSpacing: '-0.025em', lineHeight: 1.05 }}>{svc.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 17, lineHeight: 1.6, margin: 0 }}>{svc.body}</p>
                </div>
                ); })()}
                <div style={{ marginTop: 40, display: 'flex', gap: 12, position: 'relative', flexWrap: 'wrap' }}>
                  <Button variant="primary" iconRight="arrow-right" onClick={scrollTo('contact')}>Let's connect</Button>
                  <Button variant="outlineInverted" onClick={scrollTo('why')}>All services</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* GET YOUR TP DONE — global coverage */}
      <section id="coverage" style={{ padding: isMobile ? '64px 20px' : (isTablet ? '88px 32px' : '112px 40px'), scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '5fr 7fr', gap: isMobile ? 20 : (isTablet ? 48 : 72), alignItems: isNarrow ? 'start' : 'end', marginBottom: isMobile ? 40 : 64 }}>
            <div>
              <Eyebrow>How we work</Eyebrow>
              <h2 style={{ margin: '16px 0 0', fontSize: isMobile ? 32 : (isTablet ? 42 : 52), letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                A predictable path from scope to sign-off.
              </h2>
            </div>
            <p style={{ fontSize: isMobile ? 15.5 : 17, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>
              Every engagement runs on the same four-stage cadence — led end-to-end by a senior specialist, with AI-enabled tooling handling the mechanical work so yours gets the considered thought.
            </p>
          </div>

          {/* PROCESS TIMELINE */}
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'), gap: isMobile ? 28 : 20 }}>
            {!isNarrow && <div style={{ position: 'absolute', top: 36, left: '6%', right: '6%', height: 2, background: 'var(--border-subtle)', zIndex: 0 }} />}
            {[
              {
                step: '01', title: 'Scope', timing: 'Week 1',
                body: 'Discovery call, review of your group structure and intercompany flows, agreement on deliverables and fee.',
                tags: ['Fixed fee', 'Senior-led'],
              },
              {
                step: '02', title: 'Analyse', timing: 'Weeks 2–4',
                body: 'Functional analysis, economic analyses and benchmarking — AI-accelerated research, human judgement on method and comparables.',
                tags: ['OECD-aligned', 'AI-enabled'],
              },
              {
                step: '03', title: 'Document', timing: 'Weeks 4–8',
                body: 'Master file, Local files and Country-by-Country Reporting, drafted to local-country regulatory requirements in every jurisdiction you operate.',
                tags: ['Locally compliant', 'Partner-reviewed'],
              },
              {
                step: '04', title: 'Support', timing: 'Ongoing',
                body: 'Tax-audit defence, controversy support, refreshes on change — and interim placement when your own team needs an extra set of hands.',
                tags: ['Audit defence', 'Interim specialists'],
              },
            ].map((p) => (
              <div
                key={p.step}
                className="process-step"
                style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 14, transition: 'transform 220ms var(--ease-out)' }}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: 999, background: 'var(--brand-navy-800)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em',
                  border: '4px solid #fff',
                }}>{p.step}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-brand)' }}>{p.timing}</div>
                <h3 style={{ fontSize: 26, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{p.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>{p.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                  {p.tags.map(t => (
                    <span key={t} className="process-tag" style={{
                      fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 999,
                      background: 'var(--brand-green-50)', color: 'var(--brand-green-700)',
                      border: '1px solid rgba(0,0,0,0.04)',
                      transition: 'background 180ms var(--ease-out), color 180ms var(--ease-out), transform 180ms var(--ease-out)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <style>{`
            .process-tag:hover {
              background: var(--brand-green-500) !important;
              color: #fff !important;
              border-color: var(--brand-green-500) !important;
              cursor: default;
            }
          `}</style>
        </div>
      </section>

      {/* SIGNAL MAP — recent work */}
      <SignalMapSection />

      {/* ADVANTAGES — verbatim from site */}
      <section id="why" style={{ padding: isMobile ? '64px 20px' : (isTablet ? '88px 32px' : '112px 40px'), background: '#fff', scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64, maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
            <Eyebrow>Advantages of working with us</Eyebrow>
            <h2 style={{ margin: '16px 0 20px', fontSize: isMobile ? 32 : (isTablet ? 42 : 52), letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Expertise, technology, and a passion for serving clients.
            </h2>
            <p style={{ fontSize: isMobile ? 15.5 : 17, lineHeight: 1.55, color: 'var(--fg-2)', margin: 0 }}>
              At inRange, we combine Transfer Pricing expertise with market-leading technology and passion for serving clients.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), gap: isMobile ? 16 : 24 }}>
            {[
              {
                tag: 'High Quality',
                big: '15+', unit: 'yrs',
                title: 'Senior specialists on every engagement.',
                body: "Our experts have on average over 15 years of Transfer Pricing experience gained at leading global consulting firms and some of the world's largest multinationals — and they stay on your file from scoping to sign-off.",
              },
              {
                tag: 'Efficient Delivery',
                big: '60%', unit: 'faster',
                title: 'AI-enabled documentation and research.',
                body: 'Our dedicated, AI-enabled compliance and research software streamlines economic analyses and TP documentation — cutting turnaround time on Master file, Local files and benchmarks without compromising local-country compliance.',
              },
              {
                tag: 'Competitive Pricing',
                big: '40%', unit: 'less',
                title: 'Senior work at sustainable rates.',
                body: 'A lean delivery model pairs highly experienced, hands-on TP specialists with the power of AI — so you get the calibre of advice you’d expect from the Big Four at materially lower cost.',
              },
            ].map((x, i) => (
              <div key={x.tag} style={{
                background: '#fff', borderRadius: 20, padding: isMobile ? 24 : 36, border: '1px solid var(--border-subtle)',
                transition: 'all 220ms var(--ease-standard)', display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--brand-green-600)' }}>0{i+1}</div>
                  <Badge tone="success" dot={false}>{x.tag}</Badge>
                </div>
                <h3 style={{ fontSize: 24, margin: '0 0 16px', letterSpacing: '-0.018em', lineHeight: 1.2 }}>{x.title}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--fg-2)', lineHeight: 1.65, margin: 0 }}>{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" style={{ padding: isMobile ? '48px 16px' : (isTablet ? '88px 32px' : '112px 40px'), background: 'var(--neutral-50)', scrollMarginTop: 80 }}>
        <div style={{
          maxWidth: 1320, margin: '0 auto', background: 'var(--brand-navy-800)',
          borderRadius: isMobile ? 20 : 28, padding: isMobile ? '48px 24px' : (isTablet ? '64px 40px' : '96px 80px'), color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: 999, background: 'var(--brand-green-500)', opacity: 0.14 }} />
          {!isNarrow && <div style={{ position: 'absolute', top: 80, right: 160, width: 180, height: 180, borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)' }} />}
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1.2fr 1fr', gap: isMobile ? 32 : (isTablet ? 40 : 64), alignItems: isNarrow ? 'start' : 'end' }}>
            <div>
              <Eyebrow color="var(--brand-green-300)">We'd love to hear from you</Eyebrow>
              <h2 style={{ color: '#fff', fontSize: isMobile ? 36 : (isTablet ? 48 : 64), margin: '20px 0 24px', letterSpacing: '-0.035em', lineHeight: 1.02 }}>
                Get your Transfer Pricing done.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: isMobile ? 15.5 : 18, lineHeight: 1.55, margin: '0 0 36px', maxWidth: 560 }}>
                A short note is usually enough to start. Tell us what you're working on: a new structure, a documentation cycle, a question from a tax authority,  and we'll come back with a clear next step, typically within a working day.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button variant="primary" size={isMobile ? 'md' : 'lg'} iconRight="download" onClick={downloadDeck}>Download capability deck</Button>
                <Button variant="outlineInverted" size={isMobile ? 'md' : 'lg'} onClick={() => window.location.href = 'mailto:info@inrange.nl'}>Let's connect</Button>
              </div>
            </div>
            <div style={{ borderLeft: isNarrow ? 'none' : '1px solid rgba(255,255,255,0.18)', borderTop: isNarrow ? '1px solid rgba(255,255,255,0.18)' : 'none', paddingLeft: isNarrow ? 0 : 40, paddingTop: isNarrow ? 24 : 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--brand-green-300)', textTransform: 'uppercase', marginBottom: 18 }}>inRange Solutions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.55 }}>
                <div>Saskia van Uijlenburgkade 104<br/>Amsterdam, Netherlands</div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.12)' }} />
                <div>+31 648 44 6063</div>
                <a href="mailto:info@inrange.nl" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.3)', alignSelf: 'flex-start' }}>info@inrange.nl</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#fff', borderTop: '1px solid var(--border-subtle)', padding: isMobile ? '48px 20px 32px' : (isTablet ? '56px 32px 36px' : '64px 40px 40px') }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : '2fr 1fr 1fr 1fr'), gap: isMobile ? 32 : 48 }}>
          <div>
            <Logo height={34} />
            <p style={{ marginTop: 16, fontSize: 14, maxWidth: 320, lineHeight: 1.65, color: 'var(--fg-3)' }}>
              inRange Solutions — independent transfer pricing specialists. Amsterdam-based, working internationally.
            </p>
          </div>
          {[
            ['Services', [['Transfer Pricing Advice', 'services'], ['Transfer Pricing Documentation', 'services'], ['Audit Support', 'services'], ['Interim Placement Solutions', 'services'], ['Economic Analyses', 'services'], ['Legal Agreements', 'services']]],
            ['Company', [['About us', 'about'], ['How we work', 'coverage'], ['Recent projects', 'projects'], ['Advantages', 'why'], ['Contact', 'contact']]],
            ['Contact', [['Saskia van Uijlenburgkade 104', null], ['Amsterdam, Netherlands', null], ['info@inrange.nl', 'mailto:info@inrange.nl'], ['+31 648 44 6063', 'tel:+31648446063']]],
          ].map(([h, items]) => (
            <div key={h}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: 'var(--fg-1)' }}>{h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--fg-3)' }}>
                {items.map(([label, target]) => {
                  if (!target) return <li key={label}>{label}</li>;
                  if (target.startsWith('mailto:') || target.startsWith('tel:'))
                    return <li key={label}><a href={target} style={{ color: 'inherit', textDecoration: 'none' }}>{label}</a></li>;
                  return <li key={label}><a href={`#${target}`} onClick={scrollTo(target)} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>{label}</a></li>;
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1320, margin: isMobile ? '36px auto 0' : '56px auto 0', paddingTop: 24, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0, justifyContent: 'space-between', fontSize: 12, color: 'var(--fg-3)' }}>
          <div>© 2026 inRange Solutions B.V.</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <a href="#top" onClick={scrollTo('top')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Back to top</a>
            <a href="mailto:info@inrange.nl" style={{ color: 'inherit', textDecoration: 'none' }}>Email us</a>
            <a href="tel:+31648446063" style={{ color: 'inherit', textDecoration: 'none' }}>Call us</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--brand-navy-800)', color: '#fff', padding: '16px 24px',
          borderRadius: 14, fontSize: 14, fontWeight: 500, zIndex: 100,
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: 14,
          animation: 'toastIn 240ms var(--ease-standard)', maxWidth: 520,
        }}>
          <Icon name="download" size={18} style={{ color: 'var(--brand-green-300)' }} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

window.V2_Modern = V2_Modern;
