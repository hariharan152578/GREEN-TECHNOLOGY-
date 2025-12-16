// /* eslint-disable no-irregular-whitespace */
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Configuration ---
// const COLORS = {
//   darkGreen: "#01311F",
//   gold: "#B99A49",
//   cream: "#F0ECE3",
//   white: "#FFFFFF",
// };

// // --- Helper Functions ---

// const getEmbedSource = (url: string) => {
//   const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|v\/|embed\/|shorts\/))([^&\n?#]+)/;
//   const match = url.match(regex);

//   if (match && match[1]) {
//     const videoId = match[1];
//     return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
//   }
//   return url;
// };

// const getCardAspectRatio = () => {
//   return 'aspect-video';
// };

// // --- Dummy Testimonial Data ---
// const test = [
//   {
//     id: 1,
//     name: "Rahul Verma",
//     batch: "AWS Batch '23",
//     image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
//     quote: "From a fresher to a Cloud Engineer in 6 months!",
//     videoUrl: "https://youtube.com/shorts/BwYEU0BmH-A?si=vicVUbUTiBnBuNTG", 
//   },
//   {
//     id: 2,
//     name: "Sneha Gupta",
//     batch: "DevOps Batch '22",
//     image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
//     quote: "The live projects were a game-changer for my career.",
//     videoUrl: "https://youtu.be/5F_T23-l0L8",
//   },
//   {
//     id: 3,
//     name: "Arjun Singh",
//     batch: "Solutions Architect '23",
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
//     quote: "Mentorship helped me crack my dream job interview.",
//     videoUrl: "https://www.youtube.com/watch?v=u_FvFf32wzI",
//   },
//   {
//     id: 4,
//     name: "Priya Sharma",
//     batch: "Cloud Practitioner '24",
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
//     quote: "Best decision to switch my career to Cloud Computing.",
//     videoUrl: "https://www.youtube.com/shorts/pUu1Y3p2M1E",
//   },
//   {
//     id: 5,
//     name: "Karthik Nair",
//     batch: "AWS Batch '22",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
//     quote: "The structured curriculum made learning AWS easy.",
//     videoUrl: "https://youtu.be/5F_T23-l0L8",
//   },
// ];

// const YoutubeSection: React.FC = () => {
//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const selectedTestimonial = test.find(t => t.id === selectedId);

//   const numItems = test.length; 
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex(prev => (prev + 1) % numItems); 
//   };

//   const handlePrev = () => {
//     setCurrentIndex(prev => (prev - 1 + numItems) % numItems);
//   };

//   const getModalAspectRatio = () => {
//     if (!selectedTestimonial) return 'aspect-video'; 
//     const url = selectedTestimonial.videoUrl;
//     if (url.includes("/shorts/")) {
//       return 'aspect-[9/16]'; 
//     }
//     return 'aspect-video'; 
//   };

//   const getModalMaxWidth = () => {
//     if (!selectedTestimonial) return 'max-w-lg';
//     const url = selectedTestimonial.videoUrl;
//     if (url.includes("/shorts/")) {
//       return 'max-w-xs md:max-w-sm'; 
//     }
//     return 'max-w-lg md:max-w-3xl'; 
//   };

//   return (
//     <section className="relative w-full py-24 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: COLORS.darkGreen }}>
//       <div className="max-w-7xl mx-auto">
        
//         {/* --- Section Header --- */}
//         <div className="text-center mb-16">
//           <motion.div
//             className="max-w-7xl mx-auto"
//             initial={{ y: -30, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 
//               className="text-4xl sm:text-5xl font-light mb-12 text-center"
//               style={{ color: COLORS.cream }}
//             >
//               Resource<span style={{ color: COLORS.gold }}>.</span>Library <span className="font-bold" style={{ color: COLORS.gold }}>+</span> Trending
//             </h2>
//           </motion.div>
//         </div>

//         {/* --- Video Carousel Container --- */}
//         <div className="relative overflow-hidden">
          
//           <motion.div
//             // Updated Widths for Responsiveness:
//             // Mobile (default): 500% width (allows 1 card visible)
//             // Tablet (md): 250% width (allows 2 cards visible)
//             // Desktop (lg): 166.666% width (allows 3 cards visible)
//             className="flex w-[500%] md:w-[250%] lg:w-[166.666667%]"
//             animate={{ x: `-${currentIndex * (100 / numItems)}%` }}
//             transition={{ type: "tween", duration: 0.5 }}
//           >
//             {test.map((testimonial, index) => (
//               <motion.div
//                 key={testimonial.id}
//                 layoutId={`card-container-${testimonial.id}`}
//                 onClick={() => setSelectedId(testimonial.id)}
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//                 whileHover={{ scale: 1.05 }}
//                 // Item is ALWAYS 20% (1/5th) of the container width
//                 className="flex-shrink-0 w-[20%] p-3" 
//               >
//                 {/* Inner Card */}
//                 <div className={`relative ${getCardAspectRatio()} rounded-2xl overflow-hidden cursor-pointer shadow-xl group h-full`}>
//                   <img 
//                     src={testimonial.image} 
//                     alt={testimonial.name} 
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
                  
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all">
//                       <svg width="24" height="24" viewBox="0 0 24 24" fill={COLORS.gold} stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
//                     </div>
//                   </div>

//                   <div className="absolute bottom-0 left-0 w-full p-4 text-left">
//                     <h3 className="text-lg font-bold text-white mb-1">{testimonial.name}</h3>
//                     <p className="text-xs font-medium mb-2" style={{ color: COLORS.gold }}>{testimonial.batch}</p>
//                     <p className="text-sm text-white/90 line-clamp-2">"{testimonial.quote}"</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Navigation Buttons */}
//           <button
//             onClick={handlePrev}
//             className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-white/10 text-white rounded-full ml-2 z-10 hover:bg-white/30 transition-colors"
//             aria-label="Previous slide"
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
//           </button>
//           <button
//             onClick={handleNext}
//             className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-white/10 text-white rounded-full mr-2 z-10 hover:bg-white/30 transition-colors"
//             aria-label="Next slide"
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
//           </button>
//         </div>

//         {/* --- Video Modal --- */}
//         <AnimatePresence>
//           {selectedId && selectedTestimonial && (
//             <motion.div 
//               layoutId={`card-container-${selectedId}`}
//               className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
//               onClick={() => setSelectedId(null)}
//             >
//               <motion.div 
//                 className={`relative w-full ${getModalMaxWidth()} bg-black rounded-2xl overflow-hidden shadow-2xl ${getModalAspectRatio()}`}
//                 onClick={(e) => e.stopPropagation()} 
//               >
//                 <button 
//                   onClick={() => setSelectedId(null)}
//                   className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
//                 >
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
//                 </button>

//                 <div className="w-full h-full">
//                   <iframe 
//                     key={selectedTestimonial.id}
//                     src={getEmbedSource(selectedTestimonial.videoUrl)} 
//                     title={`${selectedTestimonial.name}'s testimonial`}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                     allowFullScreen
//                     className="w-full h-full"
//                   ></iframe>
//                 </div>
                
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//       </div>
//     </section>
//   );
// };

// export default YoutubeSection;

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

// --- Swipe Constants and Helper ---
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// --- Helper Functions ---

const getEmbedSource = (url: string) => {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|v\/|embed\/|shorts\/))([^&\n?#]+)/;
  const match = url.match(regex);

  if (match && match[1]) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }
  return url;
};

const getCardAspectRatio = () => {
  return 'aspect-video';
};

// --- Dummy Testimonial Data ---
const test = [
  {
    id: 1,
    name: "Rahul Verma",
    batch: "AWS Batch '23",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    quote: "From a fresher to a Cloud Engineer in 6 months!",
    videoUrl: "https://youtube.com/shorts/BwYEU0BmH-A?si=vicVUbUTiBnBuNTG", 
  },
  {
    id: 2,
    name: "Sneha Gupta",
    batch: "DevOps Batch '22",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    quote: "The live projects were a game-changer for my career.",
    videoUrl: "https://youtu.be/5F_T23-l0L8",
  },
  {
    id: 3,
    name: "Arjun Singh",
    batch: "Solutions Architect '23",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    quote: "Mentorship helped me crack my dream job interview.",
    videoUrl: "https://www.youtube.com/watch?v=u_FvFf32wzI",
  },
  {
    id: 4,
    name: "Priya Sharma",
    batch: "Cloud Practitioner '24",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    quote: "Best decision to switch my career to Cloud Computing.",
    videoUrl: "https://www.youtube.com/shorts/pUu1Y3p2M1E",
  },
  {
    id: 5,
    name: "Karthik Nair",
    batch: "AWS Batch '22",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    quote: "The structured curriculum made learning AWS easy.",
    videoUrl: "https://youtu.be/5F_T23-l0L8",
  },
];

const YoutubeSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedTestimonial = test.find(t => t.id === selectedId);

  const numItems = test.length; 
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    // Increments and wraps around to 0
    setCurrentIndex(prev => (prev + 1) % numItems); 
  };

  const handlePrev = () => {
    // Decrements and wraps around to the last index (numItems - 1)
    setCurrentIndex(prev => (prev - 1 + numItems) % numItems);
  };

  // --- Drag/Swipe Logic ---
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number; }; velocity: { x: number; y: number; }; }
  ) => {
    // Calculate swipe power based on distance and velocity
    const swipe = swipePower(info.offset.x, info.velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      // Swipe Left (Next)
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      // Swipe Right (Previous)
      handlePrev();
    }
    // If swipe is not strong enough, Framer Motion will snap back automatically.
  };

  const getModalAspectRatio = () => {
    if (!selectedTestimonial) return 'aspect-video'; 
    const url = selectedTestimonial.videoUrl;
    // Check for YouTube Shorts or short-form youtu.be links
    if (url.includes("/shorts/") || url.includes("youtu.be/") && url.length < 30) {
      return 'aspect-[9/16]'; 
    }
    return 'aspect-video'; 
  };

  const getModalMaxWidth = () => {
    if (!selectedTestimonial) return 'max-w-lg';
    const url = selectedTestimonial.videoUrl;
    // Check for YouTube Shorts or short-form youtu.be links
    if (url.includes("/shorts/") || url.includes("youtu.be/") && url.length < 30) {
      return 'max-w-xs md:max-w-sm'; 
    }
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

        {/* --- Video Carousel Container (Swipe Enabled) --- */}
        <div className="relative overflow-hidden">
          
          <motion.div
              // Enable drag for horizontal swiping
              drag="x"
              // Prevents the element from being dragged off-screen
              dragConstraints={{ left: 0, right: 0 }}
              // Controls how far the element can be dragged before snapping back
              dragElastic={0.5} 
              onDragEnd={handleDragEnd}
            // Updated Widths for Responsiveness:
            className="flex w-[500%] md:w-[250%] lg:w-[166.666667%]"
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
                // Item is ALWAYS 20% (1/5th) of the container width
                className="flex-shrink-0 w-[20%] p-3" 
              >
                {/* Inner Card */}
                <div className={`relative ${getCardAspectRatio()} rounded-2xl overflow-hidden cursor-pointer shadow-xl group h-full`}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill={COLORS.gold} stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-4 text-left">
                    <h3 className="text-lg font-bold text-white mb-1">{testimonial.name}</h3>
                    <p className="text-xs font-medium mb-2" style={{ color: COLORS.gold }}>{testimonial.batch}</p>
                    <p className="text-sm text-white/90 line-clamp-2">"{testimonial.quote}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Buttons - Now hidden on mobile (default) and shown on 'md' screens and above */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-white/10 text-white rounded-full ml-2 z-10 hover:bg-white/30 transition-colors hidden md:block" // Added hidden md:block
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-white/10 text-white rounded-full mr-2 z-10 hover:bg-white/30 transition-colors hidden md:block" // Added hidden md:block
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
                className={`relative w-full ${getModalMaxWidth()} bg-black rounded-2xl overflow-hidden shadow-2xl ${getModalAspectRatio()}`}
                onClick={(e) => e.stopPropagation()} 
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

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