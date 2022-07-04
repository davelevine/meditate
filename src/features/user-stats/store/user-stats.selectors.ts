import { RootState } from "store"

export const selectUserStats = (state: RootState) => state.userStats.stats
export const selectDaysData = (state: RootState) => state.userStats.daysData
export const selectIsLoading = (state: RootState) =>
  state.userStats.status === "loading"
