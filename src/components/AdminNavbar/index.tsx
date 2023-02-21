import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/images/sopra_steria.png';
import '@/assets/css/palette.css';

interface NavbarProps {
  activeTab: string;
}

const paths = {
  users: '/admin/users',
  challenges: '/admin/challenges',
  leaderboard: '/admin/leaderboard',
  teams: '/admin/teams'
};

const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link className="navbar-item" to="/">
          <img src={Logo} alt="Logo Sopra Steria" />
        </Link>
      </div>
      <div className="navbar-pages">
        <Link
          className={`navbar-item ${activeTab === paths.users ? 'active' : ''}`}
          to={paths.users}
        >
          Utilisateurs
        </Link>
        <Link
          className={`navbar-item ${activeTab === paths.teams ? 'active' : ''}`}
          to={paths.teams}
        >
          Equipes
        </Link>
        <Link
          className={`navbar-item ${
            activeTab === paths.challenges ? 'active' : ''
          }`}
          to={paths.challenges}
        >
          Exercices
        </Link>
        <Link
          className={`navbar-item ${
            activeTab === paths.leaderboard ? 'active' : ''
          }`}
          to={paths.leaderboard}
        >
          Tableau de bord
        </Link>
      </div>
      <div className="navbar-right">
        {
          // empty
        }
      </div>
    </div>
  );
};

export default Navbar;
