import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdvertisementPopup from "../components/AdvertisementPopup";

// --- Color Palette Constants ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
  gray: "#CCCCCC"
};

// --- ANIMATION VARIANTS (Moved from Hero) ---

// 1. DNA HELIX SPIRAL for Stack Items
const dnaHelixVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: 50,
    y: i % 2 === 0 ? -100 : 100,
    rotate: 180,
    scale: 0.2,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: i * 0.15,
      rotate: { type: "spring", stiffness: 200, damping: 15 }
    }
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 50,
    y: i % 2 === 0 ? -100 : 100,
    rotate: -180,
    scale: 0.2,
    transition: { duration: 0.3, delay: i * 0.05 }
  })
};

// 2. INFINITY SIGN PATH for Enquiry Form
const infinityEnquiryVariants: Variants = {
  initial: { 
    opacity: 0,
    pathLength: 0,
    rotate: -90,
  },
  animate: { 
    opacity: 1,
    pathLength: 1,
    rotate: 0,
    transition: { 
      rotate: { type: "spring", stiffness: 150, damping: 20 },
      pathLength: { duration: 2, ease: "easeInOut" },
      opacity: { duration: 0.5 }
    }
  },
  hover: {
    scale: 1.1,
    rotate: [0, 10, -10, 0],
    transition: {
      rotate: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
      scale: { type: "spring", stiffness: 400 }
    }
  }
};

// 3. NEON PULSE for Interactive Elements
const neonPulseVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    boxShadow: [
      "0 0 10px rgba(185, 154, 73, 0.3)",
      "0 0 20px rgba(185, 154, 73, 0.5)",
      "0 0 30px rgba(185, 154, 73, 0.7)",
      "0 0 20px rgba(185, 154, 73, 0.5)",
      "0 0 10px rgba(185, 154, 73, 0.3)"
    ],
    transition: {
      scale: { type: "spring", stiffness: 200 },
      boxShadow: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// 4. MESSAGE BUBBLE FLOAT Animation
const messageFloatVariants: Variants = {
  initial: { y: 20, opacity: 0, scale: 0.8 },
  animate: {
    y: [0, -10, 0],
    opacity: 1,
    scale: 1,
    transition: {
      y: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      },
      scale: { type: "spring", stiffness: 300 }
    }
  }
};

export const MainLayout = () => {
  const [showAd, setShowAd] = useState(false);
  const offerPoster = "https://www.shutterstock.com/image-vector/special-offer-banner-vector-template-260nw-2474802375.jpg";

  // --- STATE FOR FLOATING UI ---
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isStackOpen, setIsStackOpen] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>("");

  // --- LOGIC FOR FLOATING UI ---
  const toggleModal = (): void => {
    setIsModalOpen(prev => !prev);
  };

  const toggleChat = (): void => {
    setActiveChat(prev => !prev);
  };

  const sendMessage = (): void => {
    if (chatMessage.trim()) {
      console.log("Message sent:", chatMessage);
      setChatMessage("");
      setTimeout(() => {
        alert("Thanks for your message! Our team will respond shortly.");
      }, 500);
    }
  };

  // Listen for "Enrol Now" clicks from other components (like Hero)
  useEffect(() => {
    const handleEnrolEvent = () => setIsModalOpen(true);
    window.addEventListener('open-enrolment', handleEnrolEvent);

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-enrolment', handleEnrolEvent);
    };
  }, []);

  return (
    <>
      {/* Advertisement Popup */}
      <AdvertisementPopup
        isOpen={showAd}
        onClose={() => setShowAd(false)}
        posterUrl={offerPoster}
      />

      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* --- FLOATING COMPONENTS (Moved Here) --- */}
      
      {/* 1. FLOATING STACK (Right Margin) */}
      <div className="fixed bottom-10 right-0 z-[60] flex flex-col items-end gap-4 font-sans">
        
        {/* Enquiry Form - Infinity Symbol */}
        <motion.div
            variants={infinityEnquiryVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer shadow-2xl rounded-l-2xl border-l-4 border-y-4 border-white/20 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: COLORS.gold }}
            onClick={toggleModal}
        >
            <motion.svg 
                width="60" 
                height="80" 
                className="absolute"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
                <path
                    d="M20 40 Q30 20 40 40 Q50 60 60 40 M60 40 Q50 20 40 40 Q30 60 20 40"
                    fill="none"
                    stroke={COLORS.darkGreen}
                    strokeWidth="2"
                />
            </motion.svg>
            
            <div 
                className="py-6 px-2 flex items-center justify-center z-10"
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

        {/* Hidden Items Container (Chat & Whatsapp) */}
        <AnimatePresence>
          {isStackOpen && (
            <motion.div 
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-6 items-center mr-4"
            >
               {/* Chatbot */}
               <motion.div 
                  custom={0}
                  variants={dnaHelixVariants}
                  className="relative group"
               >
                  <motion.div
                      variants={messageFloatVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute -top-16 -right-4 bg-white px-4 py-2 rounded-lg shadow-lg z-20"
                      style={{ color: COLORS.darkGreen }}
                  >
                      <span className="text-xs font-bold">Hi! Need help?</span>
                      <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{ borderTopColor: COLORS.white }} />
                  </motion.div>
                  
                  <FloatingButton 
                      label="AI Chatbot" 
                      color={COLORS.cream} 
                      textColor={COLORS.darkGreen}
                      onClick={toggleChat}
                  >
                      <motion.div
                          animate={{ rotate: [0, 20, -20, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                      >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-5.5 0-10 3.6-10 8 0 4.4 4.5 8 10 8a13 13 0 0 0 1.9-.1l4.8 2.8c.4.2 1-.1.9-.6l-.7-3.2c2-1.6 3.1-3.8 3.1-6.1 0-4.4-4.5-8-10-8Z"/></svg>
                      </motion.div>
                  </FloatingButton>
               </motion.div>
               
               {/* WhatsApp */}
               <motion.div 
                  custom={1}
                  variants={dnaHelixVariants}
               >
                  <FloatingButton 
                      label="WhatsApp" 
                      color={COLORS.gold} 
                      textColor={COLORS.darkGreen} 
                      variants={neonPulseVariants}
                      pulse={true}
                  >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                  </FloatingButton>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Stack Toggle Button */}
        <motion.button 
            onClick={() => setIsStackOpen(!isStackOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
                rotate: isStackOpen ? 180 : 0,
            }}
            transition={{
                rotate: { type: "spring", stiffness: 200, damping: 15 }
            }}
            className="mr-4 p-4 rounded-full shadow-2xl border-2 border-transparent relative z-50 overflow-hidden"
            style={{ backgroundColor: COLORS.white, color: COLORS.darkGreen }}
        >
            {/* Magnetic Field Rings */}
            <motion.div 
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: COLORS.gold }}
                animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.7, 0.4, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                }}
            />
            <motion.div 
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: COLORS.gold }}
                animate={{
                    scale: [1, 1.8, 2.2],
                    opacity: [0.5, 0.2, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5
                }}
            />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </motion.button>
      </div>

      {/* 2. CHAT INTERFACE */}
      <ChatInterface 
        isOpen={activeChat} 
        onClose={toggleChat} 
        colors={COLORS}
        message={chatMessage}
        setMessage={setChatMessage}
        sendMessage={sendMessage}
      />

      {/* 3. ENROLLMENT MODAL */}
      <EnrollmentModal isOpen={isModalOpen} onClose={toggleModal} colors={COLORS} />

      <Footer />
    </>
  );
};


// --- SUB COMPONENTS (Moved from Hero) ---

// Floating Button
interface FloatingBtnProps {
    children: React.ReactNode;
    label: string;
    color: string;
    textColor: string;
    pulse?: boolean;
    variants?: Variants;
    onClick?: () => void;
}

const FloatingButton = ({ children, label, color, textColor, pulse = false, variants, onClick }: FloatingBtnProps) => {
    return (
        <motion.div 
            variants={variants}
            className="flex items-center gap-2 cursor-pointer group relative"
            onClick={onClick}
        >
            <motion.span 
                className="absolute right-14 bg-white px-3 py-1 rounded-md text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30"
                style={{ color: COLORS.darkGreen }}
                initial={{ y: 10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ type: "spring" }}
            >
                {label}
            </motion.span>

            <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                animate={pulse ? { 
                    boxShadow: [
                        `0 0 0 0px ${color}80`,
                        `0 0 0 12px ${color}00`,
                        `0 0 0 0px ${color}80`
                    ],
                } : {}}
                transition={pulse ? { 
                    boxShadow: { duration: 2, repeat: Infinity } 
                } : {}}
                className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center relative z-10 border-2 border-white/30"
                style={{ backgroundColor: color, color: textColor }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}

// Chat Interface
interface ChatProps {
    isOpen: boolean;
    onClose: () => void;
    colors: typeof COLORS;
    message: string;
    setMessage: (msg: string) => void;
    sendMessage: () => void;
}

const chatVariants: Variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
        x: 0, 
        opacity: 1,
        transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
        }
    },
    exit: { 
        x: "100%", 
        opacity: 0,
        transition: { duration: 0.3 }
    }
};

const ChatInterface: React.FC<ChatProps> = ({ isOpen, onClose, colors, message, setMessage, sendMessage }) => {
    if (!isOpen) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed bottom-28 right-6 w-80 md:w-96 z-[100] font-sans"
                    variants={chatVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div 
                        className="rounded-2xl shadow-2xl overflow-hidden border-2"
                        style={{ borderColor: colors.gold, backgroundColor: colors.white }}
                    >
                        <div className="p-4 flex items-center justify-between" style={{ backgroundColor: colors.gold }}>
                            <div className="flex items-center gap-3">
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.white, color: colors.darkGreen }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c-5.5 0-10 3.6-10 8 0 4.4 4.5 8 10 8a13 13 0 0 0 1.9-.1l4.8 2.8c.4.2 1-.1.9-.6l-.7-3.2c2-1.6 3.1-3.8 3.1-6.1 0-4.4-4.5-8-10-8Z"/></svg>
                                    </div>
                                </motion.div>
                                <div>
                                    <h3 className="font-bold" style={{ color: colors.darkGreen }}>AI Assistant</h3>
                                    <div className="flex items-center gap-1">
                                        <motion.div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.darkGreen }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
                                        <span className="text-xs" style={{ color: colors.darkGreen }}>Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>
                        <div className="p-4 h-64 overflow-y-auto">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                                <div className="inline-block px-4 py-2 rounded-2xl rounded-bl-none max-w-xs" style={{ backgroundColor: colors.cream }}>
                                    <p className="text-sm" style={{ color: colors.darkGreen }}>Hello! I'm Greens Tech AI assistant. How can I help you today?</p>
                                </div>
                                <span className="block text-xs mt-1 opacity-60" style={{ color: colors.darkGreen }}>Just now</span>
                            </motion.div>
                        </div>
                        <div className="p-4 border-t" style={{ borderColor: colors.gray }}>
                            <div className="flex gap-2">
                                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type your message..." className="flex-1 p-3 rounded-full border text-sm" style={{ borderColor: colors.gray, backgroundColor: colors.white, color: colors.darkGreen }} />
                                <motion.button onClick={sendMessage} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-3 rounded-full" style={{ backgroundColor: colors.gold, color: colors.darkGreen }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Enrollment Modal
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    colors: typeof COLORS;
}

const modalVariants: Variants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { 
        opacity: 1, 
        backdropFilter: "blur(10px)",
        transition: { duration: 0.3 }
    },
};

const formVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0, y: -50, rotateX: 90 },
    visible: { 
        scale: 1, opacity: 1, y: 0, rotateX: 0,
        transition: { type: "spring", stiffness: 400, damping: 30, rotateX: { stiffness: 300 } } 
    },
    exit: { scale: 0.8, opacity: 0, y: 50, transition: { duration: 0.2 } },
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
                    className="fixed inset-0 flex items-center justify-center z-[100] p-4 font-sans"
                    style={{ backgroundColor: `${colors.darkGreen}E6` }}
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-lg p-8 rounded-2xl shadow-2xl relative overflow-hidden"
                        style={{ backgroundColor: colors.cream, color: colors.darkGreen }}
                        variants={formVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div 
                            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10"
                            style={{ backgroundColor: colors.gold }}
                            animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
                            transition={{ duration: 20, repeat: Infinity }}
                        />
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full transition-colors z-10" style={{ backgroundColor: colors.darkGreen, color: colors.white }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                        <motion.h2 className="text-3xl font-bold mb-6 border-b pb-2" style={{ borderColor: colors.gold }} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>Enrolment Form</motion.h2>
                        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            {['name', 'email', 'phone'].map((field, i) => (
                                <motion.div key={field} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}>
                                    <label htmlFor={field} className="block text-sm font-medium mb-1 capitalize">{field === 'phone' ? 'Phone Number' : `${field} Address`}</label>
                                    <input type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} id={field} required className="w-full p-3 rounded-lg border transition-all focus:ring-2 focus:outline-none" style={{ borderColor: colors.gray, backgroundColor: colors.white, color: colors.darkGreen }} onFocus={(e) => { e.target.style.boxShadow = `0 0 0 2px ${colors.gold}`; }} onBlur={(e) => { e.target.style.boxShadow = `0 0 0 0px ${colors.gold}`; }} />
                                </motion.div>
                            ))}
                            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                                <label htmlFor="course" className="block text-sm font-medium mb-1">Interested Course</label>
                                <select id="course" required className="w-full p-3 rounded-lg border appearance-none transition-all" style={{ borderColor: colors.gray, backgroundColor: colors.white, color: colors.darkGreen }}><option value="">Select a course</option><option value="data-science">Data Science</option><option value="web-dev">Full Stack Web Development</option><option value="cyber-sec">Cyber Security</option><option value="ai-ml">AI/ML</option></select>
                            </motion.div>
                            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-6 py-4 rounded-full font-bold text-lg relative overflow-hidden" style={{ backgroundColor: colors.gold, color: colors.darkGreen, boxShadow: `0 10px 30px -10px ${colors.gold}` }}>
                                <motion.span className="absolute inset-0 bg-white" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.6 }} />
                                <span className="relative z-10">Submit & Enrol</span>
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};