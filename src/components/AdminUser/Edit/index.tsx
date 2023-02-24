import React, { useEffect, useReducer } from 'react';
import { useLoaderData } from 'react-router-dom';
import * as api from '@/utils/api';
import Input from '@/components/Input';
import type { UserUpdateFromAdmin } from '@/types/UserProps';

const reducer = (
  state: UserUpdateFromAdmin,
  action: { type: string; payload: string | number }
) => {
  return { ...state, [action.type]: action.payload };
};

const Edit: React.FC = () => {
  const data = useLoaderData() as UserUpdateFromAdmin;
  const [user, dispatch] = useReducer(reducer, data);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    dispatch(action);
  };

  return (
    <>
      <h1>Modifier de {user.username}</h1>
      <form className="form form-container">
        <Input
          type="text"
          name="username"
          label="Nom d'utilisateur"
          onChange={onChange}
          value={user.username}
        />
        <Input
          type="email"
          name="mail"
          label="Adresse email"
          onChange={onChange}
          value={user.mail}
        />
        <Input
          type="text"
          name="role"
          label="Rôle"
          onChange={onChange}
          value={user.role}
        />
      </form>
    </>
  );
};

export default Edit;
