import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const checklistItems = [
  'Develop MVP & release versions frequently',
  'Daily reporting & weekly code delivery',
  'Direct developer access — Skype, calls, chat',
  'Flexible timezone — monthly or yearly hiring'
];

const cards3dData = [
  { label: 'Our approach', quote: '"Think like a product, not as tasks or features."' },
  { label: 'Our commitment', quote: '"Reasonable promises. Extraordinary delivery. Always."' },
  { label: 'Our culture', quote: '"We invest 20% of profit training and developing our people."' }
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const dotsRef = useRef(null);
  const glowRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // ── SCROLL TRIGGER PARALLAX ──
    const ctx = gsap.context(() => {
      gsap.to(dotsRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to(glowRef.current, {
        yPercent: -30,
        xPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Section titles fade
      gsap.fromTo('.why-fade-up',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.06,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // checklist trigger
      gsap.fromTo('.check-item-li',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: '.check-list-ul',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // card-3d container entry fade
      gsap.fromTo(cardsContainerRef.current,
        { opacity: 0, x: 45 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    // ── 3D TILT ON CARDS ──
    const cardsContainer = cardsContainerRef.current;
    const cards = cardRefs.current;

    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) return; // Already have a frame queued — skip
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!cardsContainer) return;
        const rect = cardsContainer.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = ((e.clientY - cy) / rect.height) * 16;
        const ry = -((e.clientX - cx) / rect.width) * 16;

        gsap.to(cardsContainer, {
          rotateX: rx,
          rotateY: ry,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 800,
          overwrite: 'auto'
        });

        cards.forEach((card, i) => {
          if (!card) return;
          const depth = (i + 1) * 8;
          gsap.to(card, {
            x: ry * depth * 0.02,
            y: -rx * depth * 0.02,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      });
    };

    const handleMouseLeave = () => {
      if (!cardsContainer) return;
      gsap.to(cardsContainer, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.65,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        overwrite: 'auto'
      });
      cards.forEach((card) => {
        if (!card) return;
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'power3.out'
        });
      });
    };

    if (cardsContainer) {
      cardsContainer.addEventListener('mousemove', handleMouseMove);
      cardsContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      ctx.revert();
      if (cardsContainer) {
        cardsContainer.removeEventListener('mousemove', handleMouseMove);
        cardsContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="why" className="relative overflow-hidden bg-ink py-24 md:py-36 text-white">
      {/* Parallax Background overlays */}
      <div
        ref={dotsRef}
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none"
      />
      <div
        ref={glowRef}
        className="absolute top-[20%] left-[55%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,163,218,0.18)_0%,transparent_65%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      <div className="w-[92%] max-w-[1280px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* CONTENT PANEL */}
          <div>
            <span className="why-fade-up eyebrow text-brand tracking-widest uppercase text-xs font-semibold mb-3 block">
              Why choose Cryptware
            </span>
            <h2 className="why-fade-up font-serif text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.12] mb-6 font-normal">
              Thinkers, makers<br />
              <em className="text-white/40 not-italic">and partners</em>
            </h2>
            <p className="why-fade-up text-white/60 leading-[1.75] mb-4 text-[0.95rem]">
              We closely work with your team to build an MVP that solves primary problems. Leveraging rich Scrum &amp; Lean experience, we follow Agile to deliver with the highest performance.
            </p>
            <p className="why-fade-up text-white/60 leading-[1.75] mb-8 text-[0.95rem]">
              We don't believe in selling services that don't serve your needs. We listen closely, research deeply, and build transparently.
            </p>

            {/* Checklist */}
            <ul className="check-list-ul flex flex-col gap-4">
              {checklistItems.map((item, idx) => (
                <li key={idx} className="check-item-li flex items-center gap-3 text-[0.925rem] text-white/80 opacity-0 translate-y-5">
                  <span className="w-[22px] h-[22px] rounded-full bg-brand/20 flex items-center justify-center text-brand flex-shrink-0 shadow-[0_2px_10px_rgba(6,163,218,0.2)]">
                    <svg className="w-[12px] h-[12px] stroke-current" fill="none" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3D CARDS VISUAL PANEL */}
          <div className="flex justify-center select-none w-full">
            <div
              ref={cardsContainerRef}
              className="cards-3d"
            >
              {cards3dData.map((card, i) => (
                <div
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="card-3d"
                >
                  <div className="card-3d-label">
                    {card.label}
                  </div>
                  <div className="card-3d-body">
                    {card.quote}
                  </div>
                  <div className="card-3d-bar" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
