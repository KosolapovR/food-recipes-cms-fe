import React from 'react';

export interface IAuthTokenContext {
  getToken: () => string | null;
  setToken: (t: string) => void;
}
export const AuthTokenContext = React.createContext<IAuthTokenContext>({
  getToken: () => null,
  setToken: (s) => {},
});
