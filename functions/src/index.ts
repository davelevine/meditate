import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { DayData, UserStatsData } from "./types"
import { INIT_USER_STATS } from "./constants"

admin.initializeApp()

exports.updateUserStats = functions.firestore
  .document("days/{dayId}")
  .onWrite(async (changes) => {
    const daySnapshotAfterChanges = changes.after
    const dayData = daySnapshotAfterChanges.data() as DayData
    
    const userStatsRef = dayData.statsRef
    const userStatsSnapshot = await userStatsRef.get()
    const userStatsData = userStatsSnapshot?.data()
    
    const userStats = (userStatsData as UserStatsData) || INIT_USER_STATS
    const totalDuration = Math.round((userStats.totalDuration + dayData.totalDuration) * 100) / 100
    const userId = dayData.userId
    
    const newUserStats: UserStatsData = {
      userId,
      totalDuration,
      count: userStats.count + 1,
      firstMeditationDate: userStats.firstMeditationDate || dayData.timestamp,
    }

    try {
      await userStatsRef.set(newUserStats)
      console.info("SUCCESS")
    } catch (e) {
      console.error("ERROR: ", e)
    }
  })
