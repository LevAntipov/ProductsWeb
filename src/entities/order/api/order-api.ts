import { api } from '@shared/api/base-api';

import type {
  CheckoutResponse,
  GetOrderDetailsResponse,
  GetOrdersResponse,
  OrderDetails,
} from '../model/types';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<GetOrdersResponse, void>({
      query: () => 'orders',
      providesTags: [{ type: 'Order', id: 'LIST' }],
    }),

    getOrderDetails: build.query<OrderDetails[], number>({
      query: (id) => `orders/${id}`,
      transformResponse(response: GetOrderDetailsResponse) {
        return response.items;
      },
    }),
    checkout: build.mutation<CheckoutResponse, void>({
      query: () => ({
        url: 'orders',
        method: 'POST',
      }),
      invalidatesTags: [
        'Cart',
        { type: 'Order', id: 'LIST' },
      ],
    }),
  }),
});

export const { useLazyGetOrderDetailsQuery, useGetOrdersQuery, useCheckoutMutation } = ordersApi;
