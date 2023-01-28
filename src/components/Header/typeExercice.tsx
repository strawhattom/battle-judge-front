import React from 'react';
import Exercice from './exercice';
import './typeExercice.css';

interface TypeExerciceProps {
    name: string;
    exercices: { name: string; points: number, isCompleted: boolean }[];
}

function TypeExercice(props: TypeExerciceProps) {
    return (
        <div className="type-exercice">
            <h2>{props.name}</h2>
            <div className="exercices">
                {props.exercices.map((exercice, index) => 
                    <Exercice 
                        key={index} 
                        name={exercice.name} 
                        points={exercice.points} 
                        isCompleted={exercice.isCompleted}
                    />
                )}
            </div>
        </div>
    );
}


export default TypeExercice;
