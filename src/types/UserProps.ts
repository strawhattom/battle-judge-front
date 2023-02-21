export type UserProps = {
  username: string;
  mail: string;
  team: number | null;
  role: string;
  token: string | null;
} | null;

export type UserInfoProps = {
  id: number;
  username: string;
  mail: string;
  team: number | null;
  role: string;
};

export type BulkUsers = UserInfoProps[] | null;
