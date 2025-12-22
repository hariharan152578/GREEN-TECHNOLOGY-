import { useState, useEffect } from "react"
import logo from "../assets/logo.png"

const Navbar = () => {
  // 1. Define your dynamic content here
  const [notices] = useState([
    "Welcome to our official website",
    "International Conference 2025",
    "Register Now 🚀",
    "New Batch starts from Monday",
    "Limited seats available for DevOps workshop"
  ]);

  // 2. Join notices with a separator for the marquee effect
  const marqueeText = notices.join(" | ");

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
        <div className="hidden md:flex flex-1 mx-10 overflow-hidden whitespace-nowrap relative">
          <p className="animate-marquee inline-block text-sm md:text-base">
            {marqueeText}
          </p>
        </div>

        {/* Right - Contact */}
        <div className="shrink-0">
          <a 
            href="tel:+919876543210" 
            className="text-xs md:text-base font-semibold hover:text-[#B99A49] transition-colors"
          >
            📞 +91 98765 43210
          </a>
        </div>
      </div>

      {/* Running Text BELOW Navbar (MOBILE ONLY) */}
      <div className="md:hidden w-full bg-[#01311F] border-t border-white/10 text-[#F0ECE3] overflow-hidden whitespace-nowrap py-2">
        <p className="animate-marquee inline-block text-sm">
          {marqueeText}
        </p>
      </div>
    </>
  )
}

export default Navbar