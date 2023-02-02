import React from 'react';
import Challenge from './Challenge';
import './challenge.css';
import type { ChallengeProps } from '../../types/ChallengeProps';

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
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengeLayout;
