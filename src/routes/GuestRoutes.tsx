import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const GuestRoutes: React.FC = () => {
  const { isAuth } = useAuth();
  React.useEffect(() => {
    console.log(isAuth);
  }, []);
  if (isAuth) return <Navigate to="/" replace={true} />;
  return <Outlet />;
};

export default GuestRoutes;
