import React from 'react';

export interface IAuthTokenContext {
  token?: string;
  setToken: (t: string) => void;
}
export const AuthTokenContext = React.createContext<IAuthTokenContext>({
  setToken: () => undefined,
});
