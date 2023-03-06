import React, { useState } from 'react';
import type { ChallengeLayoutProps } from '@/types/ChallengeProps';
import Modal from 'react-modal';
import TabComponent from '@/components/TabComponent';

const customStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    maxWidth: '810px',
    width: '70%',
    // height: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

const Challenge: React.FC<ChallengeLayoutProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="btn">
        <button
          className={`bg-zinc-100 p-2 m-2 w-64 h-28 rounded ${
            props.isCompleted ? 'bg-orange-400' : ''
          }`}
          onClick={toggleModal}
        >
          <div>
            <h6 className="text-center text-base">{props.title}</h6>
            <p className="text-center text-sm">{props.points}</p>
          </div>
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel={props.title}
        style={customStyles}
        closeTimeoutMS={200}
        ariaHideApp={false}
      >
        <TabComponent
          points={props.points}
          isCompleted={props.isCompleted}
          title={props.title}
          category={props.category}
          description={props.description}
          resources={props.resources}
          // handleFile={props.handleFile}
        />
      </Modal>
    </>
  );
};

export default Challenge;
