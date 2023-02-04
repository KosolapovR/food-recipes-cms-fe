import React, { useCallback, useContext } from 'react';

import MoreIcon from '../../components/icons/more.svg';
import { AuthTokenContext } from '../../context/auth-token-context';
import { useAuth } from '../../query-hooks';

function Header() {
  const { setToken } = useContext(AuthTokenContext);
  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);

  const { email } = useAuth();

  return (
    <header className="fixed z-20 top-0 left-0 right-0 px-6 bg-white h-16 gap-4 shadow-md flex items-center justify-end">
      <span className="text-sm font-semibold">{email}</span>
      <MoreIcon fill={'#999999'} onClick={logout} />
    </header>
  );
}

export default Header;
