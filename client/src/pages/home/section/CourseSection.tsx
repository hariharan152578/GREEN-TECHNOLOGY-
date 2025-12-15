/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Import navigation icons

// --- Color Palette Definitions ---
// Dark Green: #01311F (Background)
// Gold/Mustard: #B99A49 (Primary Accent)
// Cream/Off-White: #F0ECE3 (Text/Card Background)
const darkGreen = '#01311F';
const gold = '#B99A49';
const cream = '#F0ECE3';

// --- 1. TypeScript Interface ---
interface Course {
  id: number;
  title: string;
  description: string;
  image: string; // Placeholder for image URL
  price: string;
  duration: string;
}

// --- 2. Sample Data (Increased data count for better carousel demonstration) ---
const dummyCourses: Course[] = [
  { 
    id: 1, 
    title: 'Melack Fetigues: Advanced', 
    description: 'Learn foundational concepts and advanced techniques in a fast-paced environment. Suitable for intermediate learners looking to master the topic.',
    image: 'https://images.unsplash.com/photo-1542435503-921c580f40d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '$299',
    duration: '20 Hrs',
  },
  { 
    id: 2, 
    title: 'Deeechool Trickuls: Core', 
    description: 'A comprehensive study of theory and practical application. Includes hands-on projects and expert feedback to ensure mastery.',
    image: 'https://images.unsplash.com/photo-1546410531-bb443916940d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '$199',
    duration: '10 Wks',
  },
  { 
    id: 3, 
    title: 'Key Boolgany Tlrnmart', 
    description: 'Master the core principles of design and execution. This course is project-based, allowing you to build a professional portfolio.',
    image: 'https://images.unsplash.com/photo-1533038590840-cd4e782079a0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '$450',
    duration: '6 Mos',
  },
  { 
    id: 4, 
    title: 'Tlrnmart Video Lecture', 
    description: 'A deep dive into complex algorithms and data structures necessary for cutting-edge development and research careers.',
    image: 'https://images.unsplash.com/photo-1510519143666-4f36e4f3f1e1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '$350',
    duration: '4 Wks',
  },
  { 
    id: 5, 
    title: 'Bonus Cheat Sheet', 
    description: 'Focus on agile methodologies and team collaboration for managing large-scale software projects efficiently.',
    image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e993f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '$99',
    duration: '1 Wk',
  },
];

const CARD_COUNT = dummyCourses.length;
const VISIBLE_CARDS = 3;

// --- 3. Framer Motion Variants (UPDATED for horizontal slide with glitch fix) ---
const carouselVariants = (direction: number): Variants => ({
  enter: {
    // On small screens (where the grid is 1 or 2 columns), we only slide by one card's width.
    // Using 100% here ensures the entire visible area slides out, regardless of how many columns are showing.
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute', 
    // Added width: '100%' to ensure the entering/exiting element spans the whole grid container width
    width: '100%',
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: 'relative', 
    width: '100%',
  },
  exit: {
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
  },
});


// --- 4. Course Card Component (REUSED) ---
interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      // Card Styling: Cream background, rounded corners, soft shadow
      className="rounded-3xl shadow-xl overflow-hidden cursor-pointer flex flex-col h-full" // Added h-full
      style={{ backgroundColor: cream }}
      
      // Framer Motion Hover Effects
      whileHover={{ scale: 1.03, boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Image Header */}
      <div className="h-40 w-full overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
        />
      </div>

      {/* Content Body */}
      <div className="p-5 flex-grow"> {/* Added flex-grow */}
        <h3 
          className="text-xl font-bold mb-2"
          style={{ color: gold }} // Gold for the main title
        >
          {course.title}
        </h3>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: darkGreen }}>
          {course.description.substring(0, 100)}...
        </p>

        {/* Price & Duration Footer (Pill styles) */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-auto"> {/* Added mt-auto to push to bottom */}
          <div className="flex space-x-3">
            {/* Price Pill */}
            <div 
              className="px-4 py-1 text-sm font-bold rounded-full"
              style={{ backgroundColor: gold, color: darkGreen }} // Gold background, Dark Green text
            >
              {course.price}
            </div>
            {/* Duration Pill */}
            <div 
              className="px-4 py-1 text-sm font-bold rounded-full border-2"
              style={{ borderColor: gold, color: gold }} // Gold border and text
            >
              {course.duration}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


// --- 5. Main Course Section Component (LOOPING CAROUSEL) ---
const CourseSection: React.FC = () => {
  // State to manage the starting index of the visible materials (0-indexed)
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to manage the direction of the animation for smooth transitions
  const [direction, setDirection] = useState(0);

  // --- Looping Logic ---
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + newDirection;
      
      // Loop back from the end to the start
      if (newIndex < 0) {
        return CARD_COUNT - 1; 
      }
      // Loop back from the start to the end
      if (newIndex >= CARD_COUNT) {
        return 0;
      }
      return newIndex;
    });
  };

  // Get the three cards currently visible, ensuring wrapping for the loop
  const getVisibleCourses = () => {
    // Generate indices: [currentIndex, currentIndex + 1, currentIndex + 2]
    // NOTE: This logic assumes 3 cards are visible. On small screens (1 or 2 columns), 
    // the carousel slides the *first* card of the visible group.
    const indices = Array.from({ length: VISIBLE_CARDS }, (_, i) => 
        (currentIndex + i) % CARD_COUNT
    );

    // Map indices to the actual course objects
    return indices.map(index => dummyCourses[index]);
  };
  
  const visibleCourses = getVisibleCourses();

  // Calculate total pages for the pagination dots
  const totalDots = CARD_COUNT;


  return (
    <div className="p-4 sm:p-10 min-h-screen font-sans" style={{ backgroundColor: darkGreen }}>
      
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 
          className="text-3xl sm:text-5xl font-light mb-8 sm:mb-12 text-center"
          style={{ color: cream }}
        >
          Featured<span style={{ color: gold }}>.</span>Courses <span className="font-bold" style={{ color: gold }}>+</span> Trending
        </h2>
      </motion.div>

      {/* Carousel Container (Outer wrapper for position relative and centering) */}
      {/* p-4 on container ensures space for buttons on large screen, removed from the main div above */}
      <div className="max-w-7xl mx-auto relative flex items-center justify-center">

        {/* --- Desktop Navigation Buttons (hidden below large screen) --- */}
        <motion.button
          onClick={() => paginate(-1)}
          // Adjusted positioning for true vertical centering and placed outside the max-width
          className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg hidden lg:block"
          style={{ backgroundColor: gold, color: darkGreen }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronLeft className="w-6 h-6" />
        </motion.button>
        
        {/* Course Cards Container (Inner wrapper to handle overflow and fixed height) */}
        <div className="relative overflow-hidden w-full min-h-[450px] px-0 sm:px-6"> 
          
            {/* --- Mobile Navigation Overlay (Visible on small screens, hidden on large screens) --- */}
            <div className="absolute inset-y-0 flex justify-between items-center w-full lg:hidden z-10">
                {/* Mobile Previous Button */}
                <motion.button
                    onClick={() => paginate(-1)}
                    className="p-2 ml-1 rounded-full shadow-md opacity-60 hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: gold, color: darkGreen }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FiChevronLeft className="w-5 h-5" />
                </motion.button>
                {/* Mobile Next Button */}
                <motion.button
                    onClick={() => paginate(1)}
                    className="p-2 mr-1 rounded-full shadow-md opacity-60 hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: gold, color: darkGreen }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FiChevronRight className="w-5 h-5" />
                </motion.button>
            </div>

          <AnimatePresence initial={false} custom={direction}>
              {/* The actual sliding grid element */}
              <motion.div
                  key={currentIndex}
                  // Grid is responsive: 1 col on mobile, 2 on sm, 3 on lg
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full"
                  custom={direction}
                  variants={carouselVariants(direction)}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                  }}
              >
                  {visibleCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                  ))}
              </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Desktop Navigation Buttons (hidden below large screen) --- */}
        <motion.button
          onClick={() => paginate(1)}
          // Adjusted positioning for true vertical centering and placed outside the max-width
          className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg hidden lg:block"
          style={{ backgroundColor: gold, color: darkGreen }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronRight className="w-6 h-6" />
        </motion.button>

      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 space-x-2"> 
        {Array.from({ length: totalDots }, (_, index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full cursor-pointer"
            // Allows direct jumping to any course card (will still transition smoothly)
            onClick={() => { 
                // Logic to determine the correct direction for smooth animation when jumping
                const diff = index - currentIndex;
                const direction = diff > 0 ? 1 : diff < 0 ? -1 : 0;
                if (direction !== 0) {
                    setDirection(direction);
                    setCurrentIndex(index);
                }
            }}
            style={{ 
              backgroundColor: index === currentIndex ? gold : cream,
              opacity: index === currentIndex ? 1 : 0.5,
            }}
            whileHover={{ scale: 1.4, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          />
        ))}
      </div>
        
        {/* Call to Action Button */}
      <div className="flex justify-center mt-12">
        <motion.button
          className="px-10 py-4 text-lg sm:text-xl font-bold rounded-full shadow-2xl text-center max-w-full"
          style={{ backgroundColor: gold, color: darkGreen }}
          whileHover={{ scale: 1.05, boxShadow: `0 15px 30px -5px ${gold}80` }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          View All Courses (50+ Programs)
        </motion.button>
      </div>

    </div>
  );
};

export default CourseSection;