import { Footer } from "@/components/shared/Footer.jsx"
import { Navbar } from "@/components/shared/Navbar/Navbar.jsx"
import { Outlet } from "react-router-dom"

export function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/*<Footer />*/}
    </>
  )
}