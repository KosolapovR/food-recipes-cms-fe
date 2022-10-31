import React, { useEffect, useMemo, useState } from 'react';
import {
  MakeGenerics,
  Outlet,
  ReactLocation,
  Router,
} from '@tanstack/react-location';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from './layout/Layout';
import { Dashboard, Recipe, Recipes, User } from './pages';
import Users from './pages/users';
import {
  AuthTokenContext,
  IAuthTokenContext,
} from './context/auth-token-context';
import {
  fetchRecipes,
  fetchRecipeById,
  fetchUsers,
  fetchUserById,
} from './api';
import axios from 'axios';
import { API_TOKEN } from './const';
import Login from './pages/login';

type LocationGenerics = MakeGenerics<{
  Params: { recipeId: string; userId: string };
}>;

const location = new ReactLocation<LocationGenerics>();
const queryClient = new QueryClient();

const App = () => {
  const [token, insertToken] = useState<string | null>(
    localStorage.getItem(API_TOKEN) !== 'null'
      ? localStorage.getItem(API_TOKEN)
      : null
  );

  useEffect(() => {
    localStorage.setItem(API_TOKEN, token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);

  const authContextValue = useMemo<IAuthTokenContext>(
    () => ({
      getToken: () => token,
      setToken: insertToken,
    }),
    [token]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthTokenContext.Provider value={authContextValue}>
        {token ? (
          <Router
            location={location}
            routes={[
              {
                path: '/',
                element: <Dashboard />,
              },
              {
                path: 'recipes',
                loader: () =>
                  queryClient.getQueryData(['recipes']) ??
                  queryClient.fetchQuery(['recipes'], () => fetchRecipes()),
                children: [
                  { path: '/', element: <Recipes /> },
                  {
                    path: ':recipeId',
                    element: <Recipe />,
                    loader: ({
                      params: { recipeId },
                    }: {
                      params: { recipeId: string };
                    }) =>
                      queryClient.getQueryData(['recipes', recipeId]) ??
                      queryClient.fetchQuery(['recipes', recipeId], () =>
                        fetchRecipeById(recipeId)
                      ),
                  },
                ],
              },
              {
                path: 'users',
                loader: () =>
                  queryClient.getQueryData(['users']) ??
                  queryClient.fetchQuery(['users'], () => fetchUsers()),
                children: [
                  { path: '/', element: <Users /> },
                  {
                    path: ':userId',
                    element: <User />,
                    loader: ({
                      params: { userId },
                    }: {
                      params: { userId: string };
                    }) =>
                      queryClient.getQueryData(['users', userId]) ??
                      queryClient.fetchQuery(['users', userId], () =>
                        fetchUserById(userId)
                      ),
                  },
                ],
              },
            ]}
          >
            <Layout>
              <Outlet />
            </Layout>
          </Router>
        ) : (
          <Login />
        )}
      </AuthTokenContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
