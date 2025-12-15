import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

// Student Data Interface
interface StudentCardProps {
  id: number;
  name: string;
  course: string;
  rating: number;
  review: string;
  imageUrl?: string;
  placement?: string;
  duration?: string;
}

// --- Animation Variants ---
const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

const StudentFlipCard: React.FC<StudentCardProps> = ({
  name,
  course,
  rating,
  review,
  imageUrl,
  placement,
  duration = "6 months",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Render stars helper
  const renderStars = (fillColor: string, emptyColor: string) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className="w-4 h-4"
        fill={index < rating ? fillColor : emptyColor}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div
      className="relative w-full h-[450px] cursor-pointer perspective-1000 group mx-auto max-w-sm md:max-w-none" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Flipping Container */}
      <motion.div
        initial={false}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 1.0, type: "spring", stiffness: 60, damping: 15 }}
        className="relative w-full h-full preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* === FRONT SIDE === */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl shadow-xl overflow-hidden flex flex-col"
          style={{ 
            backgroundColor: COLORS.white,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden" 
          }}
        >
          {/* Header Graphic */}
          <div 
            className="h-32 w-full relative bg-gradient-to-b from-[#01311F] to-[#014f32]"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "10px 10px" }}></div>
          </div>

          {/* Profile Image - LARGE CIRCLE */}
          <div className="relative -mt-16 flex justify-center">
            <div 
                className="w-32 h-32 rounded-full border-[5px] shadow-lg overflow-hidden flex items-center justify-center bg-white"
                style={{ borderColor: COLORS.gold }}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-4xl font-bold" style={{ color: COLORS.darkGreen }}>{name.charAt(0)}</span>
                )}
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 flex flex-col items-center pt-4 px-6 text-center">
            <h3 className="text-2xl font-bold mb-1" style={{ color: COLORS.darkGreen }}>{name}</h3>
            <p className="text-xs font-bold uppercase tracking-wider mb-4 opacity-70" style={{ color: "#555" }}>{course}</p>
            
            <div className="flex items-center gap-1 mb-6 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                {renderStars(COLORS.gold, "#ddd")}
                <span className="text-xs font-bold ml-1" style={{ color: COLORS.darkGreen }}>{rating}/5</span>
            </div>

            {/* Footer Stats */}
            <div className="w-full mt-auto mb-6 flex justify-between items-center border-t border-gray-100 pt-4">
                <div className="text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Duration</p>
                    <p className="text-sm font-bold" style={{ color: COLORS.darkGreen }}>{duration}</p>
                </div>
                {placement && (
                    <div className="text-center">
                        <p className="text-[10px] font-bold uppercase text-gray-400">Placed At</p>
                        <p className="text-sm font-bold" style={{ color: COLORS.gold }}>{placement}</p>
                    </div>
                )}
            </div>
            
            <div className="mb-3 text-[10px] uppercase tracking-widest opacity-40 font-bold">
               Hover to Flip
            </div>
          </div>
        </div>


        {/* === BACK SIDE === */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center rotate-y-180"
          style={{ 
            backgroundColor: COLORS.gold,
            color: COLORS.darkGreen,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
            <div className="mb-6 opacity-20">
                <svg width="64" height="64" viewBox="0 0 24 24" fill={COLORS.darkGreen}><path d="M14.017 21L14.017 18.009C14.017 16.9381 14.8853 16.0698 15.9562 16.0698L17.9458 16.0698L15.9562 11.7674C15.5 10.7813 16.218 9.63843 17.3045 9.63843L21.0545 9.63843C21.6068 9.63843 22.0545 10.0861 22.0545 10.6384L22.0545 20.009C22.0545 20.5613 21.6068 21.009 21.0545 21.009L14.017 21ZM4.98254 21L4.98254 18.009C4.98254 16.9381 5.85082 16.0698 6.92176 16.0698L8.91136 16.0698L6.92176 11.7674C6.46556 10.7813 7.18356 9.63843 8.27005 9.63843L12.0201 9.63843C12.5723 9.63843 13.0201 10.0861 13.0201 10.6384L13.0201 20.009C13.0201 20.5613 12.5723 21.009 12.0201 21.009L4.98254 21Z" /></svg>
            </div>

            <p className="text-xl font-medium italic leading-relaxed">
                "{review}"
            </p>

            <div className="mt-8 pt-6 border-t border-black/10 w-full">
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                    Verified Student
                </p>
                <div className="mt-2 flex justify-center opacity-80">
                    {renderStars(COLORS.darkGreen, "rgba(0,0,0,0.1)")}
                </div>
            </div>
        </div>

      </motion.div>
    </div>
  );
};

const StudentSuccessStories: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // State for responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Sample Data with Images
  const students: StudentCardProps[] = [
    {
      id: 1,
      name: "Priya Sharma",
      course: "Data Science Bootcamp",
      rating: 5,
      review: "The mentorship at Greens was life-changing. I transitioned from a non-tech background to a top-tier tech role smoothly.",
      placement: "Google",
      duration: "6 months",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" // 
    },
    {
      id: 2,
      name: "Arun Kumar",
      course: "Full Stack Dev",
      rating: 4,
      review: "The live projects gave me the real-world experience I needed. The placement support is genuinely exceptional.",
      placement: "Amazon",
      duration: "8 months",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" // 
    },
    {
      id: 3,
      name: "Sara Ali",
      course: "UI/UX Design",
      rating: 5,
      review: "I built a portfolio here that stood out. Practical skills over theory made all the difference in interviews.",
      placement: "Adobe",
      duration: "4 months",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" // 

    },
    {
      id: 4,
      name: "Rohan Patel",
      course: "Machine Learning",
      rating: 5,
      review: "Perfect balance between theory and practice. The capstone project helped me land my current role.",
      placement: "Microsoft",
      duration: "7 months",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" // 
    },
    {
      id: 5,
      name: "Neha Gupta",
      course: "Digital Marketing",
      rating: 5,
      review: "Step-by-step approach and industry connections helped me secure a position within 3 months.",
      placement: "Ogilvy",
      duration: "3 months",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" // 



    },
    {
      id: 6,
      name: "Vikram Singh",
      course: "Cloud Computing",
      rating: 4,
      review: "AWS certifications included were game-changers. Got multiple offers and chose IBM for growth.",
      placement: "IBM",
      duration: "5 months",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" // 



    },
  ];

  // Logic for Responsive Cards
  useEffect(() => {
    const handleResize = () => {
      // If screen width is less than 768px (Mobile), show 1 card. Else 3.
      const newItemsPerPage = window.innerWidth < 768 ? 1 : 3;
      setItemsPerPage(newItemsPerPage);
      // Reset index to prevent out of bounds when switching views
      setCurrentIndex(0);
    };

    // Initial calculation
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(students.length / itemsPerPage);

  // Auto-cycle logic
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages]);

  // Calculate visible items based on current itemsPerPage
  const visibleStudents = students.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  // Handle dot click
  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section 
      className="relative w-full py-24 px-6 md:px-20 overflow-hidden"
      style={{ backgroundColor: COLORS.darkGreen }} 
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full mb-16 text-left"
        >
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider" style={{ color: COLORS.gold }}>
            Student Success Stories
          </h2>
          <div className="w-24 h-1.5 mt-4 rounded-full opacity-80" style={{ backgroundColor: COLORS.gold }}></div>
        </motion.div>

        {/* Carousel Grid */}
        <div className="relative min-h-[480px]"> 
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div 
                    key={currentIndex}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    // Dynamic Grid: 1 col on mobile, 3 on larger screens
                    className={`grid gap-8 md:gap-10 absolute w-full ${
                        itemsPerPage === 1 ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'
                    }`}
                >
                    {visibleStudents.map((student) => (
                        <StudentFlipCard key={student.id} {...student} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 gap-3">
            {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentIndex 
                            ? "bg-[#B99A49] w-8" 
                            : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
        </div>

      </div>
    </section>
  );
};

export default StudentSuccessStories;