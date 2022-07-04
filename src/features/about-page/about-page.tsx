import { AboutPageWrapper } from "./about-page.styles"
import { Outlet } from "react-router-dom"
import { Header } from "features/home/components/header/header.component"
import { StyledFooter } from "features/home/app.styles"

export const AboutPage = () => {
  return (
    <AboutPageWrapper>
      <Header />
      <Outlet />
      <StyledFooter />
    </AboutPageWrapper>
  )
}
