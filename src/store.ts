import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { pokoySliceReducer } from "features/pokoySlice"

export const store = configureStore({
  reducer: {
    pokoy: pokoySliceReducer,
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
