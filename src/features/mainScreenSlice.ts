import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"

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

createAction(`${FEATURE_NAME}/`)

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

export const mainScreenSliceReducer = mainScreenSlice.reducer
