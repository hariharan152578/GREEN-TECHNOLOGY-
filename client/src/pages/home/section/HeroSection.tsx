import { useEffect, useState } from "react"

import hero1 from "../../../assets/img/hero1.png"
import hero2 from "../../../assets/img/hero2.png"
import hero3 from "../../../assets/img/hero3.png"
import logo from "../../../assets/greenstechnologys_logo.png"
const images: string[] = [hero1, hero2, hero3]

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState<number>(0)

  // Auto slide
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Controls
  const prevSlide = (): void => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const nextSlide = (): void => {
    setCurrent((prev) =>
      (prev + 1) % images.length
    )
  }

  return (
    <div
      className="relative w-full h-[90vh] bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#01311F]/35"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 h-full flex">
        
        {/* LEFT HALF */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 text-[#F0ECE3]">
          <img src={logo}className="w-50 mb-5" alt="" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Greens Technology
          </h1>

          <p className="text-sm md:text-lg max-w-md mb-6">
            Join researchers, academicians, and professionals from around the world.
          </p>

          <button className="w-fit bg-[#B99A49] text-[#01311F] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
            Register Now
          </button>
        </div>

        {/* RIGHT HALF (image only) */}
        <div className="hidden md:block w-1/2"></div>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-20
                   bg-[#01311F]/70 text-[#B99A49] p-3 rounded-full
                   hover:bg-[#01311F]"
        aria-label="Previous Slide"
      >
        ❮
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20
                   bg-[#01311F]/70 text-[#B99A49] p-3 rounded-full
                   hover:bg-[#01311F]"
        aria-label="Next Slide"
      >
        ❯
      </button>
    </div>
  )
}

export default HeroSection
