import { useLogout } from '@features/auth/logout/model/logout';

import { authClient } from '@shared/lib/auth-client';

export const ProfilePage = () => {
  const { data, isPending, error } = authClient.useSession();
  const { handleLogout } = useLogout();

  if (isPending) return <p>Loading session...</p>;
  if (error) return <p>Session error</p>;
  if (!data) return <p>Not logged in</p>;

  return (
    <div>
      <h2>Current user</h2>
      <p>Username: {data.user.name}</p>
      <p>Email: {data.user.email}</p>
      <p>ID: {data.user.id}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
