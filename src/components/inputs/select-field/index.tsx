import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FieldMetaProps } from 'formik';
import cn from 'classnames';
import autoAnimate from '@formkit/auto-animate';
import ChevronRight from '../../icons/chevron-right.svg';

export interface IOption {
  value: string;
  label: string;
}
export interface ISelectFieldProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'form'> {
  meta: FieldMetaProps<string>;
  options: IOption[];
}

const SelectField = ({
  meta,
  className,
  options,
  ...props
}: ISelectFieldProps) => {
  return (
    <div className="inline-block relative w-72">
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
          'w-full my-1 px-4 py-2 pr-8 z-20 bg-neutral-200 rounded border border-solid placeholder:text-sm appearance-none cursor-pointer',
          meta?.touched && meta?.error
            ? 'placeholder:text-red-500 border-red-500'
            : 'border-transparent ',
          className
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div
        className={
          'pointer-events-none absolute inset-y-0 right-0 -bottom-6 flex items-center px-2 text-gray-700 rotate-90'
        }
      >
        <ChevronRight fill={'#555555'} />
      </div>
      {meta?.touched && meta?.error && (
        <div className="text-red-500 text-xs">{meta?.error}</div>
      )}
    </div>
  );
};

export default SelectField;
