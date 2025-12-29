/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";
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

  /* ---------------- DATA FETCHING ---------------- */
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/domain`).then(res => setDomains(res.data));
  }, []);

  useEffect(() => {
    if (!selectedDomainId) {
      setCourses([]);
      return;
    }
    axios.get(`${API_BASE_URL}/api/courses`, { params: { domainId: selectedDomainId } })
      .then(res => setCourses(res.data));
  }, [selectedDomainId]);

  useEffect(() => {
    if (!selectedDomainId) {
      setCards([]);
      return;
    }
    axios.get(`${API_BASE_URL}/api/enroll-cards`, { params: { domainId: selectedDomainId, courseId: selectedCourseId || 0 } })
      .then(res => { 
        setCards(res.data); 
        setActiveIndex(0); 
      });
  }, [selectedDomainId, selectedCourseId]);

  const sortedCards = useMemo(() => [...cards].sort((a, b) => a.order - b.order), [cards]);

  useEffect(() => {
    if (!sortedCards.length || paused) return;
    const timer = setInterval(() => setActiveIndex(i => (i + 1) % sortedCards.length), 4000);
    return () => clearInterval(timer);
  }, [sortedCards, paused]);

  /* ---------------- FORM SUBMISSION ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Strict Validation
    if (!selectedDomainId || !selectedCourseId) {
      return alert("Please select both a Domain and a Course.");
    }
    if (!proofImage) {
      return alert("Please upload your payment receipt image.");
    }

    const payload = new FormData();
    // These keys must match the destructuring in your controller
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("domainId", String(selectedDomainId));
    payload.append("courseId", String(selectedCourseId));
    payload.append("file", proofImage); // Matches uploadEnrollmentProof.single("file")

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/enrollments/request`, payload);
      setSuccess(true);
      
      // Reset logic
      setFormData({ name: "", email: "", phone: "" });
      setProofImage(null);
      setSelectedCourseId(0);
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Submission failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-16 px-4 sm:px-10 lg:px-20 bg-[#fbfaf8]">
      <div className="absolute inset-0 bg-[#01311F] h-[40%] w-full pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)' }} />

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
                const position = (index - activeIndex + sortedCards.length) % sortedCards.length;
                return <AnimatedStackCard key={card.id} card={card} position={position} />;
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
                className={`h-1.5 rounded-full transition-colors duration-300 ${i === activeIndex ? "bg-[#B99A49]" : "bg-gray-300"}`} 
              />
            ))}
          </div>
        </div>

        {/* RIGHT: COMPACT FORM */}
        <div className="w-full lg:w-[450px] xl:w-[480px]">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-[#01311F] p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 relative overflow-hidden"
          >
            <header className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#B99A49] tracking-tight">Enrollment Form</h2>
              <p className="text-cream/60 text-sm mt-1">Complete the details to start your course.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                placeholder="Full Name" 
                value={formData.name} 
                onChange={(v) => setFormData({...formData, name: v})} 
                required 
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="Email" 
                  type="email" 
                  value={formData.email} 
                  onChange={(v) => setFormData({...formData, email: v})} 
                  required 
                />
                <Input 
                  placeholder="Phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={(v) => setFormData({...formData, phone: v})} 
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select 
                  value={selectedDomainId} 
                  options={domains.map(d => ({ label: d.domain, value: d.id }))} 
                  onChange={(v) => { setSelectedDomainId(Number(v)); setSelectedCourseId(0); }} 
                  label="Select Domain" 
                />
                <Select 
                  value={selectedCourseId} 
                  options={courses.map(c => ({ label: c.title, value: c.id }))} 
                  onChange={(v) => setSelectedCourseId(Number(v))} 
                  disabled={!courses.length} 
                  label={selectedDomainId ? "Select Course" : "Choose Domain First"} 
                />
              </div>

              <div className="pt-2">
                <label className="text-[10px] text-[#B99A49] font-bold uppercase tracking-[0.2em] mb-2 block ml-1">Payment Receipt</label>
                <label className="flex items-center justify-center w-full py-3 px-4 border-2 border-dashed border-white/10 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-all text-cream/70 text-sm">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => setProofImage(e.target.files?.[0] || null)} 
                  />
                  <span className="truncate">{proofImage ? proofImage.name : "Upload Receipt Image"}</span>
                </label>
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full mt-4 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-black/20 disabled:opacity-50"
                style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
              >
                {loading ? "Processing..." : "Submit Application"}
              </motion.button>

              <AnimatePresence>
                {success && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 text-center text-xs font-bold pt-2">
                    ✓ Enrollment submitted for review!
                  </motion.p>
                )}
                {error && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-center text-xs font-bold pt-2">
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- HELPERS ---------------- */

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

const Input = ({ onChange, ...props }: InputProps) => (
  <input 
    {...props} 
    onChange={e => onChange(e.target.value)} 
    className="w-full px-5 py-3.5 rounded-xl bg-[#F0ECE3] text-[#01311F] text-sm font-medium outline-none border-2 border-transparent focus:border-[#B99A49] transition-all placeholder:text-gray-400" 
  />
);

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: Array<{ label: string; value: number }>;
  label: string;
  onChange: (value: string) => void;
}

const Select = ({ options, label, onChange, ...props }: SelectProps) => (
  <select 
    {...props} 
    onChange={e => onChange(e.target.value)} 
    className="w-full px-4 py-3.5 rounded-xl bg-[#F0ECE3] text-[#01311F] text-sm font-medium outline-none cursor-pointer disabled:opacity-50"
  >
    <option value="">{label}</option>
    {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
  </select>
);

const AnimatedStackCard: React.FC<{ card: EnrollCard; position: number; }> = ({ card, position }) => {
  const variants: Record<number, { x: number; y: number; scale: number; zIndex: number; opacity: number; rotate: number }> = {
    0: { x: 0, y: 0, scale: 1, zIndex: 30, opacity: 1, rotate: 0 },
    1: { x: 30, y: -20, scale: 0.94, zIndex: 20, opacity: 0.8, rotate: 2 },
    2: { x: 60, y: -40, scale: 0.88, zIndex: 10, opacity: 0.4, rotate: 4 },
  };
  const currentStyle = variants[position] || { x: 100, opacity: 0, scale: 0.8, zIndex: 0, y: 0, rotate: 0 };

  return (
    <motion.div
      animate={currentStyle}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute inset-0 rounded-[2rem] border-[8px] border-white shadow-2xl overflow-hidden bg-white"
    >
      <img src={`${API_BASE_URL}${card.image}`} alt={card.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex items-end p-6">
        <h3 className="text-white text-lg font-bold leading-tight tracking-tight">{card.title}</h3>
      </div>
    </motion.div>
  );
};

export default EnrollSection;