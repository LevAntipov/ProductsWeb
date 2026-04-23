import { useGetCartQuery } from '@entities/cart/api/cart-api';
import { useCheckoutMutation } from '@entities/order/api/order-api';

import { Loader } from '@shared/ui/Loader/Loader';

import { CartList } from './CartList';
import classes from './CartPage.module.css';
import { PaymentBlock } from './PaymentBlock';

export const CartPage = () => {
  const { data: cart, isLoading } = useGetCartQuery();
  const [checkout, { isLoading: isCheckoutLoading }] = useCheckoutMutation();
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
        {(cart?.items?.length ?? 0) > 0 && (
          <PaymentBlock
            totalPrice={cart?.price ?? 0}
            totalQuantity={cart?.quantity ?? 0}
            onCheckout={checkout}
            isCheckoutLoading={isCheckoutLoading}
          />
        )}
      </div>
    </div>
  );
};
