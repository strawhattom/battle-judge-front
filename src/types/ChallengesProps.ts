export type ChallengeProps = {
  id: number;
  _id: string;
  author: number;
  title: string;
  category: string;
  description: string;
  points: number;
  flag: string;
  active: boolean;
  resources?: Array<Buffer>;
  hints?: Array<string>;
  __v?: number;
};

export type FormChallengeProps = {
  title: string;
  category: string;
  description: string;
  flag: string;
  points: number;
  active?: boolean;
  resources?: Array<Buffer>;
  hints?: Array<string>;
};

export type ChallengesProps = Array<ChallengeProps> | [];

export type ChallengesStateObject = {
  active: ChallengesProps;
  inactive: ChallengesProps;
};
