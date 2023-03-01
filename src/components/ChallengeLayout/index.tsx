import React from 'react';
import Challenge from './Challenge';
import type { ChallengeBattleProps } from '@/types/ChallengeProps';

type ChallengeLayoutProps = {
  category: string;
  challenges: ChallengeBattleProps[];
};

const ChallengeLayout: React.FC<ChallengeLayoutProps> = ({
  challenges,
  category
}) => {
  return (
    <div className="m-10">
      <h2 className="text-xl font-bold">{category}</h2>
      <div className="flex flex-wrap">
        {challenges.map((challenge, index) => (
          <Challenge
            key={index}
            points={challenge.points}
            isCompleted={challenge.isCompleted}
            title={challenge.title}
            description={challenge.description}
            category={challenge.category}
            author={challenge.author}
            id={challenge.id}
            _id={challenge._id}
            // handleFile={challenge.handleFile}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengeLayout;
