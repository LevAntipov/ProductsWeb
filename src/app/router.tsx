import { createHashRouter, Navigate, Outlet } from "react-router";
import React, { useEffect, useState } from "react";

import classes from "./Router.module.css";

import { Header } from "../modules/Header/Header";
import { Products } from "../modules/Products/Products/Products";
import { ProductCardInfo } from "../modules/Products/ProductCardInfo/ProductCardInfo";
import { ProductsCart } from "../modules/Products/ProductsCart/ProductsCart";
import { checkChosenProducts } from "../redux/cartsReducer";
import { useAppDispatch } from "../shared/hooks";
import { Register } from "../modules/Forms/Register";
import Login from "../modules/Forms/Login";

function Root() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkChosenProducts());
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <Header />
        <Outlet />
      </div>
    </div>
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
