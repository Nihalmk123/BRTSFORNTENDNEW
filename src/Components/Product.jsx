import Layout from './Layout/Layout';
import '../../src/Styles/Product.css'
import fair_calculate from '../../src/assets/fair_calculate.png'
import feedback from '../../src/assets/Feedback.png'
import Ticket_Management from '../../src/assets/Ticket_Management.png'
import product_show from '../../src/assets/poduct_show.jpeg'
import { Helmet } from 'react-helmet-async';

const Product = () => {
    return (
        <Layout>
            <Helmet>
                <title>Product</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            {/* Header Section */}
            <section className='p-4' style={{ background: "#F5F7F8" }}>
                <div className="text-center mt-5">
                    <h2
                        className="main_headings display-3 fw-bold line-height text-center display-12 mb-3 highlighted-secondary"
                        style={{
                            background: "linear-gradient(to bottom, #103783, #9bafd9)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        Discover Our Solutions
                    </h2>

                    <p className="text-muted mb-4">
                        Our innovative bus ticketing system offers seamless travel experiences tailored to your needs.
                    </p>
                    <button className="btn btn-primary mt-4 mb-5">Download Now</button>
                </div>
                <div className="container d-flex justify-content-center">
                    <div style={{
                        // width: '90%',
                        // height: '500px',
                        // background: 'linear-gradient(to right, #6ff7e8, #1f7ea1)',
                        boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.2)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        position: 'relative'
                    }}>
                        <img
                            src={product_show}
                            alt="Description of image"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '10px'
                            }}
                        />
                        {/* Additional Content Here if needed */}
                    </div>
                </div>
            </section>



            {/* fearue cards */}
            <div className="container mt-5">
                <div className="row justify-content-center" style={{ marginTop: "80px" }}>
                    <h5 className="main_headings display-5 fw-bold mb-5 line-height text-center display-6 highlighted-secondary">Bus Ticketing System Features</h5>

                    {/* Card 1 */}
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                        <div className="card custom-card course_cards cloud_computing_card text-center">
                            <div className="card-body">
                                <img className="mb-2" src={fair_calculate} alt="gear_icon" style={{ width: "15%", color: "white" }} />
                                <h5 className="card-title">Integrated Fare Calculation</h5>
                                <p className="card-text">This feature simplifies the fare process for users, ensuring transparency and encouraging more riders to use the service by making it more affordable</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                        <div className="card custom-card course_cards cloud_computing_card text-center">
                            <div className="card-body">
                                <img className="mb-2" src={feedback} alt="conference_icon" style={{ width: "15%" }} />
                                <h5 className="card-title">Comprehensive Feedback</h5>
                                <p className="card-text"> By fostering open communication, this feature enhances user satisfaction and helps the service continually improve based on real-time user insights and needs.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                        <div className="card custom-card course_cards cloud_computing_card text-center">
                            <div className="card-body">
                                <img className="mb-2" src={Ticket_Management} alt="dynamic_icon" style={{ width: "15%" }} />
                                <h5 className="card-title">Seamless Ticket Management</h5>
                                <p className="card-text">This feature provides convenience and flexibility for users, allowing them to handle their travel plans efficiently without needing to contact customer support.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Features Section */}
            {/* <h5 className="main_headings display-5 fw-bold line-height text-center display-6 mt-5 highlighted-secondary mb-5">Features</h5>
            <section className="mt-1">
                <div className="container p-4 p-md-12" style={{ borderRadius: "8px", background: "#1F63AA", boxShadow: "0px 0px 27px 4px rgba(0, 0, 0, 0.12)" }}>
                    <div className="row text-center mb-4"> */}
            {/* Optional: Add any introductory content for features here */}
            {/* </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="row">
                                {["Smart Bus Ticketing System", "Manage Your Travel Effortlessly", "Optimize Bus Services with Real-Time Data"].map((title, index) => (
                                    <div className="col-lg-4" key={index}>
                                        <div className={`mt-5 card rounded-1 text-center p-2 ${index % 2 === 0 ? 'bg-light' : ''} px-3 mb-4 mb-lg-0`}>
                                            <div className="d-flex rounded-circle mx-auto align-items-center justify-content-center text-white fs-3 fw-bold border border-white border-4" style={{ width: '4rem', height: '4rem', marginTop: '-3.5rem', backgroundColor: '#0a4275' }}>
                                                {index + 1}
                                            </div>
                                            <h5 className="mt-2 mb-2" style={{ fontWeight: 700 }}>{title}</h5>
                                            <p className="text-muted">Experience hassle-free bus travel with our QR code-based digital ticketing system.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

        </Layout>
    );
}

export default Product;
