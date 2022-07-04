import { SwipeableView } from "features/home/app.styles"
import { SlideRenderProps } from "react-swipeable-views-utils"

export const howItWorksSlideRenderer = ({ index, key }: SlideRenderProps) => {
  switch (index) {
    case 0:
      return (
        <SwipeableView key={key}>
          <FirstStep />
        </SwipeableView>
      )
    case 1:
      return (
        <SwipeableView key={key}>
          <SecondStep />
        </SwipeableView>
      )
    case 2:
      return (
        <SwipeableView key={key}>
          <ThirdStep />
        </SwipeableView>
      )
    case 3:
      return (
        <SwipeableView key={key}>
          <FourthStep />
        </SwipeableView>
      )
    case 4:
      return (
        <SwipeableView key={key}>
          <FifthStep />
        </SwipeableView>
      )
    default:
      return null
  }
}

const FirstStep = () => {
  return (
    <>
      <h2>How it works</h2>
      <p>
        This is a Fibonacci timer. It relieves boredom by counting down with
        progressively longer stretches of time.
      </p>
      <p>
        In addition, session statistics give instant feedback on the long-term
        positive effects of meditation.
      </p>
    </>
  )
}

const SecondStep = () => {
  return (
    <>
      <h2>A series of timers</h2>
      <p>
        After you click, the timers go one after another. Each new timer tells
        you how long to wait for the next stage.
      </p>
    </>
  )
}

const ThirdStep = () => {
  return (
    <>
      <h2>The duration increases gradually</h2>
      <p>
        The increase occurs according to the Fibonacci sequence: 1, 2, 3, 5, 8,
        13...
      </p>
    </>
  )
}

const FourthStep = () => {
  return (
    <>
      <h2>So what's the deal?</h2>
      <p>
        The magic here is that the emphasis is on the extra meditation time, not
        the total duration. Such small steps feel easy.
      </p>
    </>
  )
}

const FifthStep = () => {
  return (
    <>
      <h2>The result is more than it seems</h2>
      <p>
        The gradual build-up helps you stay in the session longer. Because it's
        a cognitive trick.
      </p>
    </>
  )
}
