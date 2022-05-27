import { TABLET_MIN_WIDTH } from "shared/constants"
import styled from "styled-components/macro"

export const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--c-gray);
  font-size: 1.5rem;
  padding: 1rem;
  z-index: 1;

  @media screen and (min-width: ${TABLET_MIN_WIDTH}) {
    padding: 2rem 1rem;
  }

  @media screen and (hover: none) and (orientation: landscape) {
    display: none;
  }
`
