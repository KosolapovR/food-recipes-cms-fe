import React from 'react';
import Layout from './layout/Layout';
import {
  DefaultGenerics,
  Outlet,
  ReactLocation,
  Route,
  Router,
} from '@tanstack/react-location';
import { Dashboard, Login, Recipe, Recipes, User, Users } from './pages';
import { fetchRecipes, fetchUsers } from './api';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from './query-hooks';

export interface IRouterProps {
  token?: string;
  location: ReactLocation;
}
const AppRouter = ({ token, location }: IRouterProps) => {
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();

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

  return token ? (
    <Router
      location={location}
      basepath={'cms'}
      routes={isAdmin ? authorizedRoutes : nonAuthorizedRoutes}
    >
      <Layout>
        <Outlet />
      </Layout>
    </Router>
  ) : (
    <Login />
  );
};

export default AppRouter;
