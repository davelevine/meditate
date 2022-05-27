import { TABLET_MIN_WIDTH } from "shared/constants"
import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;

  @media screen and (max-width: ${TABLET_MIN_WIDTH}) {
    padding: 0 4rem;
  }
`

export const SwipeableView = styled.div`
  height: 100%;
  overflow: hidden;
`

export const ProgressSpiralWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const AnimationWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3em;
`

export const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  width: 100%;
  font-size: 1rem;
  color: var(--c-gray);

  @media screen and (hover: hover) {
    padding: 0 4rem;
  }

  @media screen and (hover: none) and (orientation: landscape) {
    display: none;
  }
`
