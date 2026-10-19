export const FREE_SPLIT_TEXT_ENGINE_CODE = `/**
 * ============================================================================
 * FREE SPLITTEXT PLUGIN ENGINE (Zero-Dependency GSAP 3 Compatible)
 * 100% Free & Open Source Alternative to Club GreenSock SplitText
 * ============================================================================
 * Supports:
 * - Chars, Words and Lines splitting
 * - Line grouping based on real offsetTop measurement
 * - Overflow curtain masking wrappers (<span style="overflow:hidden">)
 * - Safe .revert() method to restore pristine initial DOM
 */

function splitText(target, options = {}) {
  const elements = typeof target === "string" 
    ? Array.from(document.querySelectorAll(target)) 
    : (target.length ? Array.from(target) : [target]);

  const types = options.types || ["chars", "words", "lines"];
  const doChars = types.includes("chars");
  const doWords = types.includes("words");
  const doLines = types.includes("lines");

  const allChars = [];
  const allWords = [];
  const allLines = [];
  const originalHTMLMap = new Map();

  elements.forEach((el) => {
    // Preserve original HTML for safe reverting
    originalHTMLMap.set(el, el.innerHTML);

    const rawText = el.textContent || "";
    const wordStrings = rawText.trim().split(/\\s+/);
    
    el.innerHTML = "";
    const tempWordElements = [];

    wordStrings.forEach((wStr, wIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = options.wordsClass || "split-word";
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      if (doChars) {
        const charStrings = wStr.split("");
        charStrings.forEach((cStr) => {
          const charSpan = document.createElement("span");
          charSpan.className = options.charsClass || "split-char";
          charSpan.style.display = "inline-block";
          charSpan.style.willChange = "transform, opacity";
          charSpan.textContent = cStr;

          if (options.maskChars) {
            const charMask = document.createElement("span");
            charMask.className = options.maskClass || "split-mask-char";
            charMask.style.display = "inline-block";
            charMask.style.overflow = "hidden";
            charMask.style.verticalAlign = "top";
            charMask.appendChild(charSpan);
            wordSpan.appendChild(charMask);
          } else {
            wordSpan.appendChild(charSpan);
          }

          allChars.push(charSpan);
        });
      } else {
        wordSpan.textContent = wStr;
      }

      if (options.maskWords && !options.maskChars) {
        const wordMask = document.createElement("span");
        wordMask.className = options.maskClass || "split-mask-word";
        wordMask.style.display = "inline-block";
        wordMask.style.overflow = "hidden";
        wordMask.style.verticalAlign = "top";
        wordMask.appendChild(wordSpan);
        el.appendChild(wordMask);
      } else {
        el.appendChild(wordSpan);
      }

      if (wIndex < wordStrings.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }

      allWords.push(wordSpan);
      tempWordElements.push(wordSpan);
    });

    // Handle Lines detection via offsetTop grouping
    if (doLines && tempWordElements.length > 0) {
      const lineMap = new Map();
      
      tempWordElements.forEach((wEl) => {
        const top = wEl.offsetTop;
        if (!lineMap.has(top)) {
          lineMap.set(top, []);
        }
        lineMap.get(top).push(wEl);
      });

      el.innerHTML = "";
      
      Array.from(lineMap.values()).forEach((lineWords) => {
        const lineWrap = document.createElement("div");
        lineWrap.className = options.linesClass || "split-line";
        lineWrap.style.display = "block";

        if (options.maskLines) {
          const lineMask = document.createElement("div");
          lineMask.className = options.maskClass || "split-mask-line";
          lineMask.style.display = "block";
          lineMask.style.overflow = "hidden";

          lineWords.forEach((w, i) => {
            lineWrap.appendChild(w);
            if (i < lineWords.length - 1) {
              lineWrap.appendChild(document.createTextNode(" "));
            }
          });

          lineMask.appendChild(lineWrap);
          el.appendChild(lineMask);
          allLines.push(lineWrap);
        } else {
          lineWords.forEach((w, i) => {
            lineWrap.appendChild(w);
            if (i < lineWords.length - 1) {
              lineWrap.appendChild(document.createTextNode(" "));
            }
          });
          el.appendChild(lineWrap);
          allLines.push(lineWrap);
        }
      });
    }
  });

  return {
    chars: allChars,
    words: allWords,
    lines: allLines,
    revert: () => {
      elements.forEach((el) => {
        const original = originalHTMLMap.get(el);
        if (original !== undefined) {
          el.innerHTML = original;
        }
      });
    }
  };
}`;

export const MATCH_MEDIA_MODERN_RECIPE = `/**
 * ============================================================================
 * GSAP.MATCHMEDIA() MODERN RECIPE (GSAP 3.11+)
 * Replaces deprecated ScrollTrigger.matchMedia() with Automatic Scoping & Reverts
 * ============================================================================
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Instanciar matchMedia delimitado a un contenedor opcional
const mm = gsap.matchMedia();

// 2. Definir condiciones responsivas sincronizadas
mm.add({
  isDesktop: "(min-width: 1024px)",
  isTablet: "(min-width: 640px) and (max-width: 1023px)",
  isMobile: "(max-width: 639px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  // context.conditions contiene los booleanos evaluados en tiempo real
  let { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions;

  // A) Accesibilidad de Movimiento Reducido
  if (reduceMotion) {
    gsap.set(".hero-headline", { opacity: 1, y: 0 });
    return;
  }

  // B) Animaciones complejas para Escritorio
  if (isDesktop) {
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pinned-showcase",
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1
      }
    });

    pinTl.to(".card-3d", {
      rotateY: 0,
      scale: 1,
      force3D: true,
      stagger: 0.2
    });
  }

  // C) Animaciones optimizadas para Móviles (sin 3D pesados ni pins agresivos)
  if (isMobile) {
    gsap.from(".card-mobile", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".mobile-list",
        start: "top 80%"
      }
    });
  }

  // D) Limpieza específica opcional al cambiar de breakpoint
  return () => {
    // GSAP revierte automáticamente todos los tweens y ScrollTriggers creados aquí
  };
});

// 3. Limpieza global (en SPA / React desmonte)
// mm.revert();
`;

export const STANDALONE_HTML_FULL = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Awwwards Master Section — GSAP 3, Free SplitText & gsap.matchMedia()</title>
  
  <!-- Tipografías de Alta Gama -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  
  <style>
    /* ==========================================================================
       RESET & GPU-ACCELERATED STYLES
       ========================================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg-dark: #0a0b10;
      --bg-card: #12141c;
      --text-main: #f3f4f8;
      --text-muted: #8b92a5;
      --accent-primary: #6366f1;
      --accent-secondary: #06b6d4;
      --font-display: 'Syne', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font-body);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* GPU Acceleration class */
    .gpu {
      will-change: transform, opacity;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }

    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 20px 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
      backdrop-filter: blur(12px);
      background: rgba(10, 11, 16, 0.75);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .brand {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.1rem;
      color: #fff;
    }

    .badge {
      font-size: 0.75rem;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(99, 102, 241, 0.15);
      color: #818cf8;
      border: 1px solid rgba(99, 102, 241, 0.3);
      text-transform: uppercase;
      font-weight: 600;
    }

    /* Hero Section */
    .hero-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 120px 20px 60px;
    }

    .hero-title {
      font-family: var(--font-display);
      font-size: clamp(2.5rem, 6vw, 5.5rem);
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin-bottom: 24px;
      max-width: 1050px;
    }

    .hero-desc {
      font-size: clamp(1rem, 1.8vw, 1.25rem);
      color: var(--text-muted);
      max-width: 620px;
      line-height: 1.6;
      opacity: 0;
    }

    /* Pinned Showcase Section */
    .pinned-section {
      position: relative;
      width: 100%;
      background: #090a0e;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .pinned-wrapper {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 6%;
      gap: 5%;
      overflow: hidden;
    }

    .pinned-left {
      flex: 1;
      max-width: 480px;
      z-index: 2;
    }

    .step-tag {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--accent-secondary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 12px;
      display: inline-block;
    }

    .pinned-headline {
      font-family: var(--font-display);
      font-size: clamp(2rem, 3.5vw, 3.2rem);
      line-height: 1.1;
      margin-bottom: 20px;
    }

    .pinned-copy {
      font-size: 1.05rem;
      line-height: 1.65;
      color: var(--text-muted);
      margin-bottom: 30px;
    }

    .progress-bar-container {
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 99px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 99px;
    }

    .pinned-right {
      flex: 1.2;
      height: 70vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 1200px;
    }

    .showcase-card {
      position: absolute;
      width: 100%;
      max-width: 500px;
      height: 380px;
      background: var(--bg-card);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
      opacity: 0;
      transform: translateY(80px) scale(0.9) rotateX(15deg);
    }

    .showcase-card.card-1 { border-top: 2px solid var(--accent-primary); }
    .showcase-card.card-2 { border-top: 2px solid var(--accent-secondary); }
    .showcase-card.card-3 { border-top: 2px solid #ec4899; }
  </style>
</head>
<body>

  <!-- Header -->
  <header>
    <div class="brand">AWWWARDS SUITE</div>
    <div class="badge">GSAP 3.12 + Free SplitText + matchMedia</div>
  </header>

  <main>
    <!-- 1. Hero Section con Free SplitText -->
    <section class="hero-section">
      <div class="badge" style="margin-bottom: 16px;">Kinetic Typography</div>
      <h1 class="hero-title split-headline">
        Mastering Motion & Responsive Scroll
      </h1>
      <p class="hero-desc">
        Animaciones web sin tirones a 60 FPS, división tipográfica gratuita y control responsivo con <code>gsap.matchMedia()</code>.
      </p>
    </section>

    <!-- 2. Pinned Split-Screen Showcase -->
    <section class="pinned-section" id="pinned-section">
      <div class="pinned-wrapper">
        <div class="pinned-left">
          <span class="step-tag" id="step-tag">Fase 01 — GPU Pipeline</span>
          <h2 class="pinned-headline" id="pinned-title">Transformaciones 3D Directas</h2>
          <p class="pinned-copy" id="pinned-text">
            Forzamos la aceleración por hardware con <code>force3D: true</code> evitando el reflow en el DOM.
          </p>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" id="progress-fill"></div>
          </div>
        </div>

        <div class="pinned-right">
          <div class="showcase-card card-1" id="card-1">
            <span class="badge">Hardware Sync</span>
            <h3>01. GPU Compositing</h3>
            <p>Uso exclusivo de transform3d y opacity para 60 FPS sostenidos.</p>
          </div>
          <div class="showcase-card card-2" id="card-2">
            <span class="badge">Physics</span>
            <h3>02. Scrubbed Inertia</h3>
            <p>Amortiguación suave acoplada a la inercia del usuario.</p>
          </div>
          <div class="showcase-card card-3" id="card-3">
            <span class="badge">Zero Leaks</span>
            <h3>03. gsap.context() Teardown</h3>
            <p>Destrucción automática de triggers y limpieza de memoria.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- CDNs Oficiales -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>

  <!-- Lógica Integrada -->
  <script>
    // 1. FREE SPLITTEXT UTILITY INLINE
    function splitText(target, options = {}) {
      const elements = typeof target === "string" ? Array.from(document.querySelectorAll(target)) : [target];
      const allChars = [];
      const originalMap = new Map();

      elements.forEach(el => {
        originalMap.set(el, el.innerHTML);
        const text = el.textContent.trim();
        el.innerHTML = "";
        
        text.split(" ").forEach((word, wIdx, arr) => {
          const wordSpan = document.createElement("span");
          wordSpan.style.display = "inline-block";
          wordSpan.style.whiteSpace = "nowrap";

          word.split("").forEach(char => {
            const charSpan = document.createElement("span");
            charSpan.style.display = "inline-block";
            charSpan.style.willChange = "transform, opacity";
            charSpan.textContent = char;

            if (options.maskChars) {
              const mask = document.createElement("span");
              mask.style.display = "inline-block";
              mask.style.overflow = "hidden";
              mask.style.verticalAlign = "top";
              mask.appendChild(charSpan);
              wordSpan.appendChild(mask);
            } else {
              wordSpan.appendChild(charSpan);
            }
            allChars.push(charSpan);
          });

          el.appendChild(wordSpan);
          if (wIdx < arr.length - 1) el.appendChild(document.createTextNode(" "));
        });
      });

      return {
        chars: allChars,
        revert: () => elements.forEach(el => el.innerHTML = originalMap.get(el))
      };
    }

    // 2. REGISTRAR PLUGINS
    gsap.registerPlugin(ScrollTrigger);

    // 3. SMOOTH SCROLL LENIS
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // 4. GSAP.MATCHMEDIA() RESPONSIVE LOGIC
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions;

      // Animación de tipografía cinética con Free SplitText
      const split = splitText(".split-headline", { maskChars: true });
      gsap.from(split.chars, {
        y: "115%",
        rotateZ: 4,
        opacity: 0,
        duration: 1.1,
        stagger: 0.025,
        ease: "power4.out"
      });

      gsap.to(".hero-desc", {
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out"
      });

      // Pinned Timeline solo en Desktop
      if (isDesktop) {
        const cards = [document.getElementById("card-1"), document.getElementById("card-2"), document.getElementById("card-3")];
        const progressFill = document.getElementById("progress-fill");

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#pinned-section",
            start: "top top",
            end: "+=2600",
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressFill) progressFill.style.width = \`\${self.progress * 100}%\`;
            }
          }
        });

        pinTl
          .to(cards[0], { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1, force3D: true })
          .to(cards[0], { scale: 0.9, y: -30, opacity: 0.25, duration: 0.8 }, "+=0.2")
          .to(cards[1], { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1, force3D: true }, "<")
          .to(cards[1], { scale: 0.9, y: -30, opacity: 0.25, duration: 0.8 }, "+=0.2")
          .to(cards[2], { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1, force3D: true }, "<");
      }
    });
  </script>
</body>
</html>`;

export const MODULAR_REACT_SNIPPET = `import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitText } from './splitText';

// 1. REGISTRO OBLIGATORIO DE PLUGINS
gsap.registerPlugin(ScrollTrigger);

export const AwwwardsMasterSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    // 2. CREAR GSAP.MATCHMEDIA SCOPED
    const mm = gsap.matchMedia(containerRef);

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      // @ts-ignore
      const { isDesktop, isMobile, reduceMotion } = context.conditions;

      if (reduceMotion) {
        gsap.set(headlineRef.current, { opacity: 1 });
        return;
      }

      // Free SplitText animado con máscara
      if (headlineRef.current) {
        const { chars, revert } = splitText(headlineRef.current, {
          types: ['chars'],
          maskChars: true
        });

        gsap.fromTo(chars,
          { y: '115%', opacity: 0, rotateZ: 3 },
          {
            y: '0%',
            opacity: 1,
            rotateZ: 0,
            duration: 1.1,
            stagger: 0.02,
            ease: 'power4.out',
            force3D: true
          }
        );
      }

      // Desktop Pinned Parallax
      if (isDesktop) {
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=2500',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1
          }
        });

        pinTl.to(".showcase-card-item", {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.3,
          force3D: true
        });
      }
    });

    // 3. LIMPIEZA AUTOMÁTICA EN DESMONTE
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#0a0b10] text-white p-12">
      <h1 ref={headlineRef} className="text-6xl font-bold font-syne">
        Kinetic Split Typography
      </h1>
      <div className="showcase-card-item opacity-0 transform translate-y-12 mt-8 p-6 bg-zinc-900 rounded-2xl">
        Card Content
      </div>
    </section>
  );
};
`;

export const CSS_OPTIMIZATIONS = `/* ==========================================================================
   AWWWARDS 60FPS CSS OPTIMIZATION MATRIX
   ========================================================================== */

/* 1. Priorizar transform y opacity sobre propiedades de layout (top, left, width, height) */
.smooth-anim-target {
  will-change: transform, opacity;
  transform: translateZ(0); /* Forzar compositing layer */
  backface-visibility: hidden;
  perspective: 1000px;
}

/* 2. Evitar repaints en scroll con contain: paint o layout */
.pinned-container {
  contain: layout paint;
}

/* 3. Desactivar eventos de ratón durante scroll de alta velocidad si hay hover pesado */
body.is-scrolling * {
  pointer-events: none;
}

/* 4. Optimizar fuentes para evitar FOIT/CLS */
html {
  font-display: swap;
  text-rendering: optimizeLegibility;
}
`;

export const BRAND_TOKENS_CSS = `/* ==========================================================================
   METAMUNDO BRAND PALETTE & DESIGN SYSTEM TOKENS
   WCAG AAA Compliant (<6% Luminance Base, High Optical Contrast)
   ========================================================================== */

:root {
  /* Surfaces & Backgrounds */
  --color-bg-base: #090a10;        /* Obsidian Canvas (95% Neutral Black) */
  --color-surface-card: #12141e;   /* Elevated Slate (<7% delta) */
  --color-surface-hover: #1b1e2c;  /* Interactive card hover */
  
  /* Brand Accents */
  --color-primary-indigo: #6366f1; /* Galactic Indigo (Primary Accent) */
  --color-secondary-cyan: #06b6d4;  /* Electric Cyan (Kinetic Flow) */
  --color-status-mint: #10b981;     /* 60 FPS Telemetry Mint */
  --color-alert-amber: #f59e0b;     /* ScrollTrigger Marker Amber */
  
  /* High-Contrast Typography */
  --color-text-display: #f8fafc;   /* Bone White (18.4:1 contrast) */
  --color-text-muted: #94a3b8;     /* Slate Muted Subheadings */
  
  /* Typography Scales */
  --font-display: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
}

/* Tailwind Theme Configuration Extension */
/*
module.exports = {
  theme: {
    extend: {
      colors: {
        obsidian: '#090a10',
        surface: '#12141e',
        galactic: '#6366f1',
        electric: '#06b6d4',
        neonMint: '#10b981',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      }
    }
  }
}
*/
`;

export const CODE_TABS: { id: string; title: string; filename: string; language: string; description: string; code: string }[] = [
  {
    id: 'full-html',
    title: 'Archivo Completo (HTML + CSS + JS)',
    filename: 'index.html',
    language: 'html',
    description: 'Documento autónomo completo con CDN de GSAP 3.12+/3.13+/3.15.0, ScrollTrigger, Lenis, Free SplitText y gsap.matchMedia().',
    code: STANDALONE_HTML_FULL,
  },
  {
    id: 'brand-tokens',
    title: 'Tokens de Paleta & Variables CSS',
    filename: 'brand-tokens.css',
    language: 'css',
    description: 'Variables CSS oficiales y configuración de Tailwind basadas en la identidad vectorial y contraste WCAG AAA.',
    code: BRAND_TOKENS_CSS,
  },
  {
    id: 'free-split-text',
    title: 'Plugin Gratuito SplitText (Vanilla / TS)',
    filename: 'splitText.js',
    language: 'javascript',
    description: 'Motor SplitText modular, gratuito y sin dependencias. Compatible con versiones GSAP 3.12, 3.13 y 3.15.0.',
    code: FREE_SPLIT_TEXT_ENGINE_CODE,
  },
  {
    id: 'match-media',
    title: 'gsap.matchMedia() Receta Oficial',
    filename: 'matchMedia.js',
    language: 'javascript',
    description: 'Reemplazo moderno de ScrollTrigger.matchMedia() con soporte de accesibilidad y reversión automática sin bugs.',
    code: MATCH_MEDIA_MODERN_RECIPE,
  },
  {
    id: 'react-component',
    title: 'Componente React Modular (TypeScript)',
    filename: 'AwwwardsSection.tsx',
    language: 'tsx',
    description: 'Implementación con useLayoutEffect + gsap.matchMedia() + Free SplitText para React 18/19 y Next.js.',
    code: MODULAR_REACT_SNIPPET,
  },
  {
    id: 'css-perf',
    title: 'Guía de Rendimiento 60 FPS & CSS',
    filename: 'performance.css',
    language: 'css',
    description: 'Reglas críticas de renderizado, aceleración de capas compuestas y checklists de optimización para Awwwards.',
    code: CSS_OPTIMIZATIONS,
  }
];
