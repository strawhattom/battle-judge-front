import React from 'react';
import Challenge from './Challenge';
import type { ChallengeBattleProps } from '@/types/ChallengeProps';

type ChallengeLayoutProps = {
  category: string; // Le nom de la catégorie de défis
  challenges: ChallengeBattleProps[]; // Un tableau d'objets ChallengeBattleProps qui représentent les défis de cette catégorie
};

const ChallengeLayout: React.FC<ChallengeLayoutProps> = ({
  challenges,
  category
}) => {
  return (
    <div className="m-10">
      <h2 className="text-xl font-bold">{category}</h2>{' '}
      {/* Le titre de la catégorie */}
      <div className="flex flex-wrap">
        {/* Utilise la méthode map pour créer un composant Challenge pour chaque défi */}
        {challenges.map((challenge, index) => (
          <Challenge
            key={index}
            points={challenge.points} // Le nombre de points que ce défi vaut
            isCompleted={challenge.isCompleted} // Un booléen qui indique si l'utilisateur a complété ce défi
            title={challenge.title} // Le titre du défi
            description={challenge.description} // La description du défi
            category={challenge.category} // La catégorie du défi
            author={challenge.author} // L'auteur du défi
            id={challenge.id} // L'identifiant du défi (un nombre)
            _id={challenge._id} // L'identifiant du défi (une chaîne de caractères)
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengeLayout;
