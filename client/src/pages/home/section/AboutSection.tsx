import { motion ,type Variants} from "framer-motion";
import { useState, useEffect } from "react";
import mainImg from "../../../assets/img/hero1.png";
import smallImg from "../../../assets/img/hero1.png";
import img2 from "../../../assets/img/hero1.png"; 
import img3 from "../../../assets/img/hero2.png";
import img4 from "../../../assets/img/hero3.png";

const AboutSection: React.FC = () => {

  const mainImages = [mainImg, img2, img3, img4]; 
  const smallImages = [smallImg, img2, img3, img4]; 
  const [currentMainImageIndex, setCurrentMainImageIndex] = useState(0);
  const [currentSmallImageIndex, setCurrentSmallImageIndex] = useState(0);

  
  const SLIDESHOW_INTERVAL = 4000; 
  const TRANSITION_DURATION = 0.8; 

  // Slideshow effect for main image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMainImageIndex((prevIndex) => 
        (prevIndex + 1) % mainImages.length
      );
    }, SLIDESHOW_INTERVAL);

    return () => clearInterval(interval);
  }, [mainImages.length]);

  // Slideshow effect for small image (can sync or have different timing)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSmallImageIndex((prevIndex) => 
        (prevIndex + 1) % smallImages.length
      );
    }, SLIDESHOW_INTERVAL + 1000); // Slight offset for variety

    return () => clearInterval(interval);
  }, [smallImages.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.9, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: TRANSITION_DURATION,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: TRANSITION_DURATION,
        ease: "easeInOut"
      }
    }
  };

  const smallImageVariants = {
    initial: { opacity: 0, scale: 0.95, rotate: -5 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: TRANSITION_DURATION,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      rotate: 5,
      transition: {
        duration: TRANSITION_DURATION,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "2.5rem",
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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
        {/* LEFT SIDE - Images */}
        <div className="relative flex justify-center md:justify-start">
          {/* Main Image Container - Cover full size */}
          <motion.div
            variants={imageContainerVariants}
            className="rounded-2xl overflow-hidden shadow-lg w-full h-[500px] md:h-[600px] relative"
          >
            {/* Main Image Slideshow */}
            <motion.img
              key={currentMainImageIndex}
              src={mainImages[currentMainImageIndex]}
              alt={`About main ${currentMainImageIndex + 1}`}
              className="w-full h-full object-cover"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />

            {/* Slideshow Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {mainImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMainImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentMainImageIndex
                      ? "bg-white w-6"
                      : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Small Image Container - Cover full size */}
          <motion.div
            variants={smallImageVariants}
            whileHover="hover"
            className="absolute bottom-[-50px] right-[-50px] z-10 rounded-xl overflow-hidden shadow-lg w-[120px] h-[100px] md:w-[200px] md:h-[150px] hidden md:block"
          >
            {/* Small Image Slideshow */}
            <motion.img
              key={currentSmallImageIndex}
              src={smallImages[currentSmallImageIndex]}
              alt={`About small ${currentSmallImageIndex + 1}`}
              className="w-full h-full object-cover"
              variants={smallImageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />

            {/* Small slideshow indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
              {smallImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-1 h-1 rounded-full ${
                    index === currentSmallImageIndex
                      ? "bg-white"
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Content */}
        <motion.div variants={contentVariants}>
          {/* Small Label */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            variants={contentVariants}
          >
            <motion.span
              variants={lineVariants}
              className="h-[2px] bg-[#B99A49]"
            />
            <motion.span
              variants={textVariants}
              className="text-sm uppercase tracking-wider text-gray-500"
            >
              About US
            </motion.span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={headingVariants}
            className="text-3xl md:text-4xl font-bold text-[#01311F] mb-6 leading-snug"
          >
            GREEN TECHNOLOGY <br />
            TRAINING INSTITUTE - CHENNAI
          </motion.h2>

          {/* Description */}
          <motion.div variants={containerVariants}>
            <motion.p
              variants={paragraphVariants}
              className="text-gray-600 text-sm md:text-base leading-relaxed mb-4"
            >
              Our international conference addresses modern technological
              challenges by bringing together researchers, academicians, and
              industry professionals from around the world.
            </motion.p>

            <motion.p
              variants={paragraphVariants}
              className="text-gray-600 text-sm md:text-base leading-relaxed"
            >
              It serves as a platform for exchanging innovative ideas, fostering
              collaboration, and exploring solutions that shape the future of
              technology and research.
            </motion.p>
          </motion.div>

          {/* Optional: Manual slideshow controls */}
          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => {
                setCurrentMainImageIndex((prev) => 
                  prev === 0 ? mainImages.length - 1 : prev - 1
                );
                setCurrentSmallImageIndex((prev) => 
                  prev === 0 ? smallImages.length - 1 : prev - 1
                );
              }}
              className="px-4 py-2 bg-[#01311F] text-white rounded-md hover:bg-[#B99A49] transition-colors duration-300"
            >
              Previous Image
            </button>
            <button
              onClick={() => {
                setCurrentMainImageIndex((prev) => 
                  (prev + 1) % mainImages.length
                );
                setCurrentSmallImageIndex((prev) => 
                  (prev + 1) % smallImages.length
                );
              }}
              className="px-4 py-2 bg-[#B99A49] text-white rounded-md hover:bg-[#01311F] transition-colors duration-300"
            >
              Next Image
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;