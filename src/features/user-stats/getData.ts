import { PokoyChartData } from "components/stats-chart.component"
import { firestore } from "features/app/firebase-init"
import { User } from "firebase/auth"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { UserSerie } from "react-charts"
import { DayData } from "shared/types"
import { getFullRange } from "./getFullRange"
import { UserStatsData } from "./user-stats"

const SECONDARY_AXIS_LABEL = "Daily duration of meditation"
const TERTIARY_AXIS_LABEL = "Total duration of meditation"
const SECS_IN_DAY = 1000 * 3600 * 24

export const fetchAndsetChartData = async (
  setDataToComponentState: (data: UserSerie<PokoyChartData>[]) => void,
  user: User
): Promise<void> => {
  const daysWithMeditations = await fetchDays(user)
  const dayDataFullRange = getFullRange(daysWithMeditations)
  const chartData = transformDayDataToChartData(dayDataFullRange)

  return setDataToComponentState(chartData)
}

export const getStats = async (
  setDataToComponentState: (data: UserStatsData) => void,
  user: User
): Promise<void> => {
  const statsData = await fetchStats(user)

  if (!statsData) {
    console.error("there are no user statistics yet")
    return
  }

  setDataToComponentState(statsData)
}

export const getTotalInHours = (minutes: number): number => {
  const MINS_IN_HOUR = 60
  return roundToSecondDecimalPlace(minutes / MINS_IN_HOUR)
}

export const getAverage = (statsData: UserStatsData) => {
  if (!statsData || !statsData.firstMeditationDate) {
    return null
  }

  const { firstMeditationDate } = statsData
  const statsMillisecondsDiff =
    Date.now() - firstMeditationDate.toDate().getTime()
  const statsRangeInDays = roundToSecondDecimalPlace(
    statsMillisecondsDiff / SECS_IN_DAY
  )

  const average = roundToSecondDecimalPlace(
    statsData.totalDuration / statsRangeInDays
  )

  return average
}

async function fetchStats(user: User): Promise<UserStatsData> {
  const statsColRef = collection(firestore, "stats")
  const statsQuery = query(statsColRef, where("userId", "==", user.uid))
  const daysColSnapshot = await getDocs(statsQuery)
  const statsData = daysColSnapshot?.docs[0]?.data() as UserStatsData

  return statsData
}

function transformDayDataToChartData(
  dayDataFullRange: DayData[]
): UserSerie<PokoyChartData>[] {
  const daysWithMeditationsAsAxis: PokoyChartData[] = dayDataFullRange.map(
    (d) => ({
      primary: d.timestamp.toDate(),
      secondary: d.totalDuration,
    })
  )
  const totalMeditationAsAxis: PokoyChartData[] =
    daysWithMeditationsAsAxis.reduce((acc, d, i) => {
      const prevTotal = acc[i - 1]?.secondary || 0
      const total = d.secondary / 60 + prevTotal
      return [
        ...acc,
        {
          primary: d.primary,
          secondary: total,
        },
      ]
    }, [] as PokoyChartData[])

  const secondaryAxisData = {
    label: SECONDARY_AXIS_LABEL,
    data: daysWithMeditationsAsAxis,
    secondaryAxisId: "2",
  }
  const tertiaryAxisData = {
    label: TERTIARY_AXIS_LABEL,
    data: totalMeditationAsAxis,
  }

  const chartData = [secondaryAxisData, tertiaryAxisData]
  return chartData
}

async function fetchDays(user: User): Promise<DayData[]> {
  const daysColRef = collection(firestore, "days")
  const daysQuery = query(
    daysColRef,
    where("userId", "==", user.uid),
    orderBy("timestamp", "desc")
  )
  const daysColSnapshot = await getDocs(daysQuery)
  const daysWithMeditations = daysColSnapshot.docs.map(
    (snap) => snap.data() as DayData
  )
  return daysWithMeditations
}

function roundToSecondDecimalPlace(average: number): number {
  return Math.round(average * 10) / 10
}
