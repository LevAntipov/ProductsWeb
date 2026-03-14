import { useEffect } from "react";
import { selectChosenProducts } from "../../../redux/cartsReducer";
import { useNavigate } from "react-router";
import { getProducts } from "../../../redux/productsReducer";
import { ProductCard } from "./ProductCard";
import classes from "./ProductsPage.module.css";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { selectFilteredIds } from "@shared/selectors";

export const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const chosenProducts = useAppSelector(selectChosenProducts);
  const filteredIds = useAppSelector(selectFilteredIds);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleCardClick = (id: number) => {
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
