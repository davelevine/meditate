import {
  DayData,
  ServerDayData,
  ServerUserStatsData,
  UserStatsData,
} from "shared/types"

export const serverDayDataToStoreAdapter = (
  dayData: ServerDayData
): DayData => {
  return {
    ...dayData,
    timestamp: dayData.timestamp.toMillis(),
    statsRef: dayData.statsRef?.path,
  }
}

export const serverStatsDataToStoreAdapter = (
  statsData: ServerUserStatsData
): UserStatsData => {
  return {
    ...statsData,
    // TODO: remove from server all nullable firstMeditationDate values
    firstMeditationDate: statsData.firstMeditationDate?.toMillis(),
  }
}
