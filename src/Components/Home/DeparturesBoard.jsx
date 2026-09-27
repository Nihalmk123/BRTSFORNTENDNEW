import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { Bus } from 'lucide-react';
import './DeparturesBoard.css';

// Split-flap "live departures" board: the city is always moving, and a
// SmartBus ticket plugs you straight into it. Times are a looping demo.
const ROUTES = [
  { line: '100', to: 'DHARWAD', due: 1 },
  { line: '100C', to: 'NAVANAGAR', due: 5 },
  { line: '101', to: 'VIDYANAGAR', due: 9 },
  { line: '102', to: 'HOSUR', due: 13 },
];
const HEADWAY = 16;
const TICK_MS = 2600;

const TICKER = [
  'QR e-Tickets',
  'Instant Booking',
  'Wallet Recharge',
  'Scan-to-Board Validation',
  'Paperless Travel',
  'Trip History',
  'Fare Calculator',
  'Secure Payments',
];

// Stops shown on the "next departure" strip for line 100
const STOPS = ['Hubli CBT', 'Unkal', 'Navanagar', 'Dharwad'];

const STATS = [
  { value: '1', label: 'scan to board' },
  { value: '0', label: 'paper tickets' },
  { value: '24/7', label: 'online booking' },
];

// Each character remounts when it changes, which replays the flip animation.
const Flap = ({ text, width, tone = '' }) => (
  <span className={`db-flap ${tone}`}>
    {text.padEnd(width).split('').map((c, i) => (
      <span key={`${i}-${c}`} style={{ '--i': i }}>{c}</span>
    ))}
  </span>
);

const status = (due) => {
  if (due === 0) return { text: 'BOARDING', tone: 'is-go' };
  if (due <= 2) return { text: 'ARRIVING', tone: 'is-soon' };
  return { text: 'ON TIME', tone: '' };
};

const DeparturesBoard = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, []);

  const [hh, mm] = new Date()
    .toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })
    .split(':');

  // Line 100 drives the strip: the bus reaches Dharwad exactly when the board says BOARDING.
  const due100 = (((ROUTES[0].due - tick) % HEADWAY) + HEADWAY) % HEADWAY;
  const progress = (HEADWAY - due100) / HEADWAY;
  // remount on wrap-around so the bus jumps back to the start instead of sliding backwards
  const lap = Math.floor((tick - ROUTES[0].due - 1) / HEADWAY);

  return (
    <section className="db">
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, lg: 8 }} alignItems="center">
          <Grid item xs={12} lg={5}>
            <div className="db-copy" data-aos="fade-right">
              <span className="db-eyebrow"><i /> Live on the line</span>
              <h2 className="db-title">
                The city runs on time. <span>Your ticket should too.</span>
              </h2>
              <p className="db-sub">
                Every SmartBus ticket is tied to a real route. Book it, scan it, and you&apos;re on the next
                departure — while operators watch the whole line move in real time.
              </p>
              <div className="db-stats">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <strong>{s.value}</strong>
                    <small>{s.label}</small>
                  </div>
                ))}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} lg={7}>
            <div className="db-card" data-aos="fade-left" aria-hidden="true">
              <div className="db-board">
                <div className="db-board__head">
                  <span>Departures · Hubli–Dharwad BRTS</span>
                  <span className="db-clock">{hh}<b>:</b>{mm}</span>
                </div>
                <div className="db-grid">
                  <div className="db-row db-row--label">
                    <span>Line</span>
                    <span>Destination</span>
                    <span>Due</span>
                    <span className="db-col-status">Status</span>
                  </div>
                  {ROUTES.map((r) => {
                    const due = (((r.due - tick) % HEADWAY) + HEADWAY) % HEADWAY;
                    const st = status(due);
                    return (
                      <div className="db-row" key={r.line}>
                        <Flap text={r.line} width={4} />
                        <Flap text={r.to} width={11} />
                        <Flap text={due === 0 ? 'NOW' : `${due}MIN`} width={5} tone={st.tone} />
                        <span className="db-col-status"><Flap text={st.text} width={8} tone={st.tone} /></span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="db-next">
                <div className="db-next__head">
                  <span><strong>Line 100</strong> · Hubli CBT → Dharwad</span>
                  <em className={due100 === 0 ? 'is-go' : ''}>{due100 === 0 ? 'Boarding now' : `Arrives in ${due100} min`}</em>
                </div>
                <div className="db-route">
                  <span key={`f${lap}`} className="db-route__fill" style={{ width: `${progress * 100}%` }} />
                  {STOPS.map((stop, i) => (
                    <span
                      key={stop}
                      className={`db-stop${progress * (STOPS.length - 1) >= i ? ' is-passed' : ''}`}
                      style={{ left: `${(i / (STOPS.length - 1)) * 100}%` }}
                    >
                      <small>{stop}</small>
                    </span>
                  ))}
                  <span key={lap} className="db-route__bus" style={{ left: `${progress * 100}%` }}>
                    <Bus size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>

      <div className="db-ticker" aria-hidden="true">
        <div className="db-ticker__track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span className="db-ticker__item" key={i}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeparturesBoard;
