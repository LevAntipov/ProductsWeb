import { Link } from 'react-router'

import classes from './Header.module.css'
import shoppingCart from '../../assets/shoppingCartIcon.png'
import searchIcon from '../../assets/searchIcon.png'
import { useAppDispatch } from '../../shared/hooks'
import { setFilter } from '../../redux/productsReducer'
import { useRef } from 'react'

export const Header = () => {
    const dispatch = useAppDispatch()
    const ref = useRef(null)

    const onSearchClick = () => {
        //@ts-ignore
        dispatch(setFilter({substr:ref.current.value}))
    }

    return (
        <header className={classes.header}>
        <Link to={'/products'} className={classes.shopName}>Antipov's shop</Link>
            <div className={classes.searchBlock}>
                <input ref={ref} type='text' placeholder="Search something"></input>
                <button onClick = {onSearchClick} className={classes.searchButton} type='button'><img src={searchIcon}></img></button>
            </div>
            <div>
                <Link to={'/carts'} className={classes.shoppingCart}>
                    <img src={shoppingCart}></img>
                </Link>
            </div>
        </header>
    )
}