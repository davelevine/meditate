import { UserStatsData, PseudoDayData } from "shared/types"

export const INIT_USER_STATS: UserStatsData = {
  firstMeditationDate: null,
  totalDuration: 0,
  count: 0,
  userId: "",
}

export const INIT_DAY_DATA: PseudoDayData = {
  timestamp: new Date().getTime(),
  count: 0,
  totalDuration: 0,
  meditations: [],
  userId: "",
}
