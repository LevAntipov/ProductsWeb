import { createHashRouter, Navigate, Outlet } from "react-router";
import { useEffect } from "react";

import { checkChosenProducts } from "../redux/cartsReducer";
import { useAppDispatch } from "../shared/hooks";
import { Layout } from "../shared/ui/Layout/Layout";
import { CartPage } from "../pages/cart/ui/CartPage";
import { ProductInfo } from "../pages/product-info/ui/ProductInfo";
import { ProductPage } from "../pages/products/ui/ProductPage";
import { Header } from "../shared/ui/Header/Header";
import { LoginPage, RegisterPage } from "../pages/sign-in";

function Root() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkChosenProducts());
  }, []);

  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: <Navigate to="products" replace />,
      },
      {
        path: "products",
        Component: ProductPage,
      },
      {
        path: "products/:id",
        Component: ProductInfo,
      },
      {
        path: "carts",
        Component: CartPage,
      },
      {
        path: "auth",
        children: [
          { index: true, Component: LoginPage },
          { path: "register", Component: RegisterPage },
        ],
      },
    ],
  },
]);
