import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { serverDayDataToStore } from "shared/utils/adapters"
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

const getStatsActionType = `${FEATURE_NAME}/getStats` as const
export const getStatsThunk = createAsyncThunk(
  getStatsActionType,
  // eslint-disable-next-line max-statements
  async (user: User, thunkAPI) => {
    const statsData = await fetchStats(user)

    if (statsData.firstMeditationDate === null) {
      console.error("there is no first meditation date")
    }

    const setStatsAction = pokoyActions.setStats(statsData)
    thunkAPI.dispatch(setStatsAction)
  }
)

const getDaysActionType = `${FEATURE_NAME}/getDays` as const
export const getChartDataThunk = createAsyncThunk(
  getDaysActionType,
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

// NOTE: WIP
const setMeditationActionType = `${FEATURE_NAME}/setMeditation` as const
export const setMeditationThunk = createAsyncThunk<
  void,
  {
    user: User
    seconds: number
  },
  {
    state: RootState
    dispatch: AppDispatch
  }
>(
  setMeditationActionType,
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
  }
)
