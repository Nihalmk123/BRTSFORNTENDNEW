import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Layout from './Layout/Layout'
import HeroStage from './Home/HeroStage'
import HeroBackdrop from './Home/HeroBackdrop'
import BenefitsBento from './Home/BenefitsBento'
import HowItWorks from './Home/HowItWorks'
import DeparturesBoard from './Home/DeparturesBoard'
import Platform from './Home/Platform'
import QuickBook from './Home/QuickBook'
import TryIt from './Home/TryIt'
import PageNav from './Home/PageNav'
import { useAuth } from './Context/Context'
import { Services, WhySmartBus, Principles, WhoWeAre, Faq, FinalCta } from './Home/HomeSections'
import '../../src/Styles/HomeStyle.css'

// The thing SmartBus removes, cycling in the headline.
const WORDS = ['queue', 'counter', 'paper', 'wait']

const RotatingWord = () => {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="hero-word" aria-hidden="true">
      <span key={i} className="hero-word__in">{WORDS[i]}.</span>
    </span>
  )
}

// Pointer position drives the grid spotlight (--mx/--my).
const onHeroMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

const Home = () => {
  const signedIn = Boolean(useAuth()?.auth?.accessToken)
  return (
  <Layout>
    <PageNav />
    <Helmet>
      <title>Home</title>
      <meta name='description' content='Book your bus ticket online and ride with a QR code.' />
    </Helmet>

    {/* Hero */}
    <Box component="section" className="hero-main" onPointerMove={onHeroMove}>
      <div className="hero-spot" aria-hidden="true" />
      <HeroBackdrop />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 7, md: 4 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="hero-main__copy">
              <div className="hero-main__eyebrow">
                <span className="hero-main__pulse" />
                QR ticketing for bus rapid transit
              </div>
              <Typography variant="h1" className="hero-main__title" aria-label="Skip the queue. Scan. Board. Go.">
                <span aria-hidden="true">Skip the </span><RotatingWord />
                <br />
                <span>Scan. Board. Go.</span>
              </Typography>
              <Typography className="hero-main__sub">
                SmartBus turns your bus ticket into a QR code on your phone. Book your route online,
                pay in seconds, and walk through the gate with a single scan — no paper, no counters, no waiting.
              </Typography>
              {signedIn ? <QuickBook /> : (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="hero-main__actions">
                  <Button
                    component={Link}
                    to="/bookTickets"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight size={18} />}
                    sx={{ py: 1.5, px: 3.5, boxShadow: '0 12px 30px -10px rgba(37,99,235,0.6)' }}
                  >
                    Book Your Ticket Now
                  </Button>
                  <Button
                    component="a"
                    href="#how-it-works"
                    variant="outlined"
                    size="large"
                    sx={{ py: 1.5, px: 3.5, bgcolor: '#fff', borderColor: '#CBD5E1', color: 'text.primary', '&:hover': { borderColor: 'primary.main', bgcolor: '#fff', color: 'primary.main' } }}
                  >
                    See how it works
                  </Button>
                </Stack>
              )}
              <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap className="hero-main__checks">
                {['Paperless tickets', 'Instant QR pass', 'Secure payments'].map((label) => (
                  <Stack key={label} direction="row" spacing={1} alignItems="center">
                    <CheckCircle2 size={16} color="#2563EB" />
                    <Typography variant="body2" color="text.secondary">{label}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <HeroStage />
          </Grid>
        </Grid>
      </Container>
    </Box>

    <BenefitsBento />

    <DeparturesBoard />

    <HowItWorks />
    <TryIt />
    <Services />
    <WhySmartBus />
    <Principles />
    <Platform />
    <WhoWeAre />
    <Faq />
    <FinalCta />
  </Layout>
  )
}

export default Home
