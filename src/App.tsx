import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthContext from '@/contexts/AuthContext';
import { useAuth } from '@/utils/hooks/useAuth';
import AppRouter from './routes/router';

const App: React.FC = () => {
  const { user, login, logout } = useAuth();
  const router = createBrowserRouter(AppRouter);
  return (
    <React.StrictMode>
      <AuthContext.Provider value={{ user, login, logout }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </React.StrictMode>
  );
};

export default App;
