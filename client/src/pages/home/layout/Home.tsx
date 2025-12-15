import React from 'react';
import HeroSection from '../section/HeroSection'; 
import AboutSection from '../section/AboutSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection/>
        <AboutSection/>
      </main>
    </div>
  );
};

export default Home;