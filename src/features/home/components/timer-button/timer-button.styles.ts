import { RequestStatus } from "shared/types"
import styled from "styled-components/macro"

interface Props {
  requestStatus: RequestStatus
  isStarted: boolean
  stillLoading: boolean
}

export const ButtonWrapper = styled.button<Props>`
  color: var(--c-extra-gray);
  grid-area: spiral;
  padding: 0px;
  display: block;
  background-color: transparent;
  position: relative;
  border-radius: 50%;
  max-width: 400px;

  z-index: 1;

  // NOTE: pseudo-element for opaque button border with dinamic color
  &:after {
    box-shadow: ${({ isStarted, stillLoading }) =>
      stillLoading
        ? "none"
        : isStarted
        ? "0 0 0 0.5rem currentcolor"
        : `0 0 0 0.5rem var(--c-gray), 0 0 0.5rem 1rem var(--c-spiral)`};
    transform: ${({ isStarted }) => (isStarted ? "scale(0.99)" : "scale(1)")};
    transition: box-shadow 0.3s ease-in, transform 0.3s ease-in;

    display: block;
    position: absolute;
    top: 0;
    content: "";
    width: 100%;
    height: 100%;
    color: inherit;
    border-radius: 50%;
  }
`
