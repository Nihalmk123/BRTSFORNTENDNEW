import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { ArrowRight, Calculator } from 'lucide-react';
import Layout from './Layout/Layout';
import PageHero from './UI/PageHero';
import Section from './UI/Section';
import SectionHeading from './UI/SectionHeading';
import CtaBanner from './UI/CtaBanner';
import fair_calculate from '../../src/assets/fair_calculate.png';
import feedback from '../../src/assets/Feedback.png';
import Ticket_Management from '../../src/assets/Ticket_Management.png';
import product_show from '../../src/assets/poduct_show.jpeg';

const FEATURES = [
  {
    img: fair_calculate,
    title: 'Integrated Fare Calculation',
    desc: 'Transparent fares upfront — simpler for riders and more affordable to use every day.',
  },
  {
    img: feedback,
    title: 'Comprehensive Feedback',
    desc: 'Open communication channels that help the service improve from real rider insights.',
  },
  {
    img: Ticket_Management,
    title: 'Seamless Ticket Management',
    desc: 'Handle your travel plans yourself — no need to call customer support.',
  },
];

const Product = () => (
  <Layout>
    <Helmet>
      <title>Product</title>
      <meta name="description" content="Discover the SmartBus digital ticketing platform." />
    </Helmet>

    <PageHero
      eyebrow="The platform"
      title="Discover our ticketing solutions"
      subtitle="An innovative bus ticketing system built for seamless travel — tailored for riders and operators."
      actions={
        <>
          <Button component={Link} to="/bookTickets" variant="contained" size="large" endIcon={<ArrowRight size={18} />}>
            Book a Ticket
          </Button>
          <Button component={Link} to="/fareCalculator" variant="outlined" size="large" startIcon={<Calculator size={18} />}>
            Fare Calculator
          </Button>
        </>
      }
    >
      <Box
        data-aos="zoom-in"
        data-aos-delay={150}
        sx={{
          mt: { xs: 6, md: 8 },
          p: 1.5,
          borderRadius: 5,
          bgcolor: '#fff',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 40px 80px -30px rgba(15,23,42,0.35)',
        }}
      >
        <Box component="img" src={product_show} alt="Product preview" sx={{ width: '100%', display: 'block', borderRadius: 4 }} />
      </Box>
    </PageHero>

    <Section tone="muted">
      <SectionHeading
        eyebrow="Features"
        title="Built for everyday riders"
        subtitle="Everything you need to plan, pay, and ride — in one place."
      />
      <Grid container spacing={4}>
        {FEATURES.map((f, i) => (
          <Grid item xs={12} md={4} key={f.title} data-aos="fade-up" data-aos-delay={100 * (i + 1)}>
            <Card className="lift-card" sx={{ p: 4, height: '100%' }}>
              <Box className="icon-tile" sx={{ mb: 3 }}>
                <img src={f.img} alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />
              </Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>{f.title}</Typography>
              <Typography color="text.secondary">{f.desc}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>

    <CtaBanner />
  </Layout>
);

export default Product;
