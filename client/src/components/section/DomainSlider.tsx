/* eslint-disable no-irregular-whitespace */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePageContext } from "../../context/usePageContext";

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

/* -------------------- COMPONENT -------------------- */
const DomainSection: React.FC = () => {
  const { setDomainId, setCourseId } = usePageContext();
  const navigate = useNavigate();

  const [domainSlides, setDomainSlides] = useState<DomainSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const TRANSITION_DURATION = 0.8;

  /* ---------------- FETCH DOMAINS ---------------- */
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/domain");
        setDomainSlides(res.data);
      } catch (error) {
        console.error("Failed to load domains", error);
      }
    };

    fetchDomains();
  }, []);

  if (!domainSlides.length) return null;

  const currentSlide = domainSlides[currentIndex];

  /* ---------------- HANDLERS ---------------- */
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % domainSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? domainSlides.length - 1 : prev - 1
    );
  };

  /**
   * 🔥 DOMAIN SELECTION (URL-DRIVEN)
   */
  const handleDomainSelect = () => {
    setDomainId(currentSlide.id);
    setCourseId(0);

    // ✅ FIX: domainId goes into URL
    navigate(`/domain/${currentSlide.id}`);
  };

  /* ---------------- ANIMATIONS ---------------- */
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const imageContainerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const imageVariants: Variants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: TRANSITION_DURATION },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: TRANSITION_DURATION },
    },
  };

  const smallImageVariants: Variants = {
    initial: { opacity: 0, scale: 0.85, rotate: -5 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: TRANSITION_DURATION },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotate: 5,
      transition: { duration: TRANSITION_DURATION },
    },
    hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3 } },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  /* ---------------- UI ---------------- */
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
        {/* LEFT SIDE - IMAGES */}
        <div className="relative flex justify-center md:justify-start">
          <motion.div
            variants={imageContainerVariants}
            className="rounded-2xl overflow-hidden shadow-2xl w-full h-[450px] md:h-[550px] relative bg-gray-200 cursor-pointer"
            onClick={handleDomainSelect}
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
              />
            </AnimatePresence>

            {/* Pagination */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {domainSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white w-8"
                      : "bg-white/50 w-2"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* SMALL IMAGE */}
          <motion.div
            variants={smallImageVariants}
            whileHover="hover"
            className="absolute bottom-[-40px] right-[-30px] z-10 rounded-xl overflow-hidden shadow-2xl w-[140px] h-[120px] md:w-[220px] md:h-[180px] hidden md:block border-4 border-white"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`small-${currentSlide.id}`}
                src={currentSlide.smallImageUrl}
                alt="thumb"
                className="w-full h-full object-cover absolute"
                variants={smallImageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            </AnimatePresence>
          </motion.div>
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <motion.div variants={contentVariants}>
          <h2 className="text-3xl md:text-5xl font-bold text-[#01311F] mb-4">
            {currentSlide.title}
          </h2>

          <p className="text-[#B99A49] mb-6">{currentSlide.subtitle}</p>

          <p className="text-gray-600 mb-8">{currentSlide.description}</p>

          <div className="flex items-center gap-8 mb-10">
            <span className="text-2xl font-bold text-[#01311F]">
              {currentSlide.price}
            </span>

            <button
              onClick={handleDomainSelect}
              className="px-8 py-3 bg-[#01311F] text-white rounded-md hover:bg-[#B99A49] transition-all"
            >
              View Courses
            </button>
          </div>

          {/* NAV */}
          <div className="flex space-x-4">
            <button onClick={prevSlide}>
              <ChevronLeft />
            </button>
            <button onClick={nextSlide}>
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default DomainSection;
