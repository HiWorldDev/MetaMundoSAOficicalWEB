import React from 'react';
import { CaseStudy } from '../types';
import { X, Award, ExternalLink, TrendingUp, Clock, CheckCircle2, Quote, Sparkles, ArrowRight } from 'lucide-react';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onOpenInquiry,
}) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      
      {/* Backdrop with High-End Blur */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0d16] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 text-white">
        
        {/* Header Bar */}
        <div className="p-6 sm:px-8 border-b border-white/10 flex items-center justify-between bg-zinc-950/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              {caseStudy.award}
            </span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
              {caseStudy.year} • {caseStudy.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-12 custom-scrollbar">
          
          {/* Hero Presentation */}
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
              {caseStudy.client}
            </span>
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.08] mb-4">
              {caseStudy.title}
            </h2>
            <p className="text-lg sm:text-xl text-zinc-300 font-light max-w-3xl leading-relaxed">
              {caseStudy.tagline}
            </p>
          </div>

          {/* Hero Visual Image Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] shadow-2xl group">
            <img
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d16] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
                Experiencia Interactiva 60 FPS
              </div>
            </div>
          </div>

          {/* Key Metrics Impact Grid */}
          <div>
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resultados & Impacto Comprobado</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudy.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 relative overflow-hidden"
                >
                  <div className="font-syne text-3xl sm:text-4xl font-extrabold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-indigo-300 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative: Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                El Desafío
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                Nuestra Solución
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Secondary Visual & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6 border-t border-white/10">
            
            <div className="md:col-span-6 rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
              <img
                src={caseStudy.secondaryImage}
                alt={`${caseStudy.title} detail`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-bold">
                Entregables & Capacidades
              </span>
              <ul className="space-y-2.5">
                {caseStudy.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Client Testimonial Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-zinc-900/60 to-cyan-950/40 border border-indigo-500/20 relative">
            <Quote className="w-8 h-8 text-indigo-400/40 mb-4" />
            <p className="font-syne text-base sm:text-lg text-white font-medium italic leading-relaxed mb-4">
              "{caseStudy.testimonial.quote}"
            </p>
            <div>
              <div className="font-syne font-bold text-white text-sm">
                {caseStudy.testimonial.author}
              </div>
              <div className="text-xs font-mono text-zinc-400">
                {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-syne font-bold text-white text-base">
                ¿Buscas un resultado como este para tu marca?
              </h4>
              <p className="text-xs text-zinc-400">
                Diseñamos experiencias a medida para marcas ambiciosas.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer shrink-0"
            >
              <span>Iniciar Consulta de Proyecto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
