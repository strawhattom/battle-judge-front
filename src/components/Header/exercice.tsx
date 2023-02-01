import React from 'react';
import './exercice.css';


interface ExerciceProps {
    name: string;
    points: number;
    isCompleted: boolean;
}

function Exercice(props: ExerciceProps) {
    return (
        <div className={`exercice ${props.isCompleted ? 'completed' : ''}`}>
            <p>{props.name}</p>
            <p>Points: {props.points}</p>
        </div>
    );
}

export default Exercice;
