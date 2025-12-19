/* eslint-disable no-irregular-whitespace */
import React, { useState, useEffect } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Import navigation icons

// --- Color Palette Definitions ---
const darkGreen = '#01311F';
const gold = '#B99A49';
const cream = '#F0ECE3';

// --- 1. TypeScript Interface ---
interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
}

// --- 2. Sample Data ---
const dummyCourses: Course[] = [
  { 
    id: 1, 
    title: 'Machine Learning', 
    description: 'Learn foundational concepts and advanced techniques in a fast-paced environment. Suitable for intermediate learners looking to master the topic.',
    image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240702121645/Advances-in-Meta-Learning-Learning-to-Learn.webp',
    price: '$299',
    duration: '20 Hrs',
  },
  { 
    id: 2, 
    title: 'Devops', 
    description: 'A comprehensive study of theory and practical application. Includes hands-on projects and expert feedback to ensure mastery.',
    image: 'https://marvel-b1-cdn.bc0a.com/f00000000236551/news.cdn.dm.dynatrace.com/wp-content/uploads/2021/07/13429_ILL_DevOpsLoop.png',
    price: '$199',
    duration: '10 Wks',
  },
  { 
    id: 3, 
    title: 'Azure Devops', 
    description: 'Master the core principles of design and execution. This course is project-based, allowing you to build a professional portfolio.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqGYvUXeoKj66w1Npmyf5D_5mI5belwuDXCw&s',
    price: '$450',
    duration: '6 Mos',
  },
  { 
    id: 4, 
    title: 'Full Stack', 
    description: 'A deep dive into complex algorithms and data structures necessary for cutting-edge development and research careers.',
    image: 'https://www.upshottechnologies.in/images/course/full-stack-developer-training-course.jpg',
    price: '$350',
    duration: '4 Wks',
  },
  { 
    id: 5, 
    title: 'My Sql', 
    description: 'Focus on agile methodologies and team collaboration for managing large-scale software projects efficiently.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYbLGJKkF_fpUHjNYSEqh5t_uwf00i0q2LkQ&s',
    price: '$99',
    duration: '1 Wk',
  },
];

const CARD_COUNT = dummyCourses.length;
const swipeConfidenceThreshold = 10000;

// Helper function to calculate the "power" of the swipe
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// --- 3. Framer Motion Variants ---
const carouselVariants = (direction: number): Variants => ({
  enter: {
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute', 
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


// --- 4. Course Card Component ---
interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      className="rounded-3xl shadow-xl overflow-hidden cursor-pointer flex flex-col h-full"
      style={{ backgroundColor: cream }}
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
      <div className="p-5 flex-grow">
        <h3 
          className="text-xl font-bold mb-2"
          style={{ color: gold }}
        >
          {course.title}
        </h3>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: darkGreen }}>
          {course.description.substring(0, 100)}...
        </p>

        {/* Price & Duration Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-auto">
          <div className="flex space-x-3">
            <div 
              className="px-4 py-1 text-sm font-bold rounded-full"
              style={{ backgroundColor: gold, color: darkGreen }}
            >
              {course.price}
            </div>
            <div 
              className="px-4 py-1 text-sm font-bold rounded-full border-2"
              style={{ borderColor: gold, color: gold }}
            >
              {course.duration}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


// --- 5. Main Course Section Component ---
const CourseSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2); // Tablet: 2 cards
      } else {
        setVisibleCards(3); // Desktop: 3 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return CARD_COUNT - 1; 
      if (newIndex >= CARD_COUNT) return 0;
      return newIndex;
    });
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent, 
    info: { offset: { x: number; y: number; }; velocity: { x: number; y: number; }; }
  ) => {
    // Determine the strength of the swipe
    const swipe = swipePower(info.offset.x, info.velocity.x);

    // Only apply swipe when a single item or a small group is visible
    if (visibleCards < 3) {
      if (swipe < -swipeConfidenceThreshold) {
        // Swipe Left (Next Card)
        paginate(1);
      } else if (swipe > swipeConfidenceThreshold) {
        // Swipe Right (Previous Card)
        paginate(-1);
      }
      // If swipe strength is low, it snaps back due to dragConstraints
    }
  };


  const getVisibleCourses = () => {
    const indices = Array.from({ length: visibleCards }, (_, i) => 
      (currentIndex + i) % CARD_COUNT
    );
    return indices.map(index => dummyCourses[index]);
  };
  
  const visibleCourses = getVisibleCourses();
  const totalDots = CARD_COUNT;

  return (
    <div className="p-4 sm:p-10 font-sans pb-20" style={{ backgroundColor: darkGreen }}>
      
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

      {/* Carousel Container */}
      <div className="max-w-7xl mx-auto relative flex items-center justify-center">

        {/* Desktop Previous Button (Hidden on Mobile/Tablet) */}
        <motion.button
          onClick={() => paginate(-1)}
          className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg hidden lg:block"
          style={{ backgroundColor: gold, color: darkGreen }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronLeft className="w-6 h-6" />
        </motion.button>
        
        {/* Course Cards Container - Swipe Enabled */}
        <motion.div 
            className="relative overflow-hidden w-full min-h-[450px] px-0 sm:px-6"
            drag="x" // Enable dragging on the x-axis
            dragConstraints={{ left: 0, right: 0 }} // Constraints prevent the container from actually moving
            dragElastic={1} // Makes the drag visual elastic
            onDragEnd={handleDragEnd} // Handles the swipe logic
        > 
          
          {/* MOBILE NAVIGATION OVERLAY REMOVED TO HIDE BUTTONS */}

          <AnimatePresence initial={false} custom={direction} mode='popLayout'>
            <motion.div
              key={currentIndex}
              className={`grid gap-10 w-full ${
                  visibleCards === 1 ? 'grid-cols-1' : 
                  visibleCards === 2 ? 'grid-cols-2' : 
                  'grid-cols-3'
              }`}
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
        </motion.div>

        {/* Desktop Next Button (Hidden on Mobile/Tablet) */}
        <motion.button
          onClick={() => paginate(1)}
          className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg hidden lg:block"
          style={{ backgroundColor: gold, color: darkGreen }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronRight className="w-6 h-6" />
        </motion.button>

      </div>
      
      {/* Pagination Dots (Serve as the main navigation indicator on mobile now) */}
      <div className="flex justify-center mt-6 space-x-2"> 
        {Array.from({ length: totalDots }, (_, index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full cursor-pointer"
            onClick={() => { 
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
      <div className="flex justify-center mt-8 sm:mt-12">
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