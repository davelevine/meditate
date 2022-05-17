import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import "./global.css"
import { showAppVersion } from "shared/utils/show-app-version"
import { onServiceWorkerUpdate } from "@3m1/service-worker-updater"
import { AppRouter } from "app-router"
import { BrowserRouter } from "react-router-dom"
import { store } from "./store"
import { Provider } from "react-redux"

const rootElement = document.getElementById("root")
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
)

showAppVersion()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  // NOTE: from https://github.com/emibcn/service-worker-updater#usage
  onUpdate: onServiceWorkerUpdate,
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
