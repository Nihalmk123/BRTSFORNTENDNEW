import React from 'react'
import Layout from './Layout/Layout'
import Landing_img from '../assets/landing1.jpg'
import { Button } from '@mui/material'
import '../../src/Styles/HomeStyle.css'
// import Landing_img from '../assets/landingPage.png'
// import costEffective from '../assets/costEffective.png'
// import ecofrinedly from '../assets/eco-friendly_4266209.png'
// import check from '../../src/assets/check.png'
import Qr from '../../src/assets/Service_qr1.png'
import costEffective from '../assets/hand_3528541.png'
import ecofrinedly from '../assets/nature_16556075.png'
import reducedTime from '../assets/sand-clock_17635265.png'
import security from '../assets/shield_9260851.png'
import TicketingSystem from '../../src/assets/TicketingSystem.png'
import manageTravel from '../../src/assets/manageTravel.png'
import BusService from '../../src/assets/TicketingSystem2.png'
import OverViewMain from '../../src/assets/OverViewMain.png'
import phone_mocup from '../../src/assets/phone_mocup.png'
import serviceQr from '../../src/assets/Service_qr.png'
import userCentric from '../../src/assets/user-centric.png'
import inovativeTechnology from '../../src/assets/innovative-tech.png'
import teamCollabration from '../../src/assets/teamwork.png'
import userFriendly from '../../src/assets/userFrinedly.png'
import continousImprovement from '../../src/assets/continous-improvement.png'
import suport from '../../src/assets/support.png'
import principles_security from '../../src/assets/security.png'
import efficiency from '../../src/assets/Efficiency.png'
import EnvironmentalResponsibility from '../../src/assets/Environmental-Responsibility.png'
import performance from '../../src/assets/performance.png'
import whoweare from '../../src/assets/who we are re.jpg'
import background_img from '../../src/assets/call_toaction.png'
import banner from '../../src/assets/banner.png'
import homeBanner from '../assets/illustration-1.webp'
import qr_gif from '../assets/qr_loader.gif'

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'


const Home = () => {
  const cardData = [
    {
      title: "Smart Bus Ticketing System",
      description: "Experience hassle-free bus travel with our QR code-based digital ticketing system. No more paper tickets—just scan, board, and track your journey.",
    },
    {
      title: "Manage Your Travel Effortlessly",
      description: "Easily track your travel history, monitor expenses, and recharge your wallet anytime for seamless travel management.",
    },
    {
      title: "Optimize Bus Services with Real-Time Data",
      description: "Transport operators can use real-time passenger data to optimize bus deployment during peak hours, ensuring better service.",
    },
  ];
  return (
    <>
      <Layout>
        <Helmet>
          <title>Home</title>
          <meta name='description' content='Beginner friendly page for learning React Helmet.' />
        </Helmet>

        {/* landing page--------------------------------------------------------------------------------------------------------------------------------------------- */}
        <section id="hero" className="hero section">
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="hero-content" data-aos="fade-up" data-aos-delay={200}>
                  <div className="company-badge mb-4" style={{ backgroundColor: "#1F63AA", color: 'white' }}>
                    <i className="fas fa-bus me-2 fw-bold" style={{ fontSize: 20 }} />
                    BRTS
                  </div>
                  <h1 className="mb-4">
                    Book Your Bus Ticket <br />
                    Online and Ride with a <br />
                    <span className="accent-text">QR Code!</span>
                  </h1>
                  <p className="mb-4 mb-md-5">
                    Experience the future of bus travel with  <strong className='fw-bold fs-4'>SmartBus Ticketing </strong> – your all-in-one solution for effortless and efficient ticketing. Our platform is designed to streamline and automate the entire ticketing process, ensuring a smooth and hassle-free journey from start to finish.
                  </p>
                  <div className="hero-buttons">
                    <Link to="/bookTickets" className="btn me-0 me-sm-2 mx-1" style={{ backgroundColor: "#1F63AA", color: "#ffffff" }}>Book Your ticker Now</Link>
                    {/* <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="btn btn-link mt-2 mt-sm-0 glightbox"> */}
                    {/* <i className="bi bi-play-circle me-1" /> */}
                    {/* Play Video */}
                    {/* </a> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-image" data-aos="zoom-out" data-aos-delay={300}>
                  <img src={homeBanner} alt="Hero Image" className="img-fluid" />
                  <div className="customers-badge">
                    <div className="customer-avatars">
                    </div>
                    <p className="mb-0 mt-2 fw-semibold">From Queue to Click — Hassle-Free Bus Ticketing</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row stats-row gy-4 mt-5" data-aos="fade-up" data-aos-delay={500}>
              <div className="col-lg-3 col-md-6">
                <div className="stat-item">
                  <div className="stat-icon">
                    <img
                      className="bi bi-calendar-event"
                      height={48}
                      width={48}
                      src={costEffective}
                    />
                  </div>
                  <div className="stat-content">
                    <h4>3x Won Awards</h4>
                    <p className="mb-0">Vestibulum ante ipsum</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stat-item">
                  <div className="stat-icon">
                    <img
                      className="bi bi-globe-asia-australia"
                      src={ecofrinedly}
                      // fill="currentColor"
                      height={48}
                      // viewBox="0 0 16 16"
                      width={48}
                    />
                  </div>
                  <div className="stat-content">
                    <h4>6.5k Faucibus</h4>
                    <p className="mb-0">Nullam quis ante</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stat-item">
                  <div className="stat-icon">
                    <img
                      className="bi bi-people-fill"
                      height={48}
                      width={48}
                      src={reducedTime}
                    />
                  </div>
                  <div className="stat-content">
                    <h4>80k Mauris</h4>
                    <p className="mb-0">Etiam sit amet orci</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stat-item">
                  <div className="stat-icon">
                    <img
                      className="bi bi-brightness-high-fill"
                      height={48}
                      width={48}
                      src={security}
                    />
                  </div>
                  <div className="stat-content">
                    <h4>6x Phasellus</h4>
                    <p className="mb-0">Vestibulum ante ipsum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>{/* /Hero Section */}


        {/* over view---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <h5 className="main_headings display-5 fw-bold line-height text-center display-6 mt-5 highlighted-secondary ">Overview</h5>
        <div className='container p-4 p-md-5'>
          <section className="py-4 overview-section" style={{ background: "#1F63AA", color: "white" }}>
            <div className="container">
              <div className="row gap-5">
                {/* Left Column */}
                <div className="col-lg-7 d-flex flex-column justify-content-center align-items-center">
                  <img src={OverViewMain} alt="OverViewMain" style={{ width: "10%", marginRight: "25px" }} />
                  <h2 className="overview-text fw-bold" style={{ color: "#ffffff" }}>
                    Welcome to our bus ticketing system
                  </h2>
                  <p className="lead mt-2 text-center">
                    Here, you can book tickets online with ease. Explore our features to make your travel seamless and efficient.
                  </p>

                  {/* Cards in Left Column */}
                  <div className="row mt-4">
                    <div className="col-lg-6 col-12 mb-3">
                      <div className="card p-3 card-color h-100">
                        <h5 className="card-title">Seamless Digital Ticketings</h5>
                        <hr className='text-white' style={{ fontWeight: "bolder" }} />
                        <p className="card-text text-white">Digital Tickets for public transport offers a fast and paperless way to generate and validate tickets using QR codes. Users can easily book tickets online, access them through their smartphones, and enter terminals with just a scan — eliminating queues and manual processes.</p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 mb-3">
                      <div className="card p-3 card-color h-100">
                        <h5 className="card-title">Smart & Sustainable Mobility</h5>
                        <hr />
                        <p className="card-text text-white">Our system promotes eco-friendly practices by reducing paper usage and operational costs. By combining IoT hardware with cloud technology, Digi Tickets supports a cleaner, more efficient public transportation ecosystem.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-lg-4">
                  <h4 className="text-center fw-bold mb-4">Our Services</h4>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <div className="card p-3 text-center card-color d-flex flex-lg-row flex-column align-items-center justify-content-center">
                        <img
                          src={TicketingSystem}
                          alt="Manage Your Travel"
                          className="mb-lg-0 mb-3"
                          style={{ width: "15%", marginLeft: "auto", marginRight: "auto" }}
                        />
                        <div className="text-center">
                          <h5 className="card-title">Smart Bus Ticketing</h5>
                          <p className="card-text text-white">Experience hassle-free bus traveltraveltravel</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="card p-3 text-center card-color d-flex flex-lg-row flex-column align-items-center justify-content-center">
                        <img
                          src={manageTravel}
                          alt="Manage Your Travel"
                          className="mb-lg-0 mb-3"
                          // style={{ width: "15%", marginRight: "25px", marginLeft: "auto", marginRight: "auto" }}
                          style={{ width: "15%", marginLeft: "auto", marginRight: "auto" }}
                        />
                        <div className="text-center">
                          <h5 className="card-title">Manage Your Travel</h5>
                          <p className="card-text text-white">Easily track your travel history, monitor travel</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="card p-3 text-center card-color d-flex flex-lg-row flex-column align-items-center justify-content-center">
                        <img
                          src={BusService}
                          alt="Optimize Bus Services"
                          className="mb-lg-0 mb-3"
                          // style={{ width: "15%", marginRight: "25px", marginLeft: "auto", marginRight: "auto" }}
                          style={{ width: "15%", marginLeft: "auto", marginRight: "auto" }}
                        />
                        <div className="text-center">
                          <h5 className="card-title">Optimize Bus Services</h5>
                          <p className="card-text text-white">Transport operators can use real-time passenger data</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="card p-3 text-center card-color d-flex flex-lg-row flex-column align-items-center justify-content-center">
                        <img
                          src={serviceQr}
                          alt="Quick Scan Boarding"
                          className="mb-lg-0 mb-3"
                          style={{ width: "17%", marginRight: "auto", marginLeft: "auto" }}
                        />
                        <div className="text-center">
                          <h5 className="card-title">Quick Scan Boarding</h5>
                          <p className="card-text text-white">Passengers can use QR code tickets for quick and seamless boarding</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Features 2 Section */}
        <section id="features-2" className="features-2 section" style={{ marginTop: '110px' }}>
  <div className="container" data-aos="fade-up" data-aos-delay={100}>
    <div className="row align-items-center">
      {/* LEFT SIDE FEATURES */}
      <div className="col-lg-4 mb-5 mb-lg-0">
        {[
          { img: userCentric, title: 'User-Centric Development', desc: 'We design with our users in mind — engaging directly with commuters, conductors, and operators to ensure that every feature is built to solve real problems, save time, and improve the travel experience.' },
          { img: teamCollabration, title: 'Team Collaboration', desc: 'Behind every solution is a passionate and diverse team. Developers, designers, and transport experts work together using agile methods and shared creativity to bring meaningful innovations to life.' },
          { img: userFriendly, title: 'User-Friendly Experience', desc: 'Digi Tickets is crafted to be simple, intuitive, and accessible for everyone. Whether you’re scanning a ticket or managing a fleet, the platform ensures a seamless and hassle-free experience.' },
        ].map(({ img, title, desc }, i) => (
          <div className="feature-item mb-5" data-aos="fade-right" data-aos-delay={200 + i * 100} key={i}>
            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-end gap-4">
              <div className="order-1 order-md-2">
                <img src={img} alt={title} style={{ width: "50px" }} />
              </div>
              <div className="feature-content order-2 order-md-1">
                <h3 className="mb-2">{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CENTER IMAGE */}
      <div className="col-lg-4 text-center mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay={200}>
        <div className="phone-mockup">
          <img src={phone_mocup} alt="Phone Mockup" className="img-fluid" style={{ borderRadius: '15px' }} />
        </div>
      </div>

      {/* RIGHT SIDE FEATURES */}
      <div className="col-lg-4">
        {[
          { img: suport, title: 'Innovative Technology', desc: 'We leverage modern technologies such as QR code validation, IoT-enabled hardware, and cloud infrastructure to deliver a scalable and secure system. Our solutions are designed to ensure seamless integration, high reliability, and future readiness.' },
          { img: inovativeTechnology, title: 'Continuous Improvement', desc: 'We’re always learning. By actively gathering feedback and monitoring performance, we regularly improve our platform to stay ahead of evolving needs.' },
          { img: continousImprovement, title: 'Exceptional Customer Support', desc: 'Our users are at the center of everything we do. From setup to daily use, we provide timely and personalized support to ensure smooth operations and user satisfaction.' },
        ].map(({ img, title, desc }, i) => (
          <div className="feature-item mb-5" data-aos="fade-left" data-aos-delay={200 + i * 100} key={i}>
            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gap-4">
              <div>
                <img src={img} alt={title} style={{ width: "50px" }} />
              </div>
              <div className="feature-content">
                <h3 className="mb-2">{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

        {/* banner */}
        <div className='container p-4 p-md-5 mt-5' >
          <section className="overview-section" style={{ background: "#578FCA", color: "white" }}>
            <div className="container-fluid">
              <div className="row align-items-stretch">

                {/* Left Column */}
                <div className="col-lg-7 d-flex flex-column justify-content-center align-items-center">
                  <img src={banner} alt="OverViewMain" style={{ width: "100%", marginRight: " px" }} />

                </div>

                {/* Right Column */}
                <div className="col-lg-4 ml-auto d-flex flex-column">
                  <div className="row h-100">
                    <div className="col-12 overview-section" style={{ background: "#00215E" }}>
                      <div className="col-12 mb-3 ">
                        <div className="mt-4 card p-3 text-center card-color d-flex flex-lg-row flex-column align-items-center justify-content-center">

                          <div className="text-center">
                            <h5 className="card-title">Commitment to Quality and Client Satisfaction</h5>
                            <p className="card-text text-white">Your success is our priority. We are dedicated to providing top-notch quality and outstanding customer service</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-3">
                        <div className="card p-3 text-center card-color d-flex flex-lg-row flex-column align-items-center justify-content-center">

                          <div className="text-center">
                            <h5 className="card-title"> Innovative Solutions Tailored to Your Needs</h5>
                            <p className="card-text text-white">We specialize in crafting innovative, custom-built solutions that meet the unique needs of your business</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="card p-3 text-center card-color d-flex flex-lg-row flex-column align-items-center justify-content-center">

                          <div className="text-center">
                            <h5 className="card-title">Dedicated Team of Experts</h5>
                            <p className="card-text text-white">Our passionate and skilled team is committed to driving your success. With diverse expertise in various domains</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* banner */}

        {/* Who we are section */}
        <section className="py-4 py-md-5 bg-white">
          <div className="container">
            <div className="row align-items-center gy-5">

              {/* Image Section */}
              <div className="col-lg-6">
                <img
                  src={whoweare}
                  alt="Who We Are"
                  className="img-fluid rounded"
                  style={{ width: '100%', height: 'auto' }}
                  loading="lazy"
                />
              </div>

              {/* Content Section */}
              <div className="col-lg-6">
                <h2 className="fw-bold display-6 highlighted-secondary mb-3 text-center text-lg-start">
                  Who Are We?
                </h2>

                <p className="fs-5 text-muted mb-4 text-center text-lg-start">
                  At <strong>SIN (Sustainable Innovation and Nature)</strong>, we are transforming how people travel by developing innovative software and hardware for bus ticketing. We aim to simplify and modernize the travel experience with seamless terminal entry and efficient ticketing.
                </p>

                <div className="row gy-4">
                  {/* Feature 1 */}
                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="flex-shrink-0 bg-light rounded-circle p-3 me-3">
                        <i className="fas fa-ticket-alt fs-4 text-primary"></i>
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-2">Innovative Ticketing</h5>
                        <p className="text-muted mb-0">
                          A cross-platform digital ticketing system built for speed, accuracy, and real-time validation.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="flex-shrink-0 bg-light rounded-circle p-3 me-3">
                        <i className="fas fa-leaf fs-4 text-success"></i>
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-2">Sustainable Travel</h5>
                        <p className="text-muted mb-0">
                          Smart mobility that reduces paper waste and promotes eco-conscious transport operations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>




        {/* our principles--------------------------------------------------------------------------------------------------------------- */}
        <section className="py-5 mt-3" style={{ background: "#34699A", borderTopRightRadius: "90px", color: "#EBF4F6" }}>
          <div className="container">
            <div className="row justify-content-center text-center mb-4">
              <div className="col-lg-8 col-xxl-7">
                <h5 className="main_headings display-5 fw-bold line-height display-6 highlighted-secondary" style={{ color: "white" }}>Our Principles</h5>
                <p className="mt-3">Experience the future of bus travel with SmartBus Ticketing, designed to simplify and automate your ticketing process for a seamless journey.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="text-center position-relative">
                  <div className="step-icon mx-auto d-flex align-items-center justify-content-center" style={{ width: 120, height: 120 }}>
                    <img src={EnvironmentalResponsibility} className="bi bi-truck text-white" fill="currentColor" height={65} viewBox="0 0 16 16" width={65} />
                  </div>
                  <h4 className="fs-5 fw-bold">Environmental Responsibility</h4>
                  <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", maxWidth: "85%", margin: "0 auto" }}>
                    Promote eco-friendly practices in transportation, encouraging users to choose public transit for a smaller carbon footprint.
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center position-relative">
                  <div className="step-icon mx-auto d-flex align-items-center justify-content-center" style={{ width: 120, height: 120 }}>
                    <img src={principles_security} className="bi bi-truck text-white" fill="currentColor" height={65} viewBox="0 0 16 16" width={65} />
                  </div>
                  <h4 className=" fs-5 fw-bold">Security and Privacy</h4>
                  <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", maxWidth: "85%", margin: "0 auto" }}>
                    Implement robust security measures to protect user data, including encrypted transactions and secure QR code generation.
                  </p>                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center position-relative">
                  <div className="step-icon mx-auto d-flex align-items-center justify-content-center" style={{ width: 120, height: 120 }}>
                    <img src={efficiency} className="bi bi-truck text-white" fill="currentColor" height={65} viewBox="0 0 16 16" width={65} />
                  </div>
                  <h4 className=" fs-5 fw-bold">Efficiency</h4>
                  <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", maxWidth: "85%", margin: "0 auto" }}>
                    Optimize the ticketing process to minimize wait times, streamline boarding, and enhance overall travel efficiency
                  </p>                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center position-relative">
                  <div className="step-icon mx-auto d-flex align-items-center justify-content-center" style={{ width: 120, height: 120 }}>
                    <img src={performance} className="bi bi-truck text-white" fill="currentColor" height={65} viewBox="0 0 16 16" width={65} />
                  </div>
                  <h4 className="fs-8 fw-bold">Performance</h4>
                  <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", maxWidth: "85%", margin: "0 auto" }}>
                    Optimize the ticketing process by implementing real-time updates, contactless payments, and dynamic pricing to reduce wait times and enhance efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* testimonials */}
        {/* Testimonial 4 - Bootstrap Brain Component */}


        {/* testimonials */}

        {/* QR------------------------------------------------------------------------------------------------------------ */}
       <section id="call-to-action" className="call-to-action section py-5">
  <div className="container" data-aos="fade-up" data-aos-delay={100}>
    <div className="row justify-content-center text-center">
      <div className="col-lg-8">
        {/* QR Image */}
        <div className="mb-4">
          <img src={Qr} alt="qr_img" style={{ width: "80px", maxWidth: "20%", height: "auto" }} />
        </div>

        {/* Text Content */}
        <h2 className="display-6 fw-bold mb-3">Ready to automate your Bus Ticketing System?</h2>
        <p className="mb-4 fs-5">Start using now</p>

        {/* CTA Button */}
        <Link to="/contact" className="btn btn-cta px-4 py-2 fw-semibold" style={{backgroundColor:"#113F67", color:'white'}}>
          Contact Us
        </Link>
      </div>
    </div>
  </div>
</section>

      </Layout >
    </>
  )
}

export default Home