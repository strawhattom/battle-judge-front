import React from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LinearProgress } from '@mui/material';

const AdminRoutes: React.FC = () => {
  const { isAuth, user, loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) return <LinearProgress />;
  if (!isAuth) return <Navigate to="/login" />;
  if (user?.role !== 'admin') return <Navigate to="/" />;

  return (
    <>
      <AdminNavbar activeTab={pathname} />
      <Outlet />
    </>
  );
};

export default AdminRoutes;
