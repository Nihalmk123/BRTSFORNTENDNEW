import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { History } from 'lucide-react';
import Layout from '../../src/Components/Layout/Layout';
import { useAxiosWithInterceptor } from './Api/Axios';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './Context/Context';
import { EmptyState, LoadingState, QrDialog, TicketPass, TicketsHeader } from './Tickets/TicketParts';

const BookedTickets = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const api = useAxiosWithInterceptor();
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth = {} } = useAuth() || {};
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await api.get(`/tsn/v1/ticket/recent?timeZone=${timeZone}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.accessToken
          }
        });

        if (response.data && Array.isArray(response.data.results)) {
          setRecentTickets(response.data.results);
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, [timeZone, api]);

  const activeCount = recentTickets.filter((t) => t.active).length;

  return (
    <Layout>
      <Helmet>
        <title>Recent Tickets</title>
        <meta name="description" content="View your recently booked tickets." />
      </Helmet>
      <div className="tk-page">
        <TicketsHeader
          eyebrow="My tickets"
          title="Recent tickets"
          sub="Your latest bookings. Open a ticket's QR code and scan it at the gate."
        />

        <Container maxWidth="lg" className="tk-body">
          {loading ? (
            <div className="tk-panel"><LoadingState /></div>
          ) : recentTickets.length === 0 ? (
            <div className="tk-panel">
              <EmptyState title="No recent tickets" text="Tickets you book will show up here, ready to scan." />
            </div>
          ) : (
            <>
              <div className="tk-toolbar">
                <p><strong>{recentTickets.length}</strong> recent · <strong>{activeCount}</strong> active</p>
                <Link to="/ticketHistory" className="tk-link"><History size={16} /> Full ticket history</Link>
              </div>
              <div className="tk-grid">
                {recentTickets.map((ticket) => (
                  <TicketPass key={ticket.id} ticket={ticket} onOpen={setSelectedTicket} />
                ))}
              </div>
            </>
          )}
        </Container>

        <QrDialog ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      </div>
    </Layout>
  );
};

export default BookedTickets;
