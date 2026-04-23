import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3005/api/',
  credentials: 'include',
  prepareHeaders: (headers) => headers,
});
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Cart', 'CartItem', 'Product', 'Order'],
  endpoints: () => ({}),
});
