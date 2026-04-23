import type { ChangeEvent } from 'react';

import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@shared/ui/add-button/AddButton';
import { FieldError } from '@shared/ui/FieldError/FieldError';
import { Input } from '@shared/ui/Input/Input';

import { useLogin } from '../model/useLogin';
import classes from './sign-in.module.css';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const { authError, handleLogin } = useLogin();

  const emailField = register('email', {
    required: { message: 'email is required', value: true },
    pattern: {
      value: /[a-zA-Z0-9_%+.\-]+@[a-zA-Z0-9]+[a-zA-Z0-9\-]*\.[a-zA-Z]{2,4}/,
      message: 'Enter a valid email',
    },
  });
  const passField = register('password', {
    required: { message: 'Password is required', value: true },
    minLength: { message: 'min 6 symbols', value: 6 },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    handleLogin(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.authForm}>
      <h2>Login</h2>
      <label>Email: </label>
      <Input
        {...emailField}
        placeholder="email"
        type="email"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          emailField.onChange(e);
          clearErrors('email');
        }}
        error={errors.email}
        autoComplete="email"
      />

      <label>Password: </label>
      <Input
        {...passField}
        placeholder="password"
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          passField.onChange(e);
          clearErrors('password');
        }}
        error={errors.password}
        autoComplete="current-password"
      />

      <Button children="Log in" type="submit" />
      {authError && <FieldError errorMessage={authError.message} />}
    </form>
  );
};
