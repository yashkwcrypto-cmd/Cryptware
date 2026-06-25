import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Send Message Modal — form only, white background ────────────────────────
function SendMessageModal({ onClose }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28 });
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 36, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.3)' }
    );
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    gsap.to(cardRef.current, { opacity: 0, y: 20, scale: 0.97, duration: 0.25 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setError(null);

    try {
      // Using FormSubmit.co - No API keys or .env required!
      // Note: The first time you submit this form, FormSubmit will send an activation link to yashkw.crypto@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/yashkw.crypto@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setError('An error occurred while sending your message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(11,11,15,0.82)', backdropFilter: 'blur(10px)' }}
      onClick={handleClose}
    >
      <div
        ref={cardRef}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.3)] w-full max-w-[560px] max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-paper-3/50 bg-paper/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p className="text-[0.7rem] tracking-widest uppercase text-brand font-bold leading-none mb-0.5">Cryptware Infotech Solutions LLP</p>
              <h3 className="font-serif text-[1.15rem] text-ink font-normal leading-tight">Send us a Message</h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-paper-2 hover:bg-paper-3/60 flex items-center justify-center text-ink-3 hover:text-ink transition-colors cursor-pointer"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body — form only, full width */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-7 md:p-9">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                <div className="w-20 h-20 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <svg className="w-9 h-9 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-ink mb-2">Message sent!</h3>
                  <p className="text-ink-3 text-[0.88rem] max-w-[280px] leading-relaxed">Our team will get back to you within 24 hours.</p>
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                    className="text-[0.82rem] text-brand hover:underline cursor-pointer"
                  >Send another</button>
                  <span className="text-ink-3/30">·</span>
                  <button onClick={handleClose} className="text-[0.82rem] text-ink-3 hover:text-ink cursor-pointer">Close</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="mb-1">
                  <h4 className="font-serif text-[1.35rem] text-ink font-normal mb-1">Your details</h4>
                  <p className="text-ink-3 text-[0.8rem]">We'll never share your information with anyone.</p>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-[0.82rem] leading-snug">
                    ⚠️ {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Your Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'john@company.com' },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key} className="flex flex-col gap-1.5">
                      <label className="text-[0.65rem] tracking-widest uppercase text-ink-3 font-bold">{label} *</label>
                      <input
                        required type={type} value={formData[key]}
                        onChange={(e) => setFormData(p => ({ ...p, [key]: e.target.value }))}
                        placeholder={placeholder}
                        disabled={isSending}
                        className="bg-paper-2 border border-paper-3 rounded-xl px-4 py-2.5 text-[0.88rem] text-ink placeholder:text-ink-3/40 focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand/15 transition-all duration-200 disabled:opacity-60"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.65rem] tracking-widest uppercase text-ink-3 font-bold">Your Message *</label>
                  <textarea
                    required rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your project, goals, or anything you'd like us to know..."
                    disabled={isSending}
                    className="bg-paper-2 border border-paper-3 rounded-xl px-4 py-3 text-[0.88rem] text-ink placeholder:text-ink-3/40 focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand/15 transition-all duration-200 resize-none disabled:opacity-60"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand hover:bg-brand-h text-white text-[0.88rem] font-semibold rounded-full transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_10px_28px_rgba(6,163,218,0.3)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                    {!isSending && (
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                  <p className="text-ink-3/50 text-[0.72rem]">🔒 Your info stays private</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Contact Section ─────────────────────────────────────────────────────
export default function Contact({ initialMessage }) {
  const sectionRef = useRef(null);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    if (initialMessage) setShowFormModal(true);
  }, [initialMessage]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ctc-item',
        { opacity: 0, y: 38 },
        {
          opacity: 1, y: 0, duration: 0.72, stagger: 0.1,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {showFormModal && <SendMessageModal onClose={() => setShowFormModal(false)} />}

      <section
        ref={sectionRef}
        id="contact-us"
        className="relative bg-ink text-white py-24 md:py-36 overflow-hidden rounded-b-[42px]"
      >
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse,rgba(6,163,218,0.12),transparent_68%)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,163,218,0.07),transparent_65%)] pointer-events-none" />

        <div className="w-[92%] max-w-[1280px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* ── Left: Headline + Buttons ───────────────────────────── */}
            <div className="flex flex-col gap-8">
              <div className="ctc-item flex items-center gap-3">
                <span className="w-8 h-px bg-brand/50" />
                <span className="text-brand text-[0.68rem] tracking-[0.22em] uppercase font-bold">Get In Touch</span>
              </div>

              <div className="ctc-item">
                <h2 className="font-serif text-[clamp(2.8rem,4.8vw,4.4rem)] leading-[1.05] tracking-tight font-normal mb-5">
                  Ready to build<br />
                  something{' '}
                  <span className="relative inline-block">
                    <em className="text-brand not-italic">extraordinary</em>
                    <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 240 6" preserveAspectRatio="none">
                      <path d="M0 5 Q60 0 120 4 Q180 8 240 2" stroke="#06A3DA" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.55" />
                    </svg>
                  </span>?
                </h2>
                <p className="text-white/42 text-[1rem] leading-[1.8] max-w-[400px]">
                  Let's collaborate to bring your vision to life with precision and elegance. One conversation is all it takes.
                </p>
              </div>

              <div className="ctc-item flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowFormModal(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand hover:bg-brand-h text-white text-[0.9rem] font-semibold rounded-full transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_14px_36px_rgba(6,163,218,0.28)] cursor-pointer"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Send us a Message
                </button>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=yashkw.crypto@gmail.com&su=Project%20Inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-white/10 hover:border-white/25 text-white/60 hover:text-white text-[0.9rem] font-medium rounded-full transition-all duration-300 hover:bg-white/[0.04]"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                  Email Directly
                </a>
              </div>
            </div>

            {/* ── Right: Contact Info + Map ──────────────────────────── */}
            <div className="ctc-item flex flex-col gap-4">
              {[
                {
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
                  label: 'Office Address',
                  value: 'B-610, Titanium City Centre, 100ft Anand Nagar Rd, next to Sachin Tower, Prahlad Nagar, Ahmedabad, Gujarat 380015',
                  href: null,
                },
                {
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg>,
                  label: 'Phone',
                  value: '+91 7490971996',
                  href: 'tel:+917490971996',
                },
                {
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
                  label: 'Email',
                  value: 'info@cryptwareinfotech.com',
                  href: 'mailto:info@cryptwareinfotech.com',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:border-brand/25 hover:bg-white/[0.06] transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/15 flex items-center justify-center text-brand flex-shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[0.65rem] tracking-widest uppercase text-brand/70 font-bold mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[0.875rem] text-white/55 hover:text-white transition-colors leading-relaxed">{item.value}</a>
                    ) : (
                      <p className="text-[0.875rem] text-white/55 leading-relaxed">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Response time badge */}
              <div className="flex items-center gap-2.5 px-1 pt-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <p className="text-white/28 text-[0.75rem]">
                  Usually responds within <span className="text-white/45 font-semibold">24 hours</span> · Mon–Sat, 10am–7pm IST
                </p>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] h-[220px] relative mt-1">
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.05] rounded-2xl z-10 pointer-events-none" />
                <iframe
                  title="Cryptware Infotech Solutions LLP Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9065889478!2d72.51957315!3d23.02838958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e858c6620f8d9%3A0x66940b9e69da7d1e!2sTitanium%20City%20Centre%2C%20Prahlad%20Nagar%2C%20Ahmedabad%2C%20Gujarat%20380015!5e0!3m2!1sen!2sin!4v1749384000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale opacity-75"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
