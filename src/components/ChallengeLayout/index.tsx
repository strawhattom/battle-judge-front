import React from 'react';
import Challenge from './Challenge';
import './challenge.css';

interface ChallengeProps {
    name: string;
    challenges: { name: string; points: number, isCompleted: boolean }[];
}

function ChallengeLayout(props: ChallengeProps) {
    return (
        <div className="type-exercice">
            <h2>{props.name}</h2>
            <div className="exercices">
                {props.challenges.map((challenge, index) => 
                    <Challenge 
                        key={index} 
                        name={challenge.name} 
                        points={challenge.points} 
                        isCompleted={challenge.isCompleted}
                    />
                )}
            </div>
        </div>
    );
}


export default ChallengeLayout;
