import React from 'react';
import HeroSection from '../section/HeroSection'; 
import AboutSection from '../section/AboutSection';
import CourseSection from '../section/CourseSection';
import TrainnerAbout from '../section/TrainnerAbout';
import TestimonialsSection from '../section/TestimonialsSection';
import CareerImpactSection from '../section/CareerImpactSection';
import MaterialDownloadSection from '../section/MaterialDownloadSection';
import TrustedCompaniesSection from '../section/TrustedCompaniesSection';
import ContactSection from '../section/ContactSection';
import CertificateSection from '../section/CertificateSection';
// import YouTubePlaylistSection from '../section/YouTubePlaylistSection';
import YoutubeSection from '../section/YouTubePlaylistSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection/>
        <AboutSection/>
        <CourseSection/>
        <TrainnerAbout/>
        <TestimonialsSection/>
        <CareerImpactSection/>
        <MaterialDownloadSection/>
        <TrustedCompaniesSection/>
        <YoutubeSection/>
        <CertificateSection/>
        <ContactSection/>
      </main>
    </div>
  );
};

export default Home;