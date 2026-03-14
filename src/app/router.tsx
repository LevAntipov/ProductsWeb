import { createHashRouter, Navigate, Outlet } from "react-router";
import { useEffect } from "react";

import { Header } from "../modules/Header/Header";
import { Products } from "../modules/Products/Products/Products";
import { ProductCardInfo } from "../modules/Products/ProductCardInfo/ProductCardInfo";
import { ProductsCart } from "../modules/Products/ProductsCart/ProductsCart";
import { checkChosenProducts } from "../redux/cartsReducer";
import { useAppDispatch } from "../shared/hooks";
import { Register } from "../modules/Forms/Register";
import Login from "../modules/Forms/Login";
import { Layout } from "../shared/ui/Layout/Layout";

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
        Component: Products,
      },
      {
        path: "products/:id",
        Component: ProductCardInfo,
      },
      {
        path: "carts",
        Component: ProductsCart,
      },
      {
        path: "auth",
        children: [
          { index: true, Component: Login },
          { path: "register", Component: Register },
        ],
      },
    ],
  },
]);
