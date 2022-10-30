import React, { useEffect, useMemo, useState } from 'react';
import {
  MakeGenerics,
  Outlet,
  ReactLocation,
  Router,
} from '@tanstack/react-location';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

type LocationGenerics = MakeGenerics<{
  Params: { recipeId: string; userId: string };
}>;

const location = new ReactLocation<LocationGenerics>();
const queryClient = new QueryClient();

const dev = true;
const App = () => {
  const [token, insertToken] = useState<string>(
    localStorage.getItem(API_TOKEN)
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
        {dev ? (
          <Router
            location={location}
            routes={
              dev
                ? [
                    {
                      path: '/',
                      element: <Dashboard />,
                    },
                    {
                      path: 'recipes',
                      loader: () =>
                        queryClient.getQueryData(['recipes']) ??
                        queryClient.fetchQuery(['recipes'], () =>
                          fetchRecipes()
                        ),
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
                  ]
                : [
                    {
                      path: '/signUp',
                      element: 'Pleas sign up!',
                    },
                  ]
            }
          >
            <Layout>
              <Outlet />
            </Layout>
          </Router>
        ) : (
          <>sign Up</>
        )}
      </AuthTokenContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
