import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { FilterMethodType } from './types';

type initialStateType = {
  filterSearch: string;
  filterMethod: FilterMethodType;
};

const initialState: initialStateType = {
  filterSearch: '',
  filterMethod: 'no filter',
};

export const productsReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilterSearch: (state, action: PayloadAction<string>) => {
      state.filterSearch = action.payload;
    },
    setFilterMethod: (state, action: PayloadAction<FilterMethodType>) => {
      state.filterMethod = action.payload;
    },
  },
});

const { actions, reducer } = productsReducer;

export const { setFilterMethod, setFilterSearch } = actions;
export default reducer;
