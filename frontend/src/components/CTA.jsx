import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (innerRef.current) {
        gsap.fromTo(innerRef.current.children,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="cta-section bg-ink text-white py-24 md:py-36 relative overflow-hidden"
    >
      {/* Background visual overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(6,163,218,0.12),transparent)] pointer-events-none" />

      <div className="w-[92%] max-w-[1280px] mx-auto relative z-10 text-center">
        <div ref={innerRef} className="cta-inner max-w-[800px] mx-auto flex flex-col items-center gap-6">
          
          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.08] tracking-tight font-normal">
            Ready to build something extraordinary?
          </h2>
          
          <p className="text-white/50 text-[1.05rem] leading-[1.75] font-light max-w-[580px] mb-4">
            Let's collaborate to bring your vision to life with precision and elegance. We're just one conversation away.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2">
            <a
              href="mailto:info@cryptwareinfotech.com"
              className="text-[0.9rem] font-medium px-8 py-3.5 rounded-[50px] bg-brand text-white inline-flex items-center gap-2 transition-all duration-[300ms] ease-ease-back hover:bg-brand-h hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(6,163,218,0.15)]"
            >
              <span>Start a conversation</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="tel:+917490971996"
              className="text-[0.9rem] font-medium px-8 py-3.5 rounded-[50px] border border-white/10 text-white inline-flex items-center gap-2 hover:bg-white/5 hover:border-white/20 transition-all duration-[300ms] ease-ease-back"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
              </svg>
              +91 7490971996
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
