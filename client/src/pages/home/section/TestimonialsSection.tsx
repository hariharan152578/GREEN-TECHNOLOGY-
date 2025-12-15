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
 * This is crucial to prevent "refused to connect" errors in iframes.
 * @param url The raw video URL.
 * @returns The standardized embed URL or the original URL if not YouTube.
 */
const getEmbedSource = (url: string) => {
    // Regex to capture the video ID from standard URLs, short links, or Shorts URLs
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

// REMOVED: 'getVideoType' function (TS6133) was unused in the current component logic.

// --- Dummy Testimonial Data ---
const testimonials = [
  {
    id: 1,
    name: "Rahul Verma",
    batch: "AWS Batch '23",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "From a fresher to a Cloud Engineer in 6 months!",
    videoUrl: "https://youtube.com/shorts/BwYEU0BmH-A?si=vicVUbUTiBnBuNTG", 
  },
  {
    id: 2,
    name: "Sneha Gupta",
    batch: "DevOps Batch '22",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "The live projects were a game-changer for my career.",
    videoUrl: "https://youtu.be/5F_T23-l0L8",
  },
  {
    id: 3,
    name: "Arjun Singh",
    batch: "Solutions Architect '23",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Mentorship helped me crack my dream job interview.",
    videoUrl: "https://www.youtube.com/watch?v=u_FvFf32wzI",
  },
  {
    id: 4,
    name: "Priya Sharma",
    batch: "Cloud Practitioner '24",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Best decision to switch my career to Cloud Computing.",
    videoUrl: "https://www.youtube.com/shorts/pUu1Y3p2M1E",
  },
  {
    id: 5,
    name: "Karthik Nair",
    batch: "AWS Batch '22",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "The structured curriculum made learning AWS easy.",
    videoUrl: "https://youtu.be/5F_T23-l0L8",
  },
];


const TestimonialsSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedTestimonial = testimonials.find(t => t.id === selectedId);

  // --- Carousel Logic for Infinite Loop (Slide 1 item at a time) ---
  const numItems = testimonials.length; // 5 items
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    // Infinite loop: (0 + 1) % 5 = 1, (4 + 1) % 5 = 0
    setCurrentIndex(prev => (prev + 1) % numItems); 
  };

  const handlePrev = () => {
    // Infinite loop: (0 - 1 + 5) % 5 = 4
    setCurrentIndex(prev => (prev - 1 + numItems) % numItems);
  };

  // --- Modal Sizing Logic (Kept Dynamic for correct video playback) ---
  
  // Determines the aspect ratio class for the modal (9/16 for Shorts, 16/9 otherwise)
  const getModalAspectRatio = () => {
    if (!selectedTestimonial) return 'aspect-video'; 
    
    const url = selectedTestimonial.videoUrl;

    // Check for vertical video links (Shorts or simple youtu.be links often point to vertical content)
    if (url.includes("/shorts/") || url.includes("youtu.be/")) {
      return 'aspect-[9/16]'; 
    }
    // Otherwise, assume standard landscape video (16/9)
    return 'aspect-video'; 
  };

  // Determines the maximum width for the modal (narrower for 9:16, wider for 16:9)
  const getModalMaxWidth = () => {
    if (!selectedTestimonial) return 'max-w-lg';
    const url = selectedTestimonial.videoUrl;

    // Portrait videos (Shorts/Reels) should be narrower
    if (url.includes("/shorts/") || url.includes("youtu.be/")) {
      return 'max-w-xs md:max-w-sm'; 
    }
    // Landscape videos can be wider
    return 'max-w-lg md:max-w-3xl'; 
  };

  return (
    // The section background color has been changed to the user's provided COLORS.cream
    <section className="relative w-full py-24 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
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
                  // Header color changed to user's provided COLORS.darkGreen
                  style={{ color: COLORS.darkGreen }} 
                >
                  Resource<span style={{ color: COLORS.gold }}>.</span>Library <span className="font-bold" style={{ color: COLORS.gold }}>+</span> Trending
                </h2>
              </motion.div>
        </div>

        {/* --- Video Carousel Container (Refactored from Grid) --- */}
        <div className="relative overflow-hidden">
          {/* Carousel Track: 
            - w-[500%] (1 item visible, 5/1 * 100%) for small screens.
            - md:w-[250%] (2 items visible, 5/2 * 100%) for medium screens.
            - lg:w-[167%] (3 items visible, 5/3 * 100%) for large screens.
            - positionTransition={false} is removed to fix the TS2322 error.
          */}
          <motion.div
            className="flex w-[500%] md:w-[250%] lg:w-[167%]" 
            animate={{ x: `-${currentIndex * (100 / numItems)}%` }} 
            transition={{ type: "tween", duration: 0.5 }}
            // positionTransition={false} <-- REMOVED: Fixes TS2322 error
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                layoutId={`card-container-${testimonial.id}`}
                onClick={() => setSelectedId(testimonial.id)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                // Item sizing: w-1/5 means each card is 20% of the track.
                className="flex-shrink-0 w-1/5 p-3" 
              >
                {/* Inner Card */}
                {/* Aspect ratio changed from aspect-[9/16] to aspect-[3/4] for smaller thumbnail size */}
                <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-xl group`}>
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
            className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full ml-2 z-10 hover:bg-black/70 transition-colors"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full mr-2 z-10 hover:bg-black/70 transition-colors"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>


        {/* --- Video Modal --- */}
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

export default TestimonialsSection;