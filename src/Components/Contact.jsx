import React, { useRef, useState } from 'react';
import Layout from './Layout/Layout';
import ReCAPTCHA from 'react-google-recaptcha';
import api from './Api/Axios';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';
import contactBannerBg from '../assets/hero-bg-light.webp'
import heroBanner from '../assets/hero-services-img.webp'
import { Link } from 'react-router-dom';

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
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
        <section id="hero" className="hero ">
          <div className="hero-bg">
            <img src={contactBannerBg} alt />
          </div>
          <div className="container text-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1 data-aos="fade-up"><span>Contact Us</span></h1>
              <p data-aos="fade-up" data-aos-delay={100}>Have questions or need assistance?
Reach out to us — we’re here to help!<br /></p>
              <div className="d-flex" data-aos="fade-up" data-aos-delay={200}>
                <Link to="/contact" className="btn-get-started" style={{backgroundColor:"#113F67", color:"white"}}>Lets Connect</Link>
                {/* <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-play-circle" /><span>Watch Video</span></a> */}
              </div>
              <img src={heroBanner} className="img-fluid hero-img" alt data-aos="zoom-out" data-aos-delay={300} />
            </div>
          </div>
        </section>{/* /Hero Section */}


        {/* Blue Background Strip with Form */}
        <div className="position-relative mb-5"  >
          <div className="text-white text-center py-4 py-md-5 rounded-3" style={{ minHeight: '300px', backgroundColor: '#113F67' }}>
            <h4 className="mb-4 fw-bold text-warning px-3" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>Feel free to connect with us!</h4>

            {/* Contact Form */}
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                  <div className="p-3 p-md-4 rounded-3 shadow-lg" style={{ backgroundColor: 'rgba(255,255,255,0.95)', color: '#333' }}>
                    <h5 className="fw-semibold mb-3 mb-md-4 text-center text-dark">Send us a message</h5>
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <input
                            className="form-control form-control-lg"
                            name="firstName"
                            placeholder="First name"
                            type="text"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            style={{ fontSize: '0.95rem' }}
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <input
                            className="form-control form-control-lg"
                            name="lastName"
                            placeholder="Last name"
                            type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            style={{ fontSize: '0.95rem' }}
                          />
                        </div>
                        <div className="col-12">
                          <input
                            className="form-control form-control-lg"
                            name="email"
                            placeholder="Email address"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            style={{ fontSize: '0.95rem' }}
                          />
                        </div>
                        <div className="col-12">
                          <input
                            className="form-control form-control-lg"
                            name="phoneNumber"
                            placeholder="Phone number"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                            style={{ fontSize: '0.95rem' }}
                          />
                        </div>
                        <div className="col-12">
                          <textarea
                            className="form-control form-control-lg"
                            name="message"
                            placeholder="Your message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            style={{ resize: 'vertical', fontSize: '0.95rem' }}
                          />
                          <div className="mt-2 small text-primary text-start fw-semibold">
                            {wordCount} words used. {wordsLeft} words left.
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-center mb-3">
                          <div style={{ transform: 'scale(0.9)', transformOrigin: 'center' }}>
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey="6LfaPVMqAAAAAEiOoyL5MvKt0FpvHYHF9ZzeO8f5"
                              onChange={onCaptchaChange}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100 fw-bold py-3 text-uppercase"
                            type="submit"
                            disabled={!captchaVerified}
                            style={{
                              fontSize: '1rem',
                              letterSpacing: '0.5px',
                              backgroundColor: captchaVerified ? '#0d6efd' : '#6c757d',
                              borderColor: captchaVerified ? '#0d6efd' : '#6c757d'
                            }}
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="container-fluid px-3 overflow-hidden">
  <div className="row g-4 mb-5">
    {/* Contact Info */}
    <div className="col-12 col-lg-5">
      <div className="p-4 bg-white shadow-sm h-100 rounded-3 border">
        <div className="mb-4">
          <h6 className="fw-bold mb-2" style={{ color: '#333', fontSize: '1.1rem' }}>Address</h6>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>Hubli</p>
        </div>
        <div className="mb-4">
          <h6 className="fw-bold mb-2" style={{ color: '#333', fontSize: '1.1rem' }}>Phone</h6>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>+1 123-456-7890</p>
        </div>
        <div className="mb-4">
          <h6 className="fw-bold mb-2" style={{ color: '#333', fontSize: '1.1rem' }}>Email</h6>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>IstsBrts@support.com</p>
        </div>
        <div>
          <h6 className="fw-bold mb-3" style={{ color: '#333', fontSize: '1.1rem' }}>Socials</h6>
          <div className="d-flex gap-2 flex-wrap">
            <a className="btn text-white btn-sm d-flex align-items-center justify-content-center"
              style={{ backgroundColor: '#3b5998', width: '45px', height: '45px', borderRadius: '8px' }}
              href="#!" role="button">
              <i className="fab fa-facebook-f" style={{ fontSize: '1.2rem' }}></i>
            </a>
            <a className="btn text-white btn-sm d-flex align-items-center justify-content-center"
              style={{ backgroundColor: '#dd4b39', width: '45px', height: '45px', borderRadius: '8px' }}
              href="#!" role="button">
              <i className="fab fa-google" style={{ fontSize: '1.2rem' }}></i>
            </a>
            <a className="btn text-white btn-sm d-flex align-items-center justify-content-center"
              style={{ backgroundColor: '#55acee', width: '45px', height: '45px', borderRadius: '8px' }}
              href="#!" role="button">
              <i className="fab fa-twitter" style={{ fontSize: '1.2rem' }}></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Google Map */}
    <div className="col-12 col-lg-7">
      <div className="card border-0 rounded-3 shadow-sm overflow-hidden h-100">
        {/* Mobile View */}
        <iframe
          className="d-block d-md-none"
          width="100%"
          height="350"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          style={{ border: 0, display: 'block' }}
          src="https://maps.google.com/maps?width=100%25&height=350&hl=en&q=KLE%20BVB%20CTIE%20HUBBALLI+(My%20Business%20Name)&t=p&z=14&ie=UTF8&iwloc=B&output=embed"
          title="Google Map Mobile"
        ></iframe>

        {/* Desktop View */}
        <iframe
          className="d-none d-md-block"
          width="100%"
          height="100%"
          style={{ minHeight: '400px', border: 0, display: 'block' }}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=KLE%20BVB%20CTIE%20HUBBALLI+(My%20Business%20Name)&t=p&z=14&ie=UTF8&iwloc=B&output=embed"
          title="Google Map Desktop"
        ></iframe>
      </div>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default Contact;
