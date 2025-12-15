import React from "react";
import { motion } from "framer-motion";

// --- Configuration ---
// Using the strict color palette provided
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
};

// Dummy Data for Stories
interface Story {
  id: number;
  name: string;
  role: string;
  quote: string;
}

const stories: Story[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Data Scientist at Google",
    quote: "The mentorship at Greens was life-changing. I transitioned from a non-tech background to a top-tier tech role smoothly.",
  },
  {
    id: 2,
    name: "Arun Kumar",
    role: "Full Stack Dev at Amazon",
    quote: "The live projects gave me the real-world experience I needed. The placement support is genuinely exceptional.",
  },
  {
    id: 3,
    name: "Sara Ali",
    role: "UI/UX Designer at Adobe",
    quote: "I built a portfolio here that stood out. The focus on practical skills over theory made all the difference in interviews.",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SuccessStoriesSection: React.FC = () => {
  return (
    <section 
      className="relative w-full py-20 px-6 md:px-20 overflow-hidden"
      // Using Cream background for contrast against the previous dark section
      style={{ backgroundColor: COLORS.cream }} 
    >
      
      <div className="max-w-7xl mx-auto">
        
        {/* === TITLE BANNER (From Wireframe) === */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full py-6 mb-16 rounded-lg shadow-md text-center"
          // Using Gold background for banner with Dark Green text
          style={{ backgroundColor: COLORS.gold }}
        >
          <h2 
            className="text-2xl md:text-4xl font-bold uppercase tracking-wider"
            style={{ color: COLORS.darkGreen }}
          >
            Successful Stories
          </h2>
        </motion.div>


        {/* === MEMBER CARDS GRID === */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {stories.map((story) => (
            <motion.div
              key={story.id}
              variants={cardVariants}
              // The outer card structure representing the light yellow box in wireframe
              className="relative p-8 rounded-2xl border-4 flex flex-col items-center text-center shadow-xl transition-transform hover:-translate-y-2"
              style={{ 
                  backgroundColor: COLORS.cream, 
                  borderColor: COLORS.gold // Using Gold border to match the wireframe's outer box style
              }}
            >
              
              {/* Inner "Member" Box (Placeholder for Photo) */}
              <div 
                className="w-32 h-32 rounded-full mb-6 shadow-inner flex items-center justify-center overflow-hidden"
                // Using Dark Green representing the dark inner box in wireframe
                style={{ backgroundColor: COLORS.darkGreen }}
              >
                  {/* Placeholder Icon - replace with <img> tag later */}
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>

              {/* Member Details */}
              <h3 className="text-xl font-bold mb-1" style={{ color: COLORS.darkGreen }}>
                {story.name}
              </h3>
              <span className="text-sm font-semibold mb-4 block" style={{ color: COLORS.gold }}>
                {story.role}
              </span>
              
              {/* Quote graphic element */}
              <span className="text-4xl leading-none opacity-40" style={{ color: COLORS.gold }}>“</span>
              <p className="text-md italic opacity-90 mb-4" style={{ color: COLORS.darkGreen }}>
                {story.quote}
              </p>
               <span className="text-4xl leading-none opacity-40" style={{ color: COLORS.gold }}>”</span>

            </motion.div>
          ))}
        </motion.div>

      </div>
      
      {/* Note: The scroll-to-top arrow shown in the wireframe is managed globally 
          in the HeroSection component's fixed position elements, so it's not repeated here. */}

    </section>
  );
};

export default SuccessStoriesSection;