import React, { useState } from 'react';
import { SERVICE_PILLARS } from '../data/agencyData';
import { ServicePillar } from '../types';
import { ArrowUpRight, Sparkles, CheckCircle2, Zap, Layers, Eye, ShieldCheck, Compass } from 'lucide-react';

interface ServicesSectionProps {
  onOpenInquiry: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiry }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>('spatial-web');

  const activeService = SERVICE_PILLARS.find((s) => s.id === activeServiceId) || SERVICE_PILLARS[0];

  return (
    <section id="services-section" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/10 relative">
      
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px]" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Capacidades de Vanguardia
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Estándar Awwwards & FWA
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Nuestros Pilares de Creación Digital
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Fusionamos dirección de arte monumental, ingeniería de movimiento a 60 FPS y psicología de conversión para situar a tu marca en el 1% superior del ecosistema global.
          </p>
        </div>

        <button
          onClick={onOpenInquiry}
          className="self-start md:self-auto px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-syne font-bold text-xs flex items-center gap-2 transition-all cursor-pointer group shrink-0"
        >
          <span>Consultar Servicios</span>
          <ArrowUpRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Interactive Dual-Column Capabilities Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Service Selector List */}
        <div className="lg:col-span-6 space-y-4">
          {SERVICE_PILLARS.map((srv) => {
            const isSelected = activeServiceId === srv.id;
            return (
              <div
                key={srv.id}
                onClick={() => setActiveServiceId(srv.id)}
                className={`p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#141624] via-[#0f111d] to-[#090a10] border-indigo-500/50 shadow-2xl shadow-indigo-950/60'
                    : 'bg-zinc-950/70 border-white/5 hover:border-white/20 hover:bg-zinc-900/50'
                }`}
              >
                {/* Active Indicator Accent Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 via-cyan-400 to-indigo-600" />
                )}

                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-sm font-bold ${isSelected ? 'text-cyan-400' : 'text-zinc-500'}`}>
                      {srv.number}
                    </span>
                    <h3 className="font-syne text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {srv.title}
                    </h3>
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-indigo-400 rotate-45' : 'text-zinc-600 group-hover:text-zinc-300'
                    }`}
                  />
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 pl-8 leading-relaxed">
                  {srv.shortDesc}
                </p>

                {/* Quick tags */}
                <div className="flex flex-wrap gap-2 mt-4 pl-8">
                  {srv.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Preview Card */}
        <div className="lg:col-span-6 sticky top-28">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121526] via-[#0e101a] to-[#090a10] border border-indigo-500/20 shadow-2xl relative overflow-hidden text-white">
            
            {/* Ambient Lighting in Card */}
            <div className="pointer-events-none absolute -right-10 -top-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl" />

            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Pilar {activeService.number} en Detalle
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Entrega Llave en Mano
              </span>
            </div>

            <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {activeService.title}
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              {activeService.fullDesc}
            </p>

            {/* Value Highlight Banner */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 mb-8">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-indigo-200">
                  {activeService.highlight}
                </p>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-3 mb-8">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                ¿Qué Incluye Esta Solución?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 block">TIEMPO ESTIMADO</span>
                <span className="text-xs font-semibold text-white font-mono">3 a 6 Semanas</span>
              </div>
              <button
                onClick={onOpenInquiry}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <span>Solicitar Presupuesto</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
