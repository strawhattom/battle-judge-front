import React, { useEffect } from 'react';

const Team: React.FC = () => {
  useEffect(() => {
    document.title = 'Equipes - Battle Judge';
  }, []);

  return (
    <>
      <h1>Equipes</h1>
    </>
  );
};

export default Team;
