import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Root: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
