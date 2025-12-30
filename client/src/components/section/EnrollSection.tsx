/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.API_BASE_URL;
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

/* ---------------- TYPES ---------------- */
interface EnrollCard { id: number; title: string; image: string; order: number; }
interface Domain { id: number; domain: string; }
interface Course { id: number; domainId: number; title: string; }

const EnrollSection: React.FC = () => {
  const { domainId } = useParams();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [cards, setCards] = useState<EnrollCard[]>([]);

  const [selectedDomainId, setSelectedDomainId] = useState(Number(domainId) || 0);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- DATA FETCHING (SAFE) ---------------- */

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/domain`)
      .then(res => {
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
        setDomains(list);
      })
      .catch(() => setDomains([]));
  }, []);

  useEffect(() => {
    if (!selectedDomainId) {
      setCourses([]);
      return;
    }

    axios.get(`${API_BASE_URL}/api/courses`, {
      params: { domainId: selectedDomainId }
    })
      .then(res => {
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
        setCourses(list);
      })
      .catch(() => setCourses([]));
  }, [selectedDomainId]);

  useEffect(() => {
    if (!selectedDomainId) {
      setCards([]);
      return;
    }

    axios.get(`${API_BASE_URL}/api/enroll-cards`, {
      params: {
        domainId: selectedDomainId || 0,
        courseId: selectedCourseId || 0,
      }
    })
      .then(res => {
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
        setCards(list);
        setActiveIndex(0);
      })
      .catch(() => setCards([]));
  }, [selectedDomainId, selectedCourseId]);

  /* ---------------- CARD LOGIC ---------------- */

  const sortedCards = useMemo(
    () => [...cards].sort((a, b) => a.order - b.order),
    [cards]
  );

  useEffect(() => {
    if (!sortedCards.length || paused) return;
    const timer = setInterval(
      () => setActiveIndex(i => (i + 1) % sortedCards.length),
      4000
    );
    return () => clearInterval(timer);
  }, [sortedCards, paused]);

  /* ---------------- FORM SUBMISSION ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedDomainId || !selectedCourseId) {
      return alert("Please select both a Domain and a Course.");
    }
    if (!proofImage) {
      return alert("Please upload your payment receipt image.");
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("domainId", String(selectedDomainId));
    payload.append("courseId", String(selectedCourseId));
    payload.append("file", proofImage);

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/enrollments/request`, payload);
      setSuccess(true);

      setFormData({ name: "", email: "", phone: "" });
      setProofImage(null);
      setSelectedCourseId(0);

      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Submission failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-16 px-4 sm:px-10 lg:px-20 bg-[#fbfaf8]">
      <div className="absolute inset-0 bg-[#01311F] h-[40%] w-full pointer-events-none"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 100%)" }} />

      <div className="relative z-10 max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* LEFT: VISUAL STACK */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-10">
          <div
            className="relative w-[260px] h-[360px] sm:w-[320px] sm:h-[440px] lg:w-[380px] lg:h-[520px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {sortedCards.length > 0 ? (
              sortedCards.map((card, index) => {
                const position =
                  (index - activeIndex + sortedCards.length) %
                  sortedCards.length;
                return (
                  <AnimatedStackCard
                    key={card.id}
                    card={card}
                    position={position}
                  />
                );
              })
            ) : (
              <div className="absolute inset-0 flex items-center justify-center border-4 border-dashed border-gray-300 rounded-[2rem] text-gray-400 font-medium text-center px-4">
                Select a domain to preview your journey
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {sortedCards.map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === activeIndex ? 32 : 8 }}
                className={`h-1.5 rounded-full ${
                  i === activeIndex ? "bg-[#B99A49]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="w-full lg:w-[450px] xl:w-[480px]">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-[#01311F] p-8 sm:p-10 rounded-[2rem]"
          >
            <form onSubmit={handleSubmit} className="space-y-4">

              <Input placeholder="Full Name" value={formData.name}
                onChange={(v) => setFormData({ ...formData, name: v })} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Email" type="email"
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })} />
                <Input placeholder="Phone"
                  value={formData.phone}
                  onChange={(v) => setFormData({ ...formData, phone: v })} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  value={selectedDomainId}
                  options={domains.map(d => ({ label: d.domain, value: d.id }))}
                  onChange={(v) => { setSelectedDomainId(+v); setSelectedCourseId(0); }}
                  label="Select Domain"
                />
                <Select
                  value={selectedCourseId}
                  options={courses.map(c => ({ label: c.title, value: c.id }))}
                  onChange={(v) => setSelectedCourseId(+v)}
                  disabled={!courses.length}
                  label={selectedDomainId ? "Select Course" : "Choose Domain First"}
                />
              </div>

              <button
                disabled={loading}
                className="w-full mt-4 py-4 rounded-xl font-bold"
                style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
              >
                {loading ? "Processing..." : "Submit Application"}
              </button>

              <AnimatePresence>
                {success && <p className="text-green-400 text-center text-xs">✓ Submitted!</p>}
                {error && <p className="text-red-400 text-center text-xs">{error}</p>}
              </AnimatePresence>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- HELPERS ---------------- */

const Input = ({ onChange, ...props }: any) => (
  <input {...props}
    onChange={e => onChange(e.target.value)}
    className="w-full px-5 py-3.5 rounded-xl bg-[#F0ECE3]" />
);

const Select = ({ options, label, onChange, ...props }: any) => (
  <select {...props}
    onChange={e => onChange(e.target.value)}
    className="w-full px-4 py-3.5 rounded-xl bg-[#F0ECE3]">
    <option value="">{label}</option>
    {options.map((opt: any) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

const AnimatedStackCard = ({ card, position }: any) => {
  const styles: any = {
    0: { scale: 1, zIndex: 30 },
    1: { scale: 0.94, zIndex: 20 },
    2: { scale: 0.88, zIndex: 10 },
  };
  return (
    <motion.div animate={styles[position] || { opacity: 0 }}
      className="absolute inset-0 rounded-[2rem] overflow-hidden">
      <img src={`${API_BASE_URL}${card.image}`} className="w-full h-full object-cover" />
    </motion.div>
  );
};

export default EnrollSection;
