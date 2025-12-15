import React from 'react';
import HeroSection from '../section/HeroSection';
import EnrollSection from '../section/EnrollSection';
import SuccessStoriesSection from '../section/SuccessStoriesSection';
import CareerImpactSection from '../section/CareerImpactSection';
import ModulesSection from '../section/ModulesSection';
import TrainerSection from '../section/TrainerSection';
import TechStackSection from '../section/TechStackSection';
import ProjectsSection from '../section/ProjectsSection';
import TrustedCompaniesSection from '../section/TrustedCompaniesSection';
import CertificateSection from '../section/CertificateSection';
import TestimonialsSection from '../section/TestimonialsSection';
import AboutSection from '../section/AboutSection';
import ContactSection from '../section/ContactSection';


const course: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection/>
        <EnrollSection/>
        <SuccessStoriesSection/>
        <CareerImpactSection/>
        <ModulesSection/>
        <TrainerSection/>
        <TechStackSection/>
        <ProjectsSection/>
        <TrustedCompaniesSection/>
        <CertificateSection/>
        <TestimonialsSection/>
        <AboutSection/>
        <ContactSection/>
      </main>
    </div>
  );
};

export default course;