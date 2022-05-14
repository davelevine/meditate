import { Timestamp } from "firebase/firestore"
import { UserSerie } from "react-charts"
import {
  INITIAL_MEDITATION_DURATION,
  MILLIS_IN_DAY,
  MINS_IN_HOUR,
  SECS_IN_DAY,
} from "shared/constants"
import {
  roundToFirstDecimalPlace,
  roundToSecondDecimalPlace,
} from "shared/utils/roundToSecondDecimalPlace"
import {
  DayData,
  MockDayData,
  PokoyChartData,
  UserStatsData,
} from "shared/types"
import {
  MAX_DAYS_DATA_LENGTH,
  MAX_DAYS_DATA_LENGTH_WITH_FORESIGHT,
  SECONDARY_AXIS_LABEL,
  TERTIARY_AXIS_LABEL,
} from "./constants"

export const getTotalInHours = (minutes: number): number => {
  return Math.floor(minutes / MINS_IN_HOUR)
}

// eslint-disable-next-line max-statements
export const getAverageMeditationPerDay = (statsData: UserStatsData) => {
  if (!statsData || !statsData.firstMeditationDate) {
    throw new Error("there are no user statistics yet")
  }

  const { firstMeditationDate } = statsData
  const statsMillisecondsDiff = Date.now() - firstMeditationDate
  const statsRangeInDays = statsMillisecondsDiff / MILLIS_IN_DAY

  const average = roundToFirstDecimalPlace(
    statsData.totalDuration / statsRangeInDays
  )

  return average
}

export const transformDayDataToChartData = (
  daysDataFullRange: (DayData | MockDayData)[]
): UserSerie<PokoyChartData>[] => {
  const daysWithMeditationsAsAxis: PokoyChartData[] = daysDataFullRange.map(
    (d) => ({
      primary: new Date(d.timestamp),
      secondary: d.totalDuration,
    })
  )

  const totalDurationsAxisData: PokoyChartData[] = getTotalDurationsAsAxisData(
    daysWithMeditationsAsAxis
  )

  const secondaryAxisData = {
    label: SECONDARY_AXIS_LABEL,
    data: daysWithMeditationsAsAxis,
    id: "2",
    secondaryAxisId: "2",
  }
  const tertiaryAxisData = {
    label: TERTIARY_AXIS_LABEL,
    data: totalDurationsAxisData,
    id: "1",
    // secondaryAxisId: "1"
  }

  const chartData = [secondaryAxisData, tertiaryAxisData]
  return chartData
}

function getTotalDurationsAsAxisData(
  chartData: PokoyChartData[]
): PokoyChartData[] {
  const totalDurationAsAxisData = chartData.reduce((acc, d, i, arr) => {
    const prevTotal = acc[i - 1]?.secondary
    const total = roundToSecondDecimalPlace(
      d.secondary / 60 + (prevTotal || INITIAL_MEDITATION_DURATION)
    )
    const isFirstElementOfSlicedChartData =
      arr.length === MAX_DAYS_DATA_LENGTH_WITH_FORESIGHT && i === 0

    return [
      ...acc,
      {
        primary: d.primary,
        secondary: isFirstElementOfSlicedChartData
          ? getTotalFromSlicedChartData(arr)
          : total,
      },
    ]
  }, [] as PokoyChartData[])

  return totalDurationAsAxisData
}

function getTotalFromSlicedChartData(chartData: PokoyChartData[]) {
  const firstElement = chartData[0]
  return firstElement.secondary
}

export const sliceDaysDataRange = (daysData: DayData[]) => {
  const dataLength = daysData.length

  if (dataLength <= MAX_DAYS_DATA_LENGTH) {
    return daysData
  }

  const maxLengthDiff = dataLength - MAX_DAYS_DATA_LENGTH
  return daysData.slice(maxLengthDiff, dataLength)
}

export const getPseudoDayData = (
  index: number,
  lastTimestampMillis: number,
  averageMeditationDuration: number
): MockDayData => ({
  timestamp: lastTimestampMillis + (index + 1) * MILLIS_IN_DAY,
  totalDuration: averageMeditationDuration,
})
