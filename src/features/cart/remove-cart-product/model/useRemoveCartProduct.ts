import type { ProductId } from '@entities/product/model/types';

import { useDeleteCartItemMutation } from '@shared/api';

export const useRemoveCartProduct = (id: ProductId) => {
  const [removeProduct, { isLoading, isSuccess, isError }] = useDeleteCartItemMutation();

  // const dispatch = useAppDispatch();

  // const removeProduct = () => {
  //   dispatch(deleteProductFromCart(id));
  //   dispatch(deleteChosenProduct(id));
  // };

  return {
    removeProduct: () => removeProduct(id),
    isLoading,
    isSuccess,
    isError,
  };
};
