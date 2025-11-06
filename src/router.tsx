import { createHashRouter, Navigate, Outlet } from "react-router";
import classesR from './Router.module.css'

import { Header } from "./modules/Header/Header"
import { Products } from "./modules/Products/Products/Products";
import { ProductCardInfo } from "./modules/Products/ProductCardInfo/ProductCardInfo";
import {ProductsCart} from "./modules/Products/ProductsCart/ProductsCart"

function Root() {
    return (
        <div style={{ backgroundColor: '#1E1F26', color: '#E6E6E9' }}>
            <div className={classesR.body}>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}



export const router = createHashRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                element: <Navigate to="products" replace />,
            },
            {
                path: 'products', Component: Products,
            },
            {
                path: 'products/:id', Component: ProductCardInfo
            },
            {
                path: 'products/cart', Component: ProductsCart
            }
        ]

    }
]);