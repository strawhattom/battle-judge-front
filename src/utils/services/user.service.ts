import * as api from '@/utils/api';
import type { UserUpdateFromUser, UserAPIProps } from '@/types/UserProps';
import { BulkTeams, TeamProps } from '@/types/TeamProps';

type TeamCreationResponse = [
  boolean,
  {
    data: TeamProps;
    status: number;
  }
];

type TeamJoinResponse = [
  boolean,
  {
    data: UserAPIProps;
    status: number;
  }
];

export const updateSelf = async (
  email: string,
  password: string
): Promise<api.Response> => {
  const payload: UserUpdateFromUser = {
    email,
    password
  };
  return await api.patch('users/me', payload);
};

export const getTeams = async (): Promise<BulkTeams> => {
  const [error, response] = await api.get('teams');
  if (error) return [];
  return response.data as BulkTeams;
};

export const getChallenges = async (): Promise<api.Response> => {
  return await api.get('challenges/active');
};

export const joinTeam = async (
  teamId: number
): Promise<[joined: boolean, data: UserAPIProps | null]> => {
  const [error, response] = (await api.patch(`users/me`, {
    teamId
  })) as TeamJoinResponse;
  if (error) return [false, null];
  return [true, response.data];
};

export const leaveTeam = async (): Promise<boolean> => {
  const [error, response] = await api.patch(`users/me`, { teamId: null });
  console.log(error, response);
  return !error;
};

export const createTeam = async (
  name: string
): Promise<[joined: boolean, data: UserAPIProps | null]> => {
  const [error, response] = (await api.post('teams', {
    name
  })) as TeamCreationResponse;
  if (error) return [false, null];
  // add user to the team
  const teamId = response.data.id as number;
  return await joinTeam(teamId);
};
