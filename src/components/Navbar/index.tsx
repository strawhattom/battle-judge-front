import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from '@/components/NavLink';
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
          <div className="flex justify-center mx-20">
            <NavLink activeTab={activeTab} path={paths.challenges}>
              Exercices
            </NavLink>
            <NavLink activeTab={activeTab} path={paths.leaderboard}>
              Classement
            </NavLink>
            <NavLink activeTab={activeTab} path={paths.teams}>
              Equipes
            </NavLink>
          </div>
        </div>

        <div>
          <NavLink activeTab={activeTab} path={paths.profile}>
            Profile
            <ChevronDownIcon className="w-5 h-5 inline-block rounded-full" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
