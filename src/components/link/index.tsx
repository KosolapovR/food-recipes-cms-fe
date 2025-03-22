import React, { AllHTMLAttributes } from 'react';

function Link({ children, ...rest }: AllHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...rest}
      className={'text-sm text-blue-500 hover:text-blue-700 cursor-pointer'}
    >
      {children}
    </a>
  );
}

export default Link;
