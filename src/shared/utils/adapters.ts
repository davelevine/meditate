import { DayData, ServerDayData } from "shared/types"

export const serverDayDataToStore = (dayData: ServerDayData): DayData => {
  return {
    ...dayData,
    timestamp: dayData.timestamp.toMillis(),
    statsRef: dayData.statsRef?.path,
  }
}
