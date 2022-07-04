import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "store"

export const FEATURE_NAME = "aboutPage"

export interface AboutPageState {
  isLoading: boolean
  isError: boolean
  errorMessage: string
  tutorialSlideIndex: number
  howItWorksSlideIndex: number
}

const initialState: AboutPageState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  tutorialSlideIndex: 0,
  howItWorksSlideIndex: 0,
}

export const aboutPageSlice = createSlice({
  name: FEATURE_NAME,
  initialState,
  reducers: {
    setTutorialSlideIndex: (state, action: PayloadAction<number>) => {
      state.tutorialSlideIndex = action.payload
    },
    setHowItWorksSlideIndex: (state, action: PayloadAction<number>) => {
      state.howItWorksSlideIndex = action.payload
    },
  },
})

export const aboutPageActions = {
  ...aboutPageSlice.actions,
}

export const aboutPageSelectors = {
  getTutorialSlideIndex: (state: RootState) =>
    state[FEATURE_NAME].tutorialSlideIndex,
  getHowItWorksSlideIndex: (state: RootState) =>
    state[FEATURE_NAME].howItWorksSlideIndex,
}

export const aboutPageSliceReducer = aboutPageSlice.reducer
