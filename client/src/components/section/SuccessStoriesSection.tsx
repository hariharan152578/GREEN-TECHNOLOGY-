/* eslint-disable no-irregular-whitespace */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

/* ---------------- CONFIG ---------------- */
const API_BASE_URL = "http://localhost:5000";

/* ---------------- COLORS ---------------- */
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

/* ---------------- TYPES ---------------- */
interface StudentCardProps {
  id: number;
  name: string;
  course: string;
  rating: number;
  review: string;
  image?: string;
  placement?: string;
  duration?: string;
}

/* ---------------- CARD ---------------- */
const StudentFlipCard: React.FC<StudentCardProps> = ({
  name,
  course,
  rating,
  review,
  image,
  placement,
  duration = "6 months",
}) => {
  const [hover, setHover] = useState(false);

  const stars = (color: string, empty: string) =>
    Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-4 h-4" fill={i < rating ? color : empty} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

  return (
    <div
      className="w-full h-[450px] perspective-1000"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        animate={{ rotateY: hover ? 180 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-full preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-xl backface-hidden">
          <div className="h-28 bg-gradient-to-b from-[#01311F] to-[#014f32]" />
          <div className="-mt-16 flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 overflow-hidden bg-white border-[#B99A49]">
              {image ? (
                <img
                  src={`${API_BASE_URL}${image}`}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/no-image.png")}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-4xl font-bold text-[#01311F]">
                  {name[0]}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-[#01311F]">{name}</h3>
            <p className="text-xs uppercase opacity-70">{course}</p>

            <div className="flex justify-center gap-1 my-4">
              {stars(COLORS.gold, "#ddd")}
            </div>

            <div className="flex justify-between mt-6 border-t pt-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Duration</p>
                <p className="font-bold">{duration}</p>
              </div>
              {placement && (
                <div>
                  <p className="text-gray-400 text-xs">Placed At</p>
                  <p className="font-bold text-[#B99A49]">{placement}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center p-8 text-center backface-hidden"
          style={{ backgroundColor: COLORS.gold, transform: "rotateY(180deg)" }}
        >
          <p className="italic text-lg">"{review}"</p>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- MAIN ---------------- */
const StudentSuccessStories: React.FC<{ domainId?: number; courseId?: number }> = ({
  domainId = 0,
  courseId = 0,
}) => {
  const [students, setStudents] = useState<StudentCardProps[]>([]);
  const [index, setIndex] = useState(0);
  const itemsPerPage = window.innerWidth < 768 ? 1 : 3;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/student-success`, {
        params: { domainId, courseId },
      })
      .then((res) => setStudents(res.data))
      .catch(console.error);
  }, [domainId, courseId]);

  const totalPages = Math.ceil(students.length / itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const visible = students.slice(
    index * itemsPerPage,
    index * itemsPerPage + itemsPerPage
  );

  if (!students.length) return null;

  return (
    <section className="py-24 px-6" style={{ backgroundColor: COLORS.darkGreen }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#B99A49] mb-12">
          Student Success Stories
        </h2>

        <div className="relative min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-8 ${
                itemsPerPage === 1 ? "grid-cols-1" : "md:grid-cols-3"
              }`}
            >
              {visible.map((s) => (
                <StudentFlipCard key={s.id} {...s} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default StudentSuccessStories;
