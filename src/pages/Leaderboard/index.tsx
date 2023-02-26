import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { ChartOptions } from 'chart.js';
import {
  Chart,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import ScoreGraph from '@/components/ScoreGraph';

Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);

const Leaderboard = () => {
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
      <ScoreGraph />
      <table>
        <thead>
          <tr>
            <th>Rang</th>
            <th>Nom</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((team, index) => (
            <tr key={index}>
              <td>{team.rank}</td>
              <td>{team.name}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
