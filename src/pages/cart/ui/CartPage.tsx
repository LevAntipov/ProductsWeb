import { selectChosenProducts } from "../../../redux/cartsReducer";
import { useAppSelector } from "../../../shared/hooks";
import { CartItem } from "./CartItem";
import classes from "./CartPage.module.css";

export const CartPage = () => {
  const products = useAppSelector(selectChosenProducts); // {id:qnty,id2:qnty2}

  return (
    <div className={classes.container}>
      <div>
        <h1>Shopping Cart</h1>
      </div>
      {Object.entries(products).length === 0 ? (
        <div style={{ textAlign: "center" }}>No products</div>
      ) : (
        <div className={classes.cartItems}>
          {Object.entries(products).map(([id, quantity]) => {
            return <CartItem key={id} id={+id} quantity={quantity} />;
          })}
        </div>
      )}
    </div>
  );
};
