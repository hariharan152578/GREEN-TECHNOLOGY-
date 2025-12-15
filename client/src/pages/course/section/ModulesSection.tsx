import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const COLORS = {
  darkGreen: "#01311F",
  gold: "#B99A49",
  cream: "#F0ECE3",
  white: "#FFFFFF",
  silver: "#E5E5E5", // Matching the grey tone in your wireframe
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
    <section className="relative w-full py-20 px-6 md:px-20 overflow-hidden" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
           <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: COLORS.darkGreen }}>
             AWS Solution Architect Curriculum
           </h2>
           <p className="text-lg opacity-80" style={{ color: COLORS.darkGreen }}>
             A comprehensive deep-dive into the modules designed for certification.
           </p>
        </div>

        {/* === MAIN CONTAINER (Gold Background from Wireframe) === */}
        <div 
          className="rounded-3xl p-6 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-8"
          style={{ backgroundColor: COLORS.gold }}
        >
          
          {/* === LEFT SIDEBAR: MODULE LIST (Silver/Grey Container) === */}
          <div 
            className="w-full lg:w-1/3 rounded-2xl p-6 flex flex-col gap-4 h-fit"
            style={{ backgroundColor: COLORS.silver }}
          >
            <h3 className="text-xl font-bold mb-2 pl-2" style={{ color: COLORS.darkGreen }}>Modules</h3>
            
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod)}
                className={`text-left px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-sm flex justify-between items-center ${
                  activeModule.id === mod.id ? "scale-105" : "hover:bg-white/50"
                }`}
                style={{
                  // Active state gets Cream background, Inactive gets White
                  backgroundColor: activeModule.id === mod.id ? COLORS.darkGreen : COLORS.white,
                  color: activeModule.id === mod.id ? COLORS.gold : COLORS.darkGreen,
                }}
              >
                <span>Module {mod.id}: {mod.title}</span>
                {activeModule.id === mod.id && (
                    <motion.span layoutId="activeDot" className="w-2 h-2 rounded-full bg-[#B99A49]" />
                )}
              </button>
            ))}
          </div>

          {/* === RIGHT CONTENT: DETAILS PANEL (Dark Grey/Green Container) === */}
          <div 
            className="w-full lg:w-2/3 rounded-2xl p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative overflow-hidden"
            style={{ backgroundColor: COLORS.darkGreen }}
          >
            {/* Animated Content Switching */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {/* Module Header */}
                <h3 className="text-4xl font-bold mb-6" style={{ color: COLORS.gold }}>
                  {activeModule.title}
                </h3>
                
                {/* Description */}
                <p className="text-xl leading-relaxed mb-8 opacity-90" style={{ color: COLORS.cream }}>
                  {activeModule.description}
                </p>

                {/* Topics List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeModule.topics.map((topic, index) => (
                    <div 
                        key={index} 
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-md font-medium" style={{ color: COLORS.cream }}>{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Background Decoration Icon (Faded) */}
            <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                <svg width="300" height="300" viewBox="0 0 24 24" fill={COLORS.white} stroke="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;