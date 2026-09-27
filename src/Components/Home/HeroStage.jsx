import React from 'react';
import HeroShowcase from './HeroShowcase';
import './HeroStage.css';

// A small transit diagram behind the phone: three colour-coded lines, laid
// out symmetrically so they bend around the phone, with stations only in the
// visible margins.
const LINES = [
  { key: 'blue', d: 'M-20 120 H90 L150 180 H410 L470 120 H580', dur: '8s' },
  { key: 'amber', d: 'M-20 300 H580', dur: '7s' },
  { key: 'teal', d: 'M-20 480 H90 L150 420 H410 L470 480 H580', dur: '9s' },
];

const STATIONS = [
  { line: 'blue', x: 44, y: 120, name: 'HUBLI CBT' },
  { line: 'blue', x: 516, y: 120, name: 'DHARWAD', right: true },
  { line: 'amber', x: 44, y: 300, name: 'UNKAL' },
  { line: 'amber', x: 516, y: 300, name: 'NAVANAGAR', right: true },
  { line: 'teal', x: 44, y: 480, name: 'GOKUL RD' },
  { line: 'teal', x: 516, y: 480, name: 'SATTUR', right: true },
];

const HeroStage = () => (
  <div className="hstage">
    <svg className="hstage-map" viewBox="0 0 560 560" aria-hidden="true">
      {LINES.map((l) => (
        <g key={l.key} className={`hstage-route hstage-route--${l.key}`}>
          <path d={l.d} className="hstage-line" pathLength="100" />
          <path d={l.d} className="hstage-pulse" pathLength="100" style={{ animationDuration: l.dur }} />
        </g>
      ))}
      {STATIONS.map((s) => (
        <g key={s.name} className={`hstage-station hstage-route--${s.line}`}>
          <circle cx={s.x} cy={s.y} r="5" />
          <text x={s.right ? s.x + 4 : s.x - 4} y={s.y - 14} textAnchor={s.right ? 'end' : 'start'}>{s.name}</text>
        </g>
      ))}
    </svg>

    <div className="hstage-tilt">
      <HeroShowcase />
    </div>
  </div>
);

export default HeroStage;
