import { deleteChosenProduct } from "@entities/cart/model/slice";
import type { ProductId } from "@entities/product/model/types";
import { useAppDispatch } from "@shared/lib/hooks";

export const useRemoveCartProduct = (id: ProductId) => {
  const dispatch = useAppDispatch();

  const removeProduct = () => {
    dispatch(deleteChosenProduct(id));
  };

  return {
    removeProduct,
  };
};
