import styled, { css } from "styled-components"

interface Props {
  content: string
  position?: "top" | "bottom"
  wrapContent?: boolean
}

const positionSnippet = css<Props>`
  ${({ position }) => (position === "top" ? `bottom: 100%` : `top: 100%`)};
`

export const StyledTooltip = styled.span.attrs<Props>((props) => ({
  content: props.content,
  position: props.position || "top",
  wrapContent: props.wrapContent || false,
}))<Props>`
  position: relative;

  &::after {
    content: "${({ content }) => content}";
    white-space: ${({ wrapContent }) => (wrapContent ? `normal` : `nowrap`)};
    ${positionSnippet}
    position: absolute;
    display: block;
    padding: 1rem;
    margin: 1rem;
    font-size: 1.5rem;
    background-color: var(--c-foreground);
    color: var(--c-background);
    transform: translateX(-50%);
    transition: opacity 0.1s ease-out, transform 0.1s ease-out;
    border-radius: 1rem;
    opacity: 0;
    z-index: 2;
    left: 50%;
    min-width: 10rem;
  }

  &:hover::after,
  &:active::after,
  &:focus::after {
    opacity: 1;
  }
`
