import styled from "styled-components/macro"

export const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 1rem 4rem;
  font-size: 1rem;
  color: var(--c-gray);
  font-size: 1.5rem;
  display: flex;
  justify-content: center;

  @media screen and (hover: hover) {
    padding: 2rem 4rem;
  }

  @media screen and (hover: none) and (orientation: landscape) {
    display: none;
  }
`

export const StyledUpdateButton = styled.button`
  background-color: var(--c-background);
  color: var(--c-foreground);
  border: 0.25rem solid var(--c-extra-gray);
  display: inline;
`

export const StyledAppVersion = styled.button`
  background-color: var(--c-background);
  color: var(--c-gray);
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
`
