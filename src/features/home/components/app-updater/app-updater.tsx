import React, { useCallback } from "react"
import {
  withServiceWorkerUpdater,
  ServiceWorkerUpdaterProps,
  LocalStoragePersistenceService,
} from "@3m1/service-worker-updater"
import { StyledUpdateButton, StyledAppVersion } from "./app-updater.styles"

const AppUpdater: React.FC<ServiceWorkerUpdaterProps> = (props) => {
  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props
  const currentVersion = process?.env?.REACT_APP_VERSION

  const handleRefresh = useCallback((): void => {
    window.location.reload()
  }, [])

  return (
    <>
      {newServiceWorkerDetected ? (
        <span>
          New version detected {" → "}
          <StyledUpdateButton
            type="button"
            onClick={onLoadNewServiceWorkerAccept}
          >
            Update
          </StyledUpdateButton>
        </span>
      ) : (
        <StyledAppVersion type="button" onClick={handleRefresh}>
          v{currentVersion} ↻
        </StyledAppVersion>
      )}
    </>
  )
}

export default withServiceWorkerUpdater(AppUpdater, {
  log: () => console.warn("App updated!"),
  persistenceService: new LocalStoragePersistenceService("pokoyApp"),
})
