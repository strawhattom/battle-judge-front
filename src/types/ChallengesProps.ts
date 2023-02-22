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
  __v?: number;
};

export type FormChallengeProps = {
  title: string;
  category: string;
  description: string;
  flag: string;
  points: number;
  active?: boolean;
  resources?: FileList | null;
};

export type ChallengesProps = Array<ChallengeProps> | [];

export type ChallengesStateObject = {
  active: ChallengesProps;
  inactive: ChallengesProps;
};
