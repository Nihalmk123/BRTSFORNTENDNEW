import React, { useRef, useState } from 'react';
import Layout from './Layout/Layout';
import ReCAPTCHA from 'react-google-recaptcha';
import api from './Api/Axios';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';

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
      <section className="py-5" style={{ background: '' }}>
        <div className="container">
          <div className="row justify-content-center text-center mb-3">
            <div className="col-lg-8 col-xxl-7">
              <span className="text-muted" style={{ color: '#5B99C2' }}>
                Contach Us
              </span>
              <h5 className="main_headings display-5 fw-bold line-height text-center display-6 highlighted-secondary">Get in Touch</h5>
              <p className="lead">
                Lorem ipsum dolor, sit amet elit. Quam nitm veniam dicta, quos nemo minima nulla ducimus offici nulla ducimus officiis! Lorem ipsum dolor, sit amet elit Quam nitm.
              </p>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-lg-6">
              <h5 className="fw-semibold mb-3">Send us a message</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        className="form-control bg-light"
                        name="firstName"
                        placeholder="First name"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        className="form-control bg-light"
                        name="lastName"
                        placeholder="Last name"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <input
                        className="form-control bg-light"
                        name="email"
                        placeholder="Email address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <input
                        className="form-control bg-light"
                        name="phoneNumber"
                        placeholder="Phone number"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control bg-light"
                    name="message"
                    placeholder="Your message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="mt-1 text-muted">
                    {wordCount} {wordCount === 1 ? 'word' : 'words'} used. {wordsLeft} {wordsLeft === 1 ? 'word' : 'words'} left.
                  </div>
                </div>
                <div className="">
                  <div className="d-flex align-items-center mb-3">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LfaPVMqAAAAAEiOoyL5MvKt0FpvHYHF9ZzeO8f5"
                      onChange={onCaptchaChange}
                    />
                  </div>
                  <button className="btn btn-primary w-100 mb-3" type="submit" disabled={!captchaVerified}>
                    Send message
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-5 mt-5 mt-lg-0">
              <div className="mb-4">
                <h5>Address</h5>
                <p>Hubli</p>
              </div>
              <div className="mb-4">
                <h5>Phone</h5>
                <p>+1 123-456-7890</p>
              </div>
              <div className="mb-4">
                <h5>Email</h5>
                <p>IstsBrts@support.com</p>
              </div>
              <div className="mb-4">
                <h5>Socials</h5>
                <a
                  className="btn text-white btn-floating m-1"
                  style={{ backgroundColor: '#3b5998' }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn text-white btn-floating m-1"
                  style={{ backgroundColor: '#dd4b39' }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-google"></i>
                </a>
                <a
                  className="btn text-white btn-floating m-1"
                  style={{ backgroundColor: '#55acee' }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='container mt-5 mb-5 card p-2'>
          <iframe width="100%" height={500} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=KLE%20BVB%20CTIE%20HUBBALLI+(My%20Business%20Name)&t=p&z=14&ie=UTF8&iwloc=B&output=embed">&lt;a href="https://www.gps.ie/"&gt;gps systems&lt;/a&gt;</iframe>
        </div>
      </section>

    </Layout>
  );
};

export default Contact;
