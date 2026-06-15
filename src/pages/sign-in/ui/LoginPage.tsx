import { useEffect } from 'react';

import { Link, useLocation } from 'react-router';

import { toast } from 'react-toastify';

import { LoginForm } from '@features/auth/login/ui/LoginForm';
import classes from '@features/auth/login/ui/sign-in.module.css';

export function LoginPage() {
  const { state } = useLocation();

  useEffect(() => {
    if (state?.reason === 'auth_required') {
      toast.info('You need to log in!');
    }
  }, [state]);
  return (
    <div className={classes.authPage}>
      <LoginForm />
      <Link to={'register'} className={classes.authForm}>
        Create account
      </Link>
    </div>
  );
}
