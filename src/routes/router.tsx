import React from 'react';
import Root from './root';
import ErrorPage from './error-page';
import Challenge from '@/pages/Challenge';
import Leaderboard from '@/pages/Leaderboard';
import Register from '@/pages/Register';
import Team from '@/pages/Team';
import Profile from '@/pages/Profile';
import Home from '@/pages/Home';

// Admin
import AdminPage from '@/pages/Admin';
import AdminChallenge from '@/components/AdminChallenge';
import ChallengeForm from '@/components/ChallengeForm';

/*
 * Notre routeur qui va afficher le bon composant au bon endpoint (utilisé dans App.tsx dans la racine /)
 */
const AppRouter = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'challenges',
        element: <Challenge />
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'teams',
        element: <Team />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'admin',
        element: <AdminPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'challenges',
            element: <AdminChallenge />,
            children: [
              {
                path: 'create',
                element: <ChallengeForm />
              }
            ]
          }
        ]
      }
    ]
  }
];

export default AppRouter;
