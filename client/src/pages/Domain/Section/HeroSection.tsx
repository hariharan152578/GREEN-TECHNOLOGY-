import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

// Placeholder imports - ensure these paths match your project
import logo from "../../../assets/logo.png";

// Note: Using the same placeholder for all images for this example
const hero1 = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const hero2 = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const hero3 = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


// --- Configuration ---
const images: string[] = [hero1, hero2, hero3];

// Color Palette Constants
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
  gray: "#CCCCCC"
};

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);

  // Auto slide logic
  const prevSlide = (): void => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (): void => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Dispatch event to MainLayout to open modal
  const handleEnrolClick = (): void => {
    // Note: Assuming window is available in your environment
    window.dispatchEvent(new Event('open-enrolment'));
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full flex flex-col font-sans">
      
      {/* 1. RUNNING TEXT BAR */}
      <div 
        className="w-full py-2 overflow-hidden whitespace-nowrap z-40 relative"
        style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
      >
        <motion.div
          animate={{ x: [1000, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="font-bold text-sm tracking-wide flex gap-8"
        >
          <span>ADMISSIONS OPEN FOR 2025 BATCH</span> 
          <span>•</span>
          <span>REGISTER NOW FOR EARLY BIRD DISCOUNTS</span>
          <span>•</span>
          <span>CONTACT US FOR MORE INFO</span>
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
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[current]})` }}
          >
             {/* Dark overlay for text contrast */}
             <div className="absolute inset-0 opacity-50" style={{ backgroundColor: COLORS.darkGreen }}></div>
          </motion.div>
        </AnimatePresence>

        {/* Content Wrapper */}
        <div className="relative z-10 h-full flex items-center px-6 md:px-20">
          <div className="w-full md:w-2/3 flex flex-col justify-center text-left">
            
            <motion.img 
              src={logo} 
              alt="Greens Tech Logo" 
              className="w-40 md:w-52 mb-6 drop-shadow-lg"
              // Initial state for the appearance animation (comes from above)
              initial={{ opacity: 0, y: -30, rotateY: 0 }} 
              // Combined appearance animation and continuous spin
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotateY: 360 // Continuous rotation around the Y-axis (horizontal spin)
              }}
              transition={{ 
                // Appearance transition
                y: { delay: 0.2, duration: 0.8 }, 
                opacity: { delay: 0.2, duration: 0.8 },
                // Continuous spin transition
                rotateY: {
                    repeat: Infinity,
                    duration: 5, // 5 seconds for one full spin
                    ease: "linear"
                }
              }}
            />

            <div className="overflow-hidden">
                <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                style={{ color: COLORS.cream }}
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                >
                Greens Technology
                </motion.h1>
            </div>

            <motion.p 
              className="text-md md:text-xl max-w-lg mb-8 opacity-90 leading-relaxed"
              style={{ color: COLORS.cream }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Join researchers, academicians, and professionals from around the world in a journey of excellence.
            </motion.p>

            <motion.button 
              onClick={handleEnrolClick}
              whileHover={{ scale: 1.05, backgroundColor: COLORS.cream, color: COLORS.darkGreen }}
              whileTap={{ scale: 0.95 }}
              className="w-fit px-8 py-3 rounded-full font-bold text-lg shadow-xl transition-all border-2 border-transparent"
              style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Enrol Now
            </motion.button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          onClick={prevSlide}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full backdrop-blur-sm border border-white/20 shadow-lg group"
          style={{ backgroundColor: `${COLORS.darkGreen}60` }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          onClick={nextSlide}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full backdrop-blur-sm border border-white/20 shadow-lg group"
          style={{ backgroundColor: `${COLORS.darkGreen}60` }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;