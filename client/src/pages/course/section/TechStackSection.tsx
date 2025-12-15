import React from "react";
import { motion } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

// --- Tech Stack Data ---
const techStack = [
  { name: "AWS Core", icon: "☁️" },
  { name: "Linux", icon: "🐧" },
  { name: "Python", icon: "🐍" },
  { name: "Docker", icon: "🐳" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "Terraform", icon: "🏗️" },
  { name: "Jenkins", icon: "🤵" },
  { name: "Git & GitHub", icon: "🐙" },
  { name: "Ansible", icon: "📜" },
  { name: "Databases", icon: "💾" },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 100 } 
  },
};

// Floating animation for icons
const floatAnimation = {
  y: [-5, 5, -5],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const TechStackSection: React.FC = () => {
  return (
    <section 
      className="relative w-full py-24 px-6 md:px-20 overflow-hidden" 
      // Rich gradient background instead of plain white
      style={{ background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.cream} 100%)` }}
    >
      
      {/* Decorative Background Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B99A49] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#01311F] opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Section Header with Line Accents */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 inline-flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2" style={{ color: COLORS.darkGreen }}>
            Technologies You Will Master
          </h2>
          <div className="w-24 h-1.5 rounded-full" style={{ backgroundColor: COLORS.gold }}></div>
        </motion.div>

        {/* --- UNIQUE GRID LAYOUT --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 25px 50px -12px rgba(1, 49, 31, 0.15)",
                borderColor: COLORS.gold
              }}
              className="group relative flex flex-col items-center justify-center p-8 rounded-3xl border border-transparent transition-all duration-300 backdrop-blur-sm"
              style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.6)", // Glassmorphism base
                border: `1px solid rgba(185, 154, 73, 0.2)` // Subtle gold border
              }}
            >
              {/* Hover Glow Effect */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at center, ${COLORS.gold}, transparent 70%)` }}
              />

              {/* Floating Icon */}
              <motion.div 
                animate={floatAnimation}
                className="text-6xl mb-6 filter drop-shadow-lg transform transition-transform duration-300 group-hover:scale-110"
              >
                {tech.icon}
              </motion.div>
              
              {/* Technology Name */}
              <h3 
                className="text-lg font-bold tracking-wide transition-colors duration-300 group-hover:text-[#B99A49]"
                style={{ color: COLORS.darkGreen }}
              >
                {tech.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TechStackSection;