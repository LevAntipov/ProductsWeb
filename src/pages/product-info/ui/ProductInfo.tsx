import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import { useGetProductQuery } from '@entities/product/api/product-api';

import { AddToCartButton } from '@features/cart/add-to-cart/ui/AddToCartButton';

import { Loader } from '@shared/ui/Loader/Loader';
import { QuantityControl } from '@shared/ui/quantity-control/QuantityControl';

import backToIcon from '@assets/backToIcon.png';
import cardInfoIconStar from '@assets/cardInfoIconStar.svg';

import classes from './ProductInfo.module.css';

export const ProductInfo = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const { id = '' } = useParams<{ id: string }>();

  const { data: product, isLoading } = useGetProductQuery(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={classes.backToTap} onClick={() => navigate(-1)}>
        <h4>Go back</h4>
        <img className={classes.backToIcon} src={backToIcon} width="20px" height="8px"></img>
      </div>
      {product ? (
        <div className={classes.product}>
          <div className={classes.img}>
            <img src={product.image}></img>
          </div>
          <div className={classes.moreInfoBlock}>
            <div className={classes.title}>
              <h2>{product.title}</h2>
            </div>
            <div className={classes.raitingBlock}>
              <div className={classes.raiting}>
                <span>{product.rating.rate} </span>
                <span>({product.rating.count} reviews)</span>
              </div>
              <img
                className={classes.iconStar}
                width="20px"
                height="20px"
                src={cardInfoIconStar}
              ></img>
            </div>
            <div className={classes.categoryBlock}>
              <span>Category</span>
              <span className={classes.categoryBlock}>{product.category}</span>
            </div>
            <div className={classes.priceBlock}>
              <span>Price</span>
              <span className={classes.price}>${product.price}</span>
            </div>
            <div className={classes.descriptionBlock}>
              <span>Desciption</span>
              <span>{product.description}</span>
            </div>
            <div className={classes.purchachesBlock}>
              <div className={classes.quantityBlock}>
                <span>Quantity</span>
                <QuantityControl
                  quantity={quantity}
                  onIncrement={() => setQuantity((p) => p + 1)}
                  onDecrement={() => setQuantity((p) => Math.max(0, p - 1))}
                />
              </div>
              <AddToCartButton
                id={+id}
                quantity={quantity}
                onSuccess={() => setQuantity(0)}
                children="Add to cart"
                className={classes.addButton}
              />
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div>Something wrong</div>
      )}
    </>
  );
};
