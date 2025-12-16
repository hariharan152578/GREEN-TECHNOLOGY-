/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Placeholder imports - ensure these paths match your project
import logo from "../../../assets/greenstechnologys_logo.png";
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

// Animation Variants for the Floating Stack
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200 } },
};

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isStackOpen, setIsStackOpen] = useState<boolean>(false);

  // Auto slide logic
  const prevSlide = (): void => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (): void => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const toggleModal = (): void => {
    setIsModalOpen(prev => !prev);
  }

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
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
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
              onClick={toggleModal}
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          onClick={nextSlide}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full backdrop-blur-sm border border-white/20 shadow-lg group"
          style={{ backgroundColor: `${COLORS.darkGreen}60` }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </motion.button>
      </div>

      {/* 3. & 4. FLOATING STACK (Fixed to Right Margin) */}
      <div className="fixed bottom-10 right-0 z-50 flex flex-col items-end gap-4">
        
        {/* Enquiry Form - Side Tab Style */}
        <motion.div
            variants={itemVariants}
            whileHover={{ x: -10 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer shadow-2xl rounded-l-2xl border-l-2 border-y-2 border-white/20 flex items-center justify-center relative"
            style={{ backgroundColor: COLORS.gold }}
            onClick={toggleModal}
        >
             <div 
                className="py-6 px-2 flex items-center justify-center"
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

        {/* Hidden Items Container (Aligned with toggle button) */}
        <AnimatePresence>
          {isStackOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 items-center mr-4" // Margin to align with round button
            >
               <FloatingButton label="Chatbot" color={COLORS.cream} textColor={COLORS.darkGreen}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-5.5 0-10 3.6-10 8 0 4.4 4.5 8 10 8a13 13 0 0 0 1.9-.1l4.8 2.8c.4.2 1-.1.9-.6l-.7-3.2c2-1.6 3.1-3.8 3.1-6.1 0-4.4-4.5-8-10-8Z"/></svg>
               </FloatingButton>
               
               <FloatingButton label="WhatsApp" color={COLORS.gold} textColor={COLORS.darkGreen} pulse={true}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
               </FloatingButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button (Arrow) - With margin */}
        <motion.button 
            onClick={() => setIsStackOpen(!isStackOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isStackOpen ? 180 : 0 }}
            className="mr-4 p-4 rounded-full shadow-2xl border border-white/20 relative z-50"
            style={{ backgroundColor: COLORS.white, color: COLORS.darkGreen }}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </motion.button>

      </div>

      {/* 5. ENROLLMENT MODAL */}
      <EnrollmentModal isOpen={isModalOpen} onClose={toggleModal} colors={COLORS} />

    </div>
  );
};

// --- Helper Component: Floating Button ---
interface FloatingBtnProps {
    children: React.ReactNode;
    label: string;
    color: string;
    textColor: string;
    pulse?: boolean;
}

const FloatingButton = ({ children, label, color, textColor, pulse = false }: FloatingBtnProps) => {
    return (
        <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 cursor-pointer group relative"
        >
            {/* Tooltip Label */}
            <span 
                className="absolute right-14 bg-white px-3 py-1 rounded-md text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
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
                className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center relative z-10"
                style={{ backgroundColor: color, color: textColor }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}

// --- Helper Component: Enrollment Modal ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    colors: typeof COLORS;
}

const modalVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const formVariants: Variants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 500, damping: 30 } },
    exit: { y: "100vh", opacity: 0 },
};

const EnrollmentModal: React.FC<ModalProps> = ({ isOpen, onClose, colors }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Enrolment form submitted! We will contact you soon.");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
                    style={{ backgroundColor: `${colors.darkGreen}C0` }}
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-lg p-8 rounded-xl shadow-2xl relative"
                        style={{ backgroundColor: colors.cream, color: colors.darkGreen }}
                        variants={formVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full transition-colors"
                            style={{ backgroundColor: colors.darkGreen, color: colors.white }}
                            aria-label="Close"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>

                        <h2 className="text-3xl font-bold mb-6 border-b pb-2" style={{ borderColor: colors.gold }}>
                            Enrolment Form
                        </h2>
                        <p className="mb-4 text-sm opacity-80">
                            Fill in your details, and an academic advisor will reach out to guide you through the process.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                                <input type="text" id="name" required className="w-full p-3 rounded-md border" style={{ borderColor: colors.gray, backgroundColor: colors.white, color: colors.darkGreen }} placeholder="John Doe" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                                <input type="email" id="email" required className="w-full p-3 rounded-md border" style={{ borderColor: colors.gray, backgroundColor: colors.white, color: colors.darkGreen }} placeholder="john.doe@example.com" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                                <input type="tel" id="phone" required className="w-full p-3 rounded-md border" style={{ borderColor: colors.gray, backgroundColor: colors.white, color: colors.darkGreen }} placeholder="+91-XXXXXXXXXX" />
                            </div>
                            <div>
                                <label htmlFor="course" className="block text-sm font-medium mb-1">Interested Course</label>
                                <select id="course" required className="w-full p-3 rounded-md border appearance-none" style={{ borderColor: colors.gray, backgroundColor: colors.white, color: colors.darkGreen }}>
                                    <option value="">Select a course</option>
                                    <option value="data-science">Data Science</option>
                                    <option value="web-dev">Full Stack Web Development</option>
                                    <option value="cyber-sec">Cyber Security</option>
                                    <option value="ai-ml">AI/ML</option>
                                </select>
                            </div>
                            
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, backgroundColor: colors.darkGreen, color: colors.gold }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full mt-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all"
                                style={{ backgroundColor: colors.gold, color: colors.darkGreen }}
                            >
                                Submit & Enrol
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default HeroSection;