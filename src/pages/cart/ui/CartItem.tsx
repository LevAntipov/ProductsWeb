import React from 'react';

import { useNavigate } from 'react-router';

import type { CartItem as ICartItem } from '@entities/cart/model/types';

import { useRemoveCartProduct } from '@features/cart/remove-cart-product/model/useRemoveCartProduct';
import { useChangeProductQuantity } from '@features/product/change-product-quantity/model/useChangeProductQuantity';

import { QuantityControl } from '@shared/ui/quantity-control/QuantityControl';

import trashBin from '@assets/trashBin.png';

import classes from './CartItem.module.css';

interface ProductCartItemProps {
  product: ICartItem;
}

export const CartItem = React.memo(({ product }: ProductCartItemProps) => {
  const { image, price, productId, quantity, title } = product;
  const navigate = useNavigate();
  const { setQuantity, quantity: localQuantity } = useChangeProductQuantity(productId, +quantity);
  const { removeProduct, isLoading } = useRemoveCartProduct(productId);

  let totalProductPrice = '0';

  if (product) {
    totalProductPrice = (price * quantity).toFixed(2);
  }

  const handleNavigate = () => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className={classes.container}>
      <>
        <div onClick={handleNavigate} className={classes.image}>
          {image && <img src={image}></img>}
        </div>
        <div className={classes.infoBlock}>
          <span className={classes.title} onClick={handleNavigate}>
            {title}
          </span>
          <div className={classes.priceBlock}>
            <span className={classes.price}>${price}</span>
            <QuantityControl
              onDecrement={() => setQuantity((p) => Math.max(0, p - 1))}
              onIncrement={() => setQuantity((p) => p + 1)}
              quantity={localQuantity}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={classes.totalPurchase}>
          <span>${totalProductPrice}</span>
          <button
            type="button"
            className={classes.trashBin}
            onClick={removeProduct}
            disabled={isLoading}
          >
            <img src={trashBin}></img>
          </button>
        </div>
      </>
    </div>
  );
});
