import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Components/Context/Context'; // Assuming you have an Auth context

const GoogleCallback = () => {
    const navigate = useNavigate();
    const { updateAuth } = useAuth();

    useEffect(() => {
        const handleGoogleAuth = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get('code');

            if (code) {
                try {
                    // Exchange authorization code for tokens via backend
                    const response = await axios.post('http://your-backend-server.com/google-auth-callback', { code });

                    // Assuming the response contains access token
                    const { accessToken } = response.data;

                    // Store token in local storage and update the auth context
                    localStorage.setItem('token', accessToken);
                    updateAuth({ accessToken });

                    // Redirect to home page or any protected route
                    navigate('/');
                } catch (error) {
                    console.error('Google Auth Error:', error);
                }
            }
        };

        handleGoogleAuth();
    }, [navigate, updateAuth]);

    return <div>Redirecting...</div>;
};

export default GoogleCallback;
