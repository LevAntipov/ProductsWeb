import cardInfoIconStar from "@assets/cardInfoIconStar.svg";
import classes from "./ProductCard.module.css";
import type { HandleCardClick, ProductId, ProductsQuantity } from "types";
import { useChangeProductQuantity } from "@features/product/change-product-quantity/model/useChangeProductQuantity";
import { useAppSelector } from "@shared/hooks";
import { QuantityControl } from "@shared/ui/quantity-control/QuantityControl";

export type ProductCardProps = {
  id: ProductId;
  quantity?: ProductsQuantity;
  handleCardClick: HandleCardClick;
};

export const ProductCard = ({
  id,
  quantity,
  handleCardClick,
}: ProductCardProps) => {
  const { decrease, increase } = useChangeProductQuantity(id);

  const product = useAppSelector((state) => state.products.entities[id]);
  const { image, description, price, rating, title } = product;

  if (!product) return <div className={classes.card}>Loading...</div>;

  return (
    <div className={classes.card}>
      <div className={classes.image} onClick={() => handleCardClick(id)}>
        <img src={image}></img>
      </div>
      <div className={classes.info}>
        <div className={classes.title} onClick={() => handleCardClick(id)}>
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
