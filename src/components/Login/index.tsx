import React, { useReducer } from 'react';
import Input from '@/components/Input';
import HomeForm from '@/components/HomeForm';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const validateState = (username: string, password: string) => {
  return username.length > 0 && password.length > 0;
};

type LoginState = {
  username: string;
  password: string;
  loading: boolean;
  message: string;
};

const initialState: LoginState = {
  username: '',
  password: '',
  loading: false,
  message: ''
};

const reducer = (
  state: LoginState,
  action: { type: string; payload: string | boolean }
) => {
  return { ...state, [action.type]: action.payload };
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateState(state.username, state.password)) return;

    dispatch({ type: 'loading', payload: true });

    try {
      const response = await login(state.username, state.password);
      if (!response || response.status === 404) {
        dispatch({
          type: 'message',
          payload: 'Identifiant ou mot de passe incorrect'
        });
      }
    } catch (error) {
      dispatch({ type: 'message', payload: (error as Error).message });
    }
    dispatch({ type: 'loading', payload: false });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    dispatch(action);
  };

  return (
    <HomeForm>
      <form>
        {state.message.length > 0 && (
          <p className="text-red-500">{state.message}</p>
        )}
        <Input
          type="text"
          placeholder="Identifiant"
          value={state.username}
          name="username"
          label="Identifiant"
          onChange={onChange}
        />
        <Input
          type="password"
          placeholder="•••••••••"
          name="password"
          label="Mot de passe"
          value={state.password}
          onChange={onChange}
        />

        <Button
          type="submit"
          onClick={onSubmit}
          disabled={!validateState(state.username, state.password)}
        >
          {state.loading ? 'Connexion.....' : 'Se connecter'}
        </Button>

        <p className="mt-3">
          Pas encore de compte ? Inscrit toi{' '}
          <Link className="text-blue-600" to="/register">
            ici
          </Link>
        </p>
      </form>
    </HomeForm>
  );
};

export default Login;
