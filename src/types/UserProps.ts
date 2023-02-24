export type UserTeamProps = {
  id: number;
  name: string;
} | null;

export type UserProps = {
  username: string;
  mail: string;
  team: UserTeamProps;
  role: string;
  token: string | null;
  team_size: number;
} | null;

export type UserInfoProps = {
  id: number;
  username: string;
  mail: string;
  team: UserTeamProps;
  role: string;
};

export type BulkUsers = UserInfoProps[] | null;
