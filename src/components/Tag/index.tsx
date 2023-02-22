import React from 'react';

export interface TagProps {
  text: string;
  type: 'team' | 'role';
}

const colors: { [key: string]: string } = {
  team: 'blue',
  role: 'orange'
};

const Tag: React.FC<TagProps> = ({ text, type }) => {
  const color = colors[type];

  return (
    <div className={`tag ${color}`}>
      <p>{text}</p>
    </div>
  );
};

export default Tag;
