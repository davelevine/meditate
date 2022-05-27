import styled from "styled-components/macro"

export const SwipeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: var(--c-foreground);
  transition: none;
  padding: 2rem;
  border-radius: 3rem;

  @media screen and (hover: none) and (orientation: landscape) {
    padding: 1rem 1rem;
    display: none;
  }
`

interface Props {
  isActive: boolean
}
export const Circle = styled.span<Props>`
  aspect-ratio: 1;
  width: 1.5rem;
  border-radius: 50%;
  margin: 1rem;
  display: block;
  border: 0.25rem solid var(--c-extra-gray);
  background-color: ${({ isActive }) =>
    isActive ? "var(--c-foreground)" : "transparent"};
`
