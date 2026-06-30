import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Hero3D from './Hero3D';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const hardwareVideos = [
  { src: '/assets/video/warehouse.mp4', label: 'Warehouse Flow', metric: 'Scan' },
  { src: '/assets/video/BarcodeLabelPrinter.mp4', label: 'Label Printing', metric: 'Print' },
  { src: '/assets/video/Logistics&Shiping.mp4', label: 'Logistics Ready', metric: 'Ship' },
  { src: '/assets/video/HandpluggingUSBprinter.mp4', label: 'Fast Setup', metric: 'Deploy' }
];

const hardwareCapabilities = [
  'Barcode printers',
  'RFID systems',
  'POS terminals',
  'Mobile computers',
  'Labels & ribbons'
];

export default function Hero({ isHardwareRoute = false }) {
  const sectionRef = useRef(null);
  const gridLinesRef = useRef(null);
  const gradientRef = useRef(null);

  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctxGsap = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
        .to(titleRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power4.out' }, '-=0.4')
        .to(subtitleRef.current, { y: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .to(scrollRef.current, { opacity: 1, duration: 0.6 }, '-=0.2');

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

    return () => ctxGsap.revert();
  }, [isHardwareRoute]);

  const scrollToSection = (targetId) => {
    const target = document.querySelector(targetId);
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 72 },
        ease: 'power3.inOut'
      });
    }
  };

  const handlePrimaryClick = (e) => {
    e.preventDefault();
    scrollToSection(isHardwareRoute ? '#catalog' : '#services');
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    scrollToSection('#contact-us');
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`min-height-screen min-h-[100vh] flex items-center pt-[calc(72px+4rem)] relative overflow-hidden ${isHardwareRoute ? 'bg-[#071014] pb-[8.5rem] md:pb-[9.5rem]' : 'bg-ink pb-20'}`}
    >
      {!isHardwareRoute && <Hero3D />}

      {isHardwareRoute && (
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-45 saturate-[1.1]"
            src="/assets/video/full.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,20,0.97)_0%,rgba(7,16,20,0.82)_40%,rgba(7,16,20,0.38)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_32%,rgba(6,163,218,0.24),transparent_34%),radial-gradient(circle_at_22%_82%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(180deg,rgba(7,16,20,0)_48%,#071014_100%)]" />
          <div className="absolute inset-x-0 top-[38%] h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_46%,rgba(255,255,255,0.06)_47%,transparent_48%,transparent_100%)] opacity-60" />
        </div>
      )}

      <div
        ref={gradientRef}
        className={`absolute inset-0 z-[1] pointer-events-none ${isHardwareRoute ? 'bg-[radial-gradient(ellipse_55%_50%_at_18%_45%,rgba(6,163,218,0.18)_0%,transparent_68%)]' : 'bg-[radial-gradient(ellipse_70%_60%_at_65%_50%,rgba(6,163,218,0.12)_0%,transparent_70%),radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(6,163,218,0.07)_0%,transparent_60%)]'}`}
      />
      <div
        ref={gridLinesRef}
        className={`absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] ${isHardwareRoute ? 'bg-[size:56px_56px]' : 'bg-[size:80px_80px]'}`}
      />

      <div className="w-[92%] max-w-[1280px] mx-auto relative z-10">
        {isHardwareRoute ? (
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,0.92fr)] xl:gap-14">
            <div className="relative z-10">
              <div
                ref={eyebrowRef}
                className="inline-flex items-center gap-[0.6rem] text-[0.72rem] tracking-[0.16em] uppercase text-white/68 mb-[1.6rem] border border-white/15 bg-white/[0.045] backdrop-blur-md rounded-[50px] px-4 py-1.5 opacity-0 translate-y-9"
              >
                <div className="w-[7px] h-[7px] rounded-full bg-brand relative">
                  <div className="absolute inset-[-3px] rounded-full bg-brand opacity-30 animate-ripple" />
                </div>
                Industrial hardware systems
              </div>

              <h1
                ref={titleRef}
                className="font-serif text-[clamp(3rem,5.55vw,5.55rem)] font-normal leading-[1.01] tracking-tight text-white mb-0 max-w-[11.5ch]"
                style={{ clipPath: 'inset(0 0 100% 0)' }}
              >
                Scan. Print. Track. <span className="text-brand italic">Move</span> faster.
              </h1>

              <div className="overflow-hidden mt-[1.55rem] mb-[1.9rem]">
                <p
                  ref={subtitleRef}
                  className="text-[1.02rem] text-white/64 leading-[1.75] max-w-[570px] font-light translate-y-full"
                >
                  Deploy barcode printers, scanners, RFID, POS systems, mobile computers, labels, and rollout support for warehouses, retail counters, logistics teams, and production floors.
                </p>
              </div>

              <div ref={actionsRef} className="opacity-0 translate-y-5">
                <div className="flex items-center gap-[1.1rem] flex-wrap">
                  <a
                    href="#catalog"
                    onClick={handlePrimaryClick}
                    className="text-[0.9rem] font-semibold px-7 py-3.5 rounded-[50px] bg-brand text-white inline-flex items-center gap-2 relative overflow-hidden transition-all duration-[300ms] ease-ease-back hover:bg-brand-h hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(6,163,218,0.22)]"
                  >
                    <span>Explore hardware</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="#contact-us"
                    onClick={handleContactClick}
                    className="text-[0.9rem] text-white/62 inline-flex items-center gap-2 transition-all hover:text-white hover:gap-[0.8rem] duration-[300ms] ease-ease-back"
                  >
                    Build my setup
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                <div className="mt-7 flex max-w-[650px] flex-wrap gap-2.5">
                  {hardwareCapabilities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 bg-white/[0.045] px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/60 backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid max-w-[620px] grid-cols-3 gap-3 border-t border-white/10 pt-5">
                  {[
                    ['48h', 'deployment plan'],
                    ['24/7', 'support desk'],
                    ['360', 'site rollout']
                  ].map(([value, label]) => (
                    <div key={label} className="min-w-0">
                      <strong className="block text-[1.35rem] leading-none text-white">{value}</strong>
                      <span className="mt-2 block text-[0.66rem] uppercase tracking-[0.14em] text-white/38">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-7 top-12 hidden h-28 w-px rotate-12 bg-gradient-to-b from-brand/60 to-transparent lg:block" />
              <div className="absolute -right-4 bottom-20 hidden h-px w-32 bg-gradient-to-r from-transparent to-white/18 lg:block" />

              <div className="relative mx-auto max-w-[600px]">
                <div className="absolute -inset-4 rounded-[32px] border border-white/8 bg-white/[0.025] backdrop-blur-sm" />
                <div className="relative overflow-hidden rounded-[24px] border border-white/16 bg-[#0d171d] p-2.5 shadow-[0_32px_110px_rgba(0,0,0,0.45)]">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_16px_rgba(6,163,218,0.9)]" />
                      <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/58">Operations feed</span>
                    </div>
                    <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/36">CW-HW-01</span>
                  </div>

                  <div className="relative mt-2.5 aspect-[1.08] overflow-hidden rounded-[18px] bg-black">
                    <video
                      className="h-full w-full object-cover"
                      src="/assets/video/warehouse.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.62)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:100%_34px] opacity-20" />

                    <div className="absolute left-4 top-4 rounded-full border border-white/18 bg-black/30 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/72 backdrop-blur">
                      Live warehouse
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-white/48">Floor-ready stack</span>
                          <p className="mt-1 max-w-[330px] text-[1.18rem] font-semibold leading-snug text-white">
                            Devices, labels, network, and training planned as one rollout.
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/16 bg-white/10 px-4 py-3 backdrop-blur-md">
                          <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-white/42">Uptime target</span>
                          <strong className="mt-1 block text-[1.45rem] leading-none text-white">99%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {hardwareVideos.map((video) => (
                      <div key={video.src} className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-1.5">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                          <video
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={video.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/58 to-transparent" />
                          <span className="absolute bottom-1.5 left-1.5 text-[0.56rem] font-bold uppercase tracking-[0.12em] text-white">
                            {video.metric}
                          </span>
                        </div>
                        <span className="mt-1.5 block truncate px-0.5 text-[0.57rem] font-bold uppercase tracking-[0.12em] text-white/48">
                          {video.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute -left-5 bottom-16 hidden w-[170px] rounded-2xl border border-brand/18 bg-[#081419]/90 p-4 shadow-[0_18px_54px_rgba(0,0,0,0.35)] backdrop-blur-md md:block">
                  <span className="block text-[0.62rem] uppercase tracking-[0.16em] text-brand">Integration</span>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-white/72">Printers, scanners, RFID, POS, and ERP workflows aligned before rollout.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-[0.6rem] text-[0.78rem] tracking-[0.14em] uppercase text-white/40 mb-[2.2rem] border border-white/10 rounded-[50px] px-4 py-1.5 opacity-0 translate-y-9"
            >
              <div className="w-[7px] h-[7px] rounded-full bg-[#4ade80] relative">
                <div className="absolute inset-[-3px] rounded-full bg-[#4ade80] opacity-30 animate-ripple" />
              </div>
              Available for new projects
            </div>

            <h1
              ref={titleRef}
              className="font-serif text-[clamp(3.4rem,6vw,6rem)] font-normal leading-[1.04] tracking-tight text-white mb-0 max-w-[14ch]"
              style={{ clipPath: 'inset(0 0 100% 0)' }}
            >
              Shaping the future<br />of <span className="text-brand italic">digital</span><br />experiences.
            </h1>

            <div className="overflow-hidden mt-[1.8rem] mb-[2.8rem]">
              <p
                ref={subtitleRef}
                className="text-[1.1rem] text-white/45 leading-[1.75] max-w-[480px] font-light translate-y-full"
              >
                We build premium, conversion-focused web &amp; mobile applications that elevate your brand and drive measurable growth with precision and craft.
              </p>
            </div>

            <div ref={actionsRef} className="flex items-center gap-[1.4rem] flex-wrap mb-22 opacity-0 translate-y-5">
              <a
                href="#services"
                onClick={handlePrimaryClick}
                className="text-[0.9rem] font-medium px-8 py-3.5 rounded-[50px] bg-brand text-white inline-flex items-center gap-2 relative overflow-hidden transition-all duration-[300ms] ease-ease-back hover:bg-brand-h hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(6,163,218,0.18)]"
              >
                <span>Explore our work</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#contact-us"
                onClick={handleContactClick}
                className="text-[0.9rem] text-white/50 inline-flex items-center gap-2 transition-all hover:text-white hover:gap-[0.8rem] duration-[300ms] ease-ease-back"
              >
                Start a conversation
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </>
        )}
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-[2.5rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 text-white/30 text-[0.72rem] tracking-[0.14em] uppercase opacity-0"
      >
        <div className="w-[1px] h-[50px] bg-gradient-to-b from-brand to-transparent animate-scroll-drop" />
        Scroll
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[90px] z-10 bg-paper rounded-[80px_80px_0_0]" />
    </section>
  );
}
