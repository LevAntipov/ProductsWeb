import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '@entities/cart/model/slice';
import productsReducer from '@entities/product/model/slice';

import { api } from '@shared/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    products: productsReducer,
    carts: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

//@ts-ignore
window.store = store;

// Выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof store.getState>;
// Выведенные типы: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
