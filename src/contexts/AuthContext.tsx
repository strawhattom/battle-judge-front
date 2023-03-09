import React, { useEffect, useState, useContext, createContext } from 'react';
import type { UserAPIProps, UserInfoProps } from '@/types/UserProps';
import {
  loginHandler,
  getMe,
  type LoginResponse
} from '@/utils/services/auth.service';

interface IAuthContext {
  user: UserAPIProps | null;
  isAuth: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

interface IAuthContextProvider {
  children: React.ReactNode;
}

const authContextDefault = {
  user: null,
  loading: true,
  isAuth: false,
  login: async () => ({ status: 404, data: 'Not found' }),
  logout: () => undefined
};

const AuthContext = createContext<IAuthContext>(authContextDefault);

export const AuthProvider: React.FC<IAuthContextProvider> = ({ children }) => {
  const [user, setUser] = useState<UserAPIProps | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadLocalUser = async () => {
    try {
      if (!localStorage.getItem('jwt')) return;
      setLoading(true);
      const userData = await getMe();
      if (!userData) {
        throw new Error('No user found');
      }
      setIsAuth(true);
      setUser(userData);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocalUser();
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<LoginResponse> => {
    const [error, response] = await loginHandler(username, password);
    // Si il y a une erreur ou si le status est 404 ou si la réponse est un texte (message erreur)
    if (error || response.status === 404 || typeof response.data === 'string') {
      logout();
      return response;
    }
    localStorage.setItem('jwt', response.data.token);
    // Récupère les infos de l'utilisateur grâce au token dans le localStorage (au dessus)
    const self = await getMe(); // null or user object
    setUser(self);
    setIsAuth(true);
    return response;
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('jwt');
    setIsAuth(false);
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
