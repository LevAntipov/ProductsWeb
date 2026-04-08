import React from 'react';

import type { ProductId, ProductType } from '@entities/product/model/types';

import { AddToCartButton } from '@features/cart/add-to-cart/ui/AddToCartButton';
import { ChangeProductQuantityControl } from '@features/product/change-product-quantity/ui/ChangeProductQuantityControl';

import cardInfoIconStar from '@assets/cardInfoIconStar.svg';

import classes from './ProductCard.module.css';

export interface ProductCardProps {
  product: ProductType;
  id: number;
  quantity?: number;
  onOpen: (id: ProductId) => void;
}

export const ProductCard = React.memo(({ product, id, quantity, onOpen }: ProductCardProps) => {
  const { image, description, price, rating, title } = product;
  console.log('rendered ', id);
  if (!product) return <div className={classes.card}>Loading...</div>;

  return (
    <div className={classes.card}>
      <div className={classes.image} onClick={() => onOpen(id)}>
        <img src={image}></img>
      </div>
      <div className={classes.info}>
        <div className={classes.title} onClick={() => onOpen(id)}>
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
            <img className={classes.iconStar} src={cardInfoIconStar}></img>
          </div>
          {quantity === undefined ? (
            <AddToCartButton id={id} children="Add" className={classes.purchaseButton} />
          ) : (
            <ChangeProductQuantityControl id={id} initialQuantity={quantity} />
          )}
        </div>
      </div>
    </div>
  );
});
