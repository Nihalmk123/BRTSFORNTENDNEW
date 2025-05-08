import { useAuth } from '../../Components/Context/Context';
import { Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Snackbar from 'awesome-snackbar';
import { useEffect, useRef, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  
  if (!auth.accessToken) {
    new Snackbar(`Please Log in to access this resource`, {
      position: 'top-center', timeout: 1000
  });
    return <Navigate to="/signin" />;
  }

  // If authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;




























// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//     const { auth } = useAuth(); 
//     const isAuthenticated = !!auth.accessToken; 

//     return isAuthenticated ? children : <Navigate to="/signin" />;
// };

// export default ProtectedRoute;
