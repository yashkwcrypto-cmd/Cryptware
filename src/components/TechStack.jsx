import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    title: 'Front-End',
    pills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Angular'],
    icon: (
      <svg className="w-[18px] h-[18px] stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  {
    title: 'Back-End',
    pills: ['.NET Core', 'Node.js', 'PHP'],
    icon: (
      <svg className="w-[18px] h-[18px] stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    )
  },
  {
    title: 'Mobile',
    pills: ['Flutter', 'Kotlin', 'React Native', 'iOS', 'Android'],
    icon: (
      <svg className="w-[18px] h-[18px] stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    )
  },
  {
    title: 'Design & Data',
    pills: ['Figma', 'Adobe XD', 'InVision', 'MongoDB', 'SQL'],
    icon: (
      <svg className="w-[18px] h-[18px] stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    )
  },
  {
    title: 'Cloud',
    pills: ['AWS', 'Azure'],
    icon: (
      <svg className="w-[18px] h-[18px] stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    )
  }
];

export default function TechStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fading
      gsap.fromTo('.tech-fade-up', 
      { opacity: 0, y: 40 }, 
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.06,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      }
      );

      // Scroll parallax titles
      gsap.fromTo('.tech-title', 
      { y: 20 }, 
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.tech-title',
          start: 'top bottom',
          end: 'top 40%',
          scrub: 0.5
        }
      }
      );

      // Stagger cells
      gsap.fromTo('.tech-cell', 
      { opacity: 0, y: 30 }, 
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 84%',
          toggleActions: 'play none none reverse'
        }
      }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="tech" className="py-20 md:py-32 bg-paper-2">
      <div className="w-[92%] max-w-[1280px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-16">
          <span className="tech-fade-up eyebrow text-brand tracking-widest uppercase text-xs font-semibold mb-3 block">
            Our tech stack
          </span>
          <h2 className="tech-title tech-fade-up font-serif text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.12] text-ink font-normal">
            Built with the best <em className="text-ink-3 not-italic">tools available</em>
          </h2>
        </div>

        {/* TECH GRID */}
        <div className="tech-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {techCategories.map((cat, index) => (
            <div
              key={index}
              className="tech-cell bg-paper hover:bg-white hover:shadow-[0_10px_35px_rgba(11,11,15,0.02)] p-8 rounded-2xl transition-all duration-300 border border-paper-3/20 flex flex-col gap-6 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 text-[0.875rem] font-semibold text-ink uppercase tracking-wider">
                <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <span>{cat.title}</span>
              </div>

              {/* Tech list */}
              <ul className="space-y-3">
                {cat.pills.map((pill, pIndex) => (
                  <li
                    key={pIndex}
                    className="rounded-2xl border border-paper-3/70 bg-brand-light/10 px-4 py-3 flex items-center gap-3 text-[0.95rem] leading-[1.6] text-ink-2 shadow-[0_10px_25px_rgba(6,163,218,0.05)] transition-all duration-300 group-hover:bg-brand-light/20"
                  >
                    <span className="grid place-items-center h-3.5 w-3.5 rounded-full bg-brand flex-shrink-0 text-white shadow-sm" />
                    <span>{pill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
