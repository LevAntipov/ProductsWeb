import { useAppSelector } from "@shared/lib/hooks";
import classes from "./CartPage.module.css";
import { PaymentBlock } from "./PaymentBlock";
import { CartList } from "./CartList";
import { selectChosenProducts } from "@entities/cart/model/selectors";
import type { ProductId } from "@entities/product/model/types";
import type { ProductsQuantity } from "@entities/cart/model/types";

export const CartPage = () => {
  const products = useAppSelector(selectChosenProducts);
  const productsList = Object.entries(products).map(([id, qty]) => [
    +id,
    qty,
  ]) as [ProductId, ProductsQuantity][];

  return (
    <div className={classes.container}>
      <div>
        <h1>Shopping Cart</h1>
      </div>
      {productsList.length === 0 ? (
        <div style={{ textAlign: "center" }}>No products</div>
      ) : (
        <div className={classes.cart}>
          <CartList productsList={productsList} />
          <PaymentBlock />
        </div>
      )}
    </div>
  );
};
