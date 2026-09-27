import React from 'react';
import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material';

const PageHero = ({ eyebrow, title, subtitle, actions, image, imageAlt = '', children }) => (
  <Box
    component="section"
    className="hero-grid"
    sx={{
      pt: { xs: 7, md: 10 },
      pb: { xs: 7, md: 10 },
      background: 'radial-gradient(circle at 85% 0%, rgba(37,99,235,0.07), transparent 45%)',
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={image ? 6 : 12} data-aos="fade-up">
          <Box sx={{ textAlign: image ? { xs: 'center', md: 'left' } : 'center', maxWidth: image ? 'none' : 760, mx: image ? 0 : 'auto' }}>
            {eyebrow && (
              <Chip label={eyebrow} sx={{ mb: 3, bgcolor: 'rgba(37,99,235,0.08)', color: 'primary.main' }} />
            )}
            <Typography variant="h1" sx={{ fontSize: { xs: '2.1rem', md: '3rem' }, lineHeight: 1.15, mb: 2.5 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography color="text.secondary" sx={{ fontSize: '1.1rem', mb: actions ? 4 : 0 }}>
                {subtitle}
              </Typography>
            )}
            {actions && (
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={image ? { xs: 'center', md: 'flex-start' } : 'center'}
              >
                {actions}
              </Stack>
            )}
            {children}
          </Box>
        </Grid>
        {image && (
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }} data-aos="zoom-in" data-aos-delay={150}>
            <Box component="img" src={image} alt={imageAlt} className="float-soft" sx={{ width: '100%', maxWidth: 520 }} />
          </Grid>
        )}
      </Grid>
    </Container>
  </Box>
);

export default PageHero;
