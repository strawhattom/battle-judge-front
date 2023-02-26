import React, { useReducer } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import HomeForm from '@/components/HomeForm';
import '@/assets/css/form.css';
import { Link } from 'react-router-dom';
import { EMAIL_REGEX } from '@/utils/constants';
import { registerHandler } from '@/utils/services/auth.service';

interface RegisterState {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  loading: boolean;
  message: string;
}

const initialState: RegisterState = {
  username: '',
  email: '',
  password: '',
  passwordRepeat: '',
  loading: false,
  message: ''
};

const validateState = (state: RegisterState) => {
  return (
    state.password.length >= 3 &&
    state.password === state.passwordRepeat &&
    state.email.match(EMAIL_REGEX)
  );
};

const reducer = (
  state: RegisterState,
  action: { type: string; payload: string }
) => {
  return { ...state, [action.type]: action.payload };
};

const Register: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    dispatch(action);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: 'loading', payload: 'true' });
    const { username, email, password } = state;
    const response = await registerHandler(username, password, email); // null or user object
    dispatch({
      type: 'message',
      payload: response
        ? 'Utilisateur crée !'
        : 'Une erreur est survenue, veuillez réessayer'
    });
    dispatch({ type: 'loading', payload: 'false' });
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
