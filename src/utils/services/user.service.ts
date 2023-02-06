import * as api from '@/utils/api';

export const loadChallenges = async () => {
  const response = await api.get('challenges');
  if (!response.ok) throw new Error(response.result);
  return response.result;
};
