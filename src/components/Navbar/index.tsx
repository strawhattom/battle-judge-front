// On importe les dépendances nécessaires à la construction du composant
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavLink from '@/components/NavLink';
import Logo from '@/assets/images/sopra_steria.png';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Modal from 'react-modal';
import { useAuth } from '@/contexts/AuthContext';

const customStyles = {
  overlay: {
    background: 'none' // Style pour l'arrière-plan du Modal
  },
  content: {
    top: '15%',
    left: '89%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)'
  }
};
// On définit le type des propriétés passées au composant
interface NavbarProps {
  activeTab: string;
}

// On définit un objet qui contient les différents chemins utilisés dans le Navbar
const paths = {
  challenges: '/challenges',
  leaderboard: '/leaderboard',
  teams: '/teams',
  myTeam: '/myTeam',
  myAccount: '/profile'
};

// On crée le composant Navbar avec les propriétés passées en paramètre
const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    // On crée la structure du Navbar en utilisant les classes Tailwind CSS
    <div className="static h-16 border-b-2 border-zinc-200 p-9">
      <div className="flex h-0 items-center justify-between">
        <div>
          {/* On ajoute le logo Sopra Steria avec un lien qui ramène à la page d'accueil */}
          <Link className="navbar-item" to="/">
            <img src={Logo} alt="Logo Sopra Steria" className="h-5 w-auto" />
          </Link>
        </div>

        <div className="flex-grow">
          {/* On crée une liste de liens NavLink avec les différents onglets */}
          <div className="mx-20 flex justify-center">
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
          <button
            onClick={toggleModal}
            className={`${
              modalOpen ? 'text-gray-900' : 'text-gray-400'
            } mr-10 font-bold hover:text-gray-900`}
          >
            Profil
            <ChevronDownIcon className="inline-block h-5 w-5 rounded-full" />
          </button>
          <Modal
            isOpen={modalOpen}
            onRequestClose={toggleModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <p className="mb-2">
              <Link to={paths.myTeam}>Mon équipe</Link>
            </p>
            <p className="mb-2 border-b pb-2">
              <Link to={paths.myAccount}>Mon compte</Link>
            </p>
            <p>
              <button onClick={handleLogout}>Déconnexion</button>
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
