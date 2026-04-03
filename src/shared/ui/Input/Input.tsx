import type { InputHTMLAttributes } from 'react';
import type { FieldError as RHFFieldError } from 'react-hook-form';

import { FieldError } from '../FieldError/FieldError';
import classes from './Input.module.css';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  placeholder: string;
  type?: 'text' | 'email' | 'password';
  labelValue?: string;
  error?: RHFFieldError;
}

export const Input = ({
  placeholder,
  value,
  type = 'text',
  error,
  labelValue,
  ...props
}: InputProps) => {
  return (
    <div>
      {labelValue && <label>{labelValue}</label>}
      <input
        className={classes.input}
        type={type}
        placeholder={placeholder}
        {...props}
      ></input>

      {error && <FieldError errorMessage={error?.message ?? ''} />}
    </div>
  );
};
