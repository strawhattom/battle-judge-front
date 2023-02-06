import * as api from '@/utils/api';

export const loginHandler = async (username: string, password: string) => {
  const response = await api.post('login', { username, password });
  if (!response.ok) throw new Error(response.result);
  localStorage.setItem('jwt', response.result.token);
  return response.result;
};

export const logout = () => {
  localStorage.removeItem('jwt');
};

export const getMe = async () => {
  const response = await api.get('users/me');
  try {
    if (!response.ok) throw new Error(response.result);
    return response.result;
  } catch (err) {
    console.error(err);
    return null;
  }
};
