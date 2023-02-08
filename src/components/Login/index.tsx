import React, { useEffect } from 'react';
import ImageLogin from '@/assets/images/ImageLoginLeft.jpg';
import Logo from '@/assets/images/sopra_steria.png';
import './login.css';
import { loginHandler, getMe } from '@/utils/services/auth.service';
import { Link } from 'react-router-dom';
import { useAuth } from '@/utils/hooks/useAuth';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false); //
  const [message, setMessage] = React.useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginHandler(username, password);
      const user = await getMe();
      login(user);
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    document.title = 'Connexion - Battle Judge';
  }, []);

  return (
    <div className="App">
      <img className="ImageLogin" src={ImageLogin} />
      <div className="login-container">
        <form className="form" onSubmit={onSubmit}>
          {message && message.length > 0 && <p className="error">{message}</p>}
          <img className="logo" src={Logo} />
          <input
            type="text"
            placeholder="email"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <input
            type="password"
            placeholder="mot de passe"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button type="submit" className="submit" disabled={isLoading}>
            {isLoading ? 'Connexion.....' : 'Se connecter'}
          </button>
          <p>
            Pas encore de compte ? Inscrit toi <Link to="/register">ici</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
