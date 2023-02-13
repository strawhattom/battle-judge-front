import React from 'react';
import './inlineChallenge.css';
import type { InlineChallengeLayoutProps } from '@/types/InlineChallengeLayoutProps';
import Button from '@/components/Button';

const InlineChallengeLayout: React.FC<InlineChallengeLayoutProps> = ({
  title,
  category,
  points,
  active
}) => {
  const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('edit');
  };

  const activeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('active or desactive');
  };

  return (
    <div className="inline-challenge">
      <div className="inline-description">
        <p>{title}</p>
        <p>{category}</p>
        <p>{points}</p>
      </div>
      <div className="inline-buttons">
        <Button
          type="submit"
          color={active ? 'red' : 'green'}
          onClick={activeHandler}
        >
          {active ? 'Désactiver' : 'Activer'}
        </Button>

        <Button type="submit" color="orange" onClick={editHandler}>
          {'Editer'}
        </Button>
      </div>
    </div>
  );
};

export default InlineChallengeLayout;
