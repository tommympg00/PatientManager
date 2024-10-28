/* eslint-disable @typescript-eslint/no-explicit-any */

import { forwardRef, type InputHTMLAttributes, type ReactElement } from 'react';
import { type FieldErrors } from 'react-hook-form';

import { camelCaseToSentence, cn, getErrorKey } from '@/utils';

export type InputProps = {
  containerClassName?: string;
  id: string;
  errors?: FieldErrors<Record<string, any>> | Record<string, { message: string }>;
  icon?: ReactElement;
  label?: string;
  labelClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type GroupedInputProps = {
  groupedFields: InputProps[];
  id: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      containerClassName = '',
      errors,
      id,
      label,
      labelClassName = '',
      placeholder,
      type = 'text',
      required,
      ...rest
    },
    ref
  ) => {
    const errorMessage = getErrorKey(id, errors)?.message;

    return (
      <div className={cn('mb-5 flex w-full flex-col', containerClassName)}>
        <div className="flex flex-row justify-between">
          <label className={cn('block text-left text-xs font-medium', labelClassName)} htmlFor={id}>
            {label ?? camelCaseToSentence(id)}
            {required && <span className="text-danger"> *</span>}
          </label>
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder ?? label ?? camelCaseToSentence(id)}
          className={cn(
            'mt-1 block h-12 w-full rounded-xl border px-3 outline-none focus:ring-1',
            getErrorKey(id, errors) && 'border-danger',
            className
          )}
          {...rest}
          ref={ref}
        />
        {errorMessage && <span className="w-full text-sm text-danger">{errorMessage}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
