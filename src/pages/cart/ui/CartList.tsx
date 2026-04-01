import type { CartItem as ICartItem } from '@entities/cart/model/types';

import { CartItem } from './CartItem';
import classes from './CartPage.module.css';

interface CartListProps {
  productsList?: ICartItem[];
}

export const CartList = ({ productsList }: CartListProps) => {
  if (!productsList || productsList.length === 0) {
    return (
      <div className={classes.emptyCart}>
        <div className={classes.emptyMessage}>No products in cart</div>
      </div>
    );
  }

  return (
    <div className={classes.cartItems}>
      {productsList.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </div>
  );
};
