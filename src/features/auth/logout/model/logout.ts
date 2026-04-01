import { authClient } from '@shared/lib/auth-client';

export const useLogout = () => {
  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    alert('logged out');
  };

  return {
    handleLogout,
  };
};
