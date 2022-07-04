import { Timestamp } from "firebase/firestore"
import { PseudoDayData, ServerUserStatsData } from "shared/types"

export const INIT_SERVER_USER_STATS: ServerUserStatsData = {
  firstMeditationDate: Timestamp.fromDate(new Date()),
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
