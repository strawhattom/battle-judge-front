import React, { useEffect, useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import Login from '@/components/Login';

const Home: React.FC = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Accueil - Battle Judge';
  }, []);

  return !token ? (
    <Login />
  ) : (
    <div className="Home">
      <h1>Bienvenue sur la plateforme Battle Judge</h1>
    </div>
  );
};

export default Home;
