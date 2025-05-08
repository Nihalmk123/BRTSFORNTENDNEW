import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';
import Layout from '../Layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import api from '../Api/Axios';
import ReCAPTCHA from 'react-google-recaptcha';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../Context/Context';
import { InputAdornment, TextField } from '@mui/material';
// import { Phone } from 'lucide-react';


const Signup = () => {
    const [fname, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();
    const { updateAuth } = useAuth();

    // Function to validate email format
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }; 

    // Function to validate phone number format
    const validatePhoneNumber = (phone) => {
        const re = /^[0-9]{10}$/;
        return re.test(String(phone));
    };
    
    // Function to validate name format
    const validateName = (name) => {
        if (name.length < 2) {
            return "The name must be at least 2 characters long.";
        }
        if (name.length > 256) {
            return "The name cannot exceed 256 characters.";
        }
        const re = /^[a-zA-Z]+$/;
        if (!re.test(name)) {
            return "The name should consist of alphabetic characters only.";
        }
        return ""; 
    };

    const validatePassword = (password) => {
        const re = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&(),.?":{}|<>]).{8,32}$/;
        return re.test(password);
    };
    
    const handleSignup = async (e) => {
        e.preventDefault();
    
        // Form validation
        if (!fname || !lastName || !email || !phone || !password || !captchaToken) {
            toast.error('All fields are required.', {
                duration: 3000
            });
            return;
        }
    
        // First name validation
        const firstNameError = validateName(fname);
        if (firstNameError) {
            toast.error(firstNameError, {
                duration: 3000
            });
            return;
        }
    
        // Last name validation
        const lastNameError = validateName(lastName);
        if (lastNameError) {
            toast.error(lastNameError, {
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
    
        if (!validatePhoneNumber(phone)) {
            toast.error("Please enter a valid 10-digit phone number.", {
                duration: 3000
            });
            return;
        }
    
        if (!validatePassword(password)) {
            toast.error("Password must be 8 char long with First letter capital and should contain special charecter ", {
                duration: 3000
            });
            return;
        }
    
        setIsSubmitting(true);
    
        try {
            const response = await api.post(
                "/tsn/v1/user/signUp",
                {
                    phoneNumber: phone,
                    email: email,
                    password: password,
                    firstName: fname,
                    lastName: lastName,
                    token: captchaToken
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
    
            toast.success("Signup successful!", {
                duration: 3000
            });
            console.log(response.data.message);
    
            setName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setCaptchaToken(null); // Reset captcha
    
            setTimeout(() => {
                navigate("/signin");
            }, 2000);
    
        } catch (error) {
            if (error.response) {
                console.error("Error data:", error.response.data.Errors);
                toast.error(error.response.data.message, {
                    duration: 3000
                });
            } else if (error.request) {
                alert("Error request:", error.request);
            } else {
                alert("Error message:", error.message);
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
                        toast.success("Google Login successful", {
                            duration: 3000
                        });
                        setTimeout(() => navigate('/'), 2000);
                    } else {
                        toast.error("Login failed. Token not found.");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [user]);

    return (
        <Layout>
            <Helmet>
                <title>Signup</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <section className="signup-section" style={{ background: "#F3F9FB" }}>
                <MDBContainer className="py-5 h-100">
                    <h3 className='text-center mb-5' style={{ color: "#1E3E62" }}><i className="fas fa-bus me-3 fw-bold" style={{ color: "#0a4275", fontSize: "px" }} />BRTS </h3>

                    <MDBRow className="d-flex align-items-center justify-content-center h-100">
                        <MDBCol md="8" lg="6" xl="5">
                            <MDBCard className="custom-card">
                                <MDBCardBody className="p-4">
                                    <h3 className='text-center mb-5 fs-9 fw-bold' style={{ color: "#4379F2" }}>Sign up</h3>
                                    <form>
                                        <MDBRow>
                                            <MDBCol md="6">
                                                <MDBInput
                                                    wrapperClass="mb-4"
                                                    value={fname}
                                                    onChange={e => setName(e.target.value)}
                                                    label="First Name"
                                                    id="formFirstName"
                                                    type="text"
                                                    size="lg"
                                                    autoComplete="given-name"
                                                />
                                            </MDBCol>
                                            <MDBCol md="6">
                                                <MDBInput
                                                    wrapperClass="mb-4"
                                                    value={lastName}
                                                    onChange={e => setLastName(e.target.value)}
                                                    label="Last Name"
                                                    id="formLastName"
                                                    type="text"
                                                    size="lg"
                                                    autoComplete="family-name"
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol md="6">
                                                <MDBInput
                                                    wrapperClass="mb-4"
                                                    value={phone}
                                                    onChange={(e) => {
                                    const inputValue = e.target.value.replace(/\D/g, ''); 
                                    if (inputValue.length <= 10) {
                                        setPhone(inputValue); 
                                    }
                                }}
                                                    label="Phone Number"
                                                    id="formPhoneNumber"
                                                    type="tel"
                                                    size="lg"
                                                    autoComplete="tel"
                                                />
                                            </MDBCol>
                                            <MDBCol md="6">
                                                <MDBInput
                                                    wrapperClass="mb-4"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    label="Email address"
                                                    id="formEmail"
                                                    type="email"
                                                    size="lg"
                                                    autoComplete="email"
                                                />
                                                
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            label="Password"
                                            id="formPassword"
                                            type="password"
                                            size="lg"
                                            autoComplete="current-password"
                                        />
                                        <div className="d-flex justify-content-around align-items-center">
                                            <Link to="/ForgotPassword">Forgot password?</Link>
                                        </div>

                                        <div className="d-flex align-items-center mb-3 justify-content-center">
                                            <ReCAPTCHA
                                                sitekey="6LfaPVMqAAAAAEiOoyL5MvKt0FpvHYHF9ZzeO8f5"
                                                onChange={(token) => {
                                                    setCaptchaToken(token);
                                                    console.log("CAPTCHA token:", token);
                                                }}
                                                className="mt-4 mx-2"
                                            />
                                        </div>
                                        <MDBBtn
                                            className="btn-lg btn-block"
                                            type="submit"
                                            onClick={handleSignup}
                                            disabled={isSubmitting || !captchaToken}
                                            style={{ background: "#4379F2", width: "100%" }}
                                        >
                                            {isSubmitting ? "Signing up..." : "Sign up"}
                                        </MDBBtn>


                                        <div className="text-center my-4 divider">
                                            <span className="text-muted divider">Sign up with</span>
                                        </div>

                                    </form>
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
            
            <span className="gsi-material-button-contents">Sign up with Google</span>
            <span style={{ display: "none" }}>Sign up with Google</span>
        </div>
    </button>
    
</div>
<p className="mt-4 fw-bold text-center">Already have an account? <Link to="/signin" className='text-decoration-underline' style={{ color: "#4379F2" }}>sign in</Link></p>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </Layout>
    );
};

export default Signup;


// import React, { useEffect, useState } from 'react';
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
// import Layout from '../Layout/Layout';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import api from '../Api/Axios';
// import ReCAPTCHA from 'react-google-recaptcha';
// import toast, { Toaster } from 'react-hot-toast';
// import { Helmet } from 'react-helmet-async';

// const Signup = () => {
//     const [fname, setName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordStrength, setPasswordStrength] = useState("");
//     const [captchaToken, setCaptchaToken] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();
//     const [strength, setStrength] = useState(0);
//     const [showProgress, setShowProgress] = useState(false);

//     const validatePassword = (password) => {
//         const strongRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
//         const mediumRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;
        
//         if (strongRegex.test(password)) return "Strong";
//         else if (mediumRegex.test(password)) return "Medium";
//         else return "Weak";
//     };

//     // const handlePasswordChange = (e) => {
//     //     const pass = e.target.value;
//     //     setPassword(pass);
//     //     setPasswordStrength(validatePassword(pass));
//     // };

//     const handleSignup = async (e) => {
//         e.preventDefault();

//         // Basic form validation
//         if (!fname || !lastName || !email || !phone || !password || !captchaToken) {
//             toast.error('All fields and CAPTCHA are required.', { duration: 3000 });
//             return;
//         }

//         if (passwordStrength === "Weak") {
//             toast.error("Password must be stronger. Include a capital letter, number, and special character.", { duration: 3000 });
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             const response = await api.post("/tsn/v1/user/signUp", {
//                 phoneNumber: phone,
//                 email: email,
//                 password: password,
//                 firstName: fname,
//                 lastName: lastName,
//                 token: captchaToken
//             }, { headers: { "Content-Type": "application/json" } });

//             toast.success("Signup successful!", { duration: 3000 });

//             setName("");
//             setLastName("");
//             setEmail("");
//             setPhone("");
//             setPassword("");
//             setPasswordStrength("");
//             setCaptchaToken(null);

//             setTimeout(() => {
//                 navigate("/signin");
//             }, 2000);

//         } catch (error) {
//             toast.error(error.response?.data?.message || "Signup failed.", { duration: 3000 });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const googleLogin = useGoogleLogin({
//         onSuccess: (response) => {
//             setUser(response);
//         },
//         onError: (error) => toast.error("Google login failed. Please try again.", {
//             duration: 3000
//         })
//     });


//     useEffect(() => {
//         if (user) {
//             const { access_token } = user;

//             axios
//                 .post(`/tsn/v1/user/signInWithGoogle`, {

//                     "accessToken": access_token,

//                 })
//                 .then((res) => {
//                     console.log("data--------->", res.data);
//                     const accessToken = res.headers['access_token'] || res.headers['authorization'];

//                     if (accessToken) {
//                         localStorage.setItem("token", accessToken);
//                         updateAuth({ accessToken });
//                         setProfile(res.data);
//                         toast.success("Google Login successful", {
//                             duration: 3000
//                         });
//                         setTimeout(() => navigate('/'), 2000);
//                     } else {
//                         toast.error("Login failed. Token not found.");
//                     }
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                     toast.success("You have signed up using your username and password.Please login with your credentials.", {
//                         duration: 3000
//                     });
//                 });
//         }
//     }, [user]);

//     const calculateStrength = (pass) => {
//         let strengthScore = 0;
//         if (pass.length > 5) strengthScore += 20;
//         if (pass.length >= 8) strengthScore += 20;
//         if (/[A-Z]/.test(pass)) strengthScore += 20;
//         if (/[a-z]/.test(pass)) strengthScore += 20;
//         if (/[0-9]/.test(pass)) strengthScore += 10;
//         if (/[^A-Za-z0-9]/.test(pass)) strengthScore += 10;
//         return strengthScore;
//     };

//     const handlePasswordChange = (e) => {
//         const newPassword = e.target.value;
//         setPassword(newPassword);
//         setStrength(calculateStrength(newPassword));
//     };

//     const getProgressColor = () => {
//         if (strength < 40) return "danger";
//         if (strength < 60) return "warning";
//         if (strength < 80) return "info";
//         return "success";
//     };



//     return (
//         <Layout>
//             <Helmet>
//                 <title>Signup</title>
//                 <meta name='description' content='Beginner friendly page for learning React Helmet.' />
//             </Helmet>
//             <section className="signup-section" style={{ background: "#F3F9FB" }}>
//                 <MDBContainer className="py-5 h-100">
//                     <h3 className='text-center mb-5' style={{ color: "#1E3E62" }}><i className="fas fa-bus me-3 fw-bold" style={{ color: "#0a4275" }} />BRTS </h3>
//                     <MDBRow className="d-flex align-items-center justify-content-center h-100">
//                         <MDBCol md="8" lg="6" xl="5">
//                             <MDBCard className="custom-card">
//                                 <MDBCardBody className="p-4">
//                                     <h3 className='text-center mb-5 fs-9 fw-bold' style={{ color: "#4379F2" }}>Register</h3>
//                                     <form onSubmit={handleSignup}>
//                                         <MDBRow>
//                                             <MDBCol md="6">
//                                                 <MDBInput wrapperClass="mb-4" value={fname} onChange={e => setName(e.target.value)} label="First Name" id="formFirstName" type="text" size="lg" autoComplete="given-name" />
//                                             </MDBCol>
//                                             <MDBCol md="6">
//                                                 <MDBInput wrapperClass="mb-4" value={lastName} onChange={e => setLastName(e.target.value)} label="Last Name" id="formLastName" type="text" size="lg" autoComplete="family-name" />
//                                             </MDBCol>
//                                         </MDBRow>
//                                         <MDBRow>
//                                             <MDBCol md="6">
//                                                 <MDBInput wrapperClass="mb-4" value={phone} onChange={e => setPhone(e.target.value)} label="Phone Number" id="formPhoneNumber" type="tel" size="lg" autoComplete="tel" />
//                                             </MDBCol>
//                                             <MDBCol md="6">
//                                                 <MDBInput wrapperClass="mb-4" value={email} onChange={e => setEmail(e.target.value)} label="Email address" id="formEmail" type="email" size="lg" autoComplete="email" />
//                                             </MDBCol>
//                                         </MDBRow>
//             <MDBInput
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 onFocus={() => setShowProgress(true)}
//                 onBlur={() => setShowProgress(false)}
//                 wrapperClass="py-2 mb-4 mt-2"
//             />
            
//             {/* Show progress bar if the user is focusing on the password field */}
//             {showProgress && (
//                 <MDBProgress className="mt-3">
//                     <MDBProgressBar
//                         width={strength}
//                         valuemin={0}
//                         valuemax={100}
//                         color={getProgressColor()}
//                     >
//                         {strength < 40 ? "Weak" : strength < 60 ? "Fair" : strength < 80 ? "Good" : "Strong"}
//                     </MDBProgressBar>
//                 </MDBProgress>
//             )}
//                                         <div className="d-flex align-items-center mt-3 justify-content-center">
//                                         <ReCAPTCHA
//                                             sitekey="6LfaPVMqAAAAAEiOoyL5MvKt0FpvHYHF9ZzeO8f5"
//                                             onChange={(token) => setCaptchaToken(token)}
//                                             className="mb-4"
//                                         />
//                                         </div>
//                                         <MDBBtn type="submit" disabled={isSubmitting || !captchaToken} style={{ background: "#4379F2", width: "100%" }}>
//                                             {isSubmitting ? "Signing up..." : "Sign up"}
//                                         </MDBBtn>
                                        
//                                     <div className="text-center my-4">
//                                         <span className="text-muted divider">Or sign in with</span>
//                                     </div>

//                                     <div className="text-center">
//                                         <>
//                                             <div className="text-center">
//                                                 <button data-mdb-ripple-init type="button" className="btn btn-secondary btn-floating mx-1">
//                                                     <i className="fab fa-facebook-f" />
//                                                 </button>
//                                                 <button data-mdb-ripple-init type="button" onClick={() => googleLogin()} className="btn btn-secondary btn-floating mx-1">
//                                                     <i className="fab fa-google" />
//                                                 </button>
//                                                 <button data-mdb-ripple-init type="button" className="btn btn-secondary btn-floating mx-1">
//                                                     <i className="fab fa-twitter" />
//                                                 </button>
//                                                 <button data-mdb-ripple-init type="button" className="btn btn-secondary btn-floating mx-1">
//                                                     <i className="fab fa-github" />
//                                                 </button>
//                                             </div>

//                                         </>
//                                     </div>
//                                         <p className="mt-4 fw-bold text-center">Already have an account? <Link to="/signin" className='text-decoration-underline' style={{ color: "#4379F2" }}>Log in</Link></p>
//                                     </form>
                                    
//                                 </MDBCardBody>
//                             </MDBCard>
//                         </MDBCol>
//                     </MDBRow>
//                 </MDBContainer>
//             </section>
//             <Toaster position="top-center" reverseOrder={false} />
//         </Layout>
//     );
// };

// export default Signup;

