import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export const MainLayout = () => {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
