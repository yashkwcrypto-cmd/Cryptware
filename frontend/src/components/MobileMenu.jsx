import React from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const MENU_CONFIGS = {
  main: [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Why Cryptware', href: '#why', id: 'why' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
    { label: "Let's Talk ->", href: '#contact-us', id: 'contact-us', cta: true },
  ],
  hardware: [
    { label: 'Catalog', href: '/hardware', id: 'catalog' },
    { label: 'About', href: '/hardware#about', id: 'about' },
    { label: 'Products', href: '/hardware/product', id: 'products' },
    { label: 'Contact', href: '/hardware#contact-us', id: 'contact-us', cta: true },
  ],
};

export default function MobileMenu({ isOpen, onClose, variant = 'main' }) {
  const links = MENU_CONFIGS[variant] || MENU_CONFIGS.main;
  const isHardware = variant === 'hardware';

  const handleLinkClick = (e, href) => {
    if (!href.includes('#')) {
      onClose();
      return;
    }

    const [path, hash] = href.split('#');
    const targetId = '#' + hash;
    const linkPath = path || '/';

    if (window.location.pathname === linkPath || (window.location.pathname === '/' && linkPath === '')) {
      e.preventDefault();
      onClose();
      setTimeout(() => {
        const target = document.querySelector(targetId);
        if (target) {
          const targetY = target.getBoundingClientRect().top + window.scrollY - 72;
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: targetY },
            ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            overwrite: 'auto',
          });
          window.history.pushState(null, null, targetId);
        }
      }, 300);
    } else {
      onClose();
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#0b0b0f]/50 backdrop-blur-md z-40 transition-opacity duration-500 ease-ease ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      <div
        className={`fixed top-0 right-0 w-full max-w-[340px] h-full z-50 flex flex-col p-8 sm:p-12 gap-8 shadow-[-10px_0_30px_rgba(11,11,15,0.05)] border-l transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHardware ? 'bg-[#0b0f1e] border-white/[0.08]' : 'bg-[#fafaf8] border-paper-3'} ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between w-full pt-4">
          <span className={`text-xs uppercase tracking-[0.35em] font-semibold ${isHardware ? 'text-white/50' : 'text-ink-3'}`}>Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/20 transition-all duration-300 hover:bg-brand-h"
          >
            <span className="text-xl leading-none">x</span>
          </button>
        </div>

        <div className={`flex flex-col gap-6 mt-8 ${isHardware ? 'font-sans text-[1.15rem]' : 'font-serif text-[1.4rem]'}`}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`${link.cta ? (isHardware ? 'text-[#06a3da] font-semibold hover:underline flex items-center gap-2 mt-4 uppercase tracking-wider' : 'text-brand font-medium hover:underline flex items-center gap-2 mt-4 font-sans text-lg uppercase tracking-wider') : (isHardware ? 'text-white hover:text-[#06a3da] transition-colors' : 'text-ink hover:text-brand transition-colors')}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
