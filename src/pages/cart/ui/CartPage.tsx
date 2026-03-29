import classes from "./CartPage.module.css";
import { PaymentBlock } from "./PaymentBlock";
import { CartList } from "./CartList";
import { useGetCartQuery } from "@shared/api";
import { Loader } from "@shared/ui/Loader/Loader";

// export const CartPage = () => {
//   const { data: cart, isLoading } = useGetCartQuery();

//   return (
//     <div className={classes.container}>
//       <div>
//         <h1>Shopping Cart</h1>
//       </div>
//       {isLoading ? (
//         <Loader />
//       ) : cart?.items.length === 0 ? (
//         <div style={{ textAlign: "center" }}>No products</div>
//       ) : (
//         <div className={classes.cart}>
//           <CartList productsList={cart?.items} />
//           <PaymentBlock
//             totalPrice={cart?.price}
//             totalQuantity={cart?.quantity}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

export const CartPage = () => {
  const { data: cart, isLoading } = useGetCartQuery();

  if (isLoading) {
    return (
      <div className={classes.container}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div>
        <h1>Shopping Cart</h1>
      </div>
      <div className={classes.cart}>
        <CartList productsList={cart?.items} />
        {cart?.items.length > 0 && (
          <PaymentBlock
            totalPrice={cart?.price}
            totalQuantity={cart?.quantity}
          />
        )}
      </div>
    </div>
  );
};
