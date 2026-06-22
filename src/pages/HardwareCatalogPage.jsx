import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hardwareCategories, hardwareIndustries } from '../data/catalog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import CustomCursor from '../components/CustomCursor';

// ─── Category Icon SVGs ────────────────────────────────────────────────────────
const CategoryIcon = ({ id, className = 'w-8 h-8' }) => {
  const icons = {
    printers: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
    ),
    scanner: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
        <path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="7.01" y2="12"/><line x1="12" y1="12" x2="17" y2="12"/>
      </svg>
    ),
    mobile: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    pos: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        <path d="M7 7h2v4H7z"/><path d="M13 7h4"/><path d="M13 11h4"/>
      </svg>
    ),
    rfid: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <circle cx="12" cy="20" r="1" fill="currentColor"/>
      </svg>
    ),
    label: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  };
  return icons[id] || icons.printers;
};

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedStat({ value, label, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true;
        let start = 0;
        const end = parseInt(value);
        const duration = 2000;
        const step = Math.ceil(duration / end);
        const timer = setInterval(() => {
          start += Math.ceil(end / (duration / 16));
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(start);
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-white">{prefix}{count.toLocaleString()}{suffix}</p>
      <p className="text-sm text-white/60 mt-1 tracking-wider uppercase">{label}</p>
    </div>
  );
}

export default function HardwareCatalogPage() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Hardware Catalog – Cryptware Infotech Solutions';
  }, []);

  return (
    <div className="relative min-h-screen bg-white font-sans text-[#1a1a2e] overflow-x-hidden">
      <CustomCursor />
      <Navbar onMenuToggle={() => {}} isMenuOpen={false} onNavCatalog={() => {}} />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0f1e]">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,163,218,0.15)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(33,65,119,0.2)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(6,163,218,0.08)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '5s' }} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(6,163,218,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,163,218,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 w-[92%] max-w-[1280px] mx-auto pt-32 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#06a3da]/10 border border-[#06a3da]/30 text-[#06a3da] text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#06a3da] animate-pulse" />
            System Hardware & Terminals
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
            Enterprise Hardware
            <br />
            <span className="bg-gradient-to-r from-[#06a3da] to-[#214177] bg-clip-text text-transparent">
              Built for Scale
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-[640px] mx-auto leading-relaxed mb-12">
            Complete catalog of barcode printers, scanners, mobile computers, POS systems, RFID solutions, and labels — trusted by enterprises across retail, healthcare, manufacturing & logistics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/hardware/product"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#06a3da] hover:bg-[#0591c4] text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(6,163,218,0.4)]"
            >
              Browse All Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            >
              Explore Categories
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
            <AnimatedStat value="500" label="Products in Catalog" suffix="+" />
            <AnimatedStat value="15" label="Years of Expertise" suffix="+" />
            <AnimatedStat value="1000" label="Clients Served" suffix="+" />
            <AnimatedStat value="6" label="Industry Verticals" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── CATEGORY CARDS ────────────────────────────────────────────────────── */}
      <section id="catalog" className="py-24 bg-[#f8faff]">
        <div className="w-[92%] max-w-[1280px] mx-auto">

          <div className="text-center mb-16">
            <span className="block text-[#06a3da] tracking-[0.18em] uppercase text-xs font-bold mb-4">Complete Hardware Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0b0f1e] leading-tight">
              Six Categories. <span className="text-[#06a3da]">Thousands of Solutions.</span>
            </h2>
            <p className="text-[#64748b] mt-4 max-w-[560px] mx-auto leading-relaxed">
              From print-and-apply automation to real-time RFID inventory — every hardware need covered under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {hardwareCategories.map((cat, idx) => (
              <div
                key={cat.id}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="group relative rounded-3xl overflow-hidden border border-gray-200/60 bg-white shadow-sm hover:shadow-[0_24px_60px_rgba(6,163,218,0.12)] hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="relative h-[220px] overflow-hidden flex-shrink-0">
                  <img
                    src={cat.heroImg}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={e => { e.target.src = '/assets/img/mainlogo_3(1).jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Icon badge */}
                  <div
                    className="absolute top-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20"
                    style={{ background: `${cat.color}20` }}
                  >
                    <span style={{ color: cat.color }}>
                      <CategoryIcon id={cat.icon} className="w-6 h-6" />
                    </span>
                  </div>
                  {/* Product count badge */}
                  <div className="absolute top-4 right-4 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {cat.productCount}+ Products
                  </div>
                  {/* Title overlay on image */}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
                    <p className="text-white/70 text-sm mt-0.5">{cat.tagline}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[#64748b] text-sm leading-relaxed mb-5">{cat.description}</p>

                  {/* Subtypes */}
                  <div className="mb-5">
                    <p className="text-[0.68rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-2">Models & Types</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subtypes.slice(0, 5).map(sub => (
                        <span key={sub} className="text-[0.7rem] font-semibold px-2 py-1 rounded-lg bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                          {sub}
                        </span>
                      ))}
                      {cat.subtypes.length > 5 && (
                        <span className="text-[0.7rem] font-semibold px-2 py-1 rounded-lg bg-[#06a3da]/10 text-[#06a3da] border border-[#06a3da]/20">
                          +{cat.subtypes.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Brands */}
                  <div className="mb-5">
                    <p className="text-[0.68rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-2">Brands</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.brands.map(brand => (
                        <span key={brand} className="text-[0.7rem] font-bold px-2.5 py-1 rounded-full" style={{ background: `${cat.color}10`, color: cat.color, border: `1px solid ${cat.color}30` }}>
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specs highlight */}
                  <div className="mb-6">
                    <p className="text-[0.68rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-2">Key Specs</p>
                    <ul className="space-y-1">
                      {cat.specs.slice(0, 3).map(spec => (
                        <li key={spec} className="flex items-center gap-2 text-xs text-[#475569]">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link
                      to={`/hardware/product?category=${cat.id}`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 group/btn"
                      style={{
                        background: hoveredCategory === cat.id ? cat.color : 'transparent',
                        color: hoveredCategory === cat.id ? 'white' : cat.color,
                        border: `1.5px solid ${cat.color}`,
                      }}
                    >
                      Browse {cat.title}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link
              to="/hardware/product"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#0b0f1e] hover:bg-[#1a2035] text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(11,15,30,0.25)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              View All Products
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BARCODE & LABELING SOLUTIONS ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="block text-[#06a3da] tracking-[0.18em] uppercase text-xs font-bold mb-4">Barcode & Labeling Solutions</span>
              <h2 className="text-4xl font-bold text-[#0b0f1e] leading-tight mb-6">
                Labels for Every Surface, <br />Industry, and Environment
              </h2>
              <p className="text-[#64748b] leading-relaxed mb-8">
                From plain paper rolls to pharmaceutical-grade FDA-compliant labels, polyester asset tags, jewelry price tags, food-safe labels, and tamper-evident security seals — our barcode consumables portfolio covers every labeling need in any industry.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Barcode Labels & Tags', desc: 'Paper, polyester, polypropylene & specialty materials' },
                  { label: 'Thermal Transfer Ribbons', desc: 'Wax, wax-resin, and resin ribbons for all printers' },
                  { label: 'Specialty Labels', desc: 'Food-safe, medical, security & industrial variants' },
                  { label: 'Custom Printing', desc: 'Pre-printed with your brand, sequential numbers' },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-2xl bg-[#f8faff] border border-[#e2e8f0]">
                    <p className="font-bold text-[0.85rem] text-[#0b0f1e] mb-1">{item.label}</p>
                    <p className="text-xs text-[#64748b]">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/hardware/product?category=consumables"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#06a3da] hover:bg-[#0591c4] text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_32px_rgba(6,163,218,0.35)]"
              >
                Shop Labels & Tags
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="/assets/img/Product/consumable/consumable.jpg" alt="Barcode Labels & Tags" className="w-full h-[440px] object-cover" />
              </div>
              {/* floating tag cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-48">
                <p className="text-xs text-[#94a3b8] uppercase font-bold tracking-wider mb-1">Label Types</p>
                <p className="text-2xl font-bold text-[#0b0f1e]">16+</p>
                <p className="text-xs text-[#64748b]">Specialty label variants</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-[#06a3da] rounded-2xl shadow-xl p-4 w-48">
                <p className="text-xs text-white/70 uppercase font-bold tracking-wider mb-1">Materials</p>
                <p className="text-lg font-bold text-white">Paper · Polyester</p>
                <p className="text-xs text-white/70">Polypropylene · Tyvek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ───────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0b0f1e]">
        <div className="w-[92%] max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <span className="block text-[#06a3da] tracking-[0.18em] uppercase text-xs font-bold mb-4">Industries We Serve</span>
            <h2 className="text-4xl font-bold text-white">
              Powering Operations <span className="text-[#06a3da]">Worldwide</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hardwareIndustries.map((industry, idx) => (
              <div
                key={industry.name}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#06a3da]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{industry.icon}</div>
                <h3 className="font-bold text-white text-[1rem] mb-2">{industry.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{industry.desc}</p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06a3da" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS HIGHLIGHT ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="w-[92%] max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <span className="block text-[#06a3da] tracking-[0.18em] uppercase text-xs font-bold mb-4">Accessories & Add-ons</span>
            <h2 className="text-4xl font-bold text-[#0b0f1e]">Everything You Need to Go Live</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔌', title: 'Cables & Cradles', desc: 'USB, RS-232, charging docks' },
              { icon: '🔋', title: 'Batteries & Power', desc: 'OEM & compatible replacements' },
              { icon: '📱', title: 'Holsters & Cases', desc: 'Protective accessories' },
              { icon: '🛡️', title: 'Warranty & Support', desc: '10/5 certified support plans' },
            ].map(acc => (
              <div key={acc.title} className="text-center p-6 rounded-2xl bg-[#f8faff] border border-[#e2e8f0] hover:border-[#06a3da]/30 hover:shadow-md transition-all duration-300">
                <div className="text-4xl mb-3">{acc.icon}</div>
                <h3 className="font-bold text-[#0b0f1e] text-sm mb-1">{acc.title}</h3>
                <p className="text-[#64748b] text-xs">{acc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#06a3da] to-[#214177] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 w-[92%] max-w-[1280px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Explore Our Full Catalog?</h2>
          <p className="text-white/75 text-lg mb-10 max-w-[540px] mx-auto">Browse every product model, download datasheets, and get a custom quote in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/hardware/product"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#06a3da] hover:bg-gray-50 font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Browse All Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="#contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white hover:bg-white/10 font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
}
