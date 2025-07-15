// app/page.tsx

export const metadata = {
  title: 'Teeksha Gupta - Portfolio',
  description: 'Explore Teeksha Gupta’s creative projects, services, and more as a full-stack developer and designer.',
};

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
  const [isLoading, setIsLoading] = useState(true); // Always start with true
  const [isInitialized, setIsInitialized] = useState(false); // Track if we've determined what to show

  useEffect(() => {
    // Move all the loader logic to useEffect to ensure it runs on client side
    const determineLoaderVisibility = () => {
      try {
        // Check if loader has already been shown in this session
        const loaderShown = sessionStorage.getItem('loader-shown');
        
        // Get navigation type
        const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const navigationType = navigation?.type;
        
        // Check if coming from same site
        const referrer = document.referrer;
        const isSameSite = referrer && referrer.includes(window.location.host);
        
        // Show loader only if:
        // 1. Loader hasn't been shown in this session AND
        // 2. It's a reload OR navigate type (new tab/direct URL) OR
        // 3. It's not navigation from within the same site
        const shouldShow = !loaderShown && 
          (navigationType === 'reload' || 
           (navigationType === 'navigate' && !isSameSite));
        
        if (shouldShow) {
          // Mark that loader has been shown in this session
          sessionStorage.setItem('loader-shown', 'true');
          // Keep isLoading true, loader will handle setting it to false
        } else {
          // If we shouldn't show loader, immediately set loading to false
          setIsLoading(false);
        }
        
        // Mark as initialized so content can show
        setIsInitialized(true);
        
      } catch (error) {
        // Fallback: show loader if we can't determine navigation type
        console.warn('Could not determine navigation type:', error);
        sessionStorage.setItem('loader-shown', 'true');
        // Keep isLoading true, loader will handle setting it to false
        setIsInitialized(true);
      }
    };

    // Small delay to ensure DOM is ready and performance API is available
    const timer = setTimeout(determineLoaderVisibility, 10);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Clean up sessionStorage on unmount (optional)
  useEffect(() => {
    return () => {
      // Optional: Clear the flag when component unmounts
      // This ensures loader shows again if user navigates away and comes back in same session
      // Comment out these lines if you want loader to show only once per browser session
      // try {
      //   sessionStorage.removeItem('loader-shown');
      // } catch (error) {
      //   console.warn('Could not clear loader flag:', error);
      // }
    };
  }, []);

  // Don't render anything until we've determined what to show
  if (!isInitialized) {
    return null;
  }

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
