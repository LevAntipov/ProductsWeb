import type { CartItem as ICartItem } from '@entities/cart/model/types';

import { CartItem } from './CartItem/CartItem';
import classes from './CartPage.module.css';
import { EmptyResource } from '@shared/ui/empty-resource/EmptyResource';

interface CartListProps {
  productsList?: ICartItem[];
}

export const CartList = ({ productsList }: CartListProps) => {
  if (!productsList || productsList.length === 0) {
    return (
     <EmptyResource text='No products in cart'/>
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
