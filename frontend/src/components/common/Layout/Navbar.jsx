import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const NAV_CONFIGS = {
  main: {
    logoHref: '/#hero',
    desktopLinks: [
      {
        label: 'About',
        href: '#about',
        id: 'about',
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
      },
      {
        label: 'Services',
        href: '#services',
        id: 'services',
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 12 12 17 22 12" /><polyline points="2 17 12 22 22 17" /></svg>,
      },
      {
        label: 'Pricing',
        href: '#pricing',
        id: 'pricing',
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
      },
    ],
    ctaLabel: "Let's Talk",
    ctaHref: '#contact-us',
  },
  hardware: {
    logoHref: '/hardware',
    desktopLinks: [
      {
        label: 'Catalog',
        href: '/hardware',
        id: 'catalog',
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
      },
      {
        label: 'About',
        href: '/hardware#about',
        id: 'about',
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
      },
      {
        label: 'Products',
        href: '/hardware/product',
        id: 'products',
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
      },
      {
        label: 'Contact',
        href: '/hardware#contact-us',
        id: 'contact-us',
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>,
      },
    ],
    ctaLabel: 'Get Quote',
    ctaHref: '/hardware/product',
  },
};

export default function Navbar({ onMenuToggle, isMenuOpen, variant = 'main' }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const nav = NAV_CONFIGS[variant] || NAV_CONFIGS.main;

  useEffect(() => {
    if (variant !== 'main') {
      setActiveSection(location.pathname === '/hardware/product' ? 'products' : 'catalog');
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['hero', 'about', 'services', 'why', 'hire', 'pricing', 'contact-us'];
      for (const sectionId of sections) {
        const element = document.querySelector(`#${sectionId}`);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, variant]);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const target = document.querySelector(location.hash);
        if (target) {
          const targetY = target.getBoundingClientRect().top + window.scrollY - 72;
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: targetY },
            ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            overwrite: 'auto',
          });
        }
      }, 300);
    }
  }, [location.pathname, location.hash]);

  const handleLinkClick = (e, href) => {
    if (!href.includes('#')) return;

    const [path, hash] = href.split('#');
    const targetId = '#' + hash;
    const linkPath = path || '/';

    if (location.pathname === linkPath || (location.pathname === '/' && linkPath === '')) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const targetY = target.getBoundingClientRect().top + window.scrollY - 72;
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: targetY },
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          overwrite: 'auto',
        });
        setActiveSection(hash);
        window.history.pushState(null, null, targetId);
      }
    }
  };

  const isHardware = variant === 'hardware';
  const backgroundClass = isHardware
    ? `fixed top-0 left-0 w-full h-[72px] z-50 bg-[#0b0f1e]/92 backdrop-blur-[22px] border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.05)] ${isScrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.18)]' : ''}`
    : `fixed top-0 left-0 w-full h-[72px] z-50 bg-white/85 backdrop-blur-[22px] saturate-[180%] border-b border-black/[0.04] shadow-[0_1px_0_rgba(0,0,0,0.06)] ${isScrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.08)]' : ''}`;

  return (
    <nav className={backgroundClass}>
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14 xl:px-16 h-full flex items-center justify-between relative">
        <a href={nav.logoHref} className="flex items-center z-10 h-full">
          <img
            src="/assets/img/logo-removebg-preview.png"
            alt="Cryptware Infotech Solutions LLP Logo"
            className="h-[52px] md:h-[60px] lg:h-[65px] w-auto object-contain"
          />
        </a>

        <div className="flex items-center gap-6 z-10">
          <div className="hidden md:flex items-center gap-8">
            {nav.desktopLinks.map((link) => {
              const isActive = isHardware
                ? activeSection === link.id
                : activeSection === link.id;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center gap-[6px] text-[0.9rem] font-medium transition-colors relative after:content-[''] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-brand after:transition-all after:duration-[350ms] after:ease-ease ${isActive ? (isHardware ? 'text-brand after:w-full' : 'text-[#214177] after:w-full') : (isHardware ? 'text-white/70 hover:text-white hover:after:w-full after:w-0' : 'text-[#214177] after:w-0 hover:text-brand hover:after:w-full')}`}
                >
                  {link.icon}
                  {link.label}
                </a>
              );
            })}
          </div>

          <a
            href={nav.ctaHref}
            onClick={(e) => handleLinkClick(e, nav.ctaHref)}
            className="hidden md:inline-flex text-[0.9rem] font-semibold px-5 py-2.5 md:px-6 bg-brand text-white rounded-full transition-all duration-300 ease-out hover:bg-brand-h hover:scale-[1.05] hover:shadow-[0_8px_20px_-6px_rgb(0,0,0,0.5)] items-center gap-2"
          >
            {nav.ctaLabel}
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <button
            onClick={onMenuToggle}
            className={`flex md:hidden flex-col gap-[5px] cursor-pointer p-3 rounded-full border shadow-sm z-[600] ${isHardware ? 'bg-[#111827]/90 border-white/10 shadow-black/20' : 'bg-white/90 border-white/60 shadow-black/10'}`}
            aria-label="Menu"
          >
            <span className={`w-[22px] h-[2px] block transition-all duration-400 ease-ease ${isHardware ? 'bg-white' : 'bg-brand'} ${isMenuOpen ? 'translate-y-[6.5px] rotate-[45deg]' : ''}`} />
            <span className={`w-[22px] h-[2px] block transition-all duration-300 ${isHardware ? 'bg-white' : 'bg-brand'} ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`w-[22px] h-[2px] block transition-all duration-400 ease-ease ${isHardware ? 'bg-white' : 'bg-brand'} ${isMenuOpen ? '-translate-y-[6.5px] rotate-[-45deg]' : ''}`} />
          </button>
        </div>
      </div>
    </nav>
  );
}
