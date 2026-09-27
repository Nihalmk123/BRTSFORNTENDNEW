import { useState, useEffect, useMemo } from 'react';
import { Container, Dialog, Drawer, IconButton, TablePagination } from '@mui/material';
import moment from 'moment';
import { ArrowRight, Check, ChevronRight, Copy, Download, QrCode, Receipt, Search, X } from 'lucide-react';
import { useAxiosWithInterceptor } from './Api/Axios';
import { useAuth } from '../Components/Context/Context';
import Layout from './Layout/Layout';
import { Helmet } from 'react-helmet-async';
import {
  EmptyState,
  QrDialog,
  StatusBadge,
  TicketPass,
  TicketsHeader,
  money,
  typeLabel,
  when,
} from './Tickets/TicketParts';

const TABS = [
  { label: 'All', path: 'all', title: 'No tickets yet', empty: 'You haven’t booked any tickets yet.' },
  { label: 'Active', path: 'all/active', empty: 'No active tickets right now.' },
  { label: 'Expired', path: 'all/expired', empty: 'No expired tickets.' },
  { label: 'Failed', path: 'all/failed', failed: true, empty: 'No failed payments. Nice.' },
];

const FMT = 'DD-MM-YYYY HH:mm:ss';

const formatDateTime = (dateTime) => {
  const m = moment(dateTime, FMT);
  return m.isValid() ? m.format('DD MMM YYYY, hh:mm A') : '—';
};

// "paymentId" -> "Payment id"
const humanize = (k) => k.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());

// Failed tickets use different field names; read both shapes through these.
const stamp = (t, failed) => (failed ? t.paymentDetailDto?.orderCreatedAt : t.createdAt);
const route = (t, failed) => (failed ? [t.fromStop, t.toStop] : [t.from, t.to]);

const dayLabel = (s) => {
  const m = moment(s, FMT);
  if (!m.isValid()) return 'Unknown date';
  if (m.isSame(moment(), 'day')) return 'Today';
  if (m.isSame(moment().subtract(1, 'day'), 'day')) return 'Yesterday';
  return m.format(m.isSame(moment(), 'year') ? 'dddd, DD MMM' : 'DD MMM YYYY');
};

// Consecutive rows that share a day go under one heading.
const groupByDay = (rows, failed) =>
  rows.reduce((groups, t) => {
    const label = dayLabel(stamp(t, failed));
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.items.push(t);
    else groups.push({ label, items: [t] });
    return groups;
  }, []);

const downloadCsv = (rows, failed, tabLabel) => {
  const header = failed
    ? ['Order created', 'From', 'To', 'Order ID', 'Payment ID', 'Amount', 'Payment status']
    : ['Booked', 'From', 'To', 'Ticket type', 'Fare', 'Discount', 'Paid', 'Status'];
  const lines = rows.map((t) =>
    failed
      ? [formatDateTime(stamp(t, true)), t.fromStop, t.toStop, t.paymentDetailDto?.orderId, t.paymentDetailDto?.paymentId, t.priceResponse?.grandTotal, t.paymentDetailDto?.status]
      : [formatDateTime(t.createdAt), t.from, t.to, typeLabel(t.ticketType), t.price, t.discountedAmount, t.amountAfterDiscount, t.active ? 'Active' : 'Expired']
  );
  const csv = [header, ...lines]
    .map((cols) => cols.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `smartbus-${tabLabel.toLowerCase()}-tickets-${moment().format('YYYY-MM-DD')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const CopyButton = ({ text }) => {
  const [done, setDone] = useState(false);
  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(text).then(() => {
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    });
  };
  return (
    <button type="button" className="tk-copy" onClick={copy} aria-label="Copy order ID" title="Copy order ID">
      {done ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
};

const TicketRow = ({ ticket, onOpen, onQr }) => {
  const t = when(ticket.createdAt);
  return (
    <div
      className="tk-row is-clickable"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(ticket)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(ticket))}
    >
      <div className="tk-row__route">
        <span className={`tk-row__dot${ticket.active ? ' is-on' : ''}`} />
        <div>
          <strong>{ticket.from} <ArrowRight size={14} /> {ticket.to}</strong>
          <span>{typeLabel(ticket.ticketType)} · {t.time}</span>
        </div>
      </div>
      <div className="tk-row__cell">
        <small>Paid</small>
        <strong>{money(ticket.amountAfterDiscount)}</strong>
        {Number(ticket.discountedAmount) > 0 && <span className="tk-green">−{money(ticket.discountedAmount)} off</span>}
      </div>
      <div className="tk-row__cell">
        <small>Status</small>
        <span title={!ticket.active ? ticket.expiredMessage || 'Ticket has expired' : undefined}>
          <StatusBadge active={ticket.active} />
        </span>
      </div>
      <div className="tk-row__action">
        <button
          type="button"
          className="tk-btn tk-btn--ghost tk-btn--sm"
          onClick={(e) => { e.stopPropagation(); onQr(ticket); }}
        >
          <QrCode size={15} /> QR
        </button>
        <ChevronRight size={18} className="tk-row__chev" />
      </div>
    </div>
  );
};

const FailedRow = ({ ticket, onDetails }) => {
  const discount = ticket.priceResponse?.ticketDetails?.reduce((sum, d) => sum + d.totalDiscountAmount, 0) || 0;
  const orderId = ticket.paymentDetailDto?.orderId;
  return (
    <div className="tk-row">
      <div className="tk-row__route">
        <span className="tk-row__dot is-bad" />
        <div>
          <strong>{ticket.fromStop} <ArrowRight size={14} /> {ticket.toStop}</strong>
          <span>
            {ticket.priceResponse?.ticketDetails?.map((d) => `${d.numberOfTickets} × ${typeLabel(d.ticketType)}`).join(', ')}
          </span>
        </div>
      </div>
      <div className="tk-row__cell">
        <small>Amount</small>
        <strong>{money(ticket.priceResponse?.grandTotal)}</strong>
        {discount > 0 && <span className="tk-green">−{money(discount)} off</span>}
      </div>
      <div className="tk-row__cell">
        <small>Order</small>
        <span className="tk-order">
          <span className="tk-mono" title={orderId}>{orderId || '—'}</span>
          {orderId && <CopyButton text={orderId} />}
        </span>
        <span title={ticket.paymentDetailDto?.note || undefined}>
          <StatusBadge label={ticket.paymentDetailDto?.status || 'Failed'} />
        </span>
      </div>
      <div className="tk-row__action">
        <button type="button" className="tk-btn tk-btn--ghost tk-btn--sm" onClick={() => onDetails(ticket)} disabled={!ticket.paymentDetailDto?.paymentId}>
          <Receipt size={15} /> Details
        </button>
      </div>
    </div>
  );
};

const SkeletonRows = () => (
  <div className="tk-rows" aria-busy="true" aria-label="Loading tickets">
    {Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="tk-row tk-row--skeleton">
        <div className="tk-row__route"><i className="tk-sk tk-sk--dot" /><div><i className="tk-sk tk-sk--lg" /><i className="tk-sk tk-sk--sm" /></div></div>
        <div className="tk-row__cell"><i className="tk-sk tk-sk--sm" /><i className="tk-sk tk-sk--md" /></div>
        <div className="tk-row__cell"><i className="tk-sk tk-sk--sm" /><i className="tk-sk tk-sk--md" /></div>
        <div className="tk-row__action"><i className="tk-sk tk-sk--btn" /></div>
      </div>
    ))}
  </div>
);

export default function TicketHistory() {
  const { auth } = useAuth();
  const api = useAxiosWithInterceptor();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [tab, setTab] = useState(0);
  const [rows, setRows] = useState([]);
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState(null);
  const [qrTicket, setQrTicket] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const failed = Boolean(TABS[tab].failed);

  const handleMoreDetails = async (ticket) => {
    const token = auth.accessToken;
    try {
      const response = await api.post(
        '/tsn/v1/payment/get-payment-details',
        { paymentId: ticket.paymentDetailDto.paymentId },
        { headers: { Authorization: token } }
      );
      setPaymentDetails(response.data);
    } catch (error) {
      console.error('Error fetching payment details:', error);
      alert('Failed to fetch payment details. Please try again later.');
    }
  };

  const changeTab = (i) => {
    setTab(i);
    setPage(0);
    setQuery('');
  };

  // Tab counts: one tiny request per tab.
  useEffect(() => {
    const token = auth.accessToken;
    if (!token) return undefined;
    let alive = true;
    Promise.all(
      TABS.map((t) =>
        api
          .get(`/tsn/v1/ticket/${t.path}?timeZone=${timeZone}&pageNumber=0&pageSize=1`, { headers: { Authorization: token } })
          .then((res) => res.data?.totalElements ?? null)
          .catch(() => null)
      )
    ).then((c) => alive && setCounts(c));
    return () => { alive = false; };
  }, [api, auth.accessToken, timeZone]);

  // Rows for the current tab + page; the failed tab returns a different list key.
  useEffect(() => {
    const token = auth.accessToken;
    if (!token) return undefined;
    let alive = true;
    setLoading(true);
    setRows([]);
    api
      .get(`/tsn/v1/ticket/${TABS[tab].path}?timeZone=${timeZone}&pageNumber=${page}&pageSize=${rowsPerPage}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        if (!alive) return;
        const list = TABS[tab].failed ? res.data.failedTickets : res.data.tickets;
        setRows(list || []);
        setTotalElements(res.data.totalElements || 0);
      })
      .catch((error) => console.error('Error fetching ticket data:', error))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [api, auth.accessToken, tab, page, rowsPerPage, timeZone]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((t) => route(t, failed).some((s) => s?.toLowerCase().includes(q)));
  }, [rows, query, failed]);

  const groups = useMemo(() => groupByDay(visible, failed), [visible, failed]);

  const paymentEntries = paymentDetails && typeof paymentDetails === 'object'
    ? Object.entries(paymentDetails).filter(([, v]) => v !== null && typeof v !== 'object')
    : [];

  const detailWhen = detail ? formatDateTime(detail.createdAt) : '';

  return (
    <Layout>
      <Helmet>
        <title>Ticket History</title>
      </Helmet>
      <div className="tk-page">
        <TicketsHeader
          eyebrow="My tickets"
          title="Ticket history"
          sub="Every trip and payment in one place."
        />

        <Container maxWidth="lg" className="tk-body">
          <div className="tk-panel">
            <div className="tk-tabs" role="tablist" aria-label="Filter tickets">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={tab === i}
                  className={tab === i ? 'is-on' : ''}
                  onClick={() => changeTab(i)}
                >
                  {t.label}
                  {counts[i] != null && <em className={t.failed && counts[i] > 0 ? 'is-bad' : ''}>{counts[i]}</em>}
                </button>
              ))}
            </div>

            <div className="tk-tools">
              <label className="tk-search">
                <Search size={16} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stops on this page"
                  aria-label="Search stops on this page"
                />
              </label>
              <button
                type="button"
                className="tk-btn tk-btn--ghost tk-btn--sm"
                onClick={() => downloadCsv(visible, failed, TABS[tab].label)}
                disabled={!visible.length}
              >
                <Download size={15} /> Export CSV
              </button>
            </div>

            {loading ? (
              <SkeletonRows />
            ) : rows.length === 0 ? (
              <EmptyState title={TABS[tab].title || `No ${TABS[tab].label.toLowerCase()} tickets`} text={TABS[tab].empty} />
            ) : visible.length === 0 ? (
              <div className="tk-nomatch">
                No stops match “{query}” on this page. <button type="button" className="tk-link" onClick={() => setQuery('')}>Clear search</button>
              </div>
            ) : (
              <div className="tk-rows">
                {groups.map((g) => (
                  <section key={g.label} className="tk-group">
                    <h3 className="tk-group__label">{g.label}<span>{g.items.length}</span></h3>
                    {g.items.map((ticket, i) =>
                      failed
                        ? <FailedRow key={ticket.paymentDetailDto?.orderId || i} ticket={ticket} onDetails={handleMoreDetails} />
                        : <TicketRow key={ticket.id} ticket={ticket} onOpen={setDetail} onQr={setQrTicket} />
                    )}
                  </section>
                ))}
              </div>
            )}

            {totalElements > 0 && (
              <TablePagination
                component="div"
                className="tk-pagination"
                rowsPerPageOptions={[5, 10, 25]}
                count={totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, p) => setPage(p)}
                onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              />
            )}
          </div>
        </Container>

        {/* Ticket details side panel */}
        <Drawer anchor="right" open={Boolean(detail)} onClose={() => setDetail(null)} PaperProps={{ className: 'tk-drawer' }}>
          {detail && (
            <div className="tk-drawer__body">
              <div className="tk-drawer__head">
                <div>
                  <span className="tk-head__eyebrow tk-head__eyebrow--dark">Ticket details</span>
                  <h2>{detail.from} <ArrowRight size={18} /> {detail.to}</h2>
                </div>
                <IconButton onClick={() => setDetail(null)} aria-label="Close"><X size={18} /></IconButton>
              </div>

              <TicketPass ticket={detail} onOpen={setQrTicket} animate={false} />

              <dl className="tk-facts">
                {detail.id != null && <div><dt>Ticket ID</dt><dd className="tk-mono">{detail.id}</dd></div>}
                <div><dt>Booked on</dt><dd>{detailWhen}</dd></div>
                <div><dt>Passenger type</dt><dd>{typeLabel(detail.ticketType)}</dd></div>
                <div><dt>Status</dt><dd><StatusBadge active={detail.active} /></dd></div>
                {!detail.active && detail.expiredMessage && <div><dt>Reason</dt><dd>{detail.expiredMessage}</dd></div>}
              </dl>

              <button type="button" className="tk-btn tk-btn--primary tk-drawer__cta" onClick={() => setQrTicket(detail)}>
                <QrCode size={16} /> Show QR at the gate
              </button>
            </div>
          )}
        </Drawer>

        <QrDialog ticket={qrTicket} onClose={() => setQrTicket(null)} />

        <Dialog open={Boolean(paymentDetails)} onClose={() => setPaymentDetails(null)} maxWidth="xs" fullWidth PaperProps={{ className: 'tk-dialog' }}>
          <div className="tk-details">
            <IconButton onClick={() => setPaymentDetails(null)} className="tk-dialog__close" aria-label="Close"><X size={18} /></IconButton>
            <span className="tk-head__eyebrow tk-head__eyebrow--dark">Payment</span>
            <h2>Payment details</h2>
            {paymentEntries.length ? (
              <dl>
                {paymentEntries.map(([k, v]) => (
                  <div key={k}><dt>{humanize(k)}</dt><dd>{String(v)}</dd></div>
                ))}
              </dl>
            ) : (
              <p className="tk-muted">No details returned for this payment.</p>
            )}
          </div>
        </Dialog>
      </div>
    </Layout>
  );
}
