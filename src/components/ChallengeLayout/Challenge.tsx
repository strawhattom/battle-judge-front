import React from 'react';
import './challenge.css';
import type { ChallengeLayoutProps } from '../../types/ChallengeLayoutProps';

const Challenge: React.FC<ChallengeLayoutProps> = (props) => {
  return (
    <div className={`exercise ${props.isCompleted ? 'completed' : ''}`}>
      <h6>{props.name}</h6>
      <p>{props.points}</p>
    </div>
  );
};

export default Challenge;
