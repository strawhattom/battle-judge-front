import React, { useEffect } from 'react';

const Leaderboard: React.FC = () => {
  useEffect(() => {
    document.title = 'Classement - Battle Judge';
  }, []);
  return (
    <>
      <h1>Classement</h1>
    </>
  );
};

export default Leaderboard;
