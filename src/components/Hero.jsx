import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Hero3D from './Hero3D';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const gridLinesRef = useRef(null);
  const gradientRef = useRef(null);

  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // ── GSAP ANIMATIONS ──
    const ctxGsap = gsap.context(() => {
      // Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
        .to(titleRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power4.out' }, '-=0.4')
        .to(subtitleRef.current, { y: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .to(scrollRef.current, { opacity: 1, duration: 0.6 }, '-=0.2');

      // Parallax Scrolltrigger
      gsap.to(gridLinesRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to(gradientRef.current, {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, sectionRef);

    return () => {
      ctxGsap.revert();
    };
  }, []);

  const handleScrollClick = (e) => {
    e.preventDefault();
    const target = document.querySelector('#services');
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 72 },
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-height-screen min-h-[100vh] flex items-center pt-[calc(72px+4rem)] pb-20 relative bg-ink overflow-hidden"
    >
      {/* 3D Background Objects */}
      <Hero3D />

      {/* Parallax elements */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_65%_50%,rgba(6,163,218,0.12)_0%,transparent_70%),radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(6,163,218,0.07)_0%,transparent_60%)]"
      />
      <div
        ref={gridLinesRef}
        className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px]"
      />

      <div className="w-[92%] max-w-[1280px] mx-auto relative z-10">
        {/* Availability Badge */}
        <div
          ref={eyebrowRef}
          className="inline-flex items-center gap-[0.6rem] text-[0.78rem] tracking-[0.14em] uppercase text-white/40 mb-[2.2rem] border border-white/10 rounded-[50px] px-4 py-1.5 opacity-0 translate-y-9"
        >
          <div className="w-[7px] h-[7px] rounded-full bg-[#4ade80] relative">
            <div className="absolute inset-[-3px] rounded-full bg-[#4ade80] opacity-30 animate-ripple" />
          </div>
          Available for new projects
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-serif text-[clamp(3.4rem,6vw,6rem)] font-normal leading-[1.04] tracking-tight text-white mb-0 max-w-[14ch]"
          style={{ clipPath: 'inset(0 0 100% 0)' }}
        >
          Shaping the future<br />of <span className="text-brand italic">digital</span><br />experiences.
        </h1>

        {/* Subtitle */}
        <div className="overflow-hidden mt-[1.8rem] mb-[2.8rem]">
          <p
            ref={subtitleRef}
            className="text-[1.1rem] text-white/45 leading-[1.75] max-w-[480px] font-light translate-y-full"
          >
            We build premium, conversion-focused web &amp; mobile applications that elevate your brand and drive measurable growth — with precision and craft.
          </p>
        </div>

        {/* Actions */}
        <div ref={actionsRef} className="flex items-center gap-[1.4rem] flex-wrap mb-22 opacity-0 translate-y-5">
          <a
            href="#services"
            onClick={handleScrollClick}
            className="text-[0.9rem] font-medium px-8 py-3.5 rounded-[50px] bg-brand text-white inline-flex items-center gap-2 relative overflow-hidden transition-all duration-[300ms] ease-ease-back hover:bg-brand-h hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(6,163,218,0.18)]"
          >
            <span>Explore our work</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector('#contact');
              if (target) {
                gsap.to(window, { duration: 1.2, scrollTo: { y: target, offsetY: 72 }, ease: 'power3.inOut' });
              }
            }}
            className="text-[0.9rem] text-white/50 inline-flex items-center gap-2 transition-all hover:text-white hover:gap-[0.8rem] duration-[300ms] ease-ease-back"
          >
            Start a conversation
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-[2.5rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 text-white/30 text-[0.72rem] tracking-[0.14em] uppercase opacity-0"
      >
        <div className="w-[1px] h-[50px] bg-gradient-to-b from-brand to-transparent animate-scroll-drop" />
        Scroll
      </div>

      {/* Curve Bottom spacer */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[90px] z-10 bg-paper rounded-[80px_80px_0_0]" />
    </section>
  );
}
