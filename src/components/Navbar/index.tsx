// On importe les dépendances nécessaires à la construction du composant
import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from '@/components/NavLink';
import Logo from '@/assets/images/sopra_steria.png';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// On définit le type des propriétés passées au composant
interface NavbarProps {
  activeTab: string;
}

// On définit un objet qui contient les différents chemins utilisés dans le Navbar
const paths = {
  challenges: '/challenges',
  leaderboard: '/leaderboard',
  teams: '/teams',
  profile: '/profile'
};

// On crée le composant Navbar avec les propriétés passées en paramètre
const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  return (
    // On crée la structure du Navbar en utilisant les classes Tailwind CSS
    <div className="h-16 static p-9 border-b-2 border-zinc-200">
      <div className="flex items-center justify-between h-0">
        <div>
          {/* On ajoute le logo Sopra Steria avec un lien qui ramène à la page d'accueil */}
          <Link className="navbar-item" to="/">
            <img src={Logo} alt="Logo Sopra Steria" className="w-auto h-5" />
          </Link>
        </div>

        <div className="flex-grow">
          {/* On crée une liste de liens NavLink avec les différents onglets */}
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
          {/* On ajoute un lien NavLink pour le profil avec une flèche vers le bas */}
          <NavLink activeTab={activeTab} path={paths.profile}>
            Profil
            <ChevronDownIcon className="w-5 h-5 inline-block rounded-full" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
