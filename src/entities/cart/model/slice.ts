import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ProductId } from '@entities/product/model/types';

type initialStateType = {
  fetchingIdsInProgress: ProductId[];
};

const initialState: initialStateType = {
  fetchingIdsInProgress: [],
};

const cartsReducer = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setFetchingId: (state, action: PayloadAction<ProductId>) => {
      state.fetchingIdsInProgress.push(action.payload);
    },
    deleteFetchingId: (state, action: PayloadAction<ProductId>) => {
      state.fetchingIdsInProgress = state.fetchingIdsInProgress.filter(
        (id) => id !== action.payload
      );
    },
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

export const { deleteFetchingId, setFetchingId } = actions;

export default reducer;
