import { useAppSelector } from "@shared/hooks";
import { selectChosenProducts } from "../../../redux/cartsReducer";
import classes from "./CartPage.module.css";
import { CartItem } from "./CartItem";
import { PaymentBlock } from "./PaymentBlock";

export const CartPage = () => {
  const products = useAppSelector(selectChosenProducts); // {id:qnty,id2:qnty2}
  const productsArr = Object.entries(products);

  return (
    <div className={classes.container}>
      <div>
        <h1>Shopping Cart</h1>
      </div>
      {productsArr.length === 0 ? (
        <div style={{ textAlign: "center" }}>No products</div>
      ) : (
        <div className={classes.cart}>
          <div className={classes.cartItems}>
            {productsArr.map(([id, quantity]) => {
              return <CartItem key={id} id={+id} quantity={quantity} />;
            })}
          </div>
          <PaymentBlock />
        </div>
      )}
    </div>
  );
};
