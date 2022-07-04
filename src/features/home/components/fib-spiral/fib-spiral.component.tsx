import React, { useMemo } from "react"
import {
  getColorFromCSSVar,
  getColorStyleSheetVarName,
} from "features/home/utils"
import {
  START_SPIRAL_OFFSET,
  MAX_SPIRAL_VALUE,
  INIT_STROKE_DASHARRAY,
} from "./fib-spiral.constants"
import { getTimerProgress } from "./get-timer-progress"
import { getFloorFibonacciDiscrete } from "shared/utils/getFloorFibonacciDiscrete"
import styles from "./fib-spiral.module.css"
import { PATH_TO_DRAWN, SPIRAL_VIEWBOX } from "shared/constants/spiral"

// TODO: move to constants
const ALMOST_DONE_PERCENT = 0.995
const ALMOST_DONE_VALUE = MAX_SPIRAL_VALUE * ALMOST_DONE_PERCENT

interface Props {
  seconds: number
  authLoading: boolean
}

export const FibSpiral: React.FC<Props> = ({ seconds, authLoading }) => {
  const progress = getTimerProgress(seconds)
  const minutes = Math.floor(seconds / 60)
  const isEmpty = progress > ALMOST_DONE_VALUE || progress < 1

  const fibColor = useMemo(() => {
    const fibStage = getFloorFibonacciDiscrete(minutes)
    const colorCSSVarName = getColorStyleSheetVarName(fibStage)
    return getColorFromCSSVar(colorCSSVarName)
  }, [minutes])

  const isStarted = progress > START_SPIRAL_OFFSET
  const isStartedClassName = isStarted ? styles.spiralPathStarted : null
  const isEmptyClassName = isEmpty ? styles.spiralPathEmpty : null
  const spiralForegroundClassNames = `${styles.spiralPath} ${isStartedClassName} ${isEmptyClassName}`

  const isLoadingClassName = authLoading ? styles.spiralBackgroundLoading : null
  const spiralBackgroundStartedClassName = isStarted
    ? styles.spiralBackgroundStarted
    : null
  const spiralBackgroundClassNames = `${styles.spiralBackground} ${isLoadingClassName} ${spiralBackgroundStartedClassName} spiral-trial`

  const isSpinningClassName = isStarted ? styles.svgSpinning : null
  const fibSpiralClassNames = `${styles.svg} ${isSpinningClassName}`

  return (
    <svg
      className={fibSpiralClassNames}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={SPIRAL_VIEWBOX}
    >
      <defs>
        <radialGradient id="Gradient">
          <stop offset="0%" stopColor="#8b8b8b" />
          <stop offset="100%" stopColor="white" />
        </radialGradient>

        <mask id="Mask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient)" />
        </mask>
      </defs>

      <path
        className={spiralBackgroundClassNames}
        d={PATH_TO_DRAWN}
        strokeLinecap="round"
        strokeLinejoin="round"
        fillOpacity="0"
      />

      <path
        className={spiralForegroundClassNames}
        mask="url(#Mask)"
        stroke={fibColor}
        strokeDasharray={INIT_STROKE_DASHARRAY}
        strokeDashoffset={START_SPIRAL_OFFSET + progress}
        d={PATH_TO_DRAWN}
        strokeLinecap="round"
        strokeLinejoin="round"
        fillOpacity="0"
      />
    </svg>
  )
}
