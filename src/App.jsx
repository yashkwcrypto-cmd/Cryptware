import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Stats from './components/Stats';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Beliefs from './components/Beliefs';
import TechStack from './components/TechStack';
import TechLogos from './components/TechLogos';
import Benefits from './components/Benefits';
import HireDevelopers from './components/HireDevelopers';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Catalog from './components/Catalog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState('hardware');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentHash(window.location.hash);
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const isHardwareRoute = currentHash.toLowerCase().includes('hardware') ||
    currentPath.toLowerCase().includes('hardware');

  const handleNavCatalog = (category) => {
    setCatalogCategory(category);
    const target = document.querySelector('#catalog');
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 72 },
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-paper font-sans text-ink selection:bg-brand selection:text-white">
      {/* Dynamic Interactivity Layer */}
      <CustomCursor />

      {/* Navigation Layer */}
      <Navbar
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        onNavCatalog={handleNavCatalog}
      />
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavCatalog={handleNavCatalog}
      />

      {/* Section Layers */}
      <main>
        {/* 1. Hero - Full-screen landing */}
        <Hero isHardwareRoute={isHardwareRoute} />
        {/* 2. Marquee - Scrolling text strip */}
        <Marquee />
        {/* 3. Stats - Animated counters */}
        <Stats />
        {/* 4. About - Who we are */}
        <About />
        <Beliefs />
        {/* 5. Services - 4 service cards (Web, Mobile, UX, Digital Marketing) */}
        <Services />
        {/* 6. WhyChooseUs - 3D card section */}
        <WhyChooseUs />
        {/* 8b. Catalog - NEW Product/Solutions catalog */}
        <Catalog
          activeCategory={isHardwareRoute ? 'hardware' : 'software'}
          onQuoteRequest={(msg) => {
            setInquiryMessage(msg);
            const target = document.querySelector('#contact-us');
            if (target) {
              gsap.to(window, { duration: 1.2, scrollTo: { y: target, offsetY: 72 }, ease: 'power3.inOut' });
            }
          }}
        />
        {/* 7. TechStack - Frontend/Backend/Mobile/UX tech breakdown */}
        {!isHardwareRoute && <TechStack />}
        {/* 8. TechLogos - Infinite scrolling tech logo strip */}
        {!isHardwareRoute && <TechLogos />}
        {/* 9. Benefits / What We Provide - 6 items */}
        <Benefits />
        {/* 10. Hire Developers - Dark section with roles & engagement models */}
        {!isHardwareRoute && <HireDevelopers />}
        {/* 13. Pricing - Crypto Accounting Silver/Gold plans */}
        {!isHardwareRoute && <Pricing />}
        {/* 14. Contact - Form + Map + CTA merged */}
        <Contact initialMessage={inquiryMessage} />
        {/* 11. Testimonials - Client reviews */}
        <Testimonials />
      </main>

      {/* Footer Layer */}
      <Footer />
      <FloatingChat />
    </div>
  );
}
