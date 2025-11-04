import { useState, type FC } from 'react'

import classes from './ProductCard.module.css'
import cardInfoIconStar from '../../../assets/cardInfoIconStar.svg'
import type { ProductCardType } from '../../../types'

export const ProductCard: FC<ProductCardType> = ({ id, image, description, price, rating, title, handleCardClick }) => {
    const [quantity, setQuantity] = useState(0)

    const handleQuantityBlockClick = (e:any) => {
        setQuantity(prev => prev + 1)
        if (e.target.tagName === 'BUTTON') {
            if (e.target.innerHTML === '+') {
                setQuantity(quantity + 1)
            }
            if (e.target.innerHTML === '-') {
                if (quantity !== 0){
                    setQuantity(quantity - 1)
                }
            }
        }
    }
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
                    {quantity === 0
                        ? <button onClick={handleQuantityBlockClick} className={classes.purchaseButton}>Add</button>
                        : <div onClick={handleQuantityBlockClick} className={classes.quantityButtonBlock}>
                            <button className={classes.decreaseButton}>-</button>
                            {quantity}
                            <button className={classes.increaseButton}>+</button>
                        </div>}
                </div>
            </div>
        </div>
    )
}