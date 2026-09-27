import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';

const CtaBanner = ({
  title = 'Ready to ride smarter?',
  subtitle = 'Book your first QR ticket in under a minute — no paper, no queues.',
  primary = { label: 'Book a Ticket', to: '/bookTickets' },
  secondary = { label: 'Contact Us', to: '/contact' },
}) => (
  <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
    <Container maxWidth="lg">
      <Box className="cta-banner" data-aos="fade-up">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Box sx={{ maxWidth: 560 }}>
            <Typography variant="h3" sx={{ color: '#fff', fontSize: { xs: '1.7rem', md: '2.2rem' }, mb: 1.5 }}>
              {title}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)' }}>{subtitle}</Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button
              component={Link}
              to={primary.to}
              size="large"
              endIcon={<ArrowRight size={18} />}
              sx={{ bgcolor: '#fff', color: 'primary.main', '&:hover': { bgcolor: '#EFF6FF' } }}
            >
              {primary.label}
            </Button>
            {secondary && (
              <Button
                component={Link}
                to={secondary.to}
                size="large"
                variant="outlined"
                sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' } }}
              >
                {secondary.label}
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Container>
  </Box>
);

export default CtaBanner;
