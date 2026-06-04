import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-ink text-white py-16 border-t border-white/5">
      <div className="w-[92%] max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-[0.7rem] font-serif text-[1.4rem] tracking-tight text-white">
              <div className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-lg shadow-brand/20">
                <svg className="w-[20px] h-[20px] stroke-white stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                  <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-bold tracking-tight">Cryptware</span>
            </div>
            <p className="text-[0.9rem] text-white/50 leading-relaxed max-w-[360px]">
              India's trusted web, enterprise software &amp; mobile app development company. Innovation in our veins, passion in our hearts.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://wa.me/+917490971996"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:scale-105 transition-all"
              >
                <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/cryptware-infotech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:scale-105 transition-all"
              >
                <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:scale-105 transition-all"
              >
                <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:scale-105 transition-all"
              >
                <svg className="w-[18px] h-[18px] stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-medium text-[0.95rem] tracking-wide text-white">Company</h4>
            <div className="flex flex-col gap-2.5 text-[0.875rem] text-white/40">
              <a href="#about" className="hover:text-white transition-colors">About Us</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#beliefs" className="hover:text-white transition-colors">Our Values</a>
              <a href="#tech" className="hover:text-white transition-colors">Tech Stack</a>
            </div>
          </div>

          {/* COLUMN 3 */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-medium text-[0.95rem] tracking-wide text-white">Services</h4>
            <div className="flex flex-col gap-2.5 text-[0.875rem] text-white/40">
              <a href="#services" className="hover:text-white transition-colors">Web Development</a>
              <a href="#services" className="hover:text-white transition-colors">Mobile Apps</a>
              <a href="#services" className="hover:text-white transition-colors">UI/UX Design</a>
              <a href="#hire" className="hover:text-white transition-colors">Hire Developers</a>
            </div>
          </div>

          {/* COLUMN 4 */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-medium text-[0.95rem] tracking-wide text-white">Contact</h4>
            <div className="flex flex-col gap-2.5 text-[0.875rem] text-white/40 leading-relaxed">
              <p className="hover:text-white transition-colors">+91 7490971996</p>
              <p className="hover:text-white transition-colors">info@cryptwareinfotech.com</p>
              <p className="mt-2 text-white/30 border-t border-white/5 pt-2">
                B-610, Titanium City Centre,<br />
                100ft Anandnagar Rd, Satellite,<br />
                Ahmedabad — 380015
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM LAYER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[0.825rem] text-white/30">
          <p>© {new Date().getFullYear()} Cryptware Infotech. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#contact-us" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
