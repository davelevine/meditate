import React, { useCallback, useMemo } from "react"
import { Circle, SwipeButton } from "./views-switcher.styles"

interface Props {
  slidesCount: number
  setSlideIndex: (index: number) => void
  slideIndex: number
  autoFocus?: boolean
}

export const ViewsSwitcher: React.FC<Props> = ({
  slidesCount,
  setSlideIndex,
  slideIndex,
  autoFocus = false,
}) => {
  const slideNums = useMemo(
    () => new Array(slidesCount).fill(null),
    [slidesCount]
  )

  const nextSlide = useCallback(
    () => setSlideIndex(slideIndex + 1),
    [setSlideIndex, slideIndex]
  )

  return (
    <SwipeButton type="button" onClick={nextSlide} autoFocus={autoFocus}>
      {slideNums.map((_, i) => (
        <Circle isActive={slideIndex === i} key={i} />
      ))}
    </SwipeButton>
  )
}
