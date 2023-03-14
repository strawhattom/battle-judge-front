import React, { useReducer } from 'react';
import Input from '@/components/Input';
import HomeForm from '@/components/HomeForm';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Définition d'une fonction pour valider l'état de connexion
const validateState = (username: string, password: string) => {
  return username.length > 0 && password.length > 0;
};

// Définition de l'état initial de la page Login
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

// Définition du reducer pour la mise à jour de l'état de la page Login
const reducer = (
  state: LoginState,
  action: { type: string; payload: string | boolean }
) => {
  return { ...state, [action.type]: action.payload };
};

// Définition du composant Login
const Login: React.FC = () => {
  const { login } = useAuth(); // Utilisation d'un hook personnalisé pour la connexion
  const [state, dispatch] = useReducer(reducer, initialState); // Utilisation d'un reducer pour gérer l'état de la page Login

  // Fonction pour gérer l'action de validation du formulaire de connexion
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateState(state.username, state.password)) return;

    dispatch({ type: 'loading', payload: true }); // Affichage d'un indicateur de chargement

    try {
      const response = await login(state.username, state.password); // Appel à la fonction de connexion
      if (!response || response.status === 404) {
        // Si la connexion échoue, affichage d'un message d'erreur
        dispatch({
          type: 'message',
          payload: 'Identifiant ou mot de passe incorrect'
        });
      }
    } catch (error) {
      dispatch({ type: 'message', payload: (error as Error).message }); // Si une erreur se produit lors de la connexion, affichage d'un message d'erreur
    }
    dispatch({ type: 'loading', payload: false }); // Suppression de l'indicateur de chargement
  };

  // Fonction pour gérer le changement de valeur des champs de saisie
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    dispatch(action); // Mise à jour de l'état avec les nouvelles valeurs des champs
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
