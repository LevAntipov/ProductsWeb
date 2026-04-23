import { Link, useLocation } from 'react-router';

import { useCartQuantitiesMap } from '@entities/cart/model/useCartQuantitiesMap';

import orderIcon from '@assets/orderIcon.png';
import profileIcon from '@assets/profileIcon.png';
import shoppingCart from '@assets/shoppingCartIcon.png';

import classes from './Header.module.css';
import { SearchBlock } from './SearchBlock';

export const Header = () => {
  const location = useLocation();
  const { totalQuantity } = useCartQuantitiesMap();

  const isProductsPage = location.pathname === '/products';
  const isCartPage = location.pathname === '/cart';

  const logoClassName = isProductsPage
    ? `${classes.productsLogo} ${classes.shopName}`
    : `${classes.cartLogo} ${classes.shopName}`;
  return (
    <header className={classes.header}>
      <Link to={'/products'} className={logoClassName}>
        Antipov's shop
      </Link>
      {isProductsPage && <SearchBlock />}
      <div className={classes.cartWrapper}>
        <Link to={'/profile'} className={classes.shoppingCart}>
          <img src={profileIcon} alt="Shopping cart"></img>
        </Link>
        <Link to={'/orders'} className={classes.shoppingCart}>
          <img src={orderIcon} alt="Shopping cart"></img>
        </Link>
        <Link to={'/cart'} className={classes.shoppingCart}>
          <img src={shoppingCart} alt="Shopping cart"></img>
          {!isCartPage && totalQuantity > 0 && (
            <span className={classes.cartBadge}>{totalQuantity}</span>
          )}
        </Link>
      </div>
    </header>
  );
};
