import React, { useEffect, useState, useContext, createContext } from 'react';
import { type UserProps } from '@/types/UserProps';
import { loginHandler, getMe } from '@/utils/services/auth.service';

interface IAuthContext {
  user: UserProps;
  loading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

interface IAuthContextProvider {
  children: React.ReactNode;
}

const authContextDefault = {
  user: null,
  loading: true,
  login: () => null,
  logout: () => null
};

const AuthContext = createContext<IAuthContext>(authContextDefault);

export const AuthProvider: React.FC<IAuthContextProvider> = ({ children }) => {
  const [user, setUser] = useState<UserProps>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocalUser();
  }, []);

  const loadLocalUser = async () => {
    try {
      const userData = await getMe();
      if (!userData) {
        setUser(null);
        localStorage.removeItem('jwt');
        return;
      }
      return setUser(userData);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const response = await loginHandler(username, password);
    if (!response) throw new Error('Login failed');
    const self = await getMe();
    setUser(self);
    return self;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt');
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default AuthContext;
