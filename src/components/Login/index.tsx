import React from 'react';
import Input from '@/components/Input';
import HomeForm from '@/components/HomeForm';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const validateState = (username: string, password: string) => {
  return username.length > 0 && password.length > 0;
};

const Login: React.FC = () => {
  const { login } = useAuth();

  // À transformer en reducer
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false); //
  const [message, setMessage] = React.useState('');

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      login(username, password);
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
    }
    setIsLoading(false);
  };

  return (
    <HomeForm>
      <form>
        {message && message.length > 0 && <p className="error">{message}</p>}
        <Input
          type="text"
          placeholder=""
          value={username}
          name="username"
          label="Identifiant"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <Input
          type="password"
          placeholder=""
          name="password"
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <button
          type="submit"
          onClick={onSubmit}
          disabled={!validateState(username, password)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 mt-8 rounded"
        >
          {isLoading ? 'Connexion.....' : 'Se connecter'}
        </button>

        <p className="mt-3">
          Pas encore de compte ? Inscrit toi{' '}
          <Link className="link" to="/register">
            ici
          </Link>
        </p>
      </form>
    </HomeForm>
  );
};

export default Login;
