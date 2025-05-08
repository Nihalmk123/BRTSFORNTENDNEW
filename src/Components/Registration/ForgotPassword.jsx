import React, { useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Typography,
    TextField,
    Button,
    Container,
    Paper,
    IconButton,
    InputAdornment
} from '@mui/material';
import {
    Email,
    Lock,
    CheckCircle,
    Visibility,
    VisibilityOff,
    Phone
} from '@mui/icons-material';
import ReCAPTCHA from 'react-google-recaptcha';
import Layout from '../../../src/Components/Layout/Layout'
import { useAxiosWithInterceptor } from '../Api/Axios';
import { useAuth } from '../Context/Context';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';


const ForgotPassword = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [emailOtp, setEmailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(false);
    const [isStepValid, setIsStepValid] = useState(false);


    const steps = ['Email Verification', 'OTP Verification', 'Reset Password'];

    const api = useAxiosWithInterceptor()
    const { auth } = useAuth()

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);

    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNext();
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // forgot Password send otp
    const forgotPassword = async (e) => {
        e.preventDefault();
        console.log(email, phone, captchaToken);

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.", {
                duration: 3000
            });
            return;
        }

        if (phone.length !== 10) {
            console.error("Phone number must be exactly 10 digits.");
            toast.error("Phone number must be exactly 10 digits.", {
                duration: 3000
            });
            return;
        }

        try {
            const response = await api.post(
                '/tsn/v1/forgot-password/sendOTP',
                {
                    email: email,
                    phoneNumber: phone,
                    token: captchaToken,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Success Response:", response);
            alert(`Success: ${JSON.stringify(response.data)}`);
            handleNext();
        } catch (error) {
            console.error("Error Response:", error);

            if (error.response) {
                console.error("Server Response:", error.response.data);
                alert(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error("Unexpected Error:", error.message);
                alert(`Unexpected Error: ${error.message}`);
            }
        }
    };

    // forgot password verify otp
    const forgotPasswordVerifyOTP = async (e) => {
        e.preventDefault();
        console.log(email, phone, captchaToken, emailOtp, mobileOtp);

        try {
            const response = await api.post(
                '/tsn/v1/forgot-password/verify-otp',
                {
                    email: email,
                    phoneNumber: phone,
                    token: captchaToken,
                    phoneOtp: mobileOtp,
                    emailOtp: emailOtp
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Success Response:", response);
            alert(`Success: ${JSON.stringify(response.data)}`);
            handleNext();
        } catch (error) {
            console.error("Error Response:", error);

            if (error.response) {
                console.error("Server Response:", error.response.data);
                alert(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error("Unexpected Error:", error.message);
                alert(`Unexpected Error: ${error.message}`);
            }
        }
    };

    // forgot password new password
    const forgotPasswordNewPassword = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        console.log(email, phone, captchaToken, emailOtp, mobileOtp);

        try {
            const response = await api.post(
                '/tsn/v1/forgot-password/update-password',
                {
                    email: email,
                    phoneNumber: phone,
                    token: captchaToken,
                    phoneOtp: mobileOtp,
                    emailOtp: emailOtp,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Success Response:", response);
            alert(`Success: ${JSON.stringify(response.data)}`);
        } catch (error) {
            console.error("Error Response:", error);

            if (error.response) {
                console.error("Server Response:", error.response.data);
                alert(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error("Unexpected Error:", error.message);
                alert(`Unexpected Error: ${error.message}`);
            }
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box component="form" onSubmit={forgotPassword} sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom align="center">
                            Forgot Password?
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
                            Enter your email to receive verification code
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="outlined"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                type="text"
                                required
                                value={phone}
                                inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
                                onChange={(e) => {
                                    const inputValue = e.target.value.replace(/\D/g, '');
                                    if (inputValue.length <= 10) {
                                        setPhone(inputValue);
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <div className="captcha-container">
                            <ReCAPTCHA
                                sitekey="6LfaPVMqAAAAAEiOoyL5MvKt0FpvHYHF9ZzeO8f5"
                                onChange={token => {
                                    setCaptchaToken(token)
                                }}
                            />
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 2 }}
                            onClick={forgotPassword}
                        >
                            Send Verification Code
                        </Button>
                    </Box>
                );

            case 1:
                return (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom align="center">
                            Enter Verification Code
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
                            We've sent a code to {email} and {phone}
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="outlined"
                                type="email"
                                required
                                disabled
                                value={email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                type="number"
                                required
                                disabled
                                value={phone}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label="Email Verification Code"
                                variant="outlined"
                                required
                                value={emailOtp}
                                onChange={(e) => setEmailOtp(e.target.value)}
                                inputProps={{ maxLength: 6 }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Phone Verification Code"
                                variant="outlined"
                                required
                                value={mobileOtp}
                                onChange={(e) => setMobileOtp(e.target.value)}
                                inputProps={{ maxLength: 6 }}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <div className="captcha-container">
                            <ReCAPTCHA
                                sitekey="6LfaPVMqAAAAAEiOoyL5MvKt0FpvHYHF9ZzeO8f5"
                                onChange={token => {
                                    setCaptchaToken(token)
                                }}
                            />
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 2 }}
                            onClick={forgotPasswordVerifyOTP}
                        >
                            Verify Code
                        </Button>
                        <Button
                            fullWidth
                            color="primary"
                            sx={{ mt: 1 }}
                        >
                            Resend Code
                        </Button>
                    </Box>
                );

            case 2:
                return (
                    <Box component="form" sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom align="center">
                            Reset Password
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
                            Create your new password
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="outlined"
                                type="email"
                                required
                                disabled
                                value={email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                type="number"
                                required
                                disabled
                                value={phone}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label="Email Verification Code"
                                variant="outlined"
                                required
                                disabled
                                value={emailOtp}
                                inputProps={{ maxLength: 6 }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Phone Verification Code"
                                variant="outlined"
                                required
                                disabled
                                value={mobileOtp}
                                inputProps={{ maxLength: 6 }}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            label="New Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            variant="outlined"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />
                        <div className="captcha-container">
                            <ReCAPTCHA
                                sitekey="6LfaPVMqAAAAAEiOoyL5MvKt0FpvHYHF9ZzeO8f5"
                                onChange={token => {
                                    setCaptchaToken(token)
                                }}
                            />
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 2 }}
                            onClick={forgotPasswordNewPassword}
                        >
                            Reset Password
                        </Button>
                    </Box>
                );

            case 3:
                return (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="outlined"
                                type="email"
                                disabled
                                value={email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                type="number"
                                disabled
                                value={phone}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            gap={2}
                        >
                            <TextField
                                fullWidth
                                label="Email Verification Code"
                                variant="outlined"
                                disabled
                                value={emailOtp}
                                inputProps={{ maxLength: 6 }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Phone Verification Code"
                                variant="outlined"
                                disabled
                                value={mobileOtp}
                                inputProps={{ maxLength: 6 }}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Password Reset Successfully
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            Your password has been reset successfully
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={() => console.log('Navigate to login')}
                        >
                            Back to Login
                        </Button>
                    </Box>
                );

            default:
                return 'Unknown step';
        }
    };

    return (
        <Layout>
            <Helmet>
                <title>Forgot password</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <h1 className='text-center mt-5'>Reset Password</h1>
            <Container component="main" maxWidth="sm" sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                // py: 4
            }}>
                <Paper elevation={3} sx={{ width: '100%', p: 4 }}>
                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            Previous
                        </Button>
                        {activeStep !== steps.length - 1 && (
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={!isStepValid}
                            >
                                Next
                            </Button>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Layout>

    );
};

export default ForgotPassword;
