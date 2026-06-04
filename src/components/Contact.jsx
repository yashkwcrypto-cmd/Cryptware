import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ initialMessage }) {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setFormData(p => ({ ...p, message: initialMessage }));
    }
  }, [initialMessage]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-fade-up',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.06, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="contact-us" className="py-20 md:py-32 bg-paper-2">
      <div className="w-[92%] max-w-[1280px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="contact-fade-up block text-brand tracking-[0.16em] uppercase text-[0.72rem] font-semibold mb-4">
            Get In Touch
          </span>
          <h2 className="contact-fade-up font-serif text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.12] text-ink font-normal">
            Let's build something <em className="text-ink-3 not-italic">great together</em>
          </h2>
          <p className="contact-fade-up text-ink-3 text-[0.95rem] max-w-[480px] mx-auto mt-4 leading-relaxed">
            Have a project in mind? We'd love to hear about it. Drop us a message or give us a call — we usually respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT: Contact Info + Map */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Info Cards */}
            <div className="contact-fade-up flex flex-col gap-4">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5 stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  label: 'Office Address',
                  value: 'B-610, Titanium City Centre, 100ft Anandnagar Rd, Satellite, Ahmedabad, Gujarat — 380015',
                },
                {
                  icon: (
                    <svg className="w-5 h-5 stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                    </svg>
                  ),
                  label: 'Phone',
                  value: '+91 7490971996',
                  href: 'tel:+917490971996',
                },
                {
                  icon: (
                    <svg className="w-5 h-5 stroke-brand" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'info@cryptwareinfotech.com',
                  href: 'mailto:info@cryptwareinfotech.com',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 bg-paper rounded-xl border border-paper-3/30 hover:shadow-[0_8px_30px_rgba(11,11,15,0.025)] transition-all duration-300 group">
                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-brand-light flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[0.7rem] tracking-widest uppercase text-brand font-semibold mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[0.875rem] text-ink hover:text-brand transition-colors leading-relaxed font-medium">{item.value}</a>
                    ) : (
                      <p className="text-[0.875rem] text-ink-2 leading-relaxed">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="contact-fade-up rounded-2xl overflow-hidden border border-paper-3/30 h-[220px] bg-paper-2 relative">
              <iframe
                title="Cryptware Infotech Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.996085524682!2d72.52981767506395!3d23.007800279177766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f34965ecd5%3A0x4d0c3892e26c9c48!2sTitanium%20City%20Centre%2C%20Ahmedabad!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7 contact-fade-up">
            <div className="bg-paper rounded-2xl border border-paper-3/30 p-8 md:p-10 shadow-[0_4px_30px_rgba(11,11,15,0.02)]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 stroke-brand" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-ink">Message sent!</h3>
                  <p className="text-ink-3 text-[0.9rem] max-w-[320px] leading-relaxed">Thanks for reaching out. Our team will get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                    className="mt-2 text-[0.875rem] text-brand hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <h3 className="font-serif text-[1.5rem] text-ink font-normal mb-2">Send us a message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.72rem] tracking-widest uppercase text-ink-3 font-semibold">Your Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="John Doe"
                        className="bg-paper-2 border border-paper-3 rounded-xl px-4 py-3 text-[0.9rem] text-ink placeholder:text-ink-3/50 focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand/20 transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.72rem] tracking-widest uppercase text-ink-3 font-semibold">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="john@company.com"
                        className="bg-paper-2 border border-paper-3 rounded-xl px-4 py-3 text-[0.9rem] text-ink placeholder:text-ink-3/50 focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[0.72rem] tracking-widest uppercase text-ink-3 font-semibold">Your Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Tell us about your project, goals, or anything you'd like us to know..."
                      className="bg-paper-2 border border-paper-3 rounded-xl px-4 py-3 text-[0.9rem] text-ink placeholder:text-ink-3/50 focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="self-start inline-flex text-[0.9rem] font-semibold px-8 py-3.5 bg-brand text-white rounded-full transition-all duration-300 ease-out hover:bg-brand/90 hover:scale-[1.05] hover:shadow-[0_8px_20px_-6px_rgba(6,163,218,0.5)] items-center justify-center gap-2"
                  >
                    Send Message
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
