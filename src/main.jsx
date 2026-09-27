import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../public/mdb.es.min.js';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Components/Context/Context.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google"
import UserProfileProvider from './Components/Context/UserProfileContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>

  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='121068022692-qpj5a3q89qqodhc4ggpk9u3hdefdhnck.apps.googleusercontent.com'>
      <UserProfileProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
        </UserProfileProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </ThemeProvider>
  // </React.StrictMode>
);
