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
  },
});

const { actions, reducer } = cartsReducer;

export const { deleteFetchingId, setFetchingId } = actions;

export default reducer;
