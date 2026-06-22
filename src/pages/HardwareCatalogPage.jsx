import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hardwareCategories, hardwareIndustries } from '../data/catalog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import CustomCursor from '../components/CustomCursor';

// ─── Trusted Brands ─────────────────────────────────────────────────────────────
const trustedBrands = [
  { name: 'Zebra', color: '#0073cf' },
  { name: 'Honeywell', color: '#ee2e31' },
  { name: 'Datalogic', color: '#00803c' },
  { name: 'Epson', color: '#00417e' },
  { name: 'Posiflex', color: '#7c3aed' },
  { name: 'Newland', color: '#e65c00' },
  { name: 'TSC', color: '#6d28d9' },
  { name: 'Godex', color: '#0f766e' },
  { name: 'Citizen', color: '#374151' },
  { name: 'Impinj', color: '#9333ea' },
];

// ─── SVG Icons (no emojis) ─────────────────────────────────────────────────────
const Icon = {
  Printer: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
      <line x1="9" y1="12" x2="9.01" y2="12" />
    </svg>
  ),
  Scanner: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="7" y1="9" x2="7" y2="9.01" />
    </svg>
  ),
  Mobile: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
      <line x1="9" y1="7" x2="15" y2="7" />
    </svg>
  ),
  POS: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M7 8h2v3H7z" /><path d="M13 8h4" /><path d="M13 11h4" />
    </svg>
  ),
  RFID: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  ),
  Label: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  Shield: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Check: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  ArrowRight: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  ChevronDown: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Star: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Package: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Clock: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Users: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Factory: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16z" />
    </svg>
  ),
  ShoppingCart: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  Heart: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Coffee: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  Box: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  Truck: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  FileText: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Zap: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

// ─── Category Icon Map ─────────────────────────────────────────────────────────
const categoryIconMap = {
  printers: Icon.Printer,
  scanners: Icon.Scanner,
  computing: Icon.Mobile,
  pos: Icon.POS,
  rfid: Icon.RFID,
  consumables: Icon.Label,
};

const industryIconMap = {
  'Retail': Icon.ShoppingCart,
  'Healthcare': Icon.Heart,
  'Manufacturing': Icon.Factory,
  'Hospitality': Icon.Coffee,
  'Warehousing & Distribution': Icon.Box,
  'Transportation & Logistics': Icon.Truck,
};

// ─── Brand Marquee Strip ───────────────────────────────────────────────────────
function BrandMarquee() {
  const brands = [...trustedBrands, ...trustedBrands];
  return (
    <div className="overflow-hidden py-5 border-y border-white/[0.07] bg-[#06101a]">
      <div className="flex gap-6 animate-marquee" style={{ width: 'max-content' }}>
        {brands.map((brand, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.09] bg-white/[0.03] backdrop-blur-sm flex-shrink-0 hover:border-white/20 transition-colors duration-300"
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: brand.color }} />
            <span className="text-[0.72rem] font-bold tracking-[0.16em] text-white/55 uppercase">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Animated Stat Counter ─────────────────────────────────────────────────────
function AnimatedStat({ end, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        let s = 0;
        const num = parseInt(end);
        const timer = setInterval(() => {
          s += Math.ceil(num / (2000 / 16));
          if (s >= num) { setCount(num); clearInterval(timer); }
          else setCount(s);
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-white tabular-nums">{count.toLocaleString()}{suffix}</p>
      <p className="text-xs text-white/45 mt-2 tracking-[0.16em] uppercase font-semibold">{label}</p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HardwareCatalogPage() {
  const [hoveredCat, setHoveredCat] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Hardware Solutions – Cryptware Infotech';
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0f1e] font-sans text-white overflow-x-hidden">
      <CustomCursor />
      <Navbar onMenuToggle={() => { }} isMenuOpen={false} onNavCatalog={() => { }} />

      {/* ══ HERO — Merged (video bg + content + stats card) ═══════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-40 saturate-[1.15]"
            src="/assets/video/full.mp4"
            autoPlay muted loop playsInline preload="metadata"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,20,0.97)_0%,rgba(7,16,20,0.75)_45%,rgba(7,16,20,0.4)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(6,163,218,0.22),transparent_36%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.06),transparent_28%),linear-gradient(180deg,rgba(7,16,20,0)_50%,#0b0f1e_100%)]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(6,163,218,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,163,218,1) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Accent lines */}
        <div className="absolute top-0 right-[22%] w-px h-full bg-gradient-to-b from-[#06a3da]/18 via-transparent to-transparent z-[1]" />
        <div className="absolute top-0 right-[44%] w-px h-[55%] bg-gradient-to-b from-transparent via-[#06a3da]/8 to-transparent z-[1]" />

        {/* ── Hero content ── */}
        <div className="relative z-10 w-[92%] max-w-[1280px] mx-auto pt-40 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* LEFT */}
            <div>
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 bg-[#06a3da]/[0.12] border border-[#06a3da]/25 text-[#06a3da] text-[0.68rem] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-9">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06a3da] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06a3da]" />
                </span>
                Enterprise Hardware Solutions
              </div>

              <h1 className="text-[clamp(2.8rem,5.2vw,5rem)] font-bold text-white leading-[1.04] tracking-tight mb-6">
                Scan. Print. Track.
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#06a3da] to-[#38bdf8] bg-clip-text text-transparent italic">Move Faster.</span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 300 4" fill="none" preserveAspectRatio="none">
                    <path d="M0 2 Q150 0 300 2" stroke="url(#ug)" strokeWidth="2" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="ug" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06a3da" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p className="text-white/55 text-[1.05rem] leading-[1.82] max-w-[520px] font-light mb-10">
                Complete catalog of barcode printers, scanners, mobile computers, POS systems, RFID solutions, and labels — trusted by enterprises across retail, healthcare, manufacturing &amp; logistics.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/hardware/product"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#06a3da] hover:bg-[#0591c4] text-white font-bold text-[0.82rem] uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(6,163,218,0.4)]"
                >
                  Browse All Products
                  <Icon.ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/15 text-white/65 hover:text-white hover:border-white/30 font-bold text-[0.82rem] uppercase tracking-wider rounded-full transition-all duration-300 hover:bg-white/[0.05]"
                >
                  Explore Categories
                  <Icon.ChevronDown className="w-4 h-4" />
                </a>
              </div>

              {/* Trust badges — icon-based */}
              <div className="flex flex-wrap gap-6">
                {[
                  { Icon: Icon.Shield, text: 'Authorized Distributors' },
                  { Icon: Icon.FileText, text: 'GST Invoicing' },
                  { Icon: Icon.Zap, text: '48hr Deployment Plan' },
                ].map(b => (
                  <div key={b.text} className="flex items-center gap-2 text-white/40 text-[0.72rem] font-semibold uppercase tracking-widest">
                    <b.Icon className="w-3.5 h-3.5 text-[#06a3da]" />
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Stats + capability cards */}
            <div className="relative flex flex-col gap-4">
              {/* Decorative rings */}
              <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full border border-[#06a3da]/8 pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-52 h-52 rounded-full border border-[#06a3da]/12 pointer-events-none" />

              {/* Main stat card */}
              <div className="bg-white/[0.04] border border-white/[0.1] rounded-3xl p-7 backdrop-blur-sm">
                {/* Operation feed header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#06a3da] shadow-[0_0_14px_rgba(6,163,218,0.9)]" />
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/55">Operations Feed</span>
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/30">CW-HW-01</span>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-6">
                  {[
                    { value: '500', suffix: '+', label: 'Products in Catalog', IconC: Icon.Package },
                    { value: '15', suffix: '+', label: 'Years of Expertise', IconC: Icon.Star },
                    { value: '1000', suffix: '+', label: 'Clients Served', IconC: Icon.Users },
                    { value: '6', suffix: '', label: 'Industry Verticals', IconC: Icon.Factory },
                  ].map(s => (
                    <div key={s.label} className="flex flex-col gap-1.5">
                      <div className="w-8 h-8 rounded-xl bg-[#06a3da]/15 flex items-center justify-center mb-1">
                        <s.IconC className="w-4 h-4 text-[#06a3da]" />
                      </div>
                      <p className="text-3xl font-bold text-white tabular-nums">{s.value}{s.suffix}</p>
                      <p className="text-white/40 text-[0.65rem] uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/[0.08] pt-5">
                  <p className="text-[0.62rem] text-white/30 uppercase tracking-[0.2em] mb-3 font-bold">Top Brands</p>
                  <div className="flex flex-wrap gap-2">
                    {trustedBrands.slice(0, 6).map(brand => (
                      <span
                        key={brand.name}
                        className="text-[0.62rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                        style={{ color: brand.color, borderColor: `${brand.color}30`, background: `${brand.color}10` }}
                      >
                        {brand.name}
                      </span>
                    ))}
                    <span className="text-[0.62rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 text-white/35 bg-white/[0.04]">
                      +{trustedBrands.length - 6} more
                    </span>
                  </div>
                </div>
              </div>

              {/* Assurance pill */}
              <div className="bg-gradient-to-br from-[#06a3da]/[0.18] to-[#214177]/25 border border-[#06a3da]/20 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm">
                <div className="w-11 h-11 rounded-xl bg-[#06a3da]/20 flex items-center justify-center flex-shrink-0">
                  <Icon.Shield className="w-5 h-5 text-[#06a3da]" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Cryptware Assurance</p>
                  <p className="text-white/45 text-xs leading-relaxed mt-0.5">10/5 certified support · Warranty included · Rollout training</p>
                </div>
              </div>

              {/* Quick capability pills */}
              <div className="flex flex-wrap gap-2">
                {['Barcode Printers', 'RFID Systems', 'POS Terminals', 'Mobile Computers', 'Labels & Ribbons'].map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white/55 backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Brand marquee */}
        <div className="relative z-10 w-full">
          <BrandMarquee />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-white/20 text-[0.62rem] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#06a3da]/50 to-transparent animate-bounce" />
        </div>
      </section>

      {/* ══ CATEGORY CARDS ══════════════════════════════════════════════════════ */}
      <section id="catalog" className="py-28 bg-[#f8faff]">
        <div className="w-[92%] max-w-[1280px] mx-auto">

          <div className="text-center mb-16">
            <span className="block text-[#06a3da] tracking-[0.22em] uppercase text-[0.7rem] font-bold mb-4">Complete Hardware Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0b0f1e] leading-tight">
              Performance-Driven{' '}
              <span className="text-[#06a3da]">Hardware Solutions.</span>
            </h2>
            <p className="text-[#64748b] mt-5 max-w-[560px] mx-auto leading-relaxed text-[0.95rem]">
              From print-and-apply automation to real-time RFID inventory — every hardware need covered under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {hardwareCategories.map((cat) => {
              const CatIcon = categoryIconMap[cat.id] || Icon.Package;
              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setHoveredCat(cat.id)}
                  onMouseLeave={() => setHoveredCat(null)}
                  className="group relative rounded-3xl overflow-hidden border border-gray-200/60 bg-white shadow-sm hover:shadow-[0_30px_70px_rgba(6,163,218,0.13)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-[210px] overflow-hidden flex-shrink-0">
                    <img
                      src={cat.heroImg}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={e => { e.target.src = '/assets/img/mainlogo_3(1).jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/20 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20"
                        style={{ background: `${cat.color}28` }}
                      >
                        <CatIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-black/35 border border-white/18 backdrop-blur-sm text-white text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {cat.productCount}+ Products
                      </div>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white leading-tight">{cat.title}</h3>
                      <p className="text-white/55 text-xs mt-1">{cat.tagline}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[#64748b] text-sm leading-relaxed mb-5">{cat.description}</p>

                    {/* Sub-types preview */}
                    <div className="mb-5">
                      <p className="text-[0.62rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-2.5">Sub-types</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.subtypes.slice(0, 4).map(s => (
                          <span key={s} className="text-[0.65rem] font-semibold px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-[#475569]">
                            {s}
                          </span>
                        ))}
                        {cat.subtypes.length > 4 && (
                          <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full" style={{ background: `${cat.color}10`, color: cat.color, border: `1px solid ${cat.color}25` }}>
                            +{cat.subtypes.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Brands */}
                    <div className="mb-5">
                      <p className="text-[0.62rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-2.5">Brands</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.brands.map(brand => (
                          <span key={brand} className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full" style={{ background: `${cat.color}10`, color: cat.color, border: `1px solid ${cat.color}22` }}>
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key specs */}
                    <div className="mb-6 flex-1">
                      <p className="text-[0.62rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-2.5">Highlights</p>
                      <ul className="space-y-1.5">
                        {cat.specs.slice(0, 3).map(spec => (
                          <li key={spec} className="flex items-center gap-2 text-xs text-[#475569]">
                            <Icon.Check className="w-3 h-3 flex-shrink-0" style={{ color: cat.color }} />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/hardware/product?category=${cat.id}`}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-[0.8rem] uppercase tracking-wider transition-all duration-300"
                      style={{
                        background: hoveredCat === cat.id ? cat.color : `${cat.color}10`,
                        color: hoveredCat === cat.id ? 'white' : cat.color,
                      }}
                    >
                      Browse {cat.title}
                      <Icon.ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View all */}
          <div className="mt-14 text-center">
            <Link
              to="/hardware/product"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#0b0f1e] hover:bg-[#1a2035] text-white font-bold text-[0.82rem] uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_24px_50px_rgba(11,15,30,0.22)]"
            >
              <Icon.Package className="w-4.5 h-4.5" />
              View All Products
              <Icon.ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ═════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0b0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(6,163,218,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 w-[92%] max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatedStat end="500" suffix="+" label="Products in Catalog" />
            <AnimatedStat end="10" suffix="+" label="Trusted Brands" />
            <AnimatedStat end="1000" suffix="+" label="Clients Served" />
            <AnimatedStat end="6" suffix="" label="Industry Verticals" />
          </div>
        </div>
      </section>

      {/* ══ BARCODE & LABELING SECTION ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="w-[92%] max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="block text-[#06a3da] tracking-[0.2em] uppercase text-[0.7rem] font-bold mb-5">Barcode &amp; Labeling Solutions</span>
              <h2 className="text-4xl md:text-[2.75rem] font-bold text-[#0b0f1e] leading-[1.1] mb-6">
                Labels for Every Surface,<br />Industry, and Environment
              </h2>
              <p className="text-[#64748b] leading-relaxed mb-8 text-[0.95rem]">
                From plain paper rolls to pharmaceutical-grade FDA-compliant labels, polyester asset tags, jewelry price tags, food-safe labels, and tamper-evident security seals — our barcode consumables portfolio covers every labeling need in any industry.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Barcode Labels & Tags', desc: 'Paper, polyester, polypropylene & specialty materials', Icon: Icon.Label },
                  { label: 'Thermal Transfer Ribbons', desc: 'Wax, wax-resin, and resin ribbons for all printers', Icon: Icon.Zap },
                  { label: 'Specialty Labels', desc: 'Food-safe, medical, security & industrial variants', Icon: Icon.Shield },
                  { label: 'Custom Printing', desc: 'Pre-printed with your brand, sequential numbers', Icon: Icon.FileText },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-2xl bg-[#f8faff] border border-[#e2e8f0] hover:border-[#06a3da]/30 hover:shadow-sm transition-all duration-300 group">
                    <item.Icon className="w-4 h-4 text-[#06a3da] mb-2" />
                    <p className="font-bold text-[0.85rem] text-[#0b0f1e] mb-1">{item.label}</p>
                    <p className="text-xs text-[#64748b]">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/hardware/product?category=consumables"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#06a3da] hover:bg-[#0591c4] text-white font-bold text-[0.82rem] uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_32px_rgba(6,163,218,0.35)]"
              >
                Shop Labels &amp; Tags
                <Icon.ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="/assets/img/Product/consumable/consumable.jpg" alt="Barcode Labels & Tags" className="w-full h-[440px] object-cover" />
              </div>
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

      {/* ══ INDUSTRIES WE SERVE ════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0b0f1e] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,163,218,0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(33,65,119,0.13)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 w-[92%] max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <span className="block text-[#06a3da] tracking-[0.22em] uppercase text-[0.7rem] font-bold mb-4">Industries We Serve</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Powering Operations <span className="text-[#06a3da]">Worldwide</span>
            </h2>
            <p className="text-white/40 mt-5 max-w-[500px] mx-auto leading-relaxed text-sm">
              Tailored hardware solutions for every vertical — from pharma clean rooms to busy retail floors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hardwareIndustries.map((industry) => {
              const IndIcon = industryIconMap[industry.name] || Icon.Factory;
              return (
                <div
                  key={industry.name}
                  className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.07] hover:border-[#06a3da]/30 transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#06a3da]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="w-12 h-12 rounded-2xl bg-[#06a3da]/15 flex items-center justify-center mb-4 group-hover:bg-[#06a3da]/25 transition-colors duration-300">
                    <IndIcon className="w-5 h-5 text-[#06a3da]" />
                  </div>
                  <h3 className="font-bold text-white text-[0.95rem] mb-2">{industry.name}</h3>
                  <p className="text-white/42 text-sm leading-relaxed">{industry.desc}</p>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <Icon.ArrowRight className="w-4 h-4 text-[#06a3da]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CTA STRIP ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(6,163,218,0.07)_0%,transparent_70%)]" />
        <div className="relative z-10 w-[92%] max-w-[900px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#06a3da]/10 border border-[#06a3da]/20 text-[#06a3da] text-[0.68rem] font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06a3da] animate-pulse" />
            Ready to Get Started
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0b0f1e] mb-5 leading-tight">
            Ready to Explore Our Full Catalog?
          </h2>
          <p className="text-[#64748b] text-lg mb-12 max-w-[520px] mx-auto leading-relaxed">
            Browse every product model, request a custom quote, and get dedicated support from our hardware specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/hardware/product"
              className="inline-flex items-center gap-2 px-9 py-4 bg-[#0b0f1e] hover:bg-[#1a2035] text-white font-bold text-[0.82rem] uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_24px_50px_rgba(11,15,30,0.22)]"
            >
              Browse All Products
              <Icon.ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/#contact-us"
              className="inline-flex items-center gap-2 px-9 py-4 border-2 border-[#0b0f1e]/15 text-[#0b0f1e] hover:border-[#06a3da] hover:text-[#06a3da] font-bold text-[0.82rem] uppercase tracking-wider rounded-full transition-all duration-300"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
}
