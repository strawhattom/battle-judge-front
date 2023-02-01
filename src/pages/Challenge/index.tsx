import React, { useState } from 'react';
import TypeExercice from '../../components\\Header/typeExercice';

function Challenge() {
    const [exercices, setExercices] = useState([
        {
            name: "Facile",
            exercices: [
                {name: "Exercice 1", points: 10, isCompleted: false},
                {name: "Exercice 2", points: 15, isCompleted: true}
            ]
        },
        {
            name: "Moyen",
            exercices: [
                {name: "Exercice 3", points: 20, isCompleted: true},
                {name: "Exercice 4", points: 25, isCompleted: false},
                {name: "Exercice 5", points: 35, isCompleted: false},
                {name: "Exercice 6", points: 40, isCompleted: true}
            ]
        },
        {
            name: "Difficile",
            exercices: [
                {name: "Exercice 7", points: 55, isCompleted: true},
                {name: "Exercice 8", points: 65, isCompleted: true},
                {name: "Exercice 9", points: 80, isCompleted: false},
            ]
        }
    ]);


    return (
        <div className="exercice-page">
            <h1>yo le gang</h1>
            {exercices.map((typeExercice, index) => 
                <TypeExercice 
                    key={index} 
                    name={typeExercice.name} 
                    exercices={typeExercice.exercices} 
                />
            )}
        </div>
    );
}

export default Challenge;