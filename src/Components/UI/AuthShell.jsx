import React from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { CheckCircle2, QrCode, Bus } from 'lucide-react';

const PERKS = ['Book tickets in seconds', 'One QR code to board', 'Track every trip and payment'];

const AuthShell = ({ title, subtitle, children, footer }) => (
  <Box sx={{ bgcolor: '#F8FAFC', py: { xs: 5, md: 8 } }}>
    <Container maxWidth="lg">
      <Grid
        container
        data-aos="fade-up"
        sx={{
          bgcolor: '#fff',
          borderRadius: 5,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 40px 80px -40px rgba(15,23,42,0.35)',
        }}
      >
        <Grid
          item
          md={5}
          className="auth-panel"
          sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'space-between', p: 6 }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
            <span className="site-nav__brand-mark"><i className="fas fa-bus" /></span>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.15rem' }}>SmartBus</Typography>
          </Stack>

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box className="auth-pass">
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Bus size={16} color="#93C5FD" />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                    e-Ticket
                  </Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: '#86EFAC', fontWeight: 700 }}>ACTIVE</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography sx={{ color: '#fff', fontWeight: 800 }}>HBL → DWD</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Scan at gate to board</Typography>
                </Box>
                <Box className="auth-pass__qr"><QrCode size={40} /></Box>
              </Stack>
            </Box>

            <Typography variant="h4" sx={{ color: '#fff', mt: 5, mb: 3, fontSize: '1.9rem', lineHeight: 1.25 }}>
              Your ticket, <br />always in your pocket.
            </Typography>
            <Stack spacing={1.5}>
              {PERKS.map((p) => (
                <Stack key={p} direction="row" spacing={1.5} alignItems="center">
                  <CheckCircle2 size={18} color="#60A5FA" />
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>{p}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', position: 'relative', zIndex: 1 }}>
            © {new Date().getFullYear()} ISTBRTS
          </Typography>
        </Grid>

        <Grid item xs={12} md={7} sx={{ p: { xs: 3, sm: 5, md: 7 } }}>
          <Box sx={{ maxWidth: 440, mx: 'auto' }}>
            <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: '1.7rem', md: '2rem' }, mb: 1 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                {subtitle}
              </Typography>
            )}
            {children}
            {footer && <Box sx={{ mt: 4, textAlign: 'center' }}>{footer}</Box>}
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default AuthShell;
