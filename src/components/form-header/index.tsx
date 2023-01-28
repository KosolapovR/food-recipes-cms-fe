import React from 'react';

import Status from '../status';
import ActionButtons, { IActionInfo } from '../action-buttons';
import { ActivationUnionStatusType } from '../../interfaces';

export interface IFormHeaderProps {
  title: string;
  status?: ActivationUnionStatusType;
  actions: IActionInfo[];
  onSave: () => void;
}
const FormHeader = ({ title, actions, status, onSave }: IFormHeaderProps) => (
  <div className="flex justify-between space-x-4 py-2 bg-slate-50 border-b-gray-300 border-b sticky top-16 pt-4 z-10">
    <div>
      <span className="truncate">{title}</span>
      {status && (
        <div className="flex space-x-2 items-center uppercase">
          <Status status={status} />
          <span>{status}</span>
        </div>
      )}
    </div>
    <ActionButtons
      actions={actions.map((a) =>
        a.name === 'save'
          ? {
              ...a,
              action: onSave,
            }
          : a
      )}
    />
  </div>
);

export default FormHeader;
