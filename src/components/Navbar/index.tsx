import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/images/sopra_steria.png';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  activeTab: string;
}

const paths = {
  challenges: '/challenges',
  leaderboard: '/leaderboard',
  teams: '/teams',
  profile: '/profile'
};

const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  return (
    <div className="h-16 static p-9 border-b-2 border-zinc-200">
      <div className="flex items-center justify-between h-0">
        <div>
          <Link className="navbar-item" to="/">
            <img src={Logo} alt="Logo Sopra Steria" className="w-auto h-5" />
          </Link>
        </div>

        <div className="flex-grow">
          <div className="flex justify-center mr-20">
            <Link
              className={`text-gray-700 mr-10 ${
                activeTab === paths.challenges ? 'font-bold' : ''
              }`}
              to={paths.challenges}
            >
              Exercices
            </Link>
            <Link
              className={`text-gray-700 mr-10 ${
                activeTab === paths.leaderboard ? 'font-bold' : ''
              }`}
              to={paths.leaderboard}
            >
              Classement
            </Link>
            <Link
              className={`text-gray-700 mr-10 ${
                activeTab === paths.teams ? 'font-bold' : ''
              }`}
              to={paths.teams}
            >
              Equipes
            </Link>
          </div>
        </div>

        <div>
          <Link
            className={`text-gray-700 ${
              activeTab === paths.profile ? 'font-bold' : ''
            }`}
            to={paths.profile}
          >
            Profile <ChevronDownIcon className="w-5 h-5 inline-block" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
