import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import {
  Chart,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import ScoreGraph from '@/components/ScoreGraph/scoregraph';

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

  const chartData = {
    labels: [
      'Heure 1',
      'Heure 2',
      'Heure 3',
      'Heure 4',
      'Heure 5',
      'Heure 6',
      'Heure 7'
    ],
    datasets: [
      {
        label: 'Points',
        data: [20, 18, 15, 12, 8, 5, 2],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Points'
        }
      }
    }
  };

  return (
    <div>
      <h1>Classement</h1>
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
