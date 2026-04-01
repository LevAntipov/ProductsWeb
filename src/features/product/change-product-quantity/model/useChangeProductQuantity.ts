import { useEffect, useState } from 'react';

import type { ProductId } from '@entities/product/model/types';

import { useUpdateCartItemMutation } from '@shared/api';
import { useDebounce } from '@shared/lib/hooks';

export const useChangeProductQuantity = (id: ProductId, initialQuantity: number = 0) => {
  const [updateProductQuantity] = useUpdateCartItemMutation();

  const [quantity, setQuantity] = useState(initialQuantity ?? 0);

  const debounced = useDebounce(quantity, 200);

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
  };
};
