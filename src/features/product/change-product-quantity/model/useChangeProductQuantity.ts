import type { ProductId } from "@entities/product/model/types";
import { useAppDispatch } from "../../../../shared/lib/hooks";
import { decreaseQuantity, increaseQuantity } from "@entities/cart/model/slice";

export const useChangeProductQuantity = (id: ProductId) => {
  const dispatch = useAppDispatch();

  const decrease = (quantity: number = 1) => {
    dispatch(decreaseQuantity({ id, quantity }));
  };

  const increase = (quantity: number = 1) => {
    dispatch(increaseQuantity({ id, quantity }));
  };

  return {
    decrease,
    increase,
  };
};
