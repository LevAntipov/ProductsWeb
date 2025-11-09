import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

// Используйте во всем приложении вместо обычных `useDispatch` и `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
//export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppSelector = useSelector.withTypes<RootState>()