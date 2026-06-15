import { Outlet } from 'react-router';

import { Bounce, ToastContainer } from 'react-toastify';

import { Layout } from '@shared/ui/Layout/Layout';

import { Header } from '@widgets/header/ui/Header';

export const RootLayout = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </Layout>
  );
};
