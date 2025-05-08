import { Routes, Route } from 'react-router-dom';
import TicketHistory from '../Components/TicketHistory';
import ProtectedRoute from '../Components/Private/ProtectedRoute'; // Import ProtectedRoute

const MyTicket = () => {
  return (
          <Routes>
            <Route
              path="ticketHistory"
              element={
                <ProtectedRoute>
                  <TicketHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
  );
};

export default MyTicket;
