import React, { useEffect } from 'react';
import Login from '@/components/Login';
import AuthContext from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { getMe } from '@/utils/services/auth.service';

const Home: React.FC = () => {
  const { user, setUser } = React.useContext(AuthContext);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    const setUser = async () => {
      const self = await getMe();
      if (self) setUser(self);
    };
    document.title = 'Accueil - Battle Judge';
    if (!token) return;
    if (!user) setUser();
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
