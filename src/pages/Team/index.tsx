import React, { useState, useEffect } from 'react';

type Team = {
  id: string;
  name: string;
  description: string;
  score: number;

  teamMemberName: string[];
  teamMemberScore: number[];
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
      score: 1200,
      teamMemberName: ['John', 'Alice', 'Bob', 'Eve', 'Charlie'],
      teamMemberScore: [14, 22, 73, 14, 95]
    },
    {
      id: '2',
      name: 'Équipe Beta',
      description: 'Une équipe de débutants motivés',
      score: 800,
      teamMemberName: ['Dorian', 'Paul', 'Catherine', 'Leo', 'Charles'],
      teamMemberScore: [29, 11, 30, 3, 98]
    },
    {
      id: '3',
      name: 'Équipe Gamma',
      description: 'Une équipe de hackers éthiques',
      score: 1500,
      teamMemberName: ['Kevin', 'Clara', 'Thomas', 'Eleonore', 'David'],
      teamMemberScore: [11, 20, 53, 24, 85]
    }
  ]
};

const Team = (props: TeamProps) => {
  // Définition d'un état pour stocker les équipes récupérées depuis l'API
  const [teams, setTeams] = useState<Team[]>([]);

  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined);

  const handleRowClick = (team: Team) => {
    setSelectedTeam(team);
  };

  // Utilisation de useEffect pour effectuer une action à chaque fois que l'id des équipes change
  useEffect(() => {
    // Simulation d'un appel à une API pour récupérer les équipes
    setTeams(responseMeanwhile.teams);
  }, [props.id]);

  return (
    <>
      <h1 className="mt-8 mb-8 text-center text-4xl font-bold">Equipes</h1>
      <div className="grid grid-cols-3 ">
        {/* Affichage de chaque équipe dans une carte */}
        <div className="col-span-2 ">
          <div className="flex justify-center ">
            <table className="  w-9/12  text-center ">
              <thead className=" border-b text-gray-900 ">
                <tr>
                  <th className="w-8/12 py-2 ">Nom</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  // On boucle sur notre tableau de données et on affiche chaque ligne du tableau avec les données de chaque objet
                  <tr
                    key={index}
                    className="cursor-pointer border-b "
                    onClick={() => handleRowClick(team)}
                  >
                    <td className=" border-r py-2 pl-16 text-left">
                      {team.name}
                    </td>
                    <td className="pr-10 text-right">{team.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedTeam && (
          <div className="mt-4 p-4">
            <h2 className="text-lg font-bold">{selectedTeam.name}</h2>
            <div className="mr-28 grid grid-cols-2">
              <div className="mt-2 flex-col">
                <p className="border-b pl-10"> Membre</p>
                {selectedTeam.teamMemberName.map((member: string) => (
                  <p className="border-r pl-6">{member}</p>
                ))}
              </div>
              <div className="mt-2 flex-col">
                <p className="border-b pr-10 text-right"> Score</p>
                {selectedTeam.teamMemberScore.map((score: number) => (
                  <p className="pr-6 text-right">{score}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
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
