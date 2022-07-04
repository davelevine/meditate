import { ViewsSwitcher } from "features/home/components/views-switcher/views-switcher.component"
import { useCallback } from "react"
import SwipeableViews from "react-swipeable-views"
import { virtualize } from "react-swipeable-views-utils"
import { useAppDispatch, useAppSelector } from "store"
import { aboutPageActions, aboutPageSelectors } from "../../about-page.slice"
import { AboutPageWrapper } from "../../about-page.styles"
import { howItWorksSlideRenderer } from "./how-it-works-slide-renderer"

const SLIDES_COUNT = 5

const VirtualizedSwipeableViews = virtualize(SwipeableViews)

export const HowItWorks = () => {
  const dispatch = useAppDispatch()
  const slideIndex = useAppSelector(aboutPageSelectors.getHowItWorksSlideIndex)
  const setSlideIndex = useCallback(() => {
    const newIndex = slideIndex < SLIDES_COUNT - 1 ? slideIndex + 1 : 0
    return dispatch(aboutPageActions.setHowItWorksSlideIndex(newIndex))
  }, [dispatch, slideIndex])

  return (
    <AboutPageWrapper>
      <VirtualizedSwipeableViews
        index={slideIndex}
        onChangeIndex={setSlideIndex}
        slideRenderer={howItWorksSlideRenderer}
        slideCount={SLIDES_COUNT}
        enableMouseEvents
        resistance
      />

      <ViewsSwitcher
        slideIndex={slideIndex}
        slidesCount={SLIDES_COUNT}
        setSlideIndex={setSlideIndex}
      />
    </AboutPageWrapper>
  )
}
