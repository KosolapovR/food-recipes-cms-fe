import React, {
  ButtonHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import cn from 'classnames';
import autoAnimate from '@formkit/auto-animate';
import Spinner from '../spinner';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = ({
  isLoading,
  title,
  onClick,
  className,
  ...props
}: IButton) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    autoAnimate(ref.current);
  }, [ref.current]);
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
        'w-full h-10 flex items-center justify-center rounded rounded-lg bg-blue-500 hover:bg-blue-600 text-white',
        props.disabled && 'opacity-50',
        className
      )}
      ref={ref}
      {...props}
      onClick={handleClick}
    >
      {isLoading ? <Spinner /> : title}
    </button>
  );
};

export default Button;
