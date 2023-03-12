import * as api from '@/utils/api';
import type { UserAPIProps, UserRegisterAPIProps } from '@/types/UserProps';

export type LoginResponse = {
  data:
    | {
        token: string;
      }
    | string;
  status: number;
};

export const registerHandler = async (
  username: string,
  password: string,
  email: string
): Promise<[boolean, UserRegisterAPIProps | string]> => {
  const [error, response] = await api.post('register', {
    username,
    password,
    email
  });
  if (error) [error, response.data as string];
  return [error, response.data as UserRegisterAPIProps];
};

export const loginHandler = async (
  username: string,
  password: string
): Promise<[boolean, LoginResponse]> => {
  return (await api.post('login', { username, password })) as [
    boolean,
    LoginResponse
  ];
  // if (error) return [error, response];
  // return [error, response.data as string]; // token
};

export const getMe = async (): Promise<UserAPIProps | null> => {
  try {
    const [error, response] = await api.get('users/me');
    if (error) return null;
    return response.data as UserAPIProps; // user info
  } catch (error) {
    console.log(error);
    return null;
  }
};
