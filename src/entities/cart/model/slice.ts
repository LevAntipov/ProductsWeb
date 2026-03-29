import type { ProductsQuantity } from "@entities/cart/model/types";
import type { ProductId, ProductType } from "@entities/product/model/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  chosenProducts: Record<ProductId, ProductsQuantity>;
  chosenProductsData: Record<ProductId, ProductType>;
};

interface QuantityAction {
  id: ProductId;
  quantity: number;
}

const initialState: initialStateType = {
  chosenProducts: {},
  chosenProductsData: {},
};

const cartsReducer = createSlice({
  name: "carts",
  initialState,
  reducers: {
    // checkChosenProducts: (state) => {
    //   let storedCart = window.localStorage.getItem("cart");
    //   if (storedCart) {
    //     state.chosenProducts = JSON.parse(
    //       window.localStorage.getItem("cart")!,
    //     ).chosenProducts;
    //   } else {
    //     state.chosenProducts = {};
    //   }
    // },
    // decreaseQuantity: (state, action: PayloadAction<QuantityAction>) => {
    //   const { id, quantity } = action.payload;
    //   state.chosenProducts[id] -= quantity;
    //   if (state.chosenProducts[id] <= 0) {
    //     delete state.chosenProducts[id];
    //   }
    // },
    // increaseQuantity: (state, action: PayloadAction<QuantityAction>) => {
    //   const { id, quantity } = action.payload;
    //   if (!state.chosenProducts[id]) {
    //     state.chosenProducts[id] = quantity;
    //   } else {
    //     state.chosenProducts[id] = state.chosenProducts[id] + quantity;
    //   }
    // },
    // deleteChosenProduct: (state, id: PayloadAction<ProductId>) => {
    //   state.chosenProducts = Object.fromEntries(
    //     Object.entries(state.chosenProducts).filter((product) => {
    //       if (+product[0] !== id.payload) {
    //         return product;
    //       }
    //     }),
    //   );
    // },
  },
});

const { actions, reducer } = cartsReducer;

export const {
  // decreaseQuantity,
  // increaseQuantity,
  // deleteChosenProduct,
  // checkChosenProducts,
} = actions;

export default reducer;
