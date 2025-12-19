import React from 'react';
import HeroSection from '../section/HeroSection'; 
import AboutSection from '../section/AboutSection';
import TrainnerAbout from '../section/TrainnerAbout';
import TestimonialsSection from '../section/TestimonialsSection';
import CareerImpactSection from '../section/CareerImpactSection';
import MaterialDownloadSection from '../section/MaterialDownloadSection';
import TrustedCompaniesSection from '../section/TrustedCompaniesSection';
import ContactSection from '../section/ContactSection';
import CertificateSection from '../section/CertificateSection';
import YoutubeSection from '../section/YouTubePlaylistSection';
import DomainSlider from '../section/DomainSlider';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection/>
        <AboutSection/>
        <TrainnerAbout/>
        <DomainSlider/>
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