import React, { useCallback, useEffect } from "react"
import {
  withServiceWorkerUpdater,
  ServiceWorkerUpdaterProps,
  LocalStoragePersistenceService,
} from "@3m1/service-worker-updater"
import { StyledUpdateButton, StyledAppVersion } from "./app-updater.styles"

const AppUpdater: React.FC<ServiceWorkerUpdaterProps> = (props) => {
  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props
  const [currentVersion, setCurrentVersion] = React.useState("2.0.0")

  useEffect(() => {
    try {
      const versionNumber = process?.env?.REACT_APP_VERSION
      if (versionNumber) {
        setCurrentVersion(`v${versionNumber}`)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleRefresh = useCallback((): void => {
    window?.location.reload()
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
          {currentVersion} ↻
        </StyledAppVersion>
      )}
    </>
  )
}

export default withServiceWorkerUpdater(AppUpdater, {
  log: () => console.warn("App updated!"),
  persistenceService: new LocalStoragePersistenceService("pokoyApp"),
})
