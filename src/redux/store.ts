import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './productsReducer'
import cartsReducer from './cartsReducer'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        carts: cartsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartMiddleware), // Подключаем thunk вручную
}
)
//@ts-ignore
function cartMiddleware(store) {
    //@ts-ignore
    return (next) => (action) => {
        const result = next(action) // сначала обновляем store через reducer

        // Теперь проверяем, относится ли action к корзине
        if (action.type.startsWith('carts/')) {
            const state = store.getState().carts
            localStorage.setItem('cart', JSON.stringify(state))
        }

        return result
    }
}

//@ts-ignore
window.store = store


// Выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof store.getState>
// Выведенные типы: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



