/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";

/* ---------------- COLORS ---------------- */
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

/* ---------------- TYPES ---------------- */
interface EnrollCard {
  id: number;
  title: string;
  imageUrl: string;
  order: number;
}

interface EnrollSectionData {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  cards: EnrollCard[];
}

/* ---------------- COMPONENT ---------------- */
const EnrollSection: React.FC = () => {
  /** 🔥 URL IS SOURCE OF TRUTH (LIKE HERO) */
  const { domainId, courseId } = useParams();

  const parsedDomainId = Number(domainId) || 0;
  const parsedCourseId = Number(courseId) || 0;

  const [section, setSection] = useState<EnrollSectionData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [proofImage, setProofImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ---------------- FETCH ENROLL SECTION ---------------- */
  useEffect(() => {
    let mounted = true;

    const fetchSection = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/enrollments",
          {
            params: {
              domainId: parsedDomainId,
              courseId: parsedCourseId,
            },
          }
        );

        if (mounted) {
          setSection(res.data);
          setActiveIndex(0);
        }
      } catch (error) {
        console.error("Failed to load enroll section", error);
      }
    };

    fetchSection();

    return () => {
      mounted = false;
    };
  }, [parsedDomainId, parsedCourseId]);

  /* ---------------- SORT CARDS ---------------- */
  const cards = useMemo(() => {
    if (!section?.cards) return [];
    return [...section.cards].sort((a, b) => a.order - b.order);
  }, [section]);

  /* ---------------- AUTO SLIDER ---------------- */
  useEffect(() => {
    if (!cards.length || paused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [cards, paused]);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!proofImage) {
      alert("Please upload proof image");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("course", formData.course);
    payload.append("domainId", String(parsedDomainId));
    payload.append("courseId", String(parsedCourseId));
    payload.append("proofImage", proofImage);

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/enrollments/request",
        payload
      );

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", course: "" });
      setProofImage(null);
    } catch (error) {
      alert("Enrollment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!section) return null;

  /* ---------------- UI ---------------- */
  return (
    <section className="relative w-full py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-24">

        {/* ===== LEFT: IMAGE STACK ===== */}
        <div
          className="relative w-full lg:w-1/2 min-h-[700px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence>
            {cards.map((card, index) => {
              const position =
                (index - activeIndex + cards.length) % cards.length;

              return (
                <StackCard
                  key={card.id}
                  card={card}
                  position={position}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* ===== RIGHT: FORM ===== */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 rounded-[2.5rem] shadow-2xl"
            style={{ backgroundColor: `${COLORS.darkGreen}F2` }}
          >
            <h2
              className="text-4xl font-bold mb-4 text-center"
              style={{ color: COLORS.gold }}
            >
              {section.title}
            </h2>

            <p className="text-center mb-8 text-white/80">
              {section.description}
            </p>

            {success && (
              <p className="text-green-400 text-center mb-6 font-semibold">
                ✅ Enquiry submitted successfully
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl"
                style={{ backgroundColor: COLORS.cream }}
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl"
                style={{ backgroundColor: COLORS.cream }}
              />

              <input
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl"
                style={{ backgroundColor: COLORS.cream }}
              />

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-xl"
                style={{ backgroundColor: COLORS.cream }}
              >
                <option value="">Select Course</option>
                <option value="devops">DevOps</option>
                <option value="aws">AWS</option>
                <option value="linux">Linux</option>
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProofImage(e.target.files?.[0] || null)
                }
                className="text-white"
              />

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-lg"
                style={{
                  backgroundColor: COLORS.gold,
                  color: COLORS.darkGreen,
                }}
              >
                {loading ? "Submitting..." : section.ctaText}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- STACK CARD ---------------- */
const StackCard: React.FC<{
  card: EnrollCard;
  position: number;
}> = ({ card, position }) => {
  const variants = [
    { x: 0, scale: 1, opacity: 1, zIndex: 3 },
    { x: 60, scale: 0.92, opacity: 1, zIndex: 2 },
    { x: 120, scale: 0.85, opacity: 0.7, zIndex: 1 },
  ];

  const style = variants[position] || { opacity: 0 };

  return (
    <motion.div
      animate={style}
      transition={{ duration: 0.8 }}
      className="absolute w-[450px] h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white"
    >
      <img
        src={`http://localhost:5000${card.imageUrl}`}
        alt={card.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80">
        <h3 className="text-white text-2xl font-bold">
          {card.title}
        </h3>
      </div>
    </motion.div>
  );
};

export default EnrollSection;
