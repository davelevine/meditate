import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSerie } from "react-charts"
import {
  DayData,
  MockDayData,
  PokoyChartData,
  UserStatsData,
} from "shared/types"
import { getChartDataThunk, thunkGetStats } from "./pokoyThunks"

export const FEATURE_NAME = "pokoy"

export interface PokoyState {
  daysData: (DayData | MockDayData)[]
  stats: UserStatsData | null
  status: "idle" | "loading" | "error" | "loaded"
}

const initialState: PokoyState = {
  daysData: [],
  stats: null,
  status: "idle",
}

export const pokoySlice = createSlice({
  name: FEATURE_NAME,
  initialState,
  reducers: {
    addDay: (state, action: PayloadAction<DayData>) => {
      state.daysData.push(action.payload)
    },
    setStats: (state, action: PayloadAction<UserStatsData>) => {
      state.stats = action.payload
    },
    setChartData: (state, action: PayloadAction<(DayData | MockDayData)[]>) => {
      state.daysData = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(thunkGetStats.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(thunkGetStats.fulfilled, (state, action) => {
        state.status = "loaded"
      })
      .addCase(thunkGetStats.rejected, (state, action) => {
        state.status = "error"
      })
      .addCase(getChartDataThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getChartDataThunk.fulfilled, (state, action) => {
        state.status = "loaded"
      })
      .addCase(getChartDataThunk.rejected, (state, action) => {
        state.status = "error"
      })
  },
})

// Action creators are generated for each case reducer function
export const { addDay, setChartData, setStats } = pokoySlice.actions

export const pokoySliceReducer = pokoySlice.reducer
