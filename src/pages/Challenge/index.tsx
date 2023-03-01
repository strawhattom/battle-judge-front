import React from 'react';
import { useLoaderData } from 'react-router-dom';
import type { BulkChallengeBattle } from '@/types/ChallengeProps';
import { ChallengeLayout } from '@/components';

const Challenge: React.FC = () => {
  const challenges = useLoaderData() as BulkChallengeBattle;

  return (
    <>
      <h1 className="text-4xl text-center mt-8 mb-8 font-bold">Battle</h1>
      {Object.keys(challenges).length === 0 ? (
        <p> Pas de challenge actif </p>
      ) : (
        Object.keys(challenges).map((key, index) => (
          <ChallengeLayout
            key={index}
            category={key}
            challenges={challenges[key]}
          />
        ))
      )}
    </>
  );
};

export default Challenge;
