import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { Bell, Check, MapPin, QrCode, ScanLine, ShieldCheck, User } from 'lucide-react';
import Section from '../UI/Section';
import SectionHeading from '../UI/SectionHeading';
import './HowItWorks.css';

const STEP_MS = 5000;
const ROUTE = 'M50 205 C 130 205, 120 110, 210 118 S 320 70, 352 62';

const STEPS = [
  {
    icon: MapPin,
    title: 'Pick your route',
    desc: 'Choose your stops and passengers, then book securely online — no counter, no cash.',
  },
  {
    icon: QrCode,
    title: 'Get your QR ticket',
    desc: 'Your ticket arrives instantly on your phone as a QR code. Nothing to print, nothing to collect.',
  },
  {
    icon: ScanLine,
    title: 'Scan & board',
    desc: 'Hold your QR to the gate scanner — it verifies in a moment and the gate opens for you.',
  },
];

const QR_PATTERN = [
  1, 1, 1, 0, 1, 0, 1, 1, 1,
  1, 0, 1, 0, 0, 1, 1, 0, 1,
  1, 1, 1, 0, 1, 0, 1, 1, 1,
  0, 0, 0, 1, 1, 0, 0, 0, 0,
  1, 0, 1, 1, 0, 1, 1, 0, 1,
  0, 1, 0, 0, 1, 0, 0, 1, 0,
  1, 1, 1, 0, 0, 1, 1, 0, 1,
  1, 0, 1, 0, 1, 1, 0, 1, 0,
  1, 1, 1, 0, 1, 0, 1, 1, 1,
];

/* Step 1 — the route draws itself and a bus follows it */
const RouteScene = () => (
  <div className="hw-scene hw-route">
    <svg viewBox="0 0 400 260" className="hw-map" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path d="M0 70 H400 M0 160 H400 M0 235 H400 M95 0 V260 M230 0 V260 M330 0 V260" className="hw-map__grid" />
      <path d={ROUTE} className="hw-map__base" />
      <path d={ROUTE} className="hw-map__draw" pathLength="1" />
      <g transform="translate(50 205)" className="hw-map__pin">
        <circle r="11" />
        <circle r="4.5" className="hw-map__pin-dot" />
      </g>
      <g transform="translate(352 62)" className="hw-map__pin hw-map__pin--end">
        <circle r="11" />
        <circle r="4.5" className="hw-map__pin-dot" />
      </g>
      <text x="50" y="238" className="hw-map__text">Hubli CBT</text>
      <text x="352" y="36" className="hw-map__text">Dharwad</text>
      <g className="hw-map__bus">
        <rect x="-15" y="-10" width="30" height="20" rx="6" />
        <rect x="-10" y="-5" width="8" height="6" rx="1.5" className="hw-map__win" />
        <rect x="1" y="-5" width="8" height="6" rx="1.5" className="hw-map__win" />
        <animateMotion
          dur={`${STEP_MS / 1000}s`}
          fill="freeze"
          path={ROUTE}
          keyPoints="0;0;1;1"
          keyTimes="0;0.1;0.7;1"
          calcMode="linear"
        />
      </g>
    </svg>
    <div className="hw-book">
      <div>
        <small>1 Adult · Today</small>
        <strong>Hubli → Dharwad</strong>
      </div>
      <span className="hw-book__btn"><Check size={14} /> Booked</span>
    </div>
  </div>
);

/* Step 2 — the QR ticket lands on the phone */
const TicketScene = () => (
  <div className="hw-scene hw-ticket">
    <div className="hw-toast">
      <span className="hw-toast__icon"><Bell size={14} /></span>
      <div>
        <strong>Your ticket is ready</strong>
        <small>HBL → DWD · 1 Adult</small>
      </div>
    </div>
    <div className="hw-phone">
      <div className="hw-pass">
        <div className="hw-pass__top">
          <div>
            <small>e-Ticket</small>
            <strong>HBL → DWD</strong>
          </div>
          <span className="hw-badge">Valid</span>
        </div>
        <div className="hw-pass__stub" />
        <div className="hw-qr">
          {QR_PATTERN.map((on, i) => (
            <span key={i} className={on ? '' : 'off'} style={{ '--i': i }} />
          ))}
        </div>
      </div>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="hw-spark" style={{ '--a': `${i * 60}deg` }} />
      ))}
    </div>
  </div>
);

/* Step 3 — scan at the gate, gate opens, rider walks through */
const GateScene = () => (
  <div className="hw-scene hw-gate">
    <div className="hw-verified">
      <ShieldCheck size={16} /> Verified · Gate open
    </div>
    <div className="hw-gate__floor" />
    <div className="hw-pillar hw-pillar--l">
      <span className="hw-scanner"><ScanLine size={14} /></span>
      <span className="hw-light" />
      <span className="hw-arm hw-arm--l" />
    </div>
    <div className="hw-pillar hw-pillar--r">
      <span className="hw-arm hw-arm--r" />
    </div>
    <div className="hw-rider">
      <span className="hw-rider__qr"><QrCode size={14} /></span>
      <span className="hw-rider__body"><User size={20} /></span>
    </div>
  </div>
);

const SCENES = [RouteScene, TicketScene, GateScene];

const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const [runId, setRunId] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Restart the current step each time the section scrolls into view.
  useEffect(() => {
    if (inView) setRunId((r) => r + 1);
  }, [inView]);

  useEffect(() => {
    if (!inView || reduced) return undefined;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % STEPS.length);
      setRunId((r) => r + 1);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [inView, runId, reduced]);

  const select = (i) => {
    setActive(i);
    setRunId((r) => r + 1);
  };

  const Scene = SCENES[active];

  return (
    <Section id="how-it-works" tone="muted">
      <SectionHeading
        eyebrow="How it works"
        title="From booking to boarding in three steps"
        subtitle="One QR code carries you from your couch to your seat."
      />
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" ref={ref}>
        <Grid item xs={12} md={5}>
          <div className="hw-steps" data-aos="fade-right">
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <button
                key={title}
                type="button"
                className={`hw-step${i === active ? ' is-active' : ''}`}
                onClick={() => select(i)}
                aria-pressed={i === active}
              >
                <span className="hw-step__num">{i + 1}</span>
                <span className="hw-step__body">
                  <span className="hw-step__title"><Icon size={17} />{title}</span>
                  <span className="hw-step__desc">{desc}</span>
                </span>
                <span className="hw-step__bar">
                  {i === active && !reduced && <i key={runId} style={{ '--step-ms': `${STEP_MS}ms` }} />}
                </span>
              </button>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={7}>
          <div className="hw-stage" data-aos="fade-left">
            <div className="hw-stage__bar">
              <span /><span /><span />
              <em>Step {active + 1} of {STEPS.length} · {STEPS[active].title}</em>
            </div>
            <div className="hw-stage__body">
              <Scene key={`${active}-${runId}`} />
            </div>
          </div>
        </Grid>
      </Grid>
    </Section>
  );
};

export default HowItWorks;
