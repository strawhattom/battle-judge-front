import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppRouter from './routes/router';

const App: React.FC = () => {
  const router = createBrowserRouter(AppRouter);
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
