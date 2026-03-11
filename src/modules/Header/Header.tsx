import { Link, useLocation } from "react-router";

import classes from "./Header.module.css";
import shoppingCart from "../../assets/shoppingCartIcon.png";
import { SearchBlock } from "./SearchBlock";
import { BurgerMenu } from "./BurgerMenu";

export const Header = () => {
  const location = useLocation();

  return (
    <header className={classes.header}>
      <Link to={"/products"} className={classes.shopName}>
        Antipov's shop
      </Link>
      {location.pathname !== "/carts" && <SearchBlock />}
      <div>
        <Link to={"/carts"} className={classes.shoppingCart}>
          <img src={shoppingCart} alt="Shopping cart"></img>
        </Link>
      </div>
      <BurgerMenu />
    </header>
  );
};
