import { Link, useLocation } from 'react-router';

import { useGetCartQuery } from '@shared/api';

import shoppingCart from '@assets/shoppingCartIcon.png';

import classes from './Header.module.css';
import { SearchBlock } from './SearchBlock';

export const Header = () => {
  const location = useLocation();
  const { data } = useGetCartQuery();
  let productsAmount = 0;
  if (data) {
    productsAmount = data?.quantity;
  }

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
        <Link to={'/cart'} className={classes.shoppingCart}>
          <img src={shoppingCart} alt="Shopping cart"></img>
          {!isCartPage && productsAmount > 0 && (
            <span className={classes.cartBadge}>{productsAmount}</span>
          )}
        </Link>
      </div>
    </header>
  );
};
