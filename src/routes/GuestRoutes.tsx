import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LinearProgress } from '@mui/material';

const GuestRoutes: React.FC = () => {
  const { isAuth, loading } = useAuth();

  if (loading) return <LinearProgress />;
  if (isAuth) return <Navigate to="/" replace={true} />;
  return <Outlet />;
};

export default GuestRoutes;
