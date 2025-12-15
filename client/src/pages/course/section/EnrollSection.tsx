import React, { useState } from "react";
import { motion } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

const EnrollSection: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form Submitted:", formData);
  };

  return (
    <section className="relative w-full py-20 px-6 md:px-20 overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        
        {/* === LEFT SIDE: STACKED CARDS (From Wireframe) === */}
        <div className="relative w-full lg:w-1/2 h-[400px] flex items-center justify-center lg:justify-start pl-8">
          
          {/* Card 1 (Back - Gold) */}
          <CardStackItem 
            index={0} 
            bgColor={COLORS.gold} 
            textColor={COLORS.darkGreen}
            zIndex={10}
            offset={{ x: 0, y: 0 }}
            content="Global Certification"
          />

          {/* Card 2 (Middle - Silver/White) */}
          <CardStackItem 
            index={1} 
            bgColor="#E5E5E5" 
            textColor={COLORS.darkGreen}
            zIndex={20}
            offset={{ x: 30, y: 30 }}
            content="Expert Mentors"
          />

          {/* Card 3 (Middle - Gold) */}
          <CardStackItem 
            index={2} 
            bgColor={COLORS.gold} 
            textColor={COLORS.darkGreen}
            zIndex={30}
            offset={{ x: 60, y: 60 }}
            content="Live Projects"
          />

           {/* Card 4 (Front - Silver/White) */}
           <CardStackItem 
            index={3} 
            bgColor="#E5E5E5" 
            textColor={COLORS.darkGreen}
            zIndex={40}
            offset={{ x: 90, y: 90 }}
            content="100% Placement Support"
          />
        </div>

        {/* === RIGHT SIDE: ENROLL FORM === */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-10 rounded-2xl shadow-2xl"
            style={{ backgroundColor: COLORS.darkGreen }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: COLORS.gold }}>
              Enroll Now
            </h2>
            <p className="mb-8 text-center text-sm opacity-80" style={{ color: COLORS.cream }}>
              Secure your spot for the upcoming batch.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold ml-1" style={{ color: COLORS.gold }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen, focusRing: COLORS.gold }}
                  required
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold ml-1" style={{ color: COLORS.gold }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen }}
                  required
                />
              </div>

              {/* Course Select */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold ml-1" style={{ color: COLORS.gold }}>Select Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 cursor-pointer"
                  style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen }}
                >
                  <option value="">-- Choose a Course --</option>
                  <option value="fsd">Full Stack Development</option>
                  <option value="ds">Data Science</option>
                  <option value="uiux">UI/UX Design</option>
                </select>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 mt-4 rounded-lg font-bold text-lg shadow-md transition-all"
                style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
              >
                Submit Application
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll to Top (Local version if needed here, though usually this is global) */}
      <div className="absolute bottom-6 right-6">
         {/* This is just a visual placeholder if you want it specific to this section, 
             otherwise rely on the global fixed button from the previous Hero component */}
      </div>

    </section>
  );
};

// --- Helper Component for the Stacked Cards ---
interface CardProps {
    index: number;
    bgColor: string;
    textColor: string;
    zIndex: number;
    offset: { x: number; y: number };
    content: string;
}

const CardStackItem: React.FC<CardProps> = ({ index, bgColor, textColor, zIndex, offset, content }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50, y: -50 }}
            whileInView={{ opacity: 1, x: offset.x, y: offset.y }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
            className="absolute w-64 h-40 md:w-80 md:h-52 rounded-xl shadow-xl flex items-center justify-center p-6 border border-opacity-20 border-black"
            style={{ 
                backgroundColor: bgColor, 
                color: textColor,
                zIndex: zIndex,
                // We use top/left 0 and transform via Framer Motion for the offset effect
                top: 0,
                left: 0
            }}
        >
            <h3 className="text-xl font-bold text-center opacity-90">{content}</h3>
        </motion.div>
    );
};

export default EnrollSection;