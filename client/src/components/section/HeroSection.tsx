// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// import { safeGet } from "../../util/safeGet";
// import LoadingPage from "../LoadingPage";
// import logo from "../../assets/Greens.png";

// /* ---------------- CONFIG ---------------- */
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// /* ---------------- TYPES ---------------- */
// interface RunningText {
//   text: string;
// }

// interface HeroData {
//   title: string;
//   subtitle: string;
//   description: string;
//   images: string[];
//   runningTexts: RunningText[];
// }

// interface Domain {
//   id: number;
//   domain: string;
// }

// interface Course {
//   id: number;
//   domainId: number;
//   title: string;
// }

// /* ---------------- COLORS ---------------- */
// const COLORS = {
//   darkGreen: "#01311F",
//   gold: "#B99A49",
//   cream: "#F0ECE3",
//   white: "#FFFFFF",
// };

// const HeroSection: React.FC = () => {
//   const navigate = useNavigate();
//   const { domainId, courseId } = useParams();

//   /* ---------------- PAGE TYPE ---------------- */
//   const isLandingPage = !domainId;
//   const isDomainPage = !!domainId && !courseId;
//   const isCoursePage = !!domainId && !!courseId;

//   const parsedDomainId = domainId ? Number(domainId) : undefined;
//   const parsedCourseId = courseId ? Number(courseId) : undefined;

//   /* ---------------- STATE ---------------- */
//   const [heroData, setHeroData] = useState<HeroData | null>(null);
//   const [domains, setDomains] = useState<Domain[]>([]);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [current, setCurrent] = useState(0);
//   const [loading, setLoading] = useState(true);

//   /* ---------------- FETCH HERO (SAFE) ---------------- */
//   useEffect(() => {
//     let mounted = true;

//     const fetchHero = async () => {
//       setLoading(true);

//       // 1️⃣ Try requested hero
//       let data = await safeGet<HeroData>(
//         `${API_BASE_URL}/api/hero`,
//         {
//           domainId: parsedDomainId,
//           courseId: parsedCourseId,
//         }
//       );

//       // 2️⃣ Fallback → landing hero
//       if (!data) {
//         data = await safeGet<HeroData>(
//           `${API_BASE_URL}/api/hero`,
//           { domainId: 0, courseId: 0 }
//         );
//       }

//       if (mounted) {
//         setHeroData(data);
//         setLoading(false);
//       }
//     };

//     fetchHero();
//     return () => {
//       mounted = false;
//     };
//   }, [parsedDomainId, parsedCourseId]);

//   /* ---------------- FETCH DOMAINS (LANDING) ---------------- */
//   useEffect(() => {
//     if (!isLandingPage) return;

//     safeGet<Domain[]>(`${API_BASE_URL}/api/domain`)
//       .then(data => setDomains(data ?? []));
//   }, [isLandingPage]);

//   /* ---------------- FETCH COURSES (DOMAIN) ---------------- */
//   useEffect(() => {
//     if (!isDomainPage || !parsedDomainId) return;

//     safeGet<Course[]>(
//       `${API_BASE_URL}/api/courses`,
//       { domainId: parsedDomainId }
//     ).then(data => setCourses(data ?? []));
//   }, [isDomainPage, parsedDomainId]);

//   /* ---------------- SLIDER ---------------- */
//   const images = heroData?.images ?? [];
//   const runningTexts = heroData?.runningTexts ?? [];

//   useEffect(() => {
//     if (!images.length) return;

//     const interval = setInterval(() => {
//       setCurrent(prev => (prev + 1) % images.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   /* ---------------- ENROLL HANDLER ---------------- */
//   const handleEnrollClick = () => {
//     window.dispatchEvent(new Event("open-enrolment"));
//   };

//   /* ---------------- GUARDS ---------------- */
//   if (loading) return <LoadingPage />;

//   if (!heroData || !images.length) {
//     return (
//       <div className="h-[60vh] flex items-center justify-center text-gray-400">
//         Hero content unavailable
//       </div>
//     );
//   }

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="relative w-full flex flex-col font-sans">

//       {/* RUNNING TEXT */}
//       {runningTexts.length > 0 && (
//         <div
//           className="w-full py-2 overflow-hidden whitespace-nowrap"
//           style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
//         >
//           <motion.div
//             animate={{ x: [1000, -1000] }}
//             transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
//             className="font-bold text-sm flex gap-8"
//           >
//             {runningTexts.map((item, index) => (
//               <React.Fragment key={index}>
//                 <span>{item.text}</span>
//                 <span>•</span>
//               </React.Fragment>
//             ))}
//           </motion.div>
//         </div>
//       )}

//       {/* HERO SLIDER */}
//       <div className="relative w-full h-[90vh] overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={current}
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.2 }}
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: `url(${API_BASE_URL}${images[current]})`,
//             }}
//           >
//             <div
//               className="absolute inset-0 opacity-50"
//               style={{ backgroundColor: COLORS.darkGreen }}
//             />
//           </motion.div>
//         </AnimatePresence>

//         {/* CONTENT */}
//         <div className="relative z-10 h-full flex items-center px-6 md:px-20">
//           <div className="w-full md:w-2/3">

//             <motion.img
//               src={logo}
//               alt="Logo"
//               className="w-40 mb-6"
//               animate={{ rotateY: 360 }}
//               transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
//             />

//             <h1 className="text-4xl md:text-6xl font-bold text-[#F0ECE3] mb-4">
//               {heroData.title}
//             </h1>

//             <p className="text-lg text-[#F0ECE3] mb-8">
//               {heroData.description}
//             </p>

//             {/* SMART CTA */}
//             <div className="flex flex-wrap gap-4">

//               {/* LANDING → DOMAINS */}
//               {isLandingPage &&
//                 domains.map(d => (
//                   <button
//                     key={d.id}
//                     onClick={() => navigate(`/domain/${d.id}`)}
//                     className="px-6 py-3 rounded-full font-bold hover:scale-105 transition"
//                     style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
//                   >
//                     {d.domain}
//                   </button>
//                 ))}

//               {/* DOMAIN → COURSES */}
//               {isDomainPage &&
//                 courses.map(c => (
//                   <button
//                     key={c.id}
//                     onClick={() =>
//                       navigate(`/domain/${parsedDomainId}/course/${c.id}`)
//                     }
//                     className="px-6 py-3 rounded-full font-bold hover:scale-105 transition"
//                     style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
//                   >
//                     {c.title}
//                   </button>
//                 ))}

//               {/* COURSE → ENROLL */}
//               {isCoursePage && (
//                 <button
//                   onClick={handleEnrollClick}
//                   className="px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition"
//                   style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
//                 >
//                   Enroll Now
//                 </button>
//               )}

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { safeGet } from "../../util/safeGet";
import LoadingPage from "../LoadingPage";
import logo from "../../assets/Greens.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { domainId, courseId } = useParams();
  const [heroData, setHeroData] = useState<any>(null);
  const [domains, setDomains] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const isLandingPage = !domainId;
  const isDomainPage = !!domainId && !courseId;
  const isCoursePage = !!domainId && !!courseId;
  const parsedDomainId = domainId ? Number(domainId) : undefined;
  const parsedCourseId = courseId ? Number(courseId) : undefined;

  useEffect(() => {
    let mounted = true;
    const fetchHero = async () => {
      setLoading(true);
      let data = await safeGet<any>(`${API_BASE_URL}/api/hero`, { domainId: parsedDomainId, courseId: parsedCourseId });
      if (!data) data = await safeGet<any>(`${API_BASE_URL}/api/hero`, { domainId: 0, courseId: 0 });
      if (mounted) { setHeroData(data); setLoading(false); }
    };
    fetchHero();
    return () => { mounted = false; };
  }, [parsedDomainId, parsedCourseId]);

  useEffect(() => {
    if (isLandingPage) safeGet<any[]>(`${API_BASE_URL}/api/domain`).then(setDomains);
    if (isDomainPage && parsedDomainId) safeGet<any[]>(`${API_BASE_URL}/api/courses`, { domainId: parsedDomainId }).then(setCourses);
  }, [isLandingPage, isDomainPage, parsedDomainId]);

  useEffect(() => {
    if (!heroData?.images?.length) return;
    const interval = setInterval(() => setCurrent(p => (p + 1) % heroData.images.length), 6000);
    return () => clearInterval(interval);
  }, [heroData]);

  if (loading) return <LoadingPage />;

  return (
    <div className="relative w-full overflow-hidden bg-[#012618]">
      
      {/* 1. ELEGANT RUNNING STRIP */}
      {heroData?.runningTexts?.length > 0 && (
        <div className="w-full py-2 bg-[#B99A49] relative z-30 shadow-md">
          <div className="flex whitespace-nowrap overflow-hidden">
            <motion.div 
              animate={{ x: [0, -1000] }} 
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-12 items-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#01311F]"
            >
              {[...heroData.runningTexts, ...heroData.runningTexts].map((item, i) => (
                <span key={i} className="flex items-center gap-12">
                  {item.text} <span>•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* 2. HERO SLIDER WITH KEN BURNS EFFECT */}
      <div className="relative w-full h-[85vh] md:h-[90vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${API_BASE_URL}${heroData?.images[current]})` }}
          >
            {/* Multi-layered Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#01311F]/90 via-[#01311F]/60 to-transparent" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* 3. CONTENT AREA */}
        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-20 lg:px-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="h-[2px] w-12 bg-[#B99A49]" />
               <span className="text-[#B99A49] font-bold tracking-[0.4em] text-xs uppercase">Premium Training</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 drop-shadow-2xl">
              {heroData.title.split(' ').map((word: string, i: number) => (
                <span key={i} className={i === 1 ? "text-[#B99A49]" : ""}>{word} </span>
              ))}
            </h1>

            <p className="text-lg md:text-xl text-[#F0ECE3]/80 mb-10 leading-relaxed max-w-xl font-light">
              {heroData.description}
            </p>

            {/* 4. DYNAMIC BUTTON GRID */}
            <div className="flex flex-wrap gap-4">
              {isLandingPage && domains.map(d => (
                <button
                  key={d.id}
                  onClick={() => navigate(`/domain/${d.id}`)}
                  className="px-8 py-3 rounded-md font-bold text-sm uppercase tracking-widest border border-[#B99A49]/30 bg-white/5 backdrop-blur-md text-white hover:bg-[#B99A49] hover:text-[#01311F] transition-all duration-300 transform hover:-translate-y-1"
                >
                  {d.domain}
                </button>
              ))}

              {isDomainPage && courses.map(c => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/domain/${parsedDomainId}/course/${c.id}`)}
                  className="px-8 py-3 rounded-md font-bold text-sm uppercase tracking-widest border border-[#B99A49]/30 bg-white/5 backdrop-blur-md text-white hover:bg-[#B99A49] hover:text-[#01311F] transition-all duration-300"
                >
                  {c.title}
                </button>
              ))}

              {isCoursePage && (
                <button
                  onClick={() => window.dispatchEvent(new Event("open-enrolment"))}
                  className="px-12 py-5 bg-[#B99A49] text-[#01311F] rounded-sm font-black text-lg uppercase tracking-tighter shadow-[0_10px_30px_rgba(185,154,73,0.3)] hover:scale-105 transition-all"
                >
                  Start Your Journey →
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* 5. SLIDER INDICATORS */}
        <div className="absolute bottom-10 right-10 z-30 flex gap-3">
          {heroData.images.map((_: any, i: number) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 ${current === i ? "w-12 bg-[#B99A49]" : "w-4 bg-white/30"}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;