import { useState, type FC } from 'react'

import classes from './ProductCard.module.css'
import cardInfoIconStar from '../../../assets/cardInfoIconStar.svg'
import type { ProductCardType } from '../../../types'

export const ProductCard: FC<ProductCardType> = ({ id, image, description, price, rating, title, handleCardClick }) => {

    const [quantity, setQuantity] = useState(0)

    return (
        <div className={classes.card} onClick={(e) => handleCardClick(e, id)}>
            <div className={classes.image}>
                <img src={image}></img>
            </div>
            <div className={classes.info}>
                <div className={classes.title}>
                    <div className={classes.itemName}>
                        <h3>{title}</h3>
                    </div>
                    <div className={classes.description}>
                        <p>{description}</p>
                    </div>
                </div>
                <div className={classes.purchaseBlock}>
                    <div className={classes.purchaseInfoBlock}>
                        <h3>${price}</h3>
                        <span>{rating.rate} ({rating.count})</span>
                        <img className={classes.iconStar} width='10px' height='10px' src={cardInfoIconStar}></img>
                    </div>
                        {quantity > 0
                        ? <div className={classes.buttonsBlock}>
                            <button className={classes.decreaseButton} onClick={()=>setQuantity(quantity-1)}>-</button>
                            <span style={{minWidth:'10px'}}>{quantity}</span>
                            <button className={classes.increaseButton} onClick={()=>setQuantity(quantity+1)}>+</button>
                        </div>
                        : <button className={classes.purchaseButton} onClick={()=>(setQuantity(1))}>Add</button>
                    }
                </div>
            </div>
        </div>
    )
}