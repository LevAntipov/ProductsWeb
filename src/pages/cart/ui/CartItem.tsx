import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import trashBin from "@assets/trashBin.png";
import classes from "./CartItem.module.css";
import { useAppDispatch } from "@shared/hooks";
import type { ProductId, ProductType } from "types";
import { deleteChosenProduct } from "redux/cartsReducer";
import { QuantityControl } from "@shared/ui/quantity-control/QuantityControl";
import { useChangeProductQuantity } from "@features/product/change-product-quantity/model/useChangeProductQuantity";

interface ProductCartItemProps {
  id: ProductId;
  quantity: number;
}

export const CartItem = React.memo(({ id, quantity }: ProductCartItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType | null>(null);
  const { decrease, increase } = useChangeProductQuantity(id);

  let totalProductPrice = "0";

  if (product) {
    totalProductPrice = (product.price * quantity).toFixed(2);
  }

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const handleNavigate = () => {
    navigate(`/products/${id}`);
  };
  const handleDeleteCartProduct = (id: ProductId) => {
    dispatch(deleteChosenProduct(id));
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
              onClick={() => handleDeleteCartProduct(id)}
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
