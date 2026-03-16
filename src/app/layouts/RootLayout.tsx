import { useLogout } from "@features/auth/logout/model/logout";
import { authClient } from "@shared/lib/auth-client";
import { Layout } from "@shared/ui/Layout/Layout";
import { Header } from "@widgets/header/Header";
import { Outlet } from "react-router";

import { useState } from "react";

type MeResponse = {
  user: {
    id: string;
    email: string;
    name?: string | null;
  };
  session: {
    id: string;
  };
};

export default function CurrentUser() {
  const { data, isPending, error } = authClient.useSession();
  const { handleLogout } = useLogout();

  if (isPending) return <p>Loading session...</p>;
  if (error) return <p>Session error</p>;
  if (!data) return <p>Not logged in</p>;

  return (
    <div>
      <h2>Current user</h2>
      <p>{data.user.email}</p>
      <p>ID: {data.user.id}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export const Me = () => {
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const loadMe = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3005/api/me", {
        credentials: "include",
      });

      if (!res.ok) {
        setData(null);
        alert("Not authorized");
        return;
      }

      const json = (await res.json()) as MeResponse;
      setData(json);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={loadMe} disabled={loading}>
        {loading ? "Loading..." : "Load /api/me"}
      </button>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export const RootLayout = () => {
  return (
    <Layout>
      <Header />
      <CurrentUser />
      <h1>--------</h1>
      <Me />
      <Outlet />
    </Layout>
  );
};
