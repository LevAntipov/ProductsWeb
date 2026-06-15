import { useState } from 'react';

import { useNavigate } from 'react-router';

import { useAppDispatch } from '@app/appStore';

import { api } from '@shared/api/base-api';
import { authClient } from '@shared/lib/auth-client';

import type { UserData } from './types';

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
          navigate('/products');
          dispatch(api.util.resetApiState());
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
