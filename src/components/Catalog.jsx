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

export default function Catalog({ activeCategory, setActiveCategory, onQuoteRequest }) {
  const [localCategory, setLocalCategory] = useState('hardware');
  const cat = activeCategory || localCategory;
  const setCat = setActiveCategory || setLocalCategory;

  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

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
        const hasContent = item.description.length > 5;
        
        if (!isSoftwareItem || !hasContent) return false;

        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = item.title.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower);
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

    // Animate overlay & drawer sliding in
    setTimeout(() => {
      if (overlayRef.current && detailPanelRef.current) {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' });
        gsap.fromTo(detailPanelRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.45, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
        );
      }
    }, 50);
  };

  // GSAP animation for closing detail panel
  const handleCloseDetail = () => {
    if (overlayRef.current && detailPanelRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' });
      gsap.to(detailPanelRef.current, {
        xPercent: 100,
        duration: 0.4,
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
                    <div className="p-8 flex-1 flex flex-col relative bg-gradient-to-br from-white to-paper-2">
                      <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                        </svg>
                      </div>
                      <span className="absolute top-8 right-8 text-ink-3 text-[0.65rem] tracking-widest uppercase font-bold px-2.5 py-1 bg-white border border-paper-3/60 rounded shadow-sm">
                        {subcategoryNames[item.subcategory] || item.subcategory}
                      </span>
                      <h3 className="font-serif text-[1.3rem] leading-tight text-ink font-normal mb-3 group-hover:text-brand transition-colors relative z-10">
                        {item.title}
                      </h3>
                      <p className="text-[0.9rem] text-ink-3 leading-relaxed line-clamp-4 relative z-10">
                        {item.description}
                      </p>
                      
                      <div className="mt-8 flex items-center gap-2 text-brand text-[0.8rem] font-bold tracking-wider uppercase group-hover:gap-3 transition-all relative z-10">
                        Learn More
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      
                      {/* Decorative background element */}
                      <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand/5 rounded-full blur-2xl group-hover:bg-brand/10 transition-colors duration-500"></div>
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
        <div className="fixed inset-0 z-[100] flex justify-end">

          {/* Blackout overlay backdrop */}
          <div
            ref={overlayRef}
            onClick={handleCloseDetail}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm opacity-0 transition-opacity"
          />

          {/* Slide-in Drawer Container */}
          <div
            ref={detailPanelRef}
            className="relative w-full max-w-[580px] h-full bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.15)] flex flex-col z-10 translate-x-full overflow-hidden"
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

            </div>

            {/* Footer CTAs (Sticky) */}
            <div className="px-6 py-5 border-t border-paper-3/40 bg-white grid grid-cols-2 gap-4 sticky bottom-0 z-20">
              <button
                onClick={handleCloseDetail}
                className="text-[0.9rem] font-medium border border-paper-3 hover:bg-paper-2 text-ink px-4 py-3.5 rounded-full transition-all text-center"
              >
                Go Back
              </button>
              <button
                onClick={() => handleInquiry(selectedItem)}
                className="text-[0.9rem] font-medium bg-brand hover:bg-brand-h text-white px-4 py-3.5 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                Inquire Now
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
