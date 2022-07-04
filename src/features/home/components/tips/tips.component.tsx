import React, { useCallback } from "react"
import { getFloorFibonacciDiscrete } from "shared/utils/getFloorFibonacciDiscrete"
import { getNextFibonacciStage } from "shared/utils/getNextFibonacciStage"
import {
  StageNumber,
  StageWrapper,
  StyledDesc,
  StyledTip,
  StyledTrianle,
  StyledUnits,
  Wrapper,
} from "./tips.styles"

interface Props {
  minutes: number
  isTimerStarted: boolean
}

// TODO: refactor component
export const Tips: React.FC<Props> = React.memo(
  ({ minutes, isTimerStarted }) => {
    const [currentStage, setCurrentStage] = React.useState(0)

    const getNextStage = useCallback(getNextFibonacciStage, [])

    const nextStage = getNextStage(currentStage, minutes)

    // TODO: extract function
    const timerProgressToMinutes = React.useCallback(
      (minutes: number) => {
        const closestFibonacciDiscrete = getFloorFibonacciDiscrete(minutes)
        const nextStage = getNextStage(closestFibonacciDiscrete, minutes)

        const currentStage =
          minutes < closestFibonacciDiscrete
            ? nextStage
            : closestFibonacciDiscrete

        return currentStage
      },
      [getNextStage]
    )

    React.useEffect(() => {
      if (minutes) {
        const currentStage = timerProgressToMinutes(minutes)
        setCurrentStage(currentStage)
        // setNextStage(nextStage)
      }
    }, [minutes, timerProgressToMinutes])

    React.useEffect(() => {
      if (minutes === 0) {
        setCurrentStage(0)
      }
    }, [currentStage, minutes])

    return (
      <Wrapper>
        {isTimerStarted ? (
          <>
            <StageWrapper>
              <StageNumber>{currentStage}</StageNumber>
              <StyledUnits>
                {currentStage === 1 ? "minute" : "minutes"}
              </StyledUnits>
              <StyledDesc>is current</StyledDesc>
            </StageWrapper>

            <StyledTrianle />

            <StageWrapper>
              <StageNumber>{nextStage}</StageNumber>
              <StyledUnits>
                {nextStage === 1 ? "minute" : "minutes"}
              </StyledUnits>
              <StyledDesc>is next</StyledDesc>
            </StageWrapper>
          </>
        ) : (
          <StyledTip>Tap the circle to start</StyledTip>
        )}
      </Wrapper>
    )
  }
)
