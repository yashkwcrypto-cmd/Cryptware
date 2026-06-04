import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const beliefsData = [
  {
    title: 'Customer Satisfaction',
    desc: 'Our highest priority is to satisfy customers through early and continuous delivery of valuable, working software.',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75S9.75 9.336 9.75 9.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    )
  },
  {
    title: 'No False Promises',
    desc: 'Reasonable commitments, extraordinary delivery. We promise what we can do — then exceed it every time.',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    )
  },
  {
    title: 'Open Communication',
    desc: 'Honest communication is the foundation of genuine engagement — boosting productivity, innovation, and satisfaction.',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V20.25a.75.75 0 001.28.53l3.58-3.58A48.458 48.458 0 0011.25 17c.406 0 .81-.012 1.21-.036" />
      </svg>
    )
  },
  {
    title: 'Transparency & Honesty',
    desc: '100% transparent — in process, in pricing, in progress. These principles motivate us to deliver incredible results.',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Continuous Delivery',
    desc: 'DevOps processes for efficiency and velocity. Productive, happy teams ship better software — consistently.',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    )
  },
  {
    title: 'Invest in People',
    desc: 'Hiring from top universities and reinvesting 20% of profit in training — because our team\'s growth is your product\'s quality.',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    )
  },
  {
    title: 'Honest Experience Developers',
    desc: 'We let you hire reliable, dedicated, experienced developers who work in your timezone — just like your in-house team.',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )
  },
  {
    title: 'Think Like a Product',
    desc: 'We treat your project as a product, not a list of tasks. We build with your end customer in mind, not just the feature backlog.',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    )
  },
  {
    title: 'Scrum & Lean Expertise',
    desc: 'We meticulously follow Agile methodology using Scrum & Lean principles to deliver products with maximum performance and efficiency.',
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    )
  },
];

const getVisibleCards = (activeIdx, total) => {
  const prev = (activeIdx - 1 + total) % total;
  const next = (activeIdx + 1) % total;
  return [prev, activeIdx, next];
};

export default function Beliefs() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalCards = beliefsData.length;

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % totalCards);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + totalCards) % totalCards);
  const goTo = (i) => setActiveIdx(i);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(handleNext, 2800);
      return () => clearInterval(interval);
    }
  }, [isHovered, totalCards]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.beliefs-fade-up',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.06,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.beliefs-card-enter',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.55,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: {
            trigger: '.beliefs-card-track',
            start: 'top 84%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const visible = getVisibleCards(activeIdx, totalCards);

  return (
    <section
      ref={containerRef}
      id="beliefs"
      className="py-20 md:py-32 bg-paper relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(21,145,220,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(54,103,166,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-[92%] max-w-[1100px] mx-auto">
        <div className="flex flex-col items-center gap-10 lg:gap-14">
          <div className="w-full max-w-[680px] text-center flex flex-col items-center gap-6">
            <span className="beliefs-fade-up eyebrow text-brand tracking-widest uppercase text-xs font-semibold mb-1 block">
              What we believe
            </span>
            <h2 className="beliefs-fade-up font-serif text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.12] text-ink font-normal text-center">
              Principles that <em className="text-ink-3 not-italic">guide every decision</em>
            </h2>
          </div>

          <div className="beliefs-card-track w-full max-w-[1000px] beliefs-card-enter">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visible.map((dataIdx, position) => {
                const isCenter = position === 1;
                const item = beliefsData[dataIdx];

                return (
                  <div
                    key={dataIdx}
                    className={`
                      relative rounded-2xl border p-7 md:p-8 flex flex-col gap-5
                      transition-all duration-500 ease-out
                      ${isCenter
                        ? 'bg-white border-[#BDD8F1]/70 shadow-[0_20px_50px_-12px_rgba(33,65,119,0.12)] scale-100 opacity-100'
                        : 'bg-paper border-paper-3/20 shadow-none scale-[0.97] opacity-60'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-15 h-15 rounded-lg flex items-center justify-center flex-shrink-0 ${isCenter ? 'bg-brand-light text-brand' : 'bg-paper-2 text-ink-3'}`}>
                        {item.icon}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-serif leading-snug mb-2 ${isCenter ? 'text-[1.25rem] md:text-[1.4rem] text-ink' : 'text-[1.1rem] text-ink-2'}`}>
                        {item.title}
                      </h3>
                      <p className={`leading-relaxed ${isCenter ? 'text-[0.9rem] text-ink-2' : 'text-[0.82rem] text-ink-3'}`}>
                        {item.desc}
                      </p>
                    </div>

                    {isCenter && (
                      <div className="flex items-center gap-1.5 pt-3 border-t border-ink/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                        <span className="text-[0.62rem] font-bold tracking-widest text-brand uppercase font-sans">
                          Cryptware Principle
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-[#BDD8F1]/70 bg-white/50 backdrop-blur-sm flex items-center justify-center text-[#2C5EAD] hover:bg-[#C4E2F5]/60 hover:scale-105 active:scale-95 transition-all duration-200"
                aria-label="Previous"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex items-center gap-2.5">
                {beliefsData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ease-out ${i === activeIdx ? 'w-7 bg-[#1591DC]' : 'w-2 bg-[#BDD8F1] hover:bg-[#82A6CB]/60'}`}
                    aria-label={`Go to principle ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-[#BDD8F1]/70 bg-white/50 backdrop-blur-sm flex items-center justify-center text-[#2C5EAD] hover:bg-[#C4E2F5]/60 hover:scale-105 active:scale-95 transition-all duration-200"
                aria-label="Next"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
