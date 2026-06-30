import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isHardwarePage = location.pathname.startsWith('/hardware');

  // Build a hash link that works from any route
  // If we're already on the home page, use just the hash; otherwise prefix with /
  const homeHash = (hash) => isHardwarePage ? `/${hash}` : hash;

  return (
    <footer className="bg-ink text-white py-16 border-t border-white/5 rounded-t-[42px] mt-[10px]">
      <div className="w-[92%] max-w-[1280px] mx-auto">
        {/* FOOTER NAV BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pt-4 pb-8 border-b border-white/5">
          <Link to="/" className="inline-block">
            <img
              src="/assets/img/logo-removebg-preview.png"
              alt="Cryptware Infotech Solutions LLP Logo"
              className="h-[50px] md:h-[60px] w-auto object-contain"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 mb-12">
          {/* BRAND COLUMN */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <p className="text-[0.9rem] text-white/50 leading-relaxed max-w-[320px]">
              India's trusted web, enterprise software &amp; mobile app development company. Innovation in our veins, passion in our hearts.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a href="https://wa.me/+917490971996" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all">
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/cryptware-infotech/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all">
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all">
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all">
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2 — Company */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-semibold text-[0.95rem] tracking-wide text-white uppercase">Company</h4>
            <div className="flex flex-col gap-3 text-[0.875rem] text-white/50">
              <a href={homeHash('#about')} className="hover:text-blue-400 hover:translate-x-1 transition-all">About Us</a>
              <a href={homeHash('#services')} className="hover:text-blue-400 hover:translate-x-1 transition-all">Services</a>
              <a href={homeHash('#beliefs')} className="hover:text-blue-400 hover:translate-x-1 transition-all">Our Values</a>
              <a href={homeHash('#tech')} className="hover:text-blue-400 hover:translate-x-1 transition-all">Tech Stack</a>
            </div>
          </div>

          {/* COLUMN 3 — Software */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <a href={homeHash('#hero')} className="font-semibold text-[0.95rem] tracking-wide text-white uppercase hover:text-blue-400 transition-colors">
              Software
            </a>
            <div className="flex flex-col gap-3 text-[0.875rem] text-white/50">
              <Link to="/" className="hover:text-blue-400 hover:translate-x-1 transition-all">Web Development</Link>
              <Link to="/" className="hover:text-blue-400 hover:translate-x-1 transition-all">Mobile Apps</Link>
              <Link to="/" className="hover:text-blue-400 hover:translate-x-1 transition-all">UI/UX Design</Link>
              <Link to="/" className="hover:text-blue-400 hover:translate-x-1 transition-all">Hire Developers</Link>
            </div>
          </div>

          {/* COLUMN 4 — Total IT Solutions */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <a href="/hardware#hero" className="font-semibold text-[0.95rem] tracking-wide text-white uppercase hover:text-blue-400 transition-colors">
              Total IT Solutions
            </a>
            <div className="flex flex-col gap-3 text-[0.875rem] text-white/50">
              <Link to="/hardware/product?category=printers" className="hover:text-blue-400 hover:translate-x-1 transition-all">
                Barcode Printer
              </Link>
              <Link to="/hardware/product?category=scanners" className="hover:text-blue-400 hover:translate-x-1 transition-all">
                Barcode Scanner
              </Link>
              <Link to="/hardware/product?category=computing" className="hover:text-blue-400 hover:translate-x-1 transition-all">
                Mobile Computer
              </Link>
              <Link to="/hardware/product?category=consumables" className="hover:text-blue-400 hover:translate-x-1 transition-all">
                Label Ribbons and Tags
              </Link>
              <Link to="/hardware/product?category=pos" className="hover:text-blue-400 hover:translate-x-1 transition-all">
                POS Systems
              </Link>
              <Link to="/hardware/product?category=rfid" className="hover:text-blue-400 hover:translate-x-1 transition-all">
                RFID Solutions
              </Link>
            </div>
          </div>

          {/* COLUMN 5 — Contact */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-semibold text-[0.95rem] tracking-wide text-white uppercase">Contact</h4>
            <div className="flex flex-col gap-3 text-[0.875rem] text-white/50 leading-relaxed">
              <a href="tel:+917490971996" className="hover:text-white transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +91 7490971996
              </a>
              <a href="mailto:info@cryptwareinfotech.com" className="hover:text-white transition-colors flex items-center gap-2 break-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                info@cryptwareinfotech.com
              </a>
              <p className="mt-2 text-white/40 border-t border-white/10 pt-3">
                B-610, Titanium City Centre,<br />
                100ft Anandnagar Rd, Satellite,<br />
                Ahmedabad — 380015
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM LAYER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[0.825rem] text-white/30">
          <p>© {new Date().getFullYear()} Cryptware Infotech Solutions LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href={homeHash('#contact-us')} className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
