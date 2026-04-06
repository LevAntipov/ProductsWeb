import { Outlet } from 'react-router';

import { Layout } from '@shared/ui/Layout/Layout';

import { Header } from '@widgets/header/Header';

export const RootLayout = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
};
