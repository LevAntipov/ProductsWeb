import { Layout } from "@shared/ui/Layout/Layout";
import { Header } from "@widgets/header/Header";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
};
