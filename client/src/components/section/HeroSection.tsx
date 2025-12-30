import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { safeGet } from "../../util/safeGet";
import LoadingPage from "../LoadingPage";
import logo from "../../assets/Greens.png";

/* ---------------- CONFIG ---------------- */
const API_BASE_URL = import.meta.env.API_BASE_URL;

/* ---------------- TYPES ---------------- */
interface RunningText {
  text: string;
}

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  runningTexts: RunningText[];
}

interface Domain {
  id: number;
  domain: string;
}

interface Course {
  id: number;
  domainId: number;
  title: string;
}

/* ---------------- COLORS ---------------- */
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { domainId, courseId } = useParams();

  /* ---------------- PAGE TYPE ---------------- */
  const isLandingPage = !domainId;
  const isDomainPage = !!domainId && !courseId;
  const isCoursePage = !!domainId && !!courseId;

  const parsedDomainId = domainId ? Number(domainId) : undefined;
  const parsedCourseId = courseId ? Number(courseId) : undefined;

  /* ---------------- STATE ---------------- */
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH HERO (SAFE) ---------------- */
  useEffect(() => {
    let mounted = true;

    const fetchHero = async () => {
      setLoading(true);

      // 1️⃣ Try requested hero
      let data = await safeGet<HeroData>(
        `${API_BASE_URL}/api/hero`,
        {
          domainId: parsedDomainId,
          courseId: parsedCourseId,
        }
      );

      // 2️⃣ Fallback → landing hero
      if (!data) {
        data = await safeGet<HeroData>(
          `${API_BASE_URL}/api/hero`,
          { domainId: 0, courseId: 0 }
        );
      }

      if (mounted) {
        setHeroData(data);
        setLoading(false);
      }
    };

    fetchHero();
    return () => {
      mounted = false;
    };
  }, [parsedDomainId, parsedCourseId]);

  /* ---------------- FETCH DOMAINS (LANDING) ---------------- */
  useEffect(() => {
    if (!isLandingPage) return;

    safeGet<Domain[]>(`${API_BASE_URL}/api/domain`)
      .then(data => setDomains(data ?? []));
  }, [isLandingPage]);

  /* ---------------- FETCH COURSES (DOMAIN) ---------------- */
  useEffect(() => {
    if (!isDomainPage || !parsedDomainId) return;

    safeGet<Course[]>(
      `${API_BASE_URL}/api/courses`,
      { domainId: parsedDomainId }
    ).then(data => setCourses(data ?? []));
  }, [isDomainPage, parsedDomainId]);

  /* ---------------- SLIDER ---------------- */
  const images = heroData?.images ?? [];
  const runningTexts = heroData?.runningTexts ?? [];

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  /* ---------------- ENROLL HANDLER ---------------- */
  const handleEnrollClick = () => {
    window.dispatchEvent(new Event("open-enrolment"));
  };

  /* ---------------- GUARDS ---------------- */
  if (loading) return <LoadingPage />;

  if (!heroData || !images.length) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-gray-400">
        Hero content unavailable
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="relative w-full flex flex-col font-sans">

      {/* RUNNING TEXT */}
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
                <span>•</span>
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

        {/* CONTENT */}
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

            {/* SMART CTA */}
            <div className="flex flex-wrap gap-4">

              {/* LANDING → DOMAINS */}
              {isLandingPage &&
                domains.map(d => (
                  <button
                    key={d.id}
                    onClick={() => navigate(`/domain/${d.id}`)}
                    className="px-6 py-3 rounded-full font-bold hover:scale-105 transition"
                    style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
                  >
                    {d.domain}
                  </button>
                ))}

              {/* DOMAIN → COURSES */}
              {isDomainPage &&
                courses.map(c => (
                  <button
                    key={c.id}
                    onClick={() =>
                      navigate(`/domain/${parsedDomainId}/course/${c.id}`)
                    }
                    className="px-6 py-3 rounded-full font-bold hover:scale-105 transition"
                    style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
                  >
                    {c.title}
                  </button>
                ))}

              {/* COURSE → ENROLL */}
              {isCoursePage && (
                <button
                  onClick={handleEnrollClick}
                  className="px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition"
                  style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
                >
                  Enroll Now
                </button>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
