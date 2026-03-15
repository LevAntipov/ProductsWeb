import { CartPage } from "@pages/cart/ui/CartPage";
import { ProductInfo } from "@pages/product-info/ui/ProductInfo";
import { ProductsPage } from "@pages/products/ui/ProductPage";
import { LoginPage, RegisterPage } from "@pages/sign-in";
import { useAppDispatch } from "@shared/hooks";
import { Header } from "@shared/ui/Header/Header";
import { Layout } from "@shared/ui/Layout/Layout";
import { useEffect } from "react";
import { createHashRouter, Navigate, Outlet } from "react-router";
import { checkChosenProducts } from "redux/cartsReducer";
import { getProducts } from "redux/productsReducer";

function Root() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkChosenProducts());
  }, []);

  useEffect(() => {
    dispatch(getProducts());
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
        Component: ProductsPage,
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
