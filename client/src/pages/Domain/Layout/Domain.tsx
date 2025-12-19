import HeroSection from '../Section/HeroSection';
import EnrollSection from '../Section/EnrollSection';
import SuccessStoriesSection from '../Section/SuccessStoriesSection';
import CareerImpactSection from '../Section/CareerImpactSection';
import TrainerSection from '../Section/TrainerSection';
import TechStackSection from '../Section/TechStackSection';
import ProjectsSection from '../Section/ProjectsSection';
import TrustedCompaniesSection from '../Section/TrustedCompaniesSection';
import CertificateSection from '../Section/CertificateSection';
import TestimonialsSection from '../Section/TestimonialsSection';
import AboutSection from '../Section/AboutSection';
import ContactSection from '../Section/ContactSection';
import CourseSection from '../Section/CourseSection';
import React from 'react';


const Domain: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <EnrollSection/>
        <SuccessStoriesSection/>
        <CareerImpactSection/>
        <TrainerSection/>
        <CourseSection/>
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

export default Domain;