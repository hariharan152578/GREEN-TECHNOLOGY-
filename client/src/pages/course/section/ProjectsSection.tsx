import React from "react";
import { motion } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
};

// --- Project Data (AWS/DevOps Focus) ---
const projects = [
  {
    id: 1,
    title: "Netflix Clone Hosting",
    description: "Host a high-traffic streaming site using S3 for storage and CloudFront for global content delivery.",
    icon: "🎬",
    tech: ["S3", "CloudFront", "Route53"],
  },
  {
    id: 2,
    title: "Serverless Banking API",
    description: "Build a secure payment processing API that scales to zero when not in use.",
    icon: "💳",
    tech: ["Lambda", "API Gateway", "DynamoDB"],
  },
  {
    id: 3,
    title: "Auto-Scaling E-Com App",
    description: "Deploy a fault-tolerant shopping app that handles traffic spikes automatically.",
    icon: "🛒",
    tech: ["EC2", "Auto Scaling", "Load Balancer"],
  },
  {
    id: 4,
    title: "CI/CD Pipeline",
    description: "Automate code deployment from GitHub to Production in minutes, not hours.",
    icon: "🚀",
    tech: ["CodePipeline", "Jenkins", "Docker"],
  },
  {
    id: 5,
    title: "Containerized Chat App",
    description: "Orchestrate a real-time chat application using microservices architecture.",
    icon: "💬",
    tech: ["ECS / EKS", "Fargate", "Socket.io"],
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ProjectsSection: React.FC = () => {
  return (
    <section 
      className="relative w-full py-24 px-6 md:px-10 overflow-hidden" 
      style={{ backgroundColor: COLORS.darkGreen }}
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- HEADER (Matches Wireframe "PROJECTS" Box) --- */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="px-10 py-4 rounded-lg shadow-lg"
            style={{ backgroundColor: COLORS.gold }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase" style={{ color: COLORS.darkGreen }}>
              Live Projects
            </h2>
          </motion.div>
        </div>

        {/* --- 5-COLUMN CARD GRID --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -15 }}
              className="relative h-[380px] rounded-2xl p-6 flex flex-col justify-between overflow-hidden group transition-all duration-300"
              style={{ backgroundColor: COLORS.cream }}
            >
              
              {/* Top Content */}
              <div>
                {/* Icon Circle */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
                >
                  {project.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 leading-tight" style={{ color: COLORS.darkGreen }}>
                  {project.title}
                </h3>
                
                <p className="text-sm opacity-80 leading-relaxed" style={{ color: COLORS.darkGreen }}>
                  {project.description}
                </p>
              </div>

              {/* Bottom Content (Tech Tags) */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-bold px-2 py-1 rounded border opacity-70"
                      style={{ borderColor: COLORS.darkGreen, color: COLORS.darkGreen }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Hover Button */}
                <button 
                  className="w-full py-2 rounded-lg font-bold text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  style={{ backgroundColor: COLORS.darkGreen, color: COLORS.gold }}
                >
                  View Case Study
                </button>
              </div>

              {/* Decorative Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Scroll Hint (Optional) */}
        <p className="text-center mt-8 text-sm opacity-50 md:hidden" style={{ color: COLORS.cream }}>
          Swipe to see more projects →
        </p>

      </div>
    </section>
  );
};

export default ProjectsSection;