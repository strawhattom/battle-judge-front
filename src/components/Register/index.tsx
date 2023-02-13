import React, { useReducer } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import HomeForm from '@/components/HomeForm';
import '@/assets/css/form.css';
import { Link } from 'react-router-dom';
import { EMAIL_REGEX } from '@/utils/constants';

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
    state.password === state.passwordRepeat && state.email.match(EMAIL_REGEX)
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
    try {
      //
    } catch (error) {
      //
    }
  };

  return (
    <HomeForm>
      <form className="form">
        {state.message && state.message.length > 0 && (
          <p className="error">{state.message}</p>
        )}

        <Input
          type="text"
          placeholder=""
          name="username"
          label="Nom de compte"
          onChange={onChange}
        />
        <Input
          type="password"
          placeholder=""
          name="password"
          label="Mot de passe"
          onChange={onChange}
        />
        <Button
          type="submit"
          color="orange"
          onClick={onSubmit}
          disabled={!validateState(state)}
        >
          {state.loading ? 'Inscription.....' : "S'inscrire"}
        </Button>
        <p>
          Déjà un compte ?
          <Link className="link" to="/login">
            Connecte toi !
          </Link>
        </p>
      </form>
    </HomeForm>
  );
};

export default Register;
