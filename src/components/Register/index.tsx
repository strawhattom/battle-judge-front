import React, { useReducer } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import HomeForm from '@/components/HomeForm';
import '@/assets/css/form.css';
import { Link } from 'react-router-dom';
import { EMAIL_REGEX } from '@/utils/constants';
import { registerHandler } from '@/utils/services/auth.service';

// Définition de l'interface RegisterState
interface RegisterState {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  loading: boolean;
  message: string;
}

// Définition de l'état initial
const initialState: RegisterState = {
  username: '',
  email: '',
  password: '',
  passwordRepeat: '',
  loading: false,
  message: ''
};

// Fonction pour valider l'état de l'inscription
const validateState = (state: RegisterState) => {
  return (
    state.password.length >= 3 && // Vérification que le mot de passe a au moins 3 caractères
    state.password === state.passwordRepeat && // Vérification que les deux mots de passe correspondent
    state.email.match(EMAIL_REGEX) // Vérification que l'email correspond à un format valide (défini ailleurs)
  );
};

// Fonction réductrice pour gérer les actions
const reducer = (
  state: RegisterState, // État actuel
  action: { type: string; payload: string } // Action à effectuer
) => {
  return { ...state, [action.type]: action.payload }; // Retourne un nouvel état avec la propriété modifiée par l'action
};

// Composant Register
const Register: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState); // Initialise l'état et la fonction pour effectuer des actions

  // Fonction appelée lorsqu'un champ de saisie est modifié
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
      type: e.currentTarget.name, // Le nom de la propriété à modifier correspond au nom de l'élément HTML
      payload: e.currentTarget.value // La nouvelle valeur est la valeur saisie dans l'élément HTML
    };
    dispatch(action); // Effectue l'action
  };

  // Fonction appelée lorsqu'un formulaire est soumis
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    dispatch({ type: 'loading', payload: 'true' }); // Modifie l'état pour signaler que la requête est en cours
    const { username, email, password } = state; // Récupère les informations saisies
    const response = await registerHandler(username, password, email); // Effectue la requête (définie ailleurs)
    dispatch({
      type: 'message',
      payload: response // Modifie le message en fonction de la réponse de la requête
        ? 'Utilisateur créé !'
        : 'Une erreur est survenue, veuillez réessayer'
    });
    dispatch({ type: 'loading', payload: 'false' }); // Modifie l'état pour signaler que la requête est terminée
  };

  return (
    <HomeForm>
      <form className="form">
        {state.message && state.message.length > 0 && <p>{state.message}</p>}

        <Input
          type="text"
          placeholder="Identifiant"
          name="username"
          label="Nom de compte"
          onChange={onChange}
        />

        <Input
          type="email"
          placeholder="Example@domain.com"
          name="email"
          label="Adresse email"
          onChange={onChange}
        />
        <Input
          type="password"
          placeholder="Au moins 3 caractères"
          name="password"
          label="Mot de passe"
          onChange={onChange}
        />

        <Input
          type="password"
          placeholder="Repetez le mot de passe"
          name="passwordRepeat"
          label="Confirmer le mot de passe"
          onChange={onChange}
        />
        <Button
          type="submit"
          onClick={onSubmit}
          disabled={!validateState(state)}
        >
          {state.loading ? 'Inscription.....' : "S'inscrire"}
        </Button>
        <p>
          Déjà un compte ?{' '}
          <Link className="text-blue-600" to="/login">
            Connecte toi !
          </Link>
        </p>
      </form>
    </HomeForm>
  );
};

export default Register;
