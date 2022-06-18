import React from "react"
import useSound from "use-sound"
import styles from "./timer-button.module.css"
import clickSfx from "shared/assets/sounds/finger-snap.mp3"
import { LongPressDetectEvents, useLongPress } from "use-long-press"

type Props = {
  handleTimerClick: () => void
  isTimerStarted: boolean
  authLoading: boolean
}

export const TimerButton: React.FC<Props> = ({
  isTimerStarted = false,
  handleTimerClick,
  children,
  authLoading,
}) => {
  const [playClick] = useSound(clickSfx)

  const bindLongPress = useLongPress(
    () => {
      clickWithSound()
    },
    {
      threshold: 1000,
      captureEvent: true,
      cancelOnMovement: false,
      detect: LongPressDetectEvents.BOTH,
    }
  )

  const clickWithSound = React.useCallback(() => {
    playClick()
    handleTimerClick()
  }, [handleTimerClick, playClick])

  const classNames = React.useMemo(() => {
    return `${styles.timerButton} ${
      isTimerStarted ? styles.timerStarted : null
    } ${authLoading ? styles.authLoading : null}`
  }, [authLoading, isTimerStarted])

  return (
    <button {...bindLongPress()} className={classNames} type="button" autoFocus>
      <div className={styles.timerButtonPressProgress} />
      {children}
    </button>
  )
}
