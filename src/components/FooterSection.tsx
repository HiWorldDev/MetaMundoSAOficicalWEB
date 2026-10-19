import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUp, ArrowUpRight, Mail, Play } from 'lucide-react';

interface FooterSectionProps {
  onOpenInquiry: () => void;
  onOpenShowreel: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenInquiry,
  onOpenShowreel,
}) => {
  const footerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const title = titleRef.current;
    if (!footer || !title || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        title,
        { y: 44, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top 92%',
            end: 'center 68%',
            scrub: true,
          },
        },
      );
    }, footer);

    return () => context.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-10 isolate overflow-hidden border-t border-cyan-100/10 bg-gradient-to-b from-[#050912]/75 via-[#05070d]/90 to-[#030407]/95 px-6 pb-8 pt-20 text-white sm:px-10 sm:pt-28 lg:px-16 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.14),transparent_65%)]" />

      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-5 font-mono text-[10px] tracking-[0.34em] text-cyan-100/55 sm:text-xs">
              METAMUNDO — DISEÑO Y DESARROLLO DIGITAL
            </p>
            <h2
              ref={titleRef}
              className="font-syne text-[clamp(3.2rem,10.8vw,9.5rem)] font-extrabold leading-[0.82] tracking-[-0.075em]"
            >
              DISEÑAMOS
              <br />
              <span className="text-cyan-100">EL FUTURO.</span>
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-6 text-slate-200/70 sm:text-base sm:leading-7">
              De la primera idea a una experiencia digital con identidad propia.
              Contanos qué querés crear.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-cyan-100 px-5 text-sm font-semibold text-slate-950 transition-colors hover:bg-white"
            >
              Hablemos de tu proyecto <ArrowUpRight size={16} />
            </button>
            <button
              type="button"
              onClick={onOpenShowreel}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm text-white/80 transition-colors hover:border-cyan-100/40 hover:text-white"
            >
              <Play size={14} /> Ver showreel
            </button>
          </div>
        </div>

        <div className="my-12 h-px bg-gradient-to-r from-cyan-100/20 via-white/10 to-transparent lg:my-16" />

        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <a
              href="mailto:hello@metamundomotion.com"
              className="group inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-cyan-100"
            >
              <Mail size={15} className="text-cyan-200/70" />
              hello@metamundomotion.com
              <ArrowUpRight size={13} className="opacity-50 transition-opacity group-hover:opacity-100" />
            </a>
            <p className="mt-3 max-w-xs text-xs leading-5 text-slate-300/45">
              Diseño, animación y desarrollo web para marcas que quieren avanzar.
            </p>
          </div>

          <nav aria-label="Navegación del pie">
            <p className="mb-3 font-mono text-[9px] tracking-[0.24em] text-white/35">RECORRÉ</p>
            <div className="flex gap-5 text-xs text-white/65">
              <a className="transition-colors hover:text-cyan-100" href="#hero-section">Inicio</a>
              <a className="transition-colors hover:text-cyan-100" href="#horizontal-stream-section">Proyectos</a>
            </div>
          </nav>

          <div className="flex items-start justify-between gap-5 lg:justify-end">
            <div>
              <p className="mb-3 font-mono text-[9px] tracking-[0.24em] text-white/35">SIGUIENTE PASO</p>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="text-xs text-white/65 transition-colors hover:text-cyan-100"
              >
                Empezar una conversación <ArrowUpRight size={12} className="ml-1 inline" />
              </button>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Volver al inicio"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-cyan-100/70 transition-colors hover:border-cyan-100/50 hover:text-white"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.07] pt-5 font-mono text-[9px] tracking-[0.12em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} METAMUNDO MOTION STUDIO</span>
          <span>BUENAS IDEAS, BIEN HECHAS.</span>
        </div>
      </div>
    </footer>
  );
};
