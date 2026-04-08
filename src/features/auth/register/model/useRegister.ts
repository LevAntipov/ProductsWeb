import { useState } from 'react';

import { authClient } from '@shared/lib/auth-client';

import type { UserData } from './types';

export const useRegister = () => {
  const [error, setError] = useState<Error | null>(null);

  const handleRegister = async (userData: UserData) => {
    const {} = await authClient.signUp.email(
      {
        ...userData,
        callbackURL: '/products',
      },
      {
        onError(ctx) {
          setError(ctx.error);
        },
        onSuccess() {
          alert('registered !');
        },
      }
    );
  };

  const checkPasswords = (a: string, b: string) => {
    return a === b;
  };

  return {
    error,
    handleRegister,
    checkPasswords,
  };
};
