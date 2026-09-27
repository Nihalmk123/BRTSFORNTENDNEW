import React, { useRef, useState } from 'react';
import Layout from './Layout/Layout';
import ReCAPTCHA from 'react-google-recaptcha';
import api from './Api/Axios';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';
import heroBanner from '../assets/hero-services-img.webp'
import { Box, Button, Card, Grid, Stack, TextField, Typography, IconButton } from '@mui/material';
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Globe } from 'lucide-react';
import PageHero from './UI/PageHero';
import Section from './UI/Section';

const CONTACT_ITEMS = [
  { icon: <MapPin size={20} />, label: 'Address', value: 'Hubli, Karnataka' },
  { icon: <Phone size={20} />, label: 'Phone', value: '+1 123-456-7890' },
  { icon: <Mail size={20} />, label: 'Email', value: 'IstsBrts@support.com' },
];

const Contact = () => {
  const recaptchaRef = useRef();
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const maxLength = 500;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= maxLength) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert('Please verify that you are a human!');
      return;
    }

    const dataToSend = {
      ...formData,
      token: captchaValue,
    };

    try {
      const response = await api.post('/tsn/v1/contact-us', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response)

      if (response.data.message === 'Successfully save contact information.') {
        toast.success('Your message has been sent successfully!', {
          duration: 3000
        });
      } else {
        toast.error('There was an issue with your submission.', {
          duration: 3000
        });
      }

      // Reset form and reCAPTCHA
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
      setCaptchaValue(null);
      recaptchaRef.current.reset();
      setCaptchaVerified(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('There was an error sending your message. Please try again later.', {
        duration: 3000
      });
    }
  };

  const maxWordCount = 100;

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaVerified(!!value);
  };

  const countWords = (str) => {
    return str.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const wordCount = countWords(formData.message);
  const wordsLeft = maxWordCount - wordCount;

  return (
    <Layout>
      <Helmet>
        <title>Contact us</title>
        <meta name='description' content='Get in touch with the SmartBus ticketing team.' />
      </Helmet>

      <PageHero
        eyebrow="Contact"
        title="Let's talk about your next journey"
        subtitle="Have questions or need assistance? Reach out — we're here to help."
        image={heroBanner}
        imageAlt="Contact illustration"
        actions={
          <Button component="a" href="#contact-form" variant="contained" size="large" endIcon={<Send size={18} />}>
            Let's Connect
          </Button>
        }
      />

      <Section id="contact-form" tone="muted">
        <Grid container spacing={4}>
          {/* Info column */}
          <Grid item xs={12} md={5} data-aos="fade-right">
            <Stack spacing={2.5} sx={{ height: '100%' }}>
              {CONTACT_ITEMS.map((c) => (
                <Card key={c.label} className="lift-card" sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box className="icon-tile">{c.icon}</Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">{c.label}</Typography>
                      <Typography fontWeight={700}>{c.value}</Typography>
                    </Box>
                  </Stack>
                </Card>
              ))}
              <Card sx={{ p: 3 }}>
                <Typography fontWeight={700} sx={{ mb: 2 }}>Follow us</Typography>
                <Stack direction="row" spacing={1}>
                  {[
                    { Icon: Facebook, label: 'Facebook' },
                    { Icon: Globe, label: 'Google' },
                    { Icon: Twitter, label: 'Twitter' },
                  ].map(({ Icon, label }) => (
                    <IconButton
                      key={label}
                      href="#!"
                      aria-label={label}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2.5,
                        color: 'text.secondary',
                        transition: 'all .25s ease',
                        '&:hover': { bgcolor: 'primary.main', color: '#fff', borderColor: 'primary.main', transform: 'translateY(-3px)' },
                      }}
                    >
                      <Icon size={18} />
                    </IconButton>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Grid>

          {/* Form column */}
          <Grid item xs={12} md={7} data-aos="fade-left">
            <Card sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h5" fontWeight={700} gutterBottom>Send us a message</Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                We usually reply within one business day.
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Last name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth type="email" label="Email address" name="email" value={formData.email} onChange={handleInputChange} required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth type="tel" label="Phone number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="Your message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      helperText={`${wordCount} words used · ${wordsLeft} words left`}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                    <Box sx={{ transform: { xs: 'scale(0.9)', sm: 'none' }, transformOrigin: 'left center' }}>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LfaPVMqAAAAAEiOoyL5MvKt0FpvHYHF9ZzeO8f5"
                        onChange={onCaptchaChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={!captchaVerified}
                      endIcon={<Send size={18} />}
                      sx={{ py: 1.5 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Section>

      <Section tone="light" sx={{ pt: 0 }}>
        <Card sx={{ overflow: 'hidden', p: 0 }} data-aos="fade-up">
          <Box
            component="iframe"
            title="Google Map"
            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=KLE%20BVB%20CTIE%20HUBBALLI+(My%20Business%20Name)&t=p&z=14&ie=UTF8&iwloc=B&output=embed"
            sx={{ display: 'block', width: '100%', height: { xs: 320, md: 440 }, border: 0 }}
            loading="lazy"
          />
        </Card>
      </Section>
    </Layout>
  );
};

export default Contact;
