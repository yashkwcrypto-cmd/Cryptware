import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── 3-D Book Demo Popup (Apple Hello style) ────────────────────────────── */
function BookDemoPopup({ onClose, onBook }) {
  const cardRef = useRef(null);

  useEffect(() => {
    // Pop in animation
    gsap.fromTo(cardRef.current,
      { scale: 0.1, opacity: 0, rotation: 30, y: 50 },
      { scale: 1, opacity: 1, rotation: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.6)' }
    );
  }, []);

  const dismiss = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.5, opacity: 0, y: 30, rotation: -20,
        duration: 0.3, ease: 'back.in(1.5)', onComplete: onClose
      });
    } else { onClose(); }
  };

  return (
    <div className="absolute bottom-4 right-4 md:right-4 lg:right-4 z-40">
      <div
        ref={cardRef}
        className="relative w-[150px] h-[150px] pointer-events-auto"
        style={{ opacity: 0 }}
      >
        {/* Curved Text SVG */}
        <svg viewBox="0 0 150 150" className="absolute inset-0 pointer-events-none drop-shadow-md -rotate-6">
          <defs>
            {/* Arc path starting from mid-left, going over the top, to mid-right */}
            <path id="textCurve" d="M 15,85 A 60,60 0 1,1 135,85" />
          </defs>
          <text
            fill="#38bdf8"
            stroke="#ffffff"
            strokeWidth="4"
            paintOrder="stroke"
            fontSize="18"
            fontWeight="900"
            fontFamily="'Nunito', 'Segoe UI', sans-serif"
            style={{ letterSpacing: '0.02em', textTransform: 'uppercase' }}
          >
            <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
              Book Demo!
            </textPath>
          </text>
        </svg>

        {/* Waving Hand Emoji */}
        <span className="absolute bottom-[24px] left-[6px] text-[34px] rotate-[-15deg] drop-shadow-lg select-none z-20 animate-bounce">
          👋
        </span>

        {/* Main Circular Button */}
        <button
          onClick={() => { dismiss(); if (onBook) onBook(); }}
          className="absolute top-[35px] left-[35px] w-20 h-20 rounded-full bg-gradient-to-tr from-[#06a3da] to-[#38bdf8] flex items-center justify-center shadow-[0_8px_24px_rgba(6,163,218,0.6)] border-4 border-white cursor-pointer transition-transform hover:scale-110 active:scale-95 z-10"
        >
          {/* Calendar SVG Icon */}
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            {/* Checkmark inside */}
            <path d="M 9 16 l 2 2 l 4 -4" />
          </svg>
        </button>

        {/* Close Button (X) */}
        <button
          onClick={dismiss}
          className="absolute top-[10px] right-[10px] w-6 h-6 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center text-[10px] font-bold backdrop-blur-sm transition-colors cursor-pointer z-30"
        >✕</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAC-STYLE FULL-SECTION CURSIVE DRAW OVERLAY
────────────────────────────────────────────────────────────────────────────── */
function MacHelloOverlay({ sectionRef, onDone }) {
  const overlayRef = useRef(null);
  const svgWrapRef = useRef(null);
  const svgTextRef = useRef(null);
  const nibRef = useRef(null);
  const starsRef = useRef([]);
  useEffect(() => {
    const overlay = overlayRef.current;
    const svgWrap = svgWrapRef.current;
    const txt = svgTextRef.current;
    const nib = nibRef.current;
    if (!overlay || !txt || !svgWrap) return;

    const ctx = gsap.context(() => {
      /* ── Total stroke length ──────────────────────────────────────
       2200 is specifically tuned for Dancing Script at 155px
       so the stroke draws evenly over the full duration. */
      const TOTAL = 2200;

      /* ── 1. Fade overlay in ─────────────────────────────────────── */
      gsap.fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      /* ── 2. Floating stars entrance ─────────────────────────────── */
      starsRef.current.forEach((s, i) => {
        if (!s) return;
        gsap.fromTo(s,
          { opacity: 0, scale: 0 },
          {
            opacity: Math.random() * 0.6 + 0.2, scale: 1,
            duration: 0.6, delay: 0.2 + i * 0.05, ease: 'back.out(2)'
          }
        );
        gsap.to(s, {
          opacity: Math.random() * 0.4 + 0.1,
          duration: 1.5 + Math.random(),
          ease: 'sine.inOut', repeat: -1, yoyo: true,
          delay: Math.random() * 2
        });
      });

      /* ── 3. Initialise stroke (hidden) ──────────────────────────── */
      gsap.set(txt, {
        strokeDasharray: TOTAL,
        strokeDashoffset: TOTAL,
        fillOpacity: 0,
      });

      /* ── 4. Main draw → fill → exit timeline (Exactly 5s Total) ────── */
      const tl = gsap.timeline();

      /* 3D floating effect on the wrapper */
      tl.fromTo(svgWrap,
        { rotateX: 25, rotateY: -15, scale: 0.85, z: -150 },
        { rotateX: -5, rotateY: 8, scale: 1.05, z: 50, duration: 4.2, ease: 'power2.out' },
        0
      );

      /* a) DRAW — stroke sweeps left to right, 2.8 s */
      const proxy = { offset: TOTAL };
      tl.to(proxy, {
        offset: 0,
        duration: 2.8,
        ease: 'power1.inOut',
        onUpdate() {
          if (!nib || !txt) return;

          // 1. Manually apply the stroke dash offset to avoid string parsing bugs
          txt.style.strokeDashoffset = proxy.offset;

          // 2. Safe progress calculation
          const progress = 1 - (proxy.offset / TOTAL);

          // 3. Move the glowing nib
          gsap.set(nib, {
            left: `${Math.max(2, Math.min(progress * 82, 82))}%`,
            opacity: progress < 0.98 && progress > 0.02 ? 1 : 0,
          });
        }
      }, 0.2); // starts at 0.2s

      /* b) FILL & 3D Extrusions bloom in */
      tl.to(txt, {
        fillOpacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 2.4);

      tl.to('.mac-extrusion', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 2.4);

      /* c) Stroke dissolves */
      tl.to(txt, {
        strokeOpacity: 0,
        duration: 0.6,
        ease: 'power1.in',
      }, 2.4);

      /* e) Overlay slides UP off screen at 4.2s (finishing at 5.0s) */
      tl.to(overlay, {
        y: '-105%',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (onDone) onDone();
        }
      }, 4.2);
    }); // end gsap.context

    return () => ctx.revert();
  }, [onDone]);

  /* Generate star positions once */
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.8,
  }));

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        opacity: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #03080f 0%, #060e1a 50%, #030b12 100%)',
        willChange: 'transform',
        borderRadius: 'inherit',
      }}
    >
      {/* ── Star field ────────────────────────────────────────────── */}
      {stars.map(s => (
        <span
          key={s.id}
          ref={el => starsRef.current[s.id] = el}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#ffffff',
            opacity: 0,
          }}
        />
      ))}

      {/* ── Ambient glow orbs ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '20%', left: '15%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,163,218,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '10%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,163,218,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Glowing nib ───────────────────────────────────────────── */}
      <div
        ref={nibRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '2%',
          transform: 'translateY(-50%)',
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: '#06a3da',
          boxShadow: '0 0 20px 6px rgba(6,163,218,0.8), 0 0 40px 12px rgba(6,163,218,0.4)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* ── Cursive SVG text with 3D wrapper ──────────────────────── */}
      <div style={{ width: '88%', maxWidth: 1100, position: 'relative', perspective: '1200px' }}>
        <svg
          ref={svgWrapRef}
          viewBox="0 0 1000 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', overflow: 'visible', transformStyle: 'preserve-3d', willChange: 'transform' }}
          aria-label="Book Demo Now"
        >
          <defs>
            {/* White-to-cyan gradient for stroke & fill */}
            <linearGradient id="macHelloGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8f4ff" />
              <stop offset="40%" stopColor="#06a3da" />
              <stop offset="70%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#e8f4ff" />
            </linearGradient>

            {/* Neon glow filter */}
            <filter id="macGlow" x="-8%" y="-60%" width="116%" height="220%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="12" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 3D Shadow/Depth Extrusion Layers */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <text
              key={i}
              className="mac-extrusion"
              x="500" y={170 + i * 1.5}
              textAnchor="middle"
              fontFamily="'Dancing Script', cursive"
              fontSize="155"
              fontWeight="700"
              fill={`rgba(6,163,218,${0.18 - i * 0.02})`}
              style={{ opacity: 0, userSelect: 'none', transform: `translateZ(${-i * 2}px)` }}
            >
              Get Free Demo
            </text>
          ))}

          {/* Main animated cursive text */}
          <text
            ref={svgTextRef}
            x="500"
            y="170"
            textAnchor="middle"
            fontFamily="'Dancing Script', cursive"
            fontSize="155"
            fontWeight="700"
            fill="url(#macHelloGrad)"
            stroke="url(#macHelloGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#macGlow)"
            style={{ strokeDasharray: 2200, strokeDashoffset: 2200, fillOpacity: 0 }}
          >
            Get Free Demo
          </text>
        </svg>

        {/* Skip label */}
        <p style={{
          textAlign: 'center',
          marginTop: 28,
          fontSize: '0.72rem',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontFamily: 'DM Sans, sans-serif',
        }}>
          Loading tech stack…
        </p>
      </div>
    </div>
  );
}

/* ─── Tech Categories data ───────────────────────────────────────────────── */
const techCategories = [
  {
    title: 'Front-End',
    pills: ['React.js', 'JavaScript', 'HTML5', 'CSS', 'Next js', 'Angular'],
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-500/10',
    icon: (
      <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  {
    title: 'Back-End & APIs',
    pills: ['Microsoft .NET Core', 'ASP.NET Core', 'C#', 'Node.js', 'WCF Services', 'Web API', 'REST APIs', 'Microservices', 'SignalR'],
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-500/10',
    icon: (
      <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    )
  },
  {
    title: 'Mobile & Desktop',
    pills: ['.NET MAUI', 'Xamarin', 'WinForms', 'Flutter', 'React Native', 'iOS', 'Android'],
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-500/10',
    icon: (
      <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    )
  },
  {
    title: 'Database & ORM',
    pills: ['SQL Server', 'MySQL', 'MongoDB', 'SQLite', 'Entity Framework Core', 'LINQ', 'Redis Cache'],
    iconColor: 'text-pink-500',
    iconBg: 'bg-pink-500/10',
    icon: (
      <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    )
  },
  {
    title: 'Cloud & DevOps',
    pills: ['Azure Services', 'Azure DevOps', 'AWS', 'Docker', 'CI/CD Pipelines', 'GitHub', 'Bitbucket'],
    iconColor: 'text-sky-500',
    iconBg: 'bg-sky-500/10',
    icon: (
      <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    )
  },
  {
    title: 'Integrations',
    pills: ['Barcode', 'QR Code', 'Hardware Integrations'],
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-500/10',
    icon: (
      <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    )
  },
  {
    title: 'Domains & Solutions',
    pills: ['ERP', 'POS', 'Hotel POS', 'Warehouse Management', 'Inventory Solutions', 'Financial Services', 'Insurance', 'Healthcare Platforms'],
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-500/10',
    icon: (
      <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12.25" />
      </svg>
    )
  }
];

/* ─── TechStack section ──────────────────────────────────────────────────── */
export default function TechStack({ onQuoteRequest }) {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayDone, setOverlayDone] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeoutRef = useRef(null);
  const firedRef = useRef(false);
  const manualScrollRef = useRef(false);
  const manualScrollTimeout = useRef(null);

  const displayCategories = [...techCategories, ...techCategories, ...techCategories, ...techCategories];

  const handleInteractStart = () => {
    setIsInteracting(true);
    clearTimeout(interactionTimeoutRef.current);
  };

  const handleInteractEnd = () => {
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000); // Resume auto-scroll 2 seconds after touch/hover ends
  };

  useEffect(() => {
    let intervalId;
    if (!isInteracting && !manualScrollRef.current) {
      // Auto scroll every 5 seconds
      intervalId = setInterval(() => {
        if (scrollContainerRef.current) {
          const scrollAmount = window.innerWidth < 768 ? 250 : 290;
          scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          
          // Simple reset if we get near the end
          if (
            scrollContainerRef.current.scrollLeft >=
            scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 300
          ) {
            // Instantly reset to a similar position in the first set to loop seamlessly
            scrollContainerRef.current.scrollLeft = 0;
          }
        }
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [isInteracting]);

  const handleManualScroll = (offset) => {
    if (scrollContainerRef.current) {
      manualScrollRef.current = true;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      
      clearTimeout(manualScrollTimeout.current);
      manualScrollTimeout.current = setTimeout(() => {
        manualScrollRef.current = false;
      }, 800);
    }
  };

  const scrollLeft = () => handleManualScroll(-350);
  const scrollRight = () => handleManualScroll(350);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header fading */
      gsap.fromTo('.tech-fade-up',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.75, stagger: 0.06,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      /* Scroll parallax title */
      gsap.fromTo('.tech-title',
        { y: 20 },
        {
          y: 0, ease: 'none',
          scrollTrigger: {
            trigger: '.tech-title',
            start: 'top bottom',
            end: 'top 40%',
            scrub: 0.5
          }
        }
      );

      /* Stagger cells → fire overlay when section enters view */
      gsap.fromTo('.tech-cell',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.65, stagger: 0.08,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 84%',
            toggleActions: 'play none none reverse'
          },
          onStart: () => {
            if (!firedRef.current) {
              firedRef.current = true;
              setShowOverlay(true);
            }
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBook = () => {
    if (onQuoteRequest) {
      onQuoteRequest('Hello Cryptware team,\n\nI would like to book a free demo. Please get in touch!');
    }
  };

  return (
    <section ref={containerRef} id="tech" className="py-20 md:py-32 bg-paper-2 relative overflow-visible">
      {/* Mac-Hello full-screen overlay */}
      {showOverlay && !overlayDone && (
        <MacHelloOverlay
          sectionRef={containerRef}
          onDone={() => setOverlayDone(true)}
        />
      )}

      <div className="w-[92%] max-w-[1280px] mx-auto relative">

        {/* 3D Book Demo Popup shows up under the grid when overlay finishes */}
        {overlayDone && (
          <BookDemoPopup
            onClose={() => setOverlayDone(false)}
            onBook={handleBook}
          />
        )}

        {/* HEADER */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="tech-fade-up eyebrow text-brand tracking-widest uppercase text-xs font-semibold mb-3 block">
              Our tech stack
            </span>
            <h2 className="tech-title tech-fade-up font-serif text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.12] text-ink font-normal">
              Built with the best <em className="text-ink not-italic">tools available</em>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3 tech-fade-up">
            <button onClick={scrollLeft} className="w-12 h-12 rounded-full border border-paper-3 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-colors text-ink-3 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={scrollRight} className="w-12 h-12 rounded-full border border-paper-3 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-colors text-ink-3 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* TECH GRID */}
        <div 
          ref={scrollContainerRef}
          onMouseEnter={handleInteractStart}
          onMouseLeave={handleInteractEnd}
          onTouchStart={handleInteractStart}
          onTouchEnd={handleInteractEnd}
          className="tech-grid flex overflow-x-auto pb-12 snap-x snap-mandatory gap-4 md:gap-5 w-full [&::-webkit-scrollbar]:hidden" 
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {displayCategories.map((cat, index) => (
            <div
              key={index}
              className="snap-start flex-shrink-0 w-[230px] md:w-[260px] xl:w-[270px] h-full"
            >
              <div
                className="tech-cell relative h-full bg-paper p-5 md:p-6 rounded-2xl transition-all duration-300 ease-out border border-paper-3/20 flex flex-col gap-4 group hover:bg-white hover:shadow-[0_15px_40px_rgba(6,163,218,0.12)] hover:-translate-y-2 hover:border-brand/30"
              >
                {/* Highlight Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>

                {/* Category Header */}
                <div className="flex items-center gap-3 text-[0.8rem] font-bold text-ink uppercase tracking-wider relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  <div className={`w-9 h-9 rounded-xl ${cat.iconBg} ${cat.iconColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-sm border border-paper-3/30`}>
                    {cat.icon}
                  </div>
                  <span>{cat.title}</span>
                </div>

                {/* Tech list */}
                <ul className="space-y-2 relative z-10">
                  {cat.pills.map((pill, pIndex) => (
                    <li
                      key={pIndex}
                      className="rounded-xl border border-paper-3/70 bg-brand-light/10 px-3.5 py-2 flex items-center gap-2.5 text-[0.85rem] leading-[1.4] text-ink-2 shadow-sm transition-all duration-300 group-hover/item:bg-brand-light/20 hover:-translate-y-0.5 group/item cursor-default"
                    >
                      <span className="grid place-items-center h-2 w-2 rounded-full bg-brand flex-shrink-0 shadow-[0_0_5px_rgba(6,163,218,0.5)] group-hover/item:shadow-[0_0_8px_rgba(6,163,218,0.8)] transition-shadow" />
                      <span className="font-medium">{pill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
