import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  dataAos = 'fade-up',
}) => (
  <Box
    sx={{ textAlign: align, maxWidth: 680, mx: align === 'center' ? 'auto' : 0, mb: { xs: 5, md: 7 } }}
    data-aos={dataAos}
  >
    {eyebrow && (
      <Chip
        label={eyebrow}
        size="small"
        sx={{
          mb: 2,
          bgcolor: dark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(37, 99, 235, 0.08)',
          color: dark ? '#93C5FD' : 'primary.main',
        }}
      />
    )}
    <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, color: dark ? '#F8FAFC' : 'text.primary' }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography
        variant="body1"
        sx={{ mt: 2, color: dark ? 'rgba(248, 250, 252, 0.7)' : 'text.secondary', fontSize: '1.05rem' }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

export default SectionHeading;
