import { Link } from 'react-router-dom';
import { Container, Dialog, IconButton, useMediaQuery } from '@mui/material';
import { ArrowRight, Calendar, Clock, Plus, QrCode, X } from 'lucide-react';
import moment from 'moment';
import './Tickets.css';

// Shared bits for Recent Tickets and Ticket History.

export const money = (n) => `₹${Number(n || 0).toFixed(2)}`;

export const typeLabel = (t = '') =>
  t.toLowerCase().split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export const when = (s) => {
  const m = moment(s, 'DD-MM-YYYY HH:mm:ss');
  return m.isValid() ? { date: m.format('DD MMM YYYY'), time: m.format('hh:mm A') } : { date: '—', time: '' };
};

export const StatusBadge = ({ active, label }) => (
  <span className={`tk-badge ${active ? 'tk-badge--ok' : 'tk-badge--off'}`}>
    <i /> {label || (active ? 'Active' : 'Expired')}
  </span>
);

export const TicketsHeader = ({ eyebrow, title, sub }) => (
  <header className="tk-head">
    <Container maxWidth="lg" className="tk-head__inner">
      <div>
        <span className="tk-head__eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      <Link to="/bookTickets" className="tk-btn tk-btn--light">
        <Plus size={16} /> Book a ticket
      </Link>
    </Container>
  </header>
);

export const EmptyState = ({ title, text }) => (
  <div className="tk-empty">
    <span className="tk-empty__icon"><QrCode size={28} /></span>
    <h3>{title}</h3>
    <p>{text}</p>
    <Link to="/bookTickets" className="tk-btn tk-btn--primary">
      Book a ticket <ArrowRight size={16} />
    </Link>
  </div>
);

export const LoadingState = ({ text = 'Loading your tickets…' }) => (
  <div className="tk-empty">
    <span className="tk-spinner" />
    <p>{text}</p>
  </div>
);

// Full-size QR for showing at the gate.
export const QrDialog = ({ ticket, onClose }) => {
  const phone = useMediaQuery('(max-width:599.98px)');
  const t = ticket ? when(ticket.createdAt) : null;
  return (
    <Dialog open={Boolean(ticket)} onClose={onClose} fullScreen={phone} maxWidth="xs" fullWidth PaperProps={{ className: 'tk-dialog' }}>
      {ticket && (
        <div className="tk-qrview">
          <IconButton onClick={onClose} className="tk-dialog__close" aria-label="Close"><X size={18} /></IconButton>
          <span className="tk-head__eyebrow tk-head__eyebrow--dark">Show this at the gate</span>
          <h2>{ticket.from} <ArrowRight size={18} /> {ticket.to}</h2>
          <div className="tk-qrview__code">
            {ticket.qrCodeLink ? <img src={ticket.qrCodeLink} alt="Ticket QR code" /> : <QrCode size={140} />}
          </div>
          <div className="tk-qrview__meta">
            <StatusBadge active={ticket.active} />
            <span>{typeLabel(ticket.ticketType)}</span>
            <span>{t.date} · {t.time}</span>
          </div>
          {!ticket.active && ticket.expiredMessage && <p className="tk-note">{ticket.expiredMessage}</p>}
        </div>
      )}
    </Dialog>
  );
};

// Boarding-pass card: route up top, QR + fare receipt below the tear line.
export const TicketPass = ({ ticket, onOpen, animate = true }) => {
  const t = when(ticket.createdAt);
  return (
    <article className={`tk-pass${ticket.active ? '' : ' is-expired'}`} data-aos={animate ? 'fade-up' : undefined}>
      <div className="tk-pass__top">
        <div className="tk-pass__row">
          <small>SmartBus e-Ticket</small>
          <StatusBadge active={ticket.active} />
        </div>
        <div className="tk-route">
          <span><small>From</small><strong title={ticket.from}>{ticket.from}</strong></span>
          <span className="tk-route__line"><i /><ArrowRight size={16} /></span>
          <span><small>To</small><strong title={ticket.to}>{ticket.to}</strong></span>
        </div>
        <div className="tk-pass__meta">
          <span><Calendar size={14} /> {t.date}</span>
          <span><Clock size={14} /> {t.time}</span>
          <span className="tk-pass__type">{typeLabel(ticket.ticketType)}</span>
        </div>
      </div>

      <div className="tk-rip" />

      <div className="tk-pass__bottom">
        <button type="button" className="tk-qrthumb" onClick={() => onOpen(ticket)} aria-label="Show QR code">
          {ticket.qrCodeLink ? <img src={ticket.qrCodeLink} alt="" /> : <QrCode size={48} />}
          <span>Tap to enlarge</span>
        </button>
        <dl className="tk-fare">
          <div><dt>Fare</dt><dd>{money(ticket.price)}</dd></div>
          <div><dt>Discount</dt><dd className="is-green">−{money(ticket.discountedAmount)}</dd></div>
          <div className="is-total"><dt>Paid</dt><dd>{money(ticket.amountAfterDiscount)}</dd></div>
        </dl>
      </div>

      {!ticket.active && ticket.expiredMessage && <p className="tk-note">{ticket.expiredMessage}</p>}
    </article>
  );
};
