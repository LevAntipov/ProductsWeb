import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ProductId, ProductsQuantity, ProductType } from "../types";

type initialStateType = {
    chosenProducts: Record<ProductId, ProductsQuantity>
    chosenProductsData: Record<ProductId, ProductType>
}

type productActionPayload = {
    operation: 'add' | 'increase' | 'decrease'
    id: number
}

const initialState: initialStateType = {
    chosenProducts: {},
    chosenProductsData: {}
}

const cartsReducer = createSlice({
    name: 'carts',
    initialState,
    selectors: {
        selectChosenProducts: (state) => state.chosenProducts
    },
    reducers: {
        checkChosenProducts: (state) => {
            //@ts-ignore
            state.chosenProducts = JSON.parse(window.localStorage.getItem('cart')).chosenProducts
            debugger
        },
        addProduct: (state, payload: PayloadAction<{ id: ProductId, quantity: ProductsQuantity }>) => {
            const { id, quantity } = payload.payload
            if (state.chosenProducts[id]) {
                state.chosenProducts[id] = state.chosenProducts[id] + quantity
            }
            else {
                state.chosenProducts[id] = quantity
            }
        },
        actionWithProduct: (state, action: PayloadAction<productActionPayload>) => {
            const id = action.payload.id

            if (action.payload.operation === 'add') {
                state.chosenProducts[id] = 1
            }
            else if (action.payload.operation === 'increase') {
                state.chosenProducts[id] = state.chosenProducts[id] + 1
            }
            else if (action.payload.operation === 'decrease') {
                const quantity = state.chosenProducts[id]

                if (quantity == 1) {
                    const entries = Object.entries(state.chosenProducts).filter((item) => {
                        if (+item[0] !== id) {
                            return item
                        }
                    })
                    state.chosenProducts = Object.fromEntries(entries)
                }
                else {
                    state.chosenProducts[id] = state.chosenProducts[id] - 1
                }
            }
        },
        deleteChosenProduct: (state, id: PayloadAction<ProductId>) => {
            state.chosenProducts = Object.fromEntries(Object.entries(state.chosenProducts).filter((product) => {
                if (+product[0] !== id.payload) {
                    return product
                }
            }))
        }
    }
})

const { actions, selectors, reducer } = cartsReducer

export const { actionWithProduct, deleteChosenProduct, addProduct, checkChosenProducts } = actions
export const { selectChosenProducts } = selectors

export default reducer