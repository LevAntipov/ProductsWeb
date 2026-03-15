import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import {
  selectFetchProductsStatus,
  selectFilteredIds,
} from "@entities/product/model/selectors";

import { ProductsList } from "./ProductsList";
import { Loader } from "@shared/ui/Loader/Loader";
import { selectChosenProducts } from "@entities/cart/model/selectors";
import { getProducts } from "@entities/product/model/slice";

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useAppSelector(selectFetchProductsStatus);
  const productIds = useAppSelector(selectFilteredIds);
  const chosenProducts = useAppSelector(selectChosenProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const openProduct = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (status == "pending") return <Loader />;

  return (
    <ProductsList
      ids={productIds}
      quantities={chosenProducts}
      onOpenProduct={openProduct}
    />
  );
};
