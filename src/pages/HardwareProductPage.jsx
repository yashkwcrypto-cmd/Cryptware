import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { catalogData, hardwareCategories } from '../data/catalog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import CustomCursor from '../components/CustomCursor';

// ─── Subcategory display names ─────────────────────────────────────────────────
const subcategoryNames = {
  printers: 'Barcode Printers',
  scanners: 'Barcode Scanners',
  pos: 'POS Systems',
  computing: 'Mobile Computers',
  rfid: 'RFID Systems',
  consumables: 'Labels, Tags & Ribbons',
  'it-infra': 'IT Infrastructure',
  office: 'Office Automation',
  network: 'Network Security',
  software: 'Enterprise Software',
  cctv: 'IP CCTV',
  isp: 'ISP Solutions',
  cloud: 'Cloud Services',
  eprocurement: 'E-Procurement',
  accounting: 'Crypto Accounting',
  templates: 'ERP Templates',
};

// ─── Brand color map ───────────────────────────────────────────────────────────
const brandColors = {
  Zebra: '#0073cf',
  Honeywell: '#ee2e31',
  Datalogic: '#00803c',
  Epson: '#00417e',
  Posiflex: '#1a1a2e',
  Newland: '#e65c00',
  Cryptware: '#06a3da',
  TSC: '#6d28d9',
  Godex: '#0f766e',
  Citizen: '#374151',
  Impinj: '#9333ea',
};

// ─── Category color map ────────────────────────────────────────────────────────
const categoryColors = {
  printers: '#06a3da',
  scanners: '#214177',
  computing: '#0f766e',
  pos: '#7c3aed',
  rfid: '#dc2626',
  consumables: '#d97706',
};

// ─── Sidebar filter categories ─────────────────────────────────────────────────
const sidebarCategories = [
  { id: 'all', label: 'All Hardware', icon: '📦' },
  { id: 'printers', label: 'Barcode Printers', icon: '🖨️' },
  { id: 'scanners', label: 'Barcode Scanners', icon: '📡' },
  { id: 'computing', label: 'Mobile Computers', icon: '📱' },
  { id: 'pos', label: 'POS Systems', icon: '🖥️' },
  { id: 'rfid', label: 'RFID Systems', icon: '📶' },
  { id: 'consumables', label: 'Labels & Tags', icon: '🏷️' },
];

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ item, onClose, onInquiry }) {
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (panelRef.current && overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(panelRef.current, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });
    }
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleClose = useCallback(() => {
    if (panelRef.current && overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(panelRef.current, { x: '100%', duration: 0.4, ease: 'power3.in', onComplete: onClose });
    } else {
      onClose();
    }
  }, [onClose]);

  const brandColor = brandColors[item.brand] || '#06a3da';
  const catColor = categoryColors[item.subcategory] || '#06a3da';

  return createPortal(
    <div className="fixed inset-0 z-[200] flex">
      {/* overlay */}
      <div ref={overlayRef} onClick={handleClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0" />

      {/* panel */}
      <div
        ref={panelRef}
        className="ml-auto relative w-full max-w-[640px] h-full bg-white shadow-[−40px_0_100px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span
              className="text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}30` }}
            >
              {subcategoryNames[item.subcategory] || item.subcategory}
            </span>
            {item.brand && (
              <span
                className="text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: `${brandColor}12`, color: brandColor, border: `1px solid ${brandColor}25` }}
              >
                {item.brand}
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Product image */}
          <div className="h-[280px] relative bg-gradient-to-br from-[#f8faff] to-white flex items-center justify-center border-b border-gray-100 overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(6,163,218,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,163,218,1) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
            {!imgError ? (
              <img
                src={item.img}
                alt={item.title}
                className="max-h-[220px] max-w-[80%] object-contain drop-shadow-lg z-10 relative"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center z-10" style={{ background: `${catColor}15` }}>
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke={catColor} strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Title & description */}
            <div>
              <h2 className="text-2xl font-bold text-[#0b0f1e] leading-tight mb-3">{item.title}</h2>
              <p className="text-[#64748b] leading-relaxed text-sm">{item.description}</p>
            </div>

            {/* Models */}
            {item.models && item.models.length > 0 && (
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Available Models</p>
                <div className="flex flex-wrap gap-2">
                  {item.models.map(model => (
                    <span key={model} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] text-[#374151]">
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Specs */}
            {item.specs && item.specs.length > 0 && (
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Technical Specifications</p>
                <div className="rounded-2xl border border-gray-100 bg-[#f8faff] overflow-hidden">
                  {item.specs.map((spec, idx) => (
                    <div key={idx} className={`flex items-start gap-3 px-4 py-3 ${idx !== item.specs.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: catColor }} />
                      <span className="text-sm text-[#374151]">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Industries */}
            <div className="bg-gradient-to-br from-[#f8faff] to-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <h5 className="font-bold text-[#0b0f1e] text-sm mb-1">Cryptware Assurance</h5>
                  <p className="text-xs text-[#64748b] leading-relaxed">All hardware provisioning and deployments come with certified professional warranties, 10/5 support, and dedicated rollout training. We source only from authorized distributors.</p>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-3">You May Also Like</p>
              <div className="flex flex-wrap gap-2">
                {catalogData
                  .filter(p => p.type === 'hardware' && p.subcategory === item.subcategory && p.id !== item.id)
                  .slice(0, 4)
                  .map(related => (
                    <span key={related.id} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-[#475569] hover:border-[#06a3da]/40 hover:text-[#06a3da] cursor-pointer transition-colors">
                      {related.title}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-[#64748b] font-bold text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onInquiry(item)}
            className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${catColor}, ${catColor}cc)` }}
          >
            Get Quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item, index, onOpen }) {
  const [imgError, setImgError] = useState(false);
  const catColor = categoryColors[item.subcategory] || '#06a3da';
  const brandColor = brandColors[item.brand] || '#64748b';

  return (
    <div
      onClick={() => onOpen(item)}
      className="group bg-white rounded-2xl border border-gray-200/70 overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_50px_rgba(6,163,218,0.12)] hover:-translate-y-2 transition-all duration-[400ms] ease-out flex flex-col"
    >
      {/* Image */}
      <div className="relative h-[200px] bg-gradient-to-br from-[#f8faff] via-white to-[#f0f7ff] flex items-center justify-center overflow-hidden border-b border-gray-100">
        {/* subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

        {!imgError && item.img ? (
          <img
            src={item.img}
            alt={item.title}
            className="max-h-[160px] max-w-[80%] object-contain drop-shadow-sm group-hover:scale-[1.08] transition-transform duration-500 z-10 relative"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center z-10" style={{ background: `${catColor}15` }}>
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={catColor} strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {/* Top-left badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className="text-[0.6rem] font-bold uppercase tracking-widest px-2 py-1 rounded-md backdrop-blur-sm"
            style={{ background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}25` }}
          >
            {subcategoryNames[item.subcategory] || item.subcategory}
          </span>
        </div>

        {/* Brand badge bottom-right */}
        {item.brand && (
          <span
            className="absolute bottom-3 right-3 text-[0.58rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm bg-white/80 border border-gray-200"
            style={{ color: brandColor }}
          >
            {item.brand}
          </span>
        )}

        {/* Featured star */}
        {item.featured && (
          <span className="absolute top-3 right-3 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-[10px]">⭐</span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-[#0b0f1e] text-[0.95rem] leading-tight mb-2 group-hover:text-[#06a3da] transition-colors">
          {item.title}
        </h3>
        <p className="text-[#64748b] text-xs leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Models pill row */}
        {item.models && item.models.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {item.models.slice(0, 2).map(m => (
              <span key={m} className="text-[0.62rem] px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#475569] font-medium border border-[#e2e8f0]">
                {m}
              </span>
            ))}
            {item.models.length > 2 && (
              <span className="text-[0.62rem] px-2 py-0.5 rounded-md bg-[#06a3da]/8 text-[#06a3da] font-bold border border-[#06a3da]/15">
                +{item.models.length - 2}
              </span>
            )}
          </div>
        )}

        {/* CTA row */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            In Stock
          </span>
          <span className="flex items-center gap-1 text-[0.72rem] font-bold uppercase group-hover:gap-2 transition-all" style={{ color: catColor }}>
            Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HardwareProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Hardware Products – Cryptware Infotech Solutions';
  }, []);

  // Sync URL param
  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSelectedBrands([]);
    setVisibleCount(12);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Derive hardware items only
  const hardwareItems = useMemo(() =>
    catalogData.filter(item => item.type === 'hardware'),
    []
  );

  // Available brands from current selection
  const availableBrands = useMemo(() => {
    const brandCount = {};
    hardwareItems.forEach(item => {
      if (activeCategory !== 'all' && item.subcategory !== activeCategory) return;
      const brand = item.brand || 'Cryptware';
      brandCount[brand] = (brandCount[brand] || 0) + 1;
    });
    return Object.entries(brandCount).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  }, [hardwareItems, activeCategory]);

  // Filtered & sorted items
  const filteredItems = useMemo(() => {
    let items = hardwareItems.filter(item => {
      const matchesCat = activeCategory === 'all' || item.subcategory === activeCategory;
      const sq = searchQuery.toLowerCase();
      const matchesSearch = !sq || item.title.toLowerCase().includes(sq) || item.description.toLowerCase().includes(sq) || (item.brand || '').toLowerCase().includes(sq);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand || 'Cryptware');
      return matchesCat && matchesSearch && matchesBrand;
    });

    if (sortBy === 'alpha') items = [...items].sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === 'alpha-desc') items = [...items].sort((a, b) => b.title.localeCompare(a.title));
    else if (sortBy === 'brand') items = [...items].sort((a, b) => (a.brand || '').localeCompare(b.brand || ''));
    else {
      // default: featured first
      items = [...items].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return items;
  }, [hardwareItems, activeCategory, searchQuery, selectedBrands, sortBy]);

  const displayedItems = filteredItems.slice(0, visibleCount);

  const handleInquiry = (item) => {
    setSelectedItem(null);
    // scroll to contact on main page or show toast
    alert(`Thank you for your interest in "${item.title}"!\n\nPlease visit our main site's Contact section or call us to request a detailed quote.`);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setVisibleCount(12);
  };

  const totalCount = hardwareItems.length;
  const catColor = activeCategory !== 'all' ? (categoryColors[activeCategory] || '#06a3da') : '#06a3da';

  return (
    <div className="relative min-h-screen bg-[#f8faff] font-sans text-[#1a1a2e] overflow-x-hidden">
      <CustomCursor />
      <Navbar onMenuToggle={() => {}} isMenuOpen={false} onNavCatalog={() => {}} />

      {/* ── TOP HEADER BAR ────────────────────────────────────────────────────── */}
      <div className="pt-[72px] bg-[#0b0f1e] border-b border-white/5">
        <div className="w-[92%] max-w-[1280px] mx-auto py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/40 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/hardware" className="hover:text-white transition-colors">Hardware</Link>
            <span>/</span>
            <span className="text-white/70">Products</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {activeCategory === 'all'
                  ? 'All Hardware Products'
                  : subcategoryNames[activeCategory] || activeCategory}
              </h1>
              <p className="text-white/50 mt-2 text-sm">
                {filteredItems.length} products · Authorized distributors · GST invoicing available
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6">
              {[
                { label: 'Total Products', value: totalCount + '+' },
                { label: 'Brands', value: availableBrands.length },
                { label: 'Categories', value: 6 },
              ].map(stat => (
                <div key={stat.label} className="text-right">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ───────────────────────────────────────────────────────── */}
      <div className="w-[92%] max-w-[1280px] mx-auto py-10">
        <div className="flex gap-8">

          {/* ── SIDEBAR ───────────────────────────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col w-[260px] flex-shrink-0 gap-4">

            {/* Category filter */}
            <div className="bg-white rounded-2xl border border-gray-200/70 p-4 shadow-sm">
              <p className="text-[0.68rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Product Categories</p>
              <div className="space-y-1">
                {sidebarCategories.map(cat => {
                  const isActive = activeCategory === cat.id;
                  const count = cat.id === 'all' ? hardwareItems.length : hardwareItems.filter(i => i.subcategory === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'text-white shadow-sm' : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0b0f1e]'}`}
                      style={isActive ? { background: `linear-gradient(135deg, ${catColor}, ${catColor}cc)` } : {}}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </span>
                      <span className={`text-[0.65rem] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#94a3b8]'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand filter */}
            <div className="bg-white rounded-2xl border border-gray-200/70 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[0.68rem] font-bold uppercase tracking-widest text-[#94a3b8]">Filter by Brand</p>
                {selectedBrands.length > 0 && (
                  <button onClick={() => setSelectedBrands([])} className="text-[0.65rem] font-bold uppercase text-[#06a3da] hover:text-[#0591c4]">
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1">
                {availableBrands.map(({ name, count }) => {
                  const isChecked = selectedBrands.includes(name);
                  const bc = brandColors[name] || '#64748b';
                  return (
                    <label
                      key={name}
                      onClick={() => toggleBrand(name)}
                      className="flex items-center justify-between gap-2 px-2 py-2 rounded-lg cursor-pointer hover:bg-[#f8faff] transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${isChecked ? 'border-transparent' : 'border-gray-300 group-hover:border-gray-400'}`}
                          style={isChecked ? { background: bc, borderColor: bc } : {}}>
                          {isChecked && (
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs font-semibold ${isChecked ? 'font-bold' : 'text-[#374151]'}`} style={isChecked ? { color: bc } : {}}>
                          {name}
                        </span>
                      </div>
                      <span className="text-[0.62rem] text-[#94a3b8] font-bold bg-[#f1f5f9] px-1.5 py-0.5 rounded-full">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Quick CTA */}
            <div className="bg-gradient-to-br from-[#06a3da] to-[#214177] rounded-2xl p-5 text-white">
              <p className="font-bold text-sm mb-1">Need a Custom Quote?</p>
              <p className="text-white/70 text-xs mb-4 leading-relaxed">Contact our hardware specialists for bulk pricing and demo units.</p>
              <Link
                to="/#contact-us"
                className="block w-full py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </aside>

          {/* ── PRODUCT GRID ──────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Search + Sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setVisibleCount(12); }}
                  placeholder="Search products, brands, models..."
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#0b0f1e] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#06a3da] focus:ring-2 focus:ring-[#06a3da]/10 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0b0f1e]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#374151] font-semibold focus:outline-none focus:border-[#06a3da] focus:ring-2 focus:ring-[#06a3da]/10 shadow-sm cursor-pointer"
              >
                <option value="default">Sort: Featured First</option>
                <option value="alpha">Sort: A → Z</option>
                <option value="alpha-desc">Sort: Z → A</option>
                <option value="brand">Sort: By Brand</option>
              </select>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-[#374151] shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5h18M7 12h10M10 19h4" strokeLinecap="round"/>
                </svg>
                Filters
                {(selectedBrands.length > 0 || activeCategory !== 'all') && (
                  <span className="w-5 h-5 rounded-full bg-[#06a3da] text-white text-[0.6rem] font-bold flex items-center justify-center">
                    {selectedBrands.length + (activeCategory !== 'all' ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Active filter chips */}
            {(activeCategory !== 'all' || selectedBrands.length > 0 || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activeCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06a3da]/10 text-[#06a3da] text-[0.7rem] font-bold uppercase tracking-wider border border-[#06a3da]/20">
                    {subcategoryNames[activeCategory]}
                    <button onClick={() => handleCategoryChange('all')} className="text-[#06a3da]/60 hover:text-[#06a3da]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </span>
                )}
                {selectedBrands.map(brand => (
                  <span key={brand} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#214177]/10 text-[#214177] text-[0.7rem] font-bold uppercase tracking-wider border border-[#214177]/20">
                    {brand}
                    <button onClick={() => toggleBrand(brand)} className="text-[#214177]/60 hover:text-[#214177]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </span>
                ))}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f1f5f9] text-[#475569] text-[0.7rem] font-bold border border-[#e2e8f0]">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="text-[#94a3b8] hover:text-[#475569]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Result summary */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[#64748b]">
                Showing <span className="font-bold text-[#0b0f1e]">{displayedItems.length}</span> of <span className="font-bold text-[#0b0f1e]">{filteredItems.length}</span> products
              </p>
              {filteredItems.length > 12 && (
                <div className="hidden sm:flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                  {[12, 24, 48].map(n => (
                    <button
                      key={n}
                      onClick={() => setVisibleCount(n)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${visibleCount === n ? 'bg-[#0b0f1e] text-white' : 'text-[#64748b] hover:text-[#0b0f1e]'}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid */}
            {displayedItems.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
                <div className="text-5xl mb-4">📦</div>
                <h3 className="font-bold text-[#0b0f1e] text-lg mb-2">No products found</h3>
                <p className="text-[#64748b] text-sm mb-6">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSelectedBrands([]); }}
                  className="px-6 py-2.5 rounded-xl bg-[#06a3da] text-white text-sm font-bold hover:bg-[#0591c4] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {displayedItems.map((item, idx) => (
                    <ProductCard key={item.id} item={item} index={idx} onOpen={setSelectedItem} />
                  ))}
                </div>

                {/* Load more */}
                {visibleCount < filteredItems.length && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setVisibleCount(v => v + 12)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-[#374151] hover:border-[#06a3da] hover:text-[#06a3da] hover:shadow-md transition-all duration-300 shadow-sm"
                    >
                      Load More Products
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <p className="text-xs text-[#94a3b8] mt-2">{filteredItems.length - visibleCount} more products</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE SIDEBAR DRAWER ─────────────────────────────────────────────── */}
      {sidebarOpen && createPortal(
        <div className="fixed inset-0 z-[150] flex lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative ml-auto w-[300px] h-full bg-white shadow-2xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-[#0b0f1e]">Filters</h3>
              <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-6">
              {/* Categories */}
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Categories</p>
                <div className="space-y-1">
                  {sidebarCategories.map(cat => {
                    const isActive = activeCategory === cat.id;
                    const count = cat.id === 'all' ? hardwareItems.length : hardwareItems.filter(i => i.subcategory === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { handleCategoryChange(cat.id); setSidebarOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive ? 'bg-[#06a3da] text-white' : 'text-[#475569] hover:bg-[#f1f5f9]'}`}
                      >
                        <span className="flex items-center gap-2">{cat.icon} {cat.label}</span>
                        <span className={`text-[0.65rem] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20' : 'bg-[#f1f5f9] text-[#94a3b8]'}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brands */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[0.68rem] font-bold uppercase tracking-widest text-[#94a3b8]">Brands</p>
                  {selectedBrands.length > 0 && <button onClick={() => setSelectedBrands([])} className="text-[0.65rem] font-bold text-[#06a3da]">Clear</button>}
                </div>
                <div className="space-y-1">
                  {availableBrands.map(({ name, count }) => {
                    const isChecked = selectedBrands.includes(name);
                    return (
                      <label key={name} onClick={() => toggleBrand(name)} className="flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer hover:bg-[#f8faff]">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isChecked ? 'bg-[#06a3da] border-[#06a3da]' : 'border-gray-300'}`}>
                            {isChecked && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                          <span className="text-xs font-semibold text-[#374151]">{name}</span>
                        </div>
                        <span className="text-[0.62rem] text-[#94a3b8] font-bold">{count}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── DETAIL PANEL ──────────────────────────────────────────────────────── */}
      {selectedItem && (
        <DetailPanel
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onInquiry={handleInquiry}
        />
      )}

      <Footer />
      <FloatingChat />
    </div>
  );
}
