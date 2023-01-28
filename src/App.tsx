import React, { useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import {
  MakeGenerics,
  Outlet,
  ReactLocation,
  Router,
} from '@tanstack/react-location';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './layout/Layout';
import { Dashboard, Recipe, Recipes, User, Users, Login } from './pages';
import {
  AuthTokenContext,
  IAuthTokenContext,
} from './context/auth-token-context';
import { fetchRecipes, fetchUsers } from './api';
import { API_TOKEN } from './const';

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

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error: AxiosError) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 403) {
        insertToken(null);
      }
      return Promise.reject(error);
    }
  );

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
            basepath={'cms'}
            routes={[
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
                    element: async ({ params }) => (
                      <Recipe id={params.recipeId} />
                    ),
                  },
                ],
              },
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
            ]}
          >
            <Layout>
              <Outlet />
            </Layout>
          </Router>
        ) : (
          <Login />
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthTokenContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
