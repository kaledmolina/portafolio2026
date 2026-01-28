import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { TechStackSection } from './sections/TechStackSection';
import { ProjectsGrid } from './sections/ProjectsGrid';
import { ContactSection } from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Force scroll to top on mount
  useLayoutEffect(() => {
    // Immediate force
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Secondary force after a tiny delay to override browser restoration
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, []);



  // Refresh ScrollTrigger on window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative bg-off-white">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Tech Stack Section */}
        <TechStackSection />

        {/* Projects Grid Section */}
        <ProjectsGrid />

        {/* Contact Section */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
