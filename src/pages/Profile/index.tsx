import React, { useReducer, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserInfoProps, UserTeamProps } from '@/types/UserProps';
import { getMe } from '@/utils/services/auth.service';
import { updateSelf } from '@/utils/services/user.service';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Tag from '@/components/Tag';

export const loader = async () => {
  return await getMe();
};

interface ProfileState {
  mail: string;
  mailChange: boolean;
  team: string | null;
  role: string;
  passwordChange: boolean;
  password: string;
  passwordRepeat: string;
  loading: boolean;
  message: string;
}

const initialState: ProfileState = {
  mail: '',
  mailChange: false,
  team: null,
  role: 'participant',
  passwordChange: false,
  password: '',
  passwordRepeat: '',
  loading: false,
  message: ''
};

const reducer = (
  state: ProfileState,
  action: { type: string; payload: string | UserTeamProps }
) => {
  if (action.type === 'mail') {
    const payload = action.payload as string;
    return {
      ...state,
      mail: payload,
      mailChange: payload.length > 0 ? true : false
    };
  }
  if (action.type === 'password') {
    const payload = action.payload as string;
    return {
      ...state,
      password: payload,
      passwordChange: payload.length > 0 ? true : false
    };
  }
  return { ...state, [action.type]: action.payload };
};

const validateForm = (state: ProfileState): boolean => {
  if (state.mailChange && !state.mail) return false;
  if (state.passwordChange && !state.password) return false;
  if (state.passwordChange && !state.passwordRepeat) return false;
  if (state.passwordChange && state.password !== state.passwordRepeat)
    return false;
  return true;
};

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const data = useLoaderData() as UserInfoProps;
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdate = async () => {
    console.log('update');
    if (!validateForm(state)) return;
    const update = await updateSelf(state.mail, state.password);
    console.log(update);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    dispatch(action);
  };

  useEffect(() => {
    if (!data) return;
    dispatch({ type: 'mail', payload: data.mail });
    dispatch({ type: 'team', payload: data.team });
    dispatch({ type: 'role', payload: data.role });
  }, []);

  return (
    <>
      <h1>Profile</h1>
      <form className="form form-container">
        <p>{data.username}</p>

        <Tag text={state.role} type="role" />
        {state.team && <Tag text={state.team} type="team" />}

        <Input
          type="text"
          value={state.mail}
          name={'mail'}
          label="E-mail"
          onChange={onChange}
        />
        <Input
          type="password"
          name={'password'}
          label="Mot de passe"
          onChange={onChange}
        />
        <Input
          type="password"
          name={'passwordRepeat'}
          label="Vérification du mot de passe"
          disabled={!state.passwordChange}
          onChange={onChange}
        />
        <Button type="button" color="orange" onClick={handleUpdate}>
          Modifier
        </Button>
        <Button type="button" color="red" onClick={handleLogout}>
          Deconnexion
        </Button>
      </form>
    </>
  );
};

export default Profile;
