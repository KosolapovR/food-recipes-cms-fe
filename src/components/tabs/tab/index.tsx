import React from 'react';
import cn from 'classnames';

export interface ITabProps extends React.AllHTMLAttributes<HTMLElement> {
  badgeFill?: 'success' | 'critic';
  selected?: boolean;
}

// eslint-disable-next-line
const noop = () => {};

export const Tab = ({
  label,
  className,
  onClick = noop,
  selected,
  disabled,
  badgeFill,
  ...rest
}: ITabProps) => (
  <button
    {...rest}
    disabled={disabled}
    type="button"
    onClick={disabled ? noop : onClick}
    className={cn(
      className,
      'py-2 flex justify-between items-center gap-2 -mb-0.5 border-b border-b-2',
      selected ? 'border-green-400 text-neutral-800' : 'border-transparent',
      !!badgeFill && 'pl-1'
    )}
  >
    {!!badgeFill && (
      <span
        className={cn(
          'inline-block w-1.5 h-1.5 rounded rounded-lg',
          badgeFill === 'critic' ? 'bg-red-600' : 'bg-green-400'
        )}
      />
    )}
    <span>{label}</span>
  </button>
);
