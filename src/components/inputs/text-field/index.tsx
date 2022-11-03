import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { FieldMetaProps } from 'formik';
import cn from 'classnames';
import autoAnimate from '@formkit/auto-animate';

export interface ITextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form'> {
  meta: FieldMetaProps<string>;
}

const TextField = ({ meta, className, ...props }: ITextFieldProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    autoAnimate(ref.current);
  }, [ref.current]);
  return (
    <div className="text-left " ref={ref}>
      <label
        className={cn(
          'inline-block text-sm',
          meta?.touched && meta?.error ? 'text-red-500' : 'text-neutral-600'
        )}
        htmlFor={props.id}
      >
        {props.title}
      </label>
      <input
        type="text"
        {...props}
        className={cn(
          'w-full my-1 px-4 py-2 z-20 bg-neutral-200 rounded border border-solid placeholder:text-sm',
          meta?.touched && meta?.error
            ? 'placeholder:text-red-500 border-red-500'
            : 'border-transparent ',
          className
        )}
      />
      {meta?.touched && meta?.error && (
        <div className="text-red-500 text-xs">{meta?.error}</div>
      )}
    </div>
  );
};

export default TextField;
