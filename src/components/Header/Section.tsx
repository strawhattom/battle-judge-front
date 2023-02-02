import React from 'react';
import Exercise from './Exercise';
import { ExerciseProps } from './Exercise';

interface SectionProps {
    title: string;
    exercises: ExerciseProps[];
}

const Section: React.FC<SectionProps> = (props) => {
    return (
        <div style={{ margin: '30px' }}>
            <h5>{props.title}</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {props.exercises.map((exercise) => (
                    <Exercise
                        key={exercise.name}
                        name={exercise.name}
                        points={exercise.points}
                        completed={exercise.completed}
                    />
                ))}
            </div>
        </div>
    );
};

export default Section;
