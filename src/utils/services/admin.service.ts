import {
  BulkUsers,
  UserUpdateFromAdmin,
  UserInfoProps
} from '@/types/UserProps';
import { BulkTeams } from '@/types/TeamProps';
import * as api from '@/utils/api';

export const loadUsers = async (): Promise<BulkUsers> => {
  const [error, response] = await api.get('users');
  if (error) return null;
  const users: BulkUsers = response;
  return users;
};

export const loadTeams = async (): Promise<BulkTeams> => {
  const [error, response] = await api.get('teams');
  if (error) return null;
  const teams: BulkTeams = response;
  return teams;
};

export const getOne = async (id: number): Promise<UserInfoProps | null> => {
  const [error, response] = await api.get(`users/${id}`);
  if (error) return null;
  return response as UserInfoProps;
};

export const deleteOne = async (id: number): Promise<boolean> => {
  const [error, response] = await api.del(`users/${id}`);
  if (error) return false;
  return true;
};

export const updateOne = async (
  id: number,
  data: UserUpdateFromAdmin
): Promise<boolean> => {
  const [error, response] = await api.post(`users/${id}`, data);
  if (error) return false;
  return true;
};
