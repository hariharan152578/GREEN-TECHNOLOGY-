import React from "react";
import { motion } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

// --- Tech Stack Data (AWS & DevOps Focus) ---
const techStack = [
  { name: "AWS Core", icon: "☁️" }, // Replace string icons with SVGs or Image imports
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
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TechStackSection: React.FC = () => {
  return (
    <section 
        className="relative w-full py-20 px-6 md:px-20 overflow-hidden" 
        style={{ backgroundColor: COLORS.white }}
    >
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 inline-block px-8 py-3 rounded-full"
          style={{ backgroundColor: COLORS.gold }}
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide" style={{ color: COLORS.darkGreen }}>
            Stack Learned
          </h2>
        </motion.div>

        {/* --- GRID LAYOUT (Matches Wireframe 2x5) --- */}
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
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="flex flex-col items-center justify-center p-8 rounded-2xl border transition-all cursor-default"
              style={{ 
                backgroundColor: COLORS.cream,
                borderColor: `${COLORS.gold}40`, // 40 is hex opacity
                color: COLORS.darkGreen
              }}
            >
              {/* Icon Placeholder */}
              <div className="text-5xl mb-4 filter drop-shadow-md">
                {tech.icon}
              </div>
              
              {/* Technology Name */}
              <h3 className="text-lg font-bold">
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