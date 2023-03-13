import React from 'react';
import { useNavigate } from 'react-router-dom';
import { activateOne, disableOne } from '@/utils/services/challenge.service';
import Button from '@/components/Button';

// On définit les types des propriétés passées au composant
export type InlineChallengeLayoutProps = {
  id: number;
  title: string;
  category: string;
  points: number;
  active: true | false;
};

const InlineChallengeLayout: React.FC<InlineChallengeLayoutProps> = ({
  id,
  title,
  category,
  points,
  active
}) => {
  // On utilise le hook useState pour gérer l'état d'activation du challenge
  const [isChallengeActive, setIsChallengeActive] = React.useState(active);

  // On utilise le hook useNavigate pour pouvoir rediriger vers une autre page
  const navigate = useNavigate();

  // Gestionnaire d'événement du bouton 'edit'
  const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('edit');
    navigate(`/admin/challenges/edit/${id}`);
  };

  // Gestionnaire d'événement du bouton 'Activer'
  const activeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // On active le challenge
      const challenge = await activateOne(id);
      if (challenge) {
        console.log(`enable ${id}`);
        setIsChallengeActive(true);
      } else {
        throw new Error('Could not enable challenge');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Gestionnaire d'événement du bouton 'Désactiver'
  const disableHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // On désactive le challenge
      const challenge = await disableOne(id);
      if (challenge) {
        console.log(`disable ${id}`);
        setIsChallengeActive(false);
      } else {
        throw new Error('Could not disable challenge');
      }
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
