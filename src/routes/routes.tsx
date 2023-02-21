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
import AdminChallenge, {
  loader as adminChallengeLoader
} from '@/components/AdminChallenge';
import AdminUser, { loader as adminUserLoader } from '@/components/AdminUser';
import ErrorPage from '@/routes/error-page';
import ChallengeForm from '@/components/ChallengeCreateForm';
import ChallengeEditForm from '@/components/ChallengeEditForm';

import * as challengeAPI from '@/utils/services/challenge.service';

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
    element: <PrivateRoutes />,
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
        element: <AdminChallenge />,
        loader: adminChallengeLoader,
        children: [
          {
            path: 'create',
            element: <ChallengeForm />
          },
          {
            path: 'edit/:id',
            element: <ChallengeEditForm />,
            loader: async ({ params }) => {
              return await challengeAPI.getOne(Number(params.id));
            }
          },
          {
            path: 'delete/:id',
            element: <AdminChallenge />
          }
        ]
      },
      {
        path: 'teams',
        element: <AdminChallenge />
      },
      {
        path: 'users',
        element: <AdminUser />,
        loader: adminUserLoader
      },
      {
        path: 'leaderboard',
        element: <AdminChallenge />
      }
    ]
  }
]);
