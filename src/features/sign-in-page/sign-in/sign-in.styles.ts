import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const SignInButton = styled.button`
  display: flex;
  background-color: var(--c-blue);
  margin: 1rem;
  padding: 1rem 4rem;
  align-items: center;
  justify-content: center;
  background-color: var(--c-background);
  border: 0.5rem solid var(--c-gray);
  width: 60%;
  color: var(--c-foreground);
  white-space: nowrap;

  &:before {
    border-radius: 50%;
  }

  svg {
    margin: 0 1rem;
    width: 3rem;
    aspect-ratio: 1;
    color: var(--c-foreground);
  }
`

export const Info = styled.p`
  position: absolute;
  left: 100%;
  height: 3rem;
  padding: 0.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  margin: 0 2rem;
  padding: 0;
  display: flex;
  border-radius: 50%;
  border: 1px solid var(--c-gray);
  justify-content: center;
  align-content: baseline;
  font-family: var(--font-mono);
`
