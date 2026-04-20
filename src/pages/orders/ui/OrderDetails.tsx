import { useParams } from 'react-router';

// import { useGetOrderDetailsQuery } from '@entities/orders/api/orders-api';

export const OrderDetails = () => {
  const { id = '' } = useParams();
  //   const { data: orderDetails } = useGetOrderDetailsQuery(+id);
  //   console.log(orderDetails);
  return <div></div>;
};
