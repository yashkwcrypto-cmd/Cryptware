import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefitsData = [
  {
    title: 'Daily Reporting via Email',
    desc: 'Full transparency with daily work-progress reports and a dedicated project manager for every project size.',
    icon: (
      <svg fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px] text-brand">
        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    )
  },
  {
    title: '160 Man-Hours Guaranteed',
    desc: 'Monthly rolling contracts with 160 hours of dedicated work exclusively on your project — on time, every time.',
    icon: (
      <svg fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px] text-brand">
        <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Monthly / Yearly Hiring',
    desc: 'Choose what works for your project — flexible engagement models tailored to your needs and timelines.',
    icon: (
      <svg fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px] text-brand">
        <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    )
  },
  {
    title: 'Direct Resource Access',
    desc: 'Connect directly with experienced developers on Skype, email, calls, and chat for complete, real-time transparency.',
    icon: (
      <svg fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px] text-brand">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )
  },
  {
    title: 'Daily / Weekly Code Delivery',
    desc: 'See the product in working mode — not just reports. Guaranteed code delivery daily and weekly, always on schedule.',
    icon: (
      <svg fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px] text-brand">
        <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  {
    title: 'Flexible Timezone',
    desc: 'We work across time zones. Our team adapts to your schedule so collaboration always feels effortless and responsive.',
    icon: (
      <svg fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px] text-brand">
        <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3.284 14.253A8.959 8.959 0 013 12c0-1.016.132-2 .38-2.934" />
      </svg>
    )
  }
];

export default function Benefits() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fading
      gsap.fromTo('.prov-fade-up', 
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
      gsap.fromTo('.prov-title', 
        { y: 20 }, 
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.prov-title',
            start: 'top bottom',
            end: 'top 40%',
            scrub: 0.5
          }
        }
      );

      // Stagger items
      gsap.fromTo('.provide-item', 
        { opacity: 0, y: 30 }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.provide-grid',
            start: 'top 84%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-paper">
      <div className="w-[92%] max-w-[1280px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-16">
          <span className="prov-fade-up eyebrow text-brand tracking-widest uppercase text-xs font-semibold mb-3 block">
            What we provide
          </span>
          <h2 className="prov-title prov-fade-up font-serif text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.12] text-ink font-normal">
            Benefits of <em className="text-ink-3 not-italic">hiring Cryptware</em>
          </h2>
        </div>

        {/* PROVIDE GRID */}
        <div className="provide-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData.map((item, index) => (
            <div
              key={index}
              className="provide-item bg-paper-2 hover:bg-white hover:shadow-[0_12px_35px_rgba(11,11,15,0.025)] border border-paper-3/20 p-8 rounded-2xl transition-all duration-300 group flex gap-5"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[1.05rem] font-medium text-ink font-sans">
                  {item.title}
                </h3>
                <p className="text-[0.875rem] text-ink-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
