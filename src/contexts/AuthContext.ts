import React from 'react';

type AuthContextProps = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<null>>;
};

const iAuthContextState = {
  token: null,
  setToken: () => {
    return;
  }
};

const AuthContext = React.createContext<AuthContextProps>(iAuthContextState);

export default AuthContext;
