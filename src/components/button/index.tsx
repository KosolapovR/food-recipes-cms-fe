import React, { ButtonHTMLAttributes, useCallback } from 'react';
import cn from 'classnames';

import Spinner from '../spinner';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'filled' | 'outlined';
  scale?: 'MD' | 'SM';
  color?: 'regular' | 'success';
}

const Button = ({
  isLoading,
  title,
  onClick,
  variant,
  scale,
  className,
  color,
  ...props
}: IButton) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading) return;
      onClick(e);
    },
    [onClick, isLoading]
  );
  return (
    <button
      className={cn(
        'px-4 flex items-center justify-center rounded-md text-white',
        props.disabled && 'opacity-50',
        variant === 'outlined'
          ? color === 'regular'
            ? 'border-gray-400 text-gray-500 hover:bg-gray-100'
            : 'border-green-500 text-green-500  hover:bg-gray-100'
          : 'border bg-green-500 hover:bg-green-700',
        variant === 'outlined' && 'border bg-transparent',
        scale === 'SM' ? 'h-8 text-sm' : 'h-10',
        className
      )}
      {...props}
      onClick={handleClick}
    >
      {isLoading ? <Spinner /> : title}
    </button>
  );
};

export default Button;
