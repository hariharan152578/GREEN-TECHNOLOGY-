// CourseSection.tsx (Single Full Code File)

import React from 'react';
import { motion, type Variants } from 'framer-motion';

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

// --- 2. Sample Data (Using mock image URLs) ---
const dummyCourses: Course[] = [
  { 
    id: 1, 
    title: 'Melack Fetigues', 
    description: 'Learn foundational concepts and advanced techniques in a fast-paced environment. Suitable for intermediate learners looking to master the topic.',
    image: 'https://images.unsplash.com/photo-1542435503-921c580f40d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '$299',
    duration: '20 Hrs',
  },
  { 
    id: 2, 
    title: 'Deeechool Trickuls', 
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
];

// --- 3. Framer Motion Variants ---
// Container for staggered animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.2,
    },
  },
};

// Item variant for the individual card fade-in
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// --- 4. Course Card Component ---
interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      // Card Styling: Cream background, rounded corners, soft shadow
      className="rounded-3xl shadow-xl overflow-hidden cursor-pointer"
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
      <div className="p-5">
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
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
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


// --- 5. Main Course Section Component ---
const CourseSection: React.FC = () => {
  return (
    <div className="p-10 min-h-screen font-sans" style={{ backgroundColor: darkGreen }}>
      
      {/* Header (Styled like "Featured.listings + Type") */}
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 
          className="text-4xl sm:text-5xl font-light mb-12"
          style={{ color: cream }}
        >
          Featured<span style={{ color: gold }}>.</span>Courses <span className="font-bold" style={{ color: gold }}>+</span> Trending
        </h2>
      </motion.div>

      {/* Course Cards Container (Staggered animation) */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {dummyCourses.map((course) => (
          <motion.div key={course.id} variants={itemVariants}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Pagination Dots (Matching the Featured Listings Image) */}
       <div className="flex justify-center mt-16 space-x-2">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full cursor-pointer"
            style={{ 
              backgroundColor: index === 0 ? gold : cream, // First dot is gold, others are cream
              opacity: index === 0 ? 1 : 0.5,
            }}
            whileHover={{ scale: 1.4, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          />
        ))}
      </div>

    </div>
  );
};

export default CourseSection;