export type ChallengeProps = {
  id: number;
  _id: string;
  author: number;
  title: string;
  category: string;
  description: string;
  points: number;
  active: boolean;
  resources?: Array<Buffer>;
  hints?: Array<string>;
  __v?: number;
};

export type ChallengesProps = Array<ChallengeProps> | [];

export type ChallengesStateObject = {
  active: ChallengesProps;
  inactive: ChallengesProps;
};
