import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../redux/store"

export const selectProductsState = (state: RootState) => state.products
export const selectEntities = (state: RootState) => state.products.entities
export const selectIds = (state: RootState) => state.products.ids
export const selectFilterStr = (state: RootState) => state.products.filter.str
export const selectFilterMethod = (state: RootState) => state.products.filter.method

export const selectFilteredIds = createSelector(
    [selectIds, selectEntities, selectFilterStr, selectFilterMethod],
    (ids, entities, str, method) => {
        let filteredids
        if (str === null || str === '') {
            filteredids = ids
        }
        else {
            const lower = str.toLowerCase()
            filteredids = ids.filter((id) => entities[id].title.toLowerCase().includes(lower))
        }

        if (method === "no filter") {
            return filteredids
        }
        if (method === "high to low") {
            return [...filteredids].sort((a, b) => entities[b].price - entities[a].price)
        }
        if (method === 'low to high') {
            return [...filteredids].sort((a, b) => entities[a].price - entities[b].price)
        }
        if (method === 'popularity filter') {
            return [...filteredids].sort((a, b) => entities[b].rating.count - entities[a].rating.count)
        }
        if (method === "raiting filter") {
            return [...filteredids].sort((a, b) => entities[b].rating.rate - entities[a].rating.rate)
        }
        return ids
    }
)