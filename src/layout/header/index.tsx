import React, { useCallback, useContext } from 'react';
import MoreIcon from '../../components/icons/more.svg';
import { AuthTokenContext } from '../../context/auth-token-context';

function Header() {
  const { setToken } = useContext(AuthTokenContext);
  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);

  return (
    <div className="fixed z-20 top-0 left-0 right-0 px-6 bg-white h-16 gap-4 shadow-md flex items-center justify-end">
      <span className="text-sm font-semibold">Arthur Solo</span>
      <MoreIcon fill={'#666666'} onClick={logout} />
    </div>
  );
}

export default Header;
