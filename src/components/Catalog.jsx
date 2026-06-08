import React, { useState, useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { catalogData } from '../data/catalog';

// Helper subcategories dictionary to display friendly names
const subcategoryNames = {
  // Products
  'printers': 'Barcode Printers',
  'scanners': 'Barcode Scanners',
  'pos': 'POS Terminals & Hardware',
  'computing': 'Mobile Computers',
  'rfid': 'RFID Systems',
  'consumables': 'Tags, Labels & Ribbons',
  // Solutions
  'it-infra': 'IT Infrastructure',
  'office': 'Office Automation',
  'network': 'Network Security',
  'software': 'Enterprise Software',
  'cctv': 'IP CCTV Surveillance',
  'isp': 'ISP Solutions',
  'cloud': 'Cloud Services',
  'eprocurement': 'E-Procurement',
  'accounting': 'Crypto Accounting',
  // Industries
  'textiles': 'Textile & Apparel',
  'pharma': 'Pharmaceutical',
  'automotive': 'Automotive & Logistics',
  'coldstorage': 'Cold Storage',
  'hazardous': 'Hazardous Zones',
  'templates': 'ERP Templates'
};

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
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      viewBox="0 0 24 24"
    >
      {selectedPath}
    </svg>
  );
};

export default function Catalog({ activeCategory, setActiveCategory, onQuoteRequest }) {
  const [localCategory, setLocalCategory] = useState('hardware');
  const cat = activeCategory || localCategory;
  const setCat = setActiveCategory || setLocalCategory;

  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedFeatureIndex, setExpandedFeatureIndex] = useState(null);

  // New state for Software Tabs
  const [softwareTab, setSoftwareTab] = useState('erp'); // 'erp', 'cloud', 'services'
  const [softwareExpanded, setSoftwareExpanded] = useState(false);

  const detailPanelRef = useRef(null);
  const overlayRef = useRef(null);

  // Derive available subcategories for the active category
  const subcategories = useMemo(() => {
    const subs = new Set();
    catalogData.forEach(item => {
      if (item.type === cat && item.subcategory) {
        subs.add(item.subcategory);
      }
    });
    return ['all', ...Array.from(subs)];
  }, [cat]);

  // Reset subcategory filter when category changes
  useEffect(() => {
    setActiveSubcategory('all');
  }, [cat]);

  const filteredItems = useMemo(() => {
    if (cat === 'software') {
      return catalogData.filter(item => {
        // Fix for data typo where an ERP template has hardware type
        const isSoftwareItem = item.type === 'software' || item.subcategory === 'templates' || item.subcategory === 'textiles';
        const hasContent = item.description && item.description.length > 5;
        
        // Allow templates without content to pass
        if (!isSoftwareItem || (!hasContent && item.subcategory !== 'templates')) return false;

        const searchLower = searchQuery.toLowerCase();
        const itemDesc = item.description || "";
        const matchesSearch = item.title.toLowerCase().includes(searchLower) || itemDesc.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;

        if (softwareTab === 'erp') {
          return item.id === 'e-commerce-erp-template';
        } else if (softwareTab === 'cloud') {
          return ['cloud', 'it-infra', 'network', 'isp', 'cctv'].includes(item.subcategory);
        } else {
          return ['software', 'office', 'eprocurement', 'accounting'].includes(item.subcategory);
        }
      });
    } else {
      // Hardware behavior remains exactly the same
      return catalogData.filter(item => {
        const matchesCategory = item.type === cat;
        const matchesSubcategory = activeSubcategory === 'all' || item.subcategory === activeSubcategory;
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = item.title.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower);
        const hasContent = item.description.length > 5;
        return matchesCategory && matchesSubcategory && matchesSearch && hasContent;
      });
    }
  }, [cat, activeSubcategory, searchQuery, softwareTab]);

  const displayedItems = useMemo(() => {
    if (cat === 'software' && !softwareExpanded && !searchQuery) {
      return filteredItems.slice(0, 3);
    }
    return filteredItems;
  }, [filteredItems, cat, softwareExpanded, searchQuery]);

  // Reset expanded state when tab changes
  useEffect(() => {
    setSoftwareExpanded(false);
  }, [softwareTab, cat]);

  // GSAP animation for opening detail panel
  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setExpandedFeatureIndex(null);

    // Animate overlay & drawer sliding in
    setTimeout(() => {
      if (overlayRef.current && detailPanelRef.current) {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' });
        gsap.fromTo(detailPanelRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
        );
      }
    }, 50);
  };

  // GSAP animation for closing detail panel
  const handleCloseDetail = () => {
    if (overlayRef.current && detailPanelRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' });
      gsap.to(detailPanelRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.3,
        ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        onComplete: () => setSelectedItem(null)
      });
    } else {
      setSelectedItem(null);
    }
  };

  // Handle quote request click
  const handleInquiry = (item) => {
    handleCloseDetail();
    if (onQuoteRequest) {
      const message = `Hello Cryptware team,\n\nI am interested in your "${item.title}" (${cat === 'products' ? 'Product' : cat === 'solutions' ? 'Solution' : 'Industry Template'}). Please send me more details, pricing, and availability.`;
      onQuoteRequest(message);
    }
  };

  // Listen for Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseDetail();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="catalog" className="py-20 md:py-32 bg-paper relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
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
              <>
                Discover our premium hardware <br />
                <em className="text-ink-3 not-italic">equipment &amp; accessories</em>
              </>
            ) : (
              <>
                Explore our enterprise software <br />
                <em className="text-ink-3 not-italic">&amp; business templates</em>
              </>
            )}
          </h2>
        </div>



        {/* HARDWARE FILTER BAR (Only visible for hardware) */}
        {cat === 'hardware' && (
          <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-between mb-12 border-b border-paper-3/30 pb-8">
            {/* Subcategory Pills */}
            <div className="flex gap-2 flex-wrap items-center overflow-x-auto py-1">
              {subcategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`text-[0.78rem] uppercase tracking-wider font-semibold px-4 py-2 rounded-lg border transition-all duration-200 ${activeSubcategory === sub
                      ? 'bg-brand/10 border-brand text-brand'
                      : 'bg-white border-paper-3/40 text-ink-3 hover:border-ink-3/50 hover:text-ink'
                    }`}
                >
                  {sub === 'all' ? 'Show All' : (subcategoryNames[sub] || sub)}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] md:min-w-[320px]">
              <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-ink-3/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hardware..."
                className="w-full bg-white border border-paper-3 rounded-full pl-11 pr-5 py-3 text-[0.875rem] text-ink placeholder:text-ink-3/40 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-4 flex items-center text-ink-3/50 hover:text-ink"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* SOFTWARE TABS (Only visible for software) */}
        {cat === 'software' && (
          <div className="flex flex-col items-center mb-12">
            <div className="flex p-1.5 bg-paper-2 border border-paper-3 rounded-xl mb-8 overflow-hidden shadow-sm">
              <button
                onClick={() => setSoftwareTab('erp')}
                className={`px-6 py-3 rounded-lg text-[0.85rem] font-bold uppercase tracking-wider transition-all duration-300 ${softwareTab === 'erp' ? 'bg-brand text-white shadow-md' : 'text-ink-3 hover:text-ink'}`}
              >
                ERP Templates
              </button>
              <button
                onClick={() => setSoftwareTab('cloud')}
                className={`px-6 py-3 rounded-lg text-[0.85rem] font-bold uppercase tracking-wider transition-all duration-300 ${softwareTab === 'cloud' ? 'bg-brand text-white shadow-md' : 'text-ink-3 hover:text-ink'}`}
              >
                Cloud & Infra
              </button>
              <button
                onClick={() => setSoftwareTab('services')}
                className={`px-6 py-3 rounded-lg text-[0.85rem] font-bold uppercase tracking-wider transition-all duration-300 ${softwareTab === 'services' ? 'bg-brand text-white shadow-md' : 'text-ink-3 hover:text-ink'}`}
              >
                IT Services
              </button>
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
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map(item => (
              <div
                key={item.id}
                onClick={() => handleOpenDetail(item)}
                className="group bg-white rounded-2xl border border-paper-3/40 overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_50px_rgba(11,11,15,0.06)] hover:-translate-y-1.5 transition-all duration-[400ms] ease-ease flex flex-col"
              >
                {cat === 'hardware' ? (
                  <>
                    {/* Image Wrap */}
                    <div className="aspect-[4/3] bg-paper-2 relative overflow-hidden border-b border-paper-3/20 flex items-center justify-center p-6">
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain filter group-hover:scale-[1.05] transition-transform duration-500 ease-ease"
                          onError={(e) => {
                            // Fallback logo if image fails to load
                            e.target.src = '/assets/img/logo.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59" />
                          </svg>
                        </div>
                      )}
                      {/* Category badge */}
                      <span className="absolute top-4 left-4 bg-ink/5 border border-ink/10 text-ink text-[0.65rem] tracking-wider uppercase font-bold px-2.5 py-1 rounded">
                        {subcategoryNames[item.subcategory] || item.subcategory}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-[1.2rem] leading-tight text-ink font-normal mb-3 group-hover:text-brand transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[0.875rem] text-ink-3 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-brand text-[0.8rem] font-bold tracking-wider uppercase mt-6 group-hover:gap-2.5 transition-all">
                        View Details
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Software specific layout */}
                    {item.img && (
                      <div className="h-[220px] relative bg-paper-2 overflow-hidden border-b border-paper-3/20">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover object-top filter group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
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
                        <p className="text-[0.9rem] text-ink-3 leading-relaxed line-clamp-4 relative z-10">
                          {item.description}
                        </p>
                      )}
                      
                      <div className={`mt-auto flex items-center gap-2 text-brand text-[0.8rem] font-bold tracking-wider uppercase group-hover:gap-3 transition-all relative z-10 ${!item.description ? 'justify-center w-[80%] border border-brand/20 py-3 rounded-full hover:bg-brand/5 shadow-sm mt-4' : 'mt-8'}`}>
                        Learn More
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      
                      {/* Decorative background element */}
                      {item.description && (
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand/5 rounded-full blur-2xl group-hover:bg-brand/10 transition-colors duration-500"></div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* VIEW ALL BUTTON (Only for Software) */}
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

      {/* ========================================================================= */}
      {/* GORGEOUS DETAILS SIDE DRAWER / PANEL */}
      {/* ========================================================================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">

          {/* Blackout overlay backdrop */}
          <div
            ref={overlayRef}
            onClick={handleCloseDetail}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm opacity-0 transition-opacity"
          />

          {/* Centered Modal Container */}
          <div
            ref={detailPanelRef}
            style={{ transform: 'translateY(50px)', opacity: 0 }}
            className="relative w-full max-w-[850px] max-h-[92vh] rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col z-10 overflow-hidden"
          >
            {/* Drawer Header Sticky */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-paper-3/40 sticky top-0 bg-white z-20">
              <span className="text-[0.72rem] tracking-[0.16em] uppercase font-bold text-brand">
                {subcategoryNames[selectedItem.subcategory] || selectedItem.subcategory}
              </span>
              <button
                onClick={handleCloseDetail}
                className="w-10 h-10 rounded-full bg-paper-2 hover:bg-paper-3/60 flex items-center justify-center text-ink transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable details */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">

              {/* Feature Image */}
              <div className="aspect-[4/3] bg-paper-2 rounded-2xl border border-paper-3/40 flex items-center justify-center p-10 relative overflow-hidden group">
                {selectedItem.img ? (
                  <img
                    src={selectedItem.img}
                    alt={selectedItem.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/assets/img/logo.jpg'; }}
                  />
                ) : (
                  <svg className="w-20 h-20 text-brand/25" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09" />
                  </svg>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <h3 className="font-serif text-[1.8rem] leading-snug text-ink font-normal">
                  {selectedItem.title}
                </h3>
                <p className="text-[0.95rem] text-ink-2 leading-relaxed text-justify">
                  {selectedItem.description}
                </p>
              </div>

              {/* Technical Specifications if any */}
              {selectedItem.specs && (
                <div className="bg-paper-2 rounded-2xl p-6 border border-paper-3/30 space-y-4">
                  <h4 className="font-sans text-[0.8rem] tracking-wider uppercase font-bold text-ink">
                    Technical Specifications
                  </h4>
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

              {/* Working Styles */}
              {selectedItem.workingStyles && (
                <div className="space-y-4">
                  <h4 className="font-sans text-[0.85rem] tracking-wider uppercase font-bold text-ink">
                    Working Styles
                  </h4>
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

              {/* Target Audience / Teams */}
              {selectedItem.whoShouldUse && (
                <div className="space-y-4">
                  <h4 className="font-sans text-[0.85rem] tracking-wider uppercase font-bold text-ink">
                    Who Should Use This?
                  </h4>
                  <div className="bg-white border border-paper-3/40 shadow-sm rounded-2xl p-3 space-y-1">
                    {selectedItem.whoShouldUse.map((row, idx) => (
                      <div key={idx} className="flex gap-4 items-center p-3 rounded-xl hover:bg-paper-2/60 transition-colors">
                        <span className="inline-flex items-center px-3 py-2 rounded-lg text-[0.7rem] font-bold tracking-widest uppercase bg-gradient-to-r from-brand/10 to-brand/5 text-brand min-w-[140px] justify-center text-center border border-brand/10 shadow-sm">
                          {row.team}
                        </span>
                        <p className="text-[0.85rem] text-ink-2 leading-relaxed">{row.help}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Features Accordion */}
              {selectedItem.features && (
                <div className="space-y-4">
                  <h4 className="font-sans text-[0.85rem] tracking-wider uppercase font-bold text-ink">
                    Features Overview
                  </h4>
                  <div className="space-y-3">
                    {selectedItem.features.map((feature, idx) => {
                      const isOpen = expandedFeatureIndex === idx;
                      return (
                        <div key={idx} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-brand/30 shadow-md bg-gradient-to-b from-brand/[0.02] to-transparent' : 'border-paper-3/40 bg-white hover:border-brand/20'}`}>
                          {/* Accordion Trigger */}
                          <button
                            onClick={() => setExpandedFeatureIndex(isOpen ? null : idx)}
                            className="w-full text-left px-5 py-4 flex items-center justify-between transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-3.5">
                              <div className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-brand/10 text-brand' : 'bg-paper-2 text-ink-3 group-hover:text-brand'}`}>
                                <FeatureIcon name={feature.icon} className="w-5 h-5" />
                              </div>
                              <span className={`font-semibold text-[0.95rem] transition-colors ${isOpen ? 'text-brand' : 'text-ink'}`}>{feature.name}</span>
                            </div>
                            <svg
                              className={`w-5 h-5 text-ink-3 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </button>

                          {/* Accordion Content */}
                          <div
                            className={`transition-all duration-300 overflow-hidden ${
                              isOpen ? 'max-h-[300px] border-t border-paper-3/10 bg-paper-2/20' : 'max-h-0'
                            }`}
                          >
                            <div className="px-5 py-4 space-y-3">
                              <div>
                                <span className="block text-[0.7rem] uppercase font-bold text-ink-3 tracking-wider mb-1">
                                  What users do
                                </span>
                                <p className="text-[0.85rem] text-ink-2 leading-relaxed">
                                  {feature.what}
                                </p>
                              </div>
                              <div className="bg-[#f0f9ff]/40 border border-brand/5 rounded-xl p-3">
                                <span className="block text-[0.7rem] uppercase font-bold text-brand tracking-wider mb-1">
                                  Business Benefit
                                </span>
                                <p className="text-[0.825rem] text-ink-2 leading-relaxed">
                                  {feature.benefit}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Business Value Info Banner */}
              <div className="bg-[#f0f9ff]/50 border border-brand/10 rounded-2xl p-5 flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0 text-brand text-xl">
                  🛡️
                </span>
                <div>
                  <h5 className="text-[0.85rem] font-bold text-ink mb-1">Cryptware Assurance</h5>
                  <p className="text-[0.8rem] text-ink-3 leading-relaxed">All custom deployments, hardware provisioning, and system integrations come with certified professional warranties, 10/5 support, and dedicated rollout training.</p>
                </div>
              </div>

              {/* Other ERP Templates Badges */}
              <div className="pt-6 mt-4 border-t border-paper-3/20">
                <h4 className="font-sans text-[0.7rem] tracking-widest uppercase font-bold text-ink-3 mb-4">
                  Also We Will Build
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {catalogData.filter(item => item.subcategory === 'templates' && item.id !== selectedItem.id).map(erp => (
                    <span key={erp.id} className="inline-flex items-center px-3 py-1.5 rounded-lg text-[0.65rem] font-bold tracking-widest uppercase bg-paper-2 text-ink-3 border border-paper-3/40 hover:bg-brand/5 hover:text-brand hover:border-brand/20 transition-colors cursor-pointer shadow-sm">
                      {erp.title}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer CTAs (Sticky) */}
            <div className="px-6 py-4 border-t border-paper-3/40 bg-white/90 backdrop-blur-md flex justify-end gap-3 sticky bottom-0 z-20">
              <button
                onClick={handleCloseDetail}
                className="text-[0.75rem] font-bold uppercase tracking-widest border border-paper-3/60 hover:border-paper-3 hover:bg-paper-2 text-ink-3 hover:text-ink px-5 py-2.5 rounded-lg transition-all"
              >
                Go Back
              </button>
              <button
                onClick={() => handleInquiry(selectedItem)}
                className="text-[0.75rem] font-bold uppercase tracking-widest bg-brand hover:bg-brand-h text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
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
