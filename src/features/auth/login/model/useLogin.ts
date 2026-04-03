import { useState } from 'react';

import { authClient } from '@shared/lib/auth-client';

export const useLogin = () => {
  const [authError, setAuthError] = useState<Error | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const { data } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/products',
      },
      {
        onSuccess: () => {
          alert('logged in!');
        },
        onError: (ctx) => {
          setAuthError(ctx.error);
        },
      }
    );

    // console.log('LOGIN DATA:', data);
  };

  return {
    authError,
    handleLogin,
  };
};
