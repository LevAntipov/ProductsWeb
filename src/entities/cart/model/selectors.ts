import { selectEntities } from "@entities/product/model/selectors";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "app/store";

export const selectChosenProducts = (state: RootState) =>
  state.carts.chosenProducts;

export const selectTotalCartPrice = createSelector(
  [selectChosenProducts, selectEntities],
  (chosenProducts, productsEntities) => {
    return Object.entries(chosenProducts)
      .reduce((total, [id, quantity]) => {
        const product = productsEntities[Number(id)];
        if (product) {
          return total + product.price * quantity;
        }
        return total;
      }, 0)
      .toFixed(2);
  },
);
export const selectProductsAmount = createSelector(
  [selectChosenProducts],
  (chosenProducts) => {
    return Object.values(chosenProducts).reduce(
      (acc, quantity) => acc + quantity,
      0,
    );
  },
);
