import React, { useReducer, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';
import { UserInfoProps, UserTeamProps } from '@/types/UserProps';
import { getMe } from '@/utils/services/auth.service';
import Input from '@/components/Input';
import Tag from '@/components/Tag';

export const loader = async () => {
  return await getMe();
};

interface ProfileState {
  mail: string;
  team: string | null;
  role: string;
  password: string;
  passwordRepeat: string;
  loading: boolean;
  message: string;
}

const initialState: ProfileState = {
  mail: '',
  team: null,
  role: 'participant',
  password: '',
  passwordRepeat: '',
  loading: false,
  message: ''
};

const reducer = (
  state: ProfileState,
  action: { type: string; payload: string | UserTeamProps }
) => {
  return { ...state, [action.type]: action.payload };
};

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdate = () => {
    console.log('update');
  };

  const data = useLoaderData() as UserInfoProps;
  const [state, dispatch] = useReducer(reducer, initialState);

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
      <p>{data.username}</p>
      <Input
        type="text"
        value={data.mail}
        name={'mail'}
        label="E-mail"
        onChange={onChange}
      />
      <Tag text={data.role} type="role" />
      {data.team && <Tag text={data.team.name} type="team" />}
      <Button type="button" color="orange" onClick={handleUpdate}>
        Update
      </Button>
      <Button type="button" color="red" onClick={handleLogout}>
        Deconnexion
      </Button>
    </>
  );
};

export default Profile;
