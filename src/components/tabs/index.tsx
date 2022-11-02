import React from 'react';
import cn from 'classnames';
import { Tab } from './tab';

export interface ITabsOption {
  value: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
  badgeFill?: 'success' | 'critic';
}

export interface ITabsProps
  extends Omit<React.AllHTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: ITabsOption[];
  onChange?: (value: string, option?: ITabsOption) => void;
}

// eslint-disable-next-line
const noop = () => {};

export const Tabs = ({
  options = [],
  value,
  onChange = noop,
  className,
  ...restProps
}: ITabsProps) => {
  return (
    <div
      {...restProps}
      className={cn(
        className,
        'flex gap-6 border-b-2 border-neutral-200 text-neutral-400 text-xs'
      )}
    >
      {options
        .filter((x) => !x.hidden)
        .map((option, idx) => (
          <Tab
            key={idx}
            disabled={option.disabled}
            selected={value === option.value}
            onClick={() => {
              onChange(option.value, option);
            }}
            badgeFill={option.badgeFill}
            label={option.label}
          />
        ))}
    </div>
  );
};
