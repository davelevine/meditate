import { useCallback } from "react"
import { virtualize } from "react-swipeable-views-utils"
import { AboutPageWrapper } from "../../about-page.styles"
import SwipeableViews from "react-swipeable-views"
import { ViewsSwitcher } from "features/home/components/views-switcher/views-switcher.component"
import { tutorialSlideRenderer } from "./tutorial-slide-renderer"
import { useAppDispatch, useAppSelector } from "store"
import { aboutPageActions, aboutPageSelectors } from "../../about-page.slice"

const SLIDES_COUNT = 5
const VirtualizedSwipeableViews = virtualize(SwipeableViews)

export const Tutorial = () => {
  const dispatch = useAppDispatch()
  const slideIndex = useAppSelector(aboutPageSelectors.getTutorialSlideIndex)

  const setSlideIndex = useCallback(() => {
    const newIndex = slideIndex < SLIDES_COUNT - 1 ? slideIndex + 1 : 0
    dispatch(aboutPageActions.setTutorialSlideIndex(newIndex))
  }, [dispatch, slideIndex])

  return (
    <AboutPageWrapper>
      <VirtualizedSwipeableViews
        slideRenderer={tutorialSlideRenderer}
        onChangeIndex={setSlideIndex}
        index={slideIndex}
        slideCount={SLIDES_COUNT}
        enableMouseEvents
        resistance
      />

      <ViewsSwitcher
        slideIndex={slideIndex}
        slidesCount={SLIDES_COUNT}
        setSlideIndex={setSlideIndex}
        autoFocus
      />
    </AboutPageWrapper>
  )
}
