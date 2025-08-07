import React from 'react';
import Layout from './Layout/Layout';
import { Button } from '@mui/material';
import ourVision from '../../src/assets/our-vision.jpg';
import contact from '../../src/assets/contact_img.png';
import { Helmet } from 'react-helmet-async';
import img from '../assets/hero-img.png'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper
} from '@mui/material';
import {
  Rocket,
  Handshake,
  TrendingUp,
  People,
  CheckCircle,
  Business
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const IconWrapper = styled(Box)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor,
  borderRadius: '50%',
  padding: theme.spacing(2),
  display: 'inline-flex',
  marginBottom: theme.spacing(2),
}));

const About = () => {

  const features = [
    {
      icon: <Rocket sx={{ fontSize: 40 }} />,
      title: "Innovation",
      description: "Pushing boundaries and exploring new possibilities to create cutting-edge solutions.",
      bgColor: 'rgb(239, 246, 255)',
      iconColor: 'primary.main'
    },
    {
      icon: <Handshake sx={{ fontSize: 40 }} />,
      title: "Collaboration",
      description: "Working together with our clients to achieve remarkable results.",
      bgColor: 'rgb(240, 253, 244)',
      iconColor: 'success.main'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: "Growth",
      description: "Fostering continuous improvement and sustainable development.",
      bgColor: 'rgb(243, 232, 255)',
      iconColor: 'secondary.main'
    }
  ];

  const stats = [
    {
      icon: <Business />,
      value: "500+",
      label: "Projects Completed",
      color: 'primary.main'
    },
    {
      icon: <CheckCircle />,
      value: "98%",
      label: "Client Satisfaction",
      color: 'success.main'
    },
    {
      icon: <People />,
      value: "50+",
      label: "Team Members",
      color: 'secondary.main'
    }
  ];

  const FeatureCard = ({ icon, title, description, bgColor, iconColor }) => (
    <StyledCard elevation={3}>
      <CardContent sx={{ textAlign: 'center', p: 4 }}>
        <IconWrapper bgcolor={bgColor}>
          <Box sx={{ color: iconColor }}>
            {icon}
          </Box>
        </IconWrapper>
        <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );

  const StatItem = ({ icon, value, label, color }) => (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ color: color, mb: 1 }}>
        {icon}
      </Box>
      <Typography variant="h3" component="h4" fontWeight="bold" sx={{ color: color, mb: 1 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );

  return (
    <Layout>
      <Helmet>
        <title>About us</title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <section id="hero" className="hero section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>About us</h1>
              <p>At SIN, our vision is to redefine the future of ticketing and travel by building seamless, smart, and sustainable digital solutions. We aim to eliminate the friction of traditional systems by creating technology that is accessible, eco-friendly, and user-first.</p>
              <div className="d-flex">
                <a href="#about" className="btn-get-started" style={{backgroundColor:"#113F67", color:"white"}}>Coming soon</a>
                {/* <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox btn-watch-video d-flex align-items-center" /> */}
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img">
              <img src={img} className="img-fluid animated" alt />
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
<section id="clients" className="clients section light-background">
  
</section>{/* /Clients Section */}



      {/* Our Vision */}
      <section className="bsb-about-6 py-md-5 py-xl-8" style={{ overflowX: 'hidden' }}>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xl-5">
              <h5 className="main_headings display-5 fw-bold line-height text-center display-6 highlighted-secondary">Our vision</h5>
              <p className="text-secondary mb-5 text-center fs-6">
                At SIN, our vision is to redefine the future of ticketing and travel by building seamless, smart, and sustainable digital solutions. We aim to eliminate the friction of traditional systems by creating technology that is accessible, eco-friendly, and user-first.
                We envision a world where every journey is effortless, where standing in long queues becomes a thing of the past, 
              </p>
              <hr className="w-50 mx-auto mb-5 mb-xl-7 border-dark-subtle" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row gy-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 col-lg-6">
              <img className="img-fluid rounded border border-dark" loading="lazy" src={ourVision} alt="About 6" />
            </div>
            <div className="col-12 col-lg-6">
              <div className="row justify-content-xl-end">
                <div className="col-12 col-xl-11">
                  <div className="accordion accordion-flush" id="accordionAbout6">
                    <div className="accordion-item mb-4 border border-dark">
                      <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button bg-transparent fs-4 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          Environmental Protection
                        </button>
                      </h2>
                      <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionAbout6">
                        <div className="accordion-body">
                          We focus on using technology to safeguard nature and ecosystems, ensuring that our actions benefit the environment.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-4 border border-dark">
                      <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed bg-transparent fs-4 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Innovative Solutions
                        </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionAbout6">
                        <div className="accordion-body">
                          By implementing advanced solutions, we aim to improve existing systems and reduce their ecological impact, promoting a more sustainable way of operating.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-4 border border-dark">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed bg-transparent fs-4 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          Empowerment for Sustainability
                        </button>
                      </h2>
                      <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionAbout6">
                        <div className="accordion-body">
                          We provide tools and resources that empower individuals and organizations to take responsibility for the planet, fostering a future where economic growth and environmental health go hand in hand.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Problem We Are Solving */}
      <section className="py-5 mt-4" style={{ background: "#254D70", overflowX: 'hidden' }}>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-5">
              <h2 className="display-6 fw-bold " style={{ color: 'white' }}>
                Solving the Problem of Paper-Based Tickets and Long Wait Times
              </h2>
              <div className="d-flex align-items-center">
                <p className="mb-2" style={{ color: 'white' }}>Learn more</p>
                <i className="fas fa-arrow-right ms-2" style={{ color: 'white' }}></i>
              </div>
            </div>
            <div className="col-md-6 offset-md-1">
              <p style={{ color: 'white' }}>
                In today's fast-paced world, paper-based ticketing systems create significant inefficiencies, leading to long wait times and customer dissatisfaction. These traditional methods not only hinder seamless transactions but also contribute to environmental waste and operational challenges for service providers.
              </p>
              <p style={{ color: 'white' }}>
                By transitioning to digital ticketing solutions, including mobile apps and QR code integration, we can enhance user experience, reduce queue times, and promote sustainability. Embracing technology will streamline operations, increase customer satisfaction, and ultimately transform the way tickets are issued and processed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* our mission */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>

            <h5 className="main_headings display-5 fw-bold line-height text-center display-6 highlighted-secondary">Our Mission</h5>

            <Box
              sx={{
                width: 60,
                height: 4,
                bgcolor: 'primary.main',
                mx: 'auto',
                mb: 3,
                borderRadius: 2
              }}
            />
            <p className="text-secondary mb-5 text-center fs-6">
              At SIN, our mission is to simplify and modernize travel through smart, paperless ticketing solutions. We aim to make transportation more efficient, eco-friendly, and user-focused by reducing paper waste and streamlining entry with secure, digital systems.
            </p>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>

          {/* Stats Section */}
          {/* <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StatItem {...stat} />
              </Grid>
            ))}
          </Grid> */}
        </Container>
      </Box>
      {/* our mission */}

      {/* Meet the Team */}
      {/* <section className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-2 mb-lg-4">
            <div className="col-12 col-lg-8 col-xxl-7 text-center mx-auto">
              <span className="text-muted">Our Team</span>
              <h5 className="main_headings display-5 fw-bold line-height text-center display-6 highlighted-secondary">Meet the team</h5>
              <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta harum ipsum venenatis metus sem veniam eveniet aperiam suscipit.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center mb-3">
                <div className="card-body p-0 pb-4">
                  <div className="mb-4">
                    <img className="img-fluid" src={our_team} alt="Team Member" style={{ width: "35%" }} />
                  </div>
                  <h5 className="fw-bold">Pavan V</h5>
                  <div className="text-muted">Programmer</div>
                  <div className="d-flex justify-content-center mt-4">
                    <a className="btn  btn-icon" href="#!"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn  btn-icon" href="#!"><i className="fab fa-twitter"></i></a>
                    <a className="btn  btn-icon" href="#!"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-3">
                <div className="card-body p-0 pb-4">
                  <div className="mb-4">
                    <img className="img-fluid" src={our_team} alt="Team Member" style={{ width: "35%" }} />
                  </div>
                  <h5 className="fw-bold">Shafi N</h5>
                  <div className="text-muted">Programmer</div>
                  <div className="d-flex justify-content-center mt-4">
                    <a className="btn  btn-icon" href="#!"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn  btn-icon" href="#!"><i className="fab fa-twitter"></i></a>
                    <a className="btn  btn-icon" href="#!"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-3">
                <div className="card-body p-0 pb-4">
                  <div className="mb-4">
                    <img className="img-fluid" src={our_team} alt="Team Member" style={{ width: "35%" }} />
                  </div>
                  <h5 className="fw-bold">Mohammadnihal M</h5>
                  <div className="text-muted">Programmer</div>
                  <div className="d-flex justify-content-center mt-4">
                    <a className="btn btn-icon" href="#!"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn  btn-icon" href="#!"><i className="fab fa-twitter"></i></a>
                    <a className="btn  btn-icon" href="#!"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* call to action */}
      <section className="my-md-8 rounded-2 position-relative px-5 py-2 mb-5"
        style={{ background: "#0E417E", boxShadow: "0px 0px 27px 8px rgba(0, 0, 0, 0.2)", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="container">
          <div className="row text-white py-4 contact-row">
            <div className="col-lg-6 col-md-6">
              <h2 className="display-6 fw-bold">Conect with us</h2>
              <p>Join us in revolutionizing the ticketing experience. Explore our digital solutions today and say goodbye to paper tickets and long queues!</p>
              <Link to="/contact">  <Button className='btn-width btn fw-bold text-white px-3 py-2' style={{ background: "#FFC55A" }}>Contact Us</Button></Link>
            </div>
            <div className="col-lg-6 col-md-6">
              <img src={contact} alt="contact_us" className="float-image" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
