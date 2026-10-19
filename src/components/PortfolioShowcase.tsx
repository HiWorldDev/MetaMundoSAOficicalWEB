import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Play, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioShowcaseProps {
  onOpenInquiry: () => void;
}

const PROJECTS = [
  {
    id: '01',
    name: 'Radio Sónica',
    category: 'Radio online',
    url: 'https://www.radiosonica.com.ar/',
    description: 'Presencia digital para descubrir la programación, escuchar en vivo y conectar con la comunidad.',
    accent: '#d946ef',
    badge: 'Live radio',
  },
  {
    id: '02',
    name: 'Emi Brandan',
    category: 'Marca personal',
    url: 'https://emibrandan.com/',
    description: 'Espacio personal para presentar identidad, trabajo y proyectos con una mirada premium.',
    accent: '#fb923c',
    badge: 'Portfolio',
  },
  {
    id: '03',
    name: 'Nortronic Academia',
    category: 'Formación musical',
    url: 'https://nortronic-academia.com.ar/',
    description: 'Web institucional enfocada en enseñar, captar alumnos y mostrar la propuesta pedagógica.',
    accent: '#38bdf8',
    badge: 'Academia',
  },
  {
    id: '04',
    name: 'Servidor Satelital',
    category: 'Conectividad satelital',
    url: 'https://servidorsatelital.com.ar/',
    description: 'Sitio orientado a servicios, soluciones y confianza para clientes con necesidad técnica.',
    accent: '#34d399',
    badge: 'Tech',
  },
  {
    id: '05',
    name: 'Argensalta Propiedades',
    category: 'Propiedades · Salta',
    url: 'https://argensaltapropiedades.com.ar/',
    description: 'Proyecto inmobiliario pensado para mostrar propiedades y generar contacto comercial.',
    accent: '#fbbf24',
    badge: 'Inmobiliaria',
  },
  {
    id: '06',
    name: 'Columna Vertebral',
    category: 'Salud y bienestar',
    url: 'https://columna-vertebral.com.ar/',
    description: 'Diseño humanizado para presentar servicios, atención y confianza en salud.',
    accent: '#84cc16',
    badge: 'Profesional',
  },
];

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onOpenInquiry }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const [activePreview, setActivePreview] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 180;

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="horizontal-stream-section"
      className="relative z-10 flex min-h-screen w-full flex-col justify-center overflow-hidden border-y border-white/10 bg-[#08090d] py-16 text-white"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-cyan-300">
                Portfolio
              </span>
            </div>
            <h2
              id="portfolio-heading"
              className="max-w-3xl font-syne text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Webs que ya están <span className="text-white/45">funcionando.</span>
            </h2>
          </div>

          <div className="w-full md:w-72">
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-zinc-400">
              <span>Desplazamiento</span>
              <span className="text-cyan-300">Live</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                ref={progressLineRef}
                className="h-full w-0 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-fuchsia-500 transition-all duration-75"
              />
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex w-fit gap-6 px-1 py-4 sm:gap-8"
          aria-label="Proyectos del portfolio"
        >
          {PROJECTS.map((project, index) => {
            const isPreviewActive = activePreview === project.url;

            return (
              <article
                key={project.url}
                className="group relative h-[500px] w-[320px] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#121722]/80 to-[#090b12]/90 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] transition-all duration-500 hover:border-cyan-400/40 sm:w-[380px] sm:p-7 md:w-[430px]"
                style={{ boxShadow: `0 30px 80px ${project.accent}22` }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{ background: `radial-gradient(circle at top left, ${project.accent}55 0%, transparent 38%)` }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className="rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur-md"
                      style={{ borderColor: `${project.accent}60`, color: project.accent, backgroundColor: `${project.accent}1a` }}
                    >
                      {project.badge}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                      {project.id}
                    </span>
                  </div>

                  <div className="relative mb-5 h-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1017]">
                    {isPreviewActive ? (
                      <>
                        <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center gap-1.5 border-b border-white/10 bg-[#11151c]/90 px-3">
                          <span className="size-2 rounded-full bg-white/25" />
                          <span className="size-2 rounded-full bg-white/25" />
                          <span className="size-2 rounded-full bg-white/25" />
                          <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-white/5 px-2 py-1 text-center font-mono text-[9px] text-white/45">
                            {new URL(project.url).hostname}
                          </span>
                        </div>

                        <iframe
                          title={`Vista previa de ${project.name}`}
                          src={project.url}
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                          allow="autoplay; fullscreen"
                          className="absolute inset-0 top-9 h-[calc(100%-2.25rem)] w-full border-0 bg-white"
                        />

                        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm transition-colors hover:bg-black"
                          >
                            Abrir sitio
                            <ExternalLink size={11} />
                          </a>
                          <button
                            type="button"
                            onClick={() => setActivePreview(null)}
                            className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 backdrop-blur-sm"
                            aria-label={`Cerrar vista previa de ${project.name}`}
                          >
                            <X size={13} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActivePreview(project.url)}
                        aria-label={`Cargar vista previa de ${project.name}`}
                        className="absolute inset-0 flex items-center justify-center bg-[#090d14] text-left transition-opacity duration-500 hover:opacity-100"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.08),transparent_35%)]" />
                        <div className="relative flex flex-col items-center gap-4">
                          <span className="flex size-16 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white shadow-[0_0_40px_rgba(255,255,255,0.12)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                            <Play size={22} fill="currentColor" className="ml-1" />
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">
                            Vista en vivo
                          </span>
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400">{project.category}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">0{index + 1}</span>
                    </div>

                    <h3 className="mb-3 font-syne text-2xl font-extrabold text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-[2rem]">
                      {project.name}
                    </h3>
                    <p className="max-w-sm text-sm leading-6 text-zinc-300">{project.description}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                      Live preview
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-white"
                    >
                      Open site
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-center px-6 md:px-12">
        <button
          type="button"
          onClick={onOpenInquiry}
          className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
        >
          ¿Hacemos la tuya?
          <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
};