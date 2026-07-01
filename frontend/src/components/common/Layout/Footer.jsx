import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isHardwarePage = location.pathname.startsWith("/hardware");

  // Build a hash link that works from any route
  // If we're already on the home page, use just the hash; otherwise prefix with /
  const homeHash = (hash) => (isHardwarePage ? `/${hash}` : hash);

  // On hardware pages, company anchor links should go back to the main homepage sections.
  const companyHash = (hash) => (isHardwarePage ? `/${hash}` : hash);

  const [showCareerModal, setShowCareerModal] = useState(false);
  const [careerForm, setCareerForm] = useState({ name: "", email: "", contact: "", experience: "", currentRole: "", linkedin: "", message: "" });
  const [cvFile, setCvFile] = useState(null);

  const handleSoftwareLinkClick = (e, path = "/") => {
    if (isHardwarePage) {
      e.preventDefault();
      window.open(path, "_blank");
    } else {
      e.preventDefault();
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleHardwareLinkClick = (e, path = "/hardware") => {
    if (!isHardwarePage) {
      e.preventDefault();
      window.open(path, "_blank");
    } else {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHardwareCategoryClick = (e, catId) => {
    if (!isHardwarePage) {
      e.preventDefault();
      window.open(`/hardware#${catId}`, "_blank");
    } else {
      e.preventDefault();
      const target = document.getElementById(catId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCareerChange = (field, value) => {
    setCareerForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCareerSubmit = (event) => {
    event.preventDefault();
    const { name, email, contact, experience, currentRole, linkedin, message } = careerForm;
    const bodyLines = [
      `Name: ${name || "N/A"}`,
      `Email: ${email || "N/A"}`,
      `Contact: ${contact || "N/A"}`,
      `Current Role: ${currentRole || "N/A"}`,
      `Experience: ${experience || "N/A"}`,
      linkedin ? `LinkedIn: ${linkedin}` : null,
      `\nMessage:\n${message || "I am interested in applying for a career opportunity at Cryptware."}`,
      cvFile
        ? `\nCV File: ${cvFile.name} (please attach manually in Gmail)`
        : "\nCV File: not attached. Please attach the CV manually in Gmail.",
      "\n\nPlease review my application and let me know the next steps.",
    ].filter(Boolean);

    const subject = encodeURIComponent("Career Application - Cryptware Infotech Solutions LLP");
    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hr@cryptwareinfotech.com&su=${subject}&body=${body}`;

    window.open(mailUrl, "_blank");
    setShowCareerModal(false);
  };

  const handleCvChange = (event) => {
    setCvFile(event.target.files?.[0] || null);
  };

  return (
    <footer className="bg-ink text-white py-16 border-t border-white/5 rounded-t-[42px] mt-[10px]">
      <div className="w-[92%] max-w-[1280px] mx-auto">
        {/* FOOTER NAV BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pt-4 pb-8 border-b border-white/5">
          <Link
            to="/"
            onClick={(e) => {
              if (isHardwarePage) {
                e.preventDefault();
                window.open("/", "_blank");
              }
            }}
            className="inline-block"
          >
            <img
              src="/assets/img/logo-removebg-preview.png"
              alt="Cryptware Infotech Solutions LLP Logo"
              className="h-[50px] md:h-[60px] w-auto object-contain"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12 text-white/80">
          <div className="space-y-5 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <p className="text-xl font-semibold text-white">Cryptware Infotech</p>
            <p className="max-w-[320px] leading-relaxed text-white/60">
              Enterprise web, mobile app and software development delivered with precision and trust.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/+917490971996" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/15 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg>
              </a>
              <a href="https://in.linkedin.com/company/cryptware-infotech" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/15 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="https://www.instagram.com/cryptwareinfotech_com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/15 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.facebook.com/people/Cryptware-Infotech/61576912494566/#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/15 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-semibold uppercase tracking-[0.22em] text-white text-sm">Company</p>
            <div className="flex flex-col gap-3 text-white/70">
              <a
                href={companyHash("#about")}
                onClick={(e) => {
                  if (isHardwarePage) {
                    e.preventDefault();
                    window.open("/#about", "_blank");
                  }
                }}
                className="hover:text-white transition"
              >
                About Us
              </a>
              <a
                href={companyHash("#services")}
                onClick={(e) => {
                  if (isHardwarePage) {
                    e.preventDefault();
                    window.open("/#services", "_blank");
                  }
                }}
                className="hover:text-white transition"
              >
                Services
              </a>
              <a
                href={companyHash("#beliefs")}
                onClick={(e) => {
                  if (isHardwarePage) {
                    e.preventDefault();
                    window.open("/#beliefs", "_blank");
                  }
                }}
                className="hover:text-white transition"
              >
                Our Values
              </a>
              <a
                href={companyHash("#tech")}
                onClick={(e) => {
                  if (isHardwarePage) {
                    e.preventDefault();
                    window.open("/#tech", "_blank");
                  }
                }}
                className="hover:text-white transition"
              >
                Tech Stack
              </a>
              <button type="button" onClick={() => setShowCareerModal(true)} className="text-left text-white/70 hover:text-white transition underline-offset-2 hover:underline">
                Careers
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-semibold uppercase tracking-[0.22em] text-white text-sm">Services</p>
            <div className="flex flex-col gap-3 text-white/70">
              <Link
                to="/"
                onClick={(e) => handleSoftwareLinkClick(e, "/")}
                className="hover:text-white transition"
              >
                Web Development
              </Link>
              <Link
                to="/"
                onClick={(e) => handleSoftwareLinkClick(e, "/")}
                className="hover:text-white transition"
              >
                Mobile Apps
              </Link>
              <Link
                to="/"
                onClick={(e) => handleSoftwareLinkClick(e, "/")}
                className="hover:text-white transition"
              >
                UI/UX Design
              </Link>
              <Link
                to="/"
                onClick={(e) => handleSoftwareLinkClick(e, "/")}
                className="hover:text-white transition"
              >
                Hire Developers
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="/"
              onClick={(e) => handleSoftwareLinkClick(e, "/")}
              className="font-semibold uppercase tracking-[0.22em] text-white text-sm hover:text-brand transition block cursor-pointer"
            >
              Total IT Solution
            </a>
            <div className="flex flex-col gap-3 text-white/70">
              <a
                href="/hardware#printers"
                onClick={(e) => handleHardwareCategoryClick(e, "printers")}
                className="hover:text-white transition cursor-pointer"
              >
                Barcode Printers
              </a>
              <a
                href="/hardware#scanners"
                onClick={(e) => handleHardwareCategoryClick(e, "scanners")}
                className="hover:text-white transition cursor-pointer"
              >
                Barcode Scanners
              </a>
              <a
                href="/hardware#computing"
                onClick={(e) => handleHardwareCategoryClick(e, "computing")}
                className="hover:text-white transition cursor-pointer"
              >
                Mobile Computers
              </a>
              <a
                href="/hardware#pos"
                onClick={(e) => handleHardwareCategoryClick(e, "pos")}
                className="hover:text-white transition cursor-pointer"
              >
                POS Systems
              </a>
              <a
                href="/hardware#rfid"
                onClick={(e) => handleHardwareCategoryClick(e, "rfid")}
                className="hover:text-white transition cursor-pointer"
              >
                RFID Systems
              </a>
              <a
                href="/"
                onClick={(e) => handleSoftwareLinkClick(e, "/")}
                className="hover:text-white transition cursor-pointer"
              >
                Software Solutions
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-semibold uppercase tracking-[0.22em] text-white text-sm">Contact</p>
            <div className="space-y-3 text-white/70">
              <div>
                <p className="font-medium text-white/90">Phone</p>
                <a href="tel:+917490971996" className="hover:text-white transition">+91 7490971996</a>
              </div>
              <div>
                <p className="font-medium text-white/90">Email</p>
                <a href="mailto:info@cryptwareinfotech.com" className="hover:text-white transition break-all">info@cryptwareinfotech.com</a>
              </div>
              <div>
                <p className="font-medium text-white/90">Head Office</p>
                <p className="leading-relaxed text-white/60">
                  B-610, Titanium City Centre,<br />
                  100ft Anandnagar Rd, Satellite,<br />
                  Ahmedabad — 380015
                </p>
              </div>
              <div>
                <p className="font-medium text-white/90">Branch Office</p>
                <p className="leading-relaxed text-white/60">
                  C Yashwant Nagar No 2,<br />
                  Shell Colony Road, Chembur,<br />
                  Mumbai
                </p>
              </div>
            </div>
          </div>
        </div>

        {showCareerModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 px-4 py-8 sm:px-6">
            <div className="w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-y-auto rounded-3xl border border-white/10 bg-[#0f172a] text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="border-b border-white/10 bg-slate-900 px-6 py-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs tracking-[0.22em] uppercase text-white/60">Career Application</p>
                    <h2 className="mt-2 text-3xl font-semibold">Apply to Cryptware</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                      Complete the form below and we will create a professional Gmail draft with your application details.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCareerModal(false)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                    aria-label="Close career form"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <form onSubmit={handleCareerSubmit} className="space-y-6 px-6 py-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    Full Name*
                    <input
                      type="text"
                      value={careerForm.name}
                      onChange={(e) => handleCareerChange("name", e.target.value)}
                      required
                      className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                      placeholder="Jane Doe"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    Email Address*
                    <input
                      type="email"
                      value={careerForm.email}
                      onChange={(e) => handleCareerChange("email", e.target.value)}
                      required
                      className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                      placeholder="jane.doe@example.com"
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    Contact Number*
                    <input
                      type="tel"
                      value={careerForm.contact}
                      onChange={(e) => handleCareerChange("contact", e.target.value)}
                      required
                      className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                      placeholder="+91 12345 67890"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    Current Role
                    <input
                      type="text"
                      value={careerForm.currentRole}
                      onChange={(e) => handleCareerChange("currentRole", e.target.value)}
                      className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                      placeholder="Frontend Developer / Analyst"
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    Experience
                    <input
                      type="text"
                      value={careerForm.experience}
                      onChange={(e) => handleCareerChange("experience", e.target.value)}
                      className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                      placeholder="5+ years in product engineering"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    LinkedIn / Portfolio
                    <input
                      type="url"
                      value={careerForm.linkedin}
                      onChange={(e) => handleCareerChange("linkedin", e.target.value)}
                      className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                      placeholder="https://linkedin.com/in/yourname"
                    />
                  </label>
                </div>
                <div className="space-y-4">
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    Message
                    <textarea
                      value={careerForm.message}
                      onChange={(e) => handleCareerChange("message", e.target.value)}
                      rows={5}
                      className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                      placeholder="Share your strengths, career goals, and why Cryptware is the right fit."
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-white/70">
                    Upload CV
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvChange}
                      className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 file:text-black file:bg-white file:px-3 file:py-2 file:rounded-lg"
                    />
                    {cvFile && (
                      <span className="text-[0.82rem] text-white/50">Selected file: {cvFile.name}</span>
                    )}
                  </label>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-white/60">
                  <p className="font-medium text-white/80">Notice</p>
                  <p>
                    Your details will be inserted into a Gmail draft. Automatic CV attachment is not possible in the browser, so please attach your file manually before sending.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCareerModal(false)}
                    className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-h"
                  >
                    Open Gmail Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* BOTTOM LAYER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[0.825rem] text-white/30">
          <p>
            © {new Date().getFullYear()} Cryptware Infotech Solutions LLP. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a
              href={homeHash("#contact-us")}
              onClick={(e) => {
                if (isHardwarePage) {
                  e.preventDefault();
                  window.open("/#contact-us", "_blank");
                }
              }}
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
