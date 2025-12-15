/* eslint-disable no-irregular-whitespace */
// YouTubePlaylistSection.tsx (Single Full Code File)

import React, { useState } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
// Using FiMusic as a placeholder for the branding logo, but styled to look like custom text
import { FiArrowLeft, FiArrowRight, FiPlayCircle, FiMusic } from 'react-icons/fi'; 

// --- Color Palette Definitions ---
// Dark Green: #01311F (Background)
// Gold/Mustard: #B99A49 (Primary Accent)
// Cream/Off-White: #F0ECE3 (Text/Card Background)
const darkGreen = '#01311F';
const gold = '#B99A49';
const cream = '#F0ECE3';
const greyText = '#A0A0A0'; // For subtitle text like 'views'
const youtubeRed = '#FF0000';

// --- 1. TypeScript Interface (Unchanged) ---
interface VideoPlaylist {
  id: number;
  title: string;
  views: string;
  videoCount: string;
  thumbnail: string; // Placeholder for image URL
  duration: string; // e.g., '1:37:48'
  youtubeUrl: string; // URL to the actual YouTube video/playlist
}

// --- 2. Sample Data (Unchanged) ---
const dummyPlaylists: VideoPlaylist[] = [
  { 
    id: 1, 
    title: 'Mix - Gangster Music | Rockstar ft. 21 Savage (Remix)', 
    views: '26M views',
    videoCount: '20+ videos',
    thumbnail: 'https://images.unsplash.com/photo-1517409419106-21820689b09f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    duration: '1:37:48',
    youtubeUrl: 'https://www.youtube.com/watch?v=A8v58iPqJ54&list=RDA8v58iPqJ54',
  },
  { 
    id: 2, 
    title: 'Mix - Nicky Jam x J. Balvin - X (EQUIS) | Video Oficial | Prod. Afro...', 
    views: '3.6M views',
    videoCount: '20+ videos',
    thumbnail: 'https://images.unsplash.com/photo-1507850873132-75052994f796?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    duration: '2:17:29',
    youtubeUrl: 'https://www.youtube.com/watch?v=yYJ4hI_gK4c',
  },
  { 
    id: 3, 
    title: 'Mix - Daddy Yankee - Que Tire Pa\' Lante (Official Video Remix)', 
    views: '68M views',
    videoCount: '20+ videos',
    thumbnail: 'https://images.unsplash.com/photo-1544485040-96f79025ce93?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    duration: '1:27:39',
    youtubeUrl: 'https://www.youtube.com/watch?v=nC8-n_W2qP8',
  },
  { 
    id: 4, 
    title: 'Mix - Pitbull - Ne-Yo - Contigo ft. Lenier, El Cata, El Micha (Remix)', 
    views: '38M views',
    videoCount: '20+ videos',
    thumbnail: 'https://images.unsplash.com/photo-1521737478542-53b925b426e2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    duration: '1:55:00',
    youtubeUrl: 'https://www.youtube.com/watch?v=F_Ym2e3pL-U',
  },
];

const CARD_COUNT = dummyPlaylists.length;
const VISIBLE_CARDS = 4; // Display 4 cards in the main view

// --- Helper: Framer Motion Variants (Unchanged) ---
const carouselVariants = (direction: number): Variants => ({
  enter: {
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute', 
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: 'relative', 
  },
  exit: {
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
  },
});


// --- 4. Video Playlist Card Component (FIXED for thumbnail look) ---
interface PlaylistCardProps {
  playlist: VideoPlaylist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <motion.div
      // Card Styling: Cream background, rounded corners, soft shadow
      className="rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
      style={{ backgroundColor: cream }}
      
      // Framer Motion Hover Effects (Subtle lift)
      whileHover={{ y: -5, boxShadow: '0 15px 25px rgba(0, 0, 0, 0.15)' }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
    >
        {/* Wrapping the content in a link to open the video/playlist */}
        <a 
            href={playlist.youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col h-full"
        >
          {/* Image/Thumbnail Header */}
          <div className="relative w-full aspect-video overflow-hidden">
            <img 
              src={playlist.thumbnail} 
              alt={playlist.title} 
              className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
            />
            
            {/* Play Button Overlay (Center) */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 transition-opacity duration-300 hover:bg-opacity-20">
                <FiPlayCircle className="w-12 h-12" style={{ color: youtubeRed }} />
            </div>

            {/* Duration Overlay (Bottom Right) */}
            <div 
                className="absolute bottom-2 right-2 px-2 py-0.5 text-xs font-semibold rounded"
                style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: cream }}
            >
                {playlist.duration}
            </div>
            
            {/* --- Custom Branding/Logo Placeholder (Top Left) --- */}
            {/* Simulating the embedded branding/text like 'IND' or 'Rocket' from the reference image */}
            <div 
                className="absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded-sm shadow-md" 
                style={{ backgroundColor: darkGreen, color: gold }}
            >
                {/* Dynamically show a different placeholder based on ID for variation */}
                {playlist.id % 2 === 0 ? "IND" : "VIBE"}
            </div>
          </div>

          {/* Content Body (Unchanged) */}
          <div className="p-3 flex-grow">
            <h3 
              className="text-sm font-bold mb-1 leading-snug"
              style={{ color: darkGreen }}
            >
              {playlist.title}
            </h3>
            
            {/* Youtube/Metadata Source */}
            <div className="text-xs mt-2" style={{ color: greyText }}>
                <span className="font-semibold" style={{ color: darkGreen, opacity: 0.8 }}>YouTube</span>
            </div>
            
            {/* Views and Video Count */}
            <div className="flex space-x-2 text-xs" style={{ color: greyText }}>
              <span>{playlist.views}</span>
              <span>•</span>
              <span>{playlist.videoCount}</span>
            </div>
          </div>
        </a>
    </motion.div>
  );
};


// --- 5. Main YouTube Section Component (Unchanged) ---
const YouTubePlaylistSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + newDirection;
      
      if (newIndex < 0) {
        return CARD_COUNT - 1; 
      }
      if (newIndex >= CARD_COUNT) {
        return 0;
      }
      return newIndex;
    });
  };

  const getVisiblePlaylists = () => {
    const indices = Array.from({ length: VISIBLE_CARDS }, (_, i) => 
        (currentIndex + i) % CARD_COUNT
    );
    return indices.map(index => dummyPlaylists[index]);
  };
  
  const visiblePlaylists = getVisiblePlaylists();

  return (
    <div className="p-10 min-h-min font-sans" style={{ backgroundColor: darkGreen }}>
      
      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto flex justify-between items-center mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
       <motion.div
        className="max-w-7xl mx-auto"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 
          className="text-4xl sm:text-5xl font-light mb-12 text-center"
          style={{ color: cream }}
        >
          Youtube<span style={{ color: gold }}>.</span>Trending <span className="font-bold" style={{ color: gold }}>+</span> Videos
        </h2>
      </motion.div>
        
        {/* Header Arrows */}
        <div className="flex space-x-2">
            <motion.button
              onClick={() => paginate(-1)}
              className="p-2 rounded-full border"
              style={{ borderColor: greyText, color: cream, opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              <FiArrowLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => paginate(1)}
              className="p-2 rounded-full border"
              style={{ borderColor: greyText, color: cream, opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
        </div>
      </motion.div>

      {/* Carousel Container */}
      <div className="max-w-7xl mx-auto relative flex items-center justify-center">

        {/* Cards Container */}
        <div className="relative overflow-hidden w-full min-h-[350px]"> 
          <AnimatePresence initial={false} custom={direction}>
              {/* The actual sliding grid element */}
              <motion.div
                  key={currentIndex}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
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
                  {visiblePlaylists.map((playlist) => (
                      <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
              </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlaylistSection;