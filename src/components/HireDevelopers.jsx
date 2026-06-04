import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    icon: (
      <svg className="w-6 h-6 stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Frontend Developers',
    skills: ['React', 'Angular', 'Vue', 'Next.js', 'TypeScript'],
    color: 'from-blue-500/10 to-cyan-500/5',
    border: 'border-blue-500/15',
  },
  {
    icon: (
      <svg className="w-6 h-6 stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3" />
      </svg>
    ),
    title: 'Backend Developers',
    skills: ['.NET Core', 'Node.js', 'PHP', 'AWS', 'Azure'],
    color: 'from-purple-500/10 to-violet-500/5',
    border: 'border-purple-500/15',
  },
  {
    icon: (
      <svg className="w-6 h-6 stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: 'Mobile Developers',
    skills: ['Flutter', 'Kotlin', 'React Native', 'iOS', 'Android'],
    color: 'from-emerald-500/10 to-green-500/5',
    border: 'border-emerald-500/15',
  },
  {
    icon: (
      <svg className="w-6 h-6 stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'UI/UX Designers',
    skills: ['Figma', 'Adobe XD', 'InVision', 'Framer', 'Prototyping'],
    color: 'from-orange-500/10 to-amber-500/5',
    border: 'border-orange-500/15',
  },
];

const engagementModels = [
  {
    title: 'Monthly Hiring',
    desc: '160 dedicated man-hours per month. Rolling monthly contracts, full flexibility.',
    icon: '📅',
  },
  {
    title: 'Yearly Contracts',
    desc: 'Long-term partnerships with priority resource allocation and discounted rates.',
    icon: '📋',
  },
  {
    title: 'Project-Based',
    desc: 'Fixed scope, fixed timeline, fixed budget. Perfect for well-defined deliverables.',
    icon: '🎯',
  },
];

const perks = [
  'Developers work in your timezone',
  'Daily status updates via email or Slack',
  'Direct access via Skype, calls, and chat',
  'Weekly code delivery & demos',
  'Agile/Scrum methodology guaranteed',
  'No hidden fees — full cost transparency',
];

export default function HireDevelopers() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hire-fade-up',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.06,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo('.hire-role-card',
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.hire-roles-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo('.engagement-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.engagement-grid',
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hire" className="relative bg-ink text-white overflow-hidden py-24 md:py-36">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(6,163,218,0.10),transparent_70%)] pointer-events-none" />

      <div className="w-[92%] max-w-[1280px] mx-auto relative z-10">

        {/* HEADER */}
        <div className="max-w-[680px] mb-16">
          <span className="hire-fade-up block text-brand tracking-[0.16em] uppercase text-[0.72rem] font-semibold mb-4">
            Hire Developers
          </span>
          <h2 className="hire-fade-up font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.1] font-normal mb-6">
            Build your team with<br />
            <em className="text-white/40 not-italic">world-class talent</em>
          </h2>
          <p className="hire-fade-up text-white/55 text-[1rem] leading-[1.8] max-w-[560px]">
            Hire dedicated developers who work exclusively on your project — following your timezone, your workflow, and your vision. From startup MVPs to enterprise platforms, we have the expertise you need.
          </p>
        </div>

        {/* ROLE CARDS */}
        <div className="hire-roles-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className={`hire-role-card relative group bg-gradient-to-br ${role.color} border ${role.border} rounded-2xl p-7 hover:border-brand/30 hover:shadow-[0_16px_40px_rgba(6,163,218,0.08)] transition-all duration-500 cursor-default`}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

              <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {role.icon}
              </div>

              <h3 className="text-[1rem] font-semibold text-white mb-4 leading-tight">{role.title}</h3>

              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[0.7rem] px-2.5 py-1 rounded-full bg-white/6 text-white/60 border border-white/8 tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ENGAGEMENT + PERKS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Engagement Models */}
          <div>
            <h3 className="hire-fade-up font-serif text-2xl text-white font-normal mb-8">
              Engagement Models
            </h3>
            <div className="engagement-grid flex flex-col gap-5">
              {engagementModels.map((m, idx) => (
                <div
                  key={idx}
                  className="engagement-card flex items-start gap-5 p-6 rounded-xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-brand/25 transition-all duration-300 group"
                >
                  <div className="text-2xl flex-shrink-0 mt-0.5">{m.icon}</div>
                  <div>
                    <h4 className="text-[0.95rem] font-semibold text-white mb-1.5">{m.title}</h4>
                    <p className="text-[0.875rem] text-white/50 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Perks list + CTA */}
          <div>
            <h3 className="hire-fade-up font-serif text-2xl text-white font-normal mb-8">
              What You Get
            </h3>
            <ul className="flex flex-col gap-4 mb-10">
              {perks.map((perk, idx) => (
                <li key={idx} className="hire-fade-up flex items-center gap-3 text-[0.925rem] text-white/75">
                  <span className="w-[22px] h-[22px] rounded-full bg-brand/20 flex items-center justify-center text-brand flex-shrink-0 shadow-[0_2px_10px_rgba(6,163,218,0.2)]">
                    <svg className="w-[12px] h-[12px] stroke-current" fill="none" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex text-[0.9rem] font-semibold px-6 py-3 bg-brand text-white rounded-full transition-all duration-300 ease-out hover:bg-brand/90 hover:scale-[1.05] hover:shadow-[0_8px_20px_-6px_rgba(6,163,218,0.5)] items-center justify-center gap-2"
              >
                Start Hiring
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="tel:+917490971996"
                className="inline-flex items-center justify-center gap-2 text-[0.9rem] font-medium px-7 py-3.5 rounded-full border border-white/12 text-white/70 hover:text-white hover:border-white/25 transition-all duration-300"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                </svg>
                +91 7490971996
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
