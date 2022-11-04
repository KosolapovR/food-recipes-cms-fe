import React, { useCallback, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import MoreIcon from '../../components/icons/more.svg';
import { AuthTokenContext } from '../../context/auth-token-context';

interface IAuth {
  email: string;
  isAdmin?: boolean;
}

function Header() {
  const { setToken } = useContext(AuthTokenContext);
  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);

  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData<IAuth>(['auth']);

  return (
    <header className="fixed z-20 top-0 left-0 right-0 px-6 bg-white h-16 gap-4 shadow-md flex items-center justify-end">
      <span className="text-sm font-semibold">{authData?.email}</span>
      <MoreIcon fill={'#999999'} onClick={logout} />
    </header>
  );
}

export default Header;
