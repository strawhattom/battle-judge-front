import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

type Team = {
  id: string;
  name: string;
  description: string;
  score: number;
};

type TeamProps = {
  id: string;
  name: string;
};

type BattleTeamsResponse = {
  teams: Team[];
};

// Définition d'un objet qui simule une réponse d'API pour afficher des équipes en attendant la réponse réelle
const responseMeanwhile: BattleTeamsResponse = {
  teams: [
    {
      id: '1',
      name: 'Équipe Alpha',
      description: 'Une équipe de programmeurs chevronnés',
      score: 1200
    },
    {
      id: '2',
      name: 'Équipe Beta',
      description: 'Une équipe de débutants motivés',
      score: 800
    },
    {
      id: '3',
      name: 'Équipe Gamma',
      description: 'Une équipe de hackers éthiques',
      score: 1500
    }
  ]
};

const Team = (props: TeamProps) => {
  // Définition d'un état pour stocker les équipes récupérées depuis l'API
  const [teams, setTeams] = useState<Team[]>([]);

  // Utilisation de useEffect pour effectuer une action à chaque fois que l'id des équipes change
  useEffect(() => {
    // Simulation d'un appel à une API pour récupérer les équipes
    setTeams(responseMeanwhile.teams);
  }, [props.id]);

  return (
    <div className="team-container">
      <h1 className="text-4xl text-center mt-8 mb-8 font-bold">Equipes</h1>
      {/* Affichage de chaque équipe dans une carte */}
      {teams.map((team) => (
        <div key={team.id} className="team-card">
          <Link to={`/team/${team.name}`}>
            <div className="team-card-body">
              <h2 className="team-card-title">{team.name}</h2>
              <p className="team-card-description">{team.description}</p>
              <p className="team-card-score">Score: {team.score}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Team;

//   const fetchTeams = async () => {
//     try {
//       const response = await fetch(`https://localhost:8884/${props.match.params.id}/teams`);
//       const data = await response.json();
//       setTeams(data.teams);
//     } catch (error) {
//       console.error(`Une erreur est survenue: ${error}`);
//     }
//   };
//   fetchTeams();
