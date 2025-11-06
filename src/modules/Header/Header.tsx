import classes from './Header.module.css'
import shoppingCart from '../../assets/shoppingCartIcon.png'
import { Link } from 'react-router'

export const Header = () => {

    return (
        <header className={classes.header}>
            <div className={classes.shopName}><Link to={'/products'}>Antipov's shop</Link></div>
            <div>
                <input placeholder="Search something"></input>
                <button>Q</button>
            </div>
            <div>
                <Link to={'/products/cart'} className={classes.shoppingCart}>
                    <img src={shoppingCart} style={{ color: 'red' }}></img>
                </Link>
            </div>
        </header>
    )
}