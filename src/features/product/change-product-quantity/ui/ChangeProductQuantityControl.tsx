import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { type RootState, useAppDispatch } from '@app/appStore';

import { useGetCartQuery } from '@entities/cart/api/cart-api';
import { deleteFetchingId, setFetchingId } from '@entities/cart/model/slice';
import type { ProductId } from '@entities/product/model/types';

import { QuantityControl } from '@shared/ui/quantity-control/QuantityControl';

import { useChangeProductQuantity } from '../model/useChangeProductQuantity';

interface ChangeProductQuantityControlProps {
  id: ProductId;
  initialQuantity: number;
}
export const ChangeProductQuantityControl = ({
  id,
  initialQuantity,
}: ChangeProductQuantityControlProps) => {
  const { quantity, setQuantity, isLoading } = useChangeProductQuantity(id, initialQuantity);
  const { isFetching } = useGetCartQuery();

  const dispatch = useAppDispatch();

  const ids = useSelector((state: RootState) => state.carts.fetchingIdsInProgress);
  const dis = ids.includes(id);

  useEffect(() => {
    if (isLoading) {
      dispatch(setFetchingId(id));
      return;
    }
    if (!isFetching && !isLoading) {
      dispatch(deleteFetchingId(id));
    }
  }, [isFetching, isLoading]);
  return (
    <QuantityControl
      key={id}
      onIncrement={() => setQuantity((p) => p + 1)}
      onDecrement={() => setQuantity((p) => Math.max(0, p - 1))}
      quantity={quantity}
      disabled={isLoading || dis}
    />
  );
};
