import React from 'react';
import cn from 'classnames';
import { ActivationUnionStatusType } from '../../interfaces';

export interface IStatusProps {
  status: ActivationUnionStatusType;
}

const Status = ({ status }: IStatusProps) => (
  <div
    className={cn(
      'h-2 w-2 rounded rounded-max',
      status === 'active' ? 'bg-green-400' : 'bg-red-600'
    )}
  />
);

export default Status;
