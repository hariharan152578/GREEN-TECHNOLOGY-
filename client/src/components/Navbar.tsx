import "../index.css"
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <>
      {/* Top Navbar */}
      <div className="w-full bg-[#01311F] text-[#F0ECE3] h-16 flex items-center px-4 md:px-6 justify-between">
        
        {/* Left - Logo */}
        <div className="shrink-0">
          <img
            src={logo}
            alt="Greens Technology Logo"
            className="h-10 md:h-12 w-auto"
          />
        </div>

        {/* Center - Running Text (DESKTOP ONLY) */}
        <div className="hidden md:flex flex-1 mx-6 overflow-hidden whitespace-nowrap">
          <p className="animate-marquee text-sm md:text-base">
            Welcome to our official website | International Conference 2025 | Register Now 🚀
          </p>
        </div>

        {/* Right - Contact */}
        <div className="shrink-0">
          <span className="text-xs md:text-base font-semibold">
            📞 +91 98765 43210
          </span>
        </div>
      </div>

      {/* Running Text BELOW Navbar (MOBILE ONLY) */}
      <div className="md:hidden w-full bg-[#01311F] text-[#F0ECE3] overflow-hidden whitespace-nowrap px-4 py-2">
        <p className="animate-marquee text-sm">
          Welcome to our official website | International Conference 2025 | Register Now 🚀
        </p>
      </div>
    </>
  )
}

export default Navbar
