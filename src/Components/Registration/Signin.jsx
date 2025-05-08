// import React, { useState } from 'react';
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
// import Layout from '../Layout/Layout';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
// import ReCAPTCHA from 'react-google-recaptcha';
// import api from '../Api/Axios';

// const Signin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [captchaToken, setCaptchaToken] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const navigate = useNavigate();

//     const handleSignin = async (e) => {
//         e.preventDefault();

//         if (!email || !password || !captchaToken) {
//             toast.error("All fields and CAPTCHA are required.", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             const response = await api.post(
//                 "/tsn/v1/user/signIn",
//                 {
//                     email: email,
//                     password: password,
//                     token: captchaToken
//                 },
//                 {
//                     headers: { "Content-Type": "application/json" },
//                 }
//             );

//             // Handle successful sign-in
//             toast.success("Sign in successful!", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });

//             setTimeout(() => {
//                 navigate("/"); 
//             }, 2000);

//             const accessToken = response.headers['access_token'] || response.headers['authorization'];
//             const refreshToken = response.headers['refresh-token'] || response.headers['refresh-token'];

//             if (accessToken) {
//                 // Store both access token and refresh token in local storage
//                 localStorage.setItem("token", accessToken);
//                 if (refreshToken) {
//                     localStorage.setItem("refreshToken", refreshToken);
//                 }
//                 updateAuth({ accessToken, refreshToken });
//                 toast.success("Login successful");
//                 setTimeout(() => navigate('/'), 2000);
//             } else {
//                 toast.error("Login failed. Token not found.");
//             }

//         } catch (error) {
//             if (error.response) {
//                 toast.error(`Sign in failed: ${error.response.data.message || 'Error occurred'}`, {
//                     position: "top-right",
//                     autoClose: 3000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                 });
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <Layout>
//             <section className="signin-section" style={{ background: "#F3F9FB" }}>
//                 <MDBContainer className="py-5 h-100">
//                     <MDBRow className="d-flex align-items-center justify-content-center h-100">
//                         <MDBCol md="8" lg="6" xl="5">
//                             <MDBCard className="custom-card">
//                                 <MDBCardBody className="p-4">
//                                     <h3 className='text-center mb-5 fs-9 fw-bold' style={{ color: "#4379F2" }}>Sign In</h3>
//                                     <form>
//                                         <MDBInput
//                                             wrapperClass="mb-4"
//                                             value={email}
//                                             onChange={e => setEmail(e.target.value)}
//                                             label="Email address"
//                                             id="formEmail"
//                                             type="email"
//                                             size="lg"
//                                             autoComplete="email"
//                                         />

//                                         <MDBInput
//                                             wrapperClass="mb-4"
//                                             value={password}
//                                             onChange={e => setPassword(e.target.value)}
//                                             label="Password"
//                                             id="formPassword"
//                                             type="password"
//                                             size="lg"
//                                             autoComplete="current-password"
//                                         />

//                                         <MDBBtn
//                                             className="btn-lg btn-block"
//                                             type="submit"
//                                             onClick={handleSignin}
//                                             disabled={isSubmitting || !captchaToken}
//                                             style={{ background: "#4379F2", width: "100%" }}
//                                         >
//                                             {isSubmitting ? "Signing in..." : "Sign in"}
//                                         </MDBBtn>

//                                         <ReCAPTCHA
//                                             sitekey="6LfaPVMqAAAAAEiOoyL5MvKt0FpvHYHF9ZzeO8f5"
//                                             onChange={(token) => {
//                                                 setCaptchaToken(token);
//                                                 console.log("CAPTCHA token:", token);
//                                             }}
//                                             className="mt-4 mx-2"
//                                         />
//                                         <div className="text-center my-4">
//                                             <span className="text-muted divider">Or sign in with</span>
//                                         </div>

//                                         <div className="text-center">
//                                             <>
//                                                 <div className="text-center">
//                                                     <button data-mdb-ripple-init type="button" className="btn btn-secondary btn-floating mx-1">
//                                                         <i className="fab fa-facebook-f" />
//                                                     </button>
//                                                     <button data-mdb-ripple-init type="button" onClick={() => googleLogin()} className="btn btn-secondary btn-floating mx-1">
//                                                         <i className="fab fa-google" />
//                                                     </button>
//                                                     <button data-mdb-ripple-init type="button" className="btn btn-secondary btn-floating mx-1">
//                                                         <i className="fab fa-twitter" />
//                                                     </button>
//                                                     <button data-mdb-ripple-init type="button" className="btn btn-secondary btn-floating mx-1">
//                                                         <i className="fab fa-github" />
//                                                     </button>
//                                                 </div>

//                                             </>
//                                         </div>

//                                         <p className="mt-3 text-center ">Don't have an account? <Link to="/signup" style={{ color: "#4379F2" }}>Sign up</Link></p>
//                                     </form>
//                                 </MDBCardBody>
//                             </MDBCard>
//                         </MDBCol>
//                     </MDBRow>
//                 </MDBContainer>
//             </section>
//             <ToastContainer />
//         </Layout>
//     );
// };

// export default Signin;

import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout/Layout';
import { useAuth } from '../Context/Context';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import api from "../Api/Axios"
import ReCAPTCHA from 'react-google-recaptcha';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import Snackbar from 'awesome-snackbar'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const { updateAuth } = useAuth();
    const [captchaToken, setCaptchaToken] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

     // Function to validate email format
     const validateEmail = (email) => {
         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         return re.test(String(email).toLowerCase());
        }; 
        
        // Function to validate password format
    const validatePassword = (password) => {
        const re = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&(),.?":{}|<>]).{8,32}$/;
        return re.test(password);
    };

// Email & Password Sign-in
const handleSignin = async (e) => {
    e.preventDefault();

    if (!email || !password || !captchaToken) {
        toast.error("All fields and CAPTCHA are required.", {
            duration: 3000
        });
        return;
    }

    if (!validateEmail(email)) {
        toast.error("Please enter a valid email address.", {
            duration: 3000
        });
        return;
    }

    if (!validatePassword(password)) {
        toast.error("Password must be 8 char long with First letter capital and should contain special charecters ", {
            duration: 3000
        });
        return;
    }

    setIsSubmitting(true);

    try {
        const response = await api.post(
            `/tsn/v1/user/signIn`,
            {
                email: email,
                password: password,
                token: captchaToken
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const accessToken = response.headers['access_token'] || response.headers['authorization'];
        const refreshToken = response.headers['refresh-token'] || response.headers['refresh-token'];

        if (accessToken) {
            // Store both access token and refresh token in local storage
            localStorage.setItem("token", accessToken);
            if (refreshToken) {
                localStorage.setItem("refreshToken", refreshToken);
            }
            updateAuth({ accessToken, refreshToken });
            new Snackbar(`Signin successful`, {
                position: 'top-center',
                timeout: 2000,
                style: {
                    container: [
                        ['background-color', '#6EC207'],
                        ['border-radius', '5px']
                    ],
                }
            });
            navigate('/');
        } else {
            toast.error("Login failed. Token not found.");
        }
    } catch (error) {
        if (error.response) {
            toast.error(JSON.stringify(error.response.data.message || 'Somthing Went Wrong'), {
                duration: 3000
            });
        } else {
            toast.error("An error occurred. Please try again.", {
                duration: 3000
            });
        }
    } finally {
        setIsSubmitting(false);
    }
};



// Google OAuth Login
const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => toast.error("Google login failed. Please try again.")
});

useEffect(() => {
    if (user) {
        const { access_token } = user;

        api
            .post(`/tsn/v1/user/signInWithGoogle`, {
                "accessToken": access_token,
            })
            .then((res) => {
                console.log("data--------->", res.data);
                const accessToken = res.headers['access_token'] || res.headers['authorization'];
                const refreshToken = res.headers['refresh-token'] || res.headers['refresh-token'];

                if (accessToken) {
                    localStorage.setItem("token", accessToken);
                    localStorage.setItem("refresh", refreshToken );
                    updateAuth({ accessToken, refreshToken });
                    setProfile(res.data);
                    new Snackbar(`Google Login successful`, {
                        position: 'top-center',
                        timeout: 2000,
                        style: {
                            container: [
                                ['background-color', '#6EC207'],
                                ['border-radius', '5px']
                            ],
                        }
                    });
                   navigate('/');
                } else {
                    toast.error("Login failed. Token not found.");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}, [user]);


    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);
    //     toast.success("Logged out successfully");
    // };

    return (
        <Layout>
            <Helmet>
                <title>Signin</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <section className="signup-section" style={{
                backgroundColor: "rgba(243, 249, 251, 0.8)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}>
                <MDBContainer className="py-5 h-100">
                    <h3 className='text-center mb-5' style={{ color: "#1E3E62" }}><i className="fas fa-bus me-3 fw-bold" style={{ color: "#0a4275", fontSize: "px" }} />BRTS </h3>
                    <MDBRow className="d-flex align-items-center justify-content-center h-100">
                        <MDBCol md="8" lg="6" xl="5">
                            <MDBCard className="custom-card">
                                <MDBCardBody className="p-4">
                                    <div className="text-center mb-4">
                                        <h3 className="text-center mb-5 fs-9 fw-bold" style={{ color: "#4379F2" }}>Sign in</h3>
                                    </div>
                                    <form onSubmit={handleSignin}>
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Email"
                                            id="form1ExampleEmail"
                                            type="email"
                                            size="lg"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            autoComplete="email"
                                            required
                                        />
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Password"
                                            id="form1ExamplePassword"
                                            type="password"
                                            size="lg"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                            required
                                        />

                                        <div className="d-flex justify-content-around align-items-center mb-4">
                                            <Link to="/ForgotPassword">Forgot password?</Link>
                                        </div>

                                        <div className="d-flex align-items-center mt-2 mb-3 justify-content-center">
                                            <ReCAPTCHA
                                                sitekey="6LfaPVMqAAAAAEiOoyL5MvKt0FpvHYHF9ZzeO8f5"
                                                onChange={token => {
                                                    setCaptchaToken(token)
                                                    console.log(token)
                                                }}
                                            />
                                        </div>

                                        <MDBBtn
                                            className="btn-lg btn-block"
                                            type="submit"
                                            onClick={handleSignin}
                                            disabled={isSubmitting || !captchaToken}
                                            style={{ background: "#4379F2", width: "100%" }}
                                        >
                                            {isSubmitting ? "Signing in..." : "Sign in"}
                                        </MDBBtn>

                                    </form>


                                    <div className="text-center my-4">
                                        <span className="text-muted divider">Or sign in with</span>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
    <button className="gsi-material-button" style={{width:"70%"}} onClick={() => googleLogin()}>
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{ display: "block" }}
                >
                    <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
            </div>
            
            <span className="gsi-material-button-contents">Sign in with Google</span>
            <span style={{ display: "none" }}>Sign up with Google</span>
        </div>
    </button>
</div>
                                    <p className="mt-4 fw-bold text-center">
                                        Don't have an account? <Link className="text-decoration-underline" to="/signup">sign up</Link>
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <Toaster
                        position="top-center"
                        reverseOrder={true}
                    />
                </MDBContainer>
            </section>
        </Layout>
    );
};

export default Login;  