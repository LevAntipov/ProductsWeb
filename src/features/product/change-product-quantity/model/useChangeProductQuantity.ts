import {
  decreaseQuantity,
  increaseQuantity,
} from "../../../../redux/cartsReducer";
import { useAppDispatch } from "../../../../shared/hooks";
import type { ProductId } from "../../../../types";

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
