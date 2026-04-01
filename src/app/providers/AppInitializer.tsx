// import { checkChosenProducts } from "@entities/cart/model/slice";
// import { getProducts } from "@entities/product/model/slice";
import { type PropsWithChildren, useEffect } from 'react';

import { useAppDispatch } from '@shared/lib/hooks';

export const AppInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(checkChosenProducts());
    // dispatch(getProducts());
  }, [dispatch]);

  return <>{children}</>;
};
