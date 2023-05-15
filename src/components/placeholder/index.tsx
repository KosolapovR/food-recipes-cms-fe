import React from 'react';
import { Icon } from '../index';

export interface IPlaceholder {
  label?: string;
}

export const Placeholder = ({ label = 'No data' }: IPlaceholder) => {
  return (
    <div className="flex flex-col justify-center items-center h-36">
      <Icon.EmptyList
        className="justify-center items-center"
        height={48}
        width={48}
        fill={'#888888'}
      />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};
