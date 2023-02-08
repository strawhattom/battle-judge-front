import React from 'react';
import { type UserProps } from '@/types/UserProps';

interface IAuthContext {
  user: UserProps;
  login: (user: UserProps) => void;
  logout: () => void;
}

const authContextDefault = {
  user: null,
  login: () => null,
  logout: () => null
};

const AuthContext = React.createContext<IAuthContext>(authContextDefault);

export default AuthContext;
