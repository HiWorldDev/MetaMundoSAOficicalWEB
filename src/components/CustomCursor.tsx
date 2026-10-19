import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Fast dot follower
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    // Smooth ring follower
    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 1.8, backgroundColor: 'rgba(99, 102, 241, 0.2)', borderColor: '#818cf8', duration: 0.3 });
      gsap.to(dot, { scale: 0.5, backgroundColor: '#818cf8', duration: 0.3 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.3)', duration: 0.3 });
      gsap.to(dot, { scale: 1, backgroundColor: '#ffffff', duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Attach listeners to interactive elements
    const interactives = document.querySelectorAll('button, a, input, select, .interactive-hover');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white z-[9999] mix-blend-difference hidden md:block"
      />
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/30 z-[9998] transition-opacity duration-300 hidden md:block"
      />
    </>
  );
};
