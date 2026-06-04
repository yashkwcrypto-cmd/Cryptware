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
import CTA from './components/CTA';
import Footer from './components/Footer';
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
        <Hero />
        {/* 2. Marquee - Scrolling text strip */}
        <Marquee />
        {/* 3. Stats - Animated counters */}
        <Stats />
        {/* 4. About - Who we are */}
        <About />
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
        {/* 11. Testimonials - Client reviews */}
        <Testimonials />
        {/* 13. Pricing - Crypto Accounting Silver/Gold plans */}
        {!isHardwareRoute && <Pricing />}
        {/* 14. Contact - Form + Map */}
        <Contact initialMessage={inquiryMessage} />
        {/* 15. CTA - Final call to action */}
        <CTA />
      </main>

      {/* Footer Layer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917490971996"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-float"
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
          <path d="M16 3C9.37 3 4 8.37 4 15c0 2.49.73 4.81 2 6.76L4 29l7.44-2.04A12.95 12.95 0 0016 27c6.63 0 12-5.37 12-12S22.63 3 16 3zm6.28 17.28l-1.57.81a1.12 1.12 0 01-1.04-.08c-.95-.54-3.27-2.11-4.73-4.72-.68-1.22-.83-2.36-.41-3.14l.82-1.57a.83.83 0 011.19-.29l1.56 1.04a.83.83 0 01.31.99l-.44 1.1a.28.28 0 00.07.32c.48.44 1.97 1.82 2.53 2.38a.28.28 0 00.33.05l1.1-.43a.83.83 0 01.99.3l1.04 1.55a.83.83 0 01-.75 1.69z" />
        </svg>
      </a>
    </div>
  );
}
