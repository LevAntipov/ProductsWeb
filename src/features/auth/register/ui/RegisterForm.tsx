import type { FormEvent } from 'react';

import { useRegister } from '@features/auth/register/model/useRegister';

import { FieldError } from '@shared/ui/FieldError/FieldError';
import { Input } from '@shared/ui/Input/Input';

import classes from './sign-in.module.css';

export const RegisterForm = () => {
  const {
    email,
    password,
    confirmPassword,
    error,
    handleRegister,
    setConfirmPassword,
    setEmail,
    setPassword,
  } = useRegister();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <form className={classes.authPage} onSubmit={handleSubmit}>
      <h2>Register</h2>

      <Input type="email" value={email} onChange={setEmail} placeholder="email" />

      <Input type="password" value={password} onChange={setPassword} placeholder="password" />

      <Input
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="password"
      />

      {error && <FieldError errorMessage={error} />}

      <button type="submit">Register</button>
    </form>
  );
};
