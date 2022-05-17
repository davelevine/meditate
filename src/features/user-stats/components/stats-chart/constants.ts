import { getColorFromCSSVar } from "features/home/utils"
import { AxisOptions, TooltipOptions } from "react-charts"
import { CSS_COLOR_VARIABLES } from "shared/constants"
import { PokoyChartData } from "shared/types"

const { CYAN, EXTRA_GRAY } = CSS_COLOR_VARIABLES

export const CHART_COLORS = [
  getColorFromCSSVar(CYAN),
  getColorFromCSSVar(EXTRA_GRAY),
]

export const TOTAL_CHART_CONFIG: AxisOptions<PokoyChartData> = {
  // TODO: add max value as next milestone
  scaleType: "linear",
  tickCount: 3,
  position: "right",
  elementType: "area",
  showGrid: false,
  getValue: (datum) => datum.secondary,
  formatters: {
    tooltip: (value: number) => `${value} hours`,
    scale: (value: number) => `${value}h`,
  },
}

export const DAY_MEDITATIONS_CHART_CONFIG: AxisOptions<PokoyChartData> = {
  tickCount: 3,
  scaleType: "linear",
  position: "left",
  elementType: "bar",
  id: "2",
  getValue: (datum: PokoyChartData) => datum.secondary,
  formatters: {
    tooltip: (value: number) => `${value} minutes`,
    scale: (value: number) => `${value}m`,
  },
}

export const PRIMARY_AXIS_CONFIG: AxisOptions<PokoyChartData> = {
  scaleType: "time",
  getValue: ({ primary }: PokoyChartData) => {
    // TODO: move date rounding to data source
    primary.setUTCHours(0)
    primary.setUTCMinutes(0)
    primary.setUTCSeconds(0)
    primary.setUTCMilliseconds(0)
    return primary
  },
}

export const SECONDARY_AXES_CONFIG: AxisOptions<PokoyChartData>[] = [
  TOTAL_CHART_CONFIG,
  DAY_MEDITATIONS_CHART_CONFIG,
]

export const CHART_TOOLTIP_CONFIG: TooltipOptions<PokoyChartData> = {
  groupingMode: "single",
  show: true,
}

export const SECONDARY_CURSOR_CONFIG = {
  show: true,
  showLine: true,
  showLabel: true,
}
