import React from "react";
import { useNavigate } from "react-router";
import trashBin from "@assets/trashBin.png";
import classes from "./CartItem.module.css";
import { useAppSelector } from "@shared/lib/hooks";
import { QuantityControl } from "@shared/ui/quantity-control/QuantityControl";
import { useChangeProductQuantity } from "@features/product/change-product-quantity/model/useChangeProductQuantity";
import { useRemoveCartProduct } from "@features/cart/remove-cart-product/model/useRemoveCartProduct";
import type { ProductId } from "@entities/product/model/types";

interface ProductCartItemProps {
  id: ProductId;
  quantity: number;
}

export const CartItem = React.memo(({ id, quantity }: ProductCartItemProps) => {
  const navigate = useNavigate();
  const { decrease, increase } = useChangeProductQuantity(id);
  const { removeProduct } = useRemoveCartProduct(id);

  const product = useAppSelector((state) => state.products.entities[id]);

  let totalProductPrice = "0";

  if (product) {
    totalProductPrice = (product.price * quantity).toFixed(2);
  }

  const handleNavigate = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className={classes.container}>
      {product ? (
        <>
          <div onClick={handleNavigate} className={classes.image}>
            <img src={product.image}></img>
          </div>
          <div className={classes.infoBlock}>
            <span className={classes.title} onClick={handleNavigate}>
              {product.title}
            </span>
            <div className={classes.priceBlock}>
              <span className={classes.price}>${product.price}</span>
              <QuantityControl
                onDecrement={() => decrease()}
                onIncrement={() => increase()}
                quantity={quantity}
              />
            </div>
          </div>
          <div className={classes.totalPurchase}>
            <span>${totalProductPrice}</span>
            <button
              type="button"
              className={classes.trashBin}
              onClick={() => removeProduct()}
            >
              <img src={trashBin}></img>
            </button>
          </div>
        </>
      ) : (
        <div>Loading product...</div>
      )}
    </div>
  );
});
