import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: grid;
  max-height: 100%;
  height: 100%;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas:
    "countdown"
    "spiral"
    "tips";
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  row-gap: 3rem;

  @media screen and (orientation: landscape) and (hover: none) {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 2rem;
    column-gap: 4rem;
    grid-template-areas:
      "countdown spiral"
      "tips spiral";
  }
`

export const TopTextWrapper = styled.p`
  grid-area: countdown;
  align-self: flex-end;
  margin: 0;

  @media screen and (hover: none) and (orientation: landscape) {
    align-self: flex-end;
    justify-self: center;
  }
`

export const BottomTextWrapper = styled.div`
  grid-area: tips;
  margin: 0;
  width: auto;
  justify-self: center;
  align-self: flex-start;

  @media screen and (hover: none) and (orientation: landscape) {
    margin: 0;
    align-self: flex-start;
    justify-self: center;
  }
`
