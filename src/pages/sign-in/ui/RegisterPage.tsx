import classes from '@features/auth/login/ui/sign-in.module.css';
import { RegisterForm } from '@features/auth/register/ui/RegisterForm';

export const RegisterPage = () => {
  return (
    <div className={classes.authPage}>
      <RegisterForm />
    </div>
  );
};
