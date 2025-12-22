import React from "react";
import { motion } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

const CareerImpactSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 px-6 md:px-20 overflow-hidden" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 h-full">
        
        {/* === LEFT COLUMN: MAIN CAREER CARD (Gold) === */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-1/2 min-h-[400px] lg:h-auto rounded-3xl p-10 flex flex-col justify-center shadow-2xl relative overflow-hidden"
          style={{ backgroundColor: COLORS.gold }}
        >
          {/* Decorative Circle Background */}
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 bg-white"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: COLORS.darkGreen }}>
              Accelerate Your Career Growth
            </h2>
            <p className="text-lg md:text-xl mb-8 font-medium opacity-90" style={{ color: COLORS.darkGreen }}>
              Our curriculum isn't just about coding—it's about career transformation. Gain the edge you need to stand out in the tech industry.
            </p>
            
            <button 
                className="w-fit px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: COLORS.darkGreen, color: COLORS.cream }}
            >
                View Career Path
            </button>
          </div>
        </motion.div>


        {/* === RIGHT COLUMN: STACKED CONTENT CARDS (Dark) === */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8">
          
          {/* Top Card: Skill Acquisition */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 rounded-3xl p-8 md:p-10 shadow-xl flex flex-col justify-center transition-transform hover:-translate-y-1"
            style={{ backgroundColor: COLORS.darkGreen }}
          >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: COLORS.gold }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.darkGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: COLORS.cream }}>In-Demand Skills</h3>
            </div>
            <p className="text-base opacity-80 leading-relaxed" style={{ color: COLORS.cream }}>
              Master the exact tech stack top companies are hiring for right now. From React to Cloud Computing, we cover the essentials.
            </p>
          </motion.div>

          {/* Bottom Card: Networking */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-1 rounded-3xl p-8 md:p-10 shadow-xl flex flex-col justify-center transition-transform hover:-translate-y-1"
            style={{ backgroundColor: COLORS.darkGreen }}
          >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: COLORS.gold }}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.darkGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: COLORS.cream }}>Alumni Network</h3>
            </div>
             <p className="text-base opacity-80 leading-relaxed" style={{ color: COLORS.cream }}>
              Join a community of over 5000+ graduates working in top MNCs. Your network is your net worth.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CareerImpactSection;