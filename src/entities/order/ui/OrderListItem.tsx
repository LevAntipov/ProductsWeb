import type { Order } from "../model/types";
import classes from './OrderListItem.module.css';
import orderIcon from '@assets/orderIcon.png';

interface OrderListItemProps{
  order: Order;
  orderNumber: number;
  formattedDate: string;
  handleOrderClick: () => void;
}

export const OrderListItem = ({order,orderNumber,formattedDate,handleOrderClick}: OrderListItemProps) => {
  return (
    <div className={classes.item} onClick={handleOrderClick}>
      <div className={classes.image}>
        <img src={orderIcon} alt="Order icon" />
      </div>
      <div className={classes.info}>
        <div className={classes.orderNumber}>Order #{orderNumber}</div>
        <div className={classes.details}>
          <span className={classes.total}>${order.totalAmount.toFixed(2)}</span>
          <span className={classes.date}>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};
