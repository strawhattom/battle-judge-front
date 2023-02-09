import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import AppRouter from './routes/router';

const App: React.FC = () => {
  const router = createBrowserRouter(AppRouter);
  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
