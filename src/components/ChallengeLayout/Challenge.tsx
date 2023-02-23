import React, { useState } from 'react';
import type { ChallengeLayoutProps } from '@/types/ChallengeLayoutProps';
import Modal from 'react-modal';
import TabComponent from '@/components/TabComponent/Tabs';

const customStyles = {
  content: {
    width: '70%',
    height: '80%',

    position: 'absolute',
    top: '50%',
    left: ' 50%',
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
          className={`exercise ${props.isCompleted ? 'completed' : ''}`}
          onClick={toggleModal}
        >
          <div>
            <h6>{props.name}</h6>
            <p>{props.points}</p>
          </div>
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        // @ts-ignore
        style={customStyles}
        closeTimeoutMS={500}
        ariaHideApp={false}
      >
        <TabComponent
          name={props.name}
          points={props.points}
          isCompleted={props.isCompleted}
          title={props.title}
          category={props.category}
          description={props.description}
          handleFile={props.handleFile}
        />
      </Modal>
    </>
  );
};

export default Challenge;
