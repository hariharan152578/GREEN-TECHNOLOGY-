/* eslint-disable no-irregular-whitespace */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

// --- Card Data with Images ---
const CARDS = [
  {
    id: 0,
    title: "Global Certification",
    imgUrl: "https://cdn.vectorstock.com/i/1000v/33/49/global-certificate-vector-11613349.jpg",
    bgColor: COLORS.gold,
  },
  {
    id: 1,
    title: "Expert Mentors",
    imgUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#E5E5E5",
  },
  {
    id: 2,
    title: "Live Projects",
    imgUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    bgColor: COLORS.gold,
  },
  {
    id: 3,
    title: "100% Placement",
    imgUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    bgColor: "#F5F5F5",
  }
];

const EnrollSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // --- Loop Timer (5 Seconds) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CARDS.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <section className="relative w-full py-24 px-6 md:px-20 overflow-hidden">
      
      {/* === ENHANCED BACKGROUND === */}
      {/* 1. Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0ECE3] via-white to-[#E8E4DA] -z-30"></div>
      
      {/* 2. Texture Pattern Overlay (New) */}
      <div 
        className="absolute inset-0 opacity-[0.03] -z-20 pointer-events-none" 
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2301311F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}
      ></div>

      {/* 3. Decorative Blurred Orbs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#B99A49] opacity-10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#01311F] opacity-5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 -z-10 pointer-events-none"></div>

      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-24 lg:gap-32">
        
        {/* === LEFT SIDE: LOOPING IMAGE STACK === */}
        {/* Increased min-h to fit the taller cards */}
        <div className="relative w-full lg:w-1/2 min-h-[800px] flex items-center justify-center lg:justify-start"> 
          
          <div className="relative w-full h-[750px] flex items-center justify-center">
            {CARDS.map((card, index) => {
              const position = (index - activeIndex + CARDS.length) % CARDS.length;
              return (
                <StackCard 
                  key={card.id}
                  data={card}
                  position={position}
                />
              );
            })}
          </div>

        </div>

        {/* === RIGHT SIDE: ENROLL FORM === */}
        {/* FIX: Changed z-50 to z-10 so it stays UNDER your Navbar */}
        <div className="w-full lg:w-1/2 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/40 backdrop-blur-xl"
            style={{ 
                backgroundColor: `${COLORS.darkGreen}F2`,
                boxShadow: "0 25px 50px -12px rgba(1, 49, 31, 0.5)" // Deep green shadow
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center" style={{ color: COLORS.gold }}>
              Enroll Now
            </h2>
            <p className="mb-10 text-center text-lg opacity-80" style={{ color: COLORS.cream }}>
              Start your journey to becoming a certified professional.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold ml-1 uppercase tracking-wider" style={{ color: COLORS.gold }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B99A49] transition-all font-medium text-lg"
                  style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen }}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold ml-1 uppercase tracking-wider" style={{ color: COLORS.gold }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B99A49] transition-all font-medium text-lg"
                  style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen }}
                  required
                />
              </div>
<div className="flex flex-col gap-2">
                <label className="text-sm font-bold ml-1 uppercase tracking-wider" style={{ color: COLORS.gold }}>Mobile Phone</label>
                <input
                  type="number"
                  name="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="xxxxxxxxxx"
                  className="w-full px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B99A49] transition-all font-medium text-lg"
                  style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen }}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold ml-1 uppercase tracking-wider" style={{ color: COLORS.gold }}>Select Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B99A49] cursor-pointer font-medium text-lg"
                  style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen }}
                >
                  <option value="">-- Choose a Course --</option>
                  <option value="fsd">Full Stack Development</option>
                  <option value="ds">Data Science</option>
                  <option value="uiux">UI/UX Design</option>
                </select>
              </div>

              <motion.button
                // FIX: Replaced 'brightness' (invalid) with 'backgroundColor' (valid)
                whileHover={{ scale: 1.02, backgroundColor: COLORS.gold, color: COLORS.white }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-5 mt-6 rounded-xl font-bold text-xl shadow-lg transition-all tracking-wide"
                style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
              >
                Submit Application
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
};

// --- Stack Card Component (Massive Poster Dimensions) ---
interface StackCardProps {
    data: typeof CARDS[0];
    position: number;
}

const StackCard: React.FC<StackCardProps> = ({ data, position }) => {
    
    // Position Logic
    let variants = {};
    let zIndex = 0;

    if (position === 0) { // Front
        zIndex = 10;
        variants = { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, boxShadow: "0px 30px 60px rgba(0,0,0,0.3)" };
    } else if (position === 1) { // Middle
        zIndex = 5;
        variants = { x: 60, y: -50, scale: 0.92, opacity: 1, rotate: -3, boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" };
    } else if (position === 2) { // Back
        zIndex = 2;
        variants = { x: 120, y: -100, scale: 0.85, opacity: 0.7, rotate: -6, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" };
    } else { // Exit
        zIndex = 0;
        variants = { x: 500, y: 0, scale: 1.2, opacity: 0, rotate: 15, boxShadow: "none" };
    }

    return (
        <motion.div
            animate={variants}
            transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
            // HUGE DIMENSIONS: 
            // Mobile: w-72 h-[450px]
            // Tablet: w-[450px] h-[600px]
            // Desktop: w-[500px] h-[700px] (Massive Poster Size)
            className="absolute w-72 h-[450px] md:w-[450px] md:h-[600px] lg:w-[500px] lg:h-[700px] rounded-[2.5rem] border-[10px] border-white overflow-hidden shadow-2xl origin-bottom-left bg-white"
            style={{ zIndex: zIndex, willChange: "transform, opacity" }}
        >
            <img src={data.imgUrl} alt={data.title} className="w-full h-full object-cover" />
            
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-10">
                <h3 className="text-white text-3xl md:text-4xl font-bold tracking-wide leading-tight drop-shadow-lg">
                    {data.title}
                </h3>
                <div className="w-20 h-2 bg-[#B99A49] mt-4 rounded-full shadow-lg"></div>
            </div>
        </motion.div>
    );
};

export default EnrollSection;