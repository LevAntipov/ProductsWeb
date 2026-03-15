import { Link, useLocation } from "react-router";
import { SearchBlock } from "./SearchBlock";

import classes from "./Header.module.css";
import shoppingCart from "@assets/shoppingCartIcon.png";
import { useAppSelector } from "@shared/lib/hooks";
import { selectProductsAmount } from "@entities/cart/model/selectors";

export const Header = () => {
  const location = useLocation();
  const productsAmount = useAppSelector(selectProductsAmount);

  const isProductsPage = location.pathname === "/products";
  const isCartPage = location.pathname === "/cart";

  const logoClassName = isProductsPage
    ? `${classes.productsLogo} ${classes.shopName}`
    : `${classes.cartLogo} ${classes.shopName}`;
  return (
    <header className={classes.header}>
      <Link to={"/products"} className={logoClassName}>
        Antipov's shop
      </Link>
      {isProductsPage && <SearchBlock />}
      <div className={classes.cartWrapper}>
        <Link to={"/cart"} className={classes.shoppingCart}>
          <img src={shoppingCart} alt="Shopping cart"></img>
          {!isCartPage && productsAmount > 0 && (
            <span className={classes.cartBadge}>{productsAmount}</span>
          )}
        </Link>
      </div>
    </header>
  );
};
