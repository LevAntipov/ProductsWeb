import type { Order, OrderDetails } from '@entities/order/model/types';
import { OrderLineRow } from '@entities/order/ui/OrderLineRow';
import { OrderListItem } from '@entities/order/ui/OrderListItem';

import classes from './OrderListItemContainer.module.css';
import { useExpendedOrders } from '@features/order/expand-order-details/model/hooks';

interface OrderItemProps {
  order: Order;
  orderNumber: number;
}

export const OrderListItemContainer = ({ order, orderNumber}: OrderItemProps) => {
  const { details, isLoading, handleOrderClick, isOpen } = useExpendedOrders(order.id);

  const formattedDate = new Date(order.orderDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={classes.wrapper}>
      <OrderListItem
        order={order}
        orderNumber={orderNumber}
        formattedDate={formattedDate}
        handleOrderClick={handleOrderClick}
      />

      {isOpen && (
        <div className={classes.detailsPanel}>
          {isLoading && <div className={classes.loader}>Loading order details...</div>}
          {details && details.length === 0 && (
            <div className={classes.empty}>No items in this order</div>
          )}
          {details && details.length > 0 && (
            <div className={classes.itemsList}>
              {details.map((item: OrderDetails) => (
                <OrderLineRow key={item.productId + order.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
