import React from 'react';

import { Button } from '../index';
import EditIcon from '../icons/edit.svg';
import TrashIcon from '../icons/trash.svg';

export interface IFieldsBlock extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactElement[];
  remove: () => void;
  isOpen?: boolean;
  toggle?: (index: number) => void;
  index: number;
}

const FieldsBlock = ({
  children,
  remove,
  isOpen,
  toggle,
  index,
  ...rest
}: IFieldsBlock) => {
  return (
    <div {...rest}>
      {isOpen ? (
        <div>
          {children}
          <div className="flex justify-between">
            <Button scale="SM" title="READY" onClick={() => toggle(index)} />
            <Button
              scale="SM"
              title="DELETE"
              variant="outlined"
              color="regular"
              onClick={remove}
            />
          </div>
        </div>
      ) : (
        <div className="p-4 bg-sky-100 rounded-lg w-1/1">
          <div className="flex gap-2 justify-between">
            <div>
              {children.map((c) => (
                <div className="flex gap-2">
                  <p className="max-h-28 overflow-y-auto w-40 min-w-40">
                    {c.props?.title}
                  </p>
                  <p className="max-h-28 overflow-y-auto">{c.props?.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 min-w-20">
              <EditIcon fill="#999999" onClick={() => toggle(index)} />
              <TrashIcon fill="#999999" onClick={remove} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldsBlock;
