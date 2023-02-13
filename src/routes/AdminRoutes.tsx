import React from 'react';
import Navbar from '@/components/Navbar';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminRoutes: React.FC = () => {
  const { isAuth, user } = useAuth();
  const { pathname } = useLocation();

  if (!isAuth) return <Navigate to="/login" />;
  if (user?.role !== 'admin') return <Navigate to="/" />;

  return (
    <>
      <Navbar activeTab={pathname} isAdmin={true} />
      <Outlet />
    </>
  );
};

export default AdminRoutes;
