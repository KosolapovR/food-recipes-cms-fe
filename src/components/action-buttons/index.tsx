import React from 'react';

import Button from '../button';

export interface IActionInfo {
  name: string;
  label: string;
  action: () => void;
  hidden?: boolean;
  isLoading?: boolean;
}
export interface IActionButtons {
  actions: IActionInfo[];
}
const ActionButtons = ({ actions }: IActionButtons) => {
  return (
    <div className="flex space-x-1">
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
