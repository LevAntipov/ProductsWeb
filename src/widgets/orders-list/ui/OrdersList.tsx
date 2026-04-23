import { useGetOrdersQuery } from '@entities/order/api/order-api';

import { Loader } from '@shared/ui/Loader/Loader';

import { OrderListItemContainer } from './OrderListItemContainer';
import { EmptyResource } from '@shared/ui/empty-resource/EmptyResource';

export const OrdersList = () => {
  const { data, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
        <h1>Orders</h1>
      {!data?.orders?.length ? (
        <EmptyResource text='No orders found'/>
      ) : (
        data?.orders.map((order,idx,arr) => (
          <OrderListItemContainer key={order.id} orderNumber={arr.length - idx} order={order} />
        ))
      )}
    </div>
  );
};
