import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/images/sopra_steria.png';
import '@/assets/css/palette.css';
import './navbar.css';

interface NavbarProps {
  activeTab: string;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, isAdmin }) => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link className="navbar-item" to="/">
          <img src={Logo} alt="Logo Sopra Steria" />
        </Link>
      </div>
      <div className="navbar-pages">
        <Link
          className={`navbar-item ${
            activeTab === '/challenges' ? 'active' : ''
          }`}
          to="/challenges"
        >
          Exercices
        </Link>
        <Link
          className={`navbar-item ${
            activeTab === '/leaderboard' ? 'active' : ''
          }`}
          to="/leaderboard"
        >
          Classement
        </Link>
        <Link
          className={`navbar-item ${activeTab === '/teams' ? 'active' : ''}`}
          to="/teams"
        >
          Equipes
        </Link>
        {isAdmin && (
          <Link
            className={`navbar-item ${activeTab === '/admin' ? 'active' : ''}`}
            to="/admin"
          >
            Dashboard
          </Link>
        )}
      </div>
      <div className="navbar-right navbar-item ">
        <Link
          className={activeTab === '/profile' ? 'active' : ''}
          to="/profile"
        >
          Profil
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
