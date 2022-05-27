import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { mainScreenSliceReducer } from "features/mainScreenSlice"
import { pokoySliceReducer } from "features/pokoySlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    pokoy: pokoySliceReducer,
    mainScreen: mainScreenSliceReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

// TODO: move to app custom hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
