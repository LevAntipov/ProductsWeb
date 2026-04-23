import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface OrderDetailsState {
  expandedOrderIds: number[];
}

const initialState: OrderDetailsState = {
  expandedOrderIds: [],
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    toggleOrderDetails(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.expandedOrderIds.includes(id)) {
        state.expandedOrderIds = state.expandedOrderIds.filter((expId) => expId !== id);
      } else {
        state.expandedOrderIds.push(id);
      }
    },
  },
});

const { actions, reducer } = orderDetailsSlice;

export const { toggleOrderDetails } = actions;

export default reducer;
