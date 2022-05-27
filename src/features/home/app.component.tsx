import React, { useCallback } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "features/home/firebase-init"
import { Pokoy } from "features/home/components/pokoy/pokoy.component"
import { Wrapper, SwipeableView, StyledFooter } from "./app.styles"
import SwipeableViews from "react-swipeable-views"
import { UserStats } from "features/user-stats/user-stats"
import { User } from "firebase/auth"
import { Header } from "./components/header/header.component"
import { ViewsSwitcher } from "./components/views-switcher/views-switcher.component"
import { SlideRenderProps, virtualize } from "react-swipeable-views-utils"
import { useAppDispatch, useAppSelector } from "store"
import { mainScreenActions } from "features/mainScreenSlice"
const { toggleSlideIndex } = mainScreenActions

// TODO: extract to constants
const SLIDES_COUNT = 2
const swipeableViewsRootStyles = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
}
const swipeableViewsContainerStyles = {
  maxWidth: "100%",
  maxHeight: "100%",
  height: "100%",
}

const VirtualizedSwipeableViews = virtualize(SwipeableViews)

export const App: React.FC = () => {
  const [user, loading] = useAuthState(auth)
  const slideIndex = useAppSelector((state) => state.mainScreen.slideIndex)
  const dispatch = useAppDispatch()
  const dispatchSlideIndex = useCallback(() => {
    return dispatch(toggleSlideIndex())
  }, [dispatch])

  const isStillLoading = loading && !user

  const slideRenderer = useCallback(
    ({ index, key }: SlideRenderProps) => {
      switch (index) {
        case 0:
          return (
            <SwipeableView key={key}>
              <Pokoy user={user as User} stillLoading={isStillLoading} />
            </SwipeableView>
          )

        case 1:
          return (
            <SwipeableView key={key}>
              {!isStillLoading && <UserStats user={user as User} />}
            </SwipeableView>
          )
      }
    },
    [isStillLoading, user]
  )

  return (
    <Wrapper>
      <Header />

      <VirtualizedSwipeableViews
        style={swipeableViewsRootStyles}
        containerStyle={swipeableViewsContainerStyles}
        index={slideIndex}
        onChangeIndex={dispatchSlideIndex}
        slideRenderer={slideRenderer}
        slideCount={SLIDES_COUNT}
        enableMouseEvents
        resistance
      />

      {/* TODO: extract to component */}
      <StyledFooter>
        <ViewsSwitcher />
      </StyledFooter>
    </Wrapper>
  )
}
