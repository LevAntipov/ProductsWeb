import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../redux/store"

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