import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudy } from '../types';
import { Award, ArrowUpRight, TrendingUp, Sparkles, CheckCircle2, ChevronRight, Eye, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PinnedShowcaseSectionProps {
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

export const PinnedShowcaseSection: React.FC<PinnedShowcaseSectionProps> = ({
  onSelectCaseStudy,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [timelineProgress, setTimelineProgress] = useState<number>(0);

  const projects = CASE_STUDIES.slice(0, 3);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

      // Master Pinned Scrubbed Timeline
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3200',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setTimelineProgress(Math.round(p * 100));
            if (p < 0.35) {
              setCurrentStepIndex(0);
            } else if (p < 0.7) {
              setCurrentStepIndex(1);
            } else {
              setCurrentStepIndex(2);
            }
          }
        }
      });

      // Sequential 3D Stacking Animation
      pinTl
        // 1. Card 1 enters focus
        .fromTo(cards[0], 
          { opacity: 0, y: 120, scale: 0.85, rotateX: 18 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.2, ease: 'power2.out', force3D: true }
        )
        // 2. Card 1 recedes, Card 2 enters
        .to(cards[0], {
          scale: 0.9,
          y: -35,
          opacity: 0.2,
          filter: 'blur(4px)',
          duration: 1,
          ease: 'power2.inOut',
          force3D: true
        }, '+=0.3')
        .fromTo(cards[1],
          { opacity: 0, y: 120, scale: 0.85, rotateX: 18 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.2, ease: 'power2.out', force3D: true },
          '<'
        )
        // 3. Card 2 recedes, Card 3 enters
        .to(cards[1], {
          scale: 0.9,
          y: -35,
          opacity: 0.2,
          filter: 'blur(4px)',
          duration: 1,
          ease: 'power2.inOut',
          force3D: true
        }, '+=0.3')
        .fromTo(cards[2],
          { opacity: 0, y: 120, scale: 0.85, rotateX: 18 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.2, ease: 'power2.out', force3D: true },
          '<'
        );

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const activeProject = projects[currentStepIndex] || projects[0];

  return (
    <section
      ref={containerRef}
      id="pinned-showcase-section"
      className="relative w-full h-screen bg-[#090a10] text-white flex items-center overflow-hidden border-y border-white/10"
    >
      {/* Dynamic ambient backdrop spotlight matching current project palette */}
      <div
        className="pointer-events-none absolute w-[650px] h-[650px] rounded-full blur-[170px] opacity-25 -z-10 transition-colors duration-700 top-1/2 -translate-y-1/2 right-1/4 gpu-layer"
        style={{ backgroundColor: activeProject.palette.primary }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Client Story & Live Metrics */}
        <div className="lg:col-span-5 flex flex-col justify-center z-10">
          
          {/* Award Badge & Step Indicator */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border transition-all duration-500 flex items-center gap-1.5"
              style={{
                backgroundColor: `${activeProject.palette.primary}20`,
                color: activeProject.palette.primary,
                borderColor: `${activeProject.palette.primary}50`,
              }}
            >
              <Award className="w-3.5 h-3.5" />
              {activeProject.award}
            </span>
            <div className="text-xs font-mono text-zinc-500">
              0{currentStepIndex + 1} / 03
            </div>
          </div>

          {/* Client & Category */}
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
            {activeProject.client}
          </span>

          {/* Dynamic Project Title */}
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-3 min-h-[60px] transition-all">
            {activeProject.title}
          </h2>

          {/* Tagline / Pitch */}
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 min-h-[50px]">
            {activeProject.tagline}
          </p>

          {/* Metrics Highlight */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/5">
              <div className="font-syne text-2xl font-extrabold text-white">
                {activeProject.metrics[0]?.value}
              </div>
              <div className="text-[11px] text-indigo-300 font-semibold">
                {activeProject.metrics[0]?.label}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/5">
              <div className="font-syne text-2xl font-extrabold text-white">
                {activeProject.metrics[1]?.value}
              </div>
              <div className="text-[11px] text-cyan-300 font-semibold">
                {activeProject.metrics[1]?.label}
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => onSelectCaseStudy(activeProject)}
              className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-syne font-extrabold text-xs flex items-center gap-2 transition-all shadow-xl shadow-white/10 active:scale-95 cursor-pointer"
            >
              <span>Ver Caso de Estudio Completo</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Real-time Progress Bar */}
          <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400">Progreso de la Galería:</span>
              <span className="text-white font-bold">{timelineProgress}%</span>
            </div>
            
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-75"
                style={{
                  width: `${timelineProgress}%`,
                  background: `linear-gradient(90deg, #6366f1, #06b6d4, #ec4899)`,
                }}
              />
            </div>
          </div>

        </div>

        {/* Right Column: 3D Stacked Floating Project Cards */}
        <div className="lg:col-span-7 relative h-[450px] sm:h-[520px] flex items-center justify-center perspective-[1400px]">
          
          {/* PROJECT CARD 1: AURA KINETICS */}
          <div
            ref={card1Ref}
            onClick={() => onSelectCaseStudy(projects[0])}
            className="absolute w-full max-w-[520px] bg-gradient-to-b from-[#141624] to-[#0e101a] border border-indigo-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/60 gpu-layer group cursor-pointer"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={projects[0].heroImage}
                alt={projects[0].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e101a] via-transparent to-transparent opacity-90" />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300 font-bold">
                {projects[0].year} • Awwwards SOTD
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-syne font-extrabold text-white text-xl sm:text-2xl group-hover:text-cyan-300 transition-colors">
                  {projects[0].title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2">
                {projects[0].summary}
              </p>
            </div>
          </div>

          {/* PROJECT CARD 2: NEO NEBULA */}
          <div
            ref={card2Ref}
            onClick={() => onSelectCaseStudy(projects[1])}
            className="absolute w-full max-w-[520px] bg-gradient-to-b from-[#1a0e1c] to-[#100a18] border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-pink-950/60 gpu-layer group cursor-pointer"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={projects[1].heroImage}
                alt={projects[1].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100a18] via-transparent to-transparent opacity-90" />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-pink-300 font-bold">
                {projects[1].year} • Luxury E-Commerce
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-syne font-extrabold text-white text-xl sm:text-2xl group-hover:text-pink-300 transition-colors">
                  {projects[1].title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-pink-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2">
                {projects[1].summary}
              </p>
            </div>
          </div>

          {/* PROJECT CARD 3: CHRONO VAULT */}
          <div
            ref={card3Ref}
            onClick={() => onSelectCaseStudy(projects[2])}
            className="absolute w-full max-w-[520px] bg-gradient-to-b from-[#1c180e] to-[#0d0d12] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-amber-950/60 gpu-layer group cursor-pointer"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={projects[2].heroImage}
                alt={projects[2].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent opacity-90" />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-amber-300 font-bold">
                {projects[2].year} • Red Dot Award
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-syne font-extrabold text-white text-xl sm:text-2xl group-hover:text-amber-300 transition-colors">
                  {projects[2].title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2">
                {projects[2].summary}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
