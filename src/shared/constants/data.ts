import { Timestamp } from "firebase/firestore"
import { DayData, UserStatsData } from "shared/types"

export const INIT_USER_STATS: UserStatsData = {
  firstMeditationDate: null,
  totalDuration: 0,
  count: 0,
  userId: "",
}

export const INIT_DAY_DATA: DayData = {
  timestamp: Timestamp.fromDate(new Date(new Date().toDateString())),
  count: 0,
  totalDuration: 0,
  meditations: [],
  userId: "",
}