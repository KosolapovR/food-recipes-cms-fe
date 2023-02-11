import React, { useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { ReactLocation } from '@tanstack/react-location';
import { useQueryClient } from '@tanstack/react-query';

import { AuthTokenContext } from './context/auth-token-context';
import { Login } from './pages';
import AuthorizedRoutes from './AuthorizedRoutes';

export interface IRouterProps {
  location: ReactLocation;
}
const AppRouter = (props: IRouterProps) => {
  const queryClient = useQueryClient();
  const { getToken } = useContext(AuthTokenContext);

  axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
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
        queryClient.clear();
      }
      return Promise.reject(error);
    }
  );

  return getToken() ? (
    <AuthorizedRoutes location={props.location} />
  ) : (
    <Login />
  );
};

export default AppRouter;
