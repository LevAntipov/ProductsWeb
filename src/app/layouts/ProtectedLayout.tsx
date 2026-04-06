import { Navigate, Outlet } from 'react-router';

import { authClient } from '@shared/lib/auth-client';
import { Loader } from '@shared/ui/Loader/Loader';

export const ProtectedLayoute = () => {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) return <Loader />;

  if (!data) return <Navigate to={'/auth'} replace />;

  return <Outlet />;
};
