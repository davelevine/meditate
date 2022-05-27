import { collection } from "@firebase/firestore"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { getDocs, limit, query, setDoc, where } from "firebase/firestore"
import { INIT_USER_STATS } from "shared/constants"
import { DayData, UserStatsData } from "shared/types"
import { serverDayDataToStore } from "shared/utils/adapters"
import { roundToHundredth } from "shared/utils/roundToSecondDecimalPlace"
import { AppDispatch, RootState } from "store"
import {
  createPokoyData,
  sendPokoySessionToServer,
} from "./home/components/pokoy/writeSessionToServer"
import { firestore } from "./home/firebase-init"
import { FEATURE_NAME, pokoyActions } from "./pokoySlice"
import { fetchDays, fetchStats } from "./user-stats/get-data"
import { getFullRange } from "./user-stats/get-full-range"
import { sliceDaysDataRange } from "./user-stats/utils"

export const getStatsThunk = createAsyncThunk(
  `${FEATURE_NAME}/getStats` as const,
  // eslint-disable-next-line max-statements
  async (user: User, thunkAPI) => {
    const statsData = await fetchStats(user)

    if (statsData.firstMeditationDate === null) {
      throw new Error("there is no first meditation date")
    }

    const setStatsAction = pokoyActions.setStats(statsData)
    thunkAPI.dispatch(setStatsAction)
  }
)

export const getChartDataThunk = createAsyncThunk(
  `${FEATURE_NAME}/getDays` as const,
  // TODO: refactor this method
  // eslint-disable-next-line max-statements
  async (user: User, thunkAPI) => {
    const daysWithMeditations = await fetchDays(user)
    const shallowDaysWithMeditations = daysWithMeditations.map((d) => ({
      ...d,
      timestamp: d.timestamp.toMillis(),
      statsRef: d.statsRef?.path,
    }))

    const daysDataFullRange = getFullRange(shallowDaysWithMeditations)
    const slicedChartData = sliceDaysDataRange(daysDataFullRange)

    const setChartDataAction = pokoyActions.setChartData(slicedChartData)
    thunkAPI.dispatch(setChartDataAction)
  }
)

export const setUserStatsThunk = createAsyncThunk(
  `${FEATURE_NAME}/setUserStats` as const,
  // eslint-disable-next-line max-statements
  async ({ dayData, user }: { dayData: DayData; user: User }, thunkAPI) => {
    const statsColRef = collection(firestore, "stats")
    const q = query(statsColRef, where("userId", "==", user.uid), limit(1))
    const querySnapshot = await getDocs(q)

    const userStatsRef = querySnapshot.docs[0].ref
    const userStatsData = querySnapshot.docs[0].data() as UserStatsData

    const { totalDuration, count, firstMeditationDate } =
      userStatsData || INIT_USER_STATS
    const newUserStats: UserStatsData = {
      count: count + 1,
      userId: dayData.userId,
      totalDuration: roundToHundredth(totalDuration + dayData.totalDuration),
      firstMeditationDate: firstMeditationDate || dayData.timestamp,
    }

    try {
      await setDoc(userStatsRef, newUserStats)
      thunkAPI.dispatch(pokoyActions.setStats(newUserStats))
      console.info("SUCCESS")
    } catch (e) {
      console.error("ERROR: ", e)
    }
  }
)

type Payload = {
  user: User
  seconds: number
}

type ThunkAPI = {
  state: RootState
  dispatch: AppDispatch
}

export const setMeditationThunk = createAsyncThunk<void, Payload, ThunkAPI>(
  `${FEATURE_NAME}/setMeditation` as const,
  // eslint-disable-next-line max-statements
  async ({ user, seconds }, thunkAPI): Promise<void> => {
    if (!user) {
      console.error("User is not defined. Request not sended.", "user: ", user)
      return
    }

    const pokoyData = createPokoyData(user.uid, seconds)

    const serverDayData = await sendPokoySessionToServer(firestore, pokoyData)

    if (!serverDayData) throw new Error("Request failure")

    const dayData = serverDayDataToStore(serverDayData)
    const index = thunkAPI
      .getState()
      .pokoy.daysData.findIndex((d) => d.timestamp === dayData.timestamp)

    if (index === -1) {
      thunkAPI.dispatch(pokoyActions.addDay(dayData))
    } else {
      thunkAPI.dispatch(pokoyActions.updateDay({ dayData, index }))
    }

    thunkAPI.dispatch(setUserStatsThunk({ dayData, user }))
  }
)
