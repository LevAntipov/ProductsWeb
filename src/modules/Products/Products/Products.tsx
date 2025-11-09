import { useEffect } from "react"
import { useNavigate } from "react-router"

import type { HandleCardClick } from "../../../types"

import classes from './Products.module.css'
import { useAppDispatch, useAppSelector } from "../../../shared/hooks"
import { ProductCard } from "../ProductCard/ProductCard"
import { getProducts } from "../../../redux/productsReducer"
import { actionWithProduct } from "../../../redux/cartsReducer"
import { selectChosenProducts } from "../../../redux/cartsReducer"

export const Products = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getProducts())
    },[])

    const ids = useAppSelector((state) => state.products.ids)
    const chosenProducts = useAppSelector(selectChosenProducts)

    const handleCardClick:HandleCardClick = (e,id) => {

        const element = (e.target as HTMLElement)

        if(element.innerHTML === 'Add'){
            dispatch(actionWithProduct({operation:'add', id}))
        }
        else if(element.innerHTML === '+'){
            dispatch(actionWithProduct({operation:'increase', id}))
        }
        else if(element.innerHTML === '-'){
            dispatch(actionWithProduct({operation:'decrease', id}))
        }
        else{
            navigate(`${id}`)
        }
    }

    return (
        <div className={classes.container}>
            {
                ids && ids.map((id)=>{
                    if(chosenProducts[id]){
                        const quantity = chosenProducts[id]
                        return <ProductCard key={id} id={id} quantity = {quantity} handleCardClick={handleCardClick}/>
                    }
                    return <ProductCard key={id} id={id} handleCardClick={handleCardClick}/>
                })
            }
        </div>
    )
}