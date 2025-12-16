/* eslint-disable no-irregular-whitespace */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

// --- Helper Functions ---

/**
 * Converts various YouTube URL formats (watch, short, share) into the correct iframe embed URL.
 * @param url The raw video URL.
 * @returns The standardized embed URL or the original URL if not YouTube.
 */
const getEmbedSource = (url: string) => {
    // Regex to reliably extract the video ID from standard, short, or Shorts URLs
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|v\/|embed\/|shorts\/))([^&\n?#]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
        const videoId = match[1];
        // Returns the correct embed URL with autoplay
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    // Return original for non-YouTube links
    return url;
};

/**
 * Determines the Tailwind class for the aspect ratio of the thumbnail card based on the URL.
 * @returns The appropriate Tailwind aspect ratio class (always 16:9).
 */
const getCardAspectRatio = () => {
    // FORCE all thumbnails to Horizontal (Landscape: 16/9)
    return 'aspect-video';
};


// --- Dummy Testimonial Data ---
const test = [
  {
    id: 1,
    name: "Rahul Verma",
    batch: "AWS Batch '23",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "From a fresher to a Cloud Engineer in 6 months!",
    // Vertical Short Link
    videoUrl: "https://youtube.com/shorts/BwYEU0BmH-A?si=vicVUbUTiBnBuNTG", 
  },
  {
    id: 2,
    name: "Sneha Gupta",
    batch: "DevOps Batch '22",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "The live projects were a game-changer for my career.",
    // Vertical Short Link (This is a standard shortened URL, but the video content dictates the ratio)
    videoUrl: "https://youtu.be/5F_T23-l0L8",
  },
  {
    id: 3,
    name: "Arjun Singh",
    batch: "Solutions Architect '23",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Mentorship helped me crack my dream job interview.",
    // Standard Horizontal Video Link
    videoUrl: "https://www.youtube.com/watch?v=u_FvFf32wzI",
  },
  {
    id: 4,
    name: "Priya Sharma",
    batch: "Cloud Practitioner '24",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Best decision to switch my career to Cloud Computing.",
    // Vertical Shorts Link
    videoUrl: "https://www.youtube.com/shorts/pUu1Y3p2M1E",
  },
  {
    id: 5,
    name: "Karthik Nair",
    batch: "AWS Batch '22",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "The structured curriculum made learning AWS easy.",
    // Vertical Short Link
    videoUrl: "https://youtu.be/5F_T23-l0L8",
  },
];


const YoutubeSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedTestimonial = test.find(t => t.id === selectedId);

  // --- Carousel Logic (Refactored for Single-Item Infinite Slide) ---
  const numItems = test.length; // 5 items
  // currentIndex tracks the index of the first item to display (0 to 4)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculates the next index with an infinite loop wrap-around
  const handleNext = () => {
    // (0 + 1) % 5 = 1, (4 + 1) % 5 = 0
    setCurrentIndex(prev => (prev + 1) % numItems); 
  };

  // Calculates the previous index with an infinite loop wrap-around
  const handlePrev = () => {
    // (0 - 1 + 5) % 5 = 4
    setCurrentIndex(prev => (prev - 1 + numItems) % numItems);
  };


  // --- Modal Sizing Logic (Kept Dynamic for correct video playback) ---
  
  // Determines the aspect ratio class for the modal (9/16 for Shorts, 16/9 otherwise)
  const getModalAspectRatio = () => {
    if (!selectedTestimonial) return 'aspect-video'; 
    
    const url = selectedTestimonial.videoUrl;

    // Only treat it as vertical (9/16) if it explicitly contains the '/shorts/' path.
    if (url.includes("/shorts/")) {
      return 'aspect-[9/16]'; 
    }
    // Otherwise, assume standard landscape video (16/9)
    return 'aspect-video'; 
  };

  // Determines the maximum width for the modal (narrower for 9:16, wider for 16:9)
  const getModalMaxWidth = () => {
    if (!selectedTestimonial) return 'max-w-lg';
    const url = selectedTestimonial.videoUrl;

    // Portrait videos (Shorts) should be narrower
    if (url.includes("/shorts/")) {
      return 'max-w-xs md:max-w-sm'; 
    }
    // Landscape videos can be wider
    return 'max-w-lg md:max-w-3xl'; 
  };

  return (
    <section className="relative w-full py-24 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: COLORS.darkGreen }}>
      <div className="max-w-7xl mx-auto">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-16">
        <motion.div
                className="max-w-7xl mx-auto"
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 
                  className="text-4xl sm:text-5xl font-light mb-12 text-center"
                  style={{ color: COLORS.cream }}
                >
                  Resource<span style={{ color: COLORS.gold }}>.</span>Library <span className="font-bold" style={{ color: COLORS.gold }}>+</span> Trending
                </h2>
              </motion.div>
        </div>

        {/* --- Video Carousel Container --- */}
        {/* Ensure container hides overflowing cards */}
        <div className="relative overflow-hidden">
          {/* Carousel Track */}
          <motion.div
            // Responsive Track Width: 5 cards * (100%, 50%, 33.333%) of viewport width
            className="flex w-[500%] sm:w-[250%] lg:w-[166.666667%]"
            // Calculate translation: shift by 20% (1/5th) of the total track width per card
            animate={{ x: `-${currentIndex * (100 / numItems)}%` }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {test.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                layoutId={`card-container-${testimonial.id}`}
                onClick={() => setSelectedId(testimonial.id)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                // Item sizing: w-full (mobile), w-1/2 (tablet), w-1/3 (desktop)
                className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-3`}
              >
                {/* Inner Card */}
                <div className={`relative ${getCardAspectRatio()} rounded-2xl overflow-hidden cursor-pointer shadow-xl group h-full`}>
                  {/* Background Image (Thumbnail) */}
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill={COLORS.gold} stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="absolute bottom-0 left-0 w-full p-4 text-left">
                    <h3 className="text-lg font-bold text-white mb-1">{testimonial.name}</h3>
                    <p className="text-xs font-medium mb-2" style={{ color: COLORS.gold }}>{testimonial.batch}</p>
                    <p className="text-sm text-white/90 line-clamp-2">"{testimonial.quote}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-white/10 text-white rounded-full ml-2 z-10 hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-white/10 text-white rounded-full mr-2 z-10 hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>


        {/* --- Video Modal (Using dynamic sizing logic) --- */}
        <AnimatePresence>
          {selectedId && selectedTestimonial && (
            <motion.div 
              layoutId={`card-container-${selectedId}`}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            >
              <motion.div 
                // Dynamic class calculation for responsive sizing
                className={`relative w-full ${getModalMaxWidth()} bg-black rounded-2xl overflow-hidden shadow-2xl ${getModalAspectRatio()}`}
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* Iframe Video Player - Uses getEmbedSource for fix */}
                <div className="w-full h-full">
                  <iframe 
                    key={selectedTestimonial.id}
                    src={getEmbedSource(selectedTestimonial.videoUrl)} 
                    title={`${selectedTestimonial.name}'s testimonial`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default YoutubeSection;