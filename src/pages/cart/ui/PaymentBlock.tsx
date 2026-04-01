import classes from './PaymentBlock.module.css';

interface PaymentBlockProps {
  totalPrice: number;
  totalQuantity: number;
}

export const PaymentBlock = ({ totalPrice, totalQuantity }: PaymentBlockProps) => {
  const freeDeliveryPrice = 500;
  let deliveryPrice = 10;
  const delta = +(freeDeliveryPrice - +totalPrice).toFixed(2);
  if (delta < 0) deliveryPrice = 0;

  return (
    <div className={classes.paymentBlock}>
      <table className={classes.paymentTable}>
        <tbody>
          <tr>
            <td>Order summary</td>
            <td>{totalQuantity} item(s)</td>
          </tr>
          <tr>
            <td>Delivery</td>
            <td>{delta > 0 ? deliveryPrice : 0}$</td>
          </tr>
          <tr>
            <td>OrderTotal</td>
            <td>{+deliveryPrice + +totalPrice}$</td>
          </tr>
        </tbody>
      </table>
      {+delta > 0 && <span>Order more than {delta} for free delivery</span>}
      <button className={classes.purchaseButton}>Buy now</button>
    </div>
  );
};
