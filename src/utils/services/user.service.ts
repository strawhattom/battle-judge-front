import * as api from '@/utils/api';
import type { UserUpdateFromUser } from '@/types/UserProps';

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

export const getTeams = async (): Promise<api.Response> => {
  return await api.get('teams');
};

export const getChallenges = async (): Promise<api.Response> => {
  return await api.get('challenges/active');
};
