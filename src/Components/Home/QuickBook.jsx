import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpDown, MapPin, Navigation } from 'lucide-react';
import { bookState, useFare, useStops } from './useTransit';
import './QuickBook.css';

// Hero booking card for signed-in riders: pick two stops, see the live fare,
// and jump into checkout with both stations already filled in.
const QuickBook = () => {
  const navigate = useNavigate();
  const { stops } = useStops();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const { fare, loading } = useFare(from, to);

  const swap = () => { setFrom(to); setTo(from); };
  const book = () => navigate('/bookTickets', { state: bookState(from, to) });

  let fareText = 'Pick two stops to see your fare';
  if (from && to) fareText = loading ? 'Checking fare…' : fare != null ? null : 'Fare shown at checkout';

  return (
    <div className="qb">
      <div className="qb-fields">
        <label className="qb-field">
          <MapPin size={16} />
          <span>From</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">Departure stop</option>
            {stops.filter((s) => s !== to).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <button type="button" className="qb-swap" onClick={swap} aria-label="Swap stops">
          <ArrowUpDown size={15} />
        </button>
        <label className="qb-field">
          <Navigation size={16} />
          <span>To</span>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">Destination stop</option>
            {stops.filter((s) => s !== from).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <div className="qb-foot">
        <div className="qb-fare" aria-live="polite">
          {fareText ?? <><small>1 adult</small><strong>₹{fare}</strong></>}
        </div>
        <button type="button" className="qb-book" onClick={book}>
          Book now <ArrowRight size={16} />
        </button>
      </div>

      <Link to="/fareCalculator" className="qb-more">More passengers? Open the fare calculator</Link>
    </div>
  );
};

export default QuickBook;
