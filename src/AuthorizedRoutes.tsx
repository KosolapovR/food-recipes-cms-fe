import React from 'react';
import {
  DefaultGenerics,
  Outlet,
  ReactLocation,
  Route,
  Router,
} from '@tanstack/react-location';
import { useQueryClient } from '@tanstack/react-query';

import { fetchRecipes, fetchUsers } from './api';
import Layout from './layout/Layout';
import { Dashboard, Recipe, Recipes, User, Users } from './pages';
import { useAuth } from './query-hooks';

export interface IAuthorizedRoutesProps {
  location: ReactLocation;
}
const AuthorizedRoutes = (props: IAuthorizedRoutesProps) => {
  const queryClient = useQueryClient();
  const authData = useAuth();

  const publicRoutes: Route<DefaultGenerics>[] = [
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
            queryClient.fetchQuery(['recipes'], fetchRecipes),
        },
        { path: 'new', element: <Recipe /> },
        {
          path: ':recipeId',
          element: async ({ params }) => <Recipe id={params.recipeId} />,
        },
      ],
    },
  ];
  const privateRoutes: Route<DefaultGenerics>[] = [
    {
      path: 'users',
      children: [
        {
          path: '/',
          element: <Users />,
          loader: () =>
            queryClient.getQueryData(['users']) ??
            queryClient.fetchQuery(['users'], fetchUsers),
        },
        {
          path: ':userId',
          element: async ({ params }) => <User id={params.userId} />,
        },
      ],
    },
  ];
  const notFoundRoute: Route<DefaultGenerics> = {
    path: '*',
    element: <>404</>,
  };
  const nonAuthorizedRoutes: Route<DefaultGenerics>[] = [
    ...publicRoutes,
    notFoundRoute,
  ];
  const authorizedRoutes: Route<DefaultGenerics>[] = [
    ...publicRoutes,
    ...privateRoutes,
    notFoundRoute,
  ];

  return (
    <Router
      {...props}
      basepath={'cms'}
      routes={authData?.isAdmin ? authorizedRoutes : nonAuthorizedRoutes}
    >
      <Layout>
        <Outlet />
      </Layout>
    </Router>
  );
};

export default AuthorizedRoutes;
