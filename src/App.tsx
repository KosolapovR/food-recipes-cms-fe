import React, { useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { MakeGenerics, ReactLocation } from '@tanstack/react-location';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQueryClient } from '@tanstack/react-query';
import {
  AuthTokenContext,
  IAuthTokenContext,
} from './context/auth-token-context';
import { API_TOKEN } from './const';
import AppRouter from './AppRouter';
import { me } from './api/auth';

type LocationGenerics = MakeGenerics<{
  Params: { recipeId: string; userId: string };
}>;

const location = new ReactLocation<LocationGenerics>();

const App = () => {
  const [token, insertToken] = useState<string | null>(
    localStorage.getItem(API_TOKEN) !== 'null'
      ? localStorage.getItem(API_TOKEN)
      : null
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    localStorage.setItem(API_TOKEN, token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const queryKey = ['auth'];
    async function getMe() {
      try {
        const user = await queryClient.fetchQuery({
          queryKey,
          queryFn: me,
        });
        queryClient.setQueryData(queryKey, () => user);
      } catch (error) {
        queryClient.resetQueries({ queryKey, exact: true });
      }
    }
    const authData = queryClient.getQueryData(queryKey);
    if (token && !authData) getMe();
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
      if (error.response.status === 401) {
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
    <AuthTokenContext.Provider value={authContextValue}>
      <AppRouter token={token} location={location} />
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
  );
};

export default App;
