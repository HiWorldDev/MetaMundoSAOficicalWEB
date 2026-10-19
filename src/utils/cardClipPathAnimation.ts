import gsap from 'gsap';

/**
 * Utility for animating card reveal with organic undulating clip-path.
 * Fully compliant with:
 * - Rectangular normal starting clip-path
 * - Organic active clip-path
 * - Soft edge undulation (gentle ripple/waves)
 * - Safe video framing (no bad clipping of videos)
 * - Low-end device fallback (disabled clip-path)
 */

export const RECTANGULAR_CLIP_PATH = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
export const ORGANIC_ACTIVE_CLIP_PATH = 'polygon(0 5%, 5% 0, 95% 0, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0 95%)';

/**
 * Detects whether the current device is low-end or has reduced motion enabled.
 */
export const isLowEndDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Reduced motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    || (deviceMemory !== undefined && deviceMemory <= 4)) {
    return true;
  }

  // Check if clip-path polygon is supported
  if (typeof CSS === 'undefined' || !CSS.supports || !CSS.supports('clip-path', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)')) {
    return true;
  }

  return false;
};

/**
 * Initializes global performance class on document root.
 */
export const initLowEndFallback = () => {
  if (typeof document !== 'undefined' && isLowEndDevice()) {
    document.documentElement.classList.add('low-end');
  }
};

/**
 * Dynamic Glassmorphism Blur Controller:
 * Modulates CSS custom property --carousel-card-blur based on scroll activity.
 * During scroll, blur increases dynamically with velocity/motion,
 * creating an optical frosted glass refraction effect.
 * When motion settles, it relaxes back to the baseline 10px frosted state.
 */
export const initDynamicGlassBlur = () => {
  if (typeof window === 'undefined') return () => {};
  if (isLowEndDevice()) {
    document.documentElement.style.setProperty('--carousel-card-blur', '0px');
    document.documentElement.style.setProperty('--card-blur', '0px');
    return () => {};
  }

  // Set default baseline frosted glass blur
  document.documentElement.style.setProperty('--carousel-card-blur', '10px');
  document.documentElement.style.setProperty('--card-blur', '10px');

  let lastScrollY = window.scrollY;
  let decayTimeout: ReturnType<typeof setTimeout> | null = null;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const delta = Math.abs(currentScrollY - lastScrollY);
    lastScrollY = currentScrollY;

    // Dynamic blur shifts with scroll speed and position (range: 6px to 20px)
    const velocityBoost = Math.min(10, delta * 0.25);
    const scrollModulation = Math.sin(currentScrollY / 220) * 2;
    const dynamicBlur = Math.max(6, Math.min(20, 10 + velocityBoost + scrollModulation));

    document.documentElement.style.setProperty('--carousel-card-blur', `${dynamicBlur.toFixed(1)}px`);
    document.documentElement.style.setProperty('--card-blur', `${dynamicBlur.toFixed(1)}px`);

    if (decayTimeout) clearTimeout(decayTimeout);
    decayTimeout = setTimeout(() => {
      // Smoothly return to 10px standard frosted state when scrolling stops
      document.documentElement.style.setProperty('--carousel-card-blur', '10px');
      document.documentElement.style.setProperty('--card-blur', '10px');
    }, 150);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (decayTimeout) clearTimeout(decayTimeout);
  };
};

/**
 * Generates an organic wavy polygon with gentle undulating edges.
 * Keeps cuts within safe 0%-6% margins so videos are never cut off.
 */
export const getOrganicWavyPolygon = (waveX = 0, waveY = 0): string => {
  // Clamped subtle micro-undulation based on cursor/state
  const cx = Math.max(-1.2, Math.min(1.2, waveX * 0.9));
  const cy = Math.max(-1.2, Math.min(1.2, waveY * 0.9));

  // 12-point smooth undulating contour
  const topMidX = (50 + cx * 2.2).toFixed(1);
  const topMidY = (1.4 + cy * 0.6).toFixed(1);

  const rightMidX = (98.6 + cx * 0.6).toFixed(1);
  const rightMidY = (50 + cy * 2.2).toFixed(1);

  const botMidX = (50 - cx * 2.2).toFixed(1);
  const botMidY = (98.6 - cy * 0.6).toFixed(1);

  const leftMidX = (1.4 - cx * 0.6).toFixed(1);
  const leftMidY = (50 - cy * 2.2).toFixed(1);

  return `polygon(
    0% 5%,
    5% 0%,
    ${topMidX}% ${topMidY}%,
    95% 0%,
    100% 5%,
    ${rightMidX}% ${rightMidY}%,
    100% 95%,
    95% 100%,
    ${botMidX}% ${botMidY}%,
    5% 100%,
    0% 95%,
    ${leftMidX}% ${leftMidY}%
  )`.replace(/\s+/g, ' ');
};

/**
 * Animates a card's clip-path with GSAP.
 * Upon activation, it produces an undulating ripple that naturally reveals the content.
 * Upon deactivation, it smoothly returns to the normal rectangular shape.
 */
export const animateCardClipPath = (
  card: HTMLElement | null,
  isActive: boolean,
  waveOffset = { x: 0, y: 0 }
) => {
  if (!card) return;

  // Fallback for low-end devices: bypass clip-path completely
  if (isLowEndDevice()) {
    card.style.clipPath = 'none';
    return;
  }

  // Kill existing tweens on this card to prevent animation conflict
  gsap.killTweensOf(card);

  if (isActive) {
    const waveShape = getOrganicWavyPolygon(waveOffset.x, waveOffset.y);
    const finalShape = ORGANIC_ACTIVE_CLIP_PATH;

    // Step 1: Organic undulating wave ripple (borders ondulan suavemente)
    gsap.to(card, {
      attr: {
        style: `clip-path: ${waveShape};`
      },
      duration: 0.38,
      ease: 'power1.out',
      onComplete: () => {
        // Step 2: Settles into smooth organic active silhouette
        gsap.to(card, {
          attr: {
            style: `clip-path: ${finalShape};`
          },
          duration: 0.42,
          ease: 'power2.out',
        });
      },
    });
  } else {
    // Return smoothly to clean normal rectangular clip-path
    gsap.to(card, {
      attr: {
        style: `clip-path: ${RECTANGULAR_CLIP_PATH};`
      },
      duration: 0.8,
      ease: 'power2.out',
    });
  }
};
