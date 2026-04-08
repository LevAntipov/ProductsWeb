import type { ChangeEvent } from 'react';

import { type SubmitHandler, useForm } from 'react-hook-form';

import classes from '@features/auth/login/ui/sign-in.module.css';
import { useRegister } from '@features/auth/register/model/useRegister';

import { Button } from '@shared/ui/add-button/AddButton';
import { FieldError } from '@shared/ui/FieldError/FieldError';
import { Input } from '@shared/ui/Input/Input';

type Inputs = {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const { handleRegister, checkPasswords, error: signUpError } = useRegister();

  const nameField = register('name', {
    required: { message: 'email is required', value: true },
    minLength: { message: 'name min 3 symbols', value: 3 },
  });
  const emailField = register('email', {
    required: { message: 'email is required', value: true },
    pattern: {
      value: /[a-zA-Z0-9_%+.\-]+@[a-zA-Z0-9]+[a-zA-Z0-9\-]*\.[a-zA-Z]{2,4}/,
      message: 'Enter a valid email',
    },
  });
  const passField = register('password', {
    required: { message: 'Password is required', value: true },
    minLength: { message: 'pass min 6 symbols', value: 6 },
  });
  const repeatedpassField = register('repeatedPassword', {
    required: { message: 'Password is required', value: true },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, name, password, repeatedPassword } = data;
    if (!checkPasswords(password, repeatedPassword)) {
      setError('repeatedPassword', { type: 'custom', message: 'passwords are not equal' });
      return;
    }
    handleRegister({ email, password, name });
  };

  return (
    <form className={classes.authForm} onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>

      <label>Username: </label>
      <Input
        {...nameField}
        placeholder="name"
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          nameField.onChange(e);
          clearErrors('name');
        }}
        error={errors.name}
      />

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
      />
      <Input
        {...repeatedpassField}
        placeholder="confirm password"
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          repeatedpassField.onChange(e);
          clearErrors('repeatedPassword');
        }}
        error={errors.repeatedPassword}
      />

      <Button type="submit" children="Register" />
      {signUpError && <FieldError errorMessage={signUpError.message} />}
    </form>
  );
};
