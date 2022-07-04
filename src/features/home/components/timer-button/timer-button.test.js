import { render, unmountComponentAtNode } from "react-dom"
import { act, Simulate } from "react-dom/test-utils"
import { TimerButton } from "./timer-button.component"

describe("TimerButton", () => {
  let container = null

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it("should be contain button", () => {
    act(() => {
      render(<TimerButton />, container)
    })
    expect(container.querySelector("button")).toBeDefined()
  })
})
