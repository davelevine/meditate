import { TABLET_MIN_WIDTH } from "shared/constants"
import styled from "styled-components/macro"

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--c-gray);
  font-size: 1.5rem;
  padding: 1rem 4rem;
  z-index: 1;

  @media screen and (min-width: ${TABLET_MIN_WIDTH}) {
    padding: 2rem 4rem;
  }
`
