import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/sopra_steria.png';
import '../../assets/css/palette.css';
import './navbar.css';
import type { NavbarProps } from '../../types/NavbarProps';

const Navbar: React.FC<NavbarProps> = (props) => {
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="Logo Sopra Steria" />
        </Link>
      </div>
      <div className="navbar-pages">
        <Link
          className={activeTab === '/challenges' ? 'active' : ''}
          to="/challenges"
        >
          Exercices
        </Link>
        <Link
          className={activeTab === '/leaderboard' ? 'active' : ''}
          to="/leaderboard"
        >
          Classement
        </Link>
        <Link className={activeTab === '/teams' ? 'active' : ''} to="/teams">
          Equipes
        </Link>
      </div>
      <div className="navbar-right">
        {props?.user !== undefined ? (
          <>
            <Link
              className={activeTab === '/profile' ? 'active' : ''}
              to="/profile"
            >
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link
              className={activeTab === '/login' ? 'active' : ''}
              to="/login"
            >
              Login
            </Link>
            <Link
              className={activeTab === '/register' ? 'active' : ''}
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
