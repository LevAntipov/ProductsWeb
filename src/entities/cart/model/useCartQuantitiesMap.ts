import { useMemo } from 'react';

import type { ProductId } from '@entities/product';

import { authClient } from '@shared/lib/auth-client';

import { useGetCartQuery } from '../api/cart-api';

export const useCartQuantitiesMap = () => {
  const { data } = authClient.useSession();
  const { data: cart } = useGetCartQuery(undefined, { skip: !data });
  const isAuthenticated = Boolean(data);

  const chosenProducts = useMemo(() => {
    if (!isAuthenticated || cart?.items.length == 0) return {};
    return cart?.items.reduce(
      (acc, item) => {
        acc[item.productId] = item.quantity;
        return acc;
      },
      {} as Record<ProductId, number>
    );
  }, [cart, isAuthenticated]);

  const totalQuantity = isAuthenticated ? (cart?.quantity ?? 0) : 0;

  return {
    chosenProducts,
    totalQuantity,
  };
};
