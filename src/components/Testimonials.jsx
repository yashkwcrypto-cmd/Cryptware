import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    q: '"Cryptware delivered beyond our expectations. Their attention to detail, premium design approach, and robust technical execution completely transformed our digital presence."',
    a: 'Sarah Jenkins',
    t: 'CTO, FutureTech Inc.'
  },
  {
    q: '"Working with Cryptware felt like having a true product partner. They didn\'t just code — they thought about our users, our business, and our long-term goals."',
    a: 'Rajiv Mehta',
    t: 'Founder, GrowthOS'
  },
  {
    q: '"Transparent, on-time, and technically excellent. The team at Cryptware has become our go-to development partner for everything digital."',
    a: 'Priya Nair',
    t: 'VP Product, FinStack'
  }
];

export default function Testimonials() {
  const [cur, setCur] = useState(0);
  const containerRef = useRef(null);
  const textGroupRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger entrance
    const ctx = gsap.context(() => {
      gsap.fromTo('.testi-fade-up',
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Interval for changing testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      handleSwitch((cur + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [cur]);

  const handleSwitch = (index) => {
    if (index === cur) return;
    
    // Animate out and then in with new content
    gsap.fromTo(textGroupRef.current.children,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.04,
        ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        onComplete: () => {
          setCur(index);
          gsap.fromTo(textGroupRef.current.children,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.06,
              ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }
          );
        }
      }
    );
  };

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-paper flex items-center justify-center">
      <div className="w-[92%] max-w-[1280px] mx-auto text-center">
        <div className="testi-container max-w-[800px] mx-auto flex flex-col items-center gap-6">
          <span className="testi-fade-up eyebrow text-brand tracking-widest uppercase text-xs font-semibold mb-2 block">
            What clients say
          </span>

          {/* Dots Indicator */}
          <div className="testi-fade-up flex gap-3.5 mb-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSwitch(idx)}
                className={`testi-mark w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === cur ? 'bg-brand scale-120' : 'bg-paper-3 hover:bg-ink-3'
                }`}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>

          {/* Star reviews */}
          <div className="testi-fade-up flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-[18px] h-[18px] fill-brand text-brand" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Quote & Author Group */}
          <div ref={textGroupRef} className="testi-fade-up w-full mt-2">
            <p className="testi-quote font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-ink leading-relaxed font-normal min-h-[140px] flex items-center justify-center">
              {testimonials[cur].q}
            </p>
            <div className="testi-author flex flex-col gap-0.5 mt-8">
              <strong className="text-[0.95rem] text-ink font-semibold">{testimonials[cur].a}</strong>
              <span className="text-[0.78rem] text-ink-3 tracking-wide">{testimonials[cur].t}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
