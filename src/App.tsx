import React, { useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from './api/axios-instance';
import {
  AuthTokenContext,
  IAuthTokenContext,
} from './context/auth-token-context';
import { API_TOKEN } from './const';
import Routes from './Routes';
import { getMe } from './api/auth';

const App = () => {
  const queryClient = useQueryClient();

  const [token, insertToken] = useState<string | null>(
    localStorage.getItem(API_TOKEN) !== 'null'
      ? localStorage.getItem(API_TOKEN)
      : null
  );

  const authContextValue = useMemo<IAuthTokenContext>(
    () => ({
      token,
      setToken: (t) => {
        insertToken(t);
        localStorage.setItem(API_TOKEN, t);
      },
    }),
    [token]
  );

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
        window.location.href = '/login';
        insertToken(null);
        localStorage.setItem(API_TOKEN, null);
        queryClient.clear();
      }
      return Promise.reject(error);
    }
  );

  const { isFetching } = useQuery(['auth'], getMe, { enabled: !!token });
  if (isFetching) return <div className="text-sm p-2">Loading...</div>;
  return (
    <AuthTokenContext.Provider value={authContextValue}>
      <Routes />
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
