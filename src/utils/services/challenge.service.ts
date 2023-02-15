import { ChallengeProps, ChallengesStateObject } from '@/types/ChallengesProps';
import * as api from '@/utils/api';

export const loadChallenges = async () => {
  const response = await api.get('challenges');
  if (!response.ok) throw new Error(response.result);

  const challenges: ChallengesStateObject = {
    active: [],
    inactive: []
  };

  response.result.forEach((challenge: ChallengeProps) => {
    if (challenge.active) challenges.active.push(challenge as never);
    else challenges.inactive.push(challenge as never);
  });

  return challenges;
};

export const loadOneChallenge = async (id: number): Promise<ChallengeProps> => {
  const response = await api.get(`challenges/${id}`);
  if (!response.ok) throw new Error(response.result);
  return response.result;
};

export const activateOne = async (id: number): Promise<ChallengeProps> => {
  const response = await api.del(`challenges/${id}`);
  if (!response.ok) throw new Error(response.result);
  return response.result;
};

export const createOne = async (data: FormData): Promise<ChallengeProps> => {
  console.log(data);
  const response = await api.post('challenges', data);
  if (!response.ok) throw new Error(response.result);
  return response.result;
};
