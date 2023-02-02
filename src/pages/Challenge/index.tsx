
import Section from '../../components\\Header/Section';
import React, { useState } from 'react';

const Challenge: React.FC = () => {
    const [time, setTime] = useState(120);
    const SectionA = [
        { name: 'Find X in array', points: 50, completed: true },
        { name: 'Binary Tree', points: 10, completed: false },
        { name: 'B', points: 20, completed: true },
        { name: 'C', points: 30, completed: false },
        { name: 'D', points: 40, completed: true },
    ];

    const SectionB = [
        { name: 'Pick good user', points: 60, completed: false },
        { name: 'E', points: 70, completed: true },
        { name: 'F', points: 80, completed: false },
        { name: 'G', points: 90, completed: true },
        { name: 'H', points: 100, completed: false },
    ];

    return (

        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Section title="MISC" exercises={SectionA } />
            <Section title="HARDWARE" exercises={SectionB} />
        </div>
    );
};

export default Challenge;