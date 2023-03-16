import React, { useState } from 'react';
import {
  Chart,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import ScoreGraph from '@/components/ScoreGraph';

// On enregistre les composants Chart.js qu'on va utiliser
Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);

const Leaderboard = () => {
  // On initialise notre state avec un tableau contenant des objets de données
  const [tableData, setTableData] = useState([
    { rank: 1, name: 'Team A', points: 20 },
    { rank: 2, name: 'Team B', points: 18 },
    { rank: 3, name: 'Team C', points: 15 },
    { rank: 4, name: 'Team D', points: 12 },
    { rank: 5, name: 'Team E', points: 8 },
    { rank: 6, name: 'Team F', points: 5 },
    { rank: 7, name: 'Team G', points: 2 }
  ]);

  return (
    <div>
      <h1 className="text-4xl text-center mt-8 mb-8 font-bold">Classement</h1>
      <div className="flex justify-center m-12">
        <ScoreGraph />{' '}
        {/* On appelle un composant ScoreGraph qui n'est pas inclus dans ce code */}
      </div>
      <div className="flex justify-center ">
        <table className="  text-center  w-1/2 ">
          <thead className=" text-gray-900  bg-gray-300 ">
            <tr>
              <th className="py-2">Rang</th>
              <th>Nom</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((team, index) => (
              // On boucle sur notre tableau de données et on affiche chaque ligne du tableau avec les données de chaque objet
              <tr key={index} className="border-b">
                <td className="py-2">{team.rank}</td>
                <td>{team.name}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
