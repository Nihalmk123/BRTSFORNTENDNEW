import React from 'react';
import { useAuth } from '../Context/Context';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';
import { toast } from 'react-toastify';

const AdminRoute = () => {
  const { auth } = useAuth();

  return auth?.authorities?.includes("ROLE_ADMIN") ? (
    <AdminDashboard />
  ) : (
    <>
    toast.success("Sorry You Dont have Admin authorities")
    <Navigate to="/notfound" />
    </>
  );
};

export default AdminRoute;
