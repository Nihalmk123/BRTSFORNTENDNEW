import React from 'react';
import './HeroBackdrop.css';

// Living city along the bottom of the hero: a drifting skyline, a far lane of
// small buses heading the other way, and a dedicated BRTS lane where buses
// pull into a QR station, the gate scans, and they pull away. No one queues.

// Deterministic skyline: [width, height] blocks, drawn twice for a seamless loop.
const BLOCKS = [
  [60, 70], [40, 110], [70, 55], [36, 140], [80, 90], [50, 60], [44, 125], [90, 75],
  [38, 100], [66, 150], [52, 65], [74, 115], [40, 80], [58, 135], [84, 60], [46, 95],
  [62, 120], [36, 70], [78, 105], [54, 145], [70, 65], [42, 90],
];

const Skyline = () => {
  let x = 0;
  const rects = BLOCKS.map(([w, h], i) => {
    const r = <rect key={i} x={x} y={160 - h} width={w - 4} height={h} rx="3" />;
    x += w;
    return r;
  });
  return (
    <svg className="hbd-skyline__svg" viewBox={`0 0 ${x} 160`} preserveAspectRatio="none" aria-hidden="true">
      {rects}
    </svg>
  );
};

const Bus = ({ tone = 'blue' }) => (
  <svg className={`hbd-bus hbd-bus--${tone}`} viewBox="0 0 132 48" aria-hidden="true">
    <rect x="2" y="4" width="128" height="34" rx="9" className="hbd-bus__body" />
    <rect x="10" y="10" width="92" height="12" rx="3" className="hbd-bus__windows" />
    <rect x="108" y="10" width="16" height="20" rx="3" className="hbd-bus__windows" />
    <rect x="2" y="27" width="128" height="4" className="hbd-bus__stripe" />
    <circle cx="30" cy="39" r="7" className="hbd-bus__wheel" />
    <circle cx="104" cy="39" r="7" className="hbd-bus__wheel" />
  </svg>
);

const HeroBackdrop = () => (
  <div className="hbd" aria-hidden="true">
    <div className="hbd-skyline">
      <Skyline />
      <Skyline />
    </div>

    <div className="hbd-far">
      {[0, 1, 2].map((i) => (
        <div key={i} className="hbd-far__run" style={{ '--d': `${-i * 9}s` }}>
          <Bus tone="ghost" />
        </div>
      ))}
    </div>

    <div className="hbd-road">
      <div className="hbd-station">
        <span className="hbd-station__roof" />
        <span className="hbd-station__gate"><i /></span>
        <small>QR</small>
      </div>
      {[0, 1].map((i) => (
        <div key={i} className="hbd-near__run" style={{ '--d': `${-i * 8}s` }}>
          <Bus />
        </div>
      ))}
    </div>
  </div>
);

export default HeroBackdrop;
