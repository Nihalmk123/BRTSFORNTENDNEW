import 'mdb-ui-kit/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import Signup from './Components/Registration/Signup'
import Signin from './Components/Registration/Signin'
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import About from './Components/About';
import Contact from './Components/Contact';
import MyTicket from './Components/MyTicket';
import Support from './Components/Support';
import ProtectedRoute from './Components/Private/ProtectedRoute';
import GoogleCallback from './Components/GoogleCallback';
import AdminRoute from './Components/Private/AdminRoute';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Notfound from './Components/Notfound';
import BookedTickets from './Components/BookedTickets';
import ClearChache from '../src/Components/Admin/ClearChache';
import Product from './Components/Product';
import BookTickets from './Components/BookTickets';
import TicketHistory from './Components/TicketHistory';
import ScrollToTop from './Components/ScrollToTop';
import TermsAndConditions from './Components/Policy/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './Components/Policy/PrivacyPolicy/PrivacyPolicy';
import Agreemnets from './Components/Policy/Agreements/Agreemnets';
import UserPolicy from './Components/Policy/UserPolicy/UserPolicy';
import FareCalculator from './Components/FareCalculator';
import EmailVerification from './Components/EmailVerification/EmailVerification';
import EditProfile from './Components/EditProfile';
import ForgotPassword from './Components/Registration/ForgotPassword';
import PaymentInfo from './Components/PaymentInfo';

function App() {
  return (
    <>
      {/* <Preloader/>   */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/googleCallback" element={<GoogleCallback />} />
        <Route path="/bookedTicket" element={<BookedTickets />} />
        <Route path="/notfound" element={<Notfound />} />
        <Route path="/product" element={<Product />} />
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/agreements" element={<Agreemnets />} />
        <Route path="/userPolicy" element={<UserPolicy />} />
        <Route path="/fareCalculator" element={<FareCalculator />} />
        {/* <Route path="/EmailVerification" element={<EmailVerification/>} /> */}
        <Route path="/EmailVerification/:id/:token" element={<EmailVerification />} />
        <Route path="/admin/clearcache" element={<ClearChache />} />

        {/* Protected route */}
        <Route
          path="/myticket/*"
          element={<ProtectedRoute><MyTicket /></ProtectedRoute>}
        />
        <Route
          path="/bookTickets"
          element={<ProtectedRoute><BookTickets /></ProtectedRoute>}
        />
        <Route
          path="/ticketHistory"
          element={<ProtectedRoute><TicketHistory /></ProtectedRoute>}
        />
        <Route
          path="/editProfile"
          element={<ProtectedRoute><EditProfile /></ProtectedRoute>}
        />
        <Route
          path="/paymentInfo"
          element={<ProtectedRoute><PaymentInfo /></ProtectedRoute>}
        />

        {/* Protected route Admin*/}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
      {/* <Whatsapp/> */}
    </>
  )
}

export default App


