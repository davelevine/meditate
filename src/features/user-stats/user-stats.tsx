import { User } from "@firebase/auth"
import { AppUpdater } from "features/home/components/app-updater"
import { getChartDataThunk, getStatsThunk } from "features/pokoyThunks"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "store"
import { StatsChart } from "./components/stats-chart/stats-chart.component"
import { StatsNumbers } from "./components/stats-numbers/stats-numbers.component"
import { Wrapper } from "./user-stats.styles"
import { transformDayDataToChartData } from "./utils"

interface Props {
  user: User
}

// TODO: rename to StatisticsPage
export const UserStats: React.FC<Props> = ({ user }) => {
  const userStatistics = useSelector((state: RootState) => state.pokoy.stats)
  const userDaysData = useSelector((state: RootState) => state.pokoy.daysData)
  const dispatch: AppDispatch = useDispatch()

  const userChartData = useMemo(() => {
    if (!userStatistics || !userDaysData) return null
    return transformDayDataToChartData(userDaysData, userStatistics)
  }, [userDaysData, userStatistics])

  useEffect(() => {
    if (user) {
      dispatch(getStatsThunk(user))
      dispatch(getChartDataThunk(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const isChartDataExist = userChartData?.[0]?.data?.length !== 0

  return (
    <Wrapper>
      {/* TODO: add loding skeleton */}
      {userChartData && isChartDataExist ? (
        <>
          <StatsNumbers statsData={userStatistics} />
          <StatsChart pokoyData={userChartData} />
          <AppUpdater />
        </>
      ) : (
        <>
          <p>There are no statistics 🤷‍♂️</p>
          <p>
            Try meditating for more than two days
            <br />
            or contact with <a href="https://t.me/m0rtyn">@m0rtyn</a>
          </p>
        </>
      )}
      <AppUpdater />
    </Wrapper>
  )
}
