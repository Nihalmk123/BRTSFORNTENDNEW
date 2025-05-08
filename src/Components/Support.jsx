import React from 'react'
import Layout from './Layout/Layout'
import { Helmet } from 'react-helmet-async'

const Support = () => {
  return (
    <Layout>
      <Helmet>
        <title>Support</title>
        <meta name='description' content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <section className="bsb-about-6 py-md-5 py-xl-6">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xl-5">
              <h5 className="main_headings display-5 fw-bold line-height text-center display-6 highlighted-secondary">Raise Ticket</h5>
              <hr className="w-50 mx-auto mb-xl-5 border-dark-subtle" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row gy-4 gy-lg-0 align-items-start">
            {/* Left Column: Accordion */}
            <div className="col-12 col-lg-9">
              <div className="row justify-content-xl-end">
                <div className="col-12 col-xl-11">
                  <div className="accordion accordion-flush" id="accordionAbout6" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <div className="accordion-item mb-4 border border-dark">
                      <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button bg-transparent fs-4 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          Problem Related to Signup?
                        </button>
                      </h2>
                      <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionAbout6">
                        <div className="accordion-body">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorum id quisquam dolorem. Nemo possimus odit iure beatae voluptates voluptatum veniam quo et reprehenderit perspiciatis a pariatur, modi ex earum, neque dolor consectetur quas vero expedita non nam. Vero repudiandae dolorum eveniet, eaque assumenda libero dolorem itaque velit nesciunt ut?
                          <a className='mx-2 fw-bold' href="">Raise Ticket</a>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-4 border border-dark">
                      <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed bg-transparent fs-4 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Issue Related to Purchasing Ticket?
                        </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionAbout6">
                        <div className="accordion-body">
                          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi nam ad impedit ex qui corrupti sapiente, aliquid, ratione commodi eligendi beatae neque! Assumenda architecto, unde laudantium, sed ipsa tempora doloribus voluptas nemo ratione sit facilis quos iusto at optio? Sed harum impedit qui repudiandae tempore libero ipsum iure exercitationem? Eum.
                          <a className='mx-2 fw-bold' href="">Raise Ticket</a>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-4 border border-dark">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed bg-transparent fs-4 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          Problem with Payment?
                        </button>
                      </h2>
                      <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionAbout6">
                        <div className="accordion-body">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorum id quisquam dolorem. Nemo possimus odit iure beatae voluptates voluptatum veniam quo et reprehenderit perspiciatis a pariatur, modi ex earum, neque dolor consectetur quas vero expedita non nam. Vero repudiandae dolorum eveniet, eaque assumenda libero dolorem itaque velit nesciunt ut?
                          <a className='mx-2 fw-bold' href="">Raise Ticket</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Tickets */}
            <div className="col-12 col-lg-3">
              <div className="card p-3 d-flex flex-row align-items-center mb-3 support-tickets">
                <div>
                  <h5 className="card-title">Ticket Title</h5>
                  <p className="card-text text-dark">Ticket desc..</p>
                  <div className="d-flex flex-row align-items-center">
                    <p className="me-3 fw-bold">Start Date: <span>02/05/2024</span></p>
                    <p className="me-3 fw-bold">End Date: <span>02/05/2024</span></p>
                  </div>
                </div>
              </div>
              <div className="card p-3 d-flex flex-row align-items-center mb-3 support-tickets">
                <div>
                  <h5 className="card-title">Ticket Title</h5>
                  <p className="card-text text-dark">Ticket desc..</p>
                  <div className="d-flex flex-row align-items-center">
                    <p className="me-3 fw-bold">Start Date: <span>02/05/2024</span></p>
                    <p className="me-3 fw-bold">End Date: <span>02/05/2024</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Support
