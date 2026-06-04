import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metricsData = [
  { n: '10+', l: 'Apps live on stores' },
  { n: '50+', l: 'Worldwide clients' },
  { n: '99%', l: 'Upwork success score' },
  { n: '24/7', l: 'Support availability' }
];

export default function About() {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const floatCardRef = useRef(null);
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(frameRef.current, {
      rotateX,
      rotateY,
      duration: 0.45,
      ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transformPerspective: 1000,
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = () => {
    if (!frameRef.current) return;
    gsap.to(frameRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      overwrite: 'auto'
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fading
      gsap.fromTo('.about-fade-up', 
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
      gsap.fromTo('.about-title', 
        { y: 20 }, 
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-title',
            start: 'top bottom',
            end: 'top 40%',
            scrub: 0.5
          }
        }
      );

      // Metrics staggers
      gsap.fromTo('.metric-box', 
        { opacity: 0, scale: 0.96 }, 
        {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: '.metrics-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Visual panel fade right
      gsap.fromTo('.about-visual-panel',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-visual-panel',
            start: 'top 82%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating badge animations (looping)
      gsap.to(badgeRef.current, {
        y: -8,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      gsap.to(floatCardRef.current, {
        y: 6,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-20 md:py-32 bg-paper-2">
      <div className="w-[92%] max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: CONTENT & METRICS */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="about-fade-up eyebrow text-brand tracking-widest uppercase text-xs font-semibold mb-3 block">
              Who we are
            </span>
            <h2 className="about-title about-fade-up font-serif text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.12] text-ink font-normal">
              We care about <em className="text-ink-3 not-italic">your success</em>
            </h2>
            <p className="about-fade-up text-ink-3 text-[0.95rem] leading-[1.75]">
              We are a team of extremely talented web and mobile app developers who love what they do and truly believe in creating long-term partnerships with our clients.
            </p>
            <p className="about-fade-up text-ink-3 text-[0.95rem] leading-[1.75]">
              Our team works hand-in-hand with clients to ensure the product not only succeeds but leaves a lasting impression — easy to use, thoughtfully designed, built around real users.
            </p>
            <p className="about-fade-up text-ink-3 text-[0.95rem] leading-[1.75]">
              We care about your success because it's directly tied to ours. We'd be honoured to be part of your journey.
            </p>

            {/* Metrics grid */}
            <div className="metrics-grid grid grid-cols-2 gap-4 md:gap-6 mt-4">
              {metricsData.map((m, idx) => (
                <div
                  key={idx}
                  className="metric-box bg-paper hover:shadow-[0_8px_30px_rgba(11,11,15,0.015)] p-6 rounded-xl border border-paper-3/45 flex flex-col gap-1 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3.5xl font-serif text-brand font-normal select-none">
                    {m.n}
                  </div>
                  <div className="text-[0.78rem] tracking-wider text-ink-3 font-medium select-none">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Call to action pill */}
            <a
              href="tel:+917490971996"
              className="about-fade-up contact-pill inline-flex items-center gap-4 bg-paper hover:bg-white hover:shadow-[0_10px_35px_rgba(6,163,218,0.08)] border border-paper-3/45 p-4 rounded-full max-w-max mt-4 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand group-hover:scale-110 transition-transform duration-300">
                <svg fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[0.72rem] tracking-wider text-ink-3 uppercase font-medium">Call to ask any question</p>
                <strong className="text-[0.95rem] text-ink font-semibold group-hover:text-brand transition-colors">+91 7490971996</strong>
              </div>
            </a>
          </div>

          {/* RIGHT: PHOTO VISUAL */}
          <div className="lg:col-span-5 about-visual-panel relative flex justify-center py-8">
            {/* Floating Badge */}
            <div
              ref={badgeRef}
              className="absolute -top-4 left-0 md:-left-4 lg:left-2 bg-brand text-white px-5 md:px-6 py-3 md:py-4.5 rounded-xl shadow-[0_12px_36px_rgba(6,163,218,0.22)] flex flex-col gap-1 z-20 select-none text-left"
            >
              <strong className="font-serif text-2xl md:text-3xl leading-none">7+</strong>
              <span className="text-[0.65rem] md:text-[0.72rem] tracking-widest text-white/80 uppercase font-semibold leading-none">Years of craft</span>
            </div>

            {/* Main Picture Frame */}
            <div className="perspective-[1000px] w-full max-w-[380px] aspect-[4/5] z-10" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div ref={frameRef} className="w-full h-full bg-paper border-[10px] border-paper rounded-3xl shadow-[0_16px_50px_rgba(11,11,15,0.06)] overflow-hidden relative group transform-gpu">
                <img
                src="/assets/img/about.png"
                alt="About Us"
                className="w-full h-full object-cover scale-100 group-hover:scale-103 transition-transform duration-700 ease-ease"
                onError={(e) => {
                  // Fallback to placeholder design if asset fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 flex-col items-center justify-center bg-paper-2 text-ink-3 text-center p-6 gap-3">
                <svg fill="none" strokeWidth="0.8" stroke="currentColor" viewBox="0 0 24 24" className="w-12 h-12 text-ink-3/40">
                  <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-xs uppercase tracking-wide">Add your team or office image here (aboutUs1.jpg)</p>
              </div>
            </div>
          </div>

            {/* Headquarters Floating Card */}
            <div
              ref={floatCardRef}
              className="absolute -bottom-6 right-0 md:-right-4 lg:-right-4 bg-paper border border-paper-3/45 p-5 md:p-6 rounded-xl shadow-[0_12px_42px_rgba(11,11,15,0.06)] flex flex-col gap-1.5 text-left max-w-[200px] md:max-w-[240px] z-20"
            >
              <div className="text-[0.65rem] md:text-[0.68rem] tracking-widest text-brand uppercase font-bold">Headquarters</div>
              <strong className="text-[0.85rem] md:text-[0.925rem] text-ink font-semibold">Ahmedabad, Gujarat</strong>
              <span className="text-[0.65rem] md:text-[0.72rem] text-ink-3 leading-relaxed">B-610, Titanium City Centre, Satellite — 380015</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
