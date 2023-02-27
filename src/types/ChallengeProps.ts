export type ChallengeDocument = {
  _id: string;
  buffer: {
    type: string;
    data: Array<number>;
  };
  originalname: string;
  mimetype: string;
  size: number;
  encoding: string;
};

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
  resources?: Array<ChallengeDocument>;
  __v?: number;
};

export type FormChallengeProps = {
  title: string;
  category: string;
  description: string;
  flag: string;
  points: number;
  active?: boolean;
  resources?: FileList | null | File[] | Array<ChallengeDocument>;
};

export type ChallengesProps = Array<ChallengeProps> | [];

export type ChallengesStateObject = {
  active: ChallengesProps;
  inactive: ChallengesProps;
};
