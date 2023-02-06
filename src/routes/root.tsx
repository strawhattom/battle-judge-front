import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Root: React.FC = () => {
  const token = localStorage.getItem('jwt');
  return (
    <>
      {token && <Navbar />}
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
