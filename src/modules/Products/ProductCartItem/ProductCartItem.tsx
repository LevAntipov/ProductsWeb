import type { FC } from "react"

import classes from './ProductCartItem.module.css'
import trashBin from '../../../assets/trashBin.png'
import type { ProductCartItemType } from "../../../types"

export const CartItem: FC<ProductCartItemType> = (props) => {

    const { image, price, title } = props

    return (
        <div className={classes.container}>
            <div className={classes.image}>
                <img src={image}></img>
            </div>
            <div className={classes.infoBlock}>
                <h3 style={{ margin: '0' }}>{title}</h3>
                <div className={classes.priceBlock}>
                    <span className={classes.price}>${price}</span>
                    <div className={classes.buttonsBlock}>
                        <button className={classes.decreaseButton}>-</button>
                        <span style={{ minWidth: '10px' }}>10</span>
                        <button className={classes.increaseButton}>+</button>
                    </div>
                </div>
            </div>
            <div className={classes.totalPurchase}>
                <span>${648}</span>
                <div className={classes.trashBin}><img src={trashBin}></img></div>
            </div>
        </div>
    )
}