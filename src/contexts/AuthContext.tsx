import React, { useEffect, useState, useContext, createContext } from 'react';
import { type UserProps } from '@/types/UserProps';
import { loginHandler, getMe } from '@/utils/services/auth.service';

interface IAuthContext {
  user: UserProps;
  isAuth: boolean;
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
  isAuth: false,
  login: () => null,
  logout: () => null
};

const AuthContext = createContext<IAuthContext>(authContextDefault);

export const AuthProvider: React.FC<IAuthContextProvider> = ({ children }) => {
  const [user, setUser] = useState<UserProps>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadLocalUser = async () => {
    try {
      setLoading(true);
      const userData = await getMe();
      if (!userData) {
        return logout();
      }
      setIsAuth(true);
      return setUser(userData);
    } catch (error) {
      return logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocalUser();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await loginHandler(username, password);
    if (!response) throw new Error('Login failed');
    const self = await getMe();
    setUser(self);
    setIsAuth(true);
    return self;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt');
    setIsAuth(false);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuth }}>
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
