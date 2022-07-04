import { useOnline } from "@saulpalv/useonline"
import { useLocation } from "react-router-dom"
import { AppUpdater } from "../app-updater"
import { OfflineStatus } from "../offline-status"
import { SignOut } from "../sign-out"
import { StyledLink, Wrapper } from "./header.styles"

interface Props {}

export const Header: React.FC<Props> = () => {
  const isOnline = useOnline()
  const currentPath = useLocation().pathname
  const labelTo = currentPath === "/" ? "About" : "Timer"
  const pathTo = currentPath === "/" ? "/about" : "/"

  return (
    <Wrapper>
      <SignOut />
      <StyledLink to={pathTo}>{labelTo}</StyledLink>

      {!isOnline && <OfflineStatus />}

      <AppUpdater />
    </Wrapper>
  )
}
