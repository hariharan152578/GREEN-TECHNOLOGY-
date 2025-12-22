import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
  silver: "#E5E5E5",
};

// --- AWS Course Content Data ---
const modules = [
  {
    id: 1,
    title: "Intro to Cloud & AWS",
    description: "Understand the fundamentals of Cloud Computing, AWS Global Infrastructure, and setting up your Free Tier account.",
    topics: ["Cloud Concepts", "Global Infrastructure", "AWS Free Tier Setup", "Shared Responsibility Model"],
  },
  {
    id: 2,
    title: "Identity (IAM)",
    description: "Master security best practices. Learn how to manage users, groups, and roles to secure your AWS environment.",
    topics: ["Users & Groups", "IAM Policies", "Multi-Factor Authentication (MFA)", "Roles & Permissions"],
  },
  {
    id: 3,
    title: "EC2 (Compute)",
    description: "Launch and manage virtual servers in the cloud. Learn about instance types, security groups, and key pairs.",
    topics: ["Launching Instances", "Security Groups", "Elastic IPs", "Load Balancers (ELB)"],
  },
  {
    id: 4,
    title: "S3 (Storage)",
    description: "Deep dive into object storage. Learn how to store and retrieve any amount of data from anywhere.",
    topics: ["Buckets & Objects", "Versioning", "Storage Classes", "Static Website Hosting"],
  },
  {
    id: 5,
    title: "VPC (Networking)",
    description: "Build your own isolated virtual network. Control your network environment, including IP address ranges and subnets.",
    topics: ["Subnets & Route Tables", "Internet Gateways", "NAT Gateways", "VPC Peering"],
  },
  {
    id: 6,
    title: "Serverless (Lambda)",
    description: "Run code without provisioning or managing servers. Build event-driven applications using AWS Lambda.",
    topics: ["Lambda Functions", "API Gateway Integration", "Serverless Architecture", "CloudWatch Logs"],
  },
];

const ModulesSection: React.FC = () => {
  const [activeModule, setActiveModule] = useState(modules[0]);

  return (
    <section className="relative w-full py-16 md:py-20 px-4 md:px-20 overflow-hidden" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-12">
           <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-3 md:mb-4" style={{ color: COLORS.darkGreen }}>
             AWS Solution Architect Curriculum
           </h2>
           <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto" style={{ color: COLORS.darkGreen }}>
             A comprehensive deep-dive into the modules designed for certification.
           </p>
        </div>

        {/* === MAIN CONTAINER === */}
        {/* Changed layout: flex-col on mobile, flex-row on large screens */}
        <div 
          className="rounded-3xl p-4 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-6 md:gap-8"
          style={{ backgroundColor: COLORS.gold }}
        >
          
          {/* === LEFT SIDEBAR: MODULE LIST === */}
          {/* Mobile: Horizontal Scroll | Desktop: Vertical List */}
          <div 
            className="w-full lg:w-1/3 rounded-2xl p-4 md:p-6 flex flex-row lg:flex-col gap-3 md:gap-4 overflow-x-auto lg:overflow-visible no-scrollbar snap-x"
            style={{ backgroundColor: COLORS.silver }}
          >
            <h3 className="hidden lg:block text-xl font-bold mb-2 pl-2" style={{ color: COLORS.darkGreen }}>Modules</h3>
            
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod)}
                // Responsive styles: smaller padding on mobile, whitespace-nowrap for horizontal scroll
                className={`flex-shrink-0 lg:flex-shrink snap-start text-left px-4 py-3 md:px-6 md:py-4 rounded-xl font-semibold transition-all duration-300 shadow-sm flex justify-between items-center whitespace-nowrap lg:whitespace-normal ${
                  activeModule.id === mod.id ? "scale-95 lg:scale-105 ring-2 ring-offset-2 ring-[#01311F]" : "hover:bg-white/50"
                }`}
                style={{
                  backgroundColor: activeModule.id === mod.id ? COLORS.darkGreen : COLORS.white,
                  color: activeModule.id === mod.id ? COLORS.gold : COLORS.darkGreen,
                }}
              >
                <span className="text-sm md:text-base">Module {mod.id}: {mod.title}</span>
                {activeModule.id === mod.id && (
                    <motion.span layoutId="activeDot" className="hidden lg:block w-2 h-2 rounded-full bg-[#B99A49]" />
                )}
              </button>
            ))}
          </div>

          {/* === RIGHT CONTENT: DETAILS PANEL === */}
          <div 
            className="w-full lg:w-2/3 rounded-2xl p-6 md:p-12 min-h-[350px] md:min-h-[400px] flex flex-col justify-center relative overflow-hidden"
            style={{ backgroundColor: COLORS.darkGreen }}
          >
            {/* Animated Content Switching */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Module Header */}
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B99A49] text-[#01311F]">
                        Module {activeModule.id}
                    </span>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6" style={{ color: COLORS.gold }}>
                  {activeModule.title}
                </h3>
                
                {/* Description */}
                <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8 opacity-90" style={{ color: COLORS.cream }}>
                  {activeModule.description}
                </p>

                {/* Topics List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {activeModule.topics.map((topic, index) => (
                    <div 
                        key={index} 
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-sm md:text-md font-medium" style={{ color: COLORS.cream }}>{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Background Decoration Icon (Faded) */}
            <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 24 24" fill={COLORS.white} stroke="none" className="md:w-[300px] md:h-[300px]"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;