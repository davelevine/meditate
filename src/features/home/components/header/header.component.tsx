import { useOnline } from "@saulpalv/useonline"
import { AppUpdater } from "../app-updater"
import { OfflineStatus } from "../offline-status"
import { SignOut } from "../sign-out"
import { Wrapper } from "./header.styles"

interface Props {}

export const Header: React.FC<Props> = () => {
  const isOnline = useOnline()

  return (
    <Wrapper>
      <SignOut />
      {!isOnline && <OfflineStatus />}
      <AppUpdater />
    </Wrapper>
  )
}
