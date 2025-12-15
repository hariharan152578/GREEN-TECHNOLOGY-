import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

// --- Project Data with Images ---
const projects = [
  {
    id: 1,
    title: "Netflix Clone Hosting",
    description: "Host a high-traffic streaming site using S3 for storage and CloudFront for global content delivery.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbona3iDMFMKVhT8ACkE1CpVBRut5Xgh1nnQ&s",
    tech: ["S3", "CloudFront", "Route53"],
  },
  {
    id: 2,
    title: "Serverless Banking API",
    description: "Build a secure payment processing API that scales to zero when not in use.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwCxJXty6yHNsNhYm0HyfVKKUhEjIn0e07vw&s",
    tech: ["Lambda", "API Gateway", "DynamoDB"],
  },
  {
    id: 3,
    title: "Auto-Scaling E-Com App",
    description: "Deploy a fault-tolerant shopping app that handles traffic spikes automatically.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTghCBW4x9YJ5UQfP3I1xhIasJz46FIMVT-qA&s",
    tech: ["EC2", "Auto Scaling", "ALB"],
  },
  {
    id: 4,
    title: "CI/CD Pipeline",
    description: "Automate code deployment from GitHub to Production in minutes using a full DevOps pipeline.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop",
    tech: ["CodePipeline", "Jenkins", "Docker"],
  },
  {
    id: 5,
    title: "Containerized Chat App",
    description: "Orchestrate a real-time chat application using microservices architecture on Kubernetes.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
    tech: ["EKS", "Fargate", "Socket.io"],
  },
  {
    id: 6,
    title: "IoT Data Processor",
    description: "Ingest and process millions of sensor data points in real-time using Kinesis and Lambda.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
    tech: ["IoT Core", "Kinesis", "Redshift"],
  },
];

// --- Card Component ---
const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
  <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col group cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
    
    {/* 1. Full Image Header */}
    <div className="h-48 overflow-hidden relative">
        <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient for text readability if needed, or just style */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-300"></div>
    </div>

    {/* 2. Content Body */}
    <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 line-clamp-1" style={{ color: COLORS.darkGreen }}>
            {project.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-1 line-clamp-3">
            {project.description}
        </p>

        {/* 3. Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t, i) => (
                <span 
                    key={i} 
                    className="text-[10px] font-bold px-3 py-1 rounded-full border bg-gray-50"
                    style={{ borderColor: `${COLORS.darkGreen}20`, color: COLORS.darkGreen }}
                >
                    {t}
                </span>
            ))}
        </div>

        {/* 4. Action Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-bold uppercase tracking-wider" style={{ color: COLORS.gold }}>
            <span>View Case Study</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
    </div>
  </div>
);

// --- Main Section Component ---
const ProjectsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive Logic
  useEffect(() => {
    const handleResize = () => {
      const newItems = window.innerWidth < 768 ? 1 : 3;
      setItemsPerPage(newItems);
      setCurrentIndex(0); // Reset to start
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Auto-Cycle Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Slice visible items
  const visibleProjects = projects.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section 
      className="relative w-full py-24 px-6 md:px-20 overflow-hidden" 
      style={{ backgroundColor: COLORS.darkGreen }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#B99A49] opacity-[0.05] rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#B99A49] opacity-[0.03] rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-start mb-16 text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: COLORS.cream }}>
            During the course, you will work on these projects
          </h2>
          <div className="w-24 h-1.5 rounded-full mb-4" style={{ backgroundColor: COLORS.gold }}></div>
          <p className="text-base opacity-80 max-w-2xl" style={{ color: COLORS.cream }}>
            Gain practical experience by building real-world, enterprise-grade applications from scratch.
          </p>
        </div>

        {/* Carousel Grid */}
        <div className="relative min-h-[500px]"> 
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div 
                    key={currentIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction < 0 ? 50 : -50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
                    className={`grid gap-8 absolute w-full ${
                        itemsPerPage === 1 ? 'grid-cols-1' : 'md:grid-cols-3'
                    }`}
                >
                    {visibleProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 gap-3">
            {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                        idx === currentIndex 
                            ? "bg-[#B99A49] w-8" 
                            : "bg-white/20 hover:bg-white/40 w-3"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;