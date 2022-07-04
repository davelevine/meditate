import React, { useCallback, useMemo } from "react"
import { Chart, UserSerie, Datum, DatumStyles } from "react-charts"
import { PokoyChartData } from "shared/types"
import { Wrapper } from "./stats-chart.styles"
import {
  CHART_COLORS,
  CHART_TOOLTIP_CONFIG,
  PRIMARY_AXIS_CONFIG,
  SECONDARY_AXES_CONFIG,
  SECONDARY_CURSOR_CONFIG,
} from "./constants"
import { THIRD_PART } from "features/user-stats/constants"

interface Props {
  chartData: UserSerie<PokoyChartData>[]
}

export const StatsChart: React.FC<Props> = ({ chartData }) => {
  const getDatumStyle = useCallback(
    (datum: Datum<PokoyChartData>): DatumStyles => {
      const dataLength = chartData[0].data.length
      const startPositionOfForesight = Math.round(dataLength / (1 + THIRD_PART))

      return datum.index + 1 > startPositionOfForesight ? { opacity: 0.5 } : {}
    },
    [chartData]
  )

  const chartOptions = useMemo(
    () => ({
      data: chartData,
      getDatumStyle,
      //
      dark: true,
      primaryCursor: true,
      defaultColors: CHART_COLORS,
      tooltip: CHART_TOOLTIP_CONFIG,
      primaryAxis: PRIMARY_AXIS_CONFIG,
      secondaryAxes: SECONDARY_AXES_CONFIG,
      secondaryCursor: SECONDARY_CURSOR_CONFIG,
    }),
    [getDatumStyle, chartData]
  )

  return (
    <Wrapper>
      <Chart options={chartOptions} />
    </Wrapper>
  )
}
