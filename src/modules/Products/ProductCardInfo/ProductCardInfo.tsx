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
            <div className = {classes.backToTap}onClick={() => navigate(-1)}>
                <h4>Back to shop</h4>
                <img className={classes.backToIcon} src={backToIcon} width='20px' height='8px'></img>
            </div>
            {product
                ? <div className={classes.product}>
                        <div className={classes.img}>
                            <img src={product.image}></img>
                        </div>
                        <div className={classes.moreInfoBlock}>
                            <div>
                                <h2>{product.title}</h2>
                            </div>
                            <div className={classes.purchaseInfoBlock}>
                                <span>{product.rating.rate} ({product.rating.count})</span>
                                <img className={classes.iconStar} width='10px' height='10px' src={cardInfoIconStar}></img>
                            </div>
                            <div>
                                <span>Category</span>
                                <span>{product.category}</span>
                            </div>
                            <div>
                                <span>Price</span>
                                <span>${product.price}</span>
                            </div>
                            <div>
                                <span>Desciption</span>
                                <span>{product.description}</span>
                            </div>
                            <div>
                                <span>Quantity</span>
                                <div>
                                    <button>-</button>
                                    2
                                    <button>+</button>
                                </div>
                            </div>
                        </div>
                </div>
                : <div>Loading</div>}
        </>
    )
}