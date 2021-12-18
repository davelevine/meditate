import styled from "styled-components/macro"

export const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 2rem;
  font-size: 1rem;
  color: var(--c-extra-gray);
  font-size: 1.5rem;
`

export const StyledUpdateButton = styled.button`
  background-color: var(--c-background);
  color: var(--c-foreground);
  border: 0.25rem solid var(--c-extra-gray);
  display: inline;
`

export const StyledAppVersion = styled.button`
  background-color: var(--c-background);
  color: var(--c-extra-gray);
  padding: 0.5rem;
  font-size: 1rem;
`
