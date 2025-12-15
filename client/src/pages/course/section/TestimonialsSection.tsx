import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

// --- Dummy Testimonial Data ---
// Replace imageURLs with your actual video thumbnails.
const testimonials = [
  {
    id: 1,
    name: "Rahul Verma",
    batch: "AWS Batch '23",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "From a fresher to a Cloud Engineer in 6 months!",
  },
  {
    id: 2,
    name: "Sneha Gupta",
    batch: "DevOps Batch '22",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "The live projects were a game-changer for my career.",
  },
  {
    id: 3,
    name: "Arjun Singh",
    batch: "Solutions Architect '23",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Mentorship helped me crack my dream job interview.",
  },
  {
    id: 4,
    name: "Priya Sharma",
    batch: "Cloud Practitioner '24",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Best decision to switch my career to Cloud Computing.",
  },
  {
    id: 5,
    name: "Karthik Nair",
    batch: "AWS Batch '22",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "The structured curriculum made learning AWS easy.",
  },
];

const TestimonialsSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-7xl mx-auto">
        
        {/* --- Section Header (From Wireframe) --- */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-8 py-3 rounded-lg shadow-md"
            style={{ backgroundColor: COLORS.gold }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-wider uppercase" style={{ color: COLORS.darkGreen }}>
              Student Success Reels
            </h2>
          </motion.div>
        </div>

        {/* --- Reels Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
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
              className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer shadow-xl group"
            >
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
            </motion.div>
          ))}
        </div>

        {/* --- Video Modal --- */}
        <AnimatePresence>
          {selectedId && (
            <motion.div 
              layoutId={`card-container-${selectedId}`}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            >
              <motion.div 
                className="relative w-full max-w-lg bg-black rounded-2xl overflow-hidden shadow-2xl aspect-[9/16] md:aspect-video"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* Video Player Placeholder (Replace with actual <video> tag) */}
                {(() => {
                  const testimonial = testimonials.find(t => t.id === selectedId);
                  return testimonial ? (
                    <div className="w-full h-full relative">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover opacity-50"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill={COLORS.gold} stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        <p className="text-white text-xl font-bold">{testimonial.name}'s Story</p>
                        <p className="text-white/70 mt-2">(Video Player Placeholder)</p>
                      </div>
                    </div>
                  ) : null;
                })()}
                
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TestimonialsSection;