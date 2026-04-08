import { useDeleteCartItemMutation } from '@entities/cart/api/cart-api';
import type { ProductId } from '@entities/product/model/types';

export const useRemoveCartProduct = (id: ProductId) => {
  const [removeProduct, { isLoading, isSuccess, isError }] = useDeleteCartItemMutation();

  return {
    removeProduct: () => removeProduct(id),
    isLoading,
    isSuccess,
    isError,
  };
};
