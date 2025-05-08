// import React from 'react'
// import { Link } from 'react-router-dom';

// const Footer = () => {
//     return (
//         <>
//         {/* Footer */}
// <footer className="text-center text-lg-start bg-body-tertiary text-muted">
//   {/* Section: Social media */}
//   <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
//     {/* Left */}
//     <div className="me-5 d-none d-lg-block">
//       <span>Get connected with us on social networks:</span>
//     </div>
//     {/* Left */}
//     {/* Right */}
//     <div>
//     <a
//       data-mdb-ripple-init
//         class="btn text-white btn-floating m-1"
//         style={{backgroundColor:"#3b5998"}}
//         href="#!"
//         role="button"
//         ><i class="fab fa-facebook-f"></i></a>
//       <a
//       data-mdb-ripple-init
//         class="btn text-white btn-floating m-1"
//         style={{backgroundColor:"#dd4b39"}}
//         href="#!"
//         role="button"
//         ><i class="fab fa-google"></i></a>
//       <a
//       data-mdb-ripple-init
//         class="btn text-white btn-floating m-1"
//         style={{backgroundColor:"#ac2bac"}}
//         href="#!"
//         role="button"
//         ><i class="fab fa-instagram"></i></a>
//       <a
//       data-mdb-ripple-init
//         class="btn text-white btn-floating m-1"
//         style={{backgroundColor:"#0082ca"}}
//         href="#!"
//         role="button"
//         ><i class="fab fa-linkedin-in"></i></a>      
//     </div>
//     {/* Right */}
//   </section >
//   {/* Section: Social media */}
//   {/* Section: Links  */}
//   <section className >
//     <div className="container text-center text-md-start mt-5">
//       {/* Grid row */}
//       <div className="row mt-3">
//         {/* Grid column */}
//         <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
//           {/* Content */}
//           <h6 className="text-uppercase fw-bold mb-4">
//             <i className="fas fa-bus me-3" />ISTBRTS
//           </h6>
//           <p>
//             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus saepe, distinctio voluptatem facilis ea quam iste quas sequi 
//           </p>
//         </div>
//         {/* Grid column */}
//         {/* Grid column */}
//         <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
//           {/* Links */}
//           <h6 className="text-uppercase fw-bold mb-4">
//             navigations
//           </h6>
//           <p>
//             <Link to="/" className="text-reset">Home</Link>
//           </p>
//           <p>
//             <Link to="/about" className="text-reset">About Us</Link>
//           </p>
//           <p>
//             <Link to="/contact" className="text-reset">Contact us</Link>
//           </p>
//           <p>
//             <Link to="/support" className="text-reset">Support</Link>
//           </p>
//         </div>
//         {/* Grid column */}
//         {/* Grid column */}
//         <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4" >
//           {/* Links */}
//           <h6 className="text-uppercase fw-bold mb-4">
//             Information
//           </h6>
//           <p>
//             <a href="/termsAndConditions" className="text-reset">Terms and Conditions</a>
//           </p>
//           <p>
//             <a href="/privacyPolicy" className="text-reset">Privacy Policy</a>
//           </p>
//           <p>
//             <a href="/agreements" className="text-reset">Agreements</a>
//           </p>
//           <p>
//             <a href="/userPolicy" className="text-reset">User Policy</a>
//           </p>
//         </div>
//         {/* Grid column */}
//         {/* Grid column */}
//         <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
//           {/* Links */}
//           <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
//           <p><i className="fas fa-home me-3" />Hubli</p>
//           <p>
//             <i className="fas fa-envelope me-3" />
//             IstsBrts@gmail.com
//           </p>
//           <p><i className="fas fa-phone me-3" /> + 91 234 567 88</p>
//           <p><i className="fas fa-print me-3" /> + 91 234 567 89</p>
//         </div>
//         {/* Grid column */}
//       </div>
//       {/* Grid row */}
//     </div>
//   </section>
//   {/* Section: Links  */}
//   {/* Copyright */}
//   {/* Copyright */}
// </footer>
// {/* Footer */}


//         </>
//     )
// }

// export default Footer;

import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink, 
  IconButton, 
  Stack,
  useTheme
} from '@mui/material';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Bus
} from 'lucide-react';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        py: 6,
        boxShadow: '0 -4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Description */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Bus size={32} color={theme.palette.primary.contrastText} />
              <Typography variant="h5" color="inherit">
                ISTBRTS
              </Typography>
            </Stack>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
              Revolutionizing urban transportation with cutting-edge mobility solutions, connecting communities efficiently and sustainably.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {['Home', 'About', 'Contact', 'Support'].map((link) => (
                <MuiLink 
                  key={link} 
                  href={`/${link.toLowerCase()}`} 
                  color="inherit"
                  underline="hover"
                  sx={{ 
                    opacity: 0.7,
                    transition: 'opacity 0.3s',
                    '&:hover': { opacity: 1 }
                  }}
                >
                  {link}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Legal
            </Typography>
            <Stack spacing={1}>
              {['Terms', 'Privacy', 'Agreements', 'User Policy'].map((link) => (
                <MuiLink 
                  key={link} 
                  href={`/${link.toLowerCase().replace(' ', '-')}`} 
                  color="inherit"
                  underline="hover"
                  sx={{ 
                    opacity: 0.7,
                    transition: 'opacity 0.3s',
                    '&:hover': { opacity: 1 }
                  }}
                >
                  {link}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <MapPin size={20} color={theme.palette.primary.contrastText} />
                <Typography variant="body2" color="inherit">
                  Hubli, Karnataka, India
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Mail size={20} color={theme.palette.primary.contrastText} />
                <Typography variant="body2" color="inherit">
                  IstsBrts@gmail.com
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Phone size={20} color={theme.palette.primary.contrastText} />
                <Typography variant="body2" color="inherit">
                  +91 234 567 88
                </Typography>
              </Stack>
            </Stack>

            {/* Social Media Icons */}
            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                mt: 3,
                '& .MuiIconButton-root': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.4)'
                  }
                }
              }}
            >
              {[
                { Icon: Facebook, href: 'https://facebook.com' },
                { Icon: Instagram, href: 'https://instagram.com' },
                { Icon: Linkedin, href: 'https://linkedin.com' },
                { Icon: Twitter, href: 'https://twitter.com' }
              ].map(({ Icon, href }) => (
                <IconButton 
                  key={href}
                  href={href} 
                  aria-label={`${Icon.name} link`}
                  sx={{ color: 'inherit' }}
                >
                  <Icon size={20} />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box 
          sx={{ 
            mt: 4, 
            pt: 2, 
            borderTop: '1px solid rgba(255,255,255,0.2)',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="inherit" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} ISTBRTS. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;