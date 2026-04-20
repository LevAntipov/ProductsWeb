import { api } from '@shared/api/base-api';

import type { GetOrderDetailsResponse, GetOrdersResponse } from '../model/types';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<GetOrdersResponse, void>({
      query: () => 'orders',
    }),

    getOrderDetails: build.query<GetOrderDetailsResponse, number>({
      query: (id) => `orders/${id}`,
    }),
  }),
});

export const { useLazyGetOrderDetailsQuery, useGetOrdersQuery } = ordersApi;
