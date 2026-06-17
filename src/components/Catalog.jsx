import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { catalogData } from '../data/catalog';

const subcategoryNames = {
  'printers': 'Barcode Printers',
  'scanners': 'Barcode Scanners',
  'pos': 'POS Terminals & Hardware',
  'computing': 'Mobile Computers',
  'rfid': 'RFID Systems',
  'consumables': 'Tags, Labels & Ribbons',
  'it-infra': 'IT Infrastructure',
  'office': 'Office Automation',
  'network': 'Network Security',
  'software': 'Enterprise Software',
  'cctv': 'IP CCTV Surveillance',
  'isp': 'ISP Solutions',
  'cloud': 'Cloud Services',
  'eprocurement': 'E-Procurement',
  'accounting': 'Crypto Accounting',
  'textiles': 'Textile & Apparel',
  'pharma': 'Pharmaceutical',
  'automotive': 'Automotive & Logistics',
  'coldstorage': 'Cold Storage',
  'hazardous': 'Hazardous Zones',
  'templates': 'ERP Templates'
};

// ─── Brand extraction: derive brand from title keywords ───────────────────────
const BRAND_KEYWORDS = [
  'Zebra', 'Honeywell', 'Datalogic', 'Cryptware', 'Epson',
  'Citizen', 'TSC', 'Godex', 'Posiflex', 'Ingenico',
  'Newland', 'iDTRONIC', 'Impinj'
];

function getBrand(item) {
  for (const brand of BRAND_KEYWORDS) {
    if (
      item.title.toLowerCase().includes(brand.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(brand.toLowerCase()))
    ) {
      return brand;
    }
  }
  return 'Cryptware'; // default brand for all Cryptware Infotech Solutions LLP products
}

const FeatureIcon = ({ name, className = "" }) => {
  const icons = {
    warehouse: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    billing: <><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 14h-8"/><path d="M16 10h-8"/><path d="M10 6h-2"/></>,
    dashboard: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    setup: <><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    purchase: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    orders: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    sales: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    invoice: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><path d="M14 13h4"/><path d="M14 17h4"/><circle cx="10" cy="17" r="2"/></>,
    inventory: <><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></>,
    expense: <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></>,
    reports: <><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-5 5"/></>,
    admin: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>
  };
  const selectedPath = icons[name];
  if (!selectedPath) return <span className={className}>{name}</span>;
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      {selectedPath}
    </svg>
  );
};

// ─── Portal-based filter dropdown so it escapes overflow:hidden parents ───────
function FilterDropdown({ anchorRef, children, onClose }) {
  const [pos, setPos] = useState({ top: 0, right: 0, width: 300 });

  useEffect(() => {
    const calculate = () => {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + window.scrollY + 12,
        right: window.innerWidth - rect.right,
        width: Math.max(rect.width, 300),
      });
    };
    calculate();
    window.addEventListener('resize', calculate);
    window.addEventListener('scroll', calculate, true);
    return () => {
      window.removeEventListener('resize', calculate);
      window.removeEventListener('scroll', calculate, true);
    };
  }, [anchorRef]);

  useEffect(() => {
    const handler = (e) => {
      if (anchorRef.current && anchorRef.current.contains(e.target)) return;
      onClose();
    };
    setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose, anchorRef]);

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: pos.top,
        right: pos.right,
        minWidth: pos.width,
        zIndex: 9999,
      }}
      className="rounded-xl border border-paper-3 bg-white shadow-[0_24px_70px_rgba(11,11,15,0.18)]"
    >
      {children}
    </div>,
    document.body
  );
}

export default function Catalog({ activeCategory, setActiveCategory, onQuoteRequest }) {
  const [localCategory, setLocalCategory] = useState('hardware');
  const cat = activeCategory || localCategory;
  const setCat = setActiveCategory || setLocalCategory;

  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hardwareVisibleCount, setHardwareVisibleCount] = useState(3);
  const [hardwareFilterOpen, setHardwareFilterOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedFeatureIndex, setExpandedFeatureIndex] = useState(null);

  // ── Brand filter state ────────────────────────────────────────────────────
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSectionOpen, setBrandSectionOpen] = useState(true);

  const [softwareTab, setSoftwareTab] = useState('erp');
  const [softwareExpanded, setSoftwareExpanded] = useState(false);

  const sectionRef = useRef(null);

  const detailPanelRef = useRef(null);
  const overlayRef = useRef(null);
  const filterRef = useRef(null);
  const filterBtnRef = useRef(null);

  // ── Derive available subcategories ───────────────────────────────────────
  const subcategories = useMemo(() => {
    const subs = new Set();
    catalogData.forEach(item => {
      if (item.type === cat && item.subcategory) subs.add(item.subcategory);
    });
    return ['all', ...Array.from(subs)];
  }, [cat]);

  // ── Derive available brands from current hardware items ──────────────────
  const availableBrands = useMemo(() => {
    if (cat !== 'hardware') return [];
    const brandCount = {};
    catalogData.forEach(item => {
      if (item.type !== 'hardware') return;
      if (activeSubcategory !== 'all' && item.subcategory !== activeSubcategory) return;
      const brand = getBrand(item);
      brandCount[brand] = (brandCount[brand] || 0) + 1;
    });
    return Object.entries(brandCount)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [cat, activeSubcategory]);

  // ── Reset filters on category change ─────────────────────────────────────
  useEffect(() => {
    setActiveSubcategory('all');
    setSelectedBrands([]);
  }, [cat]);

  useEffect(() => {
    setSelectedBrands([]);
  }, [activeSubcategory]);

  // ── Filtered items (hardware now includes brand filter) ───────────────────
  const filteredItems = useMemo(() => {
    if (cat === 'software') {
      return catalogData.filter(item => {
        const isSoftwareItem = item.type === 'software' || item.subcategory === 'templates' || item.subcategory === 'textiles';
        const hasContent = item.description && item.description.length > 5;
        if (!isSoftwareItem || (!hasContent && item.subcategory !== 'templates')) return false;
        const searchLower = searchQuery.toLowerCase();
        const itemDesc = item.description || "";
        const matchesSearch = item.title.toLowerCase().includes(searchLower) || itemDesc.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
        if (softwareTab === 'erp') return item.id === 'e-commerce-erp-template';
        else if (softwareTab === 'cloud') return ['cloud', 'it-infra', 'network', 'isp', 'cctv'].includes(item.subcategory);
        else return ['software', 'office', 'eprocurement', 'accounting'].includes(item.subcategory);
      });
    } else {
      return catalogData.filter(item => {
        const matchesCategory = item.type === cat;
        const matchesSubcategory = activeSubcategory === 'all' || item.subcategory === activeSubcategory;
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = item.title.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower);
        const hasContent = item.description.length > 5;
        // ── Brand filter ──
        const itemBrand = getBrand(item);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(itemBrand);
        return matchesCategory && matchesSubcategory && matchesSearch && hasContent && matchesBrand;
      });
    }
  }, [cat, activeSubcategory, searchQuery, softwareTab, selectedBrands]);

  const displayedItems = useMemo(() => {
    if (cat === 'hardware') return filteredItems.slice(0, hardwareVisibleCount);
    if (cat === 'software' && !softwareExpanded && !searchQuery) return filteredItems.slice(0, 3);
    return filteredItems;
  }, [filteredItems, cat, hardwareVisibleCount, softwareExpanded, searchQuery]);

  useEffect(() => { setSoftwareExpanded(false); }, [softwareTab, cat]);
  useEffect(() => {
    setHardwareVisibleCount(3);
    setHardwareFilterOpen(false);
  }, [activeSubcategory, searchQuery, cat]);

  // ── Brand toggle helper ───────────────────────────────────────────────────
  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetAllFilters = () => {
    setActiveSubcategory('all');
    setSearchQuery('');
    setSelectedBrands([]);
    setHardwareVisibleCount(3);
  };

  // ── Remove a single active filter chip ───────────────────────────────────
  const removeFilterChip = (type, value) => {
    if (type === 'subcategory') setActiveSubcategory('all');
    if (type === 'search') setSearchQuery('');
    if (type === 'brand') setSelectedBrands(prev => prev.filter(b => b !== value));
  };

  // ── Detail panel GSAP ─────────────────────────────────────────────────────
  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setTimeout(() => {
      if (detailPanelRef.current && overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.fromTo(detailPanelRef.current,
          { x: '100%', opacity: 0 },
          { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
      }
    }, 50);
  };

  const handleCloseDetail = () => {
    if (detailPanelRef.current && overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(detailPanelRef.current, {
        x: '100%', opacity: 0, duration: 0.4, ease: 'power3.in',
        onComplete: () => setSelectedItem(null)
      });
    } else {
      setSelectedItem(null);
    }
  };

  // Close panel on Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedItem) handleCloseDetail();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  // ── Active filter chips list ──────────────────────────────────────────────
  const activeChips = useMemo(() => {
    const chips = [];
    if (activeSubcategory !== 'all') chips.push({ type: 'subcategory', label: subcategoryNames[activeSubcategory] || activeSubcategory, value: activeSubcategory });
    if (searchQuery) chips.push({ type: 'search', label: `"${searchQuery}"`, value: searchQuery });
    selectedBrands.forEach(b => chips.push({ type: 'brand', label: b, value: b }));
    return chips;
  }, [activeSubcategory, searchQuery, selectedBrands]);

  const handleInquiry = (item) => {
    handleCloseDetail();
    if (onQuoteRequest) {
      const message = `Hello Cryptware team,\n\nI am interested in your "${item.title}". Please send me more details, pricing, and availability.`;
      onQuoteRequest(message);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') handleCloseDetail(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section ref={sectionRef} id="catalog" className="py-20 md:py-32 bg-paper relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,163,218,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,163,218,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-[92%] max-w-[1280px] mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="block text-brand tracking-[0.16em] uppercase text-[0.72rem] font-semibold mb-4">
            Catalog & Solutions
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.12] text-ink font-normal">
            {cat === 'hardware' ? (
              <>Discover our premium hardware <br /><em className="text-ink-3 not-italic">equipment &amp; accessories</em></>
            ) : (
              <>Explore our enterprise software <br /><em className="text-ink-3 not-italic">&amp; business templates</em></>
            )}
          </h2>
        </div>

        {/* ── HARDWARE FILTER BAR ─────────────────────────────────────────── */}
        {cat === 'hardware' && (
          <div className="mb-12 border-y border-paper-3/40 bg-white/70 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-[240px_240px_minmax(0,1fr)] lg:grid-cols-[260px_260px_minmax(0,1fr)] xl:grid-cols-[280px_280px_minmax(0,1fr)] gap-4 items-start py-5">

              {/* PRODUCT CATEGORIES SIDEBAR */}
              <div className="rounded-3xl border border-paper-3 bg-white/90 p-4 shadow-sm">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-3 mb-4">
                  Product Categories
                </p>
                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 pb-1">
                  {subcategories.map(sub => {
                    const isSelected = activeSubcategory === sub;
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setActiveSubcategory(sub)}
                        aria-pressed={isSelected}
                        className={`w-full text-left rounded-full px-4 py-3 text-[0.82rem] font-bold uppercase transition-all duration-200 ${isSelected ? 'bg-brand text-white border border-brand shadow-sm' : 'bg-white border border-paper-3 text-ink hover:border-brand/40 hover:text-brand'}`}
                      >
                        {sub === 'all' ? 'All Hardware' : (subcategoryNames[sub] || sub)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COMPANY SELECTOR SIDEBAR */}
              <div className="rounded-3xl border border-paper-3 bg-white/90 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-3">
                    Company Selector
                  </p>
                  {selectedBrands.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedBrands([])}
                      className="text-[0.65rem] font-bold uppercase text-brand hover:text-brand-h"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 pb-1">
                  {availableBrands.length === 0 ? (
                    <p className="text-[0.78rem] text-ink-3 py-2 px-2">No companies found</p>
                  ) : (
                    availableBrands.map(({ name, count }) => {
                      const isSelected = selectedBrands.includes(name);
                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => toggleBrand(name)}
                          aria-pressed={isSelected}
                          className={`group w-full flex items-center justify-between rounded-full px-4 py-3 text-[0.82rem] font-bold uppercase transition-all duration-200 ${isSelected ? 'bg-brand text-white border border-brand shadow-sm' : 'bg-white border border-paper-3 text-ink hover:border-brand/40 hover:text-brand'}`}
                        >
                          <span>{name}</span>
                          <span className={`text-[0.7rem] px-2 py-0.5 rounded-full transition-colors ${isSelected ? 'bg-white/20 text-white' : 'bg-paper-2 text-ink-3 group-hover:bg-brand/10 group-hover:text-brand'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1 relative">
                    <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-ink-3/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search hardware, labels, scanners..."
                      className="w-full bg-white border border-paper-3 rounded-lg pl-11 pr-11 py-3 text-[0.9rem] text-ink placeholder:text-ink-3/45 shadow-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all duration-200"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-4 flex items-center text-ink-3/50 hover:text-ink" aria-label="Clear search">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="relative sm:w-auto">
                    <button
                      ref={filterBtnRef}
                      type="button"
                      onClick={() => setHardwareFilterOpen(open => !open)}
                      className="w-full inline-flex h-[46px] items-center justify-center gap-2 rounded-lg border border-paper-3 bg-ink px-5 text-[0.78rem] font-bold uppercase text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(11,11,15,0.14)]"
                      aria-expanded={hardwareFilterOpen}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M7 12h10M10 19h4" />
                      </svg>
                      Filter Menu
                      {selectedBrands.length > 0 && (
                        <span className="ml-1 bg-brand text-white text-[0.65rem] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {selectedBrands.length}
                        </span>
                      )}
                    </button>

                    {hardwareFilterOpen && (
                      <FilterDropdown anchorRef={filterBtnRef} onClose={() => setHardwareFilterOpen(false)}>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4 border-b border-paper-3/60 px-4 py-3">
                          <div>
                            <p className="text-[0.72rem] font-bold uppercase text-ink">Hardware view</p>
                            <p className="mt-0.5 text-[0.78rem] text-ink-3">{filteredItems.length} matching items</p>
                          </div>
                          <button type="button" onClick={resetAllFilters} className="text-[0.7rem] font-bold uppercase text-brand hover:text-brand-h">
                            Reset all
                          </button>
                        </div>

                        {/* Show at once */}
                        <div className="px-4 pt-4 pb-3 border-b border-paper-3/40">
                          <p className="mb-3 text-[0.72rem] font-bold uppercase text-ink-3">Show at once</p>
                          <div className="grid grid-cols-3 gap-2">
                            {[3, 6, 9].map(count => (
                              <button
                                key={count}
                                type="button"
                                onClick={() => setHardwareVisibleCount(count)}
                                className={`h-10 rounded-lg border text-[0.82rem] font-bold transition-all duration-200 ${hardwareVisibleCount === count ? 'border-brand bg-brand text-white shadow-sm' : 'border-paper-3 bg-paper-2 text-ink hover:border-brand/40 hover:text-brand'}`}
                              >
                                {count}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Brand Filter */}
                        <div className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => setBrandSectionOpen(o => !o)}
                            className="w-full flex items-center justify-between mb-3"
                          >
                            <span className="text-[0.72rem] font-bold uppercase text-ink-3 tracking-wider">
                              Filter by Brand
                              {selectedBrands.length > 0 && (
                                <span className="ml-2 bg-brand/10 text-brand text-[0.65rem] px-1.5 py-0.5 rounded-full font-bold">
                                  {selectedBrands.length} selected
                                </span>
                              )}
                            </span>
                            <svg className={`w-4 h-4 text-ink-3 transition-transform duration-200 ${brandSectionOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {brandSectionOpen && (
                            <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
                              {availableBrands.length === 0 ? (
                                <p className="text-[0.78rem] text-ink-3 py-2">No brands found</p>
                              ) : (
                                availableBrands.map(({ name, count }) => {
                                  const isChecked = selectedBrands.includes(name);
                                  return (
                                    <label
                                      key={name}
                                      onClick={() => toggleBrand(name)}
                                      className="flex items-center justify-between gap-3 py-2 px-2 rounded-lg cursor-pointer hover:bg-paper-2 transition-colors group"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${isChecked ? 'bg-brand border-brand' : 'border-paper-3 bg-white group-hover:border-brand/40'}`}>
                                          {isChecked && (
                                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                          )}
                                        </div>
                                        <span className={`text-[0.82rem] font-medium transition-colors ${isChecked ? 'text-brand font-bold' : 'text-ink'}`}>
                                          {name}
                                        </span>
                                      </div>
                                      <span className="text-[0.7rem] text-ink-3 bg-paper-2 px-2 py-0.5 rounded-full font-bold">{count}</span>
                                    </label>
                                  );
                                })
                              )}
                            </div>
                          )}
                        </div>

                        {/* Summary */}
                        <div className="border-t border-paper-3/40 mx-4 mb-4 pt-3 rounded-lg bg-paper-2 px-3 py-3 text-[0.78rem] text-ink-3">
                          Showing <span className="font-bold text-ink">{Math.min(displayedItems.length, filteredItems.length)}</span> of <span className="font-bold text-ink">{filteredItems.length}</span> hardware results.
                        </div>
                      </FilterDropdown>
                    )}
                  </div>
                </div>

                {/* ── Active Filter Chips + Per-page Toggle ─────────────────── */}
            <div className="flex flex-col gap-3 border-t border-paper-3/30 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {activeChips.length === 0 ? (
                  <span className="rounded-lg bg-brand/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase text-brand">
                    All Hardware
                  </span>
                ) : (
                  activeChips.map((chip, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand/10 px-3 py-1.5 text-[0.7rem] font-bold uppercase text-brand"
                    >
                      {chip.label}
                      <button
                        onClick={() => removeFilterChip(chip.type, chip.value)}
                        className="text-brand/60 hover:text-brand ml-0.5"
                        aria-label={`Remove ${chip.label} filter`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))
                )}
              </div>

              <div className="inline-flex w-full rounded-lg border border-paper-3 bg-white p-1 shadow-sm sm:w-auto">
                {[3, 6, 9].map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setHardwareVisibleCount(count)}
                    className={`flex-1 rounded-md px-4 py-2 text-[0.78rem] font-bold uppercase transition-all duration-200 sm:flex-none ${hardwareVisibleCount === count ? 'bg-ink text-white' : 'text-ink-3 hover:bg-paper-2 hover:text-ink'}`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
        )}

        {/* SOFTWARE TABS */}
        {cat === 'software' && (
          <div className="flex flex-col items-center mb-12">
            <div className="flex p-1.5 bg-paper-2 border border-paper-3 rounded-xl mb-8 overflow-hidden shadow-sm">
              {[
                { key: 'erp', label: 'ERP Templates' },
                { key: 'cloud', label: 'Cloud & Infra' },
                { key: 'services', label: 'IT Services' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setSoftwareTab(tab.key)}
                  className={`px-6 py-3 rounded-lg text-[0.85rem] font-bold uppercase tracking-wider transition-all duration-300 ${softwareTab === tab.key ? 'bg-brand text-white shadow-md' : 'text-ink-3 hover:text-ink'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ITEMS GRID */}
        {displayedItems.length === 0 ? (
          <div className="text-center py-20 bg-paper-2 rounded-2xl border border-dashed border-paper-3">
            <svg className="w-12 h-12 text-ink-3/40 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <h3 className="font-serif text-lg text-ink font-medium">No catalog items found</h3>
            <p className="text-ink-3 text-sm mt-2 max-w-[320px] mx-auto">Try adjusting your filters or search keywords to find what you are looking for.</p>
            {activeChips.length > 0 && (
              <button
                onClick={resetAllFilters}
                className="mt-4 text-[0.78rem] font-bold uppercase text-brand hover:text-brand-h underline underline-offset-2"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenDetail(item)}
                className="group bg-white rounded-2xl border border-paper-3/40 overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_50px_rgba(11,11,15,0.06)] hover:-translate-y-1.5 transition-all duration-[400ms] ease-ease flex flex-col"
              >
                {cat === 'hardware' ? (
                  <>
                    <div className="aspect-[4/3] bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_55%,#edf7fb_100%)] relative overflow-hidden border-b border-paper-3/20 flex items-center justify-center p-6">
                      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-[1.05] transition-transform duration-500 ease-ease"
                          onError={(e) => { e.target.src = '/assets/img/logo.jpg'; }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-col items-start gap-2">
                        <span className="inline-flex w-full max-w-full items-center gap-1.5 rounded-lg border border-brand/20 bg-white/90 px-2.5 py-1.5 text-[0.65rem] font-bold uppercase text-brand shadow-sm backdrop-blur-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                          <span className="truncate">{subcategoryNames[item.subcategory] || item.subcategory}</span>
                        </span>
                        <span className="rounded-lg border border-ink/10 bg-white/80 px-2 py-1 text-[0.62rem] font-bold uppercase text-ink-3 shadow-sm backdrop-blur-sm">
                          #{String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      {/* Brand badge bottom-right */}
                      <span className="absolute bottom-3 right-3 text-[0.6rem] font-bold uppercase text-ink-3/70 bg-white/80 border border-ink/8 px-2 py-1 rounded-md backdrop-blur-sm shadow-sm">
                        {getBrand(item)}
                      </span>
                    </div>

                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-[1.2rem] leading-tight text-ink font-normal mb-3 group-hover:text-brand transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[0.875rem] text-ink-3 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-paper-3/40 pt-5">
                        <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase text-ink-3">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          Ready to quote
                        </span>
                        <span className="flex items-center gap-1.5 text-brand text-[0.78rem] font-bold uppercase group-hover:gap-2.5 transition-all">
                          Details
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {item.img && (
                      <div className="h-[220px] relative bg-paper-2 overflow-hidden border-b border-paper-3/20">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top filter group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.target.style.display = 'none'; }} />
                        <span className="absolute top-4 right-4 text-ink text-[0.55rem] tracking-widest uppercase font-bold px-2 py-0.5 bg-white/95 backdrop-blur-sm border border-paper-3/50 rounded shadow-sm z-10">
                          {subcategoryNames[item.subcategory] || item.subcategory}
                        </span>
                      </div>
                    )}
                    <div className={`p-8 flex-1 flex flex-col relative bg-gradient-to-br from-white to-paper-2 ${!item.description ? 'items-center justify-center text-center' : ''}`}>
                      {!item.img && (
                        <>
                          {!item.description ? (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -z-10 group-hover:bg-brand/10 transition-colors duration-500" />
                          ) : (
                            <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                              </svg>
                            </div>
                          )}
                          <span className={`absolute ${item.description ? 'top-8 right-8' : 'top-4 right-4'} text-ink-3 text-[0.55rem] tracking-widest uppercase font-bold px-2 py-0.5 bg-white border border-paper-3/60 rounded shadow-sm`}>
                            {subcategoryNames[item.subcategory] || item.subcategory}
                          </span>
                        </>
                      )}
                      <h3 className={`font-serif leading-tight text-ink font-normal group-hover:text-brand transition-colors relative z-10 ${!item.description ? 'text-[1.5rem] mb-6 mt-4' : 'text-[1.3rem] mb-3'}`}>
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[0.9rem] text-ink-3 leading-relaxed line-clamp-4 relative z-10">{item.description}</p>
                      )}
                      <div className={`mt-auto flex items-center gap-2 text-brand text-[0.8rem] font-bold tracking-wider uppercase group-hover:gap-3 transition-all relative z-10 ${!item.description ? 'justify-center w-[80%] border border-brand/20 py-3 rounded-full hover:bg-brand/5 shadow-sm mt-4' : 'mt-8'}`}>
                        Learn More
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      {item.description && (
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand/5 rounded-full blur-2xl group-hover:bg-brand/10 transition-colors duration-500" />
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* VIEW ALL BUTTON (Software) */}
        {cat === 'software' && !softwareExpanded && filteredItems.length > 3 && !searchQuery && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setSoftwareExpanded(true)}
              className="inline-flex text-[0.9rem] font-semibold px-8 py-3.5 bg-brand/10 border border-brand/20 text-brand rounded-full transition-all duration-300 ease-out hover:bg-brand hover:text-white hover:scale-[1.05] hover:shadow-[0_8px_20px_-6px_rgba(6,163,218,0.5)] items-center justify-center gap-2"
            >
              View All {softwareTab === 'erp' ? 'ERP Templates' : softwareTab === 'cloud' ? 'Cloud Solutions' : 'IT Services'}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

      </div>

      {/* DETAIL PANEL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div ref={overlayRef} onClick={handleCloseDetail} className="absolute inset-0 bg-ink/70 backdrop-blur-sm opacity-0 transition-opacity" />
          <div
            ref={detailPanelRef}
            style={{ transform: 'translateY(50px)', opacity: 0 }}
            className="relative w-full max-w-[850px] max-h-[92vh] rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col z-10 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-paper-3/40 sticky top-0 bg-white z-20">
              <div className="flex items-center gap-3">
                <span className="text-[0.72rem] tracking-[0.16em] uppercase font-bold text-brand">
                  {subcategoryNames[selectedItem.subcategory] || selectedItem.subcategory}
                </span>
                <span className="text-[0.65rem] font-bold uppercase text-ink-3 bg-paper-2 border border-paper-3/40 px-2 py-0.5 rounded">
                  {getBrand(selectedItem)}
                </span>
              </div>
              <button onClick={handleCloseDetail} className="w-10 h-10 rounded-full bg-paper-2 hover:bg-paper-3/60 flex items-center justify-center text-ink transition-colors cursor-pointer" aria-label="Close panel">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              <div className="aspect-[4/3] bg-paper-2 rounded-2xl border border-paper-3/40 flex items-center justify-center p-10 relative overflow-hidden group">
                {selectedItem.img ? (
                  <img src={selectedItem.img} alt={selectedItem.title} className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.src = '/assets/img/logo.jpg'; }} />
                ) : (
                  <svg className="w-20 h-20 text-brand/25" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09" />
                  </svg>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-[1.8rem] leading-snug text-ink font-normal">{selectedItem.title}</h3>
                <p className="text-[0.95rem] text-ink-2 leading-relaxed text-justify">{selectedItem.description}</p>
              </div>

              {selectedItem.specs && (
                <div className="bg-paper-2 rounded-2xl p-6 border border-paper-3/30 space-y-4">
                  <h4 className="font-sans text-[0.8rem] tracking-wider uppercase font-bold text-ink">Technical Specifications</h4>
                  <div className="h-px bg-paper-3" />
                  <ul className="space-y-3">
                    {selectedItem.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[0.875rem] text-ink-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.workingStyles && (
                <div className="space-y-4">
                  <h4 className="font-sans text-[0.85rem] tracking-wider uppercase font-bold text-ink">Working Styles</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedItem.workingStyles.map((style, idx) => (
                      <div key={idx} className="relative bg-gradient-to-br from-paper-2 to-white/50 backdrop-blur-sm border border-paper-3/50 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 z-10 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-full -z-10 group-hover:bg-brand/10 transition-colors" />
                        <FeatureIcon name={style.icon} className="w-8 h-8 text-brand mb-4" />
                        <h5 className="font-semibold text-[0.95rem] text-ink mb-1.5 leading-tight">{style.name}</h5>
                        <p className="text-[0.825rem] text-ink-2 leading-relaxed">{style.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.whoShouldUse && (
                <div className="space-y-4">
                  <h4 className="font-sans text-[0.85rem] tracking-wider uppercase font-bold text-ink">Who Should Use This?</h4>
                  <div className="bg-white border border-paper-3/40 shadow-sm rounded-2xl p-3 space-y-1">
                    {selectedItem.whoShouldUse.map((row, idx) => (
                      <div key={idx} className="flex gap-4 items-center p-3 rounded-xl hover:bg-paper-2/60 transition-colors">
                        <span className="inline-flex items-center px-3 py-2 rounded-lg text-[0.7rem] font-bold tracking-widest uppercase bg-gradient-to-r from-brand/10 to-brand/5 text-brand min-w-[140px] justify-center text-center border border-brand/10 shadow-sm">{row.team}</span>
                        <p className="text-[0.85rem] text-ink-2 leading-relaxed">{row.help}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.features && (
                <div className="space-y-4">
                  <h4 className="font-sans text-[0.85rem] tracking-wider uppercase font-bold text-ink">Features Overview</h4>
                  <div className="space-y-3">
                    {selectedItem.features.map((feature, idx) => {
                      const isOpen = expandedFeatureIndex === idx;
                      return (
                        <div key={idx} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-brand/30 shadow-md bg-gradient-to-b from-brand/[0.02] to-transparent' : 'border-paper-3/40 bg-white hover:border-brand/20'}`}>
                          <button onClick={() => setExpandedFeatureIndex(isOpen ? null : idx)} className="w-full text-left px-5 py-4 flex items-center justify-between transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3.5">
                              <div className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-brand/10 text-brand' : 'bg-paper-2 text-ink-3 group-hover:text-brand'}`}>
                                <FeatureIcon name={feature.icon} className="w-5 h-5" />
                              </div>
                              <span className={`font-semibold text-[0.95rem] transition-colors ${isOpen ? 'text-brand' : 'text-ink'}`}>{feature.name}</span>
                            </div>
                            <svg className={`w-5 h-5 text-ink-3 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </button>
                          <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[300px] border-t border-paper-3/10 bg-paper-2/20' : 'max-h-0'}`}>
                            <div className="px-5 py-4 space-y-3">
                              <div>
                                <span className="block text-[0.7rem] uppercase font-bold text-ink-3 tracking-wider mb-1">What users do</span>
                                <p className="text-[0.85rem] text-ink-2 leading-relaxed">{feature.what}</p>
                              </div>
                              <div className="bg-[#f0f9ff]/40 border border-brand/5 rounded-xl p-3">
                                <span className="block text-[0.7rem] uppercase font-bold text-brand tracking-wider mb-1">Business Benefit</span>
                                <p className="text-[0.825rem] text-ink-2 leading-relaxed">{feature.benefit}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="bg-[#f0f9ff]/50 border border-brand/10 rounded-2xl p-5 flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0 text-brand text-xl">🛡️</span>
                <div>
                  <h5 className="text-[0.85rem] font-bold text-ink mb-1">Cryptware Assurance</h5>
                  <p className="text-[0.8rem] text-ink-3 leading-relaxed">All custom deployments, hardware provisioning, and system integrations come with certified professional warranties, 10/5 support, and dedicated rollout training.</p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-paper-3/20">
                <h4 className="font-sans text-[0.7rem] tracking-widest uppercase font-bold text-ink-3 mb-4">Also We Will Build</h4>
                <div className="flex flex-wrap gap-2.5">
                  {catalogData.filter(item => item.subcategory === 'templates' && item.id !== selectedItem.id).map(erp => (
                    <span key={erp.id} className="inline-flex items-center px-3 py-1.5 rounded-lg text-[0.65rem] font-bold tracking-widest uppercase bg-paper-2 text-ink-3 border border-paper-3/40 hover:bg-brand/5 hover:text-brand hover:border-brand/20 transition-colors cursor-pointer shadow-sm">
                      {erp.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-paper-3/40 bg-white/90 backdrop-blur-md flex justify-end gap-3 sticky bottom-0 z-20">
              <button onClick={handleCloseDetail} className="text-[0.75rem] font-bold uppercase tracking-widest border border-paper-3/60 hover:border-paper-3 hover:bg-paper-2 text-ink-3 hover:text-ink px-5 py-2.5 rounded-lg transition-all">
                Go Back
              </button>
              <button onClick={() => handleInquiry(selectedItem)} className="text-[0.75rem] font-bold uppercase tracking-widest bg-brand hover:bg-brand-h text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                Inquire Now
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}