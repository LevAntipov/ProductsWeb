import React from 'react';

import type { ProductType } from '@entities/product/model/types';

import { useChangeProductQuantity } from '@features/product/change-product-quantity/model/useChangeProductQuantity';

import { useAddCartItemMutation } from '@shared/api';
import { QuantityControl } from '@shared/ui/quantity-control/QuantityControl';

import cardInfoIconStar from '@assets/cardInfoIconStar.svg';

import classes from './ProductCard.module.css';

export interface ProductCardProps {
  product: ProductType;
  id: number;
  quantity?: number;
  onOpen: () => void;
}

export const ProductCard = React.memo(({ product, id, quantity, onOpen }: ProductCardProps) => {
  const { setQuantity, quantity: localQuantity } = useChangeProductQuantity(id, quantity);

  const [addItem, {}] = useAddCartItemMutation();

  const { image, description, price, rating, title } = product;

  if (!product) return <div className={classes.card}>Loading...</div>;

  return (
    <div className={classes.card}>
      <div className={classes.image} onClick={() => onOpen()}>
        {/* <div className={classes.image}> */}
        <img src={image}></img>
      </div>
      <div className={classes.info}>
        <div className={classes.title} onClick={() => onOpen()}>
          {/* <div className={classes.title}> */}
          <div className={classes.itemName}>
            <h3>{title}</h3>
          </div>
          <div className={classes.description}>
            <p>{description}</p>
          </div>
        </div>
        <div className={classes.purchaseBlock}>
          <div className={classes.purchaseInfoBlock}>
            <h3>${price}</h3>
            <span>
              {rating.rate} ({rating.count})
            </span>
            <img
              className={classes.iconStar}
              width="10px"
              height="10px"
              src={cardInfoIconStar}
            ></img>
          </div>
          {localQuantity === undefined || localQuantity === 0 ? (
            <button
              onClick={() => addItem({ productId: id, quantity: 1 })}
              className={classes.purchaseButton}
              type="button"
            >
              Add
            </button>
          ) : (
            <QuantityControl
              onDecrement={() => setQuantity((p) => Math.max(0, p - 1))}
              onIncrement={() => setQuantity((p) => p + 1)}
              quantity={localQuantity}
            />
            // <QuantityControl
            //   onDecrement={() => decrease(quantity - 1)}
            //   onIncrement={() => increase(quantity + 1)}
            //   quantity={qwe}
            // />
          )}
        </div>
      </div>
    </div>
  );
});
