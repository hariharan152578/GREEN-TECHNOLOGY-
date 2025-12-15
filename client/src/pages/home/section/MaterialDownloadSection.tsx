/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { FiDownload, FiEye, FiFileText, FiBookOpen, FiFilm, FiFolder, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// --- Color Palette Definitions ---
// Dark Green: #01311F (Background)
// Gold/Mustard: #B99A49 (Primary Accent)
// Cream/Off-White: #F0ECE3 (Text/Card Background)
const darkGreen = '#01311F';
const gold = '#B99A49';
const cream = '#F0ECE3';

// --- 1. TypeScript Interface ---
interface Material {
  id: number;
  fileName: string;
  description: string;
  fileType: 'PDF' | 'DOCX' | 'VIDEO' | 'PRESENTATION' | 'EBOOK';
  size: string;
  highlight: string; // New field for simple highlight tag
}

// --- 2. Sample Data (Increased data count to demonstrate looping) ---
const dummyMaterials: Material[] = [
  {
    id: 1,
    fileName: 'Advanced Melack Theory.pdf',
    description: 'Detailed lecture notes covering theoretical concepts and practical case studies for advanced learners.',
    fileType: 'PDF',
    size: '12.5 MB',
    highlight: 'Quick Start',
  },
  {
    id: 2,
    fileName: 'Deeechool Workbook.docx',
    description: 'Interactive exercise sheets and quizzes to reinforce understanding of the Deeechool Trickuls module.',
    fileType: 'DOCX',
    size: '500 KB',
    highlight: 'Module 2',
  },
  {
    id: 3,
    fileName: 'Key Boolgany Project.pptx',
    description: 'Template and guidelines for the final design project, including presentation structure.',
    fileType: 'PRESENTATION',
    size: '8.1 MB',
    highlight: 'Template',
  },
  {
    id: 4,
    fileName: 'Tlrnmart Video Lecture.mp4',
    description: 'High-definition recording of the core Tlrnmart principles, explained by the course instructor.',
    fileType: 'VIDEO',
    size: '350 MB',
    highlight: 'Lecture',
  },
  {
    id: 5,
    fileName: 'Bonus Cheat Sheet.pdf',
    description: 'A quick reference guide compiling all key formulas and definitions in one printable document.',
    fileType: 'PDF',
    size: '2 MB',
    highlight: 'New',
  },
  {
    id: 6,
    fileName: 'Capstone Report Guide.docx',
    description: 'Essential formatting and content guidelines for the final capstone submission.',
    fileType: 'DOCX',
    size: '1.1 MB',
    highlight: 'Final',
  },
];

const CARD_COUNT = dummyMaterials.length;
const VISIBLE_CARDS = 3;

// --- Helper function to get an icon based on file type ---
const getFileIcon = (fileType: Material['fileType']) => {
  switch (fileType) {
    case 'PDF':
      return <FiFileText className="w-7 h-7" />;
    case 'DOCX':
      return <FiBookOpen className="w-7 h-7" />;
    case 'VIDEO':
      return <FiFilm className="w-7 h-7" />;
    case 'PRESENTATION':
      return <FiFolder className="w-7 h-7" />;
    case 'EBOOK':
      return <FiBookOpen className="w-7 h-7" />;
    default:
      return <FiFileText className="w-7 h-7" />;
  }
};

// --- 3. Framer Motion Variants (FIXED GLITCH LOGIC) ---
const carouselVariants = (direction: number): Variants => ({
  enter: {
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    // Crucial for the fix: Start outside and keep absolute for the transition
    position: 'absolute', 
    width: '100%',
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    // Crucial for the fix: Use relative position when centered, so it takes up space
    position: 'relative', 
    width: '100%',
  },
  exit: {
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    // Crucial for the fix: Exit as absolute so it doesn't affect flow
    position: 'absolute',
    width: '100%',
  },
});


// --- 4. Material Card Component (REUSED) ---
interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {

  const handlePreview = () => {
    alert(`Previewing: ${material.fileName}`);
  };

  const handleDownload = () => {
    alert(`Downloading: ${material.fileName}`);
  };

  return (
    <motion.div
      className="relative rounded-3xl shadow-xl overflow-hidden cursor-pointer flex flex-col h-full"
      style={{ backgroundColor: cream, borderTop: `6px solid ${gold}` }} // Top accent border
      whileHover={{ 
        y: -8, 
        boxShadow: `0 25px 50px rgba(0, 0, 0, 0.3)`,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    >
      
      {/* Content and Header */}
      <div className="p-6 flex-grow">
        
        {/* File Icon and Highlight Tag */}
        <div className="flex justify-between items-start mb-4">
          {/* Icon Badge with Gradient */}
          <div 
            className="p-3 rounded-xl shadow-md"
            style={{ background: `linear-gradient(45deg, ${gold}, ${darkGreen})`, color: cream }}
          >
            {getFileIcon(material.fileType)}
          </div>

          {/* Highlight Tag */}
          <span 
            className="text-xs font-bold px-3 py-1 rounded-full uppercase"
            style={{ backgroundColor: darkGreen, color: gold }}
          >
            {material.highlight}
          </span>
        </div>

        {/* File Name */}
        <h3 
          className="text-xl sm:text-2xl font-extrabold mb-2 leading-snug"
          style={{ color: darkGreen }}
        >
          {material.fileName}
        </h3>
        
        {/* Description */}
        <p className="text-sm sm:text-base mb-4 leading-relaxed h-16 overflow-hidden" style={{ color: darkGreen, opacity: 0.7 }}>
          {material.description}
        </p>

        {/* Metadata Block */}
        <div className="flex space-x-4 pt-3 border-t border-gray-300">
          <div className="text-sm font-semibold" style={{ color: gold }}>{material.fileType}</div>
          <div className="text-sm font-semibold" style={{ color: darkGreen, opacity: 0.8 }}>{material.size}</div>
        </div>
      </div>

      {/* Action Buttons Footer (Full-width Download) */}
      <div className="p-6 pt-0">
        
        <motion.button
          onClick={handleDownload}
          className="w-full flex items-center justify-center space-x-3 px-6 py-3 text-base sm:text-lg font-bold rounded-xl shadow-lg transition-colors"
          style={{ backgroundColor: gold, color: darkGreen }}
          whileHover={{ scale: 1.02, backgroundColor: darkGreen, color: cream }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <FiDownload className="w-5 h-5" />
          <span>Download File</span>
        </motion.button>
        
        {/* Secondary Preview Link/Button */}
        <motion.button
          onClick={handlePreview}
          className="w-full mt-3 text-sm font-semibold"
          style={{ color: darkGreen, opacity: 0.8 }}
          whileHover={{ color: gold, opacity: 1 }}
        >
          <FiEye className="inline mr-1" /> Quick Preview
        </motion.button>
      </div>
    </motion.div>
  );
};


// --- 5. Main Material Download Section Component (LOOPING CAROUSEL) ---
const MaterialDownloadSection: React.FC = () => {
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
  const getVisibleMaterials = () => {
    // Generate indices: [currentIndex, currentIndex + 1, currentIndex + 2]
    const indices = Array.from({ length: VISIBLE_CARDS }, (_, i) => 
        (currentIndex + i) % CARD_COUNT
    );

    // Map indices to the actual material objects
    return indices.map(index => dummyMaterials[index]);
  };
  
  const visibleMaterials = getVisibleMaterials();

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
          className="text-4xl sm:text-5xl font-light mb-8 sm:mb-12 text-center"
          style={{ color: cream }}
        >
          Resource<span style={{ color: gold }}>.</span>Library <span className="font-bold" style={{ color: gold }}>+</span> Trending
        </h2>
      </motion.div>

      {/* Carousel Container (Outer wrapper for position relative and centering) */}
      {/* Added p-4 padding on mobile to prevent cards from touching screen edges */}
      <div className="max-w-7xl mx-auto relative flex items-center justify-center px-4 sm:px-0">
        
        {/* --- Desktop Navigation: Previous Button (Hidden on small screens) --- */}
        <motion.button
          onClick={() => paginate(-1)}
          // Placed far outside content container on left
          className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg hidden lg:block"
          style={{ backgroundColor: gold, color: darkGreen }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronLeft className="w-6 h-6" />
        </motion.button>
        
        {/* Material Cards Container (Inner wrapper to handle overflow and fixed height) */}
        <div className="relative overflow-hidden w-full min-h-[500px]"> 
            
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
                  key={currentIndex} // Key change: forces re-render and exit/enter animation
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
                  {visibleMaterials.map((material) => (
                      <MaterialCard key={material.id} material={material} />
                  ))}
              </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Desktop Navigation: Next Button (Hidden on small screens) --- */}
        <motion.button
          onClick={() => paginate(1)}
          // Placed far outside content container on right
          className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg hidden lg:block"
          style={{ backgroundColor: gold, color: darkGreen }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronRight className="w-6 h-6" />
        </motion.button>

      </div>
      
      {/* Pagination Dots (Removed unnecessary negative margin) */}
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
      <div className="flex justify-center mt-8">
        <motion.button
          className="px-10 py-4 text-lg sm:text-xl font-bold rounded-full shadow-2xl"
          style={{ backgroundColor: gold, color: darkGreen }}
          whileHover={{ scale: 1.05, boxShadow: `0 15px 30px -5px ${gold}80` }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Explore Full Resource Library (100+ Files)
        </motion.button>
      </div>

    </div>
  );
};

export default MaterialDownloadSection;