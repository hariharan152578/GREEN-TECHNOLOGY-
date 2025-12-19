/* eslint-disable no-irregular-whitespace */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return url;
};

// --- Carousel Animation Variants ---
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

// --- Dummy Testimonial Data ---
const testimonials = [
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

const TestimonialsSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedTestimonial = testimonials.find(t => t.id === selectedId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const CARD_COUNT = testimonials.length;

  // --- Sync Responsive Layout ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return CARD_COUNT - 1;
      if (nextIndex >= CARD_COUNT) return 0;
      return nextIndex;
    });
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -swipeConfidenceThreshold) paginate(1);
    else if (swipe > swipeConfidenceThreshold) paginate(-1);
  };

  const getVisibleItems = () => {
    return Array.from({ length: visibleCards }, (_, i) => 
      testimonials[(currentIndex + i) % CARD_COUNT]
    );
  };

  const visibleTestimonials = getVisibleItems();

  const getModalAspectRatio = () => {
    if (!selectedTestimonial) return 'aspect-video'; 
    const url = selectedTestimonial.videoUrl;
    if (url.includes("/shorts/") || url.includes("youtu.be/")) return 'aspect-[9/16]'; 
    return 'aspect-video'; 
  };

  const getModalMaxWidth = () => {
    if (!selectedTestimonial) return 'max-w-lg';
    const url = selectedTestimonial.videoUrl;
    if (url.includes("/shorts/") || url.includes("youtu.be/")) return 'max-w-xs md:max-w-sm'; 
    return 'max-w-lg md:max-w-3xl'; 
  };

  return (
    <section className="relative w-full py-24 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: COLORS.darkGreen }}>
      <div className="max-w-7xl mx-auto">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-12 text-center" style={{ color: COLORS.cream }}>
              Resource<span style={{ color: COLORS.gold }}>.</span>Library <span className="font-bold" style={{ color: COLORS.gold }}>+</span> Trending
            </h2>
          </motion.div>
        </div>

        {/* --- Video Carousel Container --- */}
        <div className="relative flex items-center justify-center">
          
          {/* Desktop Navigation: Prev */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg hidden lg:block"
            style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>

          <div className="relative overflow-hidden w-full min-h-[450px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className={`grid gap-10 w-full cursor-grab active:cursor-grabbing ${
                  visibleCards === 1 ? 'grid-cols-1' : visibleCards === 2 ? 'grid-cols-2' : 'grid-cols-3'
                }`}
                custom={direction}
                variants={carouselVariants(direction)}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              >
                {visibleTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    onClick={() => setSelectedId(testimonial.id)}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-xl group h-full"
                  >
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
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop Navigation: Next */}
          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg hidden lg:block"
            style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* --- Pagination Dots --- */}
        <div className="flex justify-center mt-12 space-x-2">
          {testimonials.map((_, index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full cursor-pointer"
              onClick={() => {
                const diff = index - currentIndex;
                if (diff !== 0) {
                  setDirection(diff > 0 ? 1 : -1);
                  setCurrentIndex(index);
                }
              }}
              style={{ 
                backgroundColor: index === currentIndex ? COLORS.gold : COLORS.cream,
                opacity: index === currentIndex ? 1 : 0.5,
              }}
              whileHover={{ scale: 1.4, opacity: 1 }}
            />
          ))}
        </div>

        {/* --- Video Modal --- */}
        <AnimatePresence>
          {selectedId && selectedTestimonial && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            >
              <motion.div 
                className={`relative w-full ${getModalMaxWidth()} bg-black rounded-2xl overflow-hidden shadow-2xl ${getModalAspectRatio()}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
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

export default TestimonialsSection;