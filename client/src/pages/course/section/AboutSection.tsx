import React from "react";
import { motion } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

// Placeholder image for the "About" section
const aboutImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3";

const AboutSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 px-6 md:px-20 overflow-hidden" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* === LEFT SIDE: ATTRACTIVE CONTENT TEXT === */}
        <div className="w-full md:w-1/2 relative">
          
          {/* Decorative Back Layer (The gray box in your wireframe) */}
          <motion.div 
            initial={{ opacity: 0, x: -20, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-4 left-4 w-full h-full rounded-3xl -z-10 hidden md:block"
            style={{ backgroundColor: COLORS.cream }}
          ></motion.div>

          {/* Main Content Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-12 rounded-3xl border border-opacity-10 shadow-xl bg-white"
            style={{ borderColor: COLORS.gold }}
          >
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: COLORS.gold }}>
              About Greens Technology
            </h4>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: COLORS.darkGreen }}>
              Bridging the Gap Between <span className="italic">Learning</span> & <span className="italic">Doing</span>.
            </h2>
            
            <p className="text-lg opacity-80 mb-6 leading-relaxed" style={{ color: COLORS.darkGreen }}>
              At Greens Technology, we don't just teach modules; we build careers. Our AWS Solution Architect program is crafted by industry veterans to replace "textbook theory" with "production-grade reality."
            </p>

            <ul className="space-y-4 mb-8">
              {["No. 1 Software Training Institute in Chennai", "Hands-on Labs from Day 1", "Curriculum Updated for 2025 Standards"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="p-1 rounded-full" style={{ backgroundColor: COLORS.gold }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.darkGreen} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="font-semibold opacity-90" style={{ color: COLORS.darkGreen }}>{item}</span>
                </li>
              ))}
            </ul>

            <button 
              className="px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: COLORS.darkGreen, color: COLORS.gold }}
            >
              Learn More About Us
            </button>
          </motion.div>
        </div>


        {/* === RIGHT SIDE: CIRCULAR IMAGE === */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          
          {/* Decorative Offset Circle (The gray/shadow circle in wireframe) */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-4 right-4 md:right-12 w-72 h-72 md:w-[450px] md:h-[450px] rounded-full -z-10"
            style={{ backgroundColor: COLORS.gold }} // Using Gold for the background shape to be attractive
          ></motion.div>

          {/* Main Image */}
          <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 shadow-2xl"
             style={{ borderColor: COLORS.white }}
          >
            <img 
              src={aboutImage} 
              alt="Students collaborating" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Badge (Optional decorative touch) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-0 md:bottom-10 left-0 md:left-10 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 max-w-[200px]"
          >
             <div className="text-3xl">🏆</div>
             <div>
                <p className="text-xs font-bold opacity-60 uppercase">Rated</p>
                <p className="text-lg font-bold" style={{ color: COLORS.darkGreen }}>Best in Class</p>
             </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;