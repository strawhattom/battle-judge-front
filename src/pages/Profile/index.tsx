import React, { useReducer, useEffect, useCallback } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';
import { UserInfoProps, UserTeamProps } from '@/types/UserProps';
import { getMe } from '@/utils/services/auth.service';
import {
  updateSelf,
  getTeams,
  createTeam,
  leaveTeam,
  joinTeam
} from '@/utils/services/user.service';
import { BulkTeams } from '@/types/TeamProps';
import { Input, Container, SelectTeam } from '@/components';
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

const reducer = (
  state: ProfileState,
  action: { type: string; payload: string | UserTeamProps }
) => {
  if (action.type === 'email') {
    const payload = action.payload as string;
    return {
      ...state,
      email: payload,
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
  if (state.mailChange && !state.email) return false;
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
  const [team, setTeam] = React.useState<string>('');
  const [availableTeam, setAvailableTeam] = React.useState<BulkTeams>([]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
    <Container cols={1}>
      <h1 className="text-4xl text-center mt-8 mb-8 font-bold">Profil</h1>

      {!state.team ? (
        // <>
        //   <h2 className="text-xl font-bold text-center text-red-500">
        //     <ExclamationTriangleIcon className="w-5 h-5 mr-1 inline-block text-red-500" />
        //     {"Tu n'as pas d'équipe !"}
        //   </h2>
        //   <div className="bg-gray-200 w-9/12 p-8 ml-auto mr-auto mb-16 rounded-xl">
        //     <table className="ml-auto mr-auto w-4/5 text-center">
        //       <thead>
        //         <tr className="h-12 border-b border-black">
        //           <th>{"Nom de l'équipe"}</th>
        //           <th>{'Taille'}</th>
        //           <th></th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {availableTeam.map((team, index) => (
        //           <tr key={index} className="h-12 border-b border-black">
        //             <td>{team.name}</td>
        //             <td>{team.members}</td>
        //             <td>
        //               <Button
        //                 onClick={() => onJoinTeam(team.id)}
        //                 color="orange"
        //               >
        //                 {'Rejoindre'}
        //               </Button>
        //             </td>
        //           </tr>
        //         ))}
        //       </tbody>
        //     </table>
        //   </div>
        //   <h2 className="text-xl font-bold text-center">Créer une équipe</h2>
        //   <div className="flex justify-center">
        //     <div className="flex flex-col items-center bg-gray-200 mb-8 pt-4 pb-4 rounded-xl px-4">
        //       <Input
        //         type="text"
        //         name="Nom d'équipe"
        //         label="Nom d'équipe"
        //         onChange={(e) => setTeam(e.currentTarget.value)}
        //         value={team}
        //         placeholder="Nom d'équipe"
        //       />
        //       <div className="profile-create-btn">
        //         <Button onClick={onCreateTeam} color="green">
        //           {'Créer une équipe'}
        //         </Button>
        //       </div>
        //     </div>
        //   </div>
        // </>
        <SelectTeam
          availableTeam={availableTeam}
          onJoinTeam={onJoinTeam}
          onCreateTeam={onCreateTeam}
          team={team}
          setTeam={setTeam}
        />
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-base mx-4">Équipe {state.team.name}</p>
          <Button color="red" onClick={onLeaveTeam}>
            {'Quitter'}
          </Button>
        </div>
      )}

      <p>Rôle: {state.role}</p>

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

      <Button onClick={handleUpdate} color="orange">
        {'Mettre à jour'}
      </Button>

      <Button onClick={handleLogout} color="red">
        {'Déconnexion'}
      </Button>
    </Container>
  );
};

export default Profile;
