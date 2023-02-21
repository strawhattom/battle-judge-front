import React from 'react';
import Navbar from '@/components/Navbar';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LinearProgress } from '@mui/material';

const PrivateRoutes: React.FC = () => {
  const { user, isAuth, loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) return <LinearProgress />;
  if (!isAuth) return <Navigate to="/login" />;

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <Navbar activeTab={pathname} isAdmin={isAdmin} />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
