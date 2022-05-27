import { mainScreenActions } from "features/mainScreenSlice"
import React from "react"
import { useAppDispatch, useAppSelector } from "store"
import { Circle, SwipeButton } from "./views-switcher.styles"
const { toggleSlideIndex } = mainScreenActions

export const ViewsSwitcher: React.FC = () => {
  const slideIndex = useAppSelector(
    // TODO: extract to selector
    (state) => state.mainScreen.slideIndex
  )
  const dispatch = useAppDispatch()

  return (
    <SwipeButton type="button" onClick={() => dispatch(toggleSlideIndex())}>
      <Circle isActive={slideIndex === 0} />
      <Circle isActive={slideIndex === 1} />
    </SwipeButton>
  )
}
