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

const colors = ['#8884d8', '#82ca9d', '#ffc658']; // Array of colors for each team

interface TeamData {
  [team: string]: {
    team: string;
    time: string;
    score: number;
  }[];
}

const ScoreGraph = () => {
  // Group data by team
  const teamData: TeamData = {};
  const times = new Set();
  data.forEach((item) => {
    if (!teamData[item.team]) {
      teamData[item.team] = [];
    }
    times.add(item.time);
    teamData[item.team].push(item);
  });

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

  const timeList = Array.from(times);

  return (
    <LineChart width={600} height={300}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
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
