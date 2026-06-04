import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'End-to-end custom web applications, scalable architectures, and seamless e-commerce solutions built for real-world performance.',
    icon: (
      <svg className="w-[24px] h-[24px] stroke-brand group-hover/card:stroke-brand transition-colors duration-300" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
    )
  },
  {
    num: '02',
    title: 'Mobile Apps',
    desc: 'High-end native and cross-platform apps for iOS and Android — crafted to engage users and drive meaningful, measurable conversions.',
    icon: (
      <svg className="w-[24px] h-[24px] stroke-brand group-hover/card:stroke-brand transition-colors duration-300" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    )
  },
  {
    num: '03',
    title: 'UI / UX Design',
    desc: 'User-centric interfaces using Figma and Adobe XD — beautiful aesthetics meeting intuitive navigation for maximum conversion.',
    icon: (
      <svg className="w-[24px] h-[24px] stroke-brand group-hover/card:stroke-brand transition-colors duration-300" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    )
  },
  {
    num: '04',
    title: 'Digital Marketing',
    desc: 'Sophisticated SEO, social media, content, PPC, email & analytics expertise. Drive growth, enhance ROI, and dominate your market with data-driven strategies.',
    icon: (
      <svg className="w-[24px] h-[24px] stroke-brand group-hover/card:stroke-brand transition-colors duration-300" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    )
  },
  {
    num: '05',
    title: 'Cloud Services',
    desc: 'Secure, scalable, and high-performance cloud infrastructure, migration, and management services.',
    icon: (
      <svg className="w-[24px] h-[24px] stroke-brand group-hover/card:stroke-brand transition-colors duration-300" fill="none" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    )
  }
];


export default function Services() {
  const containerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = React.useState(null);

  const toggleFlip = (index, e) => {
    if (e) e.stopPropagation();
    setActiveCardIndex(prev => prev === index ? null : index);
  };

  const handleMouseMove = (e) => {
    for (const card of document.querySelectorAll('.service-card')) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up eyebrow and link
      gsap.fromTo('.services-fade-up',
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

      // Section title scroll parallax
      gsap.fromTo('.services-title',
        { y: 20 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.services-title',
            start: 'top bottom',
            end: 'top 40%',
            scrub: 0.5
          }
        }
      );

      // Service card staggers
      gsap.fromTo('.service-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="py-20 md:py-32 bg-paper group/services" onMouseMove={handleMouseMove}>
      <div className="w-[92%] max-w-[1280px] mx-auto">

        {/* SERVICES HEADER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-8">
            <span className="services-fade-up eyebrow text-brand tracking-widest uppercase text-xs font-semibold mb-3 block">
              What we do
            </span>
            <h2 className="services-title font-serif text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.12] text-ink font-normal">
              Custom IT solutions for<br />
              <em className="text-ink-3 not-italic">your successful business</em>
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#contact-us');
                if (target) {
                  gsap.to(window, { duration: 1.2, scrollTo: { y: target, offsetY: 72 }, ease: 'power3.inOut' });
                }
              }}
              className="services-fade-up inline-flex text-[0.9rem] font-semibold px-6 py-3 bg-brand text-white rounded-full transition-all duration-300 ease-out hover:bg-brand/90 hover:scale-[1.05] hover:shadow-[0_8px_20px_-6px_rgba(6,163,218,0.5)] items-center gap-2"
            >
              Start a project
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* SERVICES GRID - 5 cols on lg so they all fit in one row */}
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {servicesData.map((svc, index) => {
            const isFlipped = activeCardIndex === index;
            return (
              <div
                key={index}
                className="service-card relative group/card [perspective:1000px] min-h-[440px] sm:min-h-[420px]"
              >
                {/* 3D Flip Container */}
                <div className={`relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>

                  {/* FRONT FACE */}
                  <div
                    className={`absolute inset-0 w-full h-full bg-paper hover:bg-white p-6 xl:p-8 rounded-2xl border border-paper-3/40 transition-all duration-500 shadow-sm hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(11,11,15,0.08)] [backface-visibility:hidden] flex flex-col ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
                  >
                    {/* Subtle background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                    <div className="relative z-10 flex-1">
                      {/* <div className="text-[0.72rem] tracking-widest text-ink-3 mb-10 select-none">
                        {svc.num}
                      </div> */}

                      {/* Icon Container */}
                      <div className="svc-icon w-[52px] h-[52px] border-[1.5px] border-brand/20 bg-brand/5 rounded-[14px] flex items-center justify-center mb-8 group-hover/card:border-brand group-hover/card:bg-brand/10 group-hover/card:scale-110 group-hover/card:-rotate-6 transition-all duration-[400ms] ease-ease-back shadow-[0_0_15px_rgba(6,163,218,0.05)] group-hover/card:shadow-[0_0_20px_rgba(6,163,218,0.2)]">
                        {svc.icon}
                      </div>

                      <h3 className="text-[1.1rem] font-medium text-ink mb-[0.9rem] font-sans">
                        {svc.title}
                      </h3>
                      <p className="text-[0.85rem] text-ink-3 leading-[1.6]">
                        {svc.desc}
                      </p>

                      {/* Hover arrow indicator - Click to flip */}
                      <button
                        onClick={(e) => toggleFlip(index, e)}
                        className="absolute -top-2 -right-2 w-11 h-11 border-[1.5px] border-paper-3 rounded-full flex items-center justify-center opacity-100 scale-100 rotate-0 md:opacity-0 md:scale-50 md:-rotate-45 md:group-hover/card:opacity-100 md:group-hover/card:scale-100 md:group-hover/card:rotate-0 transition-all duration-[400ms] ease-ease-back hover:bg-brand hover:border-brand hover:text-white cursor-pointer z-20"
                        title="Click to view more details"
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className={`absolute inset-0 w-full h-full bg-brand rounded-2xl p-6 xl:p-8 flex flex-col justify-center items-center text-center text-white shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] ${isFlipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    <div className="relative z-10 flex flex-col items-center">
                      <h4 className="text-[1.1rem] font-serif mb-4">{svc.title}</h4>
                      <p className="text-[0.85rem] text-white/90 leading-[1.6]">
                        Detailed data about {svc.title}. We can add more specific capabilities, tech stacks, and case studies here in the future.
                      </p>
                      <button
                        onClick={(e) => toggleFlip(index, e)}
                        className="mt-6 px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full transition-colors text-sm font-semibold flex items-center gap-2 cursor-pointer"
                      >
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Go Back
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
