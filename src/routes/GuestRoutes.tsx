import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LinearProgress } from '@mui/material';

const GuestRoutes: React.FC = () => {
  const { user, isAuth, loading } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (loading) return <LinearProgress />;
  if (isAdmin) {
    if (isAuth) return <Navigate to="/admin" replace={true} />;
  } else {
    if (isAuth) return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
};

export default GuestRoutes;
