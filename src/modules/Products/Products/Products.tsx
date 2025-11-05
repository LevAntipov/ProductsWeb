import { useEffect, useState } from "react"
import type { HandleCardClick, ProductType } from "../../../types"
import { ProductCard } from "../ProductCard/ProductCard"
import classes from './Products.module.css'
import { useNavigate } from "react-router"


export const Products = () => {

    const [products, setProducts] = useState<ProductType[] | null>(null)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((res) => setProducts(res))
    },[])

    const handleCardClick:HandleCardClick = (e,id) => {
        const element = (e.target as HTMLElement).tagName
        if(element === 'BUTTON'){
            console.log(element)
        }
        else if(element === 'decrease'){
            console.log(element)
        }
        else if(element === 'increase'){
            console.log(element)
        }
        else{
            navigate(`${id}`)
        }
    }

    return (
        <div className={classes.container}>
            {
                products && products.map((product)=>{
                    return <ProductCard key={product.id} description={product.description} 
                    id={product.id} image={product.image} price={product.price}
                    rating={product.rating} title={product.title} handleCardClick={handleCardClick}/>
                })
            }
        </div>
    )
}