import React, { useReducer, useEffect, useCallback } from 'react';
import { useLoaderData } from 'react-router-dom';
import Button from '@/components/Button';
import { UserInfoProps, UserTeamProps } from '@/types/UserProps';
import { getMe } from '@/utils/services/auth.service';
import {
  getTeams,
  createTeam,
  leaveTeam,
  joinTeam
} from '@/utils/services/user.service';
import { BulkTeams } from '@/types/TeamProps';
import { Input } from '@/components';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const loader = async () => {
  return await getMe();
};

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

const MyTeam: React.FC = () => {
  const data = useLoaderData() as UserInfoProps;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [team, setTeam] = React.useState<string>('');
  const [availableTeam, setAvailableTeam] = React.useState<BulkTeams>([]);

  const onCreateTeam = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const created = await createTeam(team);
    if (created) {
      loadTeams();
    }
  };

  const onLeaveTeam = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const left = await leaveTeam();
    if (left) {
      dispatch({ type: 'team', payload: null });
      await loadTeams();
    }
  };

  const onJoinTeam = async (id: number) => {
    const [joined, data] = await joinTeam(id);
    if (joined && data) {
      dispatch({ type: 'team', payload: data.team });
    }
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
      <h1 className="mt-8 mb-8 text-center text-4xl font-bold">Mon équipe</h1>
      {!state.team ? (
        <>
          <h2 className="text-center text-xl font-bold text-red-500">
            <ExclamationTriangleIcon className="mr-1 inline-block h-5 w-5 text-red-500" />
            {"Tu n'as pas d'équipe !"}
          </h2>
          <div className="ml-auto mr-auto mb-16 w-9/12 rounded-xl bg-gray-200 p-8">
            <table className="ml-auto mr-auto w-4/5 text-center">
              <thead>
                <tr className="h-12 border-b border-black">
                  <th>{"Nom de l'équipe"}</th>
                  <th>{'Taille'}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {availableTeam.map((team, index) => (
                  <tr key={index} className="h-12 border-b border-black">
                    <td>{team.name}</td>
                    <td>{team.members}</td>
                    <td>
                      <Button
                        onClick={() => onJoinTeam(team.id)}
                        color="orange"
                      >
                        {'Rejoindre'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="text-center text-xl font-bold">Créer une équipe</h2>
          <div className="flex justify-center">
            <div className="mb-8 flex flex-col items-center rounded-xl bg-gray-200 px-4 pt-4 pb-4">
              <Input
                type="text"
                name="Nom d'équipe"
                label="Nom d'équipe"
                onChange={(e) => setTeam(e.currentTarget.value)}
                value={team}
                placeholder="Nom d'équipe"
              />
              <div className="profile-create-btn">
                <Button onClick={onCreateTeam} color="green">
                  {'Créer une équipe'}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <p className="mx-4 text-base">Équipe {state.team.name}</p>
          <Button color="red" onClick={onLeaveTeam}>
            {'Quitter'}
          </Button>
        </div>
      )}
    </>
  );
};

export default MyTeam;
