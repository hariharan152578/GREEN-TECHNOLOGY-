import React from 'react';
import HeroSection from '../section/HeroSection'; 
import AboutSection from '../section/AboutSection';
import CourseSection from '../section/CourseSection';
import TrainnerAbout from '../section/TrainnerAbout';
import MoviePostersCarousel from '../section/MoviePostersCarousel';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection/>
        <AboutSection/>
        <CourseSection/>
        <TrainnerAbout/>
        <MoviePostersCarousel/>
      </main>
    </div>
  );
};

export default Home;