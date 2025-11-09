import { useEffect, useState, type FC } from "react"

import classes from './ProductCartItem.module.css'
import trashBin from '../../../assets/trashBin.png'
import type { HandleCardClick, ProductCartItemType, ProductId, ProductType } from "../../../types"
import { useDispatch } from "react-redux"
import { getProduct } from "../../../redux/productsReducer"
import { actionWithProduct, deleteChosenProduct } from "../../../redux/cartsReducer"

export const CartItem: FC<ProductCartItemType> = (props) => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState<ProductType | null>(null)

    const { id, quantity } = props
    let totalProductPrice = '0'

    if (product) {
        totalProductPrice = (product.price * quantity).toFixed(2)
    }

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
    }, [])

    const handleCardClick: HandleCardClick = (e, id) => {

        const element = (e.target as HTMLElement)

        if (element.innerHTML === '+') {
            dispatch(actionWithProduct({ operation: 'increase', id }))
        }
        else if (element.innerHTML === '-') {
            dispatch(actionWithProduct({ operation: 'decrease', id }))
        }
        else {
            //navigate(`${id}`)
        }
    }
    const handleDeleteCartProduct: HandleCardClick = (e, id: ProductId) => {
        dispatch(deleteChosenProduct(id))
    }

    return (
        <div className={classes.container}>
            {product
                ? <>
                    <div className={classes.image}>
                        <img src={product.image}></img>
                    </div>
                    <div className={classes.infoBlock} onClick={(e) => handleCardClick(e, id)}>
                        <h3 style={{ margin: '0' }}>{product.title}</h3>
                        <div className={classes.priceBlock}>
                            <span className={classes.price}>${product.price}</span>
                            <div className={classes.buttonsBlock}>
                                <button className={classes.decreaseButton}>-</button>
                                <span style={{ minWidth: '10px' }}>{quantity}</span>
                                <button className={classes.increaseButton}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.totalPurchase}>
                        <span>${totalProductPrice}</span>
                        <div className={classes.trashBin} onClick={(e) => handleDeleteCartProduct(e, id)}><img src={trashBin}></img></div>
                    </div>
                </>
                : <div>Loading product...</div>
            }
        </div>
    )
}