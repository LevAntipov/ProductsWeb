import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { FilterMethodType } from './types';

type initialStateType = {
  filter: { str: string | null; method: FilterMethodType };
  filterSearch: string;
  filterMethod: FilterMethodType;
};

const initialState: initialStateType = {
  filter: { str: '', method: 'no filter' },

  filterSearch: '',
  filterMethod: 'no filter',
};

export const productsReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ str?: string; method?: FilterMethodType }>) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },

    setFilterSearch: (state, action: PayloadAction<string>) => {
      state.filterSearch = action.payload;
    },
    setFilterMethod: (state, action: PayloadAction<FilterMethodType>) => {
      state.filterMethod = action.payload;
    },
  },
});

const { actions, reducer } = productsReducer;

export const { setFilter, setFilterMethod, setFilterSearch } = actions;
export default reducer;
