import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "store"

export const FEATURE_NAME = "mainScreen"

export interface MainScreenState {
  isLoading: boolean
  isError: boolean
  errorMessage: string
  slideIndex: number
}

const initialState: MainScreenState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  slideIndex: 0,
}

export const mainScreenSlice = createSlice({
  name: FEATURE_NAME,
  initialState,
  reducers: {
    toggleSlideIndex: (state) => {
      state.slideIndex = Number(!state.slideIndex)
    },
    setSlideIndex: (state, action: PayloadAction<number>) => {
      state.slideIndex = action.payload
    },
  },
})

export const mainScreenActions = {
  ...mainScreenSlice.actions,
}

export const mainScreenSelectors = {
  getSlideIndex: (state: RootState) => state[FEATURE_NAME].slideIndex,
}

export const mainScreenSliceReducer = mainScreenSlice.reducer
