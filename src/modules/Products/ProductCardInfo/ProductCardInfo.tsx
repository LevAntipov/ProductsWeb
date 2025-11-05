import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import classes from './ProductCardInfo.module.css'
import cardInfoIconStar from '../../../assets/cardInfoIconStar.svg'
import backToIcon from '../../../assets/backToIcon.png'
import type { DeepProductType } from '../../../types'

export const ProductCardInfo = () => {

    const [product, setProduct] = useState<DeepProductType | null>(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/' + id)
            .then((res) => res.json())
            .then((res) => setProduct(res))
    }, [])

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
                            <div className={classes.raiting}>
                                <span>{product.rating.rate} </span>
                                <span>({product.rating.count} reviews)</span>
                            </div>
                            <img className={classes.iconStar} width='20px' height='20px' src={cardInfoIconStar}></img>
                        </div>
                        <div className={classes.categoryBlock}>
                            <span>Category</span>
                            <span className={classes.categoryBlock}>{product.category}</span>
                        </div>
                        <div className={classes.priceBlock}>
                            <span>Price</span>
                            <span className={classes.price}>${product.price}</span>
                        </div>
                        <div className={classes.descriptionBlock}>
                            <span>Desciption</span>
                            <span>{product.description}</span>
                        </div>
                        <div className={classes.purchachesBlock}>
                            <div className={classes.quantityBlock}>
                                <span>Quantity</span>
                                <button className={classes.decreaseButton}>-</button>
                                2
                                <button className={classes.increaseButton}>+</button>
                            </div>
                            <button className={classes.addButton}>Add</button>
                        </div>
                    </div>
                </div>
                : <div>Loading</div>}
        </>
    )
}