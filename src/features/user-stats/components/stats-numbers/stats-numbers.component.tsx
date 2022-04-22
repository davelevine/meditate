import { getAverage, getTotalInHours } from "features/user-stats/get-data"
import {
  StyledStatNumber,
  StyledStat,
} from "features/user-stats/user-stats.styles"
import { useEffect, useState } from "react"
import { UserStatsData } from "shared/types"
import { Foresight } from "../foresight/foresight.component"
import { Wrapper } from "./stats-numbers.styles"

interface Props {
  statsData: UserStatsData | null
}
export const StatsNumbers: React.FC<Props> = ({ statsData }) => {
  const [average, setAverage] = useState<number | null>(null)
  const [totalInHours, setTotalInHours] = useState<number | null>(null)

  useEffect(() => {
    const totalDurationExists = !!statsData?.totalDuration
    if (!totalDurationExists) return

    setAverage(getAverage(statsData))
    setTotalInHours(getTotalInHours(statsData.totalDuration))
  }, [statsData])

  const totalInHoursExist = totalInHours !== null

  return (
    <Wrapper>
      {totalInHoursExist && average ? (
        <Foresight totalHours={totalInHours} average={average} />
      ) : (
        <span>
          No date of the first meditation. Please send contact @m0rtyn.
        </span>
      )}

      {totalInHoursExist && (
        <StyledStat>
          <StyledStatNumber>{totalInHours}</StyledStatNumber> hours in total
        </StyledStat>
      )}

      {average && (
        <StyledStat>
          <StyledStatNumber>{average}</StyledStatNumber>
          <span> minutes in average</span>
        </StyledStat>
      )}
    </Wrapper>
  )
}
