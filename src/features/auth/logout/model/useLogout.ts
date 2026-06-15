import { store, useAppDispatch } from '@app/appStore';

import { api } from '@shared/api/base-api';
import { authClient } from '@shared/lib/auth-client';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(api.util.resetApiState());
    console.log(store.getState().api.queries);
    const { error } = await authClient.signOut();

    if (error) {
      return;
    }
    alert('logged out');
  };

  return {
    handleLogout,
  };
};
