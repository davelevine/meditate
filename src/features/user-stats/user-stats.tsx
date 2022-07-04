import { User } from "@firebase/auth"
import {
  getChartDataThunk,
  getStatsThunk,
} from "features/user-stats/user-stats.thunks"
import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "store"
import { StatsChart } from "./components/stats-chart/stats-chart.component"
import { StatsNumbers } from "./components/stats-numbers/stats-numbers.component"
import { Wrapper } from "./user-stats.styles"
import { transformDayDataToChartData } from "./utils"
import { StyledSpinner } from "shared/components/styled-spinner.styles"
import { NoUserStatsMessage } from "./components/no-user-stats-message"
import {
  selectDaysData,
  selectIsLoading,
  selectUserStats,
} from "./store/user-stats.selectors"

interface Props {
  authLoading: boolean
  user?: User | null
}

// TODO: rename to StatisticsPage
export const UserStats: React.FC<Props> = ({ user, authLoading }) => {
  const userStatistics = useAppSelector(selectUserStats)
  const userDaysData = useAppSelector(selectDaysData)
  const isLoading = useAppSelector(selectIsLoading)

  const dispatch = useAppDispatch()

  const userChartData = useMemo(() => {
    if (!userStatistics) return null
    return transformDayDataToChartData(userDaysData, userStatistics)
  }, [userDaysData, userStatistics])

  useEffect(() => {
    if (user) {
      dispatch(getStatsThunk(user))
      dispatch(getChartDataThunk(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user])

  const isChartDataExist = userChartData?.[0].data.length !== 0

  return (
    <Wrapper>
      {authLoading || isLoading ? (
        <StyledSpinner />
      ) : isChartDataExist ? (
        <>
          <StatsNumbers statsData={userStatistics} />
          {userChartData && <StatsChart chartData={userChartData} />}
        </>
      ) : (
        <NoUserStatsMessage />
      )}
    </Wrapper>
  )
}
