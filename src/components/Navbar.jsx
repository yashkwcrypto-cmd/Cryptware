import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar({ onMenuToggle, isMenuOpen, onNavCatalog }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'services', 'why', 'hire', 'pricing', 'contact-us'];
      for (const sectionId of sections) {
        const element = document.querySelector(`#${sectionId}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const targetY = target.getBoundingClientRect().top + window.scrollY - 72;
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: targetY },
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        overwrite: 'auto'
      });
      // Update active section immediately for better UX
      setActiveSection(targetId.replace(/^#/, ''));
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full h-[72px] z-50 bg-white/85 backdrop-blur-[22px] saturate-[180%] border-b border-black/[0.04] shadow-[0_1px_0_rgba(0,0,0,0.06)] opacity-100 translate-y-0"
    >
      <div className="w-full px-6 md:px-[200px] lg:px-[200px] xl:px-[200px] h-full flex items-center justify-between relative">
        {/* LOGO - Left */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center z-10 h-full"
        >
          <img
            src="/assets/img/logo-removebg-preview.png"
            alt="Cryptware Infotech Solutions LLP Logo"
            className="h-[44px] md:h-[50px] w-auto object-contain"
          />
        </a>



        {/* DESKTOP NAV LINKS + CTA + HAMBURGER - Right */}
        <div className="flex items-center gap-6 z-10">
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, '#about')}
              className={`flex items-center gap-[6px] text-[0.9rem] font-medium transition-colors relative after:content-[''] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-brand after:transition-all after:duration-[350ms] after:ease-ease ${activeSection === 'about' ? 'text-[#214177] after:w-full' : 'text-[#214177] after:w-0 hover:text-[#214177] hover:after:w-full'}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 0 01 0 7.75"></path></svg>
              About
            </a>
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, '#services')}
              className={`flex items-center gap-[6px] text-[0.9rem] font-medium transition-colors relative after:content-[''] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-brand after:transition-all after:duration-[350ms] after:ease-ease ${activeSection === 'services' ? 'text-[#214177] after:w-full' : 'text-[#214177] after:w-0 hover:text-[#214177] hover:after:w-full'}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 12 12 17 22 12" /><polyline points="2 17 12 22 22 17" /></svg>
              Services
            </a>
            <a
              href="#hire"
              onClick={(e) => handleLinkClick(e, '#hire')}
              className={`flex items-center gap-[6px] text-[0.9rem] font-medium transition-colors relative after:content-[''] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-brand after:transition-all after:duration-[350ms] after:ease-ease ${activeSection === 'hire' ? 'text-[#214177] after:w-full' : 'text-[#214177] after:w-0 hover:text-[#214177] hover:after:w-full'}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
              Hire Devs
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleLinkClick(e, '#pricing')}
              className={`flex items-center gap-[6px] text-[0.9rem] font-medium transition-colors relative after:content-[''] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-brand after:transition-all after:duration-[350ms] after:ease-ease ${activeSection === 'pricing' ? 'text-[#214177] after:w-full' : 'text-[#214177] after:w-0 hover:text-[#214177] hover:after:w-full'}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
              Pricing
            </a>
          </div>
          <a
            href="#contact-us"
            onClick={(e) => handleLinkClick(e, '#contact-us')}
            className="hidden md:inline-flex text-[0.9rem] font-semibold px-6 py-2.5 bg-brand text-white rounded-full transition-all duration-300 ease-out hover:bg-brand-h hover:scale-[1.05] hover:shadow-[0_8px_20px_-6px_rgb(0,0,0,0.5)] items-center gap-2"
          >
            Let's Talk
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* HAMBURGER BUTTON (MOBILE) */}
          <button
            onClick={onMenuToggle}
            className="flex md:hidden flex-col gap-[5px] cursor-pointer p-3 rounded-full bg-white/90 border border-white/60 shadow-sm shadow-black/10 z-[600]"
            aria-label="Menu"
          >
            <span
              className={`w-[22px] h-[2px] bg-brand block transition-all duration-400 ease-ease ${isMenuOpen ? 'translate-y-[6.5px] rotate-[45deg]' : ''}`}
            />
            <span
              className={`w-[22px] h-[2px] bg-brand block transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`}
            />
            <span
              className={`w-[22px] h-[2px] bg-brand block transition-all duration-400 ease-ease ${isMenuOpen ? '-translate-y-[6.5px] rotate-[-45deg]' : ''}`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
