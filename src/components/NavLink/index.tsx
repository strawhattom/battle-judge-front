import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  activeTab: string;
  path: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ activeTab, path, children }) => {
  return (
    <Link
      className={`${
        activeTab === path ? 'text-gray-900' : 'text-gray-400'
      } mr-10 font-bold hover:text-gray-900`}
      to={path}
    >
      {children}
    </Link>
  );
};

export default NavLink;
