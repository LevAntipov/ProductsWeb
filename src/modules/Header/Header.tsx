import { Link, useLocation } from 'react-router'
import { setFilter } from '../../redux/productsReducer'
import { useRef, useState } from 'react'

import classes from './Header.module.css'
import { useAppDispatch } from '../../shared/hooks'
import type { FilterMethodType } from '../../types'
import shoppingCart from '../../assets/shoppingCartIcon.png'
import searchIcon from '../../assets/searchIcon.png'
import selectedIcon from '../../assets/selectedIcon.png'
import showMoreIcon from '../../assets/showMoreIcon.png'

const arr = ['no filter', 'low to high', 'high to low', 'popularity filter', 'raiting filter']

export const Header = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLInputElement>(null)
    const [filterMenuFlag, setFilterMenuFlag] = useState(false)
    const [chosenFilter, setChosenFilter] = useState<FilterMethodType>('no filter')

    const onSearchClick = () => {
        if (ref.current !== null) {
            dispatch(setFilter({ method: chosenFilter, str: ref.current.value }))
        }
    }

    const handleFilterMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const filter = e.currentTarget.getAttribute('filter-type') as FilterMethodType
        setChosenFilter(filter)
        setFilterMenuFlag(!filterMenuFlag)
        if (ref.current) {
            dispatch(setFilter({ method: filter, str: ref.current.value }))
        }
    }

    return (
        <header className={classes.header}>
            <Link to={'/products'} className={classes.shopName}>Antipov's shop</Link>
            {location.pathname === '/carts' ? <div></div>
            :<div className={classes.searchBlock}>
                {/*@ts-ignore */}
                <div className={classes.filterButton} onClick={() => setFilterMenuFlag(!filterMenuFlag)}>
                    <span className={classes.filter}>
                        {chosenFilter}
                        <img className={filterMenuFlag ? classes.showMoreIconDown :classes.showMoreIconUp} src={showMoreIcon}></img>
                    </span>
                </div>
                <div className={filterMenuFlag ? classes.filterMethods : classes.nonSelected}>
                    {filterMenuFlag && arr.map((item) => {
                        return (
                            <div
                                key={item}
                                filter-type={item}
                                onClick={handleFilterMenuClick}
                                className={chosenFilter === item ? classes.chosenFilter : undefined}
                            >
                                {item}
                                {chosenFilter === item && <img src={selectedIcon} />}
                            </div>)
                    })}
                </div>
                <input ref={ref} type='text' placeholder="Search something"></input>
                <button onClick={onSearchClick} className={classes.searchButton} type='button'><img src={searchIcon}></img></button>
            </div>}
            
            <div>
                <Link to={'/carts'} className={classes.shoppingCart}>
                    <img src={shoppingCart}></img>
                </Link>
            </div>
        </header>
    )
}