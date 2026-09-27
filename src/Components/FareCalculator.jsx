import React from 'react';
import { Calculator, ArrowDownUp } from 'lucide-react';
import { Box, Card, Container, Divider, Grid, Stack, Typography, TextField, MenuItem, Button } from '@mui/material';
import Layout from './Layout/Layout';

const FareCalculator = () => {
  return (
    <Layout>
      <Box className="hero-grid" sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F8FAFC' }}>
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center', mb: 5 }} data-aos="fade-up">
            <Box className="icon-tile" sx={{ mb: 2 }}><Calculator size={24} /></Box>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' }, mb: 1 }}>Get your fare</Typography>
            <Typography color="text.secondary">Know exactly what you'll pay before you ride.</Typography>
          </Box>

          <Card sx={{ p: { xs: 3, sm: 4 } }} data-aos="fade-up" data-aos-delay={100}>
            <Stack spacing={1} sx={{ position: 'relative' }}>
              <TextField select label="Select From" fullWidth defaultValue="">
                <MenuItem value="Mini">Mini</MenuItem>
                <MenuItem value="Sedan">Sedan</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
              </TextField>
              <Box sx={{ display: 'flex', justifyContent: 'center', my: -0.5, zIndex: 1 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#fff', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main' }}>
                  <ArrowDownUp size={16} />
                </Box>
              </Box>
              <TextField select label="Select To" fullWidth defaultValue="">
                <MenuItem value="Mini">Mini</MenuItem>
                <MenuItem value="Sedan">Sedan</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
              </TextField>
            </Stack>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 4, mb: 1.5 }}>Passengers</Typography>
            <Grid container spacing={2}>
              {['Adult', 'Child', 'Senior Citizen'].map((label) => (
                <Grid item xs={12} sm={4} key={label}>
                  <TextField
                    type="number"
                    label={label}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
              ))}
            </Grid>

            <Box className="fare-receipt" sx={{ mt: 4 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                <Typography color="text.secondary">Base Fare</Typography>
                <Typography fontWeight={700}>₹50</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Distance Fare</Typography>
                <Typography fontWeight={700}>₹100</Typography>
              </Stack>
              <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontWeight={700}>Total Fare</Typography>
                <Typography variant="h5" fontWeight={800} color="primary.main">₹150</Typography>
              </Stack>
            </Box>

            <Button variant="contained" size="large" fullWidth sx={{ mt: 3, py: 1.5 }}>
              Calculate Price
            </Button>
          </Card>
        </Container>
      </Box>
    </Layout>
  );
};

export default FareCalculator;
