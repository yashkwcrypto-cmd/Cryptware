import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Skip entirely on touch devices — cursor is irrelevant there
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let animationFrameId;
    let isHovered = false;

    // Dot follows mouse instantly via direct style — zero GSAP overhead
    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
    };

    // Ring lerps in rAF loop — smooth trailing effect
    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      animationFrameId = requestAnimationFrame(animRing);
    };
    animRing();

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Event delegation: ONE listener on document instead of hundreds per element
    // This completely eliminates the duplicate-listener bug from the old MutationObserver approach
    const onEnter = (e) => {
      if (isHovered) return;
      const el = e.target.closest('a, button, [role="button"]');
      if (!el) return;
      isHovered = true;
      gsap.to(ringRef.current, {
        scale: 1.6,
        borderColor: 'rgba(6,163,218,0.6)',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onLeave = (e) => {
      if (!isHovered) return;
      const el = e.target.closest('a, button, [role="button"]');
      if (!el) return;
      isHovered = false;
      gsap.to(ringRef.current, {
        scale: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    document.addEventListener('mouseover', onEnter, { passive: true });
    document.addEventListener('mouseout', onLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // Position at top-left; translate handles actual position — avoids offsetting by half size in CSS
    <div className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference">
      <div
        ref={dotRef}
        style={{ willChange: 'transform', marginLeft: '-4px', marginTop: '-4px' }}
        className="w-2 h-2 bg-white rounded-full absolute pointer-events-none"
      />
      <div
        ref={ringRef}
        style={{ willChange: 'transform', marginLeft: '-20px', marginTop: '-20px' }}
        className="w-10 h-10 border-[1.5px] border-white/50 rounded-full absolute pointer-events-none"
      />
    </div>
  );
}
