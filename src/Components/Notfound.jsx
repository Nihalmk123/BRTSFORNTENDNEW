import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { ArrowLeft, Ticket } from 'lucide-react';

const Notfound = () => (
  <Box
    className="hero-grid page-transition"
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      px: 3,
      background: 'radial-gradient(circle at 50% 0%, rgba(37,99,235,0.08), transparent 55%)',
    }}
  >
    <Box sx={{ maxWidth: 560 }}>
      <Link to="/" className="site-nav__brand" style={{ justifyContent: 'center', marginBottom: 40 }}>
        <span className="site-nav__brand-mark"><i className="fas fa-bus" /></span>
        <span className="site-nav__brand-text">SmartBus</span>
      </Link>

      <Box className="nf-ticket">
        <Typography className="nf-code">404</Typography>
        <div className="nf-route" aria-hidden="true">
          <span className="nf-bus"><i className="fas fa-bus" /></span>
        </div>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.12em', fontWeight: 700 }}>
          ROUTE NOT FOUND
        </Typography>
      </Box>

      <Typography variant="h4" fontWeight={800} sx={{ mt: 5, mb: 1.5, fontSize: { xs: '1.6rem', md: '2rem' } }}>
        Looks like this stop doesn't exist
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        The page you're looking for has moved or never existed. Let's get you back on route.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button component={Link} to="/" variant="contained" size="large" startIcon={<ArrowLeft size={18} />}>
          Back to Home
        </Button>
        <Button component={Link} to="/bookTickets" variant="outlined" size="large" startIcon={<Ticket size={18} />}>
          Book a Ticket
        </Button>
      </Stack>
    </Box>
  </Box>
);

export default Notfound;
