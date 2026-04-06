import { useState } from 'react';

import { authClient } from '@shared/lib/auth-client';

export const useLogin = () => {
  const [authError, setAuthError] = useState<Error | null>(null);

  const handleLogin = async (email: string, password: string) => {
    debugger;
    const {} = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/products',
      },
      {
        onSuccess: () => {},
        onError: (ctx) => {
          setAuthError(ctx.error);
          console.log(ctx);
        },
      }
    );

    debugger;
  };

  return {
    authError,
    handleLogin,
  };
};
