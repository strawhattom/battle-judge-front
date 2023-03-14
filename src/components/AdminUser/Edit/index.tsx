import React, { useEffect, useReducer } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { updateOne } from '@/utils/services/admin.service';
import { Input, Button, Select, Container } from '@/components';
import { ROLES } from '@/utils/constants';
import type { UserUpdateFromAdmin } from '@/types/UserProps';

// Crée un reducer qui met à jour l'état d'un utilisateur
const reducer = (
  state: UserUpdateFromAdmin,
  action: { type: string; payload: string | number }
) => {
  // Ajoute ou met à jour la propriété dans l'état avec la nouvelle valeur
  return { ...state, [action.type]: action.payload };
};

const Edit: React.FC = () => {
  // Récupère les données de l'utilisateur à mettre à jour depuis le contexte
  const data = useLoaderData() as UserUpdateFromAdmin;
  // Initialise le navigateur pour rediriger après la mise à jour
  const navigate = useNavigate();
  // Initialise l'état de l'utilisateur avec les données récupérées
  const [user, dispatch] = useReducer(reducer, data);

  // Met à jour l'état de l'utilisateur lorsqu'un champ de saisie est modifié
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    dispatch(action);
  };

  // Met à jour l'état de l'utilisateur lorsqu'un champ de sélection est modifié
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    dispatch(action);
  };

  // Met à jour l'utilisateur sur le serveur et redirige vers la liste des utilisateurs
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updated = await updateOne(user.id, { ...user });
    if (updated) {
      navigate('/admin/users');
    }
  };

  return (
    <Container cols={1}>
      <p className="text-xl mt-8">Utilisateur : {user.username}</p>
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
          name="email"
          label="Adresse email"
          onChange={onChange}
          value={user.email}
        />

        <Select
          name="role"
          options={ROLES}
          value={user.role}
          onChange={onSelectChange}
          label="Rôle"
        />
        <Button color="orange" onClick={onSubmit}>
          Modifier
        </Button>
      </form>
    </Container>
  );
};

export default Edit;
