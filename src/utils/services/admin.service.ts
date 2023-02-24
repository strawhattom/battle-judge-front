import { BulkUsers } from '@/types/UserProps';
import * as api from '@/utils/api';

export const loadUsers = async (): Promise<BulkUsers> => {
  const [error, response] = await api.get('users');
  if (error) return null;
  const users: BulkUsers = response;
  return users;
};
