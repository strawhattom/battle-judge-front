import React, { useState } from 'react';
import type { ChallengeLayoutProps } from '@/types/ChallengeProps';
import Modal from 'react-modal';
import TabComponent from '@/components/TabComponent';

const customStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)' // Style pour l'arrière-plan du Modal
  },
  content: {
    maxWidth: '810px',
    width: '70%',
    // height: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)' // Style pour le contenu du Modal
  }
};

const Challenge: React.FC<ChallengeLayoutProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false); // Déclaration d'un état isOpen initialisé à false
  const toggleModal = () => {
    setIsOpen(!isOpen); // Fonction pour inverser la valeur de l'état isOpen
  };

  return (
    <>
      <div className="btn">
        <button
          className={`bg-zinc-100 p-2 m-2 w-64 h-28 rounded ${
            props.isCompleted ? 'bg-orange-400' : ''
          }`}
          onClick={toggleModal} // Appel de la fonction toggleModal au clic sur le bouton
        >
          <div>
            <h6 className="text-center text-base">{props.title}</h6>
            <p className="text-center text-sm">{props.points}</p>
          </div>
        </button>
      </div>
      <Modal
        isOpen={isOpen} // Utilisation de l'état isOpen pour afficher ou cacher le Modal
        onRequestClose={toggleModal} // Appel de la fonction toggleModal pour fermer le Modal
        contentLabel={props.title} // Titre du Modal
        style={customStyles} // Style personnalisé pour le Modal
        closeTimeoutMS={200} // Temps en millisecondes avant de fermer le Modal
        ariaHideApp={false} // Empêche les problèmes d'accessibilité avec React-Modal
      >
        <TabComponent // Utilisation du composant TabComponent avec les propriétés passées en paramètre
          points={props.points}
          isCompleted={props.isCompleted}
          title={props.title}
          category={props.category}
          description={props.description}
          resources={props.resources}
        />
      </Modal>
    </>
  );
};

export default Challenge; // Export du composant Challenge
