import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── animated counter hook ───────────────────────────────────────────────────
// rAF-based counter — frame-accurate, no main thread blocking
function useCountUp(target, duration = 1800, trigger) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const end = parseInt(target, 10);
    let startTime = null;
    let rafId;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out quad for a natural deceleration
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) rafId = requestAnimationFrame(step);
      else setCount(end);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [trigger, target, duration]);
  return count;
}

const stats = [
  { 
    value: 50, 
    suffix: '+', 
    label: 'Clients Worldwide', 
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )
  },
  { 
    value: 10, 
    suffix: '+', 
    label: 'Apps', 
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    )
  },
  { 
    value: 99, 
    suffix: '%', 
    label: 'Success on Upwork', 
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )
  },
  { 
    value: 5,  
    suffix: '+', 
    label: 'Years Experience', 
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    )
  },
];

function StatCard({ value, suffix, label, icon, triggered }) {
  const count = useCountUp(value, 1600, triggered);
  return (
    <div className="stat-card group flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-brand/30 hover:shadow-[0_8px_30px_rgba(6,163,218,0.08)] transition-all duration-500">
      <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-6 mx-auto group-hover:scale-110 group-hover:bg-brand/20 group-hover:border-brand/40 transition-all duration-300 shadow-[0_0_15px_rgba(6,163,218,0.15)] group-hover:shadow-[0_0_25px_rgba(6,163,218,0.3)]">
        {icon}
      </div>
      <div className="font-serif text-[clamp(2.8rem,5vw,4rem)] leading-none text-white font-normal tabular-nums">
        {count}{suffix}
      </div>
      <p className="text-[0.875rem] text-white/45 mt-3 tracking-wide">{label}</p>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stats-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none reverse' }
        }
      );
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        onEnter: () => setTriggered(true),
        onLeaveBack: () => setTriggered(false),
      });
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-grid', start: 'top 84%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-ink overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse,rgba(6,163,218,0.07),transparent_70%)] pointer-events-none" />

      <div className="w-[92%] max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="stats-heading block text-brand tracking-[0.16em] uppercase text-[0.72rem] font-semibold mb-4">By the numbers</span>
          <h2 className="stats-heading font-serif text-[clamp(2rem,3.5vw,3rem)] text-white font-normal leading-tight">
            Trusted by businesses <em className="text-white not-italic">worldwide</em>
          </h2>
        </div>
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}
