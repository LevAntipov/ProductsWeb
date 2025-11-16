import { useEffect, useState, type FC } from "react"
import { useDispatch } from "react-redux"

import classes from './ProductCartItem.module.css'
import trashBin from '../../../assets/trashBin.png'
import type { HandleCardClick, ProductCartItemType, ProductId, ProductType } from "../../../types"
import { actionWithProduct, deleteChosenProduct } from "../../../redux/cartsReducer"
import { useNavigate } from "react-router"

export const CartItem: FC<ProductCartItemType> = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setProduct] = useState<ProductType | null>(null)

    const { id, quantity } = props
    let totalProductPrice = '0'

    if (product) {
        totalProductPrice = (product.price * quantity).toFixed(2)
    }

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) =>setProduct(data))
            
    }, [])

    const handleCardClick: HandleCardClick = (e, id) => {

        const action = (e.target as HTMLElement).getAttribute('data-action')

        if (action === 'inc') dispatch(actionWithProduct({ operation: 'increase', id }))
        else if (action === 'dec') dispatch(actionWithProduct({ operation: 'decrease', id }))
        else if (action === 'navigate') navigate(`/products/${id}`)
    }
    const handleDeleteCartProduct = (id: ProductId) => {
        dispatch(deleteChosenProduct(id))
    }

    return (
        <div className={classes.container} onClick={(e) => handleCardClick(e, id)}>
            {product
                ? <>
                    <div data-action='navigate' className={classes.image}>
                        <img data-action='navigate' src={product.image}></img>
                    </div>
                    <div className={classes.infoBlock} >
                        <h3 data-action='navigate' style={{ margin: '0' }}>{product.title}</h3>
                        <div className={classes.priceBlock}>
                            <span className={classes.price}>${product.price}</span>
                            <div className={classes.buttonsBlock}>
                                <button data-action='dec' className={classes.decreaseButton}>-</button>
                                <span style={{ minWidth: '10px' }}>{quantity}</span>
                                <button data-action='inc' className={classes.increaseButton}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.totalPurchase}>
                        <span>${totalProductPrice}</span>
                        <button type='button' className={classes.trashBin} onClick={() => handleDeleteCartProduct(id)}><img src={trashBin}></img></button>
                    </div>
                </>
                : <div>Loading product...</div>
            }
        </div>
    )
}