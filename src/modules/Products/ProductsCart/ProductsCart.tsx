import classes from './ProductsCart.module.css'
import { CartItem } from '../ProductCartItem/ProductCartItem'
import { useAppSelector } from '../../../shared/hooks'
import { selectChosenProducts } from '../../../redux/cartsReducer'



export const ProductsCart = () => {

    const products = useAppSelector(selectChosenProducts)

    const ids = Object.keys(products)
    const quantity = Object.values(products)

    return (<div className={classes.container}>
        <div>
            <h1>Shopping Cart</h1>
        </div>
        <div className={classes.cartItems}>
            {ids.map((id, index) => {
                return <CartItem key={id} id={+id} quantity={quantity[index]} />
            })}
            { }
        </div>
    </div>
    )
}

