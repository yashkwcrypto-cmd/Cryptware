
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
animRing();
document.querySelectorAll('a,button,.service-card,.belief-card,.metric-box').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = '64px'; ring.style.height = '64px'; ring.style.borderColor = 'rgba(6,163,218,0.6)'; });
    el.addEventListener('mouseleave', () => { ring.style.width = '40px'; ring.style.height = '40px'; ring.style.borderColor = 'rgba(255,255,255,0.5)'; });
});

// ── NAV ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); }, { passive: true });

// ── MOBILE NAV ──
const ham = document.getElementById('hamburger');
const mNav = document.getElementById('mobileNav');
const ovl = document.getElementById('overlay');
function toggleMenu(o) { mNav.classList.toggle('open', o); ovl.classList.toggle('open', o); ham.classList.toggle('active', o); }
ham.addEventListener('click', () => toggleMenu(!mNav.classList.contains('open')));
ovl.addEventListener('click', () => toggleMenu(false));
document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); gsap.to(window, { duration: 1.2, scrollTo: { y: t, offsetY: 72 }, ease: 'power3.inOut' }); }
    });
});

// ── HERO CANVAS PARTICLES ──
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
resize(); window.addEventListener('resize', resize);
function Particle() { this.reset(); }
Particle.prototype.reset = function () {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
};
for (let i = 0; i < 90; i++) { particles.push(new Particle()); }
function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6,163,218,' + p.alpha + ')'; ctx.fill();
    });
    // draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = 'rgba(6,163,218,' + (0.06 * (1 - d / 120)) + ')'; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
    }
    requestAnimationFrame(drawParticles);
}
drawParticles();

// ── HERO ENTRANCE ──
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
    .to('#heroTitle', { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power4.out' }, '-=0.4')
    .to('#heroSub', { y: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
    .to('#heroActions', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
    .to('#heroStats', { opacity: 1, duration: 0.8 }, '-=0.4')
    .to('#heroScroll', { opacity: 1, duration: 0.6 }, '-=0.2');

// ── PARALLAX HERO BG ON SCROLL ──
gsap.to('.hero-grid-lines', { yPercent: 30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
gsap.to('.hero-gradient', { scale: 1.15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

// ── PARALLAX DOTS + GLOW ──
gsap.to('#parallaxDots', { yPercent: -20, ease: 'none', scrollTrigger: { trigger: '.parallax-section', start: 'top bottom', end: 'bottom top', scrub: true } });
gsap.to('#parallaxGlow', { yPercent: -30, xPercent: 10, ease: 'none', scrollTrigger: { trigger: '.parallax-section', start: 'top bottom', end: 'bottom top', scrub: true } });

// ── 3D TILT ON CARDS ──
const cards3d = document.getElementById('cards3d');
if (cards3d) {
    const cardEls = cards3d.querySelectorAll('.card-3d');

    cards3d.addEventListener('mousemove', e => {
        const rect = cards3d.getBoundingClientRect();
        const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
        const rx = (e.clientY - cy) / rect.height * 16, ry = -(e.clientX - cx) / rect.width * 16;
        gsap.to(cards3d, { rotateX: rx, rotateY: ry, duration: 0.6, ease: 'power2.out', transformPerspective: 800 });
        cardEls.forEach((c, i) => {
            const depth = (i + 1) * 8;
            gsap.to(c, { x: ry * depth * 0.02, y: -rx * depth * 0.02, duration: 0.6, ease: 'power2.out' });
        });
    });
    cards3d.addEventListener('mouseleave', () => {
        gsap.to(cards3d, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' });
        cardEls.forEach(c => gsap.to(c, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' }));
    });
}

// SCROLL-TRIGGERED ANIMATIONS
const ease = 'power3.out';
document.querySelectorAll('[data-gsap="fadeUp"]').forEach(el => {
    const delay = parseFloat(el.getAttribute('data-delay') || 0);
    gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.9, delay, ease,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
});
document.querySelectorAll('[data-gsap="fadeRight"]').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: 50 }, {
        opacity: 1, x: 0, duration: 1, ease,
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
    });
});

gsap.fromTo('.service-card', { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease,
    scrollTrigger: { trigger: '.services-grid', start: 'top 82%', toggleActions: 'play none none reverse' }
});
gsap.fromTo('.belief-card', { opacity: 0, y: 40, scale: 0.97 }, {
    opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease,
    scrollTrigger: { trigger: '.beliefs-grid', start: 'top 84%', toggleActions: 'play none none reverse' }
});
gsap.fromTo('.tech-cell', { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease,
    scrollTrigger: { trigger: '.tech-grid', start: 'top 84%', toggleActions: 'play none none reverse' }
});
gsap.fromTo('.provide-item', { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease,
    scrollTrigger: { trigger: '.provide-grid', start: 'top 84%', toggleActions: 'play none none reverse' }
});
gsap.fromTo('.metric-box', { opacity: 0, scale: 0.95 }, {
    opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.metrics-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
});
gsap.fromTo('.cta-section .cta-inner > *', { opacity: 0, y: 40, scale: 0.97 }, {
    opacity: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.14, ease,
    scrollTrigger: { trigger: '.cta-section', start: 'top 80%', toggleActions: 'play none none reverse' }
});
gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el, { y: 20 }, {
        y: 0, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 40%', scrub: 0.5 }
    });
});

// TESTIMONIAL CAROUSEL
const marks = document.querySelectorAll('.testi-mark');
let cur = 0;
const testimonials = [
    { q: '"Cryptware delivered beyond our expectations. Their attention to detail, premium design approach, and robust technical execution completely transformed our digital presence."', a: 'Sarah Jenkins', t: 'CTO, FutureTech Inc.' },
    { q: '"Working with Cryptware felt like having a true product partner. They didn\'t just code — they thought about our users, our business, and our long- term goals."', a: 'Rajiv Mehta', t: 'Founder, GrowthOS' },
    { q: '"Transparent, on-time, and technically excellent. The team at Cryptware has become our go-to development partner for everything digital."', a: 'Priya Nair', t: 'VP Product, FinStack' }
];
const qEl = document.querySelector('.testi-quote'), aEl = document.querySelector('.testi-author strong'), tEl = document.querySelector('.testi-author span');
function switchTesti(i) {
    marks[cur].classList.remove('active');
    cur = i; marks[cur].classList.add('active');
    gsap.fromTo('.testi-quote, .testi-author', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' });
    qEl.textContent = testimonials[cur].q;
    aEl.textContent = testimonials[cur].a;
    tEl.textContent = testimonials[cur].t;
}
marks.forEach((m, i) => m.addEventListener('click', () => switchTesti(i)));
setInterval(() => switchTesti((cur + 1) % marks.length), 4500);

// FLOATING ELEMENTS
gsap.to('.about-badge', { y: -8, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
gsap.to('.about-float', { y: 6, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 });
