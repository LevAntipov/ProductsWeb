import { createHashRouter, Navigate } from 'react-router';

import { CartPage } from '@pages/cart/ui/CartPage';
import { OrderPage } from '@pages/orders/ui/OrderPage';
import { ProductInfo } from '@pages/product-info/ui/ProductInfo';
import { ProductsPage } from '@pages/products/ui/ProductPage';
import { ProfilePage } from '@pages/profile/ui/ProfilePage';
import { LoginPage, RegisterPage } from '@pages/sign-in';

import { ProtectedLayoute } from './layouts/ProtectedLayout';
import { RootLayout } from './layouts/RootLayout';

export const router = createHashRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Navigate to="products" replace />,
      },
      {
        path: 'products',
        Component: ProductsPage,
      },
      {
        path: 'products/:id',
        Component: ProductInfo,
      },
      {
        path: 'cart',
        Component: ProtectedLayoute,
        children: [{ index: true, Component: CartPage }],
      },
      {
        path: 'profile',
        Component: ProtectedLayoute,
        children: [{ index: true, Component: ProfilePage }],
      },
      {
        path: 'orders',
        Component: ProtectedLayoute,
        children: [{ index: true, Component: OrderPage }],
      },
      {
        path: 'auth',
        children: [
          { index: true, Component: LoginPage },
          { path: 'register', Component: RegisterPage },
        ],
      },
    ],
  },
]);
