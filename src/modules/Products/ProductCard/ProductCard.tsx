import { type FC } from 'react'
import classes from './ProductCard.module.css'
import cardInfoIconStar from '../../../assets/cardInfoIconStar.svg'
import type { ProductCardType } from '../../../types'
import { useAppSelector } from '../../../shared/hooks'

export const ProductCard: FC<ProductCardType> = ({ id, quantity, handleCardClick }) => {

    const product = useAppSelector((state) => state.products.entities[id])
    const {image, description, price, rating, title} = product

    if (!product) return <div className={classes.card}>Loading...</div>

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
                        {quantity === undefined 
                        ? <button data-action="add" className={classes.purchaseButton} type='button'>Add</button>
                        : <div className={classes.buttonsBlock}>
                            <button data-action="dec" className={classes.decreaseButton} type='button'>-</button>
                            <span style={{minWidth:'10px'}}>{quantity}</span>
                            <button data-action="inc" className={classes.increaseButton} type='button'>+</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}