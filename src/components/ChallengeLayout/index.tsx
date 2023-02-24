import React from 'react';
import Challenge from './Challenge';
import type { ChallengeProps } from '@/types/ChallengeProps';

const ChallengeLayout: React.FC<ChallengeProps> = (props) => {
  return (
    <div className="m-10">
      <h2 className="text-xl font-bold">{props.name}</h2>
      <div className="flex flex-wrap">
        {props.challenges.map((challenge, index) => (
          <Challenge
            key={index}
            name={challenge.name}
            points={challenge.points}
            isCompleted={challenge.isCompleted}
            title={challenge.title}
            description={challenge.description}
            category={challenge.category}
            handleFile={challenge.handleFile}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengeLayout;
