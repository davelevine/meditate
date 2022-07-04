import { useState, useEffect, useCallback } from "react"
import { User } from "@firebase/auth"
import { LOCAL_CACHE_FIELD_NAME, SECS_IN_MIN } from "shared/constants"
import { firestore } from "../../firebase-init"
import { TimerButton } from "../timer-button/timer-button.component"
import { Countdown } from "../countdown/countdown.component"
import { Tips } from "../tips"
import { sendSessionFromLocalStore } from "./writeSessionToServer"
import { PokoySession } from "shared/types"
import { BottomTextWrapper, TopTextWrapper, Wrapper } from "./pokoy.styles"
import { Sound } from "features/home/components/sound.component"
import { FibSpiral } from "../fib-spiral/fib-spiral.component"
import { setMeditationThunk } from "features/user-stats/user-stats.thunks"
import { useAppDispatch } from "store"
import useNoSleep from "shared/hooks/use-no-sleep"

interface Props {
  user: User
  authLoading: boolean
}

// TODO: refactor component
export const Pokoy: React.FC<Props> = ({ user, authLoading }) => {
  const [currentTimerId, setCurrentTimerId] = useState<number | null>(null)
  const [timerDiff, setTimerDiff] = useState<number>(0)
  // TODO: extract to store
  const [isStarted, setStartedFlag] = useState(false)
  useNoSleep(isStarted)
  const dispatch = useAppDispatch()

  const minutes = Math.floor(timerDiff / SECS_IN_MIN)

  const finishTimer = useCallback(
    async (timerDiff: number): Promise<void> => {
      const isCurrentTimerIdExist = currentTimerId !== null
      if (!isCurrentTimerIdExist) throw Error("currentTimerId is not exist")

      window.clearInterval(currentTimerId)
      setStartedFlag(false)
      setTimerDiff(0)

      const isSessionLongerThanMinute = timerDiff > SECS_IN_MIN
      if (!isSessionLongerThanMinute) {
        return
      }

      try {
        // NOTE: line below for fast debugging
        // dispatch(setMeditationThunk({ user, seconds: 61 }))
        dispatch(setMeditationThunk({ user, seconds: timerDiff }))
      } catch (e) {
        console.error(e)
      }
    },
    [currentTimerId, dispatch, user]
  )

  const handleTimer = useCallback((startTime: number) => {
    const secondsNow = Math.round(Date.now() / 1000)
    const secondsDiff = secondsNow - startTime
    setTimerDiff(secondsDiff)
  }, [])

  const startTimer = useCallback(() => {
    const startInSeconds = Math.round(Date.now() / 1000)
    setStartedFlag(true)

    const newTimerId = window.setInterval(
      () => handleTimer(startInSeconds),
      100
    )
    setCurrentTimerId(newTimerId)
  }, [handleTimer])

  const handleClick = useCallback(() => {
    setTimerDiff(0)

    if (isStarted) {
      return finishTimer(timerDiff)
    } else {
      return startTimer()
    }
  }, [finishTimer, isStarted, startTimer, timerDiff])

  // TODO: extract function in useEffect from component or extract custom hook
  useEffect(() => {
    const storedAfterFailurePokoySession = window?.localStorage.getItem(
      LOCAL_CACHE_FIELD_NAME
    )

    if (storedAfterFailurePokoySession) {
      const lastSession = JSON.parse(
        storedAfterFailurePokoySession
      ) as PokoySession

      sendSessionFromLocalStore(firestore, user, lastSession)
      window?.localStorage.removeItem(LOCAL_CACHE_FIELD_NAME)
    }
  }, [user])

  return (
    <Wrapper>
      <TopTextWrapper>
        {!authLoading && <Countdown seconds={timerDiff} />}
      </TopTextWrapper>

      <TimerButton
        handleTimerClick={handleClick}
        isTimerStarted={isStarted}
        authLoading={authLoading}
      >
        <Sound progress={timerDiff} />
        <FibSpiral seconds={timerDiff} authLoading={authLoading} />
      </TimerButton>

      <BottomTextWrapper>
        {!authLoading && <Tips minutes={minutes} isTimerStarted={isStarted} />}
      </BottomTextWrapper>
    </Wrapper>
  )
}
