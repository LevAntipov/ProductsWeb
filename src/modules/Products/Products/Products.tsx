import { useEffect, useRef, type FormEvent } from "react"
import { useNavigate, type SubmitFunction } from "react-router"

import type { HandleCardClick } from "../../../types"

import classes from './Products.module.css'
import { useAppDispatch, useAppSelector } from "../../../shared/hooks"
import { ProductCard } from "../ProductCard/ProductCard"
import { getProducts, selectFilteredIds, setNewProduct } from "../../../redux/productsReducer"
import { actionWithProduct } from "../../../redux/cartsReducer"
import { selectChosenProducts } from "../../../redux/cartsReducer"
import { useDispatch } from "react-redux"

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
            {
                filteredIds && filteredIds.map((id) => {
                    // if(chosenProducts[id]){
                    //     const quantity = chosenProducts[id]
                    //     return <ProductCard key={id} id={id} quantity = {quantity} handleCardClick={handleCardClick}/>
                    // }
                    return <ProductCard key={id} id={id} quantity={chosenProducts[id]} handleCardClick={handleCardClick} />
                })
            }

            <CreateProduct />
        </div>
    )
}


const CreateProduct = () => {
    const dispatch = useDispatch() 

    const titleRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (titleRef.current !== null && priceRef.current !== null) {

            const title = titleRef.current.value
            const price = priceRef.current.value
            async function qwe(){
                let response = await fetch('https://fakestoreapi.com/products',{
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify({title:title,price:price, description:'12312312312312312'})
                })
                let res2 = await response.json()
                dispatch(setNewProduct({res2}))
            }
            qwe()
        }


    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input name="title" ref={titleRef}></input>
                <input name="price" ref={priceRef}></input>
                <button type="submit">tap</button>
            </form>
        </div>
    )
}