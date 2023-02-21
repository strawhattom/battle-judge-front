import { ChallengeProps, ChallengesStateObject } from '@/types/ChallengesProps';
import * as api from '@/utils/api';

export const loadChallenges = async () => {
  const [error, response] = await api.get('challenges');
  if (error) throw new Error(response);

  const challenges: ChallengesStateObject = {
    active: [],
    inactive: []
  };

  response.forEach((challenge: ChallengeProps) => {
    if (challenge.active) challenges.active.push(challenge as never);
    else challenges.inactive.push(challenge as never);
  });

  return challenges;
};

export const getOne = async (id: number): Promise<ChallengeProps> => {
  const [error, response] = await api.get(`challenges/${id}`);
  if (error) throw new Error(response);
  return response;
};

export const deleteOne = async (id: number): Promise<ChallengeProps> => {
  const [error, response] = await api.del(`challenges/${id}`);
  if (error) throw new Error(response);
  return response;
};

export const createOne = async (data: FormData): Promise<ChallengeProps> => {
  const [error, response] = await api.post('challenges', data);
  if (error) throw new Error(response);
  return response;
};

export const editOne = async (
  id: number,
  data: FormData
): Promise<ChallengeProps> => {
  const [error, response] = await api.patch(`challenges/${id}`, data);
  if (error) throw new Error(response);
  return response;
};

export const activateOne = async (id: number): Promise<ChallengeProps> => {
  const [error, response] = await api.patch(`challenges/${id}`, {
    active: true
  });
  if (error) throw new Error(response);
  return response;
};

export const disableOne = async (id: number): Promise<ChallengeProps> => {
  const [error, response] = await api.patch(`challenges/${id}`, {
    active: false
  });
  if (error) throw new Error(response);
  return response;
};
