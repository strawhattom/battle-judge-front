import React, { useEffect, useContext } from 'react';
import ImageLogin from '@/assets/images/ImageLoginLeft.jpg';
import Logo from '@/assets/images/sopra_steria.png';
import './login.css';
import { loginHandler } from '@/utils/services/auth.service';
import AuthContext from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const { setToken } = useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false); //
  const [message, setMessage] = React.useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginHandler(username, password);
      setToken(response.token);
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
