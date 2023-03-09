import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Exemple de données pour les graphiques
const data = [
  { team: 'Team A', time: '10:00', score: 10 },
  { team: 'Team A', time: '11:00', score: 15 },
  { team: 'Team A', time: '12:00', score: 18 },
  { team: 'Team A', time: '13:00', score: 28 },
  { team: 'Team B', time: '10:00', score: 15 },
  { team: 'Team B', time: '11:00', score: 18 },
  { team: 'Team B', time: '12:00', score: 20 },
  { team: 'Team B', time: '13:00', score: 22 },
  { team: 'Team C', time: '10:00', score: 12 },
  { team: 'Team C', time: '11:00', score: 16 },
  { team: 'Team C', time: '12:00', score: 18 },
  { team: 'Team C', time: '13:00', score: 20 }
];

// Couleurs utilisées pour chaque équipe
const colors = ['#8884d8', '#82ca9d', '#ffc658'];

// Type pour les données de chaque équipe, qui sont stockées dans un objet indexé par équipe
interface TeamData {
  [team: string]: {
    team: string;
    time: string;
    score: number;
  }[];
}

const ScoreGraph = () => {
  // Regrouper les données par équipe
  const teamData: TeamData = {};
  const times = new Set();
  data.forEach((item) => {
    if (!teamData[item.team]) {
      teamData[item.team] = [];
    }
    times.add(item.time);
    teamData[item.team].push(item);
  });

  // Créer une ligne pour chaque équipe
  const lines = Object.keys(teamData).map((team, index) => {
    return (
      <Line
        key={team}
        type="monotone"
        dataKey="score"
        data={teamData[team]}
        stroke={colors[index]}
        activeDot={{ r: 8 }}
        name={team}
      />
    );
  });

  // Créer une liste ordonnée des horaires dans les données
  const timeList = Array.from(times);

  return (
    // Composant graphique avec les axes, grille, légende, tooltip et les lignes pour chaque équipe
    <LineChart width={600} height={300}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        // Filtrer les horaires dupliqués pour les afficher sur l'axe des X
        ticks={
          timeList.filter(
            (value, index, self) => self.indexOf(value) === index
          ) as (string | number)[]
        }
      />
      <YAxis />
      <Tooltip />
      <Legend />
      {lines}
    </LineChart>
  );
};

export default ScoreGraph;
