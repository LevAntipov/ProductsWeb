import classes from './ProductsCart.module.css'
import { CartItem } from '../ProductCartItem/ProductCartItem'
import { useAppSelector } from '../../../shared/hooks'
import { selectChosenProducts } from '../../../redux/cartsReducer'



export const ProductsCart = () => {

    const products = useAppSelector(selectChosenProducts) // {id:qnty,id2:qnty2}

    return (<div className={classes.container}>
        <div>
            <h1>Shopping Cart</h1>
        </div>
        <div className={classes.cartItems}>
            {Object.entries(products).map(([id,quantity])=>{
                return <CartItem key={id} id={+id} quantity={quantity} />
            })}
        </div>
    </div>
    )
}

