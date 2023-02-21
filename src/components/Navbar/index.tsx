import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/images/sopra_steria.png';
import '@/assets/css/palette.css';

interface NavbarProps {
  activeTab: string;
  isAdmin: boolean;
}

const paths = {
  challenges: '/challenges',
  leaderboard: '/leaderboard',
  teams: '/teams',
  admin: '/admin',
  profile: '/profile'
};

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
          Classement
        </Link>
        <Link
          className={`navbar-item ${activeTab === paths.teams ? 'active' : ''}`}
          to={paths.teams}
        >
          Equipes
        </Link>
      </div>
      <div className="navbar-right">
        {isAdmin && (
          <Link
            className={`navbar-item ${
              activeTab === paths.admin ? 'active' : ''
            }`}
            to={paths.admin}
          >
            Admin
          </Link>
        )}
        <Link
          className={`navbar-item ${
            activeTab === paths.profile ? 'active' : ''
          }`}
          to={paths.profile}
        >
          Profil
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
