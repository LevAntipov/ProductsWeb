import { useEffect } from "react";
import { useNavigate } from "react-router";

import type { HandleCardClick } from "../../../types";

import classes from "./Products.module.css";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { ProductCard } from "../ProductCard/ProductCard";
import { getProducts } from "../../../redux/productsReducer";
import { selectChosenProducts } from "../../../redux/cartsReducer";
import { selectFilteredIds } from "../../../shared/selectors";

export const Products = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const chosenProducts = useAppSelector(selectChosenProducts);
  const filteredIds = useAppSelector(selectFilteredIds);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleCardClick: HandleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (filteredIds.length === 0) {
    return <div className={classes.container}>No products</div>;
  }

  return (
    <div className={classes.container}>
      {filteredIds &&
        filteredIds.map((id: number) => {
          return (
            <ProductCard
              key={id}
              id={id}
              quantity={chosenProducts[id]}
              handleCardClick={handleCardClick}
            />
          );
        })}
    </div>
  );
};
