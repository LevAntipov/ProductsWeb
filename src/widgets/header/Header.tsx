import { useMemo } from 'react';

import { Link, useLocation } from 'react-router';

import type { ProductId } from '@entities/product/model/types';

import { useGetCartQuery } from '@shared/api';
import { authClient } from '@shared/lib/auth-client';

import profileIcon from '@assets/profileIcon.png';
import shoppingCart from '@assets/shoppingCartIcon.png';

import classes from './Header.module.css';
import { SearchBlock } from './SearchBlock';

export const useCartQuantitiesMap = () => {
  const { data } = authClient.useSession();
  const { data: cart } = useGetCartQuery(undefined, { skip: !data });
  const isAuthenticated = Boolean(data);

  const chosenProducts = useMemo(() => {
    if (!isAuthenticated || cart?.items.length == 0) return {};
    return cart?.items.reduce(
      (acc, item) => {
        acc[item.productId] = item.quantity;
        return acc;
      },
      {} as Record<ProductId, number>
    );
  }, [cart, isAuthenticated]);

  const totalQuantity = cart?.quantity ?? 0;

  return {
    chosenProducts,
    totalQuantity,
  };
};

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
