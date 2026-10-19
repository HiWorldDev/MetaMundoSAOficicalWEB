import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, MoveRight, ExternalLink, Award, Eye } from 'lucide-react';
import { CaseStudy } from '../types';
import { MorphShape } from './MorphShape';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalGallerySectionProps {
  onOpenInquiry: () => void;
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

const VAULT_ITEMS = [
  {
    id: '01',
    category: 'Spatial Sound & WebGL',
    title: 'AETHERIUM VOLUMETRICS',
    description: 'Visualizador de audio espacial en tiempo real con física de partículas fluidas e interacción táctil.',
    tag: 'FWA of the Day',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    accent: '#6366f1',
    client: 'Aether Audio Labs',
  },
  {
    id: '02',
    category: 'Haute Horlogerie 3D',
    title: 'KAIROS CHRONOGRAPH',
    description: 'Descomposición anatómica de calibres relojeros suizos con shaders de zafiro y oro rosa.',
    tag: 'Red Dot Best of Best',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    accent: '#f59e0b',
    client: 'Genevoise Haute Horlogerie',
  },
  {
    id: '03',
    category: 'Luxury Fashion Runway',
    title: 'LUMEN PARIS COUTURE',
    description: 'Pasarela digital inmersiva donde las prendas responden a la velocidad del scroll del usuario.',
    tag: 'Awwwards SOTD',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    accent: '#ec4899',
    client: 'Lumen Couture Paris',
  },
  {
    id: '04',
    category: 'Neural AI Visual Engine',
    title: 'SYNTHESIS QUANTUM',
    description: 'Plataforma interactiva para creadores impulsada por modelos generativos y diseño tipográfico dinámico.',
    tag: 'Site of the Month',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    accent: '#10b981',
    client: 'Synthesis AI',
  },
  {
    id: '05',
    category: 'Automotive Hypercraft',
    title: 'VANGUARD HYPERCAR',
    description: 'Configurador en tiempo real con iluminación ambiental dinámica y pruebas de aerodinámica virtuales.',
    tag: 'Developer Award',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800&auto=format&fit=crop',
    accent: '#06b6d4',
    client: 'Vanguard Motors',
  },
];

export const HorizontalGallerySection: React.FC<HorizontalGallerySectionProps> = ({
  onOpenInquiry,
  onSelectCaseStudy,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 140;

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
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="horizontal-stream-section"
      className="relative w-full min-h-screen bg-[#08090d] text-white flex flex-col justify-center overflow-hidden py-16 border-b border-white/10"
    >
      {/* Section Header Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              The Vault • Exploraciones & Producciones 2026
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Galería Cinemática Horizontal
          </h2>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full md:w-72 flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-mono text-zinc-400">
            <span>Desplazamiento Continuo</span>
            <span className="text-cyan-400 flex items-center gap-1">
              <MoveRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-pink-500 rounded-full w-0 transition-all duration-75"
            />
          </div>
        </div>
      </div>

      {/* Horizontal Cards Track */}
      <div
        ref={trackRef}
        className="flex gap-6 sm:gap-8 px-6 md:px-12 w-fit will-change-transform py-4"
      >
        {VAULT_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={onOpenInquiry}
            className="carousel-card w-[320px] sm:w-[380px] md:w-[440px] h-[500px] sm:h-[540px] rounded-3xl p-7 flex flex-col justify-between shrink-0 bg-gradient-to-b from-[#121422]/80 to-[#0a0b12]/90 border border-white/10 hover:border-indigo-500/50 transition-all duration-500 relative group overflow-hidden shadow-2xl cursor-pointer"
          >
            {/* Top Tag & ID */}
            <div className="flex items-center justify-between z-10">
              <span
                className="text-xs font-mono font-bold px-3 py-1 rounded-full border backdrop-blur-md flex items-center gap-1.5"
                style={{
                  backgroundColor: `${item.accent}20`,
                  color: item.accent,
                  borderColor: `${item.accent}40`,
                }}
              >
                <Award className="w-3 h-3" />
                {item.tag}
              </span>
              <span className="font-syne text-4xl font-extrabold text-white/15 group-hover:text-white/30 transition-colors">
                {item.id}
              </span>
            </div>

            {/* Visual Image Representation */}
            <div className="w-full h-52 rounded-2xl overflow-hidden relative group-hover:border-indigo-500/40 border border-white/10 transition-all shadow-inner">
              {/* Decorative Organic Morph Shape */}
              <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 z-10 opacity-35 group-hover:opacity-60 transition-opacity duration-500 select-none overflow-visible">
                <MorphShape
                  id={`morph-vault-${item.id}`}
                  accentColor={item.accent}
                  className="w-full h-full"
                />
              </div>

              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-zinc-300 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm">
                {item.client}
              </div>
            </div>

            {/* Content & Description */}
            <div className="z-10">
              <span className="text-[11px] font-mono text-indigo-400 block mb-1">
                {item.category}
              </span>
              <h3 className="font-syne text-xl sm:text-2xl font-extrabold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-zinc-300 z-10">
              <span className="font-mono text-emerald-400">60 FPS Hardware Render</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: item.accent }}>
                <span className="font-syne font-bold">Solicitar Experiencia Similar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
