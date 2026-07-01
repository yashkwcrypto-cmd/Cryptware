import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomCursor from './components/common/wrappers/CustomCursor';
import Navbar from './components/common/Layout/Navbar';
import MobileMenu from './components/common/Layout/MobileMenu';
import Hero from './components/Landing/Hero';
import Marquee from './components/Landing/Marquee';
import Stats from './components/Landing/Stats';
import Services from './components/Landing/Services';
import WhyChooseUs from './components/Landing/WhyChooseUs';
import Beliefs from './components/Landing/Beliefs';
import TechStack from './components/Landing/TechStack';
import TechLogos from './components/Landing/TechLogos';
import Benefits from './components/Landing/Benefits';
import HireDevelopers from './components/Landing/HireDevelopers';
import About from './components/Landing/About';
import Testimonials from './components/Landing/Testimonials';
import Pricing from './components/Landing/Pricing';
import Catalog from './components/Landing/Catalog';
import Contact from './components/Landing/Contact';
import Footer from './components/common/Layout/Footer';
import FloatingChat from './components/common/wrappers/FloatingChat';
import HardwareCatalogPage from './components/Catalog/HardwareCatalogPage';
import HardwareProductPage from './components/Catalog/HardwareProductPage';
import AdminDashboard from './components/Product/AdminDashboard';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// ─── Main Home Page ────────────────────────────────────────────────────────────
function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (window.location.hash) {
      // Small timeout to allow the DOM to fully render
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          const targetY = target.getBoundingClientRect().top + window.scrollY - 72;
          gsap.to(window, { duration: 1, scrollTo: { y: targetY }, ease: 'power3.inOut' });
        }
      }, 150);
    }
  }, []);

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
          onQuoteRequest={(msg) => { setInquiryMessage({ text: msg, ts: Date.now() }); scrollToContact(); }}
        />
        <TechStack
          onQuoteRequest={(msg) => { setInquiryMessage({ text: msg, ts: Date.now() }); scrollToContact(); }}
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

import AdminLogin from './components/Auth/AdminLogin';
import { useAuth } from './context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-paper flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// ─── App Router ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hardware" element={<HardwareCatalogPage />} />
      <Route path="/hardware/product" element={<HardwareProductPage />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      } />
      {/* fallback */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
