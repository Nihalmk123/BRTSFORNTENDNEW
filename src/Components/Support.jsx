import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { CreditCard, LifeBuoy, Ticket, UserPlus, Inbox } from 'lucide-react';
import Layout from './Layout/Layout';
import PageHero from './UI/PageHero';
import Section from './UI/Section';

const TOPICS = [
  {
    icon: <UserPlus size={20} />,
    title: 'Problem related to sign up?',
    body: 'Trouble creating or verifying your account? Tell us what happened and our team will help you get set up.',
  },
  {
    icon: <Ticket size={20} />,
    title: 'Issue purchasing a ticket?',
    body: 'If a booking failed or your QR ticket didn’t appear, share the details and we’ll look into it right away.',
  },
  {
    icon: <CreditCard size={20} />,
    title: 'Problem with payment?',
    body: 'For failed or duplicate payments, raise a ticket with the transaction details so we can resolve it quickly.',
  },
];

const Support = () => (
  <Layout>
    <Helmet>
      <title>Support</title>
      <meta name="description" content="Get help with SmartBus ticketing." />
    </Helmet>

    <PageHero
      eyebrow="Help center"
      title="How can we help?"
      subtitle="Find answers to common issues or raise a ticket with our support team."
    />

    <Section tone="muted" sx={{ pt: { xs: 5, md: 7 } }}>
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={8} data-aos="fade-right">
          <Stack spacing={2}>
            {TOPICS.map((t, i) => (
              <Accordion
                key={t.title}
                defaultExpanded={i === 0}
                disableGutters
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '14px !important',
                  '&::before': { display: 'none' },
                  transition: 'border-color .3s ease, box-shadow .3s ease',
                  '&.Mui-expanded': { borderColor: 'rgba(37,99,235,0.35)', boxShadow: '0 12px 30px -12px rgba(37,99,235,0.2)' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 3, py: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box className="icon-tile" sx={{ width: 40, height: 40, borderRadius: '12px' }}>{t.icon}</Box>
                    <Typography fontWeight={700}>{t.title}</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>{t.body}</Typography>
                  <Button component={Link} to="/contact" size="small" variant="outlined">
                    Raise Ticket
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4} data-aos="fade-left">
          <Stack spacing={3}>
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Box className="icon-tile" sx={{ mb: 2, mx: 'auto' }}><Inbox size={22} /></Box>
              <Typography fontWeight={700} gutterBottom>Your support tickets</Typography>
              <Typography variant="body2" color="text.secondary">
                Tickets you raise will show up here.
              </Typography>
            </Card>
            <Card sx={{ p: 4, background: 'linear-gradient(135deg, #0F172A, #1E3A8A)', border: 'none' }}>
              <Box sx={{ color: '#93C5FD', mb: 2 }}><LifeBuoy size={26} /></Box>
              <Typography fontWeight={700} sx={{ color: '#fff' }} gutterBottom>Still need help?</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                Our team is happy to assist with anything not covered here.
              </Typography>
              <Button component={Link} to="/contact" variant="contained" fullWidth sx={{ bgcolor: '#fff', color: 'primary.main', '&:hover': { bgcolor: '#EFF6FF' } }}>
                Contact Support
              </Button>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Section>
  </Layout>
);

export default Support;
