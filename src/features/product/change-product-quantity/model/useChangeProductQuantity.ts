import { useEffect, useState } from 'react';

import { useUpdateCartItemMutation } from '@entities/cart/api/cart-api';
import type { ProductId } from '@entities/product/model/types';

import { useDebounce } from '@shared/lib/hooks';

export const useChangeProductQuantity = (id: ProductId, initialQuantity: number = 0) => {
  const [updateProductQuantity, { isLoading }] = useUpdateCartItemMutation();

  const [quantity, setQuantity] = useState(initialQuantity ?? 0);

  const debounced = useDebounce(quantity, 1000);

  useEffect(() => {
    if (initialQuantity === debounced) return;
    if (initialQuantity === undefined) return;

    updateProductQuantity({ itemId: id, quantity: +debounced });
  }, [debounced, updateProductQuantity, id]);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  return {
    quantity,
    setQuantity,
    isLoading,
  };
};
