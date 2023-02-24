import * as api from '@/utils/api';
import type { UserUpdateFromUser } from '@/types/UserProps';

export const updateSelf = async (
  mail: string,
  password: string
): Promise<api.Response> => {
  const payload: UserUpdateFromUser = {
    mail,
    password
  };
  return await api.patch('users/me', payload);
};
