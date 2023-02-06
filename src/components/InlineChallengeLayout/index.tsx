import React from 'react';
import './inlineChallenge.css';
import type { InlineChallengeLayoutProps } from '@/types/InlineChallengeLayoutProps';

const InlineChallengeLayout: React.FC<InlineChallengeLayoutProps> = ({
  title,
  category,
  points,
  active
}) => {
  return (
    <div className="inline-challenge">
      <div className="inline-description">
        <p>{title}</p>
        <p>{category}</p>
        <p>{points}</p>
      </div>
      <div className="inline-buttons">
        <button className={`inline-button ${active ? 'active' : ''}`}>
          {active ? 'Désactiver' : 'Activer'}
        </button>
      </div>
    </div>
  );
};

export default InlineChallengeLayout;
