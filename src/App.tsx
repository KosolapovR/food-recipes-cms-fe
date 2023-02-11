import React, { useMemo, useState } from 'react';
import { MakeGenerics, ReactLocation } from '@tanstack/react-location';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AuthTokenContext,
  IAuthTokenContext,
} from './context/auth-token-context';
import { API_TOKEN } from './const';
import AppRouter from './AppRouter';

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

  const authContextValue = useMemo<IAuthTokenContext>(
    () => ({
      getToken: () => token,
      setToken: (t) => {
        insertToken(t);
        localStorage.setItem(API_TOKEN, t);
      },
    }),
    [token]
  );

  return (
    <AuthTokenContext.Provider value={authContextValue}>
      <AppRouter location={location} />
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
