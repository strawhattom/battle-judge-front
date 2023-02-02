import React from 'react';
import './challengeLayout.css';


interface ChallengeLayoutProps {
    name: string;
    points: number;
    isCompleted: boolean;
}

function Challenge(props: ChallengeLayoutProps) {
    return (
        <div className={`exercice ${props.isCompleted ? 'completed' : ''}`}>
            <p>{props.name}</p>
            <p>Points: {props.points}</p>
        </div>
    );
}

export default Challenge;
