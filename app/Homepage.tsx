'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero';
// import ServicesSection from '@/components/servicesection';
import AboutSection from '@/components/about';
// import ContactSection from '@/components/contact';
import Loader from '@/components/loader';
import Footer from '@/components/footer';
import Projects from '@/components/projectsection';
import Testimonial from '@/components/testimonials';
import ProjectSlider from '@/components/projectsliderhome';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const determineLoaderVisibility = () => {
      try {
        const loaderShown = sessionStorage.getItem('loader-shown');
        const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const navigationType = navigation?.type;
        const referrer = document.referrer;
        const isSameSite = referrer && referrer.includes(window.location.host);

        const shouldShow = !loaderShown && 
          (navigationType === 'reload' || 
           (navigationType === 'navigate' && !isSameSite));

        if (shouldShow) {
          sessionStorage.setItem('loader-shown', 'true');
        } else {
          setIsLoading(false);
        }

        setIsInitialized(true);
      } catch (error) {
        console.warn('Could not determine navigation type:', error);
        sessionStorage.setItem('loader-shown', 'true');
        setIsInitialized(true);
      }
    };

    const timer = setTimeout(determineLoaderVisibility, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadComplete = () => setIsLoading(false);

  if (!isInitialized) return null;

  return (
    <>
      {isLoading && <Loader onLoadComplete={handleLoadComplete} />}
      <main className={`min-h-screen transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <HeroSection />
        {/* <ServicesSection /> */}
        <AboutSection />
        <ProjectSlider />
        <Projects />
        <Testimonial />
        {/* <ContactSection /> */}
        <Footer />
      </main>
    </>
  );
}
