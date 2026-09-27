import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid } from '@mui/material';
import {
  ArrowRight,
  BarChart3,
  Bus,
  Check,
  CheckCircle2,
  Cpu,
  Handshake,
  HeartHandshake,
  Leaf,
  LifeBuoy,
  Lock,
  MousePointerClick,
  Plus,
  QrCode,
  ScanLine,
  Ticket,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import './HomeSections.css';

import whoweare from '../../assets/who we are re.jpg';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useCycle = (count, ms) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => clearInterval(id);
  }, [count, ms]);
  return [index, setIndex];
};

const onSpotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export const Head = ({ eyebrow, title, accent, sub }) => (
  <div className="sx-head" data-aos="fade-up">
    <span className="sx-eyebrow">{eyebrow}</span>
    <h2 className="sx-title">
      {title} <span>{accent}</span>
    </h2>
    {sub && <p className="sx-sub">{sub}</p>}
  </div>
);

/* ================================================================== */
/* Services                                                            */
/* ================================================================== */

const TicketStack = () => (
  <div className="sv-stack">
    {['Hubli → Dharwad', 'Dharwad → Hubli', 'Hubli → Navanagar'].map((route, i) => (
      <div key={route} className="sv-ticket" style={{ '--d': `${-i * 2}s` }}>
        <div>
          <small>e-Ticket</small>
          <strong>{route}</strong>
        </div>
        <span className="sv-ticket__qr"><QrCode size={24} /></span>
      </div>
    ))}
  </div>
);

const TRIPS = [
  { route: 'Hubli → Dharwad', when: 'Today, 8:40 AM' },
  { route: 'Dharwad → Hubli', when: 'Yesterday, 6:15 PM' },
  { route: 'Hubli → Navanagar', when: 'Mon, 9:05 AM' },
];

const TripHistory = () => (
  <div className="sv-trips">
    <div className="sv-wallet">
      <Wallet size={14} />
      <span>Wallet</span>
      <em className="sv-wallet__bar"><i /></em>
      <b>Topped up</b>
    </div>
    {TRIPS.map((t, i) => (
      <div key={t.route} className="sv-trip" style={{ '--d': `${i * 0.35}s` }}>
        <span className="sv-trip__icon"><Bus size={13} /></span>
        <div>
          <strong>{t.route}</strong>
          <small>{t.when}</small>
        </div>
        <span className="sv-trip__ok"><Check size={12} /></span>
      </div>
    ))}
  </div>
);

const ScanPass = () => (
  <div className="sv-scan">
    <span className="sv-corner sv-corner--tl" />
    <span className="sv-corner sv-corner--tr" />
    <span className="sv-corner sv-corner--bl" />
    <span className="sv-corner sv-corner--br" />
    <QrCode size={72} strokeWidth={1.6} />
    <span className="sv-scan__beam" />
    <span className="sv-scan__ok"><Check size={14} /> Boarded</span>
  </div>
);

const HOURS = [
  { t: '6', v: 30 }, { t: '7', v: 55 }, { t: '8', v: 92, peak: true }, { t: '9', v: 100, peak: true },
  { t: '10', v: 70 }, { t: '11', v: 45 }, { t: '12', v: 50 }, { t: '1', v: 42 }, { t: '2', v: 38 },
  { t: '3', v: 48 }, { t: '4', v: 64 }, { t: '5', v: 88, peak: true }, { t: '6', v: 80 }, { t: '7', v: 52 },
];

const Dashboard = () => (
  <div className="sv-dash">
    <div className="sv-dash__top">
      <span><BarChart3 size={14} /> Passengers by hour</span>
      <em className="sv-live"><i /> Live</em>
    </div>
    <div className="sv-bars">
      {HOURS.map((h, i) => (
        <div key={i} className={`sv-bar${h.peak ? ' is-peak' : ''}`}>
          <span style={{ '--h': `${h.v}%`, '--d': `${-i * 0.35}s` }} />
          <small>{h.t}</small>
        </div>
      ))}
    </div>
    <div className="sv-dash__chips">
      <span className="sv-chip sv-chip--amber"><TrendingUp size={12} /> Peak hours detected</span>
      <span className="sv-chip sv-chip--blue"><Bus size={12} /> Suggest: add buses at peak</span>
    </div>
  </div>
);

const ServiceTile = ({ tag, icon: Icon, title, desc, children, delay }) => (
  <div data-aos="fade-up" data-aos-delay={delay} style={{ height: '100%' }}>
    <div className="bb-tile" onMouseMove={onSpotlight}>
      <div className="bb-visual">{children}</div>
      <div className="bb-copy">
        <span className="bb-tag"><Icon size={14} />{tag}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  </div>
);

export const Services = () => (
  <section className="sx sx--night">
    <Container maxWidth="lg">
      <Head
        eyebrow="Behind every scan"
        title="One platform for"
        accent="riders and operators"
        sub="Everything a passenger needs to travel smart — and the data operators need to run a better service."
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ServiceTile
            tag="For riders"
            icon={Ticket}
            title="Smart Bus Ticketing"
            desc="QR code-based digital tickets — no more paper. Just scan, board, and go."
          >
            <TicketStack />
          </ServiceTile>
        </Grid>
        <Grid item xs={12} md={4}>
          <ServiceTile
            tag="For riders"
            icon={Wallet}
            title="Manage Your Travel"
            desc="Track your travel history, monitor expenses, and recharge your wallet anytime."
            delay={100}
          >
            <TripHistory />
          </ServiceTile>
        </Grid>
        <Grid item xs={12} md={4}>
          <ServiceTile
            tag="At the gate"
            icon={ScanLine}
            title="Quick Scan Boarding"
            desc="Passengers show their QR ticket at the gate for quick, seamless boarding."
            delay={200}
          >
            <ScanPass />
          </ServiceTile>
        </Grid>
        <Grid item xs={12}>
          <div data-aos="fade-up">
            <div className="bb-tile sv-wide" onMouseMove={onSpotlight}>
              <div className="bb-visual sv-wide__visual">
                <Dashboard />
              </div>
              <div className="bb-copy sv-wide__copy">
                <span className="bb-tag"><BarChart3 size={14} />For operators</span>
                <h3>Optimize Bus Services</h3>
                <p>Transport operators use real-time passenger data to optimize bus deployment during peak hours.</p>
                <ul className="sv-list">
                  {['See demand hour by hour', 'Spot peak hours early', 'Deploy buses where they’re needed'].map((l) => (
                    <li key={l}><CheckCircle2 size={16} /> {l}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  </section>
);

/* ================================================================== */
/* Why SmartBus — everything connects to one app                       */
/* ================================================================== */

const WHY_MS = 2800;

const WHY = [
  { icon: HeartHandshake, title: 'User-Centric Development', desc: 'Built with commuters, conductors, and operators so every feature solves a real problem.' },
  { icon: Handshake, title: 'Team Collaboration', desc: 'Developers, designers, and transport experts shipping meaningful improvements together.' },
  { icon: MousePointerClick, title: 'User-Friendly Experience', desc: 'Simple and accessible — whether you’re scanning a ticket or managing a fleet.' },
  { icon: Cpu, title: 'Innovative Technology', desc: 'QR validation, IoT-enabled hardware, and cloud infrastructure that scales securely.' },
  { icon: TrendingUp, title: 'Continuous Improvement', desc: 'Performance and feedback monitored so the platform keeps getting better.' },
  { icon: LifeBuoy, title: 'Exceptional Support', desc: 'Timely, personalized support from setup to daily use.' },
];

const WhyItem = ({ item, index, side, active, onEnter, delay }) => {
  const Icon = item.icon;
  return (
    <div
      className={`why-item why-item--${side}${active ? ' is-active' : ''}`}
      onMouseEnter={onEnter}
      onMouseMove={onSpotlight}
      data-aos={side === 'l' ? 'fade-right' : 'fade-left'}
      data-aos-delay={delay}
    >
      <span className="why-item__icon"><Icon size={22} /></span>
      <div className="why-item__body">
        <h4>{item.title}</h4>
        <p>{item.desc}</p>
      </div>
      <span className="why-item__num">{String(index + 1).padStart(2, '0')}</span>
      {active && <span className="why-item__timer" style={{ '--ms': `${WHY_MS}ms` }} />}
      <span className="why-link" aria-hidden="true"><i /></span>
    </div>
  );
};

// The phone is the hub: every feature card lives inside it, and the one the
// section is talking about lights up on screen.
const WhyPhone = ({ active }) => {
  const ActiveIcon = WHY[active].icon;
  return (
    <div className="why-device" aria-hidden="true">
      <div className="why-device__screen">
        <div className="why-device__bar">
          <span><Bus size={12} /> SmartBus</span>
          <em><i /> Online</em>
        </div>
        <div className="why-device__hero" key={active}>
          <span className="why-device__badge"><ActiveIcon size={22} /></span>
          <strong>{WHY[active].title}</strong>
        </div>
        <div className="why-device__grid">
          {WHY.map(({ icon: Icon, title }, i) => (
            <span key={title} className={`why-device__tile${i === active ? ' is-on' : ''}`}>
              <Icon size={16} />
            </span>
          ))}
        </div>
        <div className="why-device__dots">
          {WHY.map((w, i) => <i key={w.title} className={i === active ? 'is-on' : ''} />)}
        </div>
      </div>
    </div>
  );
};

export const WhySmartBus = () => {
  const [active, setActive] = useCycle(WHY.length, WHY_MS);
  return (
    <section className="sx sx--muted why-sx">
      <Container maxWidth="lg">
        <Head
          eyebrow="Why SmartBus"
          title="Everything connects to"
          accent="one app"
          sub="Designed with the people who ride and run the buses — and engineered to keep improving."
        />
        <div className="why">
          <div className="why-col">
            {WHY.slice(0, 3).map((item, i) => (
              <WhyItem key={item.title} item={item} index={i} side="l" active={active === i} onEnter={() => setActive(i)} delay={i * 100} />
            ))}
          </div>
          <div className="why-phone" data-aos="zoom-in">
            <span className="why-ring" />
            <span className="why-ring why-ring--2" />
            <WhyPhone active={active} />
          </div>
          <div className="why-col">
            {WHY.slice(3).map((item, i) => (
              <WhyItem key={item.title} item={item} index={i + 3} side="r" active={active === i + 3} onEnter={() => setActive(i + 3)} delay={i * 100} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

/* ================================================================== */
/* Principles — animated emblems                                       */
/* ================================================================== */

const EcoGauge = () => (
  <div className="pr-art">
    <svg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="46" className="pr-track" />
      <circle cx="60" cy="60" r="46" className="pr-arc" pathLength="100" />
    </svg>
    <span className="pr-art__icon pr-art__icon--green"><Leaf size={28} /></span>
  </div>
);

const LockOrbit = () => (
  <div className="pr-art">
    <span className="pr-orbit" />
    <span className="pr-orbit pr-orbit--2" />
    <span className="pr-art__icon"><Lock size={26} /></span>
  </div>
);

const Stopwatch = () => (
  <div className="pr-art">
    <svg viewBox="0 0 120 120">
      <rect x="54" y="4" width="12" height="10" rx="3" className="pr-watch__btn" />
      <circle cx="60" cy="64" r="44" className="pr-track" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="60"
          y1="26"
          x2="60"
          y2={i % 3 === 0 ? 33 : 30}
          className="pr-tick"
          transform={`rotate(${i * 30} 60 64)`}
        />
      ))}
      <g className="pr-hand">
        <line x1="60" y1="64" x2="60" y2="32" />
      </g>
      <circle cx="60" cy="64" r="4" className="pr-hub" />
    </svg>
  </div>
);

const Sparkline = () => (
  <div className="pr-art">
    <svg viewBox="0 0 120 120">
      <defs>
        <linearGradient id="prArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M10 96 L34 80 L54 86 L78 56 L106 30 L106 110 L10 110 Z" fill="url(#prArea)" className="pr-area" />
      <path d="M10 96 L34 80 L54 86 L78 56 L106 30" className="pr-line" pathLength="100" />
      <circle cx="106" cy="30" r="5" className="pr-dot" />
    </svg>
  </div>
);

const PRINCIPLES = [
  { art: <EcoGauge />, title: 'Environmental Responsibility', desc: 'Encouraging public transit for a smaller carbon footprint.' },
  { art: <LockOrbit />, title: 'Security & Privacy', desc: 'Encrypted transactions and secure QR code generation.' },
  { art: <Stopwatch />, title: 'Efficiency', desc: 'Minimized wait times and streamlined boarding.' },
  { art: <Sparkline />, title: 'Performance', desc: 'Real-time updates and contactless payments at scale.' },
];

export const Principles = () => (
  <section className="sx">
    <Container maxWidth="lg">
      <Head
        eyebrow="Our principles"
        title="What guides"
        accent="every ride"
        sub="Designed to simplify and automate your ticketing process for a seamless journey."
      />
      <Grid container spacing={3}>
        {PRINCIPLES.map((p, i) => (
          <Grid item xs={12} sm={6} md={3} key={p.title} data-aos="fade-up" data-aos-delay={i * 100}>
            <div className="pr-card">
              {p.art}
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  </section>
);

/* ================================================================== */
/* Who we are                                                          */
/* ================================================================== */

const COMMITMENTS = [
  { title: 'Commitment to Quality', desc: 'Your success is our priority — top-notch quality and outstanding service.' },
  { title: 'Tailored Innovation', desc: 'Custom-built solutions that meet the unique needs of your business.' },
  { title: 'Dedicated Experts', desc: 'A skilled, passionate team with diverse domain expertise.' },
];

export const WhoWeAre = () => (
  <section className="sx">
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
        <Grid item xs={12} md={6}>
          <div className="who-media" data-aos="fade-right">
            <img src={whoweare} alt="The SIN team" loading="lazy" />
            <div className="who-badge">
              <strong>SIN</strong>
              <small>Sustainable Innovation<br />and Nature</small>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div data-aos="fade-left">
            <span className="sx-eyebrow">Who we are</span>
            <h2 className="sx-title sx-title--left">Who are <span>we?</span></h2>
            <p className="sx-sub sx-sub--left">
              At <strong>SIN (Sustainable Innovation and Nature)</strong>, we&apos;re transforming how people travel by
              developing innovative software and hardware for bus ticketing — simplifying terminal entry and everyday
              ticketing.
            </p>
            <div className="cm-card">
              <div className="cm-card__head">
                <span>Our commitments</span>
                <em className="cm-progress"><i /></em>
              </div>
              {COMMITMENTS.map((c, i) => (
                <div key={c.title} className="cm-item" style={{ '--d': `${0.6 + i * 0.9}s` }}>
                  <span className="cm-box"><Check size={14} strokeWidth={3} /></span>
                  <div>
                    <strong>{c.title}</strong>
                    <p>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  </section>
);

/* ================================================================== */
/* Final CTA — a giant ticket                                          */
/* ================================================================== */

const FAQS = [
  { q: 'How do I get a ticket?', a: 'Pick your route on Book Tickets, pay online, and your QR ticket appears instantly in your account — ready to scan.' },
  { q: 'Do I need to print anything?', a: 'No. Just open your QR ticket on your phone and show it at the gate. That is the whole point: zero paper.' },
  { q: 'Can I check the fare before I book?', a: 'Yes. The Fare Calculator shows the price for any route before you pay.' },
  { q: 'Where can I find my past trips?', a: 'Every ticket and payment is saved under Ticket History, so you can track trips and spending any time.' },
  { q: 'Is my payment secure?', a: 'Payments go through an encrypted checkout, and every QR ticket is generated securely and verified at the gate.' },
];

export const Faq = () => (
  <section className="sx sx--muted">
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid item xs={12} md={5}>
          <div data-aos="fade-right">
            <span className="sx-eyebrow">FAQ</span>
            <h2 className="sx-title sx-title--left">Questions, <span>answered.</span></h2>
            <p className="sx-sub sx-sub--left">Everything riders usually ask before their first scan.</p>
            <div className="faq-help">
              <span className="faq-help__icon"><LifeBuoy size={20} /></span>
              <div>
                <strong>Still stuck?</strong>
                <p>Our support team is a message away.</p>
                <Link to="/support">Visit Support <ArrowRight size={14} /></Link>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={7}>
          <div className="faq-list" data-aos="fade-up">
            {FAQS.map((f, i) => (
              <details key={f.q} className="faq-item" open={i === 0}>
                <summary>
                  {f.q}
                  <span className="faq-item__icon"><Plus size={16} /></span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  </section>
);

/* ================================================================== */

export const FinalCta = () => (
  <section className="sx sx--cta">
    <Container maxWidth="lg">
      <div data-aos="zoom-in">
      <div className="fc-ticket">
        <div className="fc-main">
          <span className="sx-eyebrow">Ready when you are</span>
          <h2 className="sx-title sx-title--left">
            Your next ride starts with a <span>scan.</span>
          </h2>
          <p className="sx-sub sx-sub--left">
            Book your first QR ticket in seconds — no paper, no queues, no waiting at the counter.
          </p>
          <div className="fc-actions">
            <Button
              component={Link}
              to="/bookTickets"
              variant="contained"
              size="large"
              endIcon={<ArrowRight size={18} />}
              sx={{ py: 1.5, px: 3.5 }}
            >
              Book a Ticket
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{ py: 1.5, px: 3.5, borderColor: 'rgba(148,163,184,0.35)', color: '#E2E8F0', '&:hover': { borderColor: '#60A5FA', color: '#fff', bgcolor: 'rgba(96,165,250,0.08)' } }}
            >
              Contact Us
            </Button>
          </div>
        </div>
        <div className="fc-perf" aria-hidden="true" />
        <div className="fc-stub" aria-hidden="true">
          <div className="fc-qr">
            <QrCode size={104} strokeWidth={1.5} />
            <span className="fc-beam" />
          </div>
          <small>ADMIT ONE · SCAN TO BOARD</small>
        </div>
      </div>
      </div>
    </Container>
  </section>
);
