import React from 'react';
import './Exercise.css';

export interface ExerciseProps {
    name: string;
    points: number;
    completed: boolean;
}

const Exercise: React.FC<ExerciseProps> = (props) => {
    return (
        <div className={`exercise${props.completed ? ' completed' : ''}`}>
            <h6>{props.name}</h6>
            <p>{props.points} points</p>
        </div>
    );
};

export default Exercise;
