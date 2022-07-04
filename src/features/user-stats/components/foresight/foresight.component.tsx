import {
  getFloorProgressionDiscrete,
  getNextStageInProgression,
} from "shared/utils/getNextFibonacciStage"
import { StyledStat, StyledStatNumber } from "../../user-stats.styles"
import { ProgressWrapper, Wrapper } from "./foresight.styles"
import { Line as LineProgress } from "rc-progress"
import { add, format } from "date-fns"
import { MILLIS_IN_DAY, MINS_IN_HOUR } from "shared/constants"
import { PRACTICE_HOURS_PROGRESSION } from "features/user-stats/constants"
import { StyledTooltip } from "shared/components/styled-tooltip.styles"

interface Props {
  totalHours: number
  average: number
}
export const Foresight: React.FC<Props> = ({ totalHours, average }) => {
  const currentHoursMilestone = getFloorProgressionDiscrete(
    totalHours,
    PRACTICE_HOURS_PROGRESSION
  )
  const nextHoursMilestone = getNextStageInProgression(
    currentHoursMilestone,
    totalHours,
    PRACTICE_HOURS_PROGRESSION
  )

  const averageHoursInDay = average / MINS_IN_HOUR
  const daysToNextMilestone =
    (nextHoursMilestone - totalHours) / averageHoursInDay
  const nextMilestoneDate = new Date(
    Date.now() + MILLIS_IN_DAY * daysToNextMilestone
  )

  const daysUntilNextMilestone = Math.floor(
    (nextMilestoneDate.valueOf() - Date.now()) / MILLIS_IN_DAY
  )

  const milestoneProgress = Math.floor((totalHours / nextHoursMilestone) * 100)
  const dateOfNextMilestone = format(
    add(new Date(), { days: daysUntilNextMilestone }),
    "'at' dd MMM ‘yy"
  )

  return (
    <Wrapper>
      {nextHoursMilestone && nextMilestoneDate ? (
        <>
          <StyledStat>
            <StyledTooltip content={dateOfNextMilestone}>
              <StyledStatNumber>{daysUntilNextMilestone}*</StyledStatNumber>
            </StyledTooltip>

            <span>days of practice left </span>
            <div>
              to {nextHoursMilestone} hour
              {nextHoursMilestone === 1 ? "" : "s"} of meditation
            </div>
          </StyledStat>

          <ProgressWrapper>
            <LineProgress
              className="progress-bar"
              percent={milestoneProgress}
              trailColor={"var(--c-extra-gray)"}
              strokeColor={"var(--c-cyan)"}
            />
          </ProgressWrapper>
        </>
      ) : null}
    </Wrapper>
  )
}
