/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { usePageContext } from "../../context/usePageContext";
import { safeGet } from "../../util/safeGet";

/* ---------------- CONFIG ---------------- */
const API_BASE_URL = import.meta.env.API_BASE_URL;

/* ---------------- TYPES ---------------- */
interface AboutData {
  label: string;
  heading: string;
  description1: string;
  description2?: string;
  mainImages: string[];
  smallImages: string[];
}

/* ---------------- COMPONENT ---------------- */
const AboutSection: React.FC = () => {
  const { domainId, courseId } = usePageContext();

  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [currentMainImageIndex, setCurrentMainImageIndex] = useState(0);
  const [currentSmallImageIndex, setCurrentSmallImageIndex] = useState(0);

  const SLIDESHOW_INTERVAL = 4000;
  const TRANSITION_DURATION = 0.8;

  /* ---------------- FETCH ABOUT (SAFE) ---------------- */
  useEffect(() => {
    let mounted = true;

    const fetchAbout = async () => {
      let data = await safeGet<AboutData>(
        `${API_BASE_URL}/api/about`,
        {
          domainId: domainId ?? undefined,
          courseId: courseId ?? undefined,
        }
      );

      if (!data) {
        data = await safeGet<AboutData>(
          `${API_BASE_URL}/api/about`,
          { domainId: 0, courseId: 0 }
        );
      }

      if (mounted && data) {
        setAboutData({
          ...data,
          mainImages: Array.isArray(data.mainImages) ? data.mainImages : [],
          smallImages: Array.isArray(data.smallImages) ? data.smallImages : [],
        });
        setCurrentMainImageIndex(0);
        setCurrentSmallImageIndex(0);
      }
    };

    fetchAbout();
    return () => {
      mounted = false;
    };
  }, [domainId, courseId]);

  /* ---------------- SAFE IMAGE FLAGS ---------------- */
  const hasMainImages =
    Array.isArray(aboutData?.mainImages) &&
    aboutData.mainImages.length > 0;

  const hasSmallImages =
    Array.isArray(aboutData?.smallImages) &&
    aboutData.smallImages.length > 0;

  /* ---------------- SLIDESHOW EFFECTS ---------------- */
  useEffect(() => {
    if (!hasMainImages || !aboutData) return;

    const interval = setInterval(() => {
      setCurrentMainImageIndex(
        prev => (prev + 1) % aboutData.mainImages.length
      );
    }, SLIDESHOW_INTERVAL);

    return () => clearInterval(interval);
  }, [hasMainImages, aboutData?.mainImages.length]);

  useEffect(() => {
    if (!hasSmallImages || !aboutData) return;

    const interval = setInterval(() => {
      setCurrentSmallImageIndex(
        prev => (prev + 1) % aboutData.smallImages.length
      );
    }, SLIDESHOW_INTERVAL + 1000);

    return () => clearInterval(interval);
  }, [hasSmallImages, aboutData?.smallImages.length]);

  /* ---------------- GUARD ---------------- */
  if (!aboutData) {
    return (
      <div className="py-20 text-center text-gray-400">
        About section coming soon
      </div>
    );
  }

  const {
    label,
    heading,
    description1,
    description2,
    mainImages,
    smallImages,
  } = aboutData;

  /* ---------------- ANIMATION VARIANTS ---------------- */
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
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

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  /* ---------------- UI ---------------- */
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full bg-white py-20 px-4 md:px-20"
    >
      <motion.div
        variants={containerVariants}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        {/* LEFT - IMAGES */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-lg w-full h-[500px] md:h-[600px] relative">
            {hasMainImages ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentMainImageIndex}
                  src={`${API_BASE_URL}${mainImages[currentMainImageIndex]}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
              </AnimatePresence>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Image coming soon
              </div>
            )}
          </div>

          {hasSmallImages && (
            <div className="absolute bottom-[-40px] right-[-40px] hidden md:block w-[200px] h-[150px] rounded-xl overflow-hidden shadow-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSmallImageIndex}
                  src={`${API_BASE_URL}${smallImages[currentSmallImageIndex]}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* RIGHT - CONTENT */}
        <motion.div variants={contentVariants}>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-[#B99A49]" />
            <span className="text-sm uppercase tracking-wider text-gray-500">
              {label}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#01311F] mb-6">
            {heading}
          </h2>

          <p className="text-gray-600 mb-4">{description1}</p>
          {description2 && (
            <p className="text-gray-600">{description2}</p>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;
