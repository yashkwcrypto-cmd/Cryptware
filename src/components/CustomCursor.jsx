import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId;
    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      animationFrameId = requestAnimationFrame(animRing);
    };
    animRing();

    const onMouseEnter = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          width: 64,
          height: 64,
          borderColor: 'rgba(6,163,218,0.6)',
          duration: 0.35,
          ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          overwrite: 'auto'
        });
      }
    };

    const onMouseLeave = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          width: 40,
          height: 40,
          borderColor: 'rgba(255,255,255,0.5)',
          duration: 0.35,
          ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          overwrite: 'auto'
        });
      }
    };

    const setupListeners = () => {
      const targets = document.querySelectorAll('a, button, .service-card, .belief-card, .metric-box, .provide-item, .contact-pill, .testi-mark');
      targets.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    setupListeners();

    // Use MutationObserver to handle hover listeners on dynamically rendered elements
    const observer = new MutationObserver(() => {
      setupListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      const targets = document.querySelectorAll('a, button, .service-card, .belief-card, .metric-box, .provide-item, .contact-pill, .testi-mark');
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <div className="hidden md:block fixed pointer-events-none z-[9999] mix-blend-difference">
      <div
        ref={dotRef}
        className="w-2 h-2 bg-white rounded-full absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 pointer-events-none"
      />
      <div
        ref={ringRef}
        className="w-10 h-10 border-[1.5px] border-white/50 rounded-full absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ transition: 'width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      />
    </div>
  );
}
