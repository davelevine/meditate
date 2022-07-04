import styled, { keyframes } from "styled-components"

const spinner = keyframes`
  0% { transform: rotate(0); border-bottom-color: var(--c-white); opacity: 0; }
  5% { opacity: 1; }
  100% { transform: rotate(3600deg);}
`

export const StyledSpinner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    display: block;

    animation: ${spinner} 13s linear infinite;
    transition: border-color 0.3s ease-in-out;

    width: 15rem;
    aspect-ratio: 1;

    border-color: var(--c-gray);
    border-style: solid;
    border-width: 0.75rem;
    border-radius: 50%;
    border-color: var(--c-spiral);
  }
`
