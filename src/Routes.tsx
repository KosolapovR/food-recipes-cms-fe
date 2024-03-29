import React, { useContext } from 'react';
import {
  MakeGenerics,
  Outlet,
  ReactLocation,
  Route,
  Router,
} from '@tanstack/react-location';
import { useQueryClient } from '@tanstack/react-query';

import { fetchAll as fetchAllRecipes } from './api/recipe';
import { fetchAll as fetchAllUsers } from './api/user';
import { fetchAll as fetchAllComments } from './api/comment';
import { BASE_PATH } from './const';
import { AuthTokenContext } from './context/auth-token-context';
import Layout from './layout/Layout';
import {
  Comments,
  Comment,
  Dashboard,
  Login,
  Recipe,
  Recipes,
  User,
  Users,
} from './pages';
import { useAuth } from './query-hooks';

type LocationGenerics = MakeGenerics<{
  Params: { recipeId: string; userId: string; commentId: string };
}>;
const location = new ReactLocation<LocationGenerics>();

const Routes = () => {
  const { token } = useContext(AuthTokenContext);
  const queryClient = useQueryClient();
  const authData = useAuth();

  const publicRoutes: Route<LocationGenerics>[] = [
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: 'recipes',
      children: [
        {
          path: '/',
          element: <Recipes />,
          loader: () =>
            queryClient.getQueryData(['recipes']) ??
            queryClient.fetchQuery(['recipes'], fetchAllRecipes),
        },
        { path: 'new', element: <Recipe /> },
        {
          path: ':recipeId',
          element: async ({ params }) => <Recipe id={params.recipeId} />,
        },
      ],
    },
    {
      path: 'comments',
      children: [
        {
          path: '/',
          element: <Comments />,
          loader: () =>
            queryClient.getQueryData(['comments']) ??
            queryClient.fetchQuery(['comments'], fetchAllComments),
        },
        {
          path: ':commentId',
          element: async ({ params }) => <Comment id={params.commentId} />,
        },
      ],
    },
  ];
  const privateRoutes: Route<LocationGenerics>[] = [
    {
      path: 'users',
      children: [
        {
          path: '/',
          element: <Users />,
          loader: () =>
            queryClient.getQueryData(['users']) ??
            queryClient.fetchQuery(['users'], fetchAllUsers),
        },
        {
          path: ':userId',
          element: async ({ params }) => <User id={params.userId} />,
        },
      ],
    },
  ];
  const notFoundRoute: Route<LocationGenerics> = {
    path: '*',
    element: <>404</>,
  };
  const nonAuthorizedRoutes: Route<LocationGenerics>[] = [
    ...publicRoutes,
    notFoundRoute,
  ];
  const authorizedRoutes: Route<LocationGenerics>[] = [
    ...publicRoutes,
    ...privateRoutes,
    notFoundRoute,
  ];

  return (
    <Router
      location={location}
      basepath={BASE_PATH}
      routes={authData?.isAdmin ? authorizedRoutes : nonAuthorizedRoutes}
    >
      {token ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Login />
      )}
    </Router>
  );
};

export default Routes;
