import React, { useEffect, useState } from 'react';
import "./HeroShowcase.css";
import { Bus, Check, CreditCard, MapPin, QrCode, ScanLine, Ticket, ShieldCheck } from 'lucide-react';

// Looping product story: Book -> Pay -> Get QR -> Scan & Board.
const STAGES = [
  { key: 'book', label: 'Book', icon: Ticket },
  { key: 'pay', label: 'Pay', icon: CreditCard },
  { key: 'ticket', label: 'Get QR', icon: QrCode },
  { key: 'board', label: 'Board', icon: ScanLine },
];
const STAGE_MS = 3600;

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

const QrGrid = () => (
  <div className="hs-qr">
    {QR_PATTERN.map((on, i) => (
      <span key={i} className={on ? '' : 'off'} style={{ '--i': i }} />
    ))}
  </div>
);

const HeroShowcase = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStage(2);
      return undefined;
    }
    const id = setInterval(() => setStage((s) => (s + 1) % STAGES.length), STAGE_MS);
    return () => clearInterval(id);
  }, []);

  const screen = (i) => `hs-screen${stage === i ? ' is-active' : ''}`;

  return (
    <div className="hs" style={{ '--stage-ms': `${STAGE_MS}ms` }}>
      <div className="hs-glow" aria-hidden="true" />

      {/* Floating status chips */}
      <div className={`hs-chip hs-chip--left${stage === 1 ? ' is-on' : ''}`}>
        <span className="hs-chip__icon hs-chip__icon--green"><Check size={14} /></span>
        Payment successful
      </div>
      <div className={`hs-chip hs-chip--right${stage === 2 ? ' is-on' : ''}`}>
        <span className="hs-chip__icon"><QrCode size={14} /></span>
        Ticket issued instantly
      </div>
      <div className={`hs-chip hs-chip--right-low${stage === 3 ? ' is-on' : ''}`}>
        <span className="hs-chip__icon hs-chip__icon--green"><ShieldCheck size={14} /></span>
        Verified at gate
      </div>

      {/* Phone */}
      <div className="hs-phone" aria-label={`Ticket journey: ${STAGES[stage].label}`} role="img">
        <div className="hs-notch" />
        <div className="hs-screen-wrap">
          <div className="hs-appbar">
            <span className="hs-appbar__logo"><Bus size={12} /></span>
            SmartBus
          </div>

          {/* 1. Book */}
          <div className={screen(0)}>
            <p className="hs-title">Plan your trip</p>
            <div className="hs-field">
              <MapPin size={14} className="hs-field__icon hs-field__icon--from" />
              <div>
                <small>From</small>
                <strong>Hubli CBT</strong>
              </div>
            </div>
            <div className="hs-field">
              <MapPin size={14} className="hs-field__icon" />
              <div>
                <small>To</small>
                <strong>Dharwad</strong>
              </div>
            </div>
            <div className="hs-row">
              <div className="hs-pill">1 Adult</div>
              <div className="hs-pill">Today</div>
            </div>
            <div className="hs-btn hs-btn--tap">
              Book ticket
              <span className="hs-tap" />
            </div>
          </div>

          {/* 2. Pay */}
          <div className={screen(1)}>
            <p className="hs-title">Payment</p>
            <div className="hs-summary">
              <div><span>Hubli → Dharwad</span><strong>1 Adult</strong></div>
            </div>
            <div className="hs-pay">
              <div className="hs-spinner" />
              <div className="hs-check"><Check size={28} /></div>
            </div>
            <p className="hs-pay__text">Processing securely…</p>
            <p className="hs-pay__done">Paid</p>
          </div>

          {/* 3. Ticket */}
          <div className={screen(2)}>
            <div className="hs-pass">
              <div className="hs-pass__top">
                <div>
                  <small>e-Ticket</small>
                  <strong>HBL → DWD</strong>
                </div>
                <span className="hs-badge">Valid</span>
              </div>
              <div className="hs-pass__stub" />
              <QrGrid />
              <small className="hs-pass__hint">Show this QR at the gate</small>
            </div>
          </div>

          {/* 4. Board */}
          <div className={screen(3)}>
            <div className="hs-pass hs-pass--scan">
              <div className="hs-pass__top">
                <div>
                  <small>e-Ticket</small>
                  <strong>HBL → DWD</strong>
                </div>
                <span className="hs-badge">Valid</span>
              </div>
              <div className="hs-pass__stub" />
              <div className="hs-scan-area">
                <QrGrid />
                <span className="hs-beam" />
                <div className="hs-verified"><Check size={22} /></div>
              </div>
              <small className="hs-pass__hint">Scanning…</small>
            </div>
          </div>
        </div>
      </div>

      {/* Road + bus */}
      <div className="hs-road" aria-hidden="true">
        <div className="hs-stop"><span>BUS STOP</span></div>
        <div key={stage === 3 ? 'go' : stage === 0 ? 'arrive' : 'wait'} className={`hs-bus${stage === 3 ? ' is-departing' : stage === 0 ? ' is-arriving' : ''}`}>
          <Bus size={20} />
        </div>
      </div>

      {/* Step tracker */}
      <div className="hs-steps">
        {STAGES.map(({ key, label, icon: Icon }, i) => (
          <div key={key} className={`hs-step${i === stage ? ' is-active' : ''}${i < stage ? ' is-done' : ''}`}>
            <span className="hs-step__icon"><Icon size={14} /></span>
            <span className="hs-step__label">{label}</span>
            <span className="hs-step__bar">{i === stage && <i key={stage} />}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroShowcase;
