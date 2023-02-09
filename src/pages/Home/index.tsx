import React, { useEffect } from 'react';
import Login from '@/components/Login';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
const Home: React.FC = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    document.title = 'Accueil - Battle Judge';
    if (!token) return;
  }, []);

  return !token ? (
    <Login />
  ) : (
    <div className="Home">
      <h1>Bienvenue sur la plateforme Battle Judge</h1>
      {user?.role === 'admin' ? (
        <>
          <h2>Administration</h2>
          <Link to="/admin">Tableau</Link>
          <Link to="/admin/challenges">Challenges</Link>
        </>
      ) : (
        <>
          <h2>Participant</h2>
        </>
      )}
    </div>
  );
};

export default Home;
