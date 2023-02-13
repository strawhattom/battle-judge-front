import * as api from '@/utils/api';
import type { ChallengeProps, ChallengesProps } from '@/types/ChallengesProps';

export const loadChallenges = async (): Promise<ChallengesProps> => {
  const response = await api.get('challenges');
  if (!response.ok) throw new Error(response.result);
  return response.result;
};

export const loadOneChallenge = async (id: number): Promise<ChallengeProps> => {
  const response = await api.get(`challenges/${id}`);
  if (!response.ok) throw new Error(response.result);
  return response.result;
};
