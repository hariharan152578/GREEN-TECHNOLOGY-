import React from 'react';
import HeroSection from '../../components/section/HeroSection';
import EnrollSection from '../../components/section/EnrollSection';
import SuccessStoriesSection from '../../components/section/SuccessStoriesSection';
import CareerImpactSection from '../../components/section/CareerImpactSection';
import TrainerSection from '../../components/section/TrainerSection';
import TechStackSection from '../../components/section/TechStackSection';
import ProjectsSection from '../../components/section/ProjectsSection';
import TrustedCompaniesSection from '../../components/section/TrustedCompaniesSection';
import CertificateSection from '../../components/section/CertificateSection';
 import TestimonialsSection from '../../components/section/TestimonialsSection';
import AboutSection from '../../components/section/AboutSection';
import ContactSection from '../../components/section/ContactSection';


const course: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection/>
        <EnrollSection/>
        <SuccessStoriesSection/>
        <CareerImpactSection/>
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