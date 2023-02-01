import { useEffect } from 'react';

function Leaderboard() {
  useEffect(() => {
    document.title = 'Classement - Battle Judge';
  }, []);
  return (
    <>
      <h1> Page du classement </h1>
    </>
  );
}

export default Leaderboard;
