import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ProductType } from "../types";
import type { StatusType } from "../types";

type initialStateType = {
    ids:number[]
    entities:Record<number,ProductType>
    product:ProductType | null
    fetchProductsStatus:StatusType
    fetchProductStatus:StatusType
}

const initialState:initialStateType = {
    ids:[],
    entities:{},
    product:null,
    fetchProductsStatus:'idle',
    fetchProductStatus:'idle',
}

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            return response.json()
        } catch (error) {
            console.log('ERROR')
        }
    }
)

export const getProduct = createAsyncThunk(
    'products/getProduct',
    async (id:number) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/product/${id}`)
            return response.json()
        } catch (error) {
            console.log('ERROR')
        }
    }
)



export const productsReducer = createSlice({
    name:'products',
    initialState,
    reducers:{
    },
    selectors:{
        
    },
    extraReducers:(builder) => {
        builder.addCase(getProducts.fulfilled,(state, action:PayloadAction<ProductType[]>)=>{
            debugger
            state.fetchProductsStatus = 'fullfilled'
            state.entities = action.payload.reduce((acc:Record<number,ProductType>,product:ProductType)=>{
                acc[product.id] = product
                return acc
            },{})
            state.ids = action.payload.map((item)=>item.id)
        })
        builder.addCase(getProducts.pending,(state)=>{
            state.fetchProductsStatus = 'pending'
        })
        builder.addCase(getProducts.rejected,(state)=>{
            state.fetchProductsStatus = 'rejected'
        })


        builder.addCase(getProduct.fulfilled,(state, action)=>{
            state.fetchProductStatus = 'fullfilled'
            state.product = action.payload
        })
        builder.addCase(getProduct.pending,(state)=>{
            state.fetchProductStatus = 'pending'
        })
        builder.addCase(getProduct.rejected,(state)=>{
            state.fetchProductStatus = 'rejected'
        })
    }
})

const {actions, reducer} = productsReducer

export const {} = actions
export default reducer