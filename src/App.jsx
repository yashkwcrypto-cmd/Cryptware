import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import HardwareCatalogPage from './pages/HardwareCatalogPage';
import HardwareProductPage from './pages/HardwareProductPage';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// ─── Main Home Page ────────────────────────────────────────────────────────────
function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const handleNavCatalog = (category) => {
    const target = document.querySelector('#catalog');
    if (target) {
      gsap.to(window, { duration: 1.2, scrollTo: { y: target, offsetY: 72 }, ease: 'power3.inOut' });
    }
  };

  const scrollToContact = () => {
    const target = document.querySelector('#contact-us');
    if (target) {
      gsap.to(window, { duration: 1.2, scrollTo: { y: target, offsetY: 72 }, ease: 'power3.inOut' });
    }
  };

  return (
    <div className="relative min-h-screen bg-paper font-sans text-ink selection:bg-brand selection:text-white">
      <CustomCursor />
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
      <main>
        <Hero isHardwareRoute={false} />
        <Marquee hardware={false} />
        <Stats />
        <About />
        <Beliefs />
        <Services />
        <WhyChooseUs />
        <Catalog
          activeCategory="software"
          onQuoteRequest={(msg) => { setInquiryMessage(msg); scrollToContact(); }}
        />
        <TechStack
          onQuoteRequest={(msg) => { setInquiryMessage(msg); scrollToContact(); }}
        />
        <TechLogos />
        <Benefits />
        <HireDevelopers />
        <Pricing />
        <Contact initialMessage={inquiryMessage} />
        <Testimonials />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}

// ─── App Router ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hardware" element={<HardwareCatalogPage />} />
      <Route path="/hardware/product" element={<HardwareProductPage />} />
      {/* fallback */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
