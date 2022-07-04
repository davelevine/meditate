import { StyledImg } from "features/about-page/about-page.styles"
import { SlideRenderProps } from "react-swipeable-views-utils"
import { SwipeableView } from "shared/styles/app.styles"

import firstStepImg from "./tutor-step-1.png"
import secondStepImg from "./tutor-step-2.png"
import fourthStepImg from "./tutor-step-4.png"
import fifthStepImg from "./tutor-step-5.png"

export const tutorialSlideRenderer = ({ index, key }: SlideRenderProps) => {
  switch (index) {
    case 0:
      return <TutorialFirstStep key={key} />
    case 1:
      return <TutorialSecondStep key={key} />
    case 2:
      return <TutorialThirdStep key={key} />
    case 3:
      return <TutorialFourthStep key={key} />
    case 4:
      return <TutorialFifthStep key={key} />
    default:
      return <p>Этот шаг ещё не существует 🤷‍♂️</p>
  }
}

const TutorialFirstStep: React.FC = () => {
  return (
    <SwipeableView>
      <h2>Start of the App</h2>
      <StyledImg src={firstStepImg} alt="first step" />
      <p>You start the application and see a circle with a spiral.</p>
    </SwipeableView>
  )
}

const TutorialSecondStep: React.FC = () => {
  return (
    <SwipeableView>
      <h2>The Timer</h2>
      <StyledImg src={secondStepImg} alt="second step" />
      <p>
        You click on the circle and the session begins. A one-minute countdown
        timer will appear.
      </p>
    </SwipeableView>
  )
}

const TutorialThirdStep: React.FC = () => {
  return (
    <SwipeableView>
      <h2>Increasing Stages</h2>
      <StyledImg src={fourthStepImg} alt="fourt step" />
      <p>
        The first three stages last a minute each, and then the duration grows,
        about one and a half times (1.618).
      </p>
    </SwipeableView>
  )
}

const TutorialFourthStep: React.FC = () => {
  return (
    <SwipeableView>
      <h2>End of session</h2>
      <p>
        After you finish each step, you will hear a bell and move on to the next
        step, until you press the circle again.
      </p>
      <p>
        After the second click, your session is over. The session time will be
        recorded in the statistics.
      </p>
    </SwipeableView>
  )
}

const TutorialFifthStep: React.FC = () => {
  return (
    <SwipeableView>
      <h2>Statistics</h2>
      <StyledImg src={fifthStepImg} alt="fifth step" />
      <p>
        If you swipe to the right or press the screen switcher (••), you will be
        taken to your statistics screen.
      </p>
      <p>
        Here you will see the amount of practice in hours, the average session
        in minutes, and how many days until the next practice level.
      </p>
    </SwipeableView>
  )
}
