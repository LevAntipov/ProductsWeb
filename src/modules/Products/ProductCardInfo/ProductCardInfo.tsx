import { useEffect, useState, type MouseEvent } from 'react'
import { useNavigate, useParams } from 'react-router'

import classes from './ProductCardInfo.module.css'
import cardInfoIconStar from '../../../assets/cardInfoIconStar.svg'
import backToIcon from '../../../assets/backToIcon.png'
import { useAppDispatch, useAppSelector } from '../../../shared/hooks'
import { getProduct } from '../../../redux/productsReducer'
import { addProduct } from '../../../redux/cartsReducer'

export const ProductCardInfo = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [quantity, setQuantity] = useState(0)
    const { id = '' } = useParams<{ id: string }>();
    const product = useAppSelector((state) => state.products.entities?.[+id!])
    const status = useAppSelector((state) => state.products.fetchProductStatus)

    useEffect(() => {
        if (!product) {
            dispatch(getProduct(+id))
        }
    }, [])

    const handleQuantityBlockClick = (e:MouseEvent<HTMLDivElement>) => {
        const textContent = (e.target as HTMLElement).innerHTML
        if(textContent === "Add to cart"){
            dispatch(addProduct({id:+id, quantity:quantity}))
            setQuantity(0)
        }
        else if(textContent === '+'){
            setQuantity(quantity+1)
        }
        else if(textContent === '-'){
            if(quantity > 0) setQuantity(quantity-1)
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
                        <div className={classes.purchachesBlock} onClick={(e) => handleQuantityBlockClick(e)}>
                            <div className={classes.quantityBlock}>
                                <span>Quantity</span>
                                <button className={classes.decreaseButton}>-</button>
                                {quantity}
                                <button className={classes.increaseButton}>+</button>
                            </div>
                            <button className={classes.addButton}>Add to cart</button>
                        </div>
                    </div>
                </div>
                : status === 'pending'
                    ? <div>Loading</div>
                    : <div>Something wrong</div>}
        </>
    )
}