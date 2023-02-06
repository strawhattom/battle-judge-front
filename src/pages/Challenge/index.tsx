import React, { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import ChallengeLayout from '@/components/ChallengeLayout';
import type { ChallengeProps } from '@/types/ChallengeProps';
import { loadChallenges } from './challenge';

const tempChallenges: ChallengeProps[] = [
  {
    name: 'Facile',
    challenges: [
      { name: 'Exercice 1', points: 10, isCompleted: false },
      { name: 'Exercice 2', points: 15, isCompleted: true }
    ]
  },
  {
    name: 'Moyen',
    challenges: [
      { name: 'Exercice 3', points: 20, isCompleted: true },
      { name: 'Exercice 4', points: 25, isCompleted: false },
      { name: 'Exercice 5', points: 35, isCompleted: false },
      { name: 'Exercice 6', points: 40, isCompleted: true }
    ]
  },
  {
    name: 'Difficile',
    challenges: [
      { name: 'Exercice 7', points: 55, isCompleted: true },
      { name: 'Exercice 8', points: 65, isCompleted: true },
      { name: 'Exercice 9', points: 80, isCompleted: false }
    ]
  }
];

const Challenge: React.FC = () => {
  const [challenges, setChallenges] = useState<ChallengeProps[]>([]);

  useEffect(() => {
    setChallenges(tempChallenges);
  }, []);

  return (
    <div className="exercice-page">
      <h1>yo le gang</h1>
      {challenges.map((challenge, index) => (
        <ChallengeLayout
          key={index}
          name={challenge.name}
          challenges={challenge.challenges}
        />
      ))}
    </div>
  );
};

export default Challenge;
