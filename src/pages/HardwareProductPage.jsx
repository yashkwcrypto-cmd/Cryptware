import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { catalogData, hardwareCategories } from '../data/catalog';
import Navbar from '../components/Navbar';
import MobileMenu from '../components/MobileMenu';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import CustomCursor from '../components/CustomCursor';

// ─── SVG Icon Library (zero emojis) ───────────────────────────────────────────
const Icon = {
  Printer:     ({ c }) => <svg className={c||'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
  Scanner:     ({ c }) => <svg className={c||'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
  Mobile:      ({ c }) => <svg className={c||'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  POS:         ({ c }) => <svg className={c||'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  RFID:        ({ c }) => <svg className={c||'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>,
  Label:       ({ c }) => <svg className={c||'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  All:         ({ c }) => <svg className={c||'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Search:      ({ c }) => <svg className={c||'w-4 h-4'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  Close:       ({ c }) => <svg className={c||'w-4 h-4'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  ArrowRight:  ({ c }) => <svg className={c||'w-4 h-4'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  Check:       ({ c }) => <svg className={c||'w-3 h-3'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>,
  Filter:      ({ c }) => <svg className={c||'w-4 h-4'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 5h18M7 12h10M10 19h4"/></svg>,
  ChevronDown: ({ c }) => <svg className={c||'w-4 h-4'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 9l-7 7-7-7"/></svg>,
  Shield:      ({ c }) => <svg className={c||'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Star:        ({ c }) => <svg className={c||'w-4 h-4'} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Grid:        ({ c }) => <svg className={c||'w-4 h-4'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  List:        ({ c }) => <svg className={c||'w-4 h-4'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Package:     ({ c }) => <svg className={c||'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
};

// ─── Data maps ─────────────────────────────────────────────────────────────────
const categoryIconMap = {
  all: Icon.All, printers: Icon.Printer, scanners: Icon.Scanner,
  computing: Icon.Mobile, pos: Icon.POS, rfid: Icon.RFID, consumables: Icon.Label,
};

const categoryColors = {
  printers: '#06a3da', scanners: '#214177', computing: '#0f766e',
  pos: '#7c3aed', rfid: '#dc2626', consumables: '#d97706',
};

const brandColors = {
  Zebra: '#0073cf', Honeywell: '#ee2e31', Datalogic: '#00803c', Epson: '#00417e',
  Posiflex: '#7c3aed', Newland: '#e65c00', Cryptware: '#06a3da',
  TSC: '#6d28d9', Godex: '#0f766e', Citizen: '#374151', Impinj: '#9333ea',
};

const subcategoryNames = {
  printers: 'Barcode Printers', scanners: 'Barcode Scanners', pos: 'POS Systems',
  computing: 'Mobile Computers', rfid: 'RFID Systems', consumables: 'Labels, Tags & Ribbons',
};

// ─── Main sidebar categories ────────────────────────────────────────────────────
const sidebarCategories = [
  { id: 'all', label: 'All Hardware' },
  { id: 'printers', label: 'Barcode Printers' },
  { id: 'scanners', label: 'Barcode Scanners' },
  { id: 'computing', label: 'Mobile Computers' },
  { id: 'pos', label: 'POS Systems' },
  { id: 'rfid', label: 'RFID Systems' },
  { id: 'consumables', label: 'Labels & Tags' },
];

// ─── Subcategory filters per category (from user spec) ─────────────────────────
const subcategoryFilters = {
  printers: ['Mobile Printers', 'Desktop Printers', 'Industrial Printers', 'Enterprise Printers'],
  scanners: [
    'Handheld Scanners', 'Rugged Scanners', 'Hands-Free / Countertop', 'Presentation Scanners',
    'Fixed-Mount / Embedded', 'Wearable Scanners', 'Industrial Stationary', 'Mobile Computing Devices',
    'Laser Marking', 'OEM Reader Modules', 'Industrial Cameras', 'Code Readers', 'Pocket Scanners',
  ],
  computing: ['Handheld Devices', 'Tablets', 'Wearable Computers', 'Vehicle-Mount Computers', 'Healthcare Mobile'],
  pos: ['Countertop Terminals', 'Mobile POS (mPOS)', 'Self-Service Kiosks', 'Integrated POS + Scanners', 'RFID-Enabled POS', 'Receipt Printers', 'Cash Drawers', 'Billing Rolls'],
  rfid: ['Fixed RFID Readers', 'Handheld RFID Readers', 'RFID Antennas', 'RFID Printers & Encoders', 'UHF RFID Tags & Labels'],
  consumables: ['Plain Labels', 'Colored Labels', 'Polyester Labels', 'Specialty Labels', 'Food-Safe Labels', 'Medical Labels', 'Security Labels', 'Jewelry Tags', 'Product Labels', 'Thermal Ribbons'],
};

// ─── Industry filter options ────────────────────────────────────────────────────
const industryOptions = [
  'Retail', 'Healthcare', 'Manufacturing', 'Hospitality', 'Warehousing & Distribution', 'Transportation & Logistics',
];

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ item, onClose, onInquiry }) {
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (panelRef.current && overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(panelRef.current, { x: '100%' }, { x: '0%', duration: 0.45, ease: 'power3.out' });
    }
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleClose = useCallback(() => {
    if (panelRef.current && overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.22, ease: 'power2.in' });
      gsap.to(panelRef.current, { x: '100%', duration: 0.38, ease: 'power3.in', onComplete: onClose });
    } else onClose();
  }, [onClose]);

  const catColor = categoryColors[item.subcategory] || '#06a3da';
  const brandColor = brandColors[item.brand] || '#06a3da';

  return createPortal(
    <div className="fixed inset-0 z-[200] flex">
      <div ref={overlayRef} onClick={handleClose} className="absolute inset-0 bg-black/55 backdrop-blur-sm opacity-0" />
      <div
        ref={panelRef}
        className="ml-auto relative w-full max-w-[640px] h-full bg-white shadow-[−40px_0_120px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-[0.62rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}30` }}>
              {subcategoryNames[item.subcategory] || item.subcategory}
            </span>
            {item.brand && (
              <span className="text-[0.62rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: `${brandColor}12`, color: brandColor, border: `1px solid ${brandColor}25` }}>
                {item.brand}
              </span>
            )}
          </div>
          <button onClick={handleClose} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <Icon.Close c="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Product image */}
          <div className="h-[280px] relative bg-gradient-to-br from-[#f8faff] to-white flex items-center justify-center border-b border-gray-100 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(6,163,218,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,163,218,1) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
            {!imgError ? (
              <img src={item.img} alt={item.title} className="max-h-[220px] max-w-[80%] object-contain drop-shadow-lg z-10 relative" onError={() => setImgError(true)} />
            ) : (
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center z-10" style={{ background: `${catColor}15` }}>
                <Icon.Package c="w-10 h-10" style={{ color: catColor }} />
              </div>
            )}
            {/* Category ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${catColor}, ${catColor}44)` }} />
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0b0f1e] leading-tight mb-3">{item.title}</h2>
              <p className="text-[#64748b] leading-relaxed text-sm">{item.description}</p>
            </div>

            {/* Models */}
            {item.models?.length > 0 && (
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Available Models</p>
                <div className="flex flex-wrap gap-2">
                  {item.models.map(model => (
                    <span key={model} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] text-[#374151]">{model}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Specs */}
            {item.specs?.length > 0 && (
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Technical Specifications</p>
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

            {/* Assurance block */}
            <div className="bg-gradient-to-br from-[#f8faff] to-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#06a3da]/10 flex items-center justify-center flex-shrink-0">
                  <Icon.Shield c="w-4 h-4 text-[#06a3da]" />
                </div>
                <div>
                  <h5 className="font-bold text-[#0b0f1e] text-sm mb-1">Cryptware Assurance</h5>
                  <p className="text-xs text-[#64748b] leading-relaxed">All hardware provisioning and deployments come with certified professional warranties, 10/5 support, and dedicated rollout training. We source only from authorized distributors.</p>
                </div>
              </div>
            </div>

            {/* Related */}
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[#94a3b8] mb-3">You May Also Like</p>
              <div className="flex flex-wrap gap-2">
                {catalogData.filter(p => p.type === 'hardware' && p.subcategory === item.subcategory && p.id !== item.id).slice(0, 4).map(r => (
                  <span key={r.id} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-[#475569] hover:border-[#06a3da]/40 hover:text-[#06a3da] cursor-pointer transition-colors">{r.title}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex gap-3">
          <button onClick={handleClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-[#64748b] font-bold text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors">Close</button>
          <button
            onClick={() => onInquiry(item)}
            className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${catColor}, ${catColor}cc)` }}
          >
            Get Quote
            <Icon.ArrowRight c="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item, onOpen, viewMode = 'grid' }) {
  const [imgError, setImgError] = useState(false);
  const catColor = categoryColors[item.subcategory] || '#06a3da';
  const brandColor = brandColors[item.brand] || '#64748b';

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onOpen(item)}
        className="group bg-white rounded-2xl border border-gray-200/70 overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_10px_30px_rgba(6,163,218,0.1)] hover:border-[#06a3da]/20 transition-all duration-300 flex gap-4 p-4"
      >
        <div className="w-[100px] h-[100px] bg-gradient-to-br from-[#f8faff] to-white rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 overflow-hidden">
          {!imgError && item.img ? (
            <img src={item.img} alt={item.title} className="w-full h-full object-cover" onError={() => setImgError(true)} />
          ) : (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${catColor}15` }}>
              <Icon.Package c="w-5 h-5" style={{ color: catColor }} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="font-bold text-[#0b0f1e] text-sm leading-tight group-hover:text-[#06a3da] transition-colors">{item.title}</h3>
            <span className="text-[0.58rem] font-bold px-2 py-0.5 rounded-md flex-shrink-0" style={{ background: `${catColor}12`, color: catColor }}>{item.brand}</span>
          </div>
          <p className="text-[#64748b] text-xs leading-relaxed line-clamp-2 mb-2">{item.description}</p>
          {item.models?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.models.slice(0, 3).map(m => (
                <span key={m} className="text-[0.6rem] px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#475569] font-medium border border-[#e2e8f0]">{m}</span>
              ))}
              {item.models.length > 3 && <span className="text-[0.6rem] px-2 py-0.5 rounded-md font-bold border" style={{ background: `${catColor}8`, color: catColor, borderColor: `${catColor}20` }}>+{item.models.length - 3}</span>}
            </div>
          )}
        </div>
        <div className="flex items-center flex-shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5" style={{ background: `${catColor}12`, color: catColor }}>
            <Icon.ArrowRight c="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onOpen(item)}
      className="group bg-white rounded-2xl border border-gray-200/70 overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_50px_rgba(6,163,218,0.12)] hover:-translate-y-2 transition-all duration-[400ms] ease-out flex flex-col"
    >
      {/* Image */}
      <div className="relative h-[200px] bg-gradient-to-br from-[#f8faff] via-white to-[#f0f7ff] flex items-center justify-center overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize: '20px 20px' }} />

        {!imgError && item.img ? (
          <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500" onError={() => setImgError(true)} />
        ) : (
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: `${catColor}15` }}>
            <Icon.Package c="w-10 h-10" style={{ color: catColor }} />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[0.58rem] font-bold uppercase tracking-widest px-2 py-1 rounded-md backdrop-blur-sm" style={{ background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}25` }}>
            {subcategoryNames[item.subcategory] || item.subcategory}
          </span>
        </div>

        {/* Brand bottom-right */}
        {item.brand && (
          <span className="absolute bottom-3 right-3 text-[0.56rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm bg-white/85 border border-gray-200" style={{ color: brandColor }}>
            {item.brand}
          </span>
        )}

        {/* Color accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, ${catColor}, transparent)` }} />
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-[#0b0f1e] text-[0.95rem] leading-tight mb-2 group-hover:text-[#06a3da] transition-colors">{item.title}</h3>
        <p className="text-[#64748b] text-xs leading-relaxed line-clamp-2 flex-1">{item.description}</p>

        {item.models?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {item.models.slice(0, 2).map(m => (
              <span key={m} className="text-[0.6rem] px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#475569] font-medium border border-[#e2e8f0]">{m}</span>
            ))}
            {item.models.length > 2 && (
              <span className="text-[0.6rem] px-2 py-0.5 rounded-md font-bold border" style={{ background: `${catColor}8`, color: catColor, borderColor: `${catColor}20` }}>+{item.models.length - 2}</span>
            )}
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-end">
          <span className="flex items-center gap-1 text-[0.7rem] font-bold uppercase group-hover:gap-2 transition-all" style={{ color: catColor }}>
            Details
            <Icon.ArrowRight c="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Collapsible Sidebar Section ───────────────────────────────────────────────
function SidebarSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors"
      >
        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#94a3b8]">{title}</span>
        <Icon.ChevronDown c={`w-3.5 h-3.5 text-[#94a3b8] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
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
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Hardware Products – Cryptware Infotech Solutions';
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSelectedBrands([]);
    setSelectedSubtypes([]);
    setVisibleCount(12);
    if (cat === 'all') searchParams.delete('category');
    else searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  const hardwareItems = useMemo(() => catalogData.filter(i => i.type === 'hardware'), []);

  const availableBrands = useMemo(() => {
    const brandCount = {};
    hardwareItems.forEach(item => {
      if (activeCategory !== 'all' && item.subcategory !== activeCategory) return;
      const brand = item.brand || 'Cryptware';
      brandCount[brand] = (brandCount[brand] || 0) + 1;
    });
    return Object.entries(brandCount).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  }, [hardwareItems, activeCategory]);

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
    else items = [...items].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return items;
  }, [hardwareItems, activeCategory, searchQuery, selectedBrands, sortBy]);

  const displayedItems = filteredItems.slice(0, visibleCount);

  const handleInquiry = (item) => {
    setSelectedItem(null);
    alert(`Thank you for your interest in "${item.title}"!\n\nPlease visit our Contact section or call us to request a detailed quote.`);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setVisibleCount(12);
  };

  const toggleSubtype = (s) => {
    setSelectedSubtypes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    setVisibleCount(12);
  };

  const toggleIndustry = (ind) => {
    setSelectedIndustries(prev => prev.includes(ind) ? prev.filter(x => x !== ind) : [...prev, ind]);
    setVisibleCount(12);
  };

  const clearAll = () => { setSelectedBrands([]); setSelectedSubtypes([]); setSelectedIndustries([]); setSearchQuery(''); setActiveCategory('all'); setVisibleCount(12); };

  const totalCount = hardwareItems.length;
  const catColor = activeCategory !== 'all' ? (categoryColors[activeCategory] || '#06a3da') : '#06a3da';
  const activeSubtypeList = activeCategory !== 'all' ? (subcategoryFilters[activeCategory] || []) : [];
  const totalActiveFilters = selectedBrands.length + selectedSubtypes.length + selectedIndustries.length + (activeCategory !== 'all' ? 1 : 0);

  // ── Sidebar JSX (shared for desktop + mobile) ──────────────────────────────
  const SidebarContent = ({ onClose }) => (
    <div className="space-y-3">
      {/* Category filter */}
      <SidebarSection title="Product Categories">
        <div className="space-y-0.5">
          {sidebarCategories.map(cat => {
            const CatIcon = categoryIconMap[cat.id] || Icon.Package;
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all' ? hardwareItems.length : hardwareItems.filter(i => i.subcategory === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => { handleCategoryChange(cat.id); onClose?.(); }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'text-white shadow-sm' : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0b0f1e]'}`}
                style={isActive ? { background: `linear-gradient(135deg, ${catColor}, ${catColor}cc)` } : {}}
              >
                <span className="flex items-center gap-2.5">
                  <CatIcon c="w-4 h-4" />
                  <span>{cat.label}</span>
                </span>
                <span className={`text-[0.62rem] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#94a3b8]'}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </SidebarSection>

      {/* Sub-type filter — only when a category is selected */}
      {activeSubtypeList.length > 0 && (
        <SidebarSection title={`${subcategoryNames[activeCategory] || 'Category'} Types`} defaultOpen={true}>
          <div className="space-y-0.5">
            {activeSubtypeList.map(s => {
              const isChecked = selectedSubtypes.includes(s);
              return (
                <label key={s} onClick={() => toggleSubtype(s)} className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer hover:bg-[#f8faff] transition-colors group">
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${isChecked ? 'border-transparent' : 'border-gray-300 group-hover:border-gray-400'}`}
                    style={isChecked ? { background: catColor, borderColor: catColor } : {}}
                  >
                    {isChecked && <Icon.Check c="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className="text-xs font-semibold" style={isChecked ? { color: catColor } : { color: '#374151' }}>{s}</span>
                </label>
              );
            })}
          </div>
          {selectedSubtypes.length > 0 && (
            <button onClick={() => setSelectedSubtypes([])} className="mt-2 text-[0.62rem] font-bold text-[#06a3da] hover:text-[#0591c4]">Clear types</button>
          )}
        </SidebarSection>
      )}

      {/* Brand filter */}
      <SidebarSection title="Filter by Brand">
        <div className="space-y-0.5 max-h-[250px] overflow-y-auto pr-0.5">
          {availableBrands.map(({ name, count }) => {
            const isChecked = selectedBrands.includes(name);
            const bc = brandColors[name] || '#64748b';
            return (
              <label key={name} onClick={() => toggleBrand(name)} className="flex items-center justify-between gap-2 px-2 py-2 rounded-lg cursor-pointer hover:bg-[#f8faff] transition-colors group">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${isChecked ? 'border-transparent' : 'border-gray-300 group-hover:border-gray-400'}`}
                    style={isChecked ? { background: bc, borderColor: bc } : {}}
                  >
                    {isChecked && <Icon.Check c="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className="text-xs font-semibold" style={isChecked ? { color: bc } : { color: '#374151' }}>{name}</span>
                </div>
                <span className="text-[0.6rem] text-[#94a3b8] font-bold bg-[#f1f5f9] px-1.5 py-0.5 rounded-full">{count}</span>
              </label>
            );
          })}
        </div>
        {selectedBrands.length > 0 && (
          <button onClick={() => setSelectedBrands([])} className="mt-2 text-[0.62rem] font-bold text-[#06a3da] hover:text-[#0591c4]">Clear brands</button>
        )}
      </SidebarSection>

      {/* Industry filter */}
      <SidebarSection title="Industry" defaultOpen={false}>
        <div className="space-y-0.5">
          {industryOptions.map(ind => {
            const isChecked = selectedIndustries.includes(ind);
            return (
              <label key={ind} onClick={() => toggleIndustry(ind)} className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer hover:bg-[#f8faff] transition-colors group">
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${isChecked ? 'border-transparent' : 'border-gray-300 group-hover:border-gray-400'}`}
                  style={isChecked ? { background: '#06a3da', borderColor: '#06a3da' } : {}}
                >
                  {isChecked && <Icon.Check c="w-2.5 h-2.5 text-white" />}
                </div>
                <span className={`text-xs font-semibold ${isChecked ? 'text-[#06a3da]' : 'text-[#374151]'}`}>{ind}</span>
              </label>
            );
          })}
        </div>
        {selectedIndustries.length > 0 && (
          <button onClick={() => setSelectedIndustries([])} className="mt-2 text-[0.62rem] font-bold text-[#06a3da] hover:text-[#0591c4]">Clear industries</button>
        )}
      </SidebarSection>

      {/* CTA widget */}
      <div className="bg-gradient-to-br from-[#06a3da] to-[#214177] rounded-2xl p-5 text-white">
        <div className="flex items-start gap-2.5 mb-3">
          <Icon.Shield c="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-sm mb-0.5">Need a Custom Quote?</p>
            <p className="text-white/65 text-xs leading-relaxed">Contact our specialists for bulk pricing, demo units &amp; rollout support.</p>
          </div>
        </div>
        <Link to="/#contact-us" className="block w-full py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all duration-200">
          Get in Touch
        </Link>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#f8faff] font-sans text-[#1a1a2e] overflow-x-hidden">
      <CustomCursor />
      <Navbar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} variant="hardware" />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} variant="hardware" />

      {/* ── TOP HEADER ─────────────────────────────────────────────────────────── */}
      <div className="pt-[72px] bg-[#0b0f1e] border-b border-white/[0.05]">
        <div className="w-[92%] max-w-[1280px] mx-auto py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/35 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/hardware" className="hover:text-white transition-colors">Hardware</Link>
            <span>/</span>
            <span className="text-white/65">Products</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {activeCategory === 'all' ? 'All Hardware Products' : subcategoryNames[activeCategory] || activeCategory}
              </h1>
              <p className="text-white/45 mt-2 text-sm">
                {filteredItems.length} products · Authorized distributors · GST invoicing available
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8">
              {[
                { label: 'Total Products', value: totalCount + '+' },
                { label: 'Brands', value: availableBrands.length },
                { label: 'Categories', value: 6 },
              ].map(stat => (
                <div key={stat.label} className="text-right">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-[0.65rem] text-white/35 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ─────────────────────────────────────────────────────────── */}
      <div className="w-[92%] max-w-[1280px] mx-auto py-10">
        <div className="flex gap-8">

          {/* ── SIDEBAR ──────────────────────────────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col w-[272px] flex-shrink-0 gap-3">
            <SidebarContent />
          </aside>

          {/* ── PRODUCT GRID ─────────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Search + Sort + View bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Icon.Search c="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setVisibleCount(12); }}
                  placeholder="Search products, brands, models..."
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#0b0f1e] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#06a3da] focus:ring-2 focus:ring-[#06a3da]/10 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0b0f1e]">
                    <Icon.Close c="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#374151] font-semibold focus:outline-none focus:border-[#06a3da] shadow-sm cursor-pointer"
              >
                <option value="default">Sort: Featured First</option>
                <option value="alpha">Sort: A → Z</option>
                <option value="alpha-desc">Sort: Z → A</option>
                <option value="brand">Sort: By Brand</option>
              </select>

              {/* View mode toggles */}
              <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm gap-0.5">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#0b0f1e] text-white' : 'text-[#64748b] hover:text-[#0b0f1e]'}`}>
                  <Icon.Grid c="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#0b0f1e] text-white' : 'text-[#64748b] hover:text-[#0b0f1e]'}`}>
                  <Icon.List c="w-4 h-4" />
                </button>
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-[#374151] shadow-sm"
              >
                <Icon.Filter c="w-4 h-4" />
                Filters
                {totalActiveFilters > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#06a3da] text-white text-[0.6rem] font-bold flex items-center justify-center">
                    {totalActiveFilters}
                  </span>
                )}
              </button>
            </div>

            {/* Active filter chips */}
            {(activeCategory !== 'all' || selectedBrands.length > 0 || selectedSubtypes.length > 0 || selectedIndustries.length > 0 || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activeCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06a3da]/10 text-[#06a3da] text-[0.68rem] font-bold uppercase tracking-wider border border-[#06a3da]/20">
                    {subcategoryNames[activeCategory]}
                    <button onClick={() => handleCategoryChange('all')}><Icon.Close c="w-3 h-3" /></button>
                  </span>
                )}
                {selectedBrands.map(brand => (
                  <span key={brand} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#214177]/10 text-[#214177] text-[0.68rem] font-bold uppercase tracking-wider border border-[#214177]/20">
                    {brand}<button onClick={() => toggleBrand(brand)}><Icon.Close c="w-3 h-3" /></button>
                  </span>
                ))}
                {selectedSubtypes.map(s => (
                  <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.68rem] font-bold uppercase tracking-wider border" style={{ background: `${catColor}10`, color: catColor, borderColor: `${catColor}20` }}>
                    {s}<button onClick={() => toggleSubtype(s)}><Icon.Close c="w-3 h-3" /></button>
                  </span>
                ))}
                {selectedIndustries.map(ind => (
                  <span key={ind} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[0.68rem] font-bold uppercase tracking-wider border border-emerald-200">
                    {ind}<button onClick={() => toggleIndustry(ind)}><Icon.Close c="w-3 h-3" /></button>
                  </span>
                ))}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f1f5f9] text-[#475569] text-[0.68rem] font-bold border border-[#e2e8f0]">
                    "{searchQuery}"<button onClick={() => setSearchQuery('')}><Icon.Close c="w-3 h-3" /></button>
                  </span>
                )}
                <button onClick={clearAll} className="text-[0.68rem] font-bold text-red-500 hover:text-red-600 px-2 py-1.5">Clear All</button>
              </div>
            )}

            {/* Result summary + per-page */}
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

            {/* Grid / List */}
            {displayedItems.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
                <div className="w-16 h-16 rounded-2xl bg-[#f1f5f9] flex items-center justify-center mx-auto mb-4">
                  <Icon.Package c="w-8 h-8 text-[#94a3b8]" />
                </div>
                <h3 className="font-bold text-[#0b0f1e] text-lg mb-2">No products found</h3>
                <p className="text-[#64748b] text-sm mb-6">Try adjusting your filters or search query.</p>
                <button onClick={clearAll} className="px-6 py-2.5 rounded-xl bg-[#06a3da] text-white text-sm font-bold hover:bg-[#0591c4] transition-colors">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-3'}>
                  {displayedItems.map((item, idx) => (
                    <ProductCard key={item.id} item={item} index={idx} onOpen={setSelectedItem} viewMode={viewMode} />
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
                      <Icon.ChevronDown c="w-4 h-4" />
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
          <div className="relative ml-auto w-[300px] h-full bg-[#f8faff] shadow-2xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Icon.Filter c="w-4 h-4 text-[#0b0f1e]" />
                <h3 className="font-bold text-[#0b0f1e]">Filters</h3>
                {totalActiveFilters > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#06a3da] text-white text-[0.6rem] font-bold flex items-center justify-center">{totalActiveFilters}</span>
                )}
              </div>
              <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon.Close c="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-4">
              <SidebarContent onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── DETAIL PANEL ─────────────────────────────────────────────────────── */}
      {selectedItem && (
        <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} onInquiry={handleInquiry} />
      )}

      <Footer />
      <FloatingChat />
    </div>
  );
}
