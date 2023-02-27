import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { InlineChallengeLayoutProps } from '@/types/InlineChallengeLayoutProps';
import { activateOne, disableOne } from '@/utils/services/challenge.service';
import Button from '@/components/Button';

const InlineChallengeLayout: React.FC<InlineChallengeLayoutProps> = ({
  id,
  title,
  category,
  points,
  active
}) => {
  const [isChallengeActive, setIsChallengeActive] = React.useState(active);
  const navigate = useNavigate();

  const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('edit');
    navigate(`/admin/challenges/edit/${id}`);
  };

  const activeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const challenge = await activateOne(id);
      console.log(challenge);
      console.log(`active ${id}`);
      setIsChallengeActive(true);
    } catch (err) {
      console.log(err);
    }
  };

  const disableHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const challenge = await disableOne(id);
      console.log(challenge);
      console.log(`desactive ${id}`);
      setIsChallengeActive(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between items-center bg-slate-100 rounded px-4 py-2 mb-4">
      <div className="flex space-x-3">
        <p>{title}</p>
        <p>{category}</p>
        <p>{points}</p>
      </div>
      <div className="flex space-x-3">
        <Button
          id={id.toString()}
          type="submit"
          color={isChallengeActive ? 'red' : 'green'}
          onClick={isChallengeActive ? disableHandler : activeHandler}
        >
          {isChallengeActive ? 'Désactiver' : 'Activer'}
        </Button>

        <Button type="submit" color="orange" onClick={editHandler}>
          {'Editer'}
        </Button>
      </div>
    </div>
  );
};

export default InlineChallengeLayout;
