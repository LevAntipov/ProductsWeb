import { createHashRouter, Navigate } from 'react-router';

import { CartPage } from '@pages/cart/ui/CartPage';
import { ProductInfo } from '@pages/product-info/ui/ProductInfo';
import { ProductsPage } from '@pages/products/ui/ProductPage';
import { LoginPage, RegisterPage } from '@pages/sign-in';

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
        Component: CartPage,
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
