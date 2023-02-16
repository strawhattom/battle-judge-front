import React from 'react';
import Challenge from './Challenge';
import './challenge2.css';
import type { ChallengeProps } from '@/types/ChallengeProps';

const ChallengeLayout: React.FC<ChallengeProps> = (props) => {
  return (
    <div style={{ margin: '30px' }}>
      <h2>{props.name}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
