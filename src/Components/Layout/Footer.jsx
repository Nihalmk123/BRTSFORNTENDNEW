import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Stack, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Bus } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Book a Ticket', to: '/bookTickets' },
      { label: 'Fare Calculator', to: '/fareCalculator' },
      { label: 'Ticket History', to: '/ticketHistory' },
      { label: 'Recent Ticket', to: '/bookedTicket' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Support', to: '/support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', to: '/termsAndConditions' },
      { label: 'Privacy Policy', to: '/privacyPolicy' },
      { label: 'Agreements', to: '/agreements' },
      { label: 'User Policy', to: '/userPolicy' },
    ],
  },
];

const SOCIALS = [
  { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

const Footer = () => (
  <Box component="footer" className="site-footer">
    <div className="site-footer__route" aria-hidden="true">
      <span className="site-footer__bus"><Bus size={16} /></span>
    </div>

    <Container maxWidth="lg" sx={{ pt: { xs: 7, md: 9 }, pb: 4 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <span className="site-nav__brand-mark"><i className="fas fa-bus" /></span>
            <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 800, letterSpacing: '-0.02em' }}>
              SmartBus
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: 'rgba(248,250,252,0.6)', maxWidth: 320, mb: 3 }}>
            Paperless QR ticketing for modern bus rapid transit — book online, scan to board,
            and travel without the queue.
          </Typography>
          <Stack direction="row" spacing={1}>
            {SOCIALS.map(({ Icon, href, label }) => (
              <IconButton
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="site-footer__social"
              >
                <Icon size={18} />
              </IconButton>
            ))}
          </Stack>
        </Grid>

        {COLUMNS.map((col) => (
          <Grid item xs={6} sm={4} md={2} key={col.title}>
            <Typography variant="overline" sx={{ color: '#F8FAFC', fontWeight: 700, letterSpacing: '0.08em' }}>
              {col.title}
            </Typography>
            <Stack spacing={1.25} sx={{ mt: 1.5 }}>
              {col.links.map((l) => (
                <Link key={l.to} to={l.to} className="site-footer__link">
                  {l.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        ))}

        <Grid item xs={12} sm={12} md={2}>
          <Typography variant="overline" sx={{ color: '#F8FAFC', fontWeight: 700, letterSpacing: '0.08em' }}>
            Contact
          </Typography>
          <Stack spacing={1.5} sx={{ mt: 1.5 }}>
            {[
              { Icon: MapPin, text: 'Hubli, Karnataka' },
              { Icon: Mail, text: 'IstsBrts@gmail.com' },
              { Icon: Phone, text: '+91 234 567 88' },
            ].map(({ Icon, text }) => (
              <Stack key={text} direction="row" spacing={1} alignItems="center">
                <Icon size={15} color="#60A5FA" />
                <Typography variant="body2" sx={{ color: 'rgba(248,250,252,0.6)', wordBreak: 'break-word' }}>
                  {text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1}
        sx={{ mt: 7, pt: 3, borderTop: '1px solid rgba(248,250,252,0.08)' }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(248,250,252,0.45)' }}>
          © {new Date().getFullYear()} ISTBRTS. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(248,250,252,0.45)' }}>
          Scan. Board. Go.
        </Typography>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
