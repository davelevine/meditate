import { createPokoyData } from "./writeSessionToServer"

describe("getPokoyData", () => {
  it("should return properly values", () => {
    const userId = "userId"
    const secondsArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    const expected = [0.17, 0.33, 0.5, 0.67, 0.83, 1, 1.17, 1.33, 1.5, 1.67]

    // eslint-disable-next-line max-nested-callbacks
    secondsArray.forEach((seconds, i) => {
      const result = createPokoyData(userId, seconds)
      expect(result.duration).toEqual(expected[i])
    })
  })
})
