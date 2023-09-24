import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { FieldMetaProps } from 'formik';
import cn from 'classnames';
import autoAnimate from '@formkit/auto-animate';
import ChevronRight from '../../icons/chevron-right.svg';

export interface ITextFieldProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'form'> {
  meta: FieldMetaProps<string>;
}

const SelectField = ({ meta, className, ...props }: ITextFieldProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) autoAnimate(ref.current);
  }, [ref.current]);
  return (
    <div className="inline-block relative w-64">
      <label
        className={cn(
          'inline-block text-sm',
          meta?.touched && meta?.error ? 'text-red-500' : 'text-neutral-600'
        )}
        htmlFor={props.id}
      >
        {props.title}
      </label>
      <select
        {...props}
        className={cn(
          'w-full my-1 px-4 py-2 z-20 bg-neutral-200 rounded border border-solid placeholder:text-sm',
          meta?.touched && meta?.error
            ? 'placeholder:text-red-500 border-red-500'
            : 'border-transparent ',
          className
        )}
      >
        <option>Really long option that will likely overlap the chevron</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronRight fill={'#555555'} />
      </div>
      {meta?.touched && meta?.error && (
        <div className="text-red-500 text-xs">{meta?.error}</div>
      )}
    </div>
  );
};

export default SelectField;
