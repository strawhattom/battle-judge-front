import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthContext from '@/contexts/AuthContext';
import AppRouter from './routes/router';

const App: React.FC = () => {
  const [token, setToken] = React.useState(null);
  const router = createBrowserRouter(AppRouter);
  return (
    <React.StrictMode>
      <AuthContext.Provider value={{ token, setToken }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </React.StrictMode>
  );
};

export default App;
