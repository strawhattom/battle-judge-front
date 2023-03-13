import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { router } from '@/routes/routes';
import { LinearProgress } from '@mui/material';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<LinearProgress />} />
    </AuthProvider>
  );
};

export default App;
