import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { AdminRoutes, GuestRoutes, PrivateRoutes, ErrorPage } from '@/routes';
import {
  LoginPage,
  RegisterPage,
  TeamMembers,
  AdminPage,
  TeamPage,
  HomePage,
  ChallengePage,
  LeaderboardPage,
  ProfilePage
} from '@/pages';

import { loader as profileLoader } from '@/pages/Profile';

import AdminChallenge, {
  loader as adminChallengeLoader
} from '@/components/AdminChallenge';
import AdminUser, { loader as adminUserLoader } from '@/components/AdminUser';
import AdminTeam, { loader as adminTeamLoader } from '@/components/AdminTeam';

import { EditUser, ChallengeCreateForm, ChallengeEditForm } from '@/components';

import * as challengeAPI from '@/utils/services/challenge.service';
import * as adminAPI from '@/utils/services/admin.service';
import * as userAPI from '@/utils/services/user.service';

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
        element: <HomePage />
      },
      {
        path: 'challenges',
        element: <ChallengePage />,
        loader: async () => {
          const [error, response] = await userAPI.getChallenges();
          if (error) return [];
          return response;
        }
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />
      },
      {
        path: 'teams',
        element: <TeamPage id="battle1" name="Battle n°1" />
      },
      {
        path: 'team/:teamId',
        element: <TeamMembers />
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: profileLoader
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
            element: <ChallengeCreateForm />
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
        element: <AdminTeam />,
        loader: adminTeamLoader
      },
      {
        path: 'users',
        element: <AdminUser />,
        loader: adminUserLoader,
        children: [
          {
            path: 'edit/:id',
            element: <EditUser />,
            loader: async ({ params }) => {
              return await adminAPI.getOne(Number(params.id));
            }
          }
        ]
      },
      {
        path: 'leaderboard',
        element: <AdminChallenge />
      }
    ]
  }
]);
