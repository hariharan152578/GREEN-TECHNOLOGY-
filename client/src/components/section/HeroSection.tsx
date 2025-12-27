import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import LoadingPage from "../LoadingPage";
import logo from "../../assets/logo.png";

/* ---------------- CONFIG ---------------- */
const API_BASE_URL = "http://localhost:5000";

/* ---------------- TYPES ---------------- */
interface RunningText {
  text: string;
}

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  images: string[];
  runningTexts: RunningText[];
}

/* ---------------- COLORS ---------------- */
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
  gray: "#CCCCCC",
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { domainId, courseId } = useParams();

  const parsedDomainId = Number(domainId) || 0;
  const parsedCourseId = Number(courseId) || 0;

  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH HERO DATA ---------------- */
  useEffect(() => {
    let isMounted = true;

    const fetchHero = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API_BASE_URL}/api/hero`, {
          params: {
            domainId: parsedDomainId,
            courseId: parsedCourseId,
          },
        });

        if (isMounted) {
          setHeroData(res.data);
          setCurrent(0);
        }
      } catch (error) {
        console.error("Failed to load hero data", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHero();

    return () => {
      isMounted = false;
    };
  }, [parsedDomainId, parsedCourseId]);

  /* ---------------- SLIDER LOGIC ---------------- */
  const images = heroData?.images ?? [];
  const runningTexts = heroData?.runningTexts ?? [];

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  if (loading) return <LoadingPage />;
  if (!heroData || !images.length) return null;

  /* ---------------- UI ---------------- */
  return (
    <div className="relative w-full flex flex-col font-sans">
      {/* RUNNING TEXT (FROM BACKEND) */}
      {runningTexts.length > 0 && (
        <div
          className="w-full py-2 overflow-hidden whitespace-nowrap"
          style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
        >
          <motion.div
            animate={{ x: [1000, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="font-bold text-sm flex gap-8"
          >
            {runningTexts.map((item, index) => (
              <React.Fragment key={index}>
                <span>{item.text}</span>
                {index !== runningTexts.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      )}

      {/* HERO SLIDER */}
      <div className="relative w-full h-[90vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${API_BASE_URL}${images[current]})`,
            }}
          >
            <div
              className="absolute inset-0 opacity-50"
              style={{ backgroundColor: COLORS.darkGreen }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-center px-6 md:px-20">
          <div className="w-full md:w-2/3">
            <motion.img
              src={logo}
              alt="Logo"
              className="w-40 mb-6"
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            />

            <h1 className="text-4xl md:text-6xl font-bold text-[#F0ECE3] mb-4">
              {heroData.title}
            </h1>

            <p className="text-lg text-[#F0ECE3] mb-8">
              {heroData.description}
            </p>

            <button
              onClick={() => navigate(heroData.ctaLink)}
              className="px-8 py-3 rounded-full font-bold"
              style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
            >
              {heroData.ctaText}
            </button>
          </div>
        </div>

        {/* SLIDER CONTROLS */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 text-white text-4xl z-20"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 text-white text-4xl z-20"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
