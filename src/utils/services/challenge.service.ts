import { ChallengeProps, ChallengesStateObject } from '@/types/ChallengeProps';
import * as api from '@/utils/api';

export const loadChallenges = async () => {
  const [error, { data }] = await api.get('challenges');
  if (error) throw new Error(data as string);

  const challenges: ChallengesStateObject = {
    active: [],
    inactive: []
  };

  (data as ChallengeProps[]).forEach((challenge: ChallengeProps) => {
    if (challenge?.active) challenges.active.push(challenge as never);
    else challenges.inactive.push(challenge as never);
  });

  return challenges;
};

export const getOne = async (id: number): Promise<ChallengeProps | null> => {
  const [error, response] = await api.get(`challenges/${id}`);
  if (error) return null;
  return response.data as ChallengeProps;
};

export const deleteOne = async (id: number): Promise<ChallengeProps> => {
  const [error, response] = await api.del(`challenges/${id}`);
  if (error) throw new Error(response.data as string);
  return response.data as ChallengeProps;
};

export const createOne = async (data: FormData): Promise<ChallengeProps> => {
  const [error, response] = await api.post('challenges', data);
  if (error) throw new Error(response.data as string);
  return response.data as ChallengeProps;
};

export const editOne = async (
  id: number,
  data: FormData
): Promise<ChallengeProps> => {
  const [error, response] = await api.put(`challenges/${id}`, data);
  if (error) throw new Error(response.data as string);
  return response.data as ChallengeProps;
};

// Retourne true si il n'y a pas d'erreur (la requête est passé)
export const activateOne = async (id: number): Promise<boolean> => {
  const [error, response] = await api.patch(`challenges/${id}`, {
    active: true
  });
  return !error;
};

export const disableOne = async (id: number): Promise<boolean> => {
  const [error, response] = await api.patch(`challenges/${id}`, {
    active: false
  });
  return !error;
};
