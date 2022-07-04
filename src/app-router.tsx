import { App } from "features/home"
// import { DevPage } from "features/dev-page"
import { SignInPage } from "features/sign-in-page/sign-in-page"
import { Link, Route, Routes } from "react-router-dom"
import { RequireAuth } from "shared/components/require-auth"
import { AboutPage } from "features/about-page/about-page"
import { Tutorial } from "features/about-page/components/tutorial/tutorial.component"
import { HowItWorks } from "features/about-page/components/how-it-works/how-it-works.component"
import { About } from "features/about-page/components/about.component"

const NoMatch = () => {
  return (
    <>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </>
  )
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignInPage />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <App />
          </RequireAuth>
        }
      />

      <Route path="/about" element={<AboutPage />}>
        <Route path="" element={<About />}></Route>
        <Route path="tutorial" element={<Tutorial />}></Route>
        <Route path="how-it-works" element={<HowItWorks />}></Route>
      </Route>

      {/* <Route path="/dev" element={<DevPage />} /> */}

      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
