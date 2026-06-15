import { Navigate, Outlet} from 'react-router';

import { authClient } from '@shared/lib/auth-client';
import { Loader } from '@shared/ui/Loader/Loader';

export const ProtectedLayout = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) return <Loader />;

  if (!data) {
    return <Navigate to={'/auth'} state={{ reason: 'auth_required' }} replace />;
  }

  return <Outlet />;
};
