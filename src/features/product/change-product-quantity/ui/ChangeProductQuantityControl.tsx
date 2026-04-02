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
  return (
    <QuantityControl
      onIncrement={() => setQuantity((p) => p + 1)}
      onDecrement={() => setQuantity((p) => Math.max(0, p - 1))}
      quantity={quantity}
      disabled={isLoading}
    />
  );
};
