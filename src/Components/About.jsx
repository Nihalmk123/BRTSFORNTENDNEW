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
import { ArrowRight, Clock, FileX, Leaf, QrCode, Rocket, Handshake, TrendingUp, Zap } from 'lucide-react';
import Layout from './Layout/Layout';
import Section from './UI/Section';
import SectionHeading from './UI/SectionHeading';
import PageHero from './UI/PageHero';
import CtaBanner from './UI/CtaBanner';
import ourVision from '../../src/assets/our-vision.jpg';
import heroImg from '../assets/hero-img.png';

const VALUES = [
  {
    title: 'Environmental Protection',
    body: 'We focus on using technology to safeguard nature and ecosystems, ensuring that our actions benefit the environment.',
  },
  {
    title: 'Innovative Solutions',
    body: 'By implementing advanced solutions, we aim to improve existing systems and reduce their ecological impact, promoting a more sustainable way of operating.',
  },
  {
    title: 'Empowerment for Sustainability',
    body: 'We provide tools and resources that empower individuals and organizations to take responsibility for the planet, fostering a future where economic growth and environmental health go hand in hand.',
  },
];

const MISSION = [
  { icon: <Rocket size={24} />, title: 'Innovation', desc: 'Pushing boundaries and exploring new possibilities to create cutting-edge solutions.' },
  { icon: <Handshake size={24} />, title: 'Collaboration', desc: 'Working together with our clients to achieve remarkable results.' },
  { icon: <TrendingUp size={24} />, title: 'Growth', desc: 'Fostering continuous improvement and sustainable development.' },
];

const BEFORE = [
  { icon: <FileX size={18} />, text: 'Paper tickets that get lost and wasted' },
  { icon: <Clock size={18} />, text: 'Long queues at every counter' },
  { icon: <Leaf size={18} />, text: 'Avoidable environmental waste' },
];

const AFTER = [
  { icon: <QrCode size={18} />, text: 'One QR ticket on your phone' },
  { icon: <Zap size={18} />, text: 'Scan and board in seconds' },
  { icon: <Leaf size={18} />, text: 'Fully paperless operations' },
];

const About = () => (
  <Layout>
    <Helmet>
      <title>About us</title>
      <meta name="description" content="Learn about SIN and our mission to modernize bus ticketing." />
    </Helmet>

    <PageHero
      eyebrow="About SIN"
      title="Redefining how cities ride"
      subtitle="We build seamless, smart, and sustainable digital ticketing — removing the friction of traditional systems with technology that is accessible, eco-friendly, and user-first."
      image={heroImg}
      imageAlt="Smart ticketing illustration"
      actions={
        <>
          <Button component={Link} to="/bookTickets" variant="contained" size="large" endIcon={<ArrowRight size={18} />}>
            Book a Ticket
          </Button>
          <Button component="a" href="#vision" variant="outlined" size="large">
            Our vision
          </Button>
        </>
      }
    />

    {/* Vision */}
    <Section id="vision" tone="muted">
      <SectionHeading
        eyebrow="Our vision"
        title="Every journey, effortless"
        subtitle="We envision a world where standing in long queues becomes a thing of the past — and every trip starts with a single scan."
      />
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6} data-aos="fade-right">
          <Box
            component="img"
            src={ourVision}
            alt="Our vision"
            loading="lazy"
            sx={{ width: '100%', borderRadius: 4, boxShadow: '0 30px 60px -25px rgba(15,23,42,0.35)' }}
          />
        </Grid>
        <Grid item xs={12} md={6} data-aos="fade-left">
          <Stack spacing={2}>
            {VALUES.map((v, i) => (
              <Accordion
                key={v.title}
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
                  <Typography fontWeight={700}>{v.title}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                  <Typography color="text.secondary">{v.body}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Section>

    {/* Problem → solution */}
    <Section tone="dark">
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={5} data-aos="fade-right">
          <Typography variant="overline" sx={{ color: '#93C5FD', fontWeight: 700, letterSpacing: '0.1em' }}>
            The problem we solve
          </Typography>
          <Typography variant="h3" sx={{ color: '#F8FAFC', fontSize: { xs: '1.8rem', md: '2.3rem' }, mt: 1, mb: 3 }}>
            Paper tickets and long waits don't belong in modern transit.
          </Typography>
          <Typography sx={{ color: 'rgba(248,250,252,0.7)', mb: 2 }}>
            Paper-based ticketing creates inefficiencies, long wait times, and environmental waste — for passengers and
            operators alike.
          </Typography>
          <Typography sx={{ color: 'rgba(248,250,252,0.7)' }}>
            Digital ticketing with QR code integration shortens queues, streamlines operations, and transforms how tickets
            are issued and validated.
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            {[
              { label: 'Before', items: BEFORE, accent: '#F87171' },
              { label: 'With SmartBus', items: AFTER, accent: '#60A5FA' },
            ].map((col, i) => (
              <Grid item xs={12} sm={6} key={col.label} data-aos="fade-up" data-aos-delay={100 * (i + 1)}>
                <Box
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 4,
                    bgcolor: 'rgba(248,250,252,0.05)',
                    border: '1px solid',
                    borderColor: i === 1 ? 'rgba(96,165,250,0.4)' : 'rgba(248,250,252,0.12)',
                  }}
                >
                  <Typography sx={{ color: col.accent, fontWeight: 700, mb: 2 }}>{col.label}</Typography>
                  <Stack spacing={2}>
                    {col.items.map((it) => (
                      <Stack key={it.text} direction="row" spacing={1.5} alignItems="center">
                        <Box sx={{ color: col.accent, display: 'flex' }}>{it.icon}</Box>
                        <Typography sx={{ color: 'rgba(248,250,252,0.85)' }} variant="body2">
                          {it.text}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Section>

    {/* Mission */}
    <Section tone="light">
      <SectionHeading
        eyebrow="Our mission"
        title="Simplify and modernize travel"
        subtitle="Smart, paperless ticketing that makes transportation more efficient, eco-friendly, and user-focused."
      />
      <Grid container spacing={4}>
        {MISSION.map((m, i) => (
          <Grid item xs={12} md={4} key={m.title} data-aos="fade-up" data-aos-delay={100 * (i + 1)}>
            <Card className="lift-card" sx={{ p: 4, height: '100%' }}>
              <Box className="icon-tile" sx={{ mb: 3 }}>{m.icon}</Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>{m.title}</Typography>
              <Typography color="text.secondary">{m.desc}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>

    <CtaBanner
      title="Connect with us"
      subtitle="Join us in revolutionizing the ticketing experience — say goodbye to paper tickets and long queues."
      primary={{ label: 'Contact Us', to: '/contact' }}
      secondary={{ label: 'Book a Ticket', to: '/bookTickets' }}
    />
  </Layout>
);

export default About;
