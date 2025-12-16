/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Placeholder imports - ensure these paths match your project
// import hero1 from "../../../assets/img/hero1.png";
// import hero2 from "../../../assets/img/hero2.png";
// import hero3 from "../../../assets/img/hero3.png";
import logo from "../../../assets/greenstechnologys_logo.png";

// --- Functional Placeholder URLs ---
// Replaced non-public links with guaranteed public links for successful rendering
const hero1 = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const hero2 = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const hero3 = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// --- Configuration ---
const images: string[] = [hero1, hero2, hero3];
const SLIDE_INTERVAL = 5000; // 5 seconds

// Color Palette Constants
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

// --- Framer Motion Variants ---
const stackVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger effect: items appear one after another
      delayChildren: 1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200 } },
};

// --- 1. Refactored Image Slider Component ---
interface ImageSliderProps {
  images: string[];
  current: number;
  prevSlide: () => void;
  nextSlide: () => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, current, prevSlide, nextSlide }) => {
  return (
    <div className="relative w-full h-full">
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
           {/* Dark Overlay */}
           <div className="absolute inset-0 opacity-50" style={{ backgroundColor: COLORS.darkGreen }}></div>
        </motion.div>
      </AnimatePresence>

      {/* --- NAVIGATION ARROWS (Responsive) --- */}
      {/* Left Arrow: Visible on all screen sizes */}
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full backdrop-blur-sm border border-white/20 shadow-lg"
        style={{ backgroundColor: `${COLORS.darkGreen}60` }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </motion.button>

      {/* Right Arrow: Visible on all screen sizes */}
      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full backdrop-blur-sm border border-white/20 shadow-lg"
        style={{ backgroundColor: `${COLORS.darkGreen}60` }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </motion.button>

    </div>
  );
};


// --- 2. Main Hero Section Component ---
const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const navigate = useNavigate();

  // --- Slide Logic ---
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
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [current]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        
        {/* Replaced old logic with the new component */}
        <ImageSlider 
          images={images} 
          current={current} 
          prevSlide={prevSlide} 
          nextSlide={nextSlide} 
        />

        {/* Content Wrapper (Sits on top of the ImageSlider) */}
        <div className="absolute inset-0 z-10 h-full flex items-center px-6 md:px-20">
          <div className="w-full md:w-2/3 flex flex-col justify-center text-left">
            
            {/* Logo Animation */}
            <motion.img 
              src={logo} 
              alt="Greens Tech Logo" 
              className="w-40 md:w-52 mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />

            {/* Heading Animation */}
            <div className="overflow-hidden">
                <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                style={{ color: COLORS.cream }}
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
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

            {/* CTA Button */}
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: COLORS.cream, color: COLORS.darkGreen }}
              whileTap={{ scale: 0.95 }}
              className="w-fit px-8 py-3 rounded-full font-bold text-lg shadow-xl transition-all border-2 border-transparent"
              style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={() => navigate("/course")}
            >
             Course
            </motion.button>
          </div>
        </div>
        
        {/* Carousel Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {images.map((_, index) => (
                <motion.div
                    key={index}
                    className="w-2.5 h-2.5 rounded-full cursor-pointer"
                    style={{ 
                        backgroundColor: index === current ? COLORS.gold : COLORS.cream,
                        opacity: index === current ? 1 : 0.6 
                    }}
                    onClick={() => setCurrent(index)}
                    whileHover={{ scale: 1.2 }}
                />
            ))}
        </div>
      </div>

      {/* 3. & 4. COMBINED VERTICAL STACK (Enquiry + Floating Buttons) */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-center"
        variants={stackVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* ENQUIRY FORM (Vertical Pill) */}
        <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer shadow-2xl rounded-full border-2 border-white/20"
            style={{ backgroundColor: COLORS.gold }}
            onClick={() => alert("Open Enquiry Form Modal/Page")} // Added click handler
        >
             <div 
                className="py-6 px-3 flex items-center justify-center"
                style={{ 
                    color: COLORS.darkGreen,
                    writingMode: "vertical-rl", 
                    textOrientation: "mixed"
                }}
            >
                <span className="font-bold tracking-widest text-xs whitespace-nowrap transform rotate-180">
                    ENQUIRY FORM
                </span>
            </div>
        </motion.div>

        {/* Chatbot */}
        <FloatingButton 
            label="Chatbot" 
            color={COLORS.cream} 
            textColor={COLORS.darkGreen}
            onClick={() => alert("Launch Chatbot Widget")} // Added click handler
        >
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-5.5 0-10 3.6-10 8 0 4.4 4.5 8 10 8a13 13 0 0 0 1.9-.1l4.8 2.8c.4.2 1-.1.9-.6l-.7-3.2c2-1.6 3.1-3.8 3.1-6.1 0-4.4-4.5-8-10-8Z"/></svg>
        </FloatingButton>
        
        {/* WhatsApp (With Pulse) */}
        <FloatingButton 
            label="WhatsApp" 
            color={COLORS.gold} 
            textColor={COLORS.darkGreen} 
            pulse={true}
            onClick={() => window.open('https://wa.me/1234567890', '_blank')} // Added real-world click handler
        >
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
        </FloatingButton>

        {/* Scroll To Top */}
        <motion.button 
            variants={itemVariants}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full shadow-lg border border-opacity-20 border-black"
            style={{ backgroundColor: COLORS.white, color: COLORS.darkGreen }}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </motion.button>

      </motion.div>

    </div>
  );
};

// --- Helper Component ---
interface FloatingBtnProps {
    children: React.ReactNode;
    label: string;
    color: string;
    textColor: string;
    pulse?: boolean;
    onClick: () => void; // Added onClick handler
}

const FloatingButton = ({ children, label, color, textColor, pulse = false, onClick }: FloatingBtnProps) => {
    return (
        <motion.div 
            variants={itemVariants} // Applies staggered animation
            className="flex items-center gap-2 cursor-pointer group relative"
            onClick={onClick} // Applied click handler
        >
            {/* Tooltip Label (Appears on Hover) */}
            <span 
                className="absolute right-16 md:right-14 bg-white px-3 py-1 rounded-md text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                style={{ color: COLORS.darkGreen }}
            >
                {label}
            </span>

            <motion.div 
                whileHover={{ scale: 1.1 }}
                animate={pulse ? { 
                    boxShadow: [`0 0 0 0px ${color}80`, `0 0 0 10px ${color}00`],
                } : {}}
                transition={pulse ? { 
                    repeat: Infinity, 
                    duration: 1.5 
                } : {}}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-xl flex items-center justify-center relative z-10"
                style={{ backgroundColor: color, color: textColor }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}

export default HeroSection;