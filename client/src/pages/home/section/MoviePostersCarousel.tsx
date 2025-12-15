// MoviePostersCarousel.tsx (Single Full Code File - Updated)

import React, { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';

// --- Color Palette Definitions ---
const darkGreen = '#01311F';
const gold = '#B99A49';
const cream = '#F0ECE3';
const darkGray = '#333333'; // For subtext

// --- 1. TypeScript Interface & Sample Data ---
interface MoviePoster {
  id: number;
  title: string;
  year: string; // e.g., (2008)
  subtitle: string; // e.g., "Official Trailer"
  poster: string; // URL for the movie poster
  author: string; // e.g., "Jack Orion"
  rating: string; // e.g., "802"
  uploadTime: string; // e.g., "8 months ago"
  duration: string; // e.g., "02:31"
}

const dummyMovies: MoviePoster[] = [
  { 
    id: 1, 
    title: 'The Dark Knight', 
    year: '(2008)',
    subtitle: 'Official Trailer',
    poster: 'https://images.unsplash.com/photo-1594770288863-71887e040c5e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Jack Orion',
    rating: '802',
    uploadTime: '8 months ago',
    duration: '02:31',
  },
  { 
    id: 2, 
    title: 'The Last Voyage of the Demeter', 
    year: '(2023)',
    subtitle: 'Official Trailer |...',
    poster: 'https://images.unsplash.com/photo-1621251016723-6cc355f3be4d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Jack Orion',
    rating: '408',
    uploadTime: '8 months ago',
    duration: '02:35',
  },
  { 
    id: 3, 
    title: 'COBWEB Trailer', 
    year: '(2023)',
    subtitle: 'Official Trailer |...',
    poster: 'https://images.unsplash.com/photo-1549490349-86433e1c6b35?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Jack Orion',
    rating: '221',
    uploadTime: '8 months ago',
    duration: '02:28',
  },
  { 
    id: 4, 
    title: 'Special Ops: Lioness', 
    year: '',
    subtitle: 'Official Trailer |',
    poster: 'https://images.unsplash.com/photo-1533038590840-cd4e782079a0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Jack Orion',
    rating: '35',
    uploadTime: '8 months ago',
    duration: '01:50',
  },
  { 
    id: 5, 
    title: 'THE PRESTIGE Trailer', 
    year: '(2006)',
    subtitle: 'Official Trailer',
    poster: 'https://images.unsplash.com/photo-1546410531-bb443916940d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Jack Orion',
    rating: '529',
    uploadTime: '10 months ago',
    duration: '02:43',
  },
  { 
    id: 6, 
    title: 'Money Heist | Series Trailer', 
    year: '',
    subtitle: 'Netflix',
    poster: 'https://images.unsplash.com/photo-1534880905634-97c36a287a2a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Jack Orion',
    rating: '299',
    uploadTime: '2 years ago',
    duration: '02:17',
  },
];


// --- 2. Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, 
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// --- 3. Movie Poster Card Component ---
interface MoviePosterCardProps {
  movie: MoviePoster;
}

const MoviePosterCard: React.FC<MoviePosterCardProps> = ({ movie }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-40 sm:w-48 cursor-pointer group"
      // Framer Motion Hover Effects
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Poster Image Container */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg border-2" 
           style={{ borderColor: gold }}>
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:opacity-90"
        />
        
        {/* Duration Badge (Bottom Right) */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold"
             style={{ backgroundColor: darkGreen, color: cream }}>
          {movie.duration}
        </div>
      </div>

      {/* Text Details */}
      <div className="mt-3">
        <p className="text-sm font-semibold leading-tight truncate" style={{ color: cream }}>
          {movie.title} {movie.year}
        </p>
        <p className="text-xs leading-tight mt-1 truncate" style={{ color: gold }}>
          {movie.subtitle}
        </p>
        <div className="flex text-xs mt-1" style={{ color: darkGray }}>
          <span className="mr-2" style={{ color: gold }}>{movie.rating}</span>
          <span>{movie.author}</span>
          <span className="mx-1">•</span>
          <span>{movie.uploadTime}</span>
        </div>
      </div>
    </motion.div>
  );
};


// --- 4. Main Carousel Component ---
const MoviePostersCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <div className="py-12 min-h-screen font-sans" style={{ backgroundColor: darkGreen }}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Section Title */}
        <motion.h1 
          className="text-3xl font-bold mb-8"
          style={{ color: cream }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Movies
        </motion.h1>

        {/* Draggable Carousel Container */}
        <motion.div 
          ref={carouselRef}
          className="w-full overflow-x-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Draggable Content Area */}
          <motion.div
            className="flex space-x-6 pb-6" // pb-6 for shadow/scrollbar
            drag="x"
            dragConstraints={carouselRef}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {dummyMovies.map((movie) => (
              <motion.div key={movie.id} variants={itemVariants}>
                <MoviePosterCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoviePostersCarousel;