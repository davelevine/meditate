/* eslint-disable max-nested-callbacks */
import { MILLIS_IN_DAY } from "shared/constants"
import { getAverageMeditationPerDay } from "./utils"

describe("getAverageMeditationPerDay", () => {
  it("should return the correct average duration per day", () => {
    const todayDate = new Date(Date.now()).setHours(0, 0, 0, 0)
    const firstMeditationDateList = [
      todayDate - MILLIS_IN_DAY,
      todayDate - MILLIS_IN_DAY * 10,
      todayDate - MILLIS_IN_DAY * 100,
      todayDate - MILLIS_IN_DAY * 365,
    ]
    const totalDurationList = [100, 1000, 10000, 36500]
    const expectedAverage = 100

    totalDurationList.map((totalDuration, index) =>
      expect(
        getAverageMeditationPerDay(
          firstMeditationDateList[index],
          totalDuration
        )
      ).toBe(expectedAverage)
    )
  })

  it("should return Infinity if there are no days diff", () => {
    const firstMeditationDate = new Date(Date.now()).setHours(0, 0, 0, 0)
    const totalDuration = 100

    expect(getAverageMeditationPerDay(firstMeditationDate, totalDuration)).toBe(
      Infinity
    )
  })
})
