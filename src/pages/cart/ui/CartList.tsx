import type { ProductId } from "@entities/product/model/types";
import { CartItem } from "./CartItem";
import classes from "./CartPage.module.css";
import type { ProductsQuantity } from "@entities/cart/model/types";

interface CartListProps {
  productsList: [ProductId, ProductsQuantity][];
}

export const CartList = ({ productsList }: CartListProps) => {
  return (
    <div className={classes.cartItems}>
      {productsList.map(([id, quantity]) => {
        return <CartItem key={id} id={id} quantity={quantity} />;
      })}
    </div>
  );
};
