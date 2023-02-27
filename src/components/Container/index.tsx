import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  cols: number;
};

const Container: React.FC<ContainerProps> = ({ cols, children }) => {
  return (
    <div
      className={`w-4/5 grid grid-cols-${cols} gap-4 justify-items-center mx-auto`}
    >
      {children}
    </div>
  );
};

export default Container;
