import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Play, Sparkles, Award, Zap, TrendingUp, ShieldCheck, ArrowRight, Cpu } from 'lucide-react';
import { BlackLavaMoltenTitle } from './BlackLavaMoltenTitle';

interface HeroSectionProps {
  onScrollToPinned: () => void;
  onOpenShowreel: () => void;
  onOpenInquiry: () => void;
  isLoaded?: boolean;
}

const CLIENT_SECTORS = [
  'SPATIAL COMPUTING & HARDWARE',
  'HAUTE COUTURE & LUXURY E-COMMERCE',
  'SWISS HAUTE HORLOGERIE',
  'NEURAL AI CREATIVE LABS',
  'FINTECH & VENTURE CAPITAL',
  'NEXT-GEN WEBGL EXPERIENCES',
  'INTERACTIVE BRAND UNIVERSES'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToPinned,
  onOpenShowreel,
  onOpenInquiry,
  isLoaded = true,
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const glowOrb1Ref = useRef<HTMLDivElement | null>(null);
  const glowOrb2Ref = useRef<HTMLDivElement | null>(null);
  const brandEmblemRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Kinetic headline and architectural assembly entrance
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('#compu-madre-node', {
        scale: 0.5,
        opacity: 0,
        y: -40,
        duration: 1.2,
        ease: 'back.out(1.4)',
      })
      .from('.hero-molten-title-wrap', {
        opacity: 0,
        scale: 0.75,
        y: 35,
        duration: 1.1,
      }, '-=0.7')
      .from('.hero-subheading', {
        opacity: 0,
        scale: 0.8,
        y: 40,
        duration: 1.0,
      }, '-=0.7')
      .from('.hero-cta-group button', {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }, '-=0.5');

      // 2. Scroll-driven Dynamic Approach: Starts further back in depth and approaches camera as user scrolls
      gsap.to(['#compu-madre-node', '.hero-molten-title-wrap', '.hero-subheading'], {
        scale: 1.28,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // 3. Interactive ambient 3D tilt and mouse interpolation
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(glowOrb1Ref.current, {
          x: xPos * 70,
          y: yPos * 70,
          duration: 1.5,
          ease: 'power2.out',
        });

        gsap.to(glowOrb2Ref.current, {
          x: -xPos * 90,
          y: -yPos * 90,
          duration: 2,
          ease: 'power2.out',
        });

        if (brandEmblemRef.current) {
          gsap.to(brandEmblemRef.current, {
            rotationY: xPos * 25,
            rotationX: -yPos * 25,
            duration: 1.2,
            ease: 'power2.out',
            transformPerspective: 800,
            transformOrigin: 'center center',
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Split string into characters for kinetic typography
  const renderChars = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="hero-word-char inline-block will-change-transform"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-screen pt-36 pb-20 px-4 md:px-8 flex flex-col justify-center items-center text-center overflow-hidden bg-transparent"
    >
      {/* Background ambient lighting orbs with GPU acceleration */}
      <div
        ref={glowOrb1Ref}
        className="pointer-events-none absolute -top-20 left-1/4 w-[520px] h-[520px] bg-indigo-600/15 rounded-full blur-[140px] -z-10 gpu-layer"
      />
      <div
        ref={glowOrb2Ref}
        className="pointer-events-none absolute top-1/3 -right-20 w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[150px] -z-10 gpu-layer"
      />

      {/* Brand Isotype & Top Badges (NODO MADRE CUÁNTICO) */}
      <div className="flex flex-col items-center mb-8 relative z-20">
        
        {/* Real Brand Interactive 3D Emblem / COMPU MADRE EL NODO */}
        <div id="compu-madre-node" ref={brandEmblemRef} className="hero-badge-item mb-5 relative group cursor-pointer">
          
          {/* Circular Quantum Matter Charge Halo */}
          <div className="absolute -inset-6 rounded-full border border-cyan-400/40 animate-[spin_8s_linear_infinite] pointer-events-none opacity-80 shadow-[0_0_25px_rgba(6,182,212,0.4)]" />
          <div className="absolute -inset-10 rounded-full border border-dashed border-indigo-400/30 animate-[spin_16s_linear_infinite_reverse] pointer-events-none opacity-60" />
          
          {/* Electric Ambient Quantum Field */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-cyan-300 rounded-[28px] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          
          {/* Master Node Chip Box */}
          <div className="relative w-24 h-24 rounded-[26px] bg-zinc-950/95 border-2 border-cyan-400/70 p-3.5 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.5)] backdrop-blur-2xl">
            <svg className="w-full h-full transform group-hover:scale-110 transition-transform duration-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" stroke="#38bdf8" strokeWidth="4" fill="#0c1224" className="drop-shadow-[0_0_8px_#38bdf8]" />
              <polygon points="50,14 82,32 50,50 18,32" fill="#06b6d4" opacity="0.95" />
              <polygon points="18,32 50,50 50,86 18,68" fill="#6366f1" opacity="0.65" />
              <polygon points="50,50 82,32 82,68 50,86" fill="#38bdf8" opacity="0.85" />
              <circle cx="50" cy="50" r="8" fill="#ffffff" className="animate-ping" />
              <circle cx="50" cy="50" r="5" fill="#ffffff" />
            </svg>

            {/* Bottom MCP Bus Socket indicator */}
            <div className="absolute -bottom-2 w-7 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Monumental Kinetic Obsidian Beaded Stream & Futuristic Headline */}
      <div className="hero-molten-title-wrap w-full flex justify-center">
        <BlackLavaMoltenTitle
          line1="DISEÑAMOS"
          line2="EL FUTURO"
        />
      </div>

      {/* Refined Client-Centric Subheading with Next-Gen Optical Reveal */}
      <div className="hero-subheading max-w-3xl mx-auto mb-10 px-4">
        <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/10 to-cyan-500/20 backdrop-blur-md">
          <div className="bg-zinc-950/80 rounded-2xl p-4 md:p-6 border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Ambient Laser Scanline */}
            <div className="absolute -top-full left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[scan_4s_ease-in-out_infinite]" />
            
            <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed">
              Estudio de diseño cinético, desarrollo web inmersivo y experiencias 3D de alta gama. Fusionamos dirección de arte galardonada con ingeniería a 60 FPS sobre un fondo continuo para elevar el valor de tu marca y liderar tu mercado.
            </p>
          </div>
        </div>
      </div>

      {/* Primary & Secondary Next-Gen Action CTAs */}
      <div className="hero-cta-group flex flex-wrap items-center justify-center gap-4 mb-16 relative z-20">
        <button
          onClick={onScrollToPinned}
          className="group relative px-8 py-4 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 font-syne font-extrabold text-sm transition-all duration-300 flex items-center gap-2.5 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] active:scale-95 cursor-pointer overflow-hidden"
        >
          <span className="relative z-10">Explorar Casos de Éxito</span>
          <ArrowDown className="w-4 h-4 relative z-10 group-hover:translate-y-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <button
          onClick={onOpenShowreel}
          className="group relative px-8 py-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-white font-syne font-bold text-sm border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 flex items-center gap-2.5 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-xl"
        >
          <Play className="w-4 h-4 fill-current text-cyan-400 group-hover:scale-125 transition-transform" />
          <span>Ver Showreel 2026</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping ml-1" />
        </button>

        <button
          onClick={onOpenInquiry}
          className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 hover:from-indigo-500 hover:to-cyan-400 text-white font-syne font-bold text-sm shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Iniciar Proyecto</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </section>
  );
};
