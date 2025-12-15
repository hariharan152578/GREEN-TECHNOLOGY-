import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export const MainLayout = () => {
  return (
    <>
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Page Content */}
      <main className="">
        <Outlet />
      </main>
    </>
  )
}
