import React from "react"
import { StyledTooltip } from "shared/components/styled-tooltip.styles"
import { FIBONACCI_NUMS, SECS_IN_MIN } from "shared/constants"
import { getFibonacciDiscrete } from "shared/utils/getNextFibonacciStage"
import { StyledCountdown } from "./countdown.styles"
import { remainTimeToDigitClock } from "./remainTimeToDigitClock"

interface Props {
  seconds: number
}

export const Countdown: React.FC<Props> = ({ seconds }) => {
  const [secondsRemain, setSecondsRemain] = React.useState(0)
  const [minutesRemain, setMinutesRemain] = React.useState(0)
  const [timeRemain, setTimeRemain] = React.useState("00:00")

  const timerProgressToCountdown = React.useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / SECS_IN_MIN)
    const closestDiscreteStage = getFibonacciDiscrete(minutes)

    for (const num of FIBONACCI_NUMS) {
      if (closestDiscreteStage === num) {
        const nextStageIndex = FIBONACCI_NUMS.indexOf(closestDiscreteStage) + 1
        const nextStage =
          minutes < closestDiscreteStage
            ? closestDiscreteStage
            : FIBONACCI_NUMS[nextStageIndex]
        const secondsToNextStage = nextStage * SECS_IN_MIN - seconds

        const minutesRemain = Math.floor(secondsToNextStage / SECS_IN_MIN)
        const secondsRemain =
          (nextStage - minutesRemain) * SECS_IN_MIN - seconds

        setSecondsRemain(secondsRemain)
        setMinutesRemain(minutesRemain)
      }
    }
  }, [])

  React.useEffect(() => {
    if (seconds) {
      timerProgressToCountdown(seconds)
    }
  }, [seconds, timerProgressToCountdown])

  React.useEffect(() => {
    if (seconds === 0) {
      setSecondsRemain(0)
      setMinutesRemain(0)
    }

    setTimeRemain(remainTimeToDigitClock(secondsRemain, minutesRemain))
  }, [minutesRemain, seconds, secondsRemain])

  return (
    <StyledTooltip
      wrapContent
      position="bottom"
      content={"Time left until the next stage"}
    >
      <StyledCountdown>{timeRemain}</StyledCountdown>
    </StyledTooltip>
  )
}
