import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/sopra_steria.png';
import NavLink from '@/components/NavLink';
import { PowerIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  activeTab: string;
}

const paths = {
  users: '/admin/users',
  challenges: '/admin/challenges',
  leaderboard: '/admin/leaderboard',
  teams: '/admin/teams',
  myAccount: '/profile'
};

const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <>
      <div className="static h-16 border-b-2 border-zinc-200 p-9">
        <div className="flex h-0 items-center justify-between">
          <div>
            <Link to="/admin">
              <img src={Logo} alt="Logo Sopra Steria" className="h-5 w-auto" />
            </Link>
          </div>

          <div className="flex-grow">
            <div className="mx-20 flex justify-center">
              <NavLink activeTab={activeTab} path={paths.users}>
                Utilisateurs
              </NavLink>
              <NavLink activeTab={activeTab} path={paths.teams}>
                Equipes
              </NavLink>
              <NavLink activeTab={activeTab} path={paths.challenges}>
                Exercices
              </NavLink>
            </div>
          </div>

          <div>
            <Link to={paths.myAccount}>
              <UserCircleIcon className="m-7 inline-block h-6 w-6"></UserCircleIcon>
            </Link>

            <button onClick={handleLogout}>
              <PowerIcon className="inline-block h-6 w-6"></PowerIcon>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
