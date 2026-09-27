import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { ArrowRight, Bus, Check, RotateCcw } from 'lucide-react';
import { Head } from './HomeSections';
import { bookState, useFare, useStops } from './useTransit';
import './TryIt.css';

// Signed-out visitors get the stops the rest of the page already shows.
const DEMO_STOPS = ['Hubli CBT', 'Unkal', 'Navanagar', 'Vidyanagar', 'Hosur', 'Dharwad'];

// Decorative QR: three finder blocks + bits hashed from the route, so each
// route gets its own pattern. Not a scannable code.
const QR = 11;
const qrCells = (seed) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Array.from({ length: QR * QR }, (_, i) => {
    const r = Math.floor(i / QR);
    const c = i % QR;
    if ((r < 3 || r > QR - 4) && (c < 3 || c > QR - 4) && !(r > QR - 4 && c > QR - 4)) return true;
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    return (h & 3) !== 0;
  });
};

const TryIt = () => {
  const navigate = useNavigate();
  const { stops: liveStops, signedIn } = useStops();
  const live = signedIn && liveStops.length > 0;
  const stops = live ? liveStops : DEMO_STOPS;

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [flipped, setFlipped] = useState(false);
  const [boarded, setBoarded] = useState(false);
  const { fare, loading } = useFare(from, to);

  // new route -> fresh ticket
  useEffect(() => { setFlipped(false); setBoarded(false); }, [from, to]);

  useEffect(() => {
    if (!flipped) return undefined;
    const id = setTimeout(() => setBoarded(true), 1800);
    return () => clearTimeout(id);
  }, [flipped]);

  const pick = (stop) => {
    if (!from || to) { setFrom(stop); setTo(''); }
    else if (stop === from) setFrom('');
    else setTo(stop);
  };

  const iFrom = stops.indexOf(from);
  const iTo = stops.indexOf(to);
  const [lo, hi] = iTo < 0 ? [iFrom, iFrom] : [Math.min(iFrom, iTo), Math.max(iFrom, iTo)];
  const ready = Boolean(from && to);
  const cells = useMemo(() => qrCells(`${from}>${to}`), [from, to]);

  let fareText = '—';
  if (ready && live) fareText = loading ? '…' : fare != null ? `₹${fare}` : 'At checkout';
  else if (ready) fareText = 'Sign in';

  const book = () => (signedIn ? navigate('/bookTickets', { state: bookState(from, to) }) : navigate('/signin'));

  return (
    <section className="sx ti">
      <Container maxWidth="lg">
        <Head
          eyebrow="Try it"
          title="Plan a ride, see your"
          accent="pass"
          sub="Tap two stops on the line. Your ticket fills in, then tap it to watch the gate scan it."
        />

        <Grid container spacing={{ xs: 4, md: 5 }} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <div className="ti-map" data-aos="fade-right">
              <div className="ti-map__head">
                <span><Bus size={15} /> {live ? 'Live network' : 'Demo line'}</span>
                <em>{from ? (to ? 'Route set' : 'Now pick where you’re going') : 'Pick where you start'}</em>
              </div>
              <ol className="ti-line">
                {stops.map((s, i) => {
                  const role = s === from ? 'is-from' : s === to ? 'is-to' : '';
                  const onRoute = lo >= 0 && i >= lo && i <= hi;
                  return (
                    <li key={s} className={`${onRoute ? 'on-route ' : ''}${i === hi && hi !== lo ? 'route-end ' : ''}${i === lo && hi !== lo ? 'route-start' : ''}`}>
                      <button type="button" className={`ti-stop ${role}`} onClick={() => pick(s)} aria-pressed={Boolean(role)}>
                        <i />
                        <span>{s}</span>
                        {role && <b>{role === 'is-from' ? 'From' : 'To'}</b>}
                      </button>
                    </li>
                  );
                })}
              </ol>
              {!live && <p className="ti-note">Demo stops. {signedIn ? 'Live stops are loading.' : 'Sign in to explore the full network with live fares.'}</p>}
            </div>
          </Grid>

          <Grid item xs={12} md={5}>
            <div className="ti-side" data-aos="fade-left">
              <button
                type="button"
                className={`ti-card${flipped ? ' is-flipped' : ''}${boarded ? ' is-boarded' : ''}`}
                onClick={() => ready && setFlipped((f) => !f)}
                disabled={!ready}
                aria-label={ready ? (flipped ? 'Show ticket details' : 'Reveal QR pass') : 'Pick two stops first'}
              >
                <span className="ti-face ti-face--front">
                  <span className="ti-card__top"><small>SmartBus e-Ticket</small><em>1 adult</em></span>
                  <span className="ti-route">
                    <span><small>From</small><strong>{from || 'Select'}</strong></span>
                    <ArrowRight size={18} />
                    <span><small>To</small><strong>{to || 'Select'}</strong></span>
                  </span>
                  <span className="ti-card__rip" />
                  <span className="ti-card__bottom">
                    <span><small>Fare</small><strong>{fareText}</strong></span>
                    <span className="ti-hint">{ready ? 'Tap to reveal QR' : 'Pick two stops'}</span>
                  </span>
                </span>

                <span className="ti-face ti-face--back">
                  <span className="ti-qr">
                    {cells.map((on, i) => <i key={i} className={on ? '' : 'off'} />)}
                    <span className="ti-beam" />
                  </span>
                  <span className="ti-stamp"><Check size={16} strokeWidth={3} /> Boarded</span>
                  <span className="ti-hint"><RotateCcw size={12} /> Tap to flip back</span>
                </span>
              </button>

              <button type="button" className="ti-book" onClick={book} disabled={signedIn && !ready}>
                {signedIn ? 'Book this ride' : 'Sign in to book'} <ArrowRight size={16} />
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default TryIt;
