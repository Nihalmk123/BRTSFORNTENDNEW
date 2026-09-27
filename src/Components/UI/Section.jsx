import React from 'react';
import { Box, Container } from '@mui/material';

/**
 * Consistent vertical rhythm + optional alt background for landing sections.
 * tone: 'light' (white) | 'muted' (soft slate) | 'dark' (navy contrast band)
 */
const TONE_BG = {
  light: '#FFFFFF',
  muted: '#F8FAFC',
  dark: '#0F172A',
};

const Section = ({ tone = 'light', maxWidth = 'lg', id, className, children, sx }) => (
  <Box
    component="section"
    id={id}
    className={className}
    sx={{
      backgroundColor: TONE_BG[tone] || TONE_BG.light,
      color: tone === 'dark' ? '#F8FAFC' : 'inherit',
      py: { xs: 7, md: 11 },
      ...sx,
    }}
  >
    <Container maxWidth={maxWidth}>{children}</Container>
  </Box>
);

export default Section;
