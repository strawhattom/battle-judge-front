import React, { useState } from 'react';
import ChallengeLayout from '../../components/ChallengeLayout';

const Challenge: React.FC = () => {
    const [challenges, setChallenges] = useState([
        {
            name: "Facile",
            challenges: [
                {name: "Exercice 1", points: 10, isCompleted: false},
                {name: "Exercice 2", points: 15, isCompleted: true}
            ]
        },
        {
            name: "Moyen",
            challenges: [
                {name: "Exercice 3", points: 20, isCompleted: true},
                {name: "Exercice 4", points: 25, isCompleted: false},
                {name: "Exercice 5", points: 35, isCompleted: false},
                {name: "Exercice 6", points: 40, isCompleted: true}
            ]
        },
        {
            name: "Difficile",
            challenges: [
                {name: "Exercice 7", points: 55, isCompleted: true},
                {name: "Exercice 8", points: 65, isCompleted: true},
                {name: "Exercice 9", points: 80, isCompleted: false},
            ]
        }
    ]);


    return (
        <div className="exercice-page">
            <h1>yo le gang</h1>
            {challenges.map((challenge, index) => 
                <ChallengeLayout 
                    key={index} 
                    name={challenge.name} 
                    challenges={challenge.challenges} 
                />
            )}
        </div>
    );
}

export default Challenge;
