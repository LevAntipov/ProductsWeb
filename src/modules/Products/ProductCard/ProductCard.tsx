import { type FC } from "react";
import classes from "./ProductCard.module.css";
import cardInfoIconStar from "../../../assets/cardInfoIconStar.svg";
import type { ProductCardType } from "../../../types";
import { useAppSelector } from "../../../shared/hooks";
import { QuantityControl } from "../../../shared/ui/quantity-control/QuantityControl";
import { useChangeProductQuantity } from "../../../features/product/change-product-quantity/model/useChangeProductQuantity";

export const ProductCard: FC<ProductCardType> = ({
  id,
  quantity,
  handleCardClick,
}) => {
  const { decrease, increase } = useChangeProductQuantity(id);

  const product = useAppSelector((state) => state.products.entities[id]);
  const { image, description, price, rating, title } = product;

  if (!product) return <div className={classes.card}>Loading...</div>;

  return (
    <div className={classes.card}>
      <div className={classes.image} onClick={(e) => handleCardClick(id)}>
        <img src={image}></img>
      </div>
      <div className={classes.info}>
        <div className={classes.title} onClick={(e) => handleCardClick(id)}>
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
          {quantity === undefined ? (
            <button
              onClick={() => increase()}
              className={classes.purchaseButton}
              type="button"
            >
              Add
            </button>
          ) : (
            <QuantityControl
              onDecrement={() => decrease()}
              onIncrement={() => increase()}
              quantity={quantity}
            />
          )}
        </div>
      </div>
    </div>
  );
};
