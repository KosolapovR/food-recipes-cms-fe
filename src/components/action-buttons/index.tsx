import React, { AllHTMLAttributes } from 'react';

import Button from '../button';
import cn from 'classnames';

export interface IActionInfo {
  name: string;
  label: string;
  action: () => void;
  hidden?: boolean;
  isLoading?: boolean;
}
export interface IActionButtonProps extends AllHTMLAttributes<HTMLDivElement> {
  actions: IActionInfo[];
}
const ActionButtons = ({ actions, className, ...rest }: IActionButtonProps) => {
  return (
    <div {...rest} className={cn('flex space-x-1', className)}>
      {actions
        .filter((a) => !a.hidden)
        .map((action, index) => (
          <Button
            key={action.name}
            type="button"
            title={action.label}
            variant={index === 0 ? 'filled' : 'outlined'}
            onClick={() => {
              action.action();
            }}
            isLoading={action.isLoading}
          />
        ))}
    </div>
  );
};

export default ActionButtons;
