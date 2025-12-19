/* eslint-disable no-irregular-whitespace */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* -------------------- TYPES -------------------- */
interface DomainSlide {
  id: number;
  domain: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  mainImageUrl: string;
  smallImageUrl: string;
}

/* -------------------- DATA -------------------- */
const domainSlides: DomainSlide[] = [
  {
    id: 1,
    domain: "DevOps",
    title: "DEVOPS MASTER PROGRAM",
    subtitle: "CI/CD • Docker • Kubernetes",
    price: "₹25,000",
    description: "Our international standard DevOps program addresses modern deployment challenges by bringing together automation, containerization, and cloud-native workflows. It serves as a platform for mastering CI/CD and exploring solutions that shape the future of IT operations.",
    mainImageUrl: "https://images.unsplash.com/photo-1667372333374-0d74586d7af0?auto=format&fit=crop&q=80&w=800",
    smallImageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    domain: "AWS",
    title: "AWS CLOUD ENGINEER",
    subtitle: "EC2 • S3 • IAM • Cloud Security",
    price: "₹22,000",
    description: "Master the global leader in cloud computing. This program focuses on architecting secure, robust, and scalable systems on AWS. You'll learn to solve real-world infrastructure challenges using cutting-edge cloud services and best practices.",
    mainImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    smallImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    domain: "Linux",
    title: "LINUX SYSTEM ADMIN",
    subtitle: "Shell • Networking • Servers",
    price: "₹15,000",
    description: "Linux serves as the backbone of modern technological infrastructure. Our training provides a platform for exchanging deep technical knowledge in system administration, security hardening, and high-performance server management.",
    mainImageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
    smallImageUrl: "https://images.unsplash.com/photo-1518433278983-4903254e2624?auto=format&fit=crop&q=80&w=400",
  },
];

const DomainSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const TRANSITION_DURATION = 0.8;

  const currentSlide = domainSlides[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % domainSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? domainSlides.length - 1 : prev - 1));
  };

  // Animation variants (Matched to AboutSection)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const imageContainerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  const imageVariants: Variants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1, transition: { duration: TRANSITION_DURATION } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: TRANSITION_DURATION } }
  };

  const smallImageVariants: Variants = {
    initial: { opacity: 0, scale: 0.85, rotate: -5 },
    animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: TRANSITION_DURATION } },
    exit: { opacity: 0, scale: 0.8, rotate: 5, transition: { duration: TRANSITION_DURATION } },
    hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3 } }
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full bg-[#F9F7F2] py-24 px-4 md:px-20"
    >
      <motion.div
        variants={containerVariants}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        {/* LEFT SIDE - Images (Matching AboutSection Layout) */}
        <div className="relative flex justify-center md:justify-start">
          {/* Main Image Container */}
          <motion.div
            variants={imageContainerVariants}
            className="rounded-2xl overflow-hidden shadow-2xl w-full h-[450px] md:h-[550px] relative bg-gray-200"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`main-${currentSlide.id}`}
                src={currentSlide.mainImageUrl}
                alt={currentSlide.domain}
                className="w-full h-full object-cover absolute top-0 left-0"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Pagination Indicators inside image */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {domainSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white w-8" : "bg-white/50 w-2"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Small Floating Image Overlay */}
          <motion.div
            variants={smallImageVariants}
            whileHover="hover"
            className="absolute bottom-[-40px] right-[-30px] z-10 rounded-xl overflow-hidden shadow-2xl w-[140px] h-[120px] md:w-[220px] md:h-[180px] hidden md:block border-4 border-white"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`small-${currentSlide.id}`}
                src={currentSlide.smallImageUrl}
                alt={`${currentSlide.domain} thumb`}
                className="w-full h-full object-cover absolute top-0 left-0"
                variants={smallImageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            </AnimatePresence>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Content */}
        <motion.div variants={contentVariants}>
          {/* Section Label */}
          <motion.div className="flex items-center gap-3 mb-6">
            <motion.span
              variants={{ hidden: { width: 0 }, visible: { width: "3rem", transition: { duration: 0.8 } } }}
              className="h-[2px] bg-[#B99A49]"
            />
            <motion.span className="text-sm uppercase tracking-widest text-[#B99A45] font-bold">
              {currentSlide.domain} PROGRAM
            </motion.span>
          </motion.div>

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#01311F] mb-4 leading-tight">
                {currentSlide.title}
              </h2>
              <p className="text-[#B99A49] font-medium tracking-wide mb-6">
                {currentSlide.subtitle}
              </p>
              
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                {currentSlide.description}
              </p>

              <div className="flex items-center gap-8 mb-10">
                <div className="flex flex-col">
                   <span className="text-[10px] uppercase text-gray-400 tracking-tighter">Investment</span>
                   <span className="text-2xl font-bold text-[#01311F]">{currentSlide.price}</span>
                </div>
                <button className="px-8 py-3 bg-[#01311F] text-white rounded-md hover:bg-[#B99A49] transition-all duration-300 shadow-md uppercase text-xs font-bold tracking-widest">
                  View Syllabus
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls (Matched to AboutSection style) */}
          <div className="flex space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 border border-[#01311F]/20 text-[#01311F] rounded-full hover:bg-[#01311F] hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-[#B99A49] text-white rounded-full hover:bg-[#01311F] transition-all duration-300 shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default DomainSection;