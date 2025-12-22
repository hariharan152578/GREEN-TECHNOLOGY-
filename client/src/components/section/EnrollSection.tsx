/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { usePageContext } from "../../context/usePageContext";

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
  const { domainId, courseId } = usePageContext();

  const [section, setSection] = useState<EnrollSectionData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [proofImage, setProofImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ---------------- FETCH ENROLL SECTION (CMS) ---------------- */
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/enrollments",
          {
            params: {
              domainId: domainId ?? 0,
              courseId: courseId ?? 0,
            },
          }
        );

        setSection(res.data);
      } catch (error) {
        console.error("Failed to load enroll section", error);
      }
    };

    fetchSection();
  }, [domainId, courseId]);

  /* ---------------- AUTO CARD SLIDE ---------------- */
  useEffect(() => {
    if (!section?.cards?.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % section.cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [section]);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProofImage(e.target.files[0]);
    }
  };

  /* ---------------- SUBMIT ENQUIRY ---------------- */
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
    payload.append("domainId", String(domainId ?? 0));
    payload.append("courseId", String(courseId ?? 0));
    payload.append("proofImage", proofImage);

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/enrollments/request",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
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

        {/* ===== LEFT: IMAGE STACK (CMS) ===== */}
        <div className="relative w-full lg:w-1/2 min-h-[700px]">
          {section.cards.map((card, index) => {
            const position =
              (index - activeIndex + section.cards.length) %
              section.cards.length;

            return (
              <StackCard
                key={card.id}
                title={card.title}
                imageUrl={`http://localhost:5000${card.imageUrl}`}
                position={position}
              />
            );
          })}
        </div>

        {/* ===== RIGHT: ENROLL FORM ===== */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 rounded-[2.5rem] shadow-2xl"
            style={{ backgroundColor: `${COLORS.darkGreen}F2` }}
          >
            <h2 className="text-4xl font-bold mb-4 text-center" style={{ color: COLORS.gold }}>
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
                onChange={handleFileChange}
                className="text-white"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-lg"
                style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
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
  title: string;
  imageUrl: string;
  position: number;
}> = ({ title, imageUrl, position }) => {
  let style = {};

  if (position === 0) style = { x: 0, scale: 1, opacity: 1 };
  else if (position === 1) style = { x: 60, scale: 0.92, opacity: 1 };
  else if (position === 2) style = { x: 120, scale: 0.85, opacity: 0.7 };
  else style = { opacity: 0 };

  return (
    <motion.div
      animate={style}
      transition={{ duration: 0.8 }}
      className="absolute w-[450px] h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white"
    >
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80">
        <h3 className="text-white text-2xl font-bold">{title}</h3>
      </div>
    </motion.div>
  );
};

export default EnrollSection;
