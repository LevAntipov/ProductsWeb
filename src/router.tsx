import { createBrowserRouter, Link, Outlet, useNavigate, useParams } from "react-router";
import classesR from './Router.module.css'

import {Header} from './modules/Header/Header'
import { Products } from "./modules/Products/Products/Products";
import { ProductCardInfo } from "./modules/Products/ProductCardInfo/ProductCardInfo";


function Root() {
    return (
        <div style={{backgroundColor:'#1E1F26', color:'#E6E6E9'}}>
            <div className={classesR.body}>
            <Header/>
            <Outlet />
        </div>
        </div>
    )
}

export const router = createBrowserRouter([
    {
        path: "/ProductsWeb/",
        Component: Root,
        children: [
            {
                path: 'products', Component: Products,
            },
            {
                path: 'products/:id', Component: ProductCardInfo
            }
        ]

    }
]);