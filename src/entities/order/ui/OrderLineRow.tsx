import { useNavigate } from 'react-router';

import type { OrderDetails } from '../model/types';

import classes from './OrderLineRow.module.css';
interface OrderLineRowProps {
  item: OrderDetails;
}

export const OrderLineRow = ({ item }: OrderLineRowProps) => {
  const navigate = useNavigate();

  return (
    <div className={classes.item} onClick={() => navigate(`/products/${item.productId}`)}>
      <div className={classes.image}>
        <img src={item.image} alt={item.title} />
      </div>
      <div className={classes.content}>
        <h4 className={classes.title}>{item.title}</h4>
        <div className={classes.meta}>
          <span className={classes.quantity}>Qty: {item.quantity}</span>
          <span className={classes.price}>${item.priceAtPurchase.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
