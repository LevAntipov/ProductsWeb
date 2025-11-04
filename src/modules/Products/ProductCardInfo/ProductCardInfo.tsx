import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import classes from './ProductCardInfo.module.css'
import cardInfoIconStar from '../../../assets/cardInfoIconStar.svg'
import backToIcon from '../../../assets/backToIcon.png'
import type { DeepProductType } from '../../../types'

export const ProductCardInfo = () => {

    const [product, setProduct] = useState<DeepProductType | null>(null)
    const [quantity, setQuantity] = useState(0)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/' + id)
            .then((res) => res.json())
            .then((res) => setProduct(res))
    }, [])

    const handleQuantitybuttonClick = (e: any) => {
        if (e.target.tagName === 'BUTTON') {
            if (e.target.innerHTML === '+') {
                setQuantity((prev) => prev + 1)
            }
            if (e.target.innerHTML === '-') {
                if(quantity !== 0) setQuantity((prev) => prev - 1)
            }
        }

    }

    return (
        <>
            <div className={classes.backToTap} onClick={() => navigate(-1)}>
                <h4>Back to shop</h4>
                <img className={classes.backToIcon} src={backToIcon} width='20px' height='8px'></img>
            </div>
            {product
                ? <div className={classes.product}>
                    <div className={classes.img}>
                        <img src={product.image}></img>
                    </div>
                    <div className={classes.moreInfoBlock}>
                        <div className={classes.title}>
                            <h2>{product.title}</h2>
                        </div>
                        <div className={classes.raitingBlock}>
                            <div>
                                <span className={classes.raiting}>{product.rating.rate}</span>
                                <span> ({product.rating.count} reviews)</span>
                            </div>
                            <img className={classes.iconStar} width='20px' height='20px' src={cardInfoIconStar}></img>
                        </div>
                        <div className={classes.categoryBlock}>
                            <span>Category</span>
                            <span className={classes.categoryValue}>{product.category}</span>
                        </div>
                        <div className={classes.priceBlock}>
                            <span>Price</span>
                            <span className={classes.price}>${product.price}</span>
                        </div>
                        <div className={classes.descriptionBlock}>
                            <span>Desciption</span>
                            <span className={classes.description}>{product.description}</span>
                        </div>
                        <div className={classes.purchaseBlock}>
                            <div className={classes.quantityBlock}>
                                <span>Quantity</span>
                                <div onClick={handleQuantitybuttonClick} className={classes.quantityButtonBlock}>
                                    <button className={classes.decreaseButton}>-</button>
                                    {quantity}
                                    <button className={classes.increaseButton}>+</button>
                                </div>
                            </div>
                            <div className={classes.addBtn}>
                                <button>Add to Card</button>
                            </div>
                        </div>
                    </div>
                </div>
                : <div>Loading</div>}
        </>
    )
}