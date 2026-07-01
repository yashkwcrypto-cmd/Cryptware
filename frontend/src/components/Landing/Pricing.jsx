import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const defaultFeatures = [
  { text: 'Unlimited users', bold: true },
  { text: 'Product, customer & supplier management' },
  { text: 'Purchase and sales entry' },
  { text: 'Stock tracking and movement' },
  { text: 'Invoice and expense tracking' },
  { text: 'Business reports dashboard' },
  { text: 'Priority support' },
  { text: 'This is our Standard plan. Need more advanced features? Contact us for custom pricing' },
];

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    badge: null,
    originalPrice: '₹599',
    price: '₹499',
    period: '/month',
    tagline: 'Flexible billing for short-term needs',
    features: defaultFeatures,
    cta: 'Start Monthly',
    featured: false,
    gradient: 'from-paper to-paper-2',
    borderClass: 'border-paper-3',
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    badge: 'Popular',
    originalPrice: '₹2000',
    price: '₹1499',
    period: '/quarter',
    tagline: 'Perfect for seasonal operations',
    features: defaultFeatures,
    cta: 'Start Quarterly',
    featured: true,
    gradient: 'from-[#f4fbff] to-white',
    borderClass: 'border-brand',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    badge: 'Best Value',
    originalPrice: '₹5988',
    price: '₹4999',
    period: '/year',
    tagline: 'Best value for long-term commitment',
    features: defaultFeatures,
    cta: 'Start Yearly',
    featured: false,
    gradient: 'from-paper to-paper-2',
    borderClass: 'border-paper-3',
  },
];

const notes = [
  { icon: '📅', text: 'Billed monthly, cancel anytime' },
  { icon: '🔄', text: 'Upgrade anytime' },
  { icon: '🧾', text: 'Taxes extra if applicable' },
];

export default function Pricing() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-fade-up',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.06, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.fromTo('.pricing-card-anim',
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.12, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: { trigger: '.pricing-cards', start: 'top 84%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-20 md:py-36 bg-paper-2 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,163,218,0.05),transparent_60%)] pointer-events-none" />

      <div className="w-[92%] max-w-[1280px] mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="pricing-fade-up block text-brand tracking-[0.16em] uppercase text-[0.72rem] font-semibold mb-4">
            Pricing
          </span>
          <h2 className="pricing-fade-up font-serif text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.12] text-ink font-normal">
            ERP - Cryptware Infotech Solutions LLP
          </h2>
          <p className="pricing-fade-up text-ink-3 text-[0.95rem] max-w-[480px] mx-auto mt-4 leading-relaxed">
            Simple, transparent pricing. No hidden fees. Choose the plan that fits your team and start managing operations with confidence.
          </p>

        </div>

        {/* CARDS */}
        <div className="pricing-cards grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 mb-14">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card-anim w-full min-w-0 relative bg-gradient-to-b ${plan.gradient} border-2 ${plan.borderClass} rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(11,11,15,0.08)] ${plan.featured ? 'shadow-[0_12px_40px_rgba(6,163,218,0.12)]' : 'shadow-sm'}`}
            >
              {/* Best Value Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-brand text-white text-[0.72rem] font-bold tracking-[0.12em] uppercase px-5 py-1.5 rounded-full shadow-[0_6px_20px_rgba(6,163,218,0.35)]">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-6">
                <p className="text-brand text-[0.72rem] tracking-[0.18em] uppercase font-bold mb-2">{plan.name} Plan</p>
                <p className="text-ink-3 text-[0.875rem] leading-relaxed">{plan.tagline}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-paper-3 mb-6" />

              {/* Price */}
              <div className="mb-8">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-ink-3/50 line-through text-[1.2rem] font-medium">
                    {plan.originalPrice}
                  </span>
                  <span className="font-serif text-[clamp(2.8rem,5vw,3.6rem)] text-ink leading-none font-normal">
                    {plan.price}
                  </span>
                  <span className="text-ink-3 text-[0.875rem]">
                    {plan.period} <span className="text-[0.75rem] text-ink-3/70 ml-1">+ GST</span>
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-4 flex-1 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.9rem]">
                    <span className="w-[22px] h-[22px] rounded-full bg-brand/10 flex items-center justify-center text-brand flex-shrink-0 shadow-[0_2px_10px_rgba(6,163,218,0.15)] mt-0.5">
                      <svg className="w-[12px] h-[12px] stroke-current" fill="none" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className={f.bold ? 'font-semibold text-ink' : 'text-ink-2'}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact-us"
                className={`inline-flex w-full text-[0.9rem] font-semibold px-6 py-4 rounded-full transition-all duration-300 ease-out items-center justify-center gap-2 ${plan.featured
                  ? 'bg-brand text-white hover:bg-brand/90 hover:shadow-[0_10px_30px_rgba(6,163,218,0.22)]'
                  : 'bg-ink text-white hover:bg-ink/90 hover:shadow-[0_10px_30px_rgba(0,0,0,0.18)]'
                  }`}
              >
                {plan.cta}
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="pricing-fade-up flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
          {notes.map((n, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[0.875rem] text-ink-3">
              <span className="text-base">{n.icon}</span>
              <span>{n.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
