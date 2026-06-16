import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
  prepareHeaders: (headers) => {
    // Берем токен из localStorage
    const token = localStorage.getItem('bearer_token');
    if (token) {
      // Добавляем заголовок Authorization
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Cart', 'CartItem', 'Product', 'Order'],
  endpoints: () => ({}),
});
