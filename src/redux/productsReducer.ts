import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ProductType } from "../types";
import type { StatusType } from "../types";
import type { RootState } from "./store";

type initialStateType = {
    ids: number[]
    filterredIds: number[]
    entities: Record<number, ProductType>
    product: ProductType | null
    filter: string | null
    fetchProductsStatus: StatusType
    fetchProductStatus: StatusType
}

const initialState: initialStateType = {
    ids: [],
    filterredIds: [],
    entities: {},
    product: null,
    filter: '',
    fetchProductsStatus: 'idle',
    fetchProductStatus: 'idle',
}

export const selectProductsState = (state: RootState) => state.products
export const selectEntities = (state: RootState) => state.products.entities
export const selectIds = (state: RootState) => state.products.ids
export const selectFilter = (state: RootState) => state.products.filter

export const selectFilteredIds = createSelector(
    [selectIds, selectEntities, selectFilter],
    (ids, entities, filter) => {
        if (!filter) return ids
        const lower = filter.toLowerCase()
        return ids.filter((id) => entities[id].title.toLowerCase().includes(lower))
    }
)

// export const getProducts = createAsyncThunk(
//     'products/getProducts',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await fetch('https://fakestoreapi.com/products')
//             return await response.json()
//         } catch (err) {
//             return rejectWithValue(err)
//         }
//     }
// )

export const getProducts = createAsyncThunk<ProductType[],void,{ rejectValue: string }>(
    'products/getProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            if(!response.ok){
                throw new Error(`${response.status}`)
            }
            return await response.json()
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unexpected error'
            return rejectWithValue(`Error with status code: ${message}`)
        }
    }
)

export const getProduct = createAsyncThunk<ProductType,number,{ rejectValue: string }>(
    'products/getProduct',
    async (id: number,{rejectWithValue}) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            if(!response.ok){
                throw new Error(`${response.status}`)
            }
            return response.json()
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unexpected error'
            return rejectWithValue(`Error with status code: ${message}`)
        }
    }
)


export const productsReducer = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<{ substr: string }>) => {
            state.filter = action.payload.substr
        },
        setNewProduct:(state,action)=>{
            debugger
            const {id, description, title, price} = action.payload.res2
            state.entities[id] = {description,title,price,category:'tshirt',id,image:'123',rating:{count:230,rate:4}}
            state.ids.push(id)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
            state.fetchProductsStatus = 'fulfilled'
            state.entities = action.payload.reduce((acc: Record<number, ProductType>, product: ProductType) => {
                acc[product.id] = product
                return acc
            }, {})
            state.ids = action.payload.map((item) => item.id)
            if (!state.filterredIds[0]) state.filterredIds = state.ids
        })
        builder.addCase(getProducts.pending, (state) => {
            state.fetchProductsStatus = 'pending'
        })
        builder.addCase(getProducts.rejected, (state,action) => {
            state.fetchProductsStatus = 'rejected'
        })


        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.fetchProductStatus = 'fulfilled'
            state.product = action.payload
        })
        builder.addCase(getProduct.pending, (state) => {
            state.fetchProductStatus = 'pending'
        })
        builder.addCase(getProduct.rejected, (state) => {
            state.fetchProductStatus = 'rejected'
        })
    }
})

const { actions, selectors, reducer } = productsReducer

export const { setFilter, setNewProduct } = actions
export const { } = selectors
export default reducer