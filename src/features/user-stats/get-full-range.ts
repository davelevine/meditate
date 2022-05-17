import { MILLIS_IN_DAY } from "shared/constants"
import { DayData, Milliseconds } from "shared/types"

// NOTE: return array of every meditation for every day from first meditation date
// TODO: refactor function
// eslint-disable-next-line max-statements
export const getFullRange = (daysWithMeditations: DayData[]) => {
  if (daysWithMeditations.length === 0) return []

  const statisticsWithMissedDays = daysWithMeditations
    .reverse()
    .reduce(fillRangeWithMissedDays, [] as DayData[])

  const todayTimestamp = new Date(Date.now()).setHours(0, 0, 0, 0)
  const lastDayInRange =
    statisticsWithMissedDays[statisticsWithMissedDays.length - 1]

  const lastDayEqualToToday = lastDayInRange.timestamp === todayTimestamp
  if (lastDayEqualToToday) {
    return statisticsWithMissedDays
  }

  const dateDiff = getDateDiffInDays(todayTimestamp, lastDayInRange.timestamp)
  const missedDays = createMissedDays(dateDiff, todayTimestamp, lastDayInRange)
  const fullRange = statisticsWithMissedDays.concat(missedDays)

  return fullRange
}

// eslint-disable-next-line max-statements
function fillRangeWithMissedDays(
  acc: DayData[],
  day: DayData,
  i: number,
  arr: DayData[]
): DayData[] {
  if (i === 0) return [...acc, day]

  const prevMeditationDate = arr[i - 1].timestamp
  const expectedDate = prevMeditationDate + MILLIS_IN_DAY

  const isCurrentDateEqualToExpected = day.timestamp === expectedDate
  const accWithMissedDays = countAndPushMissedDays(acc, day, expectedDate)

  return !isCurrentDateEqualToExpected ? accWithMissedDays : [...acc, day]
}

function getNextDayTimestamp(date: Milliseconds) {
  return date + MILLIS_IN_DAY
}

function countAndPushMissedDays(
  acc: DayData[],
  day: DayData,
  expectedDate: Milliseconds
) {
  const dateDiffInDays = getDateDiffInDays(day.timestamp, expectedDate)
  const missedDays = createMissedDays(dateDiffInDays, expectedDate, day)

  const newAcc = acc.concat(missedDays, day)

  return newAcc
}

function createMissedDays(
  dateDiffInDays: number,
  expectedDate: Milliseconds,
  day: DayData
) {
  return Array(dateDiffInDays)
    .fill(null)
    .map((_, i) => {
      const newTimestamp =
        i > 0 ? getNextDayTimestamp(expectedDate) : expectedDate
      const emptyDay: DayData = {
        ...day,
        meditations: [],
        totalDuration: 0,
        timestamp: newTimestamp,
      }
      return emptyDay
    })
}

function getDateDiffInDays(
  dayTimestamp: Milliseconds,
  expectedDate: Milliseconds
) {
  const diffInDays = Math.ceil((dayTimestamp - expectedDate) / MILLIS_IN_DAY)

  if (diffInDays < 0) {
    const errorMsg = `
      Отрицательная разница между датами
      currDate: ${new Date(dayTimestamp).toString()}
      exptDate: ${new Date(expectedDate).toString()}
      diffDays: ${diffInDays}
    `
    throw new Error(errorMsg)
  }

  return Math.abs(diffInDays)
}
