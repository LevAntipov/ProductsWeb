import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import type { DeepProductType } from '../../../types'
import { CartItem } from '../ProductCartItem/ProductCartItem'
import classes from './ProductsCart.module.css'


export const ProductsCart = () => {

    const navigate = useNavigate()

    const [product1, setProduct1] = useState<DeepProductType | null>(null)
    const [product2, setProduct2] = useState<DeepProductType | null>(null)
    const [product3, setProduct3] = useState<DeepProductType | null>(null)

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/13")
            .then((res) => res.json())
            .then((res) => setProduct1(res))
    },[])
     useEffect(() => {
        fetch("https://fakestoreapi.com/products/2")
            .then((res) => res.json())
            .then((res) => setProduct2(res))
    },[])
     useEffect(() => {
        fetch("https://fakestoreapi.com/products/5")
            .then((res) => res.json())
            .then((res) => setProduct3(res))
    },[])

    if (product1 === null || product2 === null || product3 === null) {
        return <div>Loading</div>
    }
    return (<div className={classes.container}>
        <div>
            <h1>Shopping Cart</h1>
        </div>
        <div className={classes.cartItems}>
            {<CartItem key={product1.id} image={product1.image} price={product1.price} title={product1.title} />}
            {<CartItem key={product2.id} image={product2.image} price={product2.price} title={product2.title}/>}
            {<CartItem key={product3.id} image={product3.image} price={product3.price} title={product3.title}/>}
        </div>
    </div>
    )
}

