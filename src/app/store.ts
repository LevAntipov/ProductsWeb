import productsReducer from "@entities/product/model/slice";
import cartReducer from "@entities/cart/model/slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    carts: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
//@ts-ignore
function cartMiddleware(store) {
  //@ts-ignore
  return (next) => (action) => {
    const result = next(action); // сначала обновляем store через reducer

    // Теперь проверяем, относится ли action к корзине
    if (action.type.startsWith("carts/")) {
      const state = store.getState().carts;
      localStorage.setItem("cart", JSON.stringify(state));
    }

    return result;
  };
}

//@ts-ignore
window.store = store;

// Выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof store.getState>;
// Выведенные типы: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
