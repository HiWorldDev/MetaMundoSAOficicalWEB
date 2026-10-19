import React, { useEffect, useRef, useId } from 'react';
import gsap from 'gsap';

export const MORPH_SHAPES = [
  'M 50,10 Q 90,30 90,50 Q 90,70 50,90 Q 10,70 10,50 Q 10,30 50,10 Z',
  'M 30,20 Q 80,20 85,50 Q 80,80 30,80 Q 20,50 30,20 Z',
  'M 50,15 Q 85,35 80,50 Q 85,65 50,85 Q 15,65 20,50 Q 15,35 50,15 Z',
];

interface MorphShapeProps {
  id?: string;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Optional custom scroll progress or velocity boost */
  scrollProgress?: number;
}

/**
 * Decorative Organic Morph Shape component that renders an SVG inside cards.
 * Deforms smoothly on scroll and continuously animates with organic GSAP morphing.
 * Strictly maintains z-index so it never obstructs or overlays video content awkwardly.
 */
export const MorphShape: React.FC<MorphShapeProps> = ({
  id,
  accentColor = '#38bdf8',
  className = '',
  style,
  scrollProgress,
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const reactId = useId().replace(/[:]/g, '');
  const shapeId = id || `morph-${reactId}`;
  const gradientId = `morph-grad-${reactId}`;
  const glowFilterId = `morph-glow-${reactId}`;

  // GSAP Morphing & Scroll Deformation Effect
  useEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl) return;

    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Baseline GSAP morphing: organic smooth breathing between shapes
    const idleTween = gsap.to(pathEl, {
      attr: { d: MORPH_SHAPES[1] },
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Scroll deformation: deform shape smoothly when user scrolls
    let lastScroll = typeof window !== 'undefined' ? window.scrollY : 0;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - lastScroll);
      lastScroll = currentScroll;

      // Select target shape dynamically based on scroll position
      const shapeIndex = Math.floor((currentScroll / 260) % MORPH_SHAPES.length);
      const targetD = MORPH_SHAPES[shapeIndex];

      // Smooth organic morphing with GSAP upon scroll
      gsap.to(pathEl, {
        attr: { d: targetD },
        duration: 0.65,
        ease: 'power2.out',
        overwrite: 'auto',
        onComplete: () => {
          // Gently resume organic yoyo idle breathing once scrolling settles
          if (resumeTimeout) clearTimeout(resumeTimeout);
          resumeTimeout = setTimeout(() => {
            const nextIndex = (shapeIndex + 1) % MORPH_SHAPES.length;
            gsap.to(pathEl, {
              attr: { d: MORPH_SHAPES[nextIndex] },
              duration: 1.8,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              overwrite: 'auto',
            });
          }, 300);
        },
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      idleTween.kill();
      gsap.killTweensOf(pathEl);
    };
  }, []);

  // React to prop-driven scrollProgress if provided
  useEffect(() => {
    if (scrollProgress === undefined || !pathRef.current) return;
    const shapeIndex = Math.min(
      MORPH_SHAPES.length - 1,
      Math.floor(scrollProgress * MORPH_SHAPES.length)
    );
    gsap.to(pathRef.current, {
      attr: { d: MORPH_SHAPES[shapeIndex] },
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [scrollProgress]);

  return (
    <svg
      className={`morph-shape pointer-events-none select-none overflow-visible ${className}`}
      viewBox="0 0 100 100"
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.28" />
          <stop offset="50%" stopColor={accentColor} stopOpacity="0.10" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
        </linearGradient>
        <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        id={shapeId}
        ref={pathRef}
        className="morph-path"
        d={MORPH_SHAPES[0]}
        fill={`url(#${gradientId})`}
        stroke={accentColor}
        strokeWidth="1.25"
        strokeOpacity="0.45"
        filter={`url(#${glowFilterId})`}
      />
    </svg>
  );
};
