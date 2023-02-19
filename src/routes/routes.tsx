import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AdminRoutes from '@/routes/AdminRoutes';
import GuestRoutes from '@/routes/GuestRoutes';
import PrivateRoutes from '@/routes/PrivateRoutes';

import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';

import Home from '@/pages/Home';
import Challenge from '@/pages/Challenge';
import Leaderboard from '@/pages/Leaderboard';
import Team from '@/pages/Team';
import Profile from '@/pages/Profile';

import AdminPage from '@/pages/Admin';
import AdminChallengePage from '@/components/AdminChallenge';
import ErrorPage from '@/routes/error-page';
import ChallengeForm from '@/components/ChallengeForm';

export const router = createBrowserRouter([
  {
    element: <GuestRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  },
  {
    path: '/',
    // element: <PrivateRoutes />,
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
        path: 'teams',
        element: <Team />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin',
        element: <AdminPage />
      },
      {
        path: 'challenges',
        element: <AdminChallengePage />,
        children: [
          {
            path: 'create',
            element: <ChallengeForm />
          },
          {
            path: 'edit/:id',
            element: <AdminChallengePage />
          },
          {
            path: 'delete/:id',
            element: <AdminChallengePage />
          }
        ]
      },
      {
        path: 'teams',
        element: <AdminChallengePage />
      },
      {
        path: 'users',
        element: <AdminChallengePage />
      }
    ]
  }
]);
