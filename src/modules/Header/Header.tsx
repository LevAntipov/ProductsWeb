import classes from './Header.module.css'
import shoppingCart from '../../assets/shoppingCartIcon.png'

export const Header = () => {
    return (
        <header className={classes.header}>
            <span>Antipov's shop</span>
            <div>
                <input placeholder="Search something"></input>
                <button>Q</button>
            </div>
            <div>
                <div className={classes.shoppingCartBlock}>
                    <img src={shoppingCart} style={{color:'red'}}></img>
                </div>
            </div>
        </header>
    )
}