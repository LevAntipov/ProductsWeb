import { createBrowserRouter, Link, Outlet, useNavigate } from "react-router";
import milk from './mil.jpeg'



function Root() {
    return (
        <>
            <Link to='/ProductsWeb/about'>About</Link>
            <Link to='/ProductsWeb/food'>Food</Link>
            <Link to='/ProductsWeb/milk'>Milk</Link>
            <h1>Food or Milk below</h1>
            <Outlet />
        </>
    )
}

function About() {
    const navigate = useNavigate()

    return (
        <>
            <h1>About</h1>
            <button onClick={() => navigate(-1)}>Tap to back</button>
        </>
    )
}

function Food() {
    const navigate = useNavigate()

    return (
        <>
            <h1>Food</h1>
            <button onClick={() => navigate(-1)}>Tap to back</button>
        </>
    )
}
function Milk() {
    const navigate = useNavigate()

    return (
        <>
            <h1>Milk</h1>
            <img src={milk}></img>
            <button onClick={() => navigate(-1)}>Tap to back</button>
        </>
    )
}

export const router = createBrowserRouter([
    {
        path: "/ProductsWeb/",
        Component: Root,
        children:[
            {path:'food', Component:Food},
            {path:'milk', Component:Milk},
        ]

    },
    {
        path: "/ProductsWeb/about",
        Component: About,
    }
]);