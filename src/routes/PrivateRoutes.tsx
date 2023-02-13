import React from 'react';
import Navbar from '@/components/Navbar';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const PrivateRoutes: React.FC = () => {
  const { user, isAuth } = useAuth();
  const { pathname } = useLocation();

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
