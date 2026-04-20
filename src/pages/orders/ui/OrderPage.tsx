import { useState } from 'react';

import { useNavigate } from 'react-router';

import { useGetOrdersQuery, useLazyGetOrderDetailsQuery } from '@entities/orders/api/orders-api';

export const OrderPage = () => {
  const navigate = useNavigate();
  const { data: orders } = useGetOrdersQuery();
  const [trigger, { data: orderDetails, isFetching }] = useLazyGetOrderDetailsQuery({});

  const [openDetails, setOpenDetails] = useState<number | null>(null);

  console.log(orders);

  const handleItemClick = (id: number) => {
    // navigate(`${id}`);
    // if(orderDetails.)
    setOpenDetails(id);
    trigger(id);
  };
  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column-reverse' }}>
      {orders?.orders?.map((order, index) => {
        return (
          <div style={{ border: 'white 1px solid' }}>
            <div onClick={() => handleItemClick(order.id)} style={{ display: 'flex', gap: '20px' }}>
              <span>N{index + 1}</span>
              <span>order for the amount of {order.totalAmount}</span>
              <span>{order.orderDate}</span>
            </div>
            <div style={{ display: openDetails == order.id ? 'block' : 'none' }}>
              {isFetching ? (
                <div>LOADING...</div>
              ) : (
                orderDetails?.items.map((item) => {
                  return (
                    <div>
                      <div>
                        {item.title} = {item.quantity}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OrderDetailsItem = () => {
  return <div></div>;
};
