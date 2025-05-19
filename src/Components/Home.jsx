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
import ourApprocah from '../../src/assets/ourApproach1.jpg'
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
        <section className="py-5 bg-home">
          <div className="container">
            <div className="row align-items-center">
              {/* Image column - appears first in mobile view */}
              <div className="col-lg-6 mb-4 mb-lg-0 order-first order-lg-2">
                <img alt="Bus Ticket" className="img-fluid" src={Landing_img} />
              </div>

              {/* Text column - appears below the image in mobile view */}
              <div className="col-lg-6 order-last order-lg-1">
                <h2 className="display-6 fw-bold heading-custom">
                  <span className="highlighted-text">Book Your Bus Ticket</span> Online and Ride with a{" "}
                  <span className="highlighted-secondary">QR Codes!</span>
                </h2>
                <p className="lead mt-3 mb-4 custom-para">
                  Experience the future of bus travel with <strong className='fw-bold fs-4'>SmartBus Ticketing </strong>– your all-in-one solution for effortless and efficient ticketing. Our platform is designed to streamline and automate the entire ticketing process, ensuring a smooth and hassle-free journey from start to finish.
                </p>
                <Button className='btn-width btn text-white px-3 py-2' style={{ background: "#10375c" }}>Book Ticket Now</Button>
                <div className="z-10 flex min-h-64 items-center justify-center">
                </div>
              </div>
            </div>

            {/* SVG icons section */}
            <div className="row mt-5 text-center ">
              <div className="col-md-3 col-sm-6 mb-3 mb-md-0 mt-5">
                <div className="mb-3" >
                  <img
                    className="bi bi-globe-asia-australia"
                    src={ecofrinedly}
                    fill="currentColor"
                    height={48}
                    viewBox="0 0 16 16"
                    width={48}
                  />
                  {/* SVG path */}
                </div>
                <h4>Eco-Friendly</h4>
                <p> Promotes sustainability and reduces environmental impact</p>
              </div>
              <div className="col-md-3 col-sm-6 mb-3 mb-md-0 mt-5">
                <div className="mb-3">
                  <img
                    className="bi bi-calendar-event"
                    fill="currentColor"
                    height={48}
                    viewBox="0 0 16 16"
                    width={48}
                    src={costEffective}
                  />
                  {/* SVG path */}
                </div>
                <h4>Cost Reduction</h4>
                <p>Cutting unnecessary costs to improve profitability</p>
              </div>
              <div className="col-md-3 col-sm-6 mb-3 mb-md-0 mt-5">
                <div className="mb-3">
                  <img
                    className="bi bi-people-fill"
                    fill="currentColor"
                    height={48}
                    viewBox="0 0 16 16"
                    width={48}
                    src={reducedTime}
                  />
                  {/* SVG path */}
                </div>
                <h4>Reduced Wait time</h4>
                <p>Speeding up processes to serve you quicker and enhance your experience.</p>
              </div>
              <div className="col-md-3 col-sm-6 mt-5">
                <div className="mb-3">
                  <img
                    className="bi bi-brightness-high-fill"
                    fill="currentColor"
                    height={48}
                    viewBox="0 0 16 16"
                    width={48}
                    src={security}
                  />
                  {/* SVG path */}
                </div>
                <h4>Security</h4>
                <p> Protecting your data and ensuring a safe experience</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="row mt-4">
            </div>
          </div>
        </section>

        {/* over view---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <h5 className="main_headings display-5 fw-bold line-height text-center display-6 mt-5 highlighted-secondary">Overview</h5>
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
                        <h5 className="card-title">Card 1</h5>
                        <hr className='text-white' style={{ fontWeight: "bolder" }} />
                        <p className="card-text text-white">Content for Card 1 goes here.</p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 mb-3">
                      <div className="card p-3 card-color h-100">
                        <h5 className="card-title">Card 2</h5>
                        <hr />
                        <p className="card-text text-white">Content for Card 2 goes here.</p>
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

        {/* Our Aproach--------------------------------------------------------------------------------------------------------------------------------- */}

        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center text-center mb-3">
              <div className="col-lg-8 col-xl-7">
                <h5 className="main_headings display-5 fw-bold line-height text-center display-6 highlighted-secondary">Our Aproach</h5>
              </div>
            </div>
            <div className="row align-items-center">
              {/* First Column - Left Side */}
              <div className="col-md-4 order-1 order-md-1">
                <div className="text-center">
                  <div className="text-muted">
                    <img src={userCentric} style={{ width: "15%" }} />
                  </div>
                  <h5 className="fw-bold mt-3">User-Centric Development</h5>
                  <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", maxWidth: "75%", margin: "0 auto" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit

                  </p>
                </div>
                <div className="my-5 text-center">
                  <div className="text-muted">
                    <img src={teamCollabration} style={{ width: "15%" }} />
                  </div>
                  <h5 className="fw-bold mt-3">Team Collaboration</h5>
                  <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", maxWidth: "75%", margin: "0 auto" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-muted">
                    <img src={userFriendly} style={{ width: "15%" }} />
                  </div>
                  <h5 className="fw-bold mt-3">User-Friendly Experience</h5>
                  <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", maxWidth: "75%", margin: "0 auto" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit .
                  </p>
                </div>
              </div>

              {/* Image in the middle */}
              <div className="col-md-4 order-2 order-md-2">
                <div className="mb-4 mb-md-0">
                  <img
                    alt=""
                    className="img-fluid rounded mx-auto"
                    src={ourApprocah}
                    style={{ boxShadow: "0px 0px 27px 4px rgba(0, 0, 0, 0.12)" }}
                  />
                </div>
              </div>

              {/* Third Column - Right Side */}
              <div className="col-md-4 order-3 order-md-3">
                <div className="text-center">
                  <div className="text-muted">
                    <img src={inovativeTechnology} style={{ width: "15%" }} />
                  </div>
                  <h5 className="fw-bold mt-3">Innovative Technology</h5>
                  <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", maxWidth: "75%", margin: "0 auto" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit
                  </p>
                </div>
                <div className="my-5 text-center">
                  <div className="text-muted">
                    <img src={continousImprovement} style={{ width: "15%" }} />
                  </div>
                  <h5 className="fw-bold mt-3">Continuous Improvement</h5>
                  <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", maxWidth: "75%", margin: "0 auto" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-muted">
                    <img src={suport} style={{ width: "15%" }} />
                  </div>
                  <h5 className="fw-bold mt-3">Exceptional Customer Support</h5>
                  <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", maxWidth: "75%", margin: "0 auto" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Who we are section */}
        <section className="py-3 py-md-5">
          <div className="container">
            <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
              <div className="col-12 col-lg-6 col-xl-5">
                <img
                  className="img-fluid rounded"
                  loading="lazy"
                  src={whoweare}
                  alt="About 1"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="col-12 col-lg-6 col-xl-7">
                <div className="row justify-content-xl-center">
                  <div className="col-12 col-xl-11">
                    <h5 className="main_headings display-5 fw-bold line-height display-6 highlighted-secondary">Who Are We?</h5>
                    <p className="fs-5 text- mb-3">
                      At SIN, we are dedicated to transforming the travel experience through innovative software solutions for bus ticket generation and scanning. Our mission is to streamline the ticketing process, enabling seamless entry into terminals and enhancing the overall travel journey.
                    </p>
                    <p className="mb-5">
                    </p>
                    <div className="row gy-4 gy-md-0 gx-xxl-5X">
                      <div className="col-12 col-md-6">
                        <div className="d-flex">
                          <div className="me-4 text-primary">
                            <i class="fas fa-ticket-alt fs-3 highlighted-secondary"></i>
                          </div>
                          <div>
                            <h2 className="h4 mb-3">Innovative Ticketing Solutions</h2>
                            <p className="text-secondary mb-0">We are crafting a digital method that subsists life across all mediums.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="d-flex">
                          <div className="me-4 text-primary">
                            <i class="fas fa-leaf fs-3 highlighted-secondary"></i>
                          </div>
                          <div>
                            <h2 className="h4 mb-3">Sustainable Travel</h2>
                            <p className="text-secondary mb-0">We believe in enhancing journeys through innovative technology, merging efficiency with eco-friendly practices for a better tomorrow.</p>
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



        {/* our principles--------------------------------------------------------------------------------------------------------------- */}
        <section className="py-5 mt-3" style={{ background: "#37B7C3", borderTopRightRadius: "90px", color: "#EBF4F6" }}>
          <div className="container">
            <div className="row justify-content-center text-center mb-4">
              <div className="col-lg-8 col-xxl-7">
                <h5 className="main_headings display-5 fw-bold line-height display-6 highlighted-secondary">Our Principles</h5>
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

        {/* banner */}
        <div className='container p-4 p-md-5 mt-5'>
          <section className="overview-section" style={{ background: "#FFC94A", color: "white" }}>
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

        {/* testimonials */}
        {/* Testimonial 4 - Bootstrap Brain Component */}
        <section className="py-3 py-md-5 py-xl-8 mt-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-10 col-lg-8">
                <h3 className="fs-5 mb-2 text-secondary text-uppercase">Testimonials</h3>
                <h2 className="display-7 mb-4">Our valued clients' testimonials speak volumes about our work's power.</h2>
              </div>
            </div>
          </div>
          <div className="container overflow-hidden">
            <div className="row gy-3 gy-lg-4">
              <div className="col-12 col-lg-6">
                <div className="card" style={{ borderLeft: "3px solid #10375c" }}>
                  <div className="card-body">
                    <span class="star-rating">
                      <i class="fas fa-star text-warning"></i>
                      <i class="fas fa-star text-warning"></i>
                      <i class="fas fa-star text-warning"></i>
                      <i class="fas fa-star text-warning"></i>
                      <i class="far fa-star text-warning"></i>
                    </span>
                    <blockquote className="bsb-blockquote-icon mb-3">We were struggling to manage our finances effectively. We needed help developing a financial plan. They create a financial plan that worked for us, and they showed us how to track our spending more effectively. We are so grateful for the help.</blockquote>
                    <figure className="d-flex align-items-center m-0 p-0">
                      {/* <img className="img-fluid rounded rounded-circle m-0 border border-5" loading="lazy" src="./assets/img/testimonial-img-3.jpg" alt="Michael Wilson" /> */}
                      <i class="fas fa-user"></i>
                      <figcaption className="ms-3">
                        <h4 className="mb-1 h5">Michael Wilson</h4>
                        <h5 className="fs-6 text-secondary mb-0">SEO Expert</h5>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="card" style={{ borderLeft: "3px solid #10375c" }}>
                  <div className="card-body">
                    <span class="star-rating">
                      <i class="fas fa-star text-warning"></i>
                      <i class="fas fa-star text-warning"></i>
                      <i class="fas fa-star text-warning"></i>
                      <i class="fas fa-star text-warning"></i>
                      <i class="far fa-star text-warning"></i>
                    </span>
                    <blockquote className="bsb-blockquote-icon mb-3">We were looking for a company that could help us with our branding. We needed a website and marketing materials. They were able to create a brand identity that we loved. They worked with us to develop a logo that represented our company.</blockquote>
                    <figure className="d-flex align-items-center m-0 p-0">
                      {/* <img className="img-fluid rounded rounded-circle m-0 border border-5" loading="lazy" src="./assets/img/testimonial-img-4.jpg" alt="Luke Reeves" /> */}
                      <i class="fas fa-user"></i>
                      <figcaption className="ms-3">
                        <h4 className="mb-1 h5">Luke Reeves</h4>
                        <h5 className="fs-6 text-secondary mb-0">Sales Manager</h5>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* testimonials */}

        {/* QR------------------------------------------------------------------------------------------------------------ */}
        <section className="py-4 mt-3" style={{ backgroundImage: `url(${background_img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="text-center">
                  <img src={Qr} alt="qr_img" style={{ width: "7%" }} />
                  <h2 className="display-7 mt-3 fw-bold text-white">Ready to automate your Bus Ticketing System?</h2>
                  <p className="lead text-white">Start Using now</p>
                  <Link to="/contact">
                  <Button className='btn-width btn fw-bold text-white px-3 py-2' style={{ background: "#FFC55A" }}>Contact Us</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </Layout >
    </>
  )
}

export default Home