import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { BarChart3, Cloud, CreditCard, ScanLine, Smartphone } from 'lucide-react';
import { Head } from './HomeSections';
import './Platform.css';

// "Under the hood": one booking fans out into a chain of events. The event
// stream drives the diagram, so the node that just acted lights up.
const NODES = [
  { key: 'rider', icon: Smartphone, title: 'Rider app', sub: 'Book & hold your QR' },
  { key: 'pay', icon: CreditCard, title: 'Payments', sub: 'UPI, cards, wallet' },
  { key: 'core', icon: Cloud, title: 'SmartBus Cloud', sub: 'Tickets · fares · validation' },
  { key: 'gate', icon: ScanLine, title: 'Gate validator', sub: 'Scan-to-board in a blink' },
  { key: 'ops', icon: BarChart3, title: 'Operator console', sub: 'Live ridership & demand' },
];

// Paths in a 1000 x 440 viewBox, all meeting at the core.
const LINKS = [
  { key: 'rider', d: 'M230 95 C 330 95, 320 220, 420 220', label: 'Booking', color: '#60A5FA' },
  { key: 'pay', d: 'M230 345 C 330 345, 320 220, 420 220', label: 'Payment ✓', color: '#4ADE80' },
  { key: 'gate', d: 'M580 220 C 680 220, 670 95, 770 95', label: 'QR keys', color: '#FBBF24' },
  { key: 'ops', d: 'M580 220 C 680 220, 670 345, 770 345', label: 'Ridership data', color: '#C084FC' },
];

const EVENTS = [
  { node: 'rider', tag: 'BOOK', text: 'Rider booked HBL → DWD · 1 adult' },
  { node: 'pay', tag: 'PAY', text: 'Payment ₹25 confirmed via UPI' },
  { node: 'core', tag: 'ISSUE', text: 'QR ticket #A7F2 issued' },
  { node: 'gate', tag: 'SCAN', text: 'Gate 04 · ticket #A7F2 verified' },
  { node: 'ops', tag: 'DATA', text: 'Line 100 nearing peak · extra bus suggested' },
  { node: 'rider', tag: 'BOOK', text: 'Rider booked NVN → HSR · 2 adults' },
  { node: 'pay', tag: 'PAY', text: 'Payment ₹40 confirmed via card' },
  { node: 'core', tag: 'ISSUE', text: 'QR ticket #B19C issued' },
  { node: 'gate', tag: 'SCAN', text: 'Gate 11 · ticket #B19C verified' },
  { node: 'ops', tag: 'DATA', text: 'Hourly ridership report refreshed' },
];
const FEED_SIZE = 4;
const TICK_MS = 1800;

const Platform = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, []);

  // newest first
  const feed = Array.from({ length: FEED_SIZE }, (_, i) => {
    const n = tick - i;
    return { ...EVENTS[((n % EVENTS.length) + EVENTS.length) % EVENTS.length], id: n };
  });
  const hot = feed[0].node;

  return (
    <section className="sx sx--night pf">
      <Container maxWidth="lg">
        <Head
          eyebrow="Under the hood"
          title="One cloud. Every ride,"
          accent="connected."
          sub="The moment you tap Book, a chain of secure events fires — from your phone, through payments, to the gate and onto the operator's screen."
        />

        <div className="pf-diagram" data-aos="fade-up">
          <svg className="pf-wires" viewBox="0 0 1000 440" aria-hidden="true">
            {LINKS.map((l) => (
              <g key={l.key}>
                <path d={l.d} className="pf-wire" />
                <path d={l.d} className="pf-wire pf-wire--flow" style={{ stroke: l.color }} />
                {[0, 1].map((k) => (
                  <circle key={k} r="5" fill={l.color} className="pf-packet">
                    <animateMotion dur="2.4s" begin={`${k * 1.2}s`} repeatCount="indefinite" path={l.d} />
                  </circle>
                ))}
              </g>
            ))}
          </svg>

          {LINKS.map((l) => (
            <span key={l.key} className={`pf-label pf-label--${l.key}`} style={{ '--c': l.color }}>{l.label}</span>
          ))}

          {NODES.map(({ key, icon: Icon, title, sub }) => (
            <div key={key} className={`pf-node pf-node--${key}${hot === key ? ' is-hot' : ''}`}>
              {key === 'core' && <><span className="pf-ring" /><span className="pf-ring pf-ring--2" /></>}
              <span className="pf-node__icon"><Icon size={key === 'core' ? 26 : 20} /></span>
              <div>
                <strong>{title}</strong>
                <small>{sub}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="pf-feed" data-aos="fade-up" aria-hidden="true">
          <div className="pf-feed__head">
            <span><i /> Event stream</span>
            <span>illustrative</span>
          </div>
          {feed.map((e, i) => (
            <div key={e.id} className="pf-event" style={{ '--o': 1 - i * 0.22 }}>
              <em className={`pf-tag pf-tag--${e.node}`}>{e.tag}</em>
              <span>{e.text}</span>
              <small>{i === 0 ? 'now' : `${Math.round((i * TICK_MS) / 1000)}s ago`}</small>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Platform;
