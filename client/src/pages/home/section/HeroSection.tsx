// import { useEffect, useState } from "react"

// import hero1 from "../../../assets/img/hero1.png"
// import hero2 from "../../../assets/img/hero2.png"
// import hero3 from "../../../assets/img/hero3.png"
// import logo from "../../../assets/greenstechnologys_logo.png"
// const images: string[] = [hero1, hero2, hero3]

// const HeroSection: React.FC = () => {
//   const [current, setCurrent] = useState<number>(0)

//   // Auto slide
//   useEffect(() => {
//     const interval = window.setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [])

//   // Controls
//   const prevSlide = (): void => {
//     setCurrent((prev) =>
//       prev === 0 ? images.length - 1 : prev - 1
//     )
//   }

//   const nextSlide = (): void => {
//     setCurrent((prev) =>
//       (prev + 1) % images.length
//     )
//   }

//   return (
//     <div
//       className="relative w-full h-[90vh] bg-cover bg-center transition-all duration-700"
//       style={{ backgroundImage: `url(${images[current]})` }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#01311F]/35"></div>

//       {/* Content Wrapper */}
//       <div className="relative z-10 h-full flex">
        
//         {/* LEFT HALF */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 text-[#F0ECE3]">
//           <img src={logo}className="w-50 mb-5" alt="" />
//           <h1 className="text-3xl md:text-5xl font-bold mb-4">
//             Greens Technology
//           </h1>

//           <p className="text-sm md:text-lg max-w-md mb-6">
//             Join researchers, academicians, and professionals from around the world.
//           </p>

//           <button className="w-fit bg-[#B99A49] text-[#01311F] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
//             Register Now
//           </button>
//         </div>

//         {/* RIGHT HALF (image only) */}
//         <div className="hidden md:block w-1/2"></div>
//       </div>

//       {/* LEFT ARROW */}
//       <button
//         onClick={prevSlide}
//         className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-20
//                    bg-[#01311F]/70 text-[#B99A49] p-3 rounded-full
//                    hover:bg-[#01311F]"
//         aria-label="Previous Slide"
//       >
//         ❮
//       </button>

//       {/* RIGHT ARROW */}
//       <button
//         onClick={nextSlide}
//         className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20
//                    bg-[#01311F]/70 text-[#B99A49] p-3 rounded-full
//                    hover:bg-[#01311F]"
//         aria-label="Next Slide"
//       >
//         ❯
//       </button>
//     </div>
//   )
// }

// export default HeroSection

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Placeholder imports - ensure these paths match your project
import hero1 from "../../../assets/img/hero1.png";
import hero2 from "../../../assets/img/hero2.png";
import hero3 from "../../../assets/img/hero3.png";
import logo from "../../../assets/greenstechnologys_logo.png";

// --- Configuration ---
const images: string[] = [hero1, hero2, hero3];

// Color Palette Constants for easier maintenance
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
};

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);

  const prevSlide = (): void => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (): void => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Auto slide logic
  useEffect(() => {
    const interval = window.setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]); // Added current to dependency to reset timer on manual click

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full flex flex-col">
      {/* 1. RUNNING TEXT BAR (From Wireframe) */}
      <div 
        className="w-full py-2 overflow-hidden whitespace-nowrap z-30"
        style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
      >
        <motion.div
          animate={{ x: [1000, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="font-bold text-sm tracking-wide"
        >
          ADMISSIONS OPEN FOR 2025 BATCH — REGISTER NOW FOR EARLY BIRD DISCOUNTS — CONTACT US FOR MORE INFO
        </motion.div>
      </div>

      {/* 2. MAIN HERO AREA */}
      <div className="relative w-full h-[90vh] overflow-hidden">
        
        {/* Animated Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[current]})` }}
          >
             {/* Dark Overlay for text readability */}
             <div className="absolute inset-0 opacity-60" style={{ backgroundColor: COLORS.darkGreen }}></div>
          </motion.div>
        </AnimatePresence>

        {/* Content Wrapper */}
        <div className="relative z-10 h-full flex items-center px-6 md:px-20">
          <div className="w-full md:w-2/3 flex flex-col justify-center text-left">
            
            {/* Logo Animation */}
            <motion.img 
              src={logo} 
              alt="Greens Tech Logo" 
              className="w-40 md:w-52 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            />

            {/* Text Animation */}
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
              style={{ color: COLORS.cream }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Greens Technology
            </motion.h1>

            <motion.p 
              className="text-md md:text-xl max-w-lg mb-8 opacity-90"
              style={{ color: COLORS.cream }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              Join researchers, academicians, and professionals from around the world in a journey of excellence.
            </motion.p>

            {/* CTA Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-colors"
              style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Enrol Now
            </motion.button>
          </div>
        </div>

        {/* --- NAVIGATION ARROWS --- */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full transition-all hover:scale-110"
          style={{ backgroundColor: `${COLORS.darkGreen}80`, color: COLORS.gold }} // 80 is for opacity
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full transition-all hover:scale-110"
          style={{ backgroundColor: `${COLORS.darkGreen}80`, color: COLORS.gold }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {/* 3. FLOATING ACTION BUTTONS (From Wireframe) */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
        {/* Chatbot */}
        <FloatingButton label="Chatbot" color={COLORS.cream} textColor={COLORS.darkGreen}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
        </FloatingButton>
        
        {/* WhatsApp */}
        <FloatingButton label="WhatsApp" color={COLORS.gold} textColor={COLORS.darkGreen}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.95 14.95c.5.5.5 1.45.05 1.95l-1.45 1.45c-1.35 1.35-3.8 1.45-6.55-1.3-2.75-2.75-2.65-5.2-1.3-6.55l1.45-1.45c.5-.45 1.45-.45 1.95.05l2.15 2.15c.5.5.5 1.45-.05 1.95l-1 1c-.3.3-.3.75 0 1.05.8.8 1.8 1.8 2.6 2.6.3.3.75.3 1.05 0l1-1c.5-.5 1.45-.5 1.95 0l2.15 2.15Z"/></svg>
        </FloatingButton>

        {/* Scroll To Top */}
        <motion.button 
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full shadow-lg"
            style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen }}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </motion.button>
      </div>
    </div>
  );
};

// Helper component for Floating Buttons with Tooltips/Labels
const FloatingButton = ({ children, label, color, textColor }: { children: React.ReactNode, label: string, color: string, textColor: string }) => {
    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
        >
            <span className="hidden md:block bg-white px-2 py-1 rounded text-xs font-bold shadow-sm text-gray-800">
                {label}
            </span>
            <div 
                className="p-3 rounded-full shadow-lg flex items-center justify-center"
                style={{ backgroundColor: color, color: textColor }}
            >
                {children}
            </div>
        </motion.div>
    )
}

export default HeroSection;