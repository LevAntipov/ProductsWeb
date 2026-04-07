import { Link } from 'react-router';

import { LoginForm } from '@features/auth/login/ui/LoginForm';
import classes from '@features/auth/login/ui/sign-in.module.css';

export function LoginPage() {
  return (
    <div className={classes.authPage}>
      <LoginForm />

      <Link to={'register'} className={classes.authForm}>
        Create account
      </Link>
    </div>
  );
}
