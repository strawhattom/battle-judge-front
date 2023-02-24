import * as api from '@/utils/api';

export const registerHandler = async (
  username: string,
  password: string,
  email: string
): Promise<api.Response> => {
  // const [error, response] = await api.post('register', { username, password, email });
  // if (error) throw new Error(response);
  return await api.post('register', { username, password, email });
};

export const loginHandler = async (
  username: string,
  password: string
): Promise<api.Response> => {
  // const [error, response] = await api.post('login', { username, password });
  return await api.post('login', { username, password });
};

export const getMe = async () => {
  const [error, response] = await api.get('users/me');
  try {
    if (error) throw new Error(response);
    return response;
  } catch (err) {
    return null;
  }
};
