import React, { useReducer, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';
import {
  UserInfoProps,
  UserTeamProps,
  UserProfileProps
} from '@/types/UserProps';
import { getMe } from '@/utils/services/auth.service';
import { updateSelf } from '@/utils/services/user.service';
import Input from '@/components/Input';
import { BulkTeams } from '@/types/TeamProps';

const tempUsers: Array<UserProfileProps> = [
  {
    id: 2,
    username: 'Sabine SUN',
    email: 'email',
    team: {
      id: 1,
      name: 'S0pr4 573R14'
    },
    role: 'participant',
    token: 'token',
    teamSize: 5
  },
  {
    id: 1,
    username: 'Tom XIE',
    email: 'email',
    team: {
      id: 2,
      name: 'Sopra Junior'
    },
    role: 'participant',
    token: 'token',
    teamSize: 3
  },
  {
    id: 3,
    username: 'Mattéo DUPRIEZ',
    email: 'email',
    team: {
      id: 3,
      name: 'ESILV'
    },
    role: 'participant',
    token: 'token',
    teamSize: 4
  }
];

export const loader = async () => {
  return await getMe();
};

interface ProfileState {
  email: string;
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
  const [availableTeam, setAvailableTeam] = React.useState<BulkTeams>([]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdate = async () => {
    console.log('update');
    if (!validateForm(state)) return;
    const update = await updateSelf(state.email, state.password);
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
    dispatch({ type: 'email', payload: data.email });
    dispatch({ type: 'team', payload: data.team });
    dispatch({ type: 'role', payload: data.role });

    // À faire : récupérer les équipes disponibles
    // if (!data.team) {
    //   const availableTeam = tempUsers.filter(
    //     (tempUser) => tempUser.teamSize < 5
    //   );
    //   setAvailableTeam(availableTeam);
    // }
  }, []);

  return (
    <>
      <h1 className="text-4xl text-center mt-8 mb-8 font-bold">
        Bienvenue {data.username} veuillez rejoindre ou créer un équipe
      </h1>

      <h2 className="text-xl font-bold text-center">Rejoindre une équipe</h2>

      <div className="bg-gray-200 w-9/12 p-8 ml-auto mr-auto mb-16 rounded-xl">
        <table className="ml-auto mr-auto w-4/5 text-center">
          <thead>
            <tr className="h-12 border-b border-black">
              <th>{"Nom d'équipe"}</th>
              <th>{'Nombre de membres'}</th>
              <th>{"Créateur de l'équipe"}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tempUsers.map((tempUser, index) => (
              <tr key={index} className="h-12 border-b border-black">
                <td className="text-left">{tempUser.team?.name}</td>
                <td>{tempUser.teamSize}</td>
                <td className="text-left">{tempUser.username}</td>
                <td className="">
                  <Button onClick={handleUpdate} color="orange">
                    {'Rejoindre'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-center">Créer une équipe</h2>
      <div className="flex justify-center">
        <div className="w-3/4 flex flex-col items-center   bg-gray-200 mb-8 pt-4 pb-4 rounded-xl">
          <Input
            type="text"
            name="Nom d'équipe"
            label="Nom d'équipe"
            onChange={handleUpdate}
            placeholder="Nom d'équipe"
          />
          <div className="profile-create-btn">
            <Button onClick={handleUpdate} color="green">
              {'Créer une équipe'}
            </Button>
          </div>
        </div>
      </div>

      <Button onClick={handleLogout} color="red">
        {'Déconnexion'}
      </Button>
    </>
  );
};

export default Profile;
