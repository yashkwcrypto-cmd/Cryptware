import React from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function MobileMenu({ isOpen, onClose, onNavCatalog }) {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    onClose();
    
    // Allow time for menu animation to finish before scrolling
    setTimeout(() => {
      const target = document.querySelector(targetId);
      if (target) {
        const targetY = target.getBoundingClientRect().top + window.scrollY - 72;
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: targetY },
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          overwrite: 'auto'
        });
      }
    }, 300);
  };

  const handleCatalogClick = (category) => {
    onClose();
    if (onNavCatalog) {
      onNavCatalog(category);
    }
  };

  return (
    <>
      {/* Overlay Background */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#0b0b0f]/50 backdrop-blur-md z-40 transition-opacity duration-500 ease-ease ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 right-0 w-[300px] max-w-full h-full bg-[#fafaf8] z-50 flex flex-col p-12 gap-8 shadow-[-10px_0_30px_rgba(11,11,15,0.05)] border-l border-paper-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 mt-16 font-serif text-[1.4rem]">
          <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="hover:text-brand transition-colors text-ink">Home</a>
          


          <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-brand transition-colors text-ink">Services</a>
          <a href="#why" onClick={(e) => handleLinkClick(e, '#why')} className="hover:text-brand transition-colors text-ink">Why Cryptware</a>
          <a href="#hire" onClick={(e) => handleLinkClick(e, '#hire')} className="hover:text-brand transition-colors text-ink">Hire Developers</a>
          <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-brand transition-colors text-ink">About Us</a>
          <a href="#pricing" onClick={(e) => handleLinkClick(e, '#pricing')} className="hover:text-brand transition-colors text-ink">Pricing</a>
          <a href="#contact-us" onClick={(e) => handleLinkClick(e, '#contact-us')} className="text-brand font-medium hover:underline flex items-center gap-2 mt-4 font-sans text-lg uppercase tracking-wider">Let's Talk →</a>
        </div>
      </div>
    </>
  );
}
