import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { ArrowRight, Check, Leaf, Lock, QrCode, ScanLine, ShieldCheck, Store, Timer, Wallet, Zap } from 'lucide-react';
import './BenefitsBento.css';

const onSpotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const Tile = ({ icon: Icon, tag, title, desc, children, delay = 0 }) => (
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

/* Faster boarding: slow counter queue vs instant QR lane */
const QueueRace = () => (
  <div className="qr-race">
    <div className="qr-lane qr-lane--slow">
      <span className="qr-lane__label"><Store size={13} /> Ticket counter</span>
      <div className="qr-lane__track">
        <span className="qr-booth" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="qr-person" style={{ '--d': `${-i * 2.2}s` }} />
        ))}
      </div>
      <span className="qr-lane__state qr-lane__state--wait"><Timer size={12} /> Waiting</span>
    </div>
    <div className="qr-lane qr-lane--fast">
      <span className="qr-lane__label"><ScanLine size={13} /> SmartBus QR</span>
      <div className="qr-lane__track">
        <span className="qr-gate" />
        {[0, 1, 2].map((i) => (
          <span key={i} className="qr-person" style={{ '--d': `${-i * 0.8}s` }} />
        ))}
      </div>
      <span className="qr-lane__state qr-lane__state--go"><Zap size={12} /> Boarding</span>
    </div>
  </div>
);

/* Secure: scrambled token resolving to a verified state */
const GLYPHS = 'ABCDEF0123456789#$%&@*';
const TARGET = 'SIGNED · VERIFIED';

const Scramble = () => {
  const [text, setText] = useState(TARGET);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const id = setInterval(() => {
      frame = (frame + 1) % 90; // ~5.4s cycle at 60ms
      const revealed = frame < 30 ? 0 : Math.min(TARGET.length, Math.floor((frame - 30) / 1.5));
      setDone(revealed >= TARGET.length);
      setText(
        TARGET.split('')
          .map((ch, i) => (i < revealed || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="sec">
      <div className={`sec-shield${done ? ' is-done' : ''}`}>
        <span className="sec-ring" />
        {done ? <ShieldCheck size={30} /> : <Lock size={26} />}
      </div>
      <code className={`sec-token${done ? ' is-done' : ''}`}>{text}</code>
      <div className="sec-chips">
        <span><Lock size={11} /> Encrypted</span>
        <span><Check size={11} /> Secure QR</span>
      </div>
    </div>
  );
};

/* Eco: paper tickets fly into the phone and disappear; only the QR remains */
const PaperToPhone = () => (
  <div className="eco">
    <div className="eco-papers">
      {[0, 1, 2].map((i) => (
        <span key={i} className="eco-paper" style={{ '--d': `${i * 1.3}s` }}>
          <i /><i /><i />
        </span>
      ))}
    </div>
    <span className="eco-arrow"><ArrowRight size={18} /></span>
    <div className="eco-phone">
      <QrCode size={46} strokeWidth={1.6} />
      <span className="eco-phone__ok"><Check size={12} strokeWidth={3} /></span>
    </div>
    <div className="eco-stat">
      <strong>0</strong>
      <span>paper tickets<br />printed</span>
    </div>
  </div>
);

/* Cost: receipt where overhead gets struck off, leaving only the fare */
const Receipt = () => (
  <div className="rcpt">
    <div className="rcpt-head">
      <span>Cost of a trip</span>
      <Wallet size={14} />
    </div>
    {['Ticket printing', 'Counter handling', 'Paper stock'].map((line, i) => (
      <div key={line} className="rcpt-line rcpt-line--cut" style={{ '--d': `${0.5 + i * 0.6}s` }}>
        <span>{line}</span>
        <span className="rcpt-x">removed</span>
      </div>
    ))}
    <div className="rcpt-line rcpt-line--keep">
      <span><Check size={13} /> Just your fare</span>
    </div>
  </div>
);

const BenefitsBento = () => (
  <section className="bb">
    <Container maxWidth="lg">
      <div className="bb-head" data-aos="fade-up">
        <span className="bb-eyebrow"><i />Why it matters</span>
        <Typography variant="h2" className="bb-title">
          Built to move people, <span>not paper.</span>
        </Typography>
        <Typography className="bb-sub">
          Every part of SmartBus is designed around one idea — getting riders from the gate to their seat
          faster, cheaper, and cleaner.
        </Typography>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Tile
            icon={Zap}
            tag="Faster boarding"
            title="Skip the counter entirely"
            desc="While the queue waits at the counter, QR riders scan and walk straight through the gate."
          >
            <QueueRace />
          </Tile>
        </Grid>
        <Grid item xs={12} md={5}>
          <Tile
            icon={ShieldCheck}
            tag="Secure by design"
            title="Every ticket, verified"
            desc="Encrypted payments and secure QR generation keep passenger data protected."
            delay={100}
          >
            <Scramble />
          </Tile>
        </Grid>
        <Grid item xs={12} md={5}>
          <Tile
            icon={Leaf}
            tag="Eco-friendly"
            title="Zero paper, by default"
            desc="Every ticket lives on a phone — nothing to print, nothing to throw away."
            delay={100}
          >
            <PaperToPhone />
          </Tile>
        </Grid>
        <Grid item xs={12} md={7}>
          <Tile
            icon={Wallet}
            tag="Cost effective"
            title="Pay for the ride, not the overhead"
            desc="Digital fares remove printing, paper, and counter handling from the cost of every trip."
            delay={200}
          >
            <Receipt />
          </Tile>
        </Grid>
      </Grid>
    </Container>
  </section>
);

export default BenefitsBento;
