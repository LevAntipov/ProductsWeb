import { useEffect } from "react"
import { useNavigate } from "react-router"

import type { HandleCardClick } from "../../../types"

import classes from './Products.module.css'
import { useAppDispatch, useAppSelector } from "../../../shared/hooks"
import { ProductCard } from "../ProductCard/ProductCard"
import { getProducts } from "../../../redux/productsReducer"
import { actionWithProduct } from "../../../redux/cartsReducer"
import { selectChosenProducts } from "../../../redux/cartsReducer"
import { selectFilteredIds } from "../../../shared/selectors"


export const Products = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const chosenProducts = useAppSelector(selectChosenProducts)
    const filteredIds = useAppSelector(selectFilteredIds)

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const handleCardClick: HandleCardClick = (e, id) => {

        const action = (e.target as HTMLElement).getAttribute('data-action')

        if (action === 'add') dispatch(actionWithProduct({ operation: 'add', id }))
        else if (action === 'inc') dispatch(actionWithProduct({ operation: 'increase', id }))
        else if (action === 'dec') dispatch(actionWithProduct({ operation: 'decrease', id }))
        else navigate(`${id}`)
    }

    return (
        <div className={classes.container}>
            <div className={classes.offerBlock}><button className={classes.offerLink}>Offer your product</button></div>
            {
                filteredIds && filteredIds.map((id) => {
                    return <ProductCard key={id} id={id} quantity={chosenProducts[id]} handleCardClick={handleCardClick} />
                })
            }
        </div>
    )
}