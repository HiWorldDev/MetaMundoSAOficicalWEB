import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Smartphone, Check, AlertCircle, Sparkles, RefreshCw, Cpu, Layers, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const MatchMediaShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeBreakpoint, setActiveBreakpoint] = useState<'desktop' | 'mobile'>('desktop');
  const [simulatedWidth, setSimulatedWidth] = useState<'responsive' | 'desktop' | 'mobile'>('responsive');

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Instanciar gsap.matchMedia() (Estándar moderno GSAP 3.11+)
    const mm = gsap.matchMedia(container);

    // 2. Definir condiciones responsivas sincronizadas
    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      // @ts-ignore
      const { isDesktop, isMobile, reduceMotion } = context.conditions;

      if (reduceMotion) {
        // Accesibilidad: Cero movimientos bruscos para usuarios sensibles
        gsap.set(".mm-box", { opacity: 1, y: 0 });
        return;
      }

      if (isDesktop) {
        setActiveBreakpoint('desktop');
        
        // Animación Desktop: Pin lateral + Desplazamiento horizontal 3D
        gsap.fromTo(".mm-card-1", 
          { x: -50, opacity: 0, rotateY: 15 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".mm-desktop-view",
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.fromTo(".mm-card-2", 
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".mm-desktop-view",
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.fromTo(".mm-card-3", 
          { x: 50, opacity: 0, rotateY: -15 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".mm-desktop-view",
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (isMobile) {
        setActiveBreakpoint('mobile');

        // Animación Mobile: Stack vertical liviano con menor carga de GPU
        gsap.fromTo(".mm-mobile-card", 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".mm-mobile-view",
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Función opcional de limpieza específica para este breakpoint
      return () => {
        // GSAP revierte automáticamente los tweens creados dentro de mm.add
      };
    });

    // 3. Limpieza total de matchMedia al desmontar
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="match-media-showcase"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" />
              gsap.matchMedia() Architecture
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Reemplazo Oficial de ScrollTrigger.matchMedia()
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Diseño Responsivo Inteligente
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
            A diferencia del antiguo <code className="text-rose-400 line-through">ScrollTrigger.matchMedia()</code>, el nuevo <code className="text-cyan-300 font-mono">gsap.matchMedia()</code> funciona como un contexto scoped universal que revierte automáticamente todas las propiedades en cada breakpoint sin colisiones.
          </p>
        </div>

        {/* Live Breakpoint Tag */}
        <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 rounded-2xl p-3 px-4">
          <span className="text-xs font-mono text-zinc-400">Breakpoint Activo:</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-bold text-white uppercase">
              {activeBreakpoint === 'desktop' ? 'Desktop (≥1024px)' : 'Mobile (<1024px)'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Responsive Comparison Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Left Column: Code Pattern Explanation (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5 text-white font-syne font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Ventajas de gsap.matchMedia()</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Reversión limpia instantánea:</strong> Al redimensionar la pantalla de Desktop a Mobile, las transformaciones 3D se restauran a su estado original sin saltos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Soporte para prefers-reduced-motion:</strong> Desactiva animaciones pesadas automáticamente para usuarios con sensibilidad motriz.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Condiciones múltiples sincronizadas:</strong> Combina orientación, ancho de pantalla y puntero táctil en un solo bloque limpio.</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-white/10">
              <div className="text-xs font-mono text-zinc-400 mb-2">// Sintaxis Oficial GSAP 3.11+:</div>
              <pre className="p-3.5 bg-black/60 rounded-xl font-mono text-[11px] text-cyan-300 overflow-x-auto">
{`const mm = gsap.matchMedia();

mm.add({
  isDesktop: "(min-width: 1024px)",
  isMobile: "(max-width: 1023px)"
}, (context) => {
  let { isDesktop, isMobile } = context.conditions;

  if (isDesktop) {
    // 3D Parallax Pin
  }
  if (isMobile) {
    // Vertical Simple Fade
  }
});`}
              </pre>
            </div>
          </div>
        </div>

        {/* Right Column: Live Visual Multi-Screen Demonstration (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Desktop Preview Card (Active on Desktop) */}
          <div className="mm-desktop-view p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121524] to-[#0c0d18] border border-indigo-500/20 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold">
                <Monitor className="w-4 h-4" />
                <span>VISTA ESCRITORIO (3D Parallax Multi-Card)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                GPU Heavy
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 perspective-[1000px]">
              
              <div className="mm-card-1 p-4 rounded-2xl bg-zinc-900/90 border border-indigo-500/30 text-center shadow-lg">
                <span className="font-syne text-2xl font-extrabold text-indigo-400">01</span>
                <h4 className="font-syne font-bold text-white text-xs sm:text-sm mt-1">Left Angle</h4>
                <p className="text-[11px] text-zinc-400 mt-1">rotateY(15deg)</p>
              </div>

              <div className="mm-card-2 p-4 rounded-2xl bg-indigo-950/60 border border-indigo-400/40 text-center shadow-lg transform -translate-y-2">
                <span className="font-syne text-2xl font-extrabold text-white">02</span>
                <h4 className="font-syne font-bold text-white text-xs sm:text-sm mt-1">Center Focus</h4>
                <p className="text-[11px] text-indigo-300 mt-1">scale(1.05)</p>
              </div>

              <div className="mm-card-3 p-4 rounded-2xl bg-zinc-900/90 border border-indigo-500/30 text-center shadow-lg">
                <span className="font-syne text-2xl font-extrabold text-indigo-400">03</span>
                <h4 className="font-syne font-bold text-white text-xs sm:text-sm mt-1">Right Angle</h4>
                <p className="text-[11px] text-zinc-400 mt-1">rotateY(-15deg)</p>
              </div>

            </div>
          </div>

          {/* Mobile Preview Card (Optimized vertical stack) */}
          <div className="mm-mobile-view p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#171a24] to-[#0f1118] border border-cyan-500/20 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold">
                <Smartphone className="w-4 h-4" />
                <span>VISTA MÓVIL (Vertical Streamlined)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Low Power Mode
              </span>
            </div>

            <div className="space-y-3">
              <div className="mm-mobile-card p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <span className="text-xs font-medium text-white">Transición vertical 1D (sin 3D pesados)</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">100% Fluido</span>
              </div>

              <div className="mm-mobile-card p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <span className="text-xs font-medium text-white">Optimización de batería y pantalla táctil</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Sin Lag</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
