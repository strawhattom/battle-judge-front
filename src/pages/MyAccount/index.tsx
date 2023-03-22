import React, { useReducer, useEffect, useCallback } from 'react';
import { useLoaderData } from 'react-router-dom';
import Button from '@/components/Button';
import { UserInfoProps, UserTeamProps } from '@/types/UserProps';
import { updateSelf, getTeams } from '@/utils/services/user.service';
import { BulkTeams } from '@/types/TeamProps';
import { Input } from '@/components';
interface ProfileState {
  email: string;
  mailChange: boolean;
  team: UserTeamProps;
  role: string;
  passwordChange: boolean;
  password: string;
  passwordRepeat: string;
  loading: boolean;
  message: string;
}

const initialState: ProfileState = {
  email: '',
  mailChange: false,
  team: null,
  role: 'participant',
  passwordChange: false,
  password: '',
  passwordRepeat: '',
  loading: false,
  message: ''
};

// La fonction reducer prend en paramètre un état et une action, et retourne un nouvel état
const reducer = (
  state: ProfileState, // état actuel
  action: { type: string; payload: string | UserTeamProps } // action à effectuer
) => {
  // Si l'action est de type "email"
  if (action.type === 'email') {
    const payload = action.payload as string; // On récupère la valeur de l'email dans l'action
    return {
      ...state, // On copie l'état actuel
      email: payload, // On met à jour l'email avec la nouvelle valeur
      mailChange: payload.length > 0 ? true : false // On indique si l'email a été modifié
    };
  }
  // Si l'action est de type "password"
  if (action.type === 'password') {
    const payload = action.payload as string; // On récupère la valeur du mot de passe dans l'action
    return {
      ...state, // On copie l'état actuel
      password: payload, // On met à jour le mot de passe avec la nouvelle valeur
      passwordChange: payload.length > 0 ? true : false // On indique si le mot de passe a été modifié
    };
  }
  // Si l'action est de tout autre type
  return { ...state, [action.type]: action.payload }; // On copie l'état actuel et on met à jour la propriété correspondant à l'action avec la nouvelle valeur
};

// La fonction validateForm prend en paramètre l'état actuel du formulaire de profil et retourne un booléen indiquant si le formulaire est valide ou non
const validateForm = (state: ProfileState): boolean => {
  if (state.mailChange && !state.email) return false; // Si l'email a été modifié et qu'il est vide, le formulaire est invalide
  if (state.passwordChange && !state.password) return false; // Si le mot de passe a été modifié et qu'il est vide, le formulaire est invalide
  if (state.passwordChange && !state.passwordRepeat) return false; // Si le mot de passe a été modifié et que la confirmation du mot de passe est vide, le formulaire est invalide
  if (state.passwordChange && state.password !== state.passwordRepeat)
    return false; // Si le mot de passe a été modifié et que la confirmation du mot de passe ne correspond pas au mot de passe, le formulaire est invalide
  return true; // Si aucune de ces conditions n'est vérifiée, le formulaire est valide
};

const MyAccount: React.FC = () => {
  const data = useLoaderData() as UserInfoProps;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [availableTeam, setAvailableTeam] = React.useState<BulkTeams>([]);

  const handleUpdate = async () => {
    if (!validateForm(state)) return;
    const update = await updateSelf(state.email, state.password);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    dispatch(action);
  };

  const loadTeams = useCallback(async () => {
    const teams = await getTeams();
    setAvailableTeam(teams);
  }, []);

  useEffect(() => {
    if (!data) return;
    dispatch({ type: 'email', payload: data.email });
    dispatch({ type: 'team', payload: data.team });
    dispatch({ type: 'role', payload: data.role });
    if (!data.team) {
      loadTeams();
    }
  }, []);

  return (
    <>
      <h1 className="mt-8 mb-8 text-center text-4xl font-bold">Mon Compte</h1>

      <p className="mt-10 flex justify-center">Rôle: {state.role}</p>
      <div className=" flex justify-center">
        <div className="m-10 flex w-auto flex-col">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChange}
            value={state.email}
          />

          <Input
            label="Mot de passe"
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={onChange}
            value={state.password}
          />

          <Input
            label="Répéter le mot de passe"
            type="password"
            name="passwordRepeat"
            placeholder="Répéter le mot de passe"
            onChange={onChange}
            value={state.passwordRepeat}
          />
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <Button onClick={handleUpdate} color="orange">
          {'Mettre à jour'}
        </Button>
      </div>
    </>
  );
};

export default MyAccount;
