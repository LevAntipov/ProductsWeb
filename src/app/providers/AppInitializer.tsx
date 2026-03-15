import { checkChosenProducts } from "@entities/cart/model/slice";
import { getProducts } from "@entities/product/model/slice";
import { useAppDispatch } from "@shared/lib/hooks";
import { useEffect, type PropsWithChildren } from "react";

export const AppInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkChosenProducts());
    dispatch(getProducts());
  }, [dispatch]);

  return <>{children}</>;
};
