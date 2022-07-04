import { RequestStatus } from "shared/types"

export * from "./breakpoints"
export * from "./time"
export * from "./fibonacci"
export * from "./data"

export enum CSS_COLOR_VARIABLES {
  SPIRAL = "--c-spiral",
  BASE = "--c-base",
  EXTRA_GRAY = "--c-extra-gray",
  GRAY = "--c-gray",
  RED = "--c-red",
  ORANGE = "--c-orange",
  YELLOW = "--c-yellow",
  GREEN = "--c-green",
  CYAN = "--c-cyan",
  BLUE = "--c-blue",
  MAGENTA = "--c-magenta",
  WHITE = "--c-white",
}

export const LOCAL_CACHE_FIELD_NAME = "pokoy-last-session"

export const REQUEST_STATUS_TO_COLOR_MAP = new Map<RequestStatus, string>([
  [RequestStatus.NONE, "var(--c-gray)"],
  [RequestStatus.REQUEST, "var(--c-yellow)"],
  [RequestStatus.SUCCESS, "var(--c-green)"],
  [RequestStatus.FAILURE, "var(--c-red)"],
])
